'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generatePersonalizedNudges, GenerateNudgesOutput } from '@/ai/flows/generate-personalized-nudges';
import { Target, Zap, Loader2, Sparkles, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n-context';

interface Props {
  commitments: string[];
  timeline: '1 week' | '2 weeks' | '1 month';
}

export function NudgesPreview({ commitments, timeline }: Props) {
  const [nudges, setNudges] = useState<GenerateNudgesOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useLanguage();

  useEffect(() => {
    async function fetchNudges() {
      try {
        const result = await generatePersonalizedNudges({ commitments, timeline, language: lang });
        setNudges(result);
      } catch (error) {
        console.error("Error generating nudges:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNudges();
  }, [commitments, timeline, lang]);

  if (loading) {
    return (
      <Card className="glass-card p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center mb-6">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
        <h3 className="text-xl font-bold mb-2">{t.generatingNudges}</h3>
        <p className="text-muted-foreground max-w-xs">{t.nudgesGeneratingMessage}</p>
      </Card>
    );
  }

  const notificationCards = [
    { 
      day: t.day1, 
      title: t.quickKickoff, 
      message: nudges?.day1Nudge, 
      icon: <Zap className="w-4 h-4 text-orange-500" />,
      color: 'bg-orange-500/10'
    },
    { 
      day: t.day3, 
      title: t.progressCheck, 
      message: nudges?.day3Nudge, 
      icon: <Target className="w-4 h-4 text-primary" />,
      color: 'bg-primary/10'
    },
    { 
      day: t.day7, 
      title: t.momentumBoost, 
      message: nudges?.day7Nudge, 
      icon: <Sparkles className="w-4 h-4 text-secondary" />,
      color: 'bg-secondary/10'
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black mb-2 flex items-center justify-center gap-2">
          {t.yourSmartJourney} <Sparkles className="w-6 h-6 text-primary fill-primary/20" />
        </h2>
        <p className="text-muted-foreground">{t.nudgesSubtitle}</p>
      </div>

      <div className="space-y-4">
        {notificationCards.map((n, i) => (
          <div 
            key={i} 
            className="group relative animate-slide-in"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div className="absolute start-4 top-0 bottom-0 w-px bg-gradient-to-b from-border via-primary/20 to-border" />
            <div className="ms-12 bg-white rounded-3xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex gap-5 overflow-hidden">
              <div className={cn("w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center", n.color)}>
                {n.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                    {n.day} {t.reminder}
                  </span>
                  <div className="flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-[10px] text-muted-foreground font-medium">{t.justNow}</span>
                  </div>
                </div>
                <h4 className="font-bold text-sm mb-2">{n.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 italic">
                  &ldquo;{n.message}&rdquo;
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Card className="glass-card mt-12 bg-primary text-white border-none text-center p-10 overflow-hidden relative">
        <div className="absolute top-0 end-0 p-4 opacity-10">
          <Check className="w-40 h-40" />
        </div>
        <CardHeader className="p-0 mb-6 relative z-10">
          <CardTitle className="text-3xl font-black">{t.allSet}</CardTitle>
          <CardDescription className="text-white/80 text-base">
            {t.allSetDescription}
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-0 justify-center relative z-10">
          <Button size="lg" variant="secondary" className="rounded-full px-12 py-8 text-lg font-bold bg-white text-primary hover:bg-white/90 shadow-2xl" onClick={() => window.location.reload()}>
            {t.finishSession}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}