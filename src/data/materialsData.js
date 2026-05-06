export const MATERIALS = [
  {
    slug: 'executive-summary',
    title: 'Executive Summary',
    subtitle: '2 strony · 5 min czytania',
    audience: 'PZPN · Ministerstwo Sportu i Turystyki · Samorządy · Sponsorzy',
    sections: [
      {
        h: 'Dlaczego teraz',
        p: [
          'Bo roczniki 2010–2016 są największe od 30 lat. Jeśli zbudujemy system dziś, w 2038 mamy najlepiej przygotowane pokolenie w historii.',
          'Euro 2028 i MŚ 2030 to deadliny selekcyjne — bez danych i pipeline’u zaczynamy za późno.',
        ],
      },
      {
        h: 'Teza',
        p: [
          'To nie jest projekt IT — to infrastruktura narodowa dla sportu.',
          'Cel: wykryć i poprowadzić talenty z całej Polski (także z małych miejscowości) do akademii i reprezentacji.',
        ],
      },
      {
        h: 'Trzy filary reformy',
        p: [
          '01 Polska 2038 (pipeline talentów + infrastruktura danych)',
          '02 Bezpieczny Stadion (rodziny na stadionach → mandat społeczny na finansowanie)',
          '03 Niezależna Ocena Trenerów (bez konfliktu interesów, realna jakość szkolenia)',
        ],
      },
      {
        h: 'Koszt i ROI (skrót)',
        p: [
          'Nakład: 1,08 mld PLN/rok (ok. 28,50 PLN / Polaka / rok).',
          'ROI: 300–500% (transfery, prawa TV, turystyka sportowa, marka PL).',
        ],
      },
      {
        h: 'Wniosek',
        p: [
          'Decyzja o pilotażu 2026 to decyzja o oknie 2038. Brak decyzji = utracone pokolenie talentów.',
        ],
      },
    ],
    txt: `EXECUTIVE SUMMARY — #Polska2038\n\nCel: zbudować narodowy system wykrywania i rozwoju talentów sportowych.\n\nDlaczego teraz:\n- roczniki 2010–2016 to największe kohorty od 30 lat\n- Euro 2028 i MŚ 2030 wymagają selekcji już w 2026\n\nTrzy filary:\n1) Polska 2038 (pipeline talentów + dane)\n2) Bezpieczny Stadion\n3) Niezależna ocena trenerów\n\nKoszt: 1,08 mld PLN/rok (~28,50 PLN / Polaka / rok)\nROI: 300–500%\n\nKontakt: https://polska2038.pl/kontakt\n`,
  },
  {
    slug: 'briefing-media',
    title: 'Briefing dla Mediów',
    subtitle: '10 stron · materiał prasowy',
    audience: 'Media · Dziennikarze · Analitycy · Partnerzy',
    sections: [
      { h: 'One-liner', p: ['„W 2038 Polska wygra MŚ. Nie przez szczęście — przez system.”'] },
      { h: '3 liczby do nagłówka', p: ['1,08 mld PLN/rok', '28,50 PLN na Polaka/rok', '2038 — finał MŚ'] },
      { h: 'Tezy', p: ['Problem jest systemowy, nie talentowy.', 'Największe talenty są poza zasięgiem klasycznego skautingu.', 'Dane + równe szanse = przewaga konkurencyjna.'] },
      { h: 'Cytaty', p: ['(wstawimy cytaty po pierwszym pilotażu Q3 2026 — miejsce przygotowane).'] },
      { h: 'Kontakt dla mediów', p: ['Wszystkie materiały dostępne w zakładce Dokumentacja.'] },
    ],
    txt: `BRIEFING DLA MEDIÓW — #Polska2038\n\nOne-liner:\n"W 2038 Polska wygra MŚ. Nie przez szczęście — przez system."\n\n3 liczby:\n- 1,08 mld PLN/rok\n- 28,50 PLN na Polaka/rok\n- 2038\n\nKontakt: https://polska2038.pl/kontakt\n`,
  },
  {
    slug: 'roadmap-2026-2038',
    title: 'Mapa Drogowa 2026–2038',
    subtitle: '15 stron · harmonogram',
    audience: 'PZPN · Ministerstwo · Samorządy · Partnerzy technologiczni',
    sections: [
      { h: 'Faza 0 (teraz)', p: ['Prezentacja, uzgodnienie zakresu pilotażu, wybór 3–4 województw.'] },
      { h: 'Faza 1 (2026)', p: ['Pilotaż: infrastruktura + proces + panel trenerów (ground truth).'] },
      { h: 'Faza 2 (2027)', p: ['Skalowanie na 16 województw, sieć skautów, standardy danych.'] },
      { h: 'Faza 3 (2028–2030)', p: ['Integracje federacyjne, selekcja Euro 2028 / MŚ 2030.'] },
      { h: 'Faza 4 (2032–2038)', p: ['Eksport modelu + pełna dojrzałość programu.'] },
    ],
    txt: `MAPA DROGOWA 2026–2038 — #Polska2038\n\nFazy:\n- 2026: pilotaż\n- 2027: skalowanie\n- 2028–2030: integracje i selekcja\n- 2032–2038: eksport i dojrzałość\n`,
  },
  {
    slug: 'budget-2026-2035',
    title: 'Budżet Szczegółowy 2026–2035',
    subtitle: '20 stron · finanse',
    audience: 'Ministerstwo · Sponsorzy · Samorządy · Audytorzy',
    sections: [
      { h: 'Założenia', p: ['Budżet programu, koszty infrastruktury, koszty operacyjne, rezerwa ryzyk.'] },
      { h: 'Wydatki', p: ['Infrastruktura, software, operacje, edukacja skautów, compliance.'] },
      { h: 'Zwrot', p: ['Transfery, prawa TV, frekwencja, turystyka, marka kraju.'] },
      { h: 'Ryzyka', p: ['Ryzyko adopcji, ryzyko prawne, ryzyko operacyjne — plan mitigacji.'] },
    ],
    txt: `BUDŻET 2026–2035 — #Polska2038\n\nNakład: 1,08 mld PLN/rok\nObszary: infrastruktura, software, operacje, edukacja, compliance\n`,
  },
  {
    slug: 'org-structure',
    title: 'Struktura Organizacyjna',
    subtitle: '12 stron · organizacja',
    audience: 'Ministerstwo · PZPN · Samorządy',
    sections: [
      { h: 'Model zarządzania', p: ['Komitet sterujący, biuro programu, regiony, audyt.'] },
      { h: 'Odpowiedzialności', p: ['Kto odpowiada za dane, kto za pilotaż, kto za wdrożenie.'] },
      { h: 'Compliance', p: ['RODO, AI Act, bezpieczeństwo informacji.'] },
    ],
    txt: `STRUKTURA ORGANIZACYJNA — #Polska2038\n\nKomitet sterujący → Biuro programu → Województwa → Skauci/Orliki\n`,
  },
  {
    slug: 'implementation-playbook',
    title: 'Plan Wdrożenia — Instrukcja',
    subtitle: '18 stron · operacyjny',
    audience: 'PMO · Ministerstwo · PZPN',
    sections: [
      { h: 'Krok 1', p: ['Wybór pilotażu (województwa, Orliki, partnerzy).'] },
      { h: 'Krok 2', p: ['Procesy: skan → scoring → rekomendacja → kontakt skauta.'] },
      { h: 'Krok 3', p: ['Szkolenia skautów + standardy oceny + audyt.'] },
      { h: 'Krok 4', p: ['Rollout ogólnopolski i KPI.'] },
    ],
    txt: `PLAN WDROŻENIA — #Polska2038\n\n1) pilotaż\n2) procesy\n3) szkolenia\n4) rollout\n`,
  },
  {
    slug: 'email-template',
    title: 'Instrukcja Wysyłki Email',
    subtitle: '1 strona · gotowy email',
    audience: 'Zespół · PR · Partnerzy',
    sections: [
      { h: 'Temat', p: ['Pilotaż #Polska2038 (2026) — prośba o spotkanie robocze'] },
      { h: 'Treść (szablon)', p: ['Dzień dobry, … (gotowy szablon w przycisku „Pobierz TXT”).'] },
    ],
    txt: `TEMAT: Pilotaż #Polska2038 (2026) — prośba o spotkanie robocze\n\nDzień dobry,\n\nPrzesyłam krótkie podsumowanie projektu #Polska2038 oraz propozycję pilotażu w 2026 r.\nLink do dokumentacji: https://polska2038.pl/reforma/dokumenty\n\nProponuję 30-min spotkanie robocze w tym tygodniu.\n\nPozdrawiam,\n(Imię Nazwisko)\n(Telefon)\n`,
  },
];

export function getMaterial(slug) {
  return MATERIALS.find(m => m.slug === slug);
}

