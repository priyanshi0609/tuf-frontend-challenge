'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import type { DateRange, Note, NoteColor, CalendarTheme, ThemeAccent } from '@/types';
import { buildCalendarGrid, nextMonth, prevMonth, rangeKey, dateKey } from '@/utils/calendarUtils';
import { generateId } from '@/utils/helpers';
import { MONTH_IMAGES } from '@/data/calendar';

const STORAGE_KEY_NOTES = 'wc_notes_v1';
const STORAGE_KEY_THEME = 'wc_theme_v1';

// ─── localStorage helpers ──────────────────────────────────────────────────────

function loadNotes(): Note[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NOTES);
    return raw ? (JSON.parse(raw) as Note[]) : [];
  } catch {
    return [];
  }
}

function loadTheme(): CalendarTheme {
  if (typeof window === 'undefined') return { accent: 'blue', isDark: false };
  try {
    const raw = localStorage.getItem(STORAGE_KEY_THEME);
    return raw ? (JSON.parse(raw) as CalendarTheme) : { accent: 'blue', isDark: false };
  } catch {
    return { accent: 'blue', isDark: false };
  }
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [range, setRange]             = useState<DateRange>({ start: null, end: null });
  const [hoverDate, setHoverDate]     = useState<Date | null>(null);
  const [notes, setNotes]             = useState<Note[]>([]);
  const [theme, setThemeState]        = useState<CalendarTheme>({ accent: 'blue', isDark: false });
  const [isAnimating, setIsAnimating] = useState(false);
  const [animDir, setAnimDir]         = useState<'next' | 'prev'>('next');
  const [hydrated, setHydrated]       = useState(false);

  // ── Hydrate from localStorage once on mount ──────────────────────────────────
  useEffect(() => {
    setNotes(loadNotes());
    setThemeState(loadTheme());
    setHydrated(true);
  }, []);

  // ── Persist notes ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));
  }, [notes, hydrated]);

  // ── Persist theme + apply dark class ─────────────────────────────────────────
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(theme));
    if (theme.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, hydrated]);

  // ── Live hover preview for range ─────────────────────────────────────────────
  const previewRange: DateRange = useMemo(() => {
    // Only preview when start is set but end isn't yet
    if (!range.start || range.end) return range;
    if (!hoverDate) return range;
    return { start: range.start, end: hoverDate };
  }, [range, hoverDate]);

  // ── Build calendar grid ───────────────────────────────────────────────────────
  const grid = useMemo(() => {
    const cells    = buildCalendarGrid(currentDate, previewRange);
    const noteKeys = new Set(notes.map((n) => n.dateKey).filter(Boolean));
    return cells.map((cell) => ({
      ...cell,
      hasNotes: noteKeys.has(dateKey(cell.date)),
    }));
  }, [currentDate, previewRange, notes]);

  // ── Month image ───────────────────────────────────────────────────────────────
  const monthImage = useMemo(
    () => MONTH_IMAGES[currentDate.getMonth()],
    [currentDate]
  );

  // ── Navigation ────────────────────────────────────────────────────────────────
  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setAnimDir('next');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentDate((d) => nextMonth(d));
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setAnimDir('prev');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentDate((d) => prevMonth(d));
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
    setRange({ start: null, end: null });
  }, []);

  // ── Date selection (two-click range) ─────────────────────────────────────────
  const handleDayClick = useCallback((date: Date) => {
    setRange((prev) => {
      // Nothing selected → set start
      if (!prev.start) return { start: date, end: null };
      // Start set, no end → complete the range
      if (prev.start && !prev.end) {
        return date < prev.start
          ? { start: date, end: prev.start }
          : { start: prev.start, end: date };
      }
      // Range complete → reset and start fresh
      return { start: date, end: null };
    });
  }, []);

  const clearRange = useCallback(() => {
    setRange({ start: null, end: null });
    setHoverDate(null);
  }, []);

  // ── Notes CRUD ────────────────────────────────────────────────────────────────
  const addNote = useCallback(
    (text: string, color: NoteColor = 'yellow', forRange?: DateRange) => {
      if (!text.trim()) return;
      const key  = forRange ? rangeKey(forRange) : undefined;
      const note: Note = {
        id:        generateId(),
        text:      text.trim(),
        dateKey:   key,
        createdAt: new Date().toISOString(),
        color,
      };
      setNotes((prev) => [note, ...prev]);
    },
    []
  );

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const updateNote = useCallback((id: string, text: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, text } : n))
    );
  }, []);

  // ── Theme controls ────────────────────────────────────────────────────────────
  const setThemeAccent = useCallback((accent: ThemeAccent) => {
    setThemeState((prev) => ({ ...prev, accent }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setThemeState((prev) => ({ ...prev, isDark: !prev.isDark }));
  }, []);

  // ── Derived: notes filtered by current range selection ────────────────────────
  const notesForRange = useMemo(() => {
    // No range selected → show all notes
    if (!range.start && !range.end) return notes;
    const key = rangeKey(range);
    // Show notes attached to this range OR global notes (no dateKey)
    return notes.filter((n) => n.dateKey === key || !n.dateKey);
  }, [notes, range]);

  return {
    // State
    currentDate,
    range,
    hoverDate,
    grid,
    notes,
    notesForRange,
    theme,
    monthImage,
    isAnimating,
    animDir,
    hydrated,
    // Actions
    goToNext,
    goToPrev,
    goToToday,
    handleDayClick,
    setHoverDate,
    clearRange,
    addNote,
    deleteNote,
    updateNote,
    setThemeAccent,
    toggleDarkMode,
  };
}