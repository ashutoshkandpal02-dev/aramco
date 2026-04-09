'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ASSESSMENT_QUESTIONS, tl } from '@/app/lib/assessment-data';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n-context';

interface Props {
  onComplete: (score: number) => void;
}

export function AssessmentQuestions({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selections, setSelections] = useState<Record<number, number>>({});
  const { t, lang } = useLanguage();
  
  const currentQuestion = ASSESSMENT_QUESTIONS[currentIdx];
  const isSelected = selections[currentQuestion.id] !== undefined;

  const handleNext = () => {
    if (currentIdx < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      let score = 0;
      ASSESSMENT_QUESTIONS.forEach(q => {
        if (selections[q.id] === q.correctAnswer) score++;
      });
      onComplete(score);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx(prev => prev - 1);
  };

  return (
    <Card className="glass-card overflow-hidden animate-slide-in">
      <CardHeader className="border-b bg-muted/20 pb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            {t.questionOf(currentIdx + 1, ASSESSMENT_QUESTIONS.length)}
          </span>
          <span className="text-xs font-bold text-primary px-2 py-1 rounded bg-primary/10">
            {t.donePercent(Math.round(((currentIdx + 1) / ASSESSMENT_QUESTIONS.length) * 100))}
          </span>
        </div>
        <CardTitle className="text-xl font-bold leading-tight mt-2">
          {tl(currentQuestion.text, lang)}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 grid gap-3">
        {currentQuestion.options.map((option, idx) => {
          const active = selections[currentQuestion.id] === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelections({ ...selections, [currentQuestion.id]: idx })}
              className={cn(
                "group flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 hover:border-primary/50 hover:bg-accent/50",
                active ? "border-primary bg-primary/5 shadow-md" : "border-border bg-card"
              )}
            >
              <span className={cn(
                "text-sm font-medium",
                active ? "text-primary font-bold" : "text-card-foreground"
              )}>
                {tl(option, lang)}
              </span>
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ms-3",
                active ? "border-primary bg-primary text-white" : "border-muted group-hover:border-primary/50"
              )}>
                {active && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/10 py-6">
        <Button variant="outline" onClick={handlePrev} disabled={currentIdx === 0}>
          <ChevronLeft className="me-2 h-4 w-4" /> {t.previous}
        </Button>
        <Button 
          className={cn("px-8", isSelected ? "gradient-bg" : "bg-muted text-muted-foreground")} 
          onClick={handleNext}
          disabled={!isSelected}
        >
          {currentIdx === ASSESSMENT_QUESTIONS.length - 1 ? t.finishSection : t.next} <ChevronRight className="ms-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}