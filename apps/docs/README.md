# Schedule App

> **Stack:** Next.js 15 · TypeScript · React · Turborepo monorepo

---

## Getting Started

```bash
# From the repo root
npm install
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

---

## Planned File Structure

```
apps/web/                          ← main application
├── app/
│   ├── layout.tsx                 # HTML shell, global styles
│   ├── page.tsx                   # Root page — composes layout
│   └── globals.css
│
├── components/
│   ├── Header.tsx                 # Title, Save / Clear buttons
│   │
│   ├── Sidebar/
│   │   ├── Sidebar.tsx            # Left panel wrapper
│   │   ├── ActivityForm.tsx       # Add activity (name, duration, color)
│   │   ├── ActivityList.tsx       # Stacked list of created activities
│   │   └── DraggableActivity.tsx  # Single draggable activity card
│   │
│   └── Timetable/
│       ├── Timetable.tsx          # Main grid container
│       ├── TimeColumn.tsx         # Left axis — hour labels (8:00, 9:00 …)
│       ├── DayColumn.tsx          # Day columns (Mon, Tue …)
│       └── TimeSlot.tsx           # One grid cell — drop target
│
├── hooks/
│   ├── useSchedule.ts             # CRUD for placed activities
│   └── useDragDrop.ts             # Drag state helpers
│
├── store/
│   └── scheduleStore.ts           # Global state (Zustand) — activities + grid
│
├── data/
│   └── mockData.ts # Test data
├── types/
│   └── index.ts                   # Activity, TimeSlotEntry, Day, etc.
│
├── theme/
│   └── theme.ts # Color palette(theme)
│
└── lib/
    └── utils.ts                   # Time formatting, color helpers

apps/docs/                         ← documentation

packages/
├── ui/                            # Shared component primitives
├── eslint-config/                 # Shared ESLint rules
└── typescript-config/             # Shared tsconfig presets
```

---

## Component Tree

```
app/layout.tsx
└── app/page.tsx
    ├── Header.tsx
    ├── Sidebar/
    │   ├── Sidebar.tsx
    │   ├── ActivityForm.tsx 
    │   └── ActivityList.tsx
    │       └── DraggableActivity.tsx
    └── Timetable/
        ├── Timetable.tsx
        ├── TimeColumn.tsx
        └── DayColumn.tsx
            └── TimeSlot.tsx
```

---

## State Flow

```
ActivityForm
    │  creates Activity
    ▼
scheduleStore ──► ActivityList (reads activities)
    │                  │
    │                  └──► DraggableActivity (drag source)
    │
    └──► Timetable ──► TimeSlot (drop target)
              writes placed entry back to store
```