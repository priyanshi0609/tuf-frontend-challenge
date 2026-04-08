'use client'

import WallCalendar from '@/components/calendar/WallCalendar'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start sm:justify-center px-4 py-8 sm:py-12 bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <WallCalendar />
    </main>
  )
}