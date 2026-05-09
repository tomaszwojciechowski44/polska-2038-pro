import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import pl from '../i18n/pl.json';
import en from '../i18n/en.json';

const LanguageContext = createContext(null);

export const TRANSLATIONS = { pl, en };

/** Merge preferred locale over base so missing/empty EN leaves use PL (deep, safe for nested objects & arrays). */
export function mergeLocaleTree(preferred, base) {
  if (base === undefined || base === null) return preferred ?? {};
  if (preferred === undefined || preferred === null) return base;
  if (Array.isArray(base)) {
    if (Array.isArray(preferred) && preferred.length > 0) return preferred;
    return base;
  }
  if (typeof base !== 'object' || typeof preferred !== 'object') {
    if (preferred === '' || preferred === null || preferred === undefined) return base;
    return preferred;
  }
  const out = { ...base };
  for (const key of Object.keys(base)) {
    if (Object.prototype.hasOwnProperty.call(preferred, key)) {
      out[key] = mergeLocaleTree(preferred[key], base[key]);
    }
  }
  for (const key of Object.keys(preferred)) {
    if (!Object.prototype.hasOwnProperty.call(base, key)) {
      out[key] = preferred[key];
    }
  }
  return out;
}

/** Prefix path with /en when active locale is English (internal app paths only). */
export function localePath(path, lang) {
  if (path == null || path === '') return path;
  const s = String(path);
  if (s.startsWith('http') || s.startsWith('#') || s.startsWith('mailto:') || s.startsWith('tel:')) return s;
  const normalized = s.startsWith('/') ? s : `/${s}`;
  if (lang !== 'en') return normalized;
  if (normalized === '/') return '/en';
  if (normalized.startsWith('/en')) return normalized;
  return `/en${normalized}`;
}

export function LanguageProvider({ children, initialLang = 'pl' }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
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

  const t = useMemo(() => {
    if (lang === 'pl') return TRANSLATIONS.pl;
    return mergeLocaleTree(TRANSLATIONS.en, TRANSLATIONS.pl);
  }, [lang]);

  const pathForLang = useCallback((path) => localePath(path, lang), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: setLangAndPersist, toggle, t, localePath: pathForLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
