// ─── Date Range ────────────────────────────────────────────────────────────────
export interface DateRange {
  start: Date | null;
  end: Date | null;
}

// ─── Note ──────────────────────────────────────────────────────────────────────
export interface Note {
  id: string;
  text: string;
  /** ISO string for range-attached notes */
  dateKey?: string;
  createdAt: string;
  color: NoteColor;
}

export type NoteColor = 'yellow' | 'blue' | 'green' | 'pink' | 'purple';

// ─── Holiday ───────────────────────────────────────────────────────────────────
export interface Holiday {
  date: string; // "MM-DD" format
  name: string;
  type: 'national' | 'observance' | 'regional';
}

// ─── Month Image ───────────────────────────────────────────────────────────────
export interface MonthImage {
  url: string;
  alt: string;
  credit: string;
  theme: ThemeAccent;
}

// ─── Theme ─────────────────────────────────────────────────────────────────────
export type ThemeAccent = 'blue' | 'emerald' | 'amber' | 'rose' | 'violet' | 'cyan';

export interface CalendarTheme {
  accent: ThemeAccent;
  isDark: boolean;
}

// ─── Calendar State ────────────────────────────────────────────────────────────
export interface CalendarState {
  currentDate: Date;
  selectedRange: DateRange;
  notes: Note[];
  theme: CalendarTheme;
  view: 'calendar' | 'notes';
}

// ─── Day Cell ──────────────────────────────────────────────────────────────────
export interface DayCell {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  isWeekend: boolean;
  holiday?: Holiday;
  hasNotes: boolean;
}