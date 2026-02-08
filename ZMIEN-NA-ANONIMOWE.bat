@echo off
chcp 65001 >nul
cls
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║     🔒 ZMIANA DANYCH GIT NA ANONIMOWE                         ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo ⚠️  Ten skrypt zmieni Twoje dane autora w Git na anonimowe
echo.
echo AKTUALNE DANE:
git config user.name
git config user.email
echo.
echo NOWE DANE (anonimowe):
echo   Nazwa: Zespół POLSKA 2038
echo   Email: polska2038.projekt@gmail.com
echo.
echo ⚠️  To zmieni tylko PRZYSZŁE commity, nie stare!
echo.
pause

echo.
echo Zmieniam dane...
git config user.name "Zespół POLSKA 2038"
git config user.email "polska2038.projekt@gmail.com"

echo.
echo ✅ Gotowe! Nowe dane:
git config user.name
git config user.email
echo.
echo Od teraz wszystkie commity będą anonimowe! 🎉
echo.
pause

