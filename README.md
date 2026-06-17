# David Cuellar Personal Landing Page

DavidOS: Systems in Motion is a production-ready personal landing page for David Cuellar, a software engineering leader in San Antonio, TX. The site presents David's career, projects, operating principles, and skill matrix as a premium engineering command center with a decorative career constellation, command palette, creative build-log resume, and accessible static content.

## Tech Stack

- Astro
- TypeScript
- React islands
- React Three Fiber, Three.js, and Drei
- GSAP with ScrollTrigger
- Lenis smooth scrolling
- Vanilla CSS with design tokens
- lucide-react and react-icons
- pnpm

## Local Development

```bash
pnpm install
pnpm dev
```

The dev server usually runs at `http://localhost:4321`.

## Build

```bash
pnpm build
pnpm preview
```

Optional checks:

```bash
pnpm check
pnpm format
```

## Deployment

This is a static Astro site and can be deployed to Vercel, Cloudflare Pages, Netlify, GitHub Pages, or any static host.

Recommended production settings:

- Build command: `pnpm build`
- Output directory: `dist`
- Node version: current LTS
- Install command: `pnpm install --frozen-lockfile` after `pnpm-lock.yaml` is committed

## Content Editing Guide

- Profile, bio, headline, social links, principles, and build-log entries live in `src/data/profile.ts`.
- Featured project cards live in `src/data/projects.ts`.
- Experience and education live in `src/data/resume.ts`.
- Skill groups live in `src/data/skills.ts`.
- SEO metadata and Person JSON-LD live in `src/layouts/BaseLayout.astro`.
- Visual tokens live in `src/styles/tokens.css`; global layout and command palette styles live in `src/styles/global.css`.

## Accessibility and Performance Notes

- The Three.js scene is decorative and marked `aria-hidden`.
- The page has semantic sections, a skip link, keyboard-accessible navigation, visible focus rings, and no required text inside canvas.
- Motion is optional. Lenis, GSAP, and the Three.js scene respect `prefers-reduced-motion`; the WebGL scene also reduces work when the document is hidden.
- Static content renders before interactive islands hydrate.

## Assumptions / TODOs

- Phone number, work email, and a contact form are intentionally omitted. Public contact actions use LinkedIn, GitHub, and X.
- Verify spelling of the LeagueLore domain before launch. The project currently uses `https://www.leagueloreapp.com` from the build brief.
- Exact employment dates were not provided, so the resume is organized by role sequence rather than date ranges.
- No external paid assets, CMS, backend, or database are used.
