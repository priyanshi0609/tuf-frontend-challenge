import type { Holiday, MonthImage, ThemeAccent } from '@/types';

// ─── Holidays (US) ─────────────────────────────────────────────────────────────
export const HOLIDAYS: Holiday[] = [
  { date: '01-01', name: "New Year's Day",     type: 'national'   },
  { date: '01-15', name: 'MLK Jr. Day',         type: 'observance' },
  { date: '02-14', name: "Valentine's Day",     type: 'observance' },
  { date: '03-17', name: "St. Patrick's Day",   type: 'observance' },
  { date: '04-01', name: "April Fool's Day",    type: 'observance' },
  { date: '04-22', name: 'Earth Day',           type: 'observance' },
  { date: '05-26', name: 'Memorial Day',        type: 'national'   },
  { date: '06-19', name: 'Juneteenth',          type: 'national'   },
  { date: '07-04', name: 'Independence Day',    type: 'national'   },
  { date: '09-01', name: 'Labor Day',           type: 'national'   },
  { date: '10-31', name: 'Halloween',           type: 'observance' },
  { date: '11-11', name: 'Veterans Day',        type: 'national'   },
  { date: '11-27', name: 'Thanksgiving',        type: 'national'   },
  { date: '12-25', name: 'Christmas',           type: 'national'   },
  { date: '12-31', name: "New Year's Eve",      type: 'observance' },
];

// ─── Month Images (Unsplash) ───────────────────────────────────────────────────
export const MONTH_IMAGES: Record<number, MonthImage> = {
  0:  { url: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=1200&q=80', alt: 'Snowy mountain peaks',     credit: 'Unsplash', theme: 'blue'    },
  1:  { url: 'https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=1200&q=80', alt: 'Frost on window',          credit: 'Unsplash', theme: 'cyan'    },
  2:  { url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=80', alt: 'Cherry blossoms',          credit: 'Unsplash', theme: 'rose'    },
  3:  { url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc27?w=1200&q=80', alt: 'Spring wildflowers',       credit: 'Unsplash', theme: 'emerald' },
  4:  { url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=1200&q=80', alt: 'Green forest trail',         credit: 'Unsplash', theme: 'emerald' },
  5:  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80', alt: 'Tropical beach sunset',    credit: 'Unsplash', theme: 'amber'   },
  6:  { url: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&q=80', alt: 'Sunflower field',          credit: 'Unsplash', theme: 'amber'   },
  7:  { url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80', alt: 'Mountain lake reflection', credit: 'Unsplash', theme: 'blue'    },
  8:  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80', alt: 'Autumn forest path',       credit: 'Unsplash', theme: 'amber'   },
  9:  { url: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=1200&q=80', alt: 'Fall foliage',             credit: 'Unsplash', theme: 'amber'   },
  10: { url: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=1200&q=80', alt: 'Misty winter forest',      credit: 'Unsplash', theme: 'violet'  },
  11: { url: 'https://images.unsplash.com/photo-1483450388369-9ed95738483c?w=1200&q=80', alt: 'Snowy village at night',   credit: 'Unsplash', theme: 'blue'    },
};

// ─── Theme Color Maps ──────────────────────────────────────────────────────────
export const THEME_COLORS: Record<ThemeAccent, {
  primary: string;
  light:   string;
  dark:    string;
  range:   string;
  text:    string;
  hover:   string;
  ring:    string;
}> = {
  blue: {
    primary: '#1d6ee6',
    light:   '#dbeafe',
    dark:    '#1e3a8a',
    range:   '#eff6ff',
    text:    '#1d4ed8',
    hover:   '#bfdbfe',
    ring:    'rgba(29,110,230,0.2)',
  },
  emerald: {
    primary: '#059669',
    light:   '#d1fae5',
    dark:    '#064e3b',
    range:   '#ecfdf5',
    text:    '#047857',
    hover:   '#a7f3d0',
    ring:    'rgba(5,150,105,0.2)',
  },
  amber: {
    primary: '#d97706',
    light:   '#fef3c7',
    dark:    '#78350f',
    range:   '#fffbeb',
    text:    '#b45309',
    hover:   '#fde68a',
    ring:    'rgba(217,119,6,0.2)',
  },
  rose: {
    primary: '#e11d48',
    light:   '#ffe4e6',
    dark:    '#881337',
    range:   '#fff1f2',
    text:    '#be123c',
    hover:   '#fecdd3',
    ring:    'rgba(225,29,72,0.2)',
  },
  violet: {
    primary: '#7c3aed',
    light:   '#ede9fe',
    dark:    '#4c1d95',
    range:   '#f5f3ff',
    text:    '#6d28d9',
    hover:   '#ddd6fe',
    ring:    'rgba(124,58,237,0.2)',
  },
  cyan: {
    primary: '#0891b2',
    light:   '#cffafe',
    dark:    '#164e63',
    range:   '#ecfeff',
    text:    '#0e7490',
    hover:   '#a5f3fc',
    ring:    'rgba(8,145,178,0.2)',
  },
};

export const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

export const DAY_NAMES_SHORT = ['MON','TUE','WED','THU','FRI','SAT','SUN'];

export const NOTE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  yellow: { bg: '#fef9c3', border: '#fde047', text: '#713f12' },
  blue:   { bg: '#dbeafe', border: '#93c5fd', text: '#1e3a8a' },
  green:  { bg: '#dcfce7', border: '#86efac', text: '#14532d' },
  pink:   { bg: '#fce7f3', border: '#f9a8d4', text: '#831843' },
  purple: { bg: '#f3e8ff', border: '#d8b4fe', text: '#4c1d95' },
};