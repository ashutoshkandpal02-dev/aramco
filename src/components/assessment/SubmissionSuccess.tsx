'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, BellRing, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n-context';

interface Props {
  onNext: () => void;
}

export function SubmissionSuccess({ onNext }: Props) {
  const { t } = useLanguage();
  return (
    <Card className="glass-card overflow-hidden animate-fade-in text-center p-12">
      <CardContent className="space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center relative z-10 shadow-lg shadow-primary/40">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-4xl font-black gradient-text">{t.planSecured}</h2>
          <p className="text-lg text-muted-foreground max-w-sm mx-auto">
            {t.planSavedMessage}
          </p>
        </div>

        <div className="bg-secondary/5 border border-secondary/10 rounded-3xl p-6 flex items-start gap-4 text-left">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
            <BellRing className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h4 className="font-bold text-secondary text-sm">{t.smartNudgesEnabled}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t.nudgesMessage}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center pt-8">
        <Button size="lg" className="rounded-full px-12 py-8 text-lg gradient-bg group shadow-2xl" onClick={onNext}>
          {t.previewSmartReminders} <ChevronRight className="ms-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
}