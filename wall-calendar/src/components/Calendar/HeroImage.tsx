'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import clsx from 'clsx';
import { MONTH_NAMES, THEME_COLORS } from '@/data/calendar';
import type { MonthImage, ThemeAccent } from '@/types';

interface HeroImageProps {
  monthImage:  MonthImage;
  currentDate: Date;
  accent:      ThemeAccent;
  layout?:     'top' | 'side';
}
export const HeroImage = memo(function HeroImage({
  monthImage,
  currentDate,
  accent,
  layout = 'top',
}: HeroImageProps) {
  const [loaded, setLoaded] = useState(false);
  const colors = THEME_COLORS[accent];
  const month  = MONTH_NAMES[currentDate.getMonth()];
  const year   = format(currentDate, 'yyyy');

  return (
    <div
      className={clsx(
        'relative overflow-hidden',
        layout === 'top' ? 'h-52 sm:h-60 md:h-64' : 'h-full min-h-[320px]'
      )}
    >
      {/* ── Shimmer skeleton ──────────────────────────────────────────────── */}
      {!loaded && (
        <div className="absolute inset-0 animate-shimmer" />
      )}

      {/* ── Photo ─────────────────────────────────────────────────────────── */}
      <Image
        src={monthImage.url}
        alt={monthImage.alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 60vw"
        className={clsx(
          'object-cover transition-opacity duration-700',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={() => setLoaded(true)}
      />

      {/* ── Dark gradient so shapes read cleanly ──────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, transparent 30%, ${colors.dark}bb 100%)`,
        }}
      />

      {/* ── White diagonal shape (left side, matches reference) ──────────── */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 500 70"
        preserveAspectRatio="none"
        style={{ height: 70 }}
        aria-hidden="true"
      >
        {/* White wedge on the left */}
        <path
          d="M0,70 L0,28 L180,0 L500,50 L500,70 Z"
          fill="white"
          className="dark:fill-paper-900"
        />
      </svg>

      {/* ── Blue accent shape (right side, matches reference) ────────────── */}
      <svg
        className="absolute bottom-0 right-0"
        viewBox="0 0 280 70"
        preserveAspectRatio="none"
        style={{ height: 70, width: '56%' }}
        aria-hidden="true"
      >
        <path
          d="M0,42 L90,0 L280,30 L280,70 L0,70 Z"
          fill={colors.primary}
          opacity="0.93"
        />
      </svg>

      {/* ── Month + Year text on blue shape ──────────────────────────────── */}
      <div className="absolute bottom-3 right-4 z-10 text-right">
        <div
          className="text-[11px] font-semibold tracking-[0.18em] uppercase leading-none"
          style={{ color: 'rgba(255,255,255,0.82)' }}
        >
          {year}
        </div>
        <div className="text-[22px] font-bold text-white font-display leading-tight tracking-tight">
          {month.toUpperCase()}
        </div>
      </div>
    </div>
  );
});