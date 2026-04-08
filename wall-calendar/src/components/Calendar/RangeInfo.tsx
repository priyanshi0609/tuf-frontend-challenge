'use client';

import { memo } from 'react';
import { X, CalendarRange } from 'lucide-react';
import clsx from 'clsx';
import { formatRange, rangeDays } from '@/utils/calendarUtils';
import { THEME_COLORS } from '@/data/calendar';
import type { DateRange, ThemeAccent } from '@/types';

interface RangeInfoProps {
  range:   DateRange;
  accent:  ThemeAccent;
  onClear: () => void;
}

/**
 * RangeInfo
 *
 * A compact pill that appears below the grid when a date (range) is selected.
 * Shows the formatted date range, day count, and a clear (×) button.
 * Fades in via animate-fade-in; hidden when no start date selected.
 */
export const RangeInfo = memo(function RangeInfo({
  range,
  accent,
  onClear,
}: RangeInfoProps) {
  const colors = THEME_COLORS[accent];
  const label  = formatRange(range);
  const days   = rangeDays(range);

  // Nothing selected — render nothing
  if (!range.start) return null;

  return (
    <div
      className={clsx(
        'mx-3 mb-2',
        'flex items-center gap-2',
        'px-3 py-2',
        'rounded-xl border',
        'text-sm',
        'animate-fade-in',
      )}
      style={{
        backgroundColor: colors.light,
        borderColor:     colors.hover,
        color:           colors.dark,
      }}
    >
      {/* Icon */}
      <CalendarRange size={13} className="shrink-0 opacity-60" />

      {/* Label */}
      <div className="flex-1 min-w-0">
        <span className="font-semibold text-xs truncate">{label}</span>
        {days > 1 && (
          <span className="ml-1.5 text-[11px] opacity-60">
            ({days} day{days !== 1 ? 's' : ''})
          </span>
        )}
      </div>

      {/* Clear button */}
      <button
        onClick={onClear}
        aria-label="Clear date selection"
        className="shrink-0 p-0.5 rounded-full hover:bg-black/10 transition-colors"
      >
        <X size={12} />
      </button>
    </div>
  );
});