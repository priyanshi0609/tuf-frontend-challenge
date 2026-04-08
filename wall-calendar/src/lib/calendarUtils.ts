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
  0: { url: 'https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=800&q=80', alt: 'Snowy mountain peaks', credit: 'Kalen Emsley' },
  1: { url: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80', alt: 'Cherry blossoms', credit: 'Jay Wennington' },
  2: { url: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80', alt: 'Spring meadow', credit: 'Aaron Burden' },
  3: { url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc3b?w=800&q=80', alt: 'Blooming flowers', credit: 'Annie Spratt' },
  4: { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'Mountain landscape', credit: 'Samuel Ferrara' },
  5: { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80', alt: 'Summer beach', credit: 'S Migaj' },
  6: { url: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=800&q=80', alt: 'Tropical ocean', credit: 'Shifaaz shamoon' },
  7: { url: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80', alt: 'Golden wheat field', credit: 'Ales Krivec' },
  8: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', alt: 'Autumn forest', credit: 'Luke Stackpoole' },
  9: { url: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=800&q=80', alt: 'Fall leaves', credit: 'Chris Lawton' },
  10: { url: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&q=80', alt: 'Misty forest in November', credit: 'Andy Feliciotti' },
  11: { url: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80', alt: 'Winter snow landscape', credit: 'Aaron Burden' },
}

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