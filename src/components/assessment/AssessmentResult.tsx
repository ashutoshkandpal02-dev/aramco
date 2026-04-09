'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, RefreshCcw, MessageSquare, Users, Clock, Star, Brain, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n-context';

interface Props {
  score: number;
  maxScore: number;
  onContinue: () => void;
}

const SKILL_BADGES = [
  { icon: MessageSquare, en: 'Communication', ar: 'التواصل',      color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { icon: TrendingUp,    en: 'Leadership',    ar: 'القيادة',       color: 'bg-purple-50 text-purple-600 border-purple-200' },
  { icon: Users,         en: 'Teamwork',      ar: 'العمل الجماعي', color: 'bg-green-50 text-green-600 border-green-200' },
  { icon: Clock,         en: 'Time Mgmt',     ar: 'إدارة الوقت',   color: 'bg-orange-50 text-orange-600 border-orange-200' },
  { icon: Star,          en: 'Feedback',      ar: 'التغذية الراجعة', color: 'bg-pink-50 text-pink-600 border-pink-200' },
  { icon: Brain,         en: 'Learning',      ar: 'التعلّم',        color: 'bg-teal-50 text-teal-600 border-teal-200' },
];

export function AssessmentResult({ score, maxScore, onContinue }: Props) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const percentage = (score / maxScore) * 100;
  const { t, lang } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 500);
    return () => clearTimeout(timer);
  }, [score]);

  const getStatus = () => {
    if (percentage >= 80) return { label: t.excellent, color: 'text-primary',     ring: 'stroke-primary'    };
    if (percentage >= 60) return { label: t.good,      color: 'text-secondary',   ring: 'stroke-secondary'  };
    return                       { label: t.needsImprovement, color: 'text-orange-500', ring: 'stroke-orange-500' };
  };

  const status = getStatus();

  return (
    <Card className="glass-card overflow-hidden animate-fade-in text-center">
      <div className="p-8 pb-0">
        {/* Score ring */}
        <div className="mb-6 relative inline-flex items-center justify-center">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="68" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-muted/20" />
            <circle
              cx="80" cy="80" r="68"
              stroke="currentColor" strokeWidth="10" fill="transparent"
              strokeDasharray={427}
              strokeDashoffset={427 - (427 * percentage) / 100}
              strokeLinecap="round"
              className={cn('transition-all duration-1000 ease-out', status.ring)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold tracking-tighter">{animatedScore}/{maxScore}</span>
            <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">{t.points}</span>
          </div>
        </div>

        <CardHeader className="pt-0 pb-4">
          <CardTitle className={cn('text-3xl font-black mb-1', status.color)}>
            {status.label}!
          </CardTitle>
          <CardDescription className="text-base">
            {t.assessmentCompleted}
          </CardDescription>
        </CardHeader>

        {/* Stats */}
        <CardContent className="pb-0">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-muted/30 p-4 rounded-2xl flex flex-col items-center">
              <span className="text-xs text-muted-foreground uppercase font-bold mb-1">{t.timeSpent}</span>
              <span className="font-bold">12:45 min</span>
            </div>
            <div className="bg-muted/30 p-4 rounded-2xl flex flex-col items-center">
              <span className="text-xs text-muted-foreground uppercase font-bold mb-1">{t.accuracy}</span>
              <span className="font-bold">{Math.round(percentage)}%</span>
            </div>
          </div>

          {/* Skills covered */}
          <div className="rounded-2xl border bg-muted/20 p-4 mb-2 text-left">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">{t.topicsLabel}</p>
            <div className="flex flex-wrap gap-2">
              {SKILL_BADGES.map(({ icon: Icon, en, ar, color }) => (
                <span key={en} className={cn('inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold', color)}>
                  <Icon className="w-3 h-3" />
                  {lang === 'ar' ? ar : en}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </div>

      <CardFooter className="flex flex-col gap-3 p-8">
        <Button size="lg" className="w-full gradient-bg rounded-full py-7 text-base font-bold" onClick={onContinue}>
          {t.continueToActionPlan} <ArrowRight className="ms-2 w-5 h-5" />
        </Button>
        <button className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 py-1">
          <RefreshCcw className="w-4 h-4" /> {t.retakeAssessment}
        </button>
      </CardFooter>
    </Card>
  );
}
