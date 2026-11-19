# Primeras Palabras — project brief for Claude Code

Read this first in every session. It describes what this app is, where it's going, and how Daniel wants to work on it.

## What this is

A bilingual Spanish/English "first words" app for Daniel's two young kids (about 1 and almost 3), Dani and Maddie. Big picture cards: tap one and hear the word in Spanish, then English.

- Live: https://primeras-palabras.vercel.app (Vercel, auto-deploys on every push to `main`)
- Repo: `primeras-palabras` on GitHub
- Stack: Next.js (App Router), TypeScript, React. No backend.

## It has two jobs

1. **A real thing for two toddlers.** It should be simple, calm and safe enough to hand a 1-year-old.
2. **Daniel's practice and portfolio project.** He's a front end developer (React, web accessibility, Playwright) getting back up to speed on TypeScript and Next.js while job hunting. Hiring managers may read this repo, and he needs to be able to explain every line in an interview.

Because of job 2, see "How to work with Daniel" below. It matters as much as the code.

## Current state (Nov 19, 2026)

- Done: app scaffolded and deployed to Vercel.
- Done (Nov 18): two word cards on screen. The first is 🐕 Perro / Dog.
- Next: move the words into a typed list (`app/words.ts`) if that isn't done yet, render the cards with `.map()`, and make each card a `<button>` with an accessible name, working toward 12 cards and tap-to-hear audio.

## Milestones

| By         | Goal                                                                                                        |
| ---------- | ----------------------------------------------------------------------------------------------------------- |
| Sat Dec 6  | Both languages working; tap a card to hear Spanish then English; fully usable by keyboard and screen reader |
| Sun Dec 20 | Playwright + axe-core tests passing in GitHub Actions on every push                                         |
| Thu Dec 24 | v1: 12 cards, in the kids' hands on a phone                                                                 |

## What v1 looks like

- A grid of large word cards. On a phone, 1 or 2 per row.
- Each card: a big picture (emoji for now), the Spanish word large, the English word smaller under it.
- Tapping a card plays the word in Spanish, a short pause, then English. The card shows it's "playing" (gentle highlight or scale; no flashing).
- No menus, no text needed to use it, no links out, no ads, no sign-in.

### Audio plan

- **Phase 1:** browser `speechSynthesis` (Web Speech API) with a Spanish voice (`es-MX` or `es-US`) and an English voice (`en-US`). Daniel built a Speech-to-Text feature with the Web Speech API at HMH, so this connects to work he can talk about.
- **Phase 2 (after v1):** family-recorded MP3s in `public/audio/` (`perro.es.mp3`, `perro.en.mp3`), falling back to speech synthesis when a file is missing.

### Data model (starting point)

```ts
export type Word = {
  id: string; // "perro"
  es: string; // "Perro"
  en: string; // "Dog"
  emoji: string; // "🐕"
  audio?: { es?: string; en?: string }; // phase 2 file paths
};
```

Suggested first 12 words: perro, gato, pelota, leche, agua, mamá, papá, carro, casa, libro, manzana, pájaro.

## Accessibility (non-negotiable; it's Daniel's specialty)

- Each card is a real `<button>`, not a clickable `div`.
- Accessible name reads both words, e.g. "Perro, dog". The emoji is `aria-hidden="true"`.
- Spanish text has `lang="es"`.
- Visible focus outline; full keyboard use (Tab, Enter, Space).
- Touch targets at least 88px for toddler hands; WCAG 2.1 AA colour contrast.
- Respect `prefers-reduced-motion`.
- Tests: Playwright + `@axe-core/playwright`, zero violations, run in GitHub Actions.

## Out of scope for v1

Accounts, a backend or database, analytics or tracking, quizzes and scores, paid features, heavy animation, a UI library. Ideas for later go in a "Later" list in the README, not into the code.

## How to work with Daniel

- **Coach first, then code.** Daniel works in 45-minute blocks around his kids, each with one goal. Help him finish that goal, and prefer explaining and giving small hints over writing whole files. When you do write code, keep it short and explain what each part does so he can explain it himself.
- **Explain TypeScript errors in plain words** before suggesting a fix.
- **One small step at a time**, with a clear "done" at the end, ideally something he can see in the browser.
- **No new dependencies without asking.** Keep styling plain (inline styles or CSS Modules); no Tailwind or component libraries for now.
- **Small commits** with clear messages ("Add words list and render cards from it").
- Keep the README current: what the app is, how to run it, and the key decisions (why `<button>`, why `lang="es"`, why speech synthesis first).
