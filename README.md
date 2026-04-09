## Wall Calendar Component (React + Next.js)

An interactive and responsive wall calendar UI inspired by real-world calendars.
Built to showcase frontend skills like UI design, state management, and user interactions.

---

## 🚀 Live Demo
👉 https://tuf-frontend-challenge.vercel.app/

---
## Features

### 1. Wall Calendar Aesthetic
- Inspired by real-world wall calendars
- Hero image dynamically changes with month
- Clean layout with strong visual hierarchy
- Decorative UI elements (gradient overlays, shapes)

---

### 2. Day Range Selection
- Select **start date → end date**
- Visual feedback:
  - Start date
  - End date
  - Highlighted range
- Hover preview before selection
- Smooth interaction experience

---

### 3. Integrated Notes Section
- Add notes for:
  - Specific dates
  - Selected date ranges
- Notes are persisted using **localStorage**
- Clean, minimal UI for writing and editing notes

---

### 4. Holiday Indicators
- Important holidays are:
  - Marked with visual indicators (dot)
  - Displayed on hover (tooltip)
  - Shown on click interaction

---

### 5. Theme Support
- Light / Dark mode support
- Theme persisted using localStorage

---

### 6. Fully Responsive Design

#### 💻 Desktop
- Side-by-side layout:
  - Hero image
  - Calendar grid
  - Notes panel

#### 📱 Mobile
- Stacked layout
- Touch-friendly interactions
- Optimized spacing and readability

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Date Handling:** date-fns
- **State Management:** React Hooks
- **Storage:** localStorage

---

## Key Implementation Details

### 📌 Calendar Logic
- Custom calendar grid generation
- Week starts from Monday
- Handles previous/next month overflow days

---

### 📌 Range Selection Logic
- Supports:
  - Forward and backward selection
  - Hover preview before final selection
- Edge cases handled (single day selection)

---

### 📌 Component Architecture

```
src/
├── app/
├── components/
│ └── calendar/
│ ├── WallCalendar.tsx
│ ├── CalendarHero.tsx
│ ├── CalendarHeader.tsx
│ ├── CalendarGrid.tsx
│ ├── NotesPanel.tsx
│ ├── SpiralRings.tsx
│ └── RangeDisplay.tsx
├── lib/
│ ├── calendarUtils.ts
│ └── cn.ts

```

## ⚙️ Setup Instructions

### 1️. Clone the repo
```bash
git clone https://github.com/your-username/wall-calendar.git
cd wall-calendar
```
### 2. Install dependencies
```bash
npm install
```
### 3. Run the development server
```bash
npm run dev
```
### 4. Open in browser
```bash
http://localhost:3000
```

## Additional Enhancements
- Smooth animations (page flip, hover states)
- Holiday highlighting
- Custom theme colors
- Clean typography using Google Fonts
- Optimized image handling with Next.js

## 🙌 Acknowledgements
- Inspired by wall calendar design references
- Unsplash for high-quality images
- date-fns for date utilities

