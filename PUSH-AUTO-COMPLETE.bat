@echo off
chcp 65001 >nul
color 0B
cls
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║     🚀 AUTOMATYCZNE UTWORZENIE REPOZYTORIUM I PUSH            ║
echo ║              POLSKA 2038 - GitHub Deployment                  ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo Ten skrypt wykona wszystkie kroki automatycznie:
echo   ✓ Sprawdzenie konfiguracji git
echo   ✓ Otwarcie GitHuba do utworzenia repo (automatyczne)
echo   ✓ Wykonanie git push
echo   ✓ Konfiguracja GitHub Pages
echo.
timeout /t 2 /nobreak >nul

:: Krok 1: Otwarcie GitHub
echo [1/5] Otwieram GitHub do utworzenia repozytorium...
start "" "https://github.com/new?name=polska-2038-pro&description=POLSKA+2038+-+Projekt+reformy+polskiego+futbolu&visibility=public"
echo ✓ Przeglądarka otwarta
echo.
echo ┌──────────────────────────────────────────────────────────────┐
echo │  W PRZEGLĄDARCE:                                             │
echo │  • Formularz jest już WYPEŁNIONY automatycznie               │
echo │  • Upewnij się że "Add a README file" NIE jest zaznaczone   │
echo │  • Kliknij "Create repository"                               │
echo │  • Poczekaj 2 sekundy                                        │
echo │  • Wróć tutaj                                                │
echo └──────────────────────────────────────────────────────────────┘
echo.
timeout /t 15 /nobreak
echo.

:: Krok 2: Czekanie na utworzenie repo
echo [2/5] Sprawdzam czy repozytorium zostało utworzone...
set /a attempts=0
:check_repo
set /a attempts+=1
git ls-remote https://github.com/tomizna26/polska-2038-pro.git >nul 2>&1
if errorlevel 1 (
    if %attempts% LSS 6 (
        echo    Próba %attempts%/5 - Repozytorium jeszcze nie istnieje, czekam 5 sekund...
        timeout /t 5 /nobreak >nul
        goto check_repo
    ) else (
        echo.
        echo ❌ Repozytorium nie zostało utworzone po 25 sekundach!
        echo.
        echo Co robić:
        echo   1. Otwórz ręcznie: https://github.com/new
        echo   2. Wypełnij:
        echo      • Repository name: polska-2038-pro
        echo      • Public: TAK (✓)
        echo      • Add README: NIE (bez zaznaczenia)
        echo   3. Kliknij "Create repository"
        echo   4. Uruchom ponownie ten skrypt
        echo.
        pause
        exit /b 1
    )
)
echo ✓ Repozytorium znalezione!
echo.

:: Krok 3: Git push
echo [3/5] Wykonuję git push...
echo.
git push -u origin main 2>&1

if errorlevel 1 (
    echo.
    echo ⚠️  Push wymaga uwierzytelnienia!
    echo.
    echo GitHub może poprosić o:
    echo   • Logowanie przez przeglądarkę (OAuth)
    echo   • Username i Personal Access Token
    echo.
    echo Spróbuj ponownie z uwierzytelnieniem:
    git push -u origin main
    if errorlevel 1 (
        echo.
        echo ❌ Push nie powiódł się!
        echo.
        echo ROZWIĄZANIE:
        echo 1. Wygeneruj Personal Access Token:
        echo    https://github.com/settings/tokens/new?scopes=repo
        echo.
        echo 2. Wykonaj ręcznie:
        echo    git push -u origin main
        echo.
        echo 3. Użyj tokena jako hasła
        echo.
        pause
        exit /b 1
    )
)

echo.
echo ✓ Push wykonany pomyślnie!
echo.

:: Krok 4: Konfiguracja GitHub Pages
echo [4/5] Konfiguruję GitHub Pages...
echo.
echo Otwieram ustawienia GitHub Pages...
start "" "https://github.com/tomizna26/polska-2038-pro/settings/pages"
echo.
echo ┌──────────────────────────────────────────────────────────────┐
echo │  W PRZEGLĄDARCE (zakładka Settings):                        │
echo │  1. Przewiń do sekcji "GitHub Pages"                        │
echo │  2. W "Source" wybierz: "Deploy from a branch"              │
echo │  3. W "Branch" wybierz: "main" i "/ (root)"                 │
echo │  4. Kliknij "Save"                                           │
echo └──────────────────────────────────────────────────────────────┘
echo.
timeout /t 20 /nobreak
echo ✓ Konfiguracja powinna być gotowa
echo.

:: Krok 5: Podsumowanie
echo [5/5] Finalizacja...
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                   ✓✓✓ WSZYSTKO GOTOWE! ✓✓✓                   ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 🌐 Twoja strona będzie dostępna (za 1-2 minuty) pod:
echo    https://tomizna26.github.io/polska-2038-pro/
echo.
echo 📄 Press Kit:
echo    https://tomizna26.github.io/polska-2038-pro/press/
echo.
echo 📁 Repozytorium GitHub:
echo    https://github.com/tomizna26/polska-2038-pro
echo.
echo 📊 Status deploymentu:
echo    https://github.com/tomizna26/polska-2038-pro/actions
echo.
echo ═══════════════════════════════════════════════════════════════
echo.
echo Czy otworzyć stronę gdy będzie gotowa? (T/N)
choice /c TN /n /m "Wybór: "
if errorlevel 2 goto finish
if errorlevel 1 (
    echo.
    echo Czekam 60 sekund na deployment...
    timeout /t 60 /nobreak >nul
    start "" "https://tomizna26.github.io/polska-2038-pro/"
)

:finish
echo.
echo ═══════════════════════════════════════════════════════════════
echo     PROJEKT POMYŚLNIE WDROŻONY NA GITHUB! 🎉
echo ═══════════════════════════════════════════════════════════════
echo.
pause

