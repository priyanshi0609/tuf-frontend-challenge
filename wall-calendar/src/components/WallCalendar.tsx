'use client';

import { useState } from 'react';
import clsx from 'clsx';
// import { useCalendar } from '@/hooks/useCalendar';
// import { CalendarHeader } from './Calendar/CalendarHeader';
// import { HeroImage } from './Calendar/HeroImage';
// import { CalendarGrid } from './Calendar/CalendarGrid';
// import { RangeInfo } from './Calendar/RangeInfo';
// import { Notes } from './Notes/Notes';
// import { ThemeToolbar } from './UI/ThemeToolbar';

/**
 * WallCalendar — root orchestrator component.
 * 
 * Layout:
 *   Mobile:  stacked (image → calendar → notes)
 *   Desktop: side-by-side (calendar left | notes right)
 *            with hero image at top of calendar panel
 * 
 * All state lives in the useCalendar hook.
 */
export function WallCalendar() {
  const cal = useCalendar();
  const [mobileTab, setMobileTab] = useState<'calendar' | 'notes'>('calendar');

  if (!cal.hydrated) {
    return (
      <div className="w-full max-w-4xl h-[600px] rounded-2xl bg-paper-100 dark:bg-paper-800 animate-pulse" />
    );
  }

  return (
    <div
      className={clsx(
        'w-full max-w-4xl rounded-2xl overflow-hidden',
        'bg-white dark:bg-paper-900',
        'shadow-calendar',
        'animate-page-flip',
        // Subtle paper texture
        'relative'
      )}
      style={{
        // Paper-like subtle grain
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
      }}
    >
      {/* ── Spiral binding at the very top ───────────────────────────────── */}
      <CalendarHeader
        currentDate={cal.currentDate}
        accent={cal.theme.accent}
        onPrev={cal.goToPrev}
        onNext={cal.goToNext}
        onToday={cal.goToToday}
        isAnimating={cal.isAnimating}
      />

      {/* ── Desktop: side-by-side │ Mobile: stacked with tabs ────────────── */}
      <div className="flex flex-col md:flex-row">

        {/* ══ LEFT / TOP — Calendar Panel ══════════════════════════════════ */}
        <div className="flex-1 flex flex-col border-r-0 md:border-r border-paper-100 dark:border-paper-800">
          {/* Hero image */}
          <HeroImage
            monthImage={cal.monthImage}
            currentDate={cal.currentDate}
            accent={cal.theme.accent}
            layout="top"
          />

          {/* Grid */}
          <CalendarGrid
            grid={cal.grid}
            range={cal.range}
            accent={cal.theme.accent}
            isAnimating={cal.isAnimating}
            animDir={cal.animDir}
            onDayClick={cal.handleDayClick}
            onDayHover={cal.setHoverDate}
            onDayLeave={() => cal.setHoverDate(null)}
          />

          {/* Range info pill */}
          <RangeInfo
            range={cal.range}
            accent={cal.theme.accent}
            onClear={cal.clearRange}
          />

          {/* Theme controls */}
          <ThemeToolbar
            theme={cal.theme}
            onAccentChange={cal.setThemeAccent}
            onDarkToggle={cal.toggleDarkMode}
          />
        </div>

        {/* ══ RIGHT / BOTTOM — Notes Panel ═════════════════════════════════ */}
        <div className="w-full md:w-72 lg:w-80 min-h-[300px] md:min-h-0 flex flex-col">
          <Notes
            notes={cal.notesForRange}
            range={cal.range}
            accent={cal.theme.accent}
            onAdd={cal.addNote}
            onDelete={cal.deleteNote}
            onUpdate={cal.updateNote}
          />
        </div>
      </div>
    </div>
  );
}