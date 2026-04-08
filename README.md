# 📅 Wall Calendar Component (React + Next.js)

An interactive, responsive **wall calendar UI component** inspired by a physical calendar design.  
This project demonstrates frontend engineering skills including UI design, state management, responsiveness, and user interaction.

---

## 🚀 Live Demo
👉 [Add your deployed link here] (Vercel / Netlify)

---

## 🎥 Video Demonstration (Required)
👉 [Add your Loom / YouTube link here]

In the demo, I showcase:
- Day range selection
- Notes functionality
- Responsive behavior (desktop → mobile)

---

## 🧩 Features

### 🎨 Wall Calendar Aesthetic
- Inspired by real-world wall calendars
- Hero image dynamically changes with month
- Clean layout with strong visual hierarchy
- Decorative UI elements (gradient overlays, shapes)

---

### 📆 Day Range Selection
- Select **start date → end date**
- Visual feedback:
  - Start date
  - End date
  - Highlighted range
- Hover preview before selection
- Smooth interaction experience

---

### 📝 Integrated Notes Section
- Add notes for:
  - Specific dates
  - Selected date ranges
- Notes are persisted using **localStorage**
- Clean, minimal UI for writing and editing notes

---

### 🎉 Holiday Indicators
- Important holidays are:
  - Marked with visual indicators (dot)
  - Displayed on hover (tooltip)
  - Shown on click interaction

---

### 🌗 Theme Support
- Light / Dark mode support
- Theme persisted using localStorage

---

### 📱 Fully Responsive Design

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

## 🧠 Key Implementation Details

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

## ✨ Additional Enhancements
- Smooth animations (page flip, hover states)
- Holiday highlighting
- Custom theme colors
- Clean typography using Google Fonts
- Optimized image handling with Next.js

## 🙌 Acknowledgements
- Inspired by wall calendar design references
- Unsplash for high-quality images
- date-fns for date utilities

