import React, { createContext, useContext, useEffect, useState } from 'react';
import { SUPPORTED_LANGUAGES, TRANSLATIONS, TranslationDictionary } from '../i18n/translations';
import { LanguageCode } from '../types';

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: TranslationDictionary;
  dir: 'ltr' | 'rtl';
}

const STORAGE_KEY = 'aspirehub_language_v1';

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      if (saved && saved in TRANSLATIONS) {
        return saved;
      }
    } catch {
      // Ignore storage read failure
    }
    return 'en';
  });

  const activeMeta =
    SUPPORTED_LANGUAGES.find((item) => item.code === language) ?? SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore storage write failure
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = activeMeta.dir;
    }
  }, [language, activeMeta.dir]);

  function setLanguage(code: LanguageCode) {
    if (code in TRANSLATIONS) {
      setLanguageState(code);
    }
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: TRANSLATIONS[language],
        dir: activeMeta.dir,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
