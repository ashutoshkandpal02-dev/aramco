'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SCENARIO_DATA, tl } from '@/app/lib/assessment-data';
import { cn } from '@/lib/utils';
import { Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n-context';

interface Props {
  onComplete: (score: number) => void;
}

export function ScenarioBranching({ onComplete }: Props) {
  const [selection, setSelection] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const { t, lang } = useLanguage();

  const selectedOption = SCENARIO_DATA.options.find(o => o.id === selection);

  return (
    <Card className="glass-card overflow-hidden animate-slide-in">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-2 text-primary font-bold mb-1">
          <Lightbulb className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest">{t.immersiveScenario}</span>
        </div>
        <CardTitle className="text-2xl font-bold">{tl(SCENARIO_DATA.title, lang)}</CardTitle>
        <CardDescription className="text-base text-card-foreground mt-2">
          {tl(SCENARIO_DATA.description, lang)}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-8 space-y-4">
        {!confirmed ? (
          SCENARIO_DATA.options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelection(option.id)}
              className={cn(
                "w-full p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group",
                selection === option.id 
                  ? "border-secondary bg-secondary/5 ring-1 ring-secondary shadow-lg" 
                  : "border-border hover:border-secondary/30 hover:bg-muted/30"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors",
                  selection === option.id ? "bg-secondary text-white" : "bg-muted text-muted-foreground group-hover:bg-secondary/10 group-hover:text-secondary"
                )}>
                  {option.id.toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold mb-1">{tl(option.title, lang)}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tl(option.description, lang)}</p>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="p-8 rounded-3xl bg-secondary/5 border border-secondary/20 flex flex-col items-center text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-2">{t.decisionLogged}</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {selectedOption ? tl(selectedOption.feedback, lang) : ''}
            </p>
            <Button className="gradient-bg rounded-full px-8 py-6" onClick={() => onComplete(selection === 'a' ? 1 : 0)}>
              {t.continueToResults} <ArrowRight className="ms-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
      {!confirmed && (
        <CardFooter className="flex justify-end pt-4 pb-8">
          <Button 
            disabled={!selection} 
            className="rounded-full px-12 py-6 gradient-bg shadow-xl hover:shadow-primary/20 transition-all"
            onClick={() => setConfirmed(true)}
          >
            {t.confirmDecision}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}