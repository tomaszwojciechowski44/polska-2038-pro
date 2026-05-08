import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import pl from '../i18n/pl.json';
import en from '../i18n/en.json';

const LanguageContext = createContext(null);

export const TRANSLATIONS = { pl, en };

export function LanguageProvider({ children, initialLang = 'pl' }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    // Client-only: auto switch to EN if browser language isn't PL (unless explicit initialLang was set).
    try {
      const browserLang = (navigator.language || 'pl').slice(0, 2).toLowerCase();
      if (initialLang === 'pl' && browserLang !== 'pl') setLang('en');
    } catch {
      // ignore
    }
  }, [initialLang]);

  const toggle = () => setLang((l) => (l === 'pl' ? 'en' : 'pl'));
  const t = useMemo(() => TRANSLATIONS[lang] ?? TRANSLATIONS.pl, [lang]);
  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
