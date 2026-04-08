import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  addMonths,
  subMonths,
  getDay,
} from 'date-fns'

export type CalendarDay = {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  dayNumber: number
}

export function getCalendarDays(currentDate: Date): CalendarDay[] {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  // Week starts on Monday
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 })
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const days = eachDayOfInterval({ start: calStart, end: calEnd })
  const today = new Date()

  return days.map((date) => ({
    date,
    isCurrentMonth: isSameMonth(date, currentDate),
    isToday: isSameDay(date, today),
    dayNumber: parseInt(format(date, 'd')),
  }))
}

export function isDateInRange(
  date: Date,
  startDate: Date | null,
  endDate: Date | null
): boolean {
  if (!startDate || !endDate) return false
  const start = startDate <= endDate ? startDate : endDate
  const end = startDate <= endDate ? endDate : startDate
  return isWithinInterval(date, { start, end })
}

export function isRangeStart(date: Date, startDate: Date | null, endDate: Date | null): boolean {
  if (!startDate) return false
  if (!endDate) return isSameDay(date, startDate)
  return isSameDay(date, startDate <= endDate ? startDate : endDate)
}

export function isRangeEnd(date: Date, startDate: Date | null, endDate: Date | null): boolean {
  if (!startDate || !endDate) return false
  return isSameDay(date, startDate <= endDate ? endDate : startDate)
}

export function navigateMonth(date: Date, direction: 'prev' | 'next'): Date {
  return direction === 'next' ? addMonths(date, 1) : subMonths(date, 1)
}

export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Indian public holidays (static for demo)
export const HOLIDAYS: Record<string, string> = {
  '2025-01-01': "New Year's Day",
  '2025-01-14': 'Makar Sankranti',
  '2025-01-26': 'Republic Day',
  '2025-03-18': 'Holi',
  '2025-04-14': 'Dr. Ambedkar Jayanti',
  '2025-04-18': 'Good Friday',
  '2025-05-12': 'Buddha Purnima',
  '2025-08-15': 'Independence Day',
  '2025-08-27': 'Janmashtami',
  '2025-10-02': 'Gandhi Jayanti / Dussehra',
  '2025-10-20': 'Diwali',
  '2025-12-25': 'Christmas Day',
  '2026-01-01': "New Year's Day",
  '2026-01-26': 'Republic Day',
  '2026-03-06': 'Maha Shivaratri',
  '2026-03-24': 'Holi',
  '2026-04-03': 'Good Friday',
  '2026-04-14': 'Dr. Ambedkar Jayanti',
  '2026-08-15': 'Independence Day',
  '2026-10-02': 'Gandhi Jayanti',
  '2026-11-08': 'Diwali',
  '2026-12-25': 'Christmas Day',
}

export function getHoliday(date: Date): string | null {
  const key = format(date, 'yyyy-MM-dd')
  return HOLIDAYS[key] || null
}

// Hero images for each month (Unsplash)
export const MONTH_IMAGES: Record<number, { url: string; alt: string; credit: string }> = {
  0:  { url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80', alt: 'Snow covered mountains in winter', credit: 'eberhard grossgasteiger' },
  1:  { url: 'https://images.unsplash.com/photo-1519817650390-64a93db511aa?w=1200&q=80', alt: 'Pink cherry blossoms blooming', credit: 'AJ Yorio' },
  2:  { url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc3b?w=1200&q=80', alt: 'Colorful spring flowers field', credit: 'Annie Spratt' },
  3:  { url: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1200&q=80', alt: 'Green meadow with sunlight', credit: 'Aaron Burden' },
  4:  { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80', alt: 'Lush mountain valley in summer', credit: 'Jake Melara' },
  5:  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80', alt: 'Sunny beach with turquoise water', credit: 'Oleg Ivanov' },
  6:  { url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=80', alt: 'Palm trees and tropical sea', credit: 'Asad Photo Maldives' },
  7:  { url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80', alt: 'Golden wheat field at sunset', credit: 'Ales Krivec' },
  8:  { url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80', alt: 'Autumn forest with orange leaves', credit: 'Luke Stackpoole' },
  9:  { url: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=1200&q=80', alt: 'Falling autumn leaves', credit: 'Chris Lawton' },
  10: { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80', alt: 'Foggy forest in late autumn', credit: 'Annie Spratt' },
  11: { url: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=1200&q=80', alt: 'Snowy winter landscape with trees', credit: 'Aaron Burden' },
};

export function getMonthImage(month: number) {
  return MONTH_IMAGES[month] || MONTH_IMAGES[0]
}

export type Note = {
  id: string
  text: string
  dateKey: string // 'global' or 'YYYY-MM-DD'
  createdAt: number
}

export function saveNotes(notes: Note[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('wall-calendar-notes', JSON.stringify(notes))
  } catch {}
}

export function loadNotes(): Note[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem('wall-calendar-notes')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveTheme(dark: boolean): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('wall-calendar-theme', dark ? 'dark' : 'light')
}

export function loadTheme(): boolean {
  if (typeof window === 'undefined') return false
  const stored = localStorage.getItem('wall-calendar-theme')
  if (stored) return stored === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}