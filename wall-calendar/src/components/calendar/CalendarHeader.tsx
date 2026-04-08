'use client'

import { format } from 'date-fns'
import { ChevronLeft, ChevronRight, Sun, Moon, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/cn'

interface CalendarHeaderProps {
  currentDate: Date
  isDark: boolean
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  onToggleTheme: () => void
}

export default function CalendarHeader({
  currentDate,
  isDark,
  onPrev,
  onNext,
  onToday,
  onToggleTheme,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 pt-3 pb-2">
      {/* Left nav */}
      <div className="flex items-center gap-1">
        <button
          onClick={onPrev}
          className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1AACEC] transition-all active:scale-90"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={onNext}
          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1AACEC] transition-all active:scale-90"
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
        <button
          onClick={onToday}
          className="ml-1 px-2.5 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-[#1AACEC] border border-gray-200 dark:border-gray-700 rounded-full hover:border-[#1AACEC] transition-all"
          aria-label="Go to today"
        >
          Today
        </button>
      </div>

      {/* Month label */}
      <div className="text-center">
        <p className="text-md font-semibold text-gray-700 dark:text-gray-200 font-display">
          {format(currentDate, 'MMMM yyyy')}
        </p>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={onToggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1AACEC] transition-all"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </div>
  )
}