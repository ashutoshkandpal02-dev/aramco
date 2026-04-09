'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Lang, Translations } from './translations';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const isRTL = lang === 'ar';

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: translations[lang], isRTL }}
    >
      <div className={isRTL ? 'font-arabic' : 'font-body'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
