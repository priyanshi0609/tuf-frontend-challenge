'use client';

import { memo } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';
import { MONTH_NAMES, THEME_COLORS } from '@/data/calendar';
import type { ThemeAccent } from '@/types';

interface CalendarHeaderProps {
  currentDate:  Date;
  accent:       ThemeAccent;
  onPrev:       () => void;
  onNext:       () => void;
  onToday:      () => void;
  isAnimating:  boolean;
}

/**
 * CalendarHeader
 *
 * Renders two rows:
 *  1. Spiral binding — a row of ring shapes mimicking a physical wall calendar
 *  2. Navigation bar — prev arrow / month+year title / today button / next arrow
 */
export const CalendarHeader = memo(function CalendarHeader({
  currentDate,
  accent,
  onPrev,
  onNext,
  onToday,
  isAnimating,
}: CalendarHeaderProps) {
  const colors = THEME_COLORS[accent];
  const month  = MONTH_NAMES[currentDate.getMonth()];
  const year   = format(currentDate, 'yyyy');

  return (
    <div className="select-none">

      {/* ── Row 1: Spiral Binding ─────────────────────────────────────────── */}
      <div className="
        flex items-center justify-center gap-[9px]
        py-2 px-6
        bg-paper-200 dark:bg-paper-800
        border-b border-paper-300 dark:border-paper-700
      ">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="spiral-ring"
            aria-hidden="true"
          />
        ))}
      </div>

      {/* ── Row 2: Navigation ────────────────────────────────────────────── */}
      <div className="
        flex items-center justify-between
        px-4 py-2
        bg-white dark:bg-paper-900
        border-b border-paper-200 dark:border-paper-800
      ">

        {/* Prev month */}
        <button
          onClick={onPrev}
          disabled={isAnimating}
          aria-label="Previous month"
          className={clsx(
            'flex items-center justify-center w-8 h-8 rounded-full',
            'text-paper-500 dark:text-paper-400',
            'hover:text-paper-900 dark:hover:text-paper-100',
            'hover:bg-paper-100 dark:hover:bg-paper-800',
            'transition-all duration-150',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1'
          )}
        >
          <ChevronLeft size={17} strokeWidth={2.5} />
        </button>

        {/* Month + Year */}
        <div className="flex flex-col items-center leading-none gap-0.5">
          <span
            className="text-[11px] font-semibold tracking-[0.2em] uppercase"
            style={{ color: colors.primary }}
          >
            {year}
          </span>
          <span className="
            text-[17px] font-bold tracking-tight
            text-paper-900 dark:text-paper-50
            font-display
          ">
            {month}
          </span>
        </div>

        {/* Today + Next */}
        <div className="flex items-center gap-1">
          <button
            onClick={onToday}
            aria-label="Jump to today"
            className={clsx(
              'hidden sm:flex items-center gap-1',
              'px-2.5 py-1 rounded-full',
              'text-[11px] font-semibold',
              'border border-paper-200 dark:border-paper-700',
              'text-paper-500 dark:text-paper-400',
              'hover:text-paper-900 dark:hover:text-white',
              'hover:bg-paper-50 dark:hover:bg-paper-800',
              'transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-2'
            )}
          >
            <CalendarDays size={11} />
            Today
          </button>

          <button
            onClick={onNext}
            disabled={isAnimating}
            aria-label="Next month"
            className={clsx(
              'flex items-center justify-center w-8 h-8 rounded-full',
              'text-paper-500 dark:text-paper-400',
              'hover:text-paper-900 dark:hover:text-paper-100',
              'hover:bg-paper-100 dark:hover:bg-paper-800',
              'transition-all duration-150',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1'
            )}
          >
            <ChevronRight size={17} strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </div>
  );
});