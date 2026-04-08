'use client'

import { useState, useEffect, useCallback } from 'react'
import { format, isSameDay } from 'date-fns'
import {
  getCalendarDays,
  navigateMonth,
  Note,
  loadNotes,
  loadTheme,
  saveTheme,
} from '@/lib/calendarUtils'

import SpiralRings from './SpiralRings'
import CalendarHero from './CalendarHero'
import CalendarHeader from './CalendarHeader'
import CalendarGrid from './CalendarGrid'
import NotesPanel from './NotesPanel'
import RangeDisplay from './RangeDisplay'

export default function WallCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  const [notes, setNotes] = useState<Note[]>([])
  const [isDark, setIsDark] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectionStep, setSelectionStep] = useState<'none' | 'start' | 'end'>('none')

  // Load persisted state
  useEffect(() => {
    setNotes(loadNotes())
    const dark = loadTheme()
    setIsDark(dark)
    if (dark) document.documentElement.classList.add('dark')
  }, [])

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev
      saveTheme(next)
      if (next) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return next
    })
  }, [])

  const navigate = useCallback((dir: 'prev' | 'next') => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 600)
    setCurrentDate((d) => navigateMonth(d, dir))
  }, [])

  const goToToday = useCallback(() => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 600)
    setCurrentDate(new Date())
  }, [])

  const handleDayClick = useCallback((date: Date) => {
    if (selectionStep === 'none' || selectionStep === 'end') {
      // Start fresh selection
      setStartDate(date)
      setEndDate(null)
      setSelectionStep('start')
    } else {
      // Complete the range
      if (isSameDay(date, startDate!)) {
        // Clicking same day — select single day
        setEndDate(date)
        setSelectionStep('end')
      } else {
        setEndDate(date)
        setSelectionStep('end')
      }
    }
  }, [selectionStep, startDate])

  const clearSelection = useCallback(() => {
    setStartDate(null)
    setEndDate(null)
    setHoverDate(null)
    setSelectionStep('none')
  }, [])

  const days = getCalendarDays(currentDate)

  // Hint text
  const hint =
    selectionStep === 'start'
      ? 'Now click an end date'
      : selectionStep === 'none'
      ? 'Click a date to start selecting a range'
      : null

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Calendar card */}
      <div
        className={`
          rounded-2xl overflow-hidden
          bg-white dark:bg-gray-900
          shadow-calendar dark:shadow-calendar-dark
          calendar-page
          ${isAnimating ? 'animate-page-flip' : ''}
        `}
        style={{ boxShadow: isDark
          ? '0 24px 64px -12px rgba(0,0,0,0.6), 0 4px 16px -4px rgba(0,0,0,0.4)'
          : '0 24px 64px -12px rgba(0,0,0,0.18), 0 4px 16px -4px rgba(0,0,0,0.08)'
        }}
      >
        {/* Spiral rings at top */}
        <SpiralRings />

        {/* Hero image */}
        <CalendarHero currentDate={currentDate} isAnimating={isAnimating} />

        {/* Main body — two panel layout on desktop */}
        <div className="flex flex-col md:flex-row">

          {/* Left: Notes (sidebar on desktop) */}
          <div className="md:w-56 lg:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 p-4">
            <NotesPanel
              notes={notes}
              setNotes={setNotes}
              startDate={startDate}
              endDate={endDate}
              currentDate={currentDate}
            />
          </div>

          {/* Right: Calendar grid */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Navigation header */}
            <CalendarHeader
              currentDate={currentDate}
              isDark={isDark}
              onPrev={() => navigate('prev')}
              onNext={() => navigate('next')}
              onToday={goToToday}
              onToggleTheme={toggleTheme}
            />

            {/* Range display bar */}
            <RangeDisplay
              startDate={startDate}
              endDate={endDate}
              onClear={clearSelection}
            />

            {/* Hint */}
            {hint && (
              <p className="text-xs text-gray-400 dark:text-gray-600 text-center mb-1 animate-fade-in">
                {hint}
              </p>
            )}

            {/* Grid */}
            <div className="px-3 pb-4 animate-slide-up" key={format(currentDate, 'yyyy-MM')}>
              <CalendarGrid
                days={days}
                currentDate={currentDate}
                startDate={startDate}
                endDate={endDate}
                hoverDate={selectionStep === 'start' ? hoverDate : null}
                onDayClick={handleDayClick}
                onDayHover={setHoverDate}
              />
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 px-4 pb-3 text-xs text-gray-400 dark:text-gray-600 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#1AACEC]" />
                Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ background: 'var(--cal-range)', border: '1px solid #1AACEC55' }} />
                In range
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full ring-2 ring-[#1AACEC] ring-offset-1 dark:ring-offset-gray-900" />
                Today
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Holiday
              </span>
            </div>
          </div>
        </div>

        {/* Bottom shadow fold effect */}
        <div className="h-1 bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-850" />
      </div>

      {/* Bottom shadow — paper depth illusion */}
      <div
        className="mx-6 h-3 rounded-b-2xl bg-gray-300 dark:bg-gray-800 opacity-50"
        style={{ transform: 'scaleX(0.96)' }}
      />
      <div
        className="mx-10 h-2 rounded-b-2xl bg-gray-200 dark:bg-gray-700 opacity-30"
        style={{ transform: 'scaleX(0.90)' }}
      />
    </div>
  )
}