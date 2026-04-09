'use client';

import { useLanguage } from '@/lib/i18n-context';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 p-1 bg-muted/40 rounded-full border border-border/60 backdrop-blur-sm">
      <button
        onClick={() => setLang('en')}
        className={cn(
          'px-3 py-1 rounded-full text-xs font-bold transition-all duration-200',
          lang === 'en'
            ? 'bg-white text-primary shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLang('ar')}
        className={cn(
          'px-3 py-1 rounded-full text-xs font-bold transition-all duration-200',
          lang === 'ar'
            ? 'bg-white text-primary shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        عربي
      </button>
    </div>
  );
}
