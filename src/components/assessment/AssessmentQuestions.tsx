'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ASSESSMENT_QUESTIONS, tl } from '@/app/lib/assessment-data';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n-context';

interface Props {
  onComplete: (score: number) => void;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

// Maps question index → nudge topic tag label key
const QUESTION_TOPICS: Record<number, { en: string; ar: string }> = {
  0: { en: 'Feedback',      ar: 'التغذية الراجعة' },
  1: { en: 'Teamwork',      ar: 'العمل الجماعي'   },
  2: { en: 'Learning',      ar: 'التعلّم'          },
  3: { en: 'Leadership',    ar: 'القيادة'          },
  4: { en: 'Time Mgmt',     ar: 'إدارة الوقت'     },
  5: { en: 'Collaboration', ar: 'التعاون'          },
};

const TOPIC_COLORS: Record<string, string> = {
  Feedback:      'bg-pink-50 text-pink-600 border-pink-200',
  Teamwork:      'bg-green-50 text-green-600 border-green-200',
  Learning:      'bg-teal-50 text-teal-600 border-teal-200',
  Leadership:    'bg-purple-50 text-purple-600 border-purple-200',
  'Time Mgmt':   'bg-orange-50 text-orange-600 border-orange-200',
  Collaboration: 'bg-blue-50 text-blue-600 border-blue-200',
};

export function AssessmentQuestions({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selections, setSelections] = useState<Record<number, number>>({});
  const [animating, setAnimating] = useState(false);
  const { t, lang } = useLanguage();

  const total = ASSESSMENT_QUESTIONS.length;
  const currentQuestion = ASSESSMENT_QUESTIONS[currentIdx];
  const isSelected = selections[currentQuestion.id] !== undefined;
  const topic = QUESTION_TOPICS[currentIdx];
  const topicLabel = lang === 'ar' ? topic.ar : topic.en;
  const topicColor = TOPIC_COLORS[topic.en] ?? 'bg-muted text-muted-foreground border-muted';

  const navigate = (dir: 'next' | 'prev') => {
    setAnimating(true);
    setTimeout(() => {
      if (dir === 'next') {
        if (currentIdx < total - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          let score = 0;
          ASSESSMENT_QUESTIONS.forEach(q => {
            if (selections[q.id] === q.correctAnswer) score++;
          });
          onComplete(score);
          return;
        }
      } else {
        setCurrentIdx(prev => prev - 1);
      }
      setAnimating(false);
    }, 200);
  };

  return (
    <Card className={cn(
      'glass-card overflow-hidden transition-opacity duration-200',
      animating ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0 animate-slide-in',
    )}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <CardHeader className="border-b bg-muted/20 pb-5">
        {/* Progress dots */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            {ASSESSMENT_QUESTIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => { if (selections[ASSESSMENT_QUESTIONS[i].id] !== undefined || i <= currentIdx) { setCurrentIdx(i); } }}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === currentIdx
                    ? 'w-6 h-2.5 bg-primary'
                    : selections[ASSESSMENT_QUESTIONS[i].id] !== undefined
                      ? 'w-2.5 h-2.5 bg-primary/40'
                      : 'w-2.5 h-2.5 bg-muted-foreground/20',
                )}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-primary px-2.5 py-1 rounded-full bg-primary/10">
            {t.donePercent(Math.round(((currentIdx + 1) / total) * 100))}
          </span>
        </div>

        {/* Topic tag + question number */}
        <div className="flex items-center gap-2 mb-3">
          <span className={cn('text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider', topicColor)}>
            {topicLabel}
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            {t.questionOf(currentIdx + 1, total)}
          </span>
        </div>

        <p className="text-lg font-bold leading-snug">
          {tl(currentQuestion.text, lang)}
        </p>
      </CardHeader>

      {/* ── Options ─────────────────────────────────────────────────────── */}
      <CardContent className="pt-5 pb-2 grid gap-3">
        {currentQuestion.options.map((option, idx) => {
          const active = selections[currentQuestion.id] === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelections({ ...selections, [currentQuestion.id]: idx })}
              className={cn(
                'group flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-200',
                'hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm',
                active
                  ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/20'
                  : 'border-border bg-card',
              )}
            >
              {/* Letter badge */}
              <div className={cn(
                'w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 transition-all duration-200',
                active
                  ? 'bg-primary text-white shadow-md shadow-primary/30'
                  : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary',
              )}>
                {active ? <Check className="w-4 h-4 stroke-[3]" /> : OPTION_LABELS[idx]}
              </div>

              <span className={cn(
                'text-sm leading-relaxed transition-colors',
                active ? 'text-primary font-semibold' : 'text-card-foreground',
              )}>
                {tl(option, lang)}
              </span>
            </button>
          );
        })}
      </CardContent>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <CardFooter className="flex justify-between border-t bg-muted/10 py-5 mt-2">
        <Button variant="outline" onClick={() => navigate('prev')} disabled={currentIdx === 0} className="rounded-full px-5">
          <ChevronLeft className="me-1 h-4 w-4" /> {t.previous}
        </Button>
        <Button
          className={cn('rounded-full px-7', isSelected ? 'gradient-bg shadow-md' : 'bg-muted text-muted-foreground')}
          onClick={() => navigate('next')}
          disabled={!isSelected}
        >
          {currentIdx === total - 1 ? t.finishSection : t.next}
          <ChevronRight className="ms-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
