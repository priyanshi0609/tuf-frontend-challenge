'use client';

import { memo } from 'react';
import clsx from 'clsx';
import { THEME_COLORS, DAY_NAMES_SHORT } from '@/data/calendar';
import { DayCell } from './DayCell';
import type { DayCell as DayCellType, DateRange, ThemeAccent } from '@/types';

interface CalendarGridProps {
  grid:        DayCellType[];
  range:       DateRange;
  accent:      ThemeAccent;
  isAnimating: boolean;
  animDir:     'next' | 'prev';
  onDayClick:  (date: Date) => void;
  onDayHover:  (date: Date) => void;
  onDayLeave:  () => void;
}

/**
 * CalendarGrid
 *
 * Renders:
 *  - Weekday header row (MON … SUN)
 *  - 7-column date cell grid (up to 6 rows for a full month)
 *
 * The grid animates on month navigation:
 *  - Going forward → slides up   (animate-slide-in-up)
 *  - Going back    → slides right (animate-slide-in-right)
 */
export const CalendarGrid = memo(function CalendarGrid({
  grid,
  accent,
  isAnimating,
  animDir,
  onDayClick,
  onDayHover,
  onDayLeave,
}: CalendarGridProps) {
  const colors = THEME_COLORS[accent];

  return (
    <div className="px-3 pt-1 pb-2">

      {/* ── Weekday Headers ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES_SHORT.map((day, i) => (
          <div
            key={day}
            className={clsx(
              'flex items-center justify-center',
              'py-1.5',
              'text-[9px] sm:text-[10px] font-bold tracking-widest uppercase',
              // Saturday + Sunday use accent color; weekdays are muted
              i >= 5
                ? 'font-extrabold'
                : 'text-paper-400 dark:text-paper-600'
            )}
            style={i >= 5 ? { color: colors.text } : undefined}
          >
            {day}
          </div>
        ))}
      </div>

      {/* ── Date Cell Grid ────────────────────────────────────────────────── */}
      <div
        className={clsx(
          'grid grid-cols-7 gap-y-0.5',
          // Slide animation on month change
          isAnimating && animDir === 'next' && 'animate-slide-in-up',
          isAnimating && animDir === 'prev' && 'animate-slide-in-right'
        )}
      >
        {grid.map((cell) => (
          <DayCell
            key={cell.date.toISOString()}
            cell={cell}
            accent={accent}
            onClick={onDayClick}
            onMouseEnter={onDayHover}
            onMouseLeave={onDayLeave}
          />
        ))}
      </div>
    </div>
  );
});