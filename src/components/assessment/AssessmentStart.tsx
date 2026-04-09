'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, BookOpen, Rocket } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export function AssessmentStart({ onStart }: Props) {
  return (
    <Card className="glass-card text-center overflow-hidden border-none">
      <div className="h-32 gradient-bg flex items-center justify-center relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-lg relative z-10">
          <BookOpen className="w-10 h-10 text-primary" />
        </div>
      </div>
      <CardHeader className="pt-8">
        <CardTitle className="text-3xl font-bold">Final Assessment</CardTitle>
        <CardDescription className="text-base max-w-md mx-auto">
          Evaluate your learning and apply it in real-world professional scenarios to earn your certification.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
        <div className="p-4 rounded-xl bg-muted/50 flex flex-col items-center">
          <Trophy className="w-5 h-5 text-yellow-500 mb-2" />
          <span className="text-sm font-semibold">3 Levels</span>
        </div>
        <div className="p-4 rounded-xl bg-muted/50 flex flex-col items-center">
          <Rocket className="w-5 h-5 text-secondary mb-2" />
          <span className="text-sm font-semibold">Interactive</span>
        </div>
        <div className="p-4 rounded-xl bg-muted/50 flex flex-col items-center">
          <BookOpen className="w-5 h-5 text-primary mb-2" />
          <span className="text-sm font-semibold">15 Minutes</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-8">
        <Button size="lg" className="w-full max-w-sm rounded-full py-6 text-lg gradient-bg" onClick={onStart}>
          Start Assessment
        </Button>
      </CardFooter>
    </Card>
  );
}