'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, BookOpen, Rocket, MessageSquare, Users, Clock, Star, Brain, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/lib/i18n-context';

interface Props {
  onStart: () => void;
}

const TOPIC_ICONS = [
  { key: 'topicCommunication' as const, icon: MessageSquare, color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { key: 'topicLeadership' as const,    icon: TrendingUp,    color: 'bg-purple-50 text-purple-600 border-purple-100' },
  { key: 'topicTeamwork' as const,      icon: Users,         color: 'bg-green-50 text-green-600 border-green-100' },
  { key: 'topicTime' as const,          icon: Clock,         color: 'bg-orange-50 text-orange-600 border-orange-100' },
  { key: 'topicFeedback' as const,      icon: Star,          color: 'bg-pink-50 text-pink-600 border-pink-100' },
  { key: 'topicLearning' as const,      icon: Brain,         color: 'bg-teal-50 text-teal-600 border-teal-100' },
];

export function AssessmentStart({ onStart }: Props) {
  const { t } = useLanguage();
  return (
    <Card className="glass-card text-center overflow-hidden border-none">
      {/* Hero banner */}
      <div className="h-40 gradient-bg flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
            <circle cx="60" cy="80" r="120" fill="white" opacity="0.4" />
            <circle cx="340" cy="40" r="90" fill="white" opacity="0.3" />
            <circle cx="200" cy="160" r="80" fill="white" opacity="0.2" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <span className="text-white/90 text-sm font-bold uppercase tracking-widest">
            {t.topicsLabel}
          </span>
        </div>
      </div>

      <CardHeader className="pt-8 pb-4">
        <CardTitle className="text-3xl font-black">{t.finalAssessment}</CardTitle>
        <CardDescription className="text-base max-w-md mx-auto leading-relaxed">
          {t.assessmentDescription}
        </CardDescription>
      </CardHeader>

      {/* Topic pills */}
      <CardContent className="pb-2">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {TOPIC_ICONS.map(({ key, icon: Icon, color }) => (
            <span
              key={key}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${color}`}
            >
              <Icon className="w-3 h-3" />
              {t[key]}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-muted/50 flex flex-col items-center gap-1">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-bold">{t.levels3}</span>
          </div>
          <div className="p-4 rounded-2xl bg-muted/50 flex flex-col items-center gap-1">
            <Rocket className="w-5 h-5 text-secondary" />
            <span className="text-sm font-bold">{t.interactive}</span>
          </div>
          <div className="p-4 rounded-2xl bg-muted/50 flex flex-col items-center gap-1">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold">{t.minutes15}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center pb-8 pt-6">
        <Button size="lg" className="w-full max-w-sm rounded-full py-6 text-lg gradient-bg shadow-xl hover:scale-[1.02] transition-transform active:scale-95" onClick={onStart}>
          {t.startAssessment}
        </Button>
      </CardFooter>
    </Card>
  );
}