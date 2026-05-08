import os
import time
import smtplib
from email.message import EmailMessage
from typing import Dict, List

import anyio
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import ContactMessage
from schemas import ContactMessageIn, ContactMessageOut

router = APIRouter()

# Recipients (stakeholders)
STAKEHOLDERS: List[str] = [
    "kontakt@msit.gov.pl",        # Ministerstwo Sportu
    "sekretariat@pzpn.pl",        # PZPN
    "biuro@ekstraklasa.org",      # Ekstraklasa SA
    "biuro@1liga.org",            # Pierwsza Liga
]

# Simple in-memory rate limit per IP (good enough for single-instance / public demo).
_ip_hits: Dict[str, List[float]] = {}
WINDOW_S = 60 * 60           # 1 hour
MAX_PER_HOUR = 5
MIN_GAP_S = 20               # at least 20s between messages per IP


def _client_ip(request: Request) -> str:
    # Prefer proxy headers if present (Render / Nginx etc.)
    xff = request.headers.get("x-forwarded-for")
    if xff:
        return xff.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _rate_limit_or_429(ip: str) -> None:
    now = time.time()
    hits = _ip_hits.get(ip, [])
    hits = [t for t in hits if now - t <= WINDOW_S]
    if hits and (now - hits[-1]) < MIN_GAP_S:
        raise HTTPException(status_code=429, detail="Zbyt szybkie wysyłanie. Spróbuj ponownie za chwilę.")
    if len(hits) >= MAX_PER_HOUR:
        raise HTTPException(status_code=429, detail="Limit wiadomości na godzinę został przekroczony.")
    hits.append(now)
    _ip_hits[ip] = hits


def _smtp_send(msg: EmailMessage) -> None:
    host = os.getenv("SMTP_HOST")
    user = os.getenv("SMTP_USER")
    password = os.getenv("SMTP_PASS")
    use_tls = os.getenv("SMTP_TLS", "true").lower() in ("1", "true", "yes")
    port_default = "587" if use_tls else "465"
    port = int(os.getenv("SMTP_PORT", port_default))

    if not host or not user or not password:
        raise RuntimeError("SMTP is not configured (SMTP_HOST/SMTP_USER/SMTP_PASS).")

    if use_tls:
        with smtplib.SMTP(host, port, timeout=20) as s:
            s.starttls()
            s.login(user, password)
            s.send_message(msg)
    else:
        with smtplib.SMTP_SSL(host, port, timeout=20) as s:
            s.login(user, password)
            s.send_message(msg)


@router.post("/contact", response_model=ContactMessageOut)
async def submit_contact(data: ContactMessageIn, request: Request, db: AsyncSession = Depends(get_db)):
    """
    Public "manifesto delivery system":
    - saves the message to DB
    - forwards it by email to multiple stakeholders
    """
    ip = _client_ip(request)
    _rate_limit_or_429(ip)

    ua = request.headers.get("user-agent")

    # Persist
    row = ContactMessage(
        name=data.name.strip(),
        org=(data.org or "").strip() or None,
        email=str(data.email).strip(),
        role=(data.role or "").strip() or None,
        subject=data.subject.strip(),
        message=data.message.strip(),
        lang=(data.lang or "").strip() or None,
        page=(data.page or "").strip() or None,
        ip=ip,
        user_agent=(ua[:400] if ua else None),
    )
    db.add(row)
    await db.commit()
    await db.refresh(row)

    # Build email
    from_addr = os.getenv("SMTP_FROM") or "Projekt Polska2038 <onboarding@resend.dev>"
    subject = f"Projekt #Polska2038 - Głos Obywatelski: {data.subject.strip()}"

    body = "\n".join([
        "Nowa wiadomość z formularza publicznego (manifesto delivery).",
        "",
        f"Imię i nazwisko: {data.name}",
        f"Organizacja: {data.org or '-'}",
        f"E-mail nadawcy: {data.email}",
        f"Rola / instytucja: {data.role or '-'}",
        f"Język: {data.lang or '-'}",
        f"Strona: {data.page or '-'}",
        f"IP: {ip}",
        "",
        "Treść:",
        data.message,
        "",
        f"(ID zgłoszenia: {row.id})",
    ])

    msg = EmailMessage()
    msg["From"] = from_addr
    msg["To"] = ", ".join(STAKEHOLDERS)
    msg["Subject"] = subject
    msg["Reply-To"] = str(data.email)
    msg.set_content(body)

    try:
        await anyio.to_thread.run_sync(_smtp_send, msg)
    except Exception:
        # Do not lose stored message; report that delivery failed.
        raise HTTPException(status_code=502, detail="Nie udało się wysłać wiadomości e-mail. Spróbuj później.")

    return row

