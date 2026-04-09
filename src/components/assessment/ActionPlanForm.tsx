'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Send, Calendar, Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n-context';

interface Props {
  onSubmit: (data: { commitments: string[], timeline: string }) => void;
}

// ── Category detector (mirrors nudge-generator keyword map) ──────────────────
const CATEGORY_MAP: { en: string; ar: string; color: string; keywords: string[] }[] = [
  { en: 'Communication', ar: 'التواصل',        color: 'bg-blue-50 text-blue-600 border-blue-200',     keywords: ['communicat','speak','listen','present','verbal','express'] },
  { en: 'Leadership',    ar: 'القيادة',         color: 'bg-purple-50 text-purple-600 border-purple-200', keywords: ['lead','initiative','motivat','inspir','vision','strateg','influence'] },
  { en: 'Teamwork',      ar: 'العمل الجماعي',   color: 'bg-green-50 text-green-600 border-green-200',   keywords: ['team','collaborat','colleague','cowork','partner','together','cooperat'] },
  { en: 'Time Mgmt',     ar: 'إدارة الوقت',     color: 'bg-orange-50 text-orange-600 border-orange-200', keywords: ['time','schedule','deadline','priorit','productiv','organiz','plan','manag'] },
  { en: 'Feedback',      ar: 'التغذية الراجعة', color: 'bg-pink-50 text-pink-600 border-pink-200',    keywords: ['feedback','review','evaluat','assess','apprais','critique','input'] },
  { en: 'Learning',      ar: 'التعلّم',          color: 'bg-teal-50 text-teal-600 border-teal-200',     keywords: ['learn','skill','course','train','develop','grow','knowledge','study'] },
];

function detectCategory(text: string) {
  const lower = text.toLowerCase();
  return CATEGORY_MAP.find(c => c.keywords.some(kw => lower.includes(kw))) ?? null;
}

export function ActionPlanForm({ onSubmit }: Props) {
  const [commitments, setCommitments] = useState<string[]>(['', '']);
  const [timeline, setTimeline] = useState('1 week');
  const [priority, setPriority] = useState('medium');
  const { t, lang } = useLanguage();

  const addCommitment = () => setCommitments([...commitments, '']);
  const updateCommitment = (idx: number, val: string) => {
    const next = [...commitments];
    next[idx] = val;
    setCommitments(next);
  };
  const removeCommitment = (idx: number) => {
    if (commitments.length > 1) setCommitments(commitments.filter((_, i) => i !== idx));
  };

  const isComplete = commitments.every(c => c.trim().length > 0);

  return (
    <Card className="glass-card overflow-hidden animate-slide-in">
      <CardHeader className="border-b bg-muted/10 p-8">
        <div className="flex items-center gap-2 text-primary font-bold mb-1">
          <Star className="w-4 h-4 fill-primary" />
          <span className="text-xs uppercase tracking-widest">{t.postAssessmentWorkshop}</span>
        </div>
        <CardTitle className="text-3xl font-black">{t.yourActionPlan}</CardTitle>
        <CardDescription className="text-base text-card-foreground">
          {t.actionPlanDescription}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-8 space-y-6">
        {/* Commitment fields */}
        <div className="space-y-5">
          {commitments.map((commit, idx) => {
            const cat = detectCategory(commit);
            return (
              <div key={idx} className="space-y-2 animate-fade-in">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-bold flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black">
                      {idx + 1}
                    </span>
                    {t.commitment} {idx + 1}
                  </Label>
                  <div className="flex items-center gap-2">
                    {/* Smart category badge */}
                    {cat && (
                      <span className={cn('inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border', cat.color)}>
                        <Sparkles className="w-2.5 h-2.5" />
                        {lang === 'ar' ? cat.ar : cat.en}
                      </span>
                    )}
                    {commitments.length > 1 && (
                      <button onClick={() => removeCommitment(idx)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <Textarea
                  placeholder={t.commitmentPlaceholder}
                  value={commit}
                  onChange={(e) => updateCommitment(idx, e.target.value)}
                  className="resize-none h-24 rounded-2xl border-muted bg-muted/20 focus:bg-white transition-all focus:ring-secondary/20"
                />
                {/* Character count */}
                <div className="flex justify-end">
                  <span className={cn('text-[10px] font-medium', commit.length > 150 ? 'text-orange-500' : 'text-muted-foreground')}>
                    {commit.length}/200
                  </span>
                </div>
              </div>
            );
          })}

          <Button
            variant="outline"
            onClick={addCommitment}
            disabled={commitments.length >= 4}
            className="w-full border-dashed border-2 py-7 rounded-2xl hover:bg-primary/5 hover:border-primary transition-all text-muted-foreground"
          >
            <Plus className="me-2 h-4 w-4" /> {t.addCommitment}
          </Button>
        </div>

        {/* Timeline + Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-3">
            <Label className="font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" /> {t.implementationTimeline}
            </Label>
            <Select value={timeline} onValueChange={setTimeline}>
              <SelectTrigger className="rounded-xl h-12 bg-muted/20 border-muted">
                <SelectValue placeholder={t.selectTimeframe} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 week">{t.next7Days}</SelectItem>
                <SelectItem value="2 weeks">{t.next14Days}</SelectItem>
                <SelectItem value="1 month">{t.next30Days}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="font-bold">{t.priorityLevel}</Label>
            <div className="flex gap-2 p-1 bg-muted/20 rounded-xl border border-muted">
              {([
                { key: 'low',    label: t.low    },
                { key: 'medium', label: t.medium  },
                { key: 'high',   label: t.high   },
              ] as const).map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPriority(p.key)}
                  className={cn(
                    'flex-1 py-2 rounded-lg text-sm font-bold transition-all',
                    priority === p.key ? 'bg-white text-secondary shadow-sm' : 'text-muted-foreground hover:bg-white/50',
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI nudges hint banner */}
        <div className="rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {lang === 'ar'
              ? 'بمجرد تقديم خطتك، سيولّد الذكاء الاصطناعي تذكيرات مخصصة في اليوم ١ و٣ و٧ مبنية على التزاماتك.'
              : 'Once submitted, AI will generate personalised Day 1, Day 3 & Day 7 nudges tailored to each commitment above.'}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-8 border-t bg-muted/5">
        <Button
          disabled={!isComplete}
          className="w-full py-7 rounded-full text-base font-bold gradient-bg shadow-2xl hover:scale-[1.01] transition-transform active:scale-95"
          onClick={() => onSubmit({ commitments, timeline })}
        >
          <Send className="me-2 h-5 w-5" /> {t.submitActionPlan}
        </Button>
      </CardFooter>
    </Card>
  );
}
