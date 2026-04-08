'use client'

import { format, differenceInDays } from 'date-fns'
import { Calendar, X } from 'lucide-react'

interface RangeDisplayProps {
  startDate: Date | null
  endDate: Date | null
  onClear: () => void
}

export default function RangeDisplay({ startDate, endDate, onClear }: RangeDisplayProps) {
  if (!startDate) return null

  const start = startDate && endDate && startDate > endDate ? endDate : startDate
  const end = startDate && endDate && startDate > endDate ? startDate : endDate
  const days = end ? differenceInDays(end, start) + 1 : 1

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-950/40 border border-[#1AACEC]/30 rounded-xl mx-3 mb-2 animate-fade-in">
      <Calendar size={13} className="text-[#1AACEC] flex-shrink-0" />
      <div className="flex-1 min-w-0">
        {end && !isSameDayLocal(start, end) ? (
          <p className="text-xs text-[#0E8DC4] dark:text-[#1AACEC] font-medium truncate">
            {format(start, 'MMM d')} → {format(end, 'MMM d, yyyy')}
            <span className="ml-1.5 text-blue-400 dark:text-blue-500 font-normal">
              ({days} day{days !== 1 ? 's' : ''})
            </span>
          </p>
        ) : (
          <p className="text-xs text-[#0E8DC4] dark:text-[#1AACEC] font-medium">
            {format(start, 'EEEE, MMM d, yyyy')}
          </p>
        )}
      </div>
      <button
        onClick={onClear}
        className="flex-shrink-0 text-blue-400 hover:text-rose-500 transition-colors"
        aria-label="Clear selection"
      >
        <X size={13} />
      </button>
    </div>
  )
}

function isSameDayLocal(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}