import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wall Calendar — Interactive Date Planner',
  description: 'A beautiful interactive wall calendar with date range selection and integrated notes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}