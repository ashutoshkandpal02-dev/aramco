'use client';

import { useEffect, useState } from 'react';
import { NudgeCard } from '@/components/nudges/NudgeCard';
import { generateNudges, CommitmentNudge } from '@/lib/nudge-generator';
import { useLanguage } from '@/lib/i18n-context';
import { cn } from '@/lib/utils';
import { Brain, RefreshCw, Sparkles } from 'lucide-react';

interface Props {
  commitments: string[];
  timeline: '1 week' | '2 weeks' | '1 month';
}

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-gray-100" />
        <div className="w-14 h-5 rounded-full bg-gray-100" />
      </div>
      <div className="h-4 bg-gray-100 rounded w-32 mb-2" />
      <div className="w-8 h-0.5 bg-gray-100 rounded mb-3" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
        <div className="h-3 bg-gray-100 rounded w-4/6" />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function NudgesPreview({ commitments, timeline }: Props) {
  const { t, lang } = useLanguage();
  const [nudgeData, setNudgeData] = useState<CommitmentNudge[]>([]);
  const [loading, setLoading] = useState(true);
  const [variant, setVariant] = useState(0);
  const [visible, setVisible] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  // Simulate a brief AI "thinking" delay
  useEffect(() => {
    setLoading(true);
    setVisible(false);
    const timer = setTimeout(() => {
      setNudgeData(generateNudges(commitments, lang, variant));
      setLoading(false);
      // Tiny extra tick so the DOM paints skeletons out before cards appear
      requestAnimationFrame(() => setTimeout(() => setVisible(true), 80));
    }, 1400);
    return () => clearTimeout(timer);
  }, [commitments, lang, variant]);

  const handleRegenerate = () => {
    if (regenerating) return;
    setRegenerating(true);
    setVisible(false);
    setTimeout(() => {
      setVariant(v => v + 1);
      setRegenerating(false);
    }, 600);
  };

  const dayCards = [
    { key: 'day1' as const, label: t.day1Title, short: t.day1, accent: 'green' as const },
    { key: 'day3' as const, label: t.day3Title, short: t.day3, accent: 'blue' as const },
    { key: 'day7' as const, label: t.day7Title, short: t.day7, accent: 'purple' as const },
  ];

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ── Gradient hero header ─────────────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#22C55E] via-[#16a34a] to-[#2563EB] p-8 md:p-10 text-white text-center shadow-2xl">
        {/* decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-8 -right-8 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-bold">
            <Brain className="w-4 h-4" />
            <span>{t.aiTag}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black">{t.yourSmartReminders}</h2>
          <p className="text-white/80 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            {t.aiPoweredNudgesSubtitle}
          </p>
        </div>
      </div>

      {/* ── Nudge grid / skeleton ────────────────────────────────────────── */}
      {loading ? (
        <div className="space-y-10">
          {commitments.filter(Boolean).map((_, ci) => (
            <div key={ci} className="space-y-4">
              <div className="h-5 bg-gray-100 rounded animate-pulse w-1/2" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-10">
          {nudgeData.map((item, ci) => (
            <div key={ci} className="space-y-4">
              {/* Commitment header */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white text-xs font-black shrink-0 mt-0.5">
                  {ci + 1}
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {t.commitment}
                  </span>
                  <p className="text-sm font-bold text-foreground leading-snug mt-0.5 break-words">
                    {item.commitment}
                  </p>
                </div>
              </div>

              {/* 3-column card grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dayCards.map((dc, di) => (
                  <NudgeCard
                    key={dc.key}
                    dayLabel={dc.label}
                    dayShort={dc.short}
                    message={item.nudges[dc.key]}
                    accent={dc.accent}
                    index={ci * 3 + di}
                    visible={visible}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Regenerate button ─────────────────────────────────────────────── */}
      {!loading && (
        <div className="flex justify-center pt-2">
          <button
            onClick={handleRegenerate}
            disabled={regenerating}
            className={cn(
              'flex items-center gap-2.5 px-6 py-3 rounded-full border-2 border-dashed',
              'border-green-300 text-green-700 font-bold text-sm',
              'hover:bg-green-50 hover:border-green-400 hover:shadow-md',
              'transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
            )}
          >
            <RefreshCw className={cn('w-4 h-4 transition-transform', regenerating && 'animate-spin')} />
            {t.regenerateNudges}
          </button>
        </div>
      )}

      {/* ── All Set completion card ───────────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#22C55E] to-[#2563EB] text-white text-center p-10 shadow-2xl">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Sparkles className="absolute -top-6 -end-6 w-40 h-40 text-white/10" />
        </div>
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-black mb-2">{t.allSet}</h3>
          <p className="text-white/80 text-base mb-8 max-w-sm mx-auto leading-relaxed">
            {t.allSetDescription}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-green-600 font-bold px-8 py-3.5 rounded-full hover:bg-white/90 transition-all shadow-xl text-sm hover:scale-105 active:scale-95"
          >
            {t.finishSession}
          </button>
        </div>
      </div>
    </div>
  );
}