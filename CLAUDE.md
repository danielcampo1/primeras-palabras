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

## Current state (Nov 23, 2026)

- Done: app scaffolded and deployed to Vercel.
- Done (Nov 18): two word cards on screen (🐕 Perro / Dog, 🐎 Caballo / Horse).
- Done (Nov 19): extracted a reusable `WordCard` component in `app/page.tsx` with typed props (`WordCardProps`: `emoji`, `es`, `en`, all strings). Card markup now exists once; `Home` renders `<WordCard />` twice with hardcoded props. Merged to `main` via PR #1 (squash merge).
- Done (Nov 23, Task 5): added `app/words.ts` with the exported `Word` type (`id`, `es`, `en`, `emoji`) and a `words: Word[]` array (perro, caballo, gato). `Home` renders cards with `words.map()` and `key={word.id}`. `WordCardProps` stays separate from `Word` (props ≠ data model). Adding a word now only means editing `words.ts`. Merged via PR #3.
- Next (Task 6): in `WordCard`, change the outer `<div>` to a `<button>`. Then give it the accessible name "Perro, dog", put `lang="es"` on the Spanish text and `aria-hidden="true"` on the emoji. Done when a screen reader (VoiceOver: Cmd+F5) reads "Perro, dog, button" for the first card and Tab moves between cards.
- Concepts covered Nov 23: re-export (`export type { X } from`) vs import; React `key` is a prop name, the value comes from the data (`key={word.id}`, not a `key` field in the data); data model vs UI props; `tsc` prints nothing on success (`echo $?` → `0`).

### Workflow habits now in use

- One feature branch per task; push WIP to the branch, never broken code to `main` (Vercel auto-deploys `main`).
- Review your own diff (`git diff main`) before opening a PR.
- Merge via GitHub PR with **squash and merge**; trim the squash commit message to one clear line.
- Check types with `npx tsc --noEmit` (or `npm run build`) before merging.
- Run `npm run lint` along with `npx tsc --noEmit` before opening a PR.
- Merge only when `main` would be better, or at least no worse. No regressions to the live app.
- Every commit on `main` should work. That's why we squash merge: the step-by-step history stays in the PR.
- Commit messages are imperative: they should complete "This commit will…" (e.g. "Add words list", not "added words list").
- PR description: what changed, why, and how it was checked.
- After merging: delete the branch, `git checkout main && git pull`, then check the live Vercel URL. That's the real "done".
- Never rewrite `main`'s history to fix cosmetic issues (like a messy squash message). Do better next time.

### Cleanup backlog

- Tailwind is still installed (`globals.css` import + `package.json`) even though the brief says no Tailwind. Remove it in a small dedicated task.
- `README.md` is still the create-next-app template.

### Roadmap (one task per block)

**Dec 6 milestone:**

5. ~~`app/words.ts` + render with `.map()`~~ ✅ Nov 23
6. Card is a `<button>` with an accessible name, `lang="es"` and the emoji `aria-hidden` ← next
7. Grid layout (1–2 per row on a phone) + visible focus outline
8. Tap to say the Spanish word (`speechSynthesis`)
9. Then English after a pause, with a "playing" highlight

**Can slip to the following week:**

10. `prefers-reduced-motion`; remove Tailwind
11. Update the README; grow to 12 words

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

## Code conventions

- Put types at the top of the file, before the code that uses them.
- Name things for what they are, not for the first examples (`emoji`, not `animal`; a 🚗 isn't an animal).
- Props: destructure them in the function signature and type them with a named `type XProps`.
- Next.js here is v16. Check `node_modules/next/dist/docs/` before following online tutorials (see AGENTS.md).

## How to work with Daniel

- **Claude is read-only by default.** Daniel types and commits all code. Claude reads, reviews and coaches, and only edits files when Daniel explicitly approves a specific change.
  - Exception: during `/end-block`, Claude may update the Current state section of CLAUDE.md, and Daniel reviews it before committing.
- **Claude may run in the cloud and only sees what's pushed to GitHub.** To get a review of in-progress or broken code, push it to the feature branch as WIP.
- **Act like a senior engineer reviewing a PR:** ask guiding questions, explain the _why_ and the trade-offs, and give the direct answer only when Daniel is stuck or asks.
- **Coach first, then code.** Daniel works in 45-minute blocks around his kids, each with one goal. Help him finish that goal, and prefer explaining and giving small hints over writing whole files. When you do write code, keep it short and explain what each part does so he can explain it himself.
- **Explain TypeScript errors in plain words** before suggesting a fix.
- **One small step at a time**, with a clear "done" at the end, ideally something he can see in the browser.
- **No new dependencies without asking.** Keep styling plain (inline styles or CSS Modules); no Tailwind or component libraries for now.
- **Small commits** with clear messages ("Add words list and render cards from it").
- Keep the README current: what the app is, how to run it, and the key decisions (why `<button>`, why `lang="es"`, why speech synthesis first).

## Interview stories (lessons learned)

- **"Make sure your test can fail."** Testing a TypeScript prop with `es="5"` passed because `"5"` is a string. `es={5}` (a number) correctly failed.
- **"Change something obvious and see what moves."** Used this to find which of two identical cards came from the new component.
- **Squash vs. regular merge:** chose squash so every commit on `main` works and `git bisect` stays useful.
