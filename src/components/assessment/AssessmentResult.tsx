'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, ArrowRight, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  score: number;
  maxScore: number;
  onContinue: () => void;
}

export function AssessmentResult({ score, maxScore, onContinue }: Props) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const percentage = (score / maxScore) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 500);
    return () => clearTimeout(timer);
  }, [score]);

  const getStatus = () => {
    if (percentage >= 80) return { label: 'Excellent', color: 'text-primary' };
    if (percentage >= 60) return { label: 'Good', color: 'text-secondary' };
    return { label: 'Needs Improvement', color: 'text-orange-500' };
  };

  const status = getStatus();

  return (
    <Card className="glass-card overflow-hidden animate-fade-in text-center p-8">
      <div className="mb-8 relative inline-flex items-center justify-center">
        {/* SVG Circular Progress */}
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            className="text-muted/20"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={440}
            strokeDashoffset={440 - (440 * percentage) / 100}
            strokeLinecap="round"
            className={cn("transition-all duration-1000 ease-out", status.color.replace('text', 'stroke'))}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold tracking-tighter">{animatedScore}/{maxScore}</span>
          <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Points</span>
        </div>
      </div>

      <CardHeader className="pt-0">
        <CardTitle className={cn("text-3xl font-black mb-1", status.color)}>
          {status.label}!
        </CardTitle>
        <CardDescription className="text-base">
          You have successfully completed the PathMind assessment. Your commitment to learning is impressive.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4 my-4">
        <div className="bg-muted/30 p-4 rounded-2xl flex flex-col items-center">
          <span className="text-xs text-muted-foreground uppercase font-bold mb-1">Time Spent</span>
          <span className="font-bold">12:45 min</span>
        </div>
        <div className="bg-muted/30 p-4 rounded-2xl flex flex-col items-center">
          <span className="text-xs text-muted-foreground uppercase font-bold mb-1">Accuracy</span>
          <span className="font-bold">{Math.round(percentage)}%</span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <Button size="lg" className="w-full gradient-bg rounded-full py-8 text-lg" onClick={onContinue}>
          Continue to Action Plan <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <button className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2">
          <RefreshCcw className="w-4 h-4" /> Retake Assessment
        </button>
      </CardFooter>
    </Card>
  );
}