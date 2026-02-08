@echo off
chcp 65001 >nul
cls
cd /d "C:\Users\tomiz\Desktop\POLSKA 2038"

echo.
echo ========================================================
echo    PUSH PROJEKTU NA GITHUB
echo ========================================================
echo.

echo [1/3] Sprawdzam repozytorium...
git ls-remote https://github.com/projekt-polska-2038/polska-2038-pro.git >nul 2>&1
if errorlevel 1 (
    echo.
    echo Repozytorium NIE istnieje!
    echo Otwieram GitHub do utworzenia repo...
    echo.
    start "" "https://github.com/new?name=polska-2038-pro&description=POLSKA+2038+-+Projekt+reformy+polskiego+futbolu&visibility=public"
    echo.
    echo INSTRUKCJE:
    echo 1. W przegladarce kliknij "Create repository"
    echo 2. Upewnij sie ze:
    echo    - Nazwa: polska-2038-pro
    echo    - Public: TAK
    echo    - Add README: NIE
    echo.
    pause

    git ls-remote https://github.com/projekt-polska-2038/polska-2038-pro.git >nul 2>&1
    if errorlevel 1 (
        echo.
        echo Repozytorium nadal nie istnieje!
        echo Sprobuj ponownie pozniej.
        pause
        exit /b 1
    )
)

echo OK - Repozytorium znalezione!
echo.

echo [2/3] Wykonuje git push...
echo.
git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================================
    echo    PUSH NIE POWIODL SIE!
    echo ========================================================
    echo.
    echo Prawdopodobnie potrzebujesz uwierzytelnienia.
    echo.
    echo ROZWIAZANIE:
    echo 1. Wygeneruj Personal Access Token:
    echo    https://github.com/settings/tokens/new?scopes=repo
    echo.
    echo 2. Sprobuj ponownie:
    echo    git push -u origin main
    echo.
    echo 3. Uzyj tokena jako hasla
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================================
echo    PUSH ZAKONCZONY SUKCESEM!
echo ========================================================
echo.
echo Twoja strona (za 1-2 minuty):
echo https://projekt-polska-2038.github.io/polska-2038-pro/
echo.
echo Press Kit:
echo https://projekt-polska-2038.github.io/polska-2038-pro/press/
echo.
echo Repozytorium:
echo https://github.com/projekt-polska-2038/polska-2038-pro
echo.
echo.

echo [3/3] Konfiguracja GitHub Pages...
echo.
echo Otwieram ustawienia...
start "" "https://github.com/projekt-polska-2038/polska-2038-pro/settings/pages"
echo.
echo W przegladarce:
echo 1. Source: "Deploy from a branch"
echo 2. Branch: "main" + "/ (root)"
echo 3. Kliknij "Save"
echo.
echo.
timeout /t 5
echo Czy otworzyc strone za 60 sekund? (T/N)
choice /c TN /n /m ""
if errorlevel 2 goto end
if errorlevel 1 (
    echo Czekam na deployment...
    timeout /t 60 /nobreak >nul
    start "" "https://projekt-polska-2038.github.io/polska-2038-pro/"
)

:end
echo.
echo Gotowe!
pause

