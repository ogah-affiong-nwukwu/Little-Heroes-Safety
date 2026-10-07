# Little Heroes Safety & Manners Academy

A vibrant, fully responsive PWA for kids that teaches manners, hygiene, friendship,
stranger safety, and how to call 911 — through playful flip-cards, checklists, quizzes,
and a simulated 911 call. Built with React, Vite, and Tailwind CSS.

## Features

- **5 learning modules** with star rewards that persist in localStorage:
  - The Five Magic Words (flip-cards)
  - Sparkling Clean (interactive habit checklist)
  - How to Be a Great Friend (scenario quizzes)
  - Stranger Danger (safety rules + drill)
  - Super Emergency 911 (safe helpers + call simulator)
- **PWA**: manifest, SVG icons, offline-capable service worker
- **Light/dark theme** (saved preference + OS detection, no flash of wrong theme)
- **WebAudio sound effects** with a mute toggle (no audio files)
- **Accessible**: semantic landmarks, ARIA states, 44px touch targets, reduced-motion support

## Getting Started

```bash
npm install
npm run dev       # start dev server
npm run build     # typecheck + production build
npm run preview   # preview the production build
npm test          # run vitest test suite
npm run lint      # run oxlint
```

## Project Structure

```
src/
  components/   # shared UI (AppHeader, AppFooter, PageShell, Celebration, Mascot, ErrorBoundary)
  config/       # data-driven page registry (routes.tsx)
  data/         # lesson content models (magicWords, chores, friendScenarios, safetyRules, emergency)
  hooks/        # state logic (useRouter, useTheme, useSound, useStars)
  pages/        # the 5 lesson views + Home dashboard
  utils/        # storage + WebAudio sound helpers
  types.ts      # shared types (ViewId, LessonId, Theme, LessonPageProps)
```

### Architecture notes

- Navigation is a **state-based router** (`useRouter`) synced to `history` — the browser
  back button works and page transitions replay a fade/slide animation.
- Lessons stay mounted so kids keep their progress when hopping between pages.
- Side effects (storage, DOM class, history) live in `useEffect`s; state updaters are pure.
- Adding a lesson = extend `ViewId`, add an entry in `data/topics.ts` and `config/routes.tsx`.

## Tech Stack

React 19, Vite, TypeScript, Tailwind CSS v4, Vitest + Testing Library, oxlint.
