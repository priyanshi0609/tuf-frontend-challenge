'use client'

import { format } from 'date-fns'
import { getMonthImage } from '@/lib/calendarUtils'

interface CalendarHeroProps {
  currentDate: Date
  isAnimating: boolean
}

export default function CalendarHero({ currentDate, isAnimating }: CalendarHeroProps) {
  const monthNum = currentDate.getMonth()
  const img = getMonthImage(monthNum)
  const monthName = format(currentDate, 'MMMM').toUpperCase()
  const year = format(currentDate, 'yyyy')

  return (
    <div className={`relative w-full overflow-hidden ${isAnimating ? 'animate-page-flip' : ''}`}
      style={{ height: '240px', minHeight: '200px' }}>
      
      {/* Hero image */}
      <div className="absolute inset-0">
        <img
          src={img.url}
          alt={img.alt}
          className="w-full h-full object-cover transition-opacity duration-500"
          style={{ objectPosition: 'center 30%' }}
        />
      </div>

      {/* Top-left blue triangle accent */}
      <div
        className="absolute top-0 left-0"
        style={{
          width: '110px',
          height: '90px',
          background: '#1AACEC',
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
        }}
      />

      {/* Month & Year text */}
      <div className="absolute bottom-4 right-5 text-right z-10">
        <p className="text-white/90 font-display text-xl leading-none tracking-wide font-normal" style={{ fontSize: '22px' }}>
          {year}
        </p>
        <p className="text-white font-display font-bold leading-none mt-0.5" style={{ fontSize: '30px', letterSpacing: '0.04em' }}>
          {monthName}
        </p>
      </div>

    </div>
  )
}