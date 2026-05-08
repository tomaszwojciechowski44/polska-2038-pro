import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext(null);

export const TRANSLATIONS = {
  pl: {
    lang: 'pl',
    flag: '🇵🇱',
    label: 'PL',
    nav: {
      about:     'O systemie',
      forWho:    'Dla kogo',
      lidar:     'LiDAR + AI',
      techStack: 'Tech Stack',
      demo:      'Demo',
      roi:       'ROI',
      partners:  'Partnerzy',
      contact:   'Kontakt',
      join:      'Dołącz',
    },
    hero: {
      badge:    'Narodowy OS Sportu — LiDAR + AI + PostGIS · v2.0',
      h1a:      '#POLSKA',
      h1b:      '2038',
      tagline1: 'Dane.',
      tagline2: 'Sztuczna Inteligencja.',
      tagline3: 'Równe Szanse.',
      sub:      'Narodowy system wykrywania talentów — od 6-latka na Orliku po kadrę narodową. LiDAR + AI = żaden talent z małej wsi nie umknie systemowi.',
      cta1:     'Zobacz Architekturę',
      cta2:     'LiDAR Case Study',
    },
  },
  en: {
    lang: 'en',
    flag: '🇬🇧',
    label: 'EN',
    nav: {
      about:     'About',
      forWho:    'Who For',
      lidar:     'LiDAR + AI',
      techStack: 'Tech Stack',
      demo:      'Demo',
      roi:       'ROI',
      partners:  'Partners',
      contact:   'Contact',
      join:      'Join',
    },
    hero: {
      badge:    'National Sports OS — LiDAR + AI + PostGIS · v2.0',
      h1a:      '#POLSKA',
      h1b:      '2038',
      tagline1: 'Data.',
      tagline2: 'Artificial Intelligence.',
      tagline3: 'Equal Opportunity.',
      sub:      'National talent detection system — from a 6-year-old on a local pitch to the national team. LiDAR + AI = no talent from a small village escapes the system.',
      cta1:     'View Architecture',
      cta2:     'LiDAR Case Study',
    },
  },
};

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
