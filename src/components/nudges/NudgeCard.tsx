'use client';

import { cn } from '@/lib/utils';
import { Calendar, TrendingUp, Award } from 'lucide-react';

const ACCENT_CONFIG = {
  green: {
    Icon: Calendar,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
    badge: 'bg-green-100 text-green-700',
    hoverBorder: 'hover:border-green-300',
    hoverShadow: 'hover:shadow-green-100/80',
    divider: 'bg-green-500',
    glow: 'from-green-50/60',
  },
  blue: {
    Icon: TrendingUp,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
    hoverBorder: 'hover:border-blue-300',
    hoverShadow: 'hover:shadow-blue-100/80',
    divider: 'bg-blue-500',
    glow: 'from-blue-50/60',
  },
  purple: {
    Icon: Award,
    iconColor: 'text-violet-600',
    iconBg: 'bg-violet-50',
    badge: 'bg-violet-100 text-violet-700',
    hoverBorder: 'hover:border-violet-300',
    hoverShadow: 'hover:shadow-violet-100/80',
    divider: 'bg-violet-500',
    glow: 'from-violet-50/60',
  },
} as const;

export interface NudgeCardProps {
  /** Full label displayed as the card heading e.g. "Day 1 · Motivation" */
  dayLabel: string;
  /** Short badge label e.g. "Day 1" */
  dayShort: string;
  /** The nudge message body */
  message: string;
  /** Visual accent colour theme */
  accent: keyof typeof ACCENT_CONFIG;
  /** Stagger index — drives animation delay */
  index: number;
  /** Controls fade-in visibility */
  visible: boolean;
}

export function NudgeCard({ dayLabel, dayShort, message, accent, index, visible }: NudgeCardProps) {
  const cfg = ACCENT_CONFIG[accent];
  const { Icon } = cfg;

  return (
    <div
      className={cn(
        // Base
        'group relative flex flex-col bg-white rounded-2xl border border-gray-100 p-5 shadow-sm',
        // Hover lift
        'transition-all duration-500 ease-out',
        'hover:shadow-xl hover:scale-[1.025] hover:-translate-y-1',
        cfg.hoverBorder,
        cfg.hoverShadow,
        // Staggered fade-in
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
      )}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      {/* Hover gradient overlay */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none',
          cfg.glow,
        )}
      />

      {/* Top row: icon + badge */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', cfg.iconBg)}>
          <Icon className={cn('w-5 h-5', cfg.iconColor)} />
        </div>
        <span className={cn('text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full', cfg.badge)}>
          {dayShort}
        </span>
      </div>

      {/* Title */}
      <h4 className="relative z-10 font-bold text-sm text-gray-800 mb-2 leading-snug">{dayLabel}</h4>

      {/* Accent divider */}
      <div className={cn('relative z-10 w-8 h-0.5 rounded-full mb-3', cfg.divider)} />

      {/* Message */}
      <p className="relative z-10 text-xs text-gray-500 leading-relaxed flex-1">{message}</p>
    </div>
  );
}
