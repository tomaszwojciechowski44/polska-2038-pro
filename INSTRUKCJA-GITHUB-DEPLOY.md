# 🚀 INSTRUKCJA WDROŻENIA NA GITHUB

## SZYBKI START - uruchom jeden z tych skryptów:

### **PUSH-SIMPLE.bat** ⭐ (POLECANE)
```
Kliknij dwukrotnie na: PUSH-SIMPLE.bat
```
Ten skrypt:
- Sprawdzi czy repozytorium istnieje
- Otworzy GitHub do utworzenia repo (jeśli nie istnieje)
- Wykona automatyczny git push
- Skonfiguruje GitHub Pages
- Otworzy stronę po wdrożeniu

---

## Co robi skrypt automatycznie:

### 1. Otwiera GitHub z wypełnionym formularzem
   - Nazwa: `polska-2038-pro`
   - Opis: POLSKA 2038 - Projekt reformy polskiego futbolu
   - Widoczność: Public

### 2. Czeka aż klikniesz "Create repository"
   - Upewnij się że "Add a README file" NIE jest zaznaczone

### 3. Wykonuje git push
   - Wysyła wszystkie pliki na GitHub
   - Może poprosić o uwierzytelnienie

### 4. Konfiguruje GitHub Pages
   - Otwiera ustawienia
   - Pokazuje co ustawić

---

## Adresy po wdrożeniu:

🌐 **Strona główna:**
```
https://projek-polska-2038.github.io/polska-2038-pro/
```

📄 **Press Kit:**
```
https://projek-polska-2038.github.io/polska-2038-pro/press/
```

📁 **Repozytorium:**
```
https://github.com/projek-polska-2038/polska-2038-pro
```

---

## Jeśli git prosi o uwierzytelnienie:

### Opcja 1: GitHub Desktop (najłatwiejsza)
1. Zainstaluj: https://desktop.github.com/
2. Zaloguj się na swoje konto
3. Uruchom ponownie PUSH-SIMPLE.bat

### Opcja 2: Personal Access Token
1. Wygeneruj token: https://github.com/settings/tokens/new?scopes=repo
2. Skopiuj token
3. Przy pushu użyj:
   - Username: `projek-polska-2038`
   - Password: `wklej_token_tutaj`

### Opcja 3: GitHub CLI
```bash
# Zainstaluj gh CLI z: https://cli.github.com/
gh auth login
git push -u origin main
```

---

## Aktualizacja strony (po zmianach):

```bash
git add .
git commit -m "Opis zmian"
git push
```

Lub użyj skryptu: **AKTUALIZUJ-SZYBKO.bat**

---

## GitHub Pages - włączenie strony:

1. Wejdź na: https://github.com/projek-polska-2038/polska-2038-pro/settings/pages
2. W sekcji "Build and deployment":
   - **Source:** Deploy from a branch
   - **Branch:** main
   - **Folder:** / (root)
3. Kliknij **Save**
4. Czekaj 1-2 minuty
5. Strona będzie dostępna pod: https://projek-polska-2038.github.io/polska-2038-pro/

---

## Rozwiązywanie problemów:

### Problem: "Repository not found"
**Rozwiązanie:** Repozytorium nie zostało utworzone na GitHubie
- Wejdź ręcznie na: https://github.com/new
- Utwórz repo: `polska-2038-pro`
- Uruchom ponownie PUSH-SIMPLE.bat

### Problem: "Permission denied"
**Rozwiązanie:** Brak uwierzytelnienia
- Zobacz sekcję "Jeśli git prosi o uwierzytelnienie" powyżej

### Problem: "Updates were rejected"
**Rozwiązanie:** Konflikt wersji
```bash
git pull origin main --rebase
git push -u origin main
```

### Problem: Strona pokazuje 404
**Rozwiązanie:** GitHub Pages nie jest włączony
- Zobacz sekcję "GitHub Pages - włączenie strony" powyżej
- Czekaj do 5 minut na deployment

---

## Pliki pomocnicze:

- **PUSH-SIMPLE.bat** - Główny skrypt wdrożeniowy
- **PUSH-AUTO-COMPLETE.bat** - Alternatywny skrypt z więcej szczegółami
- **CREATE-GITHUB-REPO.html** - Instrukcje w przeglądarce
- **AKTUALIZUJ-SZYBKO.bat** - Szybka aktualizacja po zmianach

---

## Kontakt z repozytorium:

```bash
# Zobacz status
git status

# Zobacz remote
git remote -v

# Zobacz ostatnie commity
git log --oneline -5

# Zobacz co się zmieni przed pushem
git diff origin/main
```

---

## Wszystko gotowe! 🎉

Po wykonaniu PUSH-SIMPLE.bat Twój projekt będzie:
- ✅ Na GitHubie
- ✅ Dostępny publicznie
- ✅ Jako działająca strona WWW
- ✅ Z automatycznym deploymentem przy zmianach

**Uruchom:** `PUSH-SIMPLE.bat` aby zacząć!

