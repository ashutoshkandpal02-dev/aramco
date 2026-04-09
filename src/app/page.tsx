'use client';

import { useState } from 'react';
import { AssessmentStart } from '@/components/assessment/AssessmentStart';
import { AssessmentQuestions } from '@/components/assessment/AssessmentQuestions';
import { ScenarioBranching } from '@/components/assessment/ScenarioBranching';
import { AssessmentResult } from '@/components/assessment/AssessmentResult';
import { ActionPlanForm } from '@/components/assessment/ActionPlanForm';
import { SubmissionSuccess } from '@/components/assessment/SubmissionSuccess';
import { NudgesPreview } from '@/components/assessment/NudgesPreview';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/lib/i18n-context';
import { ASSESSMENT_QUESTIONS } from '@/app/lib/assessment-data';

type FlowState = 'START' | 'QUESTIONS' | 'SCENARIO' | 'RESULT' | 'ACTION_PLAN' | 'SUCCESS' | 'NUDGES';

export default function PathMindPro() {
  const [currentStep, setCurrentStep] = useState<FlowState>('START');
  const [score, setScore] = useState(0);
  const [planData, setPlanData] = useState<{ commitments: string[], timeline: string } | null>(null);
  const { t } = useLanguage();

  const getProgress = () => {
    switch (currentStep) {
      case 'START': return 0;
      case 'QUESTIONS': return 30;
      case 'SCENARIO': return 60;
      case 'RESULT': return 80;
      case 'ACTION_PLAN': return 90;
      case 'SUCCESS': return 100;
      case 'NUDGES': return 100;
      default: return 0;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      {/* Header Info */}
      <div className="w-full max-w-3xl mb-8 flex flex-col items-center">
        <div className="w-full flex justify-end mb-4" dir="ltr">
          <LanguageSwitcher />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-sm">A</span>
          <span className="gradient-text">{t.appTitle}</span>
        </h1>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-4">
          <div 
            className="h-full gradient-bg transition-all duration-700 ease-in-out" 
            style={{ width: `${getProgress()}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 font-medium uppercase tracking-wider">
          {t.journeyCompleted(getProgress())}
        </p>
      </div>

      <main className="w-full max-w-3xl animate-fade-in">
        {currentStep === 'START' && (
          <AssessmentStart onStart={() => setCurrentStep('QUESTIONS')} />
        )}
        
        {currentStep === 'QUESTIONS' && (
          <AssessmentQuestions onComplete={(s) => {
            setScore(s);
            setCurrentStep('SCENARIO');
          }} />
        )}

        {currentStep === 'SCENARIO' && (
          <ScenarioBranching onComplete={(scenarioScore) => {
            setScore(prev => prev + scenarioScore);
            setCurrentStep('RESULT');
          }} />
        )}

        {currentStep === 'RESULT' && (
          <AssessmentResult 
            score={score} 
            maxScore={ASSESSMENT_QUESTIONS.length} 
            onContinue={() => setCurrentStep('ACTION_PLAN')} 
          />
        )}

        {currentStep === 'ACTION_PLAN' && (
          <ActionPlanForm onSubmit={(data) => {
            setPlanData(data);
            setCurrentStep('SUCCESS');
          }} />
        )}

        {currentStep === 'SUCCESS' && (
          <SubmissionSuccess onNext={() => setCurrentStep('NUDGES')} />
        )}

        {currentStep === 'NUDGES' && (
          <NudgesPreview commitments={planData?.commitments || []} timeline={planData?.timeline as any || '1 week'} />
        )}
      </main>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        {t.copyright(new Date().getFullYear())}
      </footer>
    </div>
  );
}
