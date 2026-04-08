import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameMonth, isToday, isSameDay,
  isWithinInterval, isAfter, format, addMonths, subMonths,
} from 'date-fns';
import type { DayCell, DateRange } from '@/types';
import { HOLIDAYS } from '@/data/calendar';

/**
 * Build the 6-week grid for a given month.
 * Week starts on Monday to match the reference image.
 */
export function buildCalendarGrid(date: Date, range: DateRange): DayCell[] {
  const monthStart = startOfMonth(date);
  const monthEnd   = endOfMonth(date);
  const gridStart  = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd    = endOfWeek(monthEnd,     { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  return days.map((day) => {
    const mmdd    = format(day, 'MM-dd');
    const holiday = HOLIDAYS.find((h) => h.date === mmdd);

    const isStart = range.start ? isSameDay(day, range.start) : false;
    const isEnd   = range.end   ? isSameDay(day, range.end)   : false;

    const isInRange =
      range.start && range.end
        ? isWithinInterval(day, {
            start: range.start < range.end ? range.start : range.end,
            end:   range.start < range.end ? range.end   : range.start,
          })
        : false;

    const dayOfWeek = day.getDay(); // 0 = Sun, 6 = Sat

    return {
      date:           day,
      isCurrentMonth: isSameMonth(day, date),
      isToday:        isToday(day),
      isSelected:     isStart || isEnd,
      isRangeStart:   isStart,
      isRangeEnd:     isEnd,
      isInRange:      isInRange && !isStart && !isEnd,
      isWeekend:      dayOfWeek === 0 || dayOfWeek === 6,
      holiday,
      hasNotes:       false, // enriched by useCalendar hook
    };
  });
}

/** Navigate one month forward */
export const nextMonth = (date: Date) => addMonths(date, 1);

/** Navigate one month backward */
export const prevMonth = (date: Date) => subMonths(date, 1);

/** Human-readable range label e.g. "Jan 3 – Jan 17, 2025" */
export function formatRange(range: DateRange): string {
  if (!range.start) return '';
  if (!range.end)   return format(range.start, 'MMM d, yyyy');
  return `${format(range.start, 'MMM d')} – ${format(range.end, 'MMM d, yyyy')}`;
}

/** Total days in the range (inclusive) */
export function rangeDays(range: DateRange): number {
  if (!range.start || !range.end) return range.start ? 1 : 0;
  const start = range.start < range.end ? range.start : range.end;
  const end   = range.start < range.end ? range.end   : range.start;
  return eachDayOfInterval({ start, end }).length;
}

/** Stable key for a single date e.g. "2025-04-15" */
export function dateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/** Stable key for a range e.g. "2025-04-01_2025-04-15" */
export function rangeKey(range: DateRange): string {
  if (!range.start) return '';
  if (!range.end)   return dateKey(range.start);
  const s = range.start < range.end ? range.start : range.end;
  const e = range.start < range.end ? range.end   : range.start;
  return `${dateKey(s)}_${dateKey(e)}`;
}

/** Return range with start always <= end */
export function normalizeRange(range: DateRange): DateRange {
  if (!range.start || !range.end) return range;
  if (isAfter(range.start, range.end)) {
    return { start: range.end, end: range.start };
  }
  return range;
}