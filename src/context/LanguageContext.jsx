import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import pl from '../i18n/pl.json';
import en from '../i18n/en.json';

const LanguageContext = createContext(null);

export const TRANSLATIONS = { pl, en };

export function LanguageProvider({ children, initialLang = 'pl' }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    // Keep language strictly in sync with URL-derived initialLang.
    setLang(initialLang);
  }, [initialLang]);

  const setLangAndPersist = (next) => {
    setLang(next);
    try {
      if (typeof window !== 'undefined') window.localStorage?.setItem('preferredLang', next);
    } catch {
      // ignore
    }
  };

  const toggle = () => setLangAndPersist(lang === 'pl' ? 'en' : 'pl');
  const t = useMemo(() => TRANSLATIONS[lang] ?? TRANSLATIONS.pl, [lang]);
  return (
    <LanguageContext.Provider value={{ lang, setLang: setLangAndPersist, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
