'use client'

import { format, isSameDay } from 'date-fns'
import { useState } from 'react'
import {
  CalendarDay,
  WEEKDAYS,
  isDateInRange,
  isRangeStart,
  isRangeEnd,
  getHoliday,
} from '@/lib/calendarUtils'
import { cn } from '@/lib/cn'

interface CalendarGridProps {
  days: CalendarDay[]
  currentDate: Date
  startDate: Date | null
  endDate: Date | null
  hoverDate: Date | null
  onDayClick: (date: Date) => void
  onDayHover: (date: Date | null) => void
}

export default function CalendarGrid({
  days,
  currentDate,
  startDate,
  endDate,
  hoverDate,
  onDayClick,
  onDayHover,
}: CalendarGridProps) {

  // Effective end for range preview
  const effectiveEnd = endDate || hoverDate

  return (
    <div className="select-none">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((day, i) => {
          const isWeekend = i >= 5
          return (
            <div
              key={day}
              className={cn(
                'text-center py-1.5 text-xs font-semibold tracking-widest uppercase',
                isWeekend ? 'text-[#1AACEC]' : 'text-gray-400 dark:text-gray-500'
              )}
            >
              {day}
            </div>
          )
        })}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-1" />

      {/* Day grid */}
      <div className="grid grid-cols-7">
        {days.map((day, idx) => {
          const { date, isCurrentMonth, isToday } = day
          const holiday = getHoliday(date)
          const isStart = isRangeStart(date, startDate, effectiveEnd)
          const isEnd = isRangeEnd(date, startDate, effectiveEnd)
          const inRange = isDateInRange(date, startDate, effectiveEnd)
          const isSingle = startDate && !effectiveEnd && isSameDay(date, startDate)
          const isSelected = isStart || isEnd
          const dayOfWeek = idx % 7 // 0=Mon..6=Sun
          const isSat = dayOfWeek === 5
          const isSun = dayOfWeek === 6

          // Range highlight classes
          let rangeClass = ''
          if (inRange && !isStart && !isEnd) {
            rangeClass = 'day-in-range'
          }
          if (isStart && effectiveEnd && !isSingle) rangeClass += ' day-range-start'
          if (isEnd && effectiveEnd && !isSingle) rangeClass += ' day-range-end'
          if (isSingle) rangeClass = 'day-single-selected'

          return (
            <div
              key={date.toISOString()}
              className={cn('relative flex flex-col items-center', rangeClass)}
              style={
                inRange && !isStart && !isEnd
                  ? { background: 'var(--cal-range)' }
                  : {}
              }
            >
              <button
                onClick={() => isCurrentMonth && onDayClick(date)}
                onMouseEnter={() => isCurrentMonth && onDayHover(date)}
                onMouseLeave={() => onDayHover(null)}
                className={cn(
                  'calendar-day relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-150 my-0.5',
                  // Base text color
                  !isCurrentMonth && 'text-gray-300 dark:text-gray-700 cursor-default',
                  isCurrentMonth && !isSelected && !isToday && [
                    isSat || isSun
                      ? 'text-[#1AACEC] hover:bg-blue-50 dark:hover:bg-blue-950'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
                  ],
                  // Today ring
                  isToday && !isSelected && 'ring-2 ring-[#1AACEC] ring-offset-1 dark:ring-offset-gray-900',
                  isToday && !isSelected && 'text-[#1AACEC] font-bold',
                  // Selected state
                  isSelected && 'bg-[#1AACEC] text-white font-bold hover:bg-[#0E8DC4]',
                  // Cursor
                  !isCurrentMonth ? 'cursor-default' : 'cursor-pointer',
                )}
                disabled={!isCurrentMonth}
                title={holiday || undefined}
                aria-label={`${format(date, 'PPPP')}${holiday ? ` — ${holiday}` : ''}`}
              >
                {day.dayNumber}

                {/* Holiday dot */}
                {holiday && isCurrentMonth && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rose-400" />
                )}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}