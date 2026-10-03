# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild sanketsonkusare.me as a three-page professional portfolio (Home, Experience, Projects) matching the approved mockup.

**Architecture:** Content in `src/data/*.js`; small presentational components in `src/components/`; three page components in `src/pages/`; theme and scroll behaviour in two hooks. Styling with CSS variables in `src/index.css` (tokens from the mockup) plus Tailwind utilities for layout.

**Tech Stack:** React 19, Vite 7, Tailwind 4, react-router-dom 7, Vitest + @testing-library/react (new, dev only), Playwright (existing in the environment) for screenshots.

**Spec:** `docs/superpowers/specs/2026-10-03-portfolio-redesign-design.md`. Visual reference: `docs/design/portfolio-mockup.html`.

## Global Constraints

- Branch `redesign/portfolio-v2`; nothing is pushed or deployed without Sanket's say-so.
- Title text: "Forward Deployed Engineer at DevRev". The word "Contract" appears nowhere in the UI.
- No customer name and no internal workflow URL anywhere in the code.
- Column max width 800px; font Geist with Inter and system-ui fallback; dark default; one blue accent.
- Email `sanketsonkusare01@gmail.com`; handles `sanketsonkusare` (GitHub, LinkedIn), `sassysanket` (X, Instagram).
- Routes: `/`, `/experience`, `/projects`; old `/blogs`, `/built`, `/connect`, `/resume` redirect to `/`.
- Every behaviour that moves respects `prefers-reduced-motion`.

## Review Focus

- Saved theme value in localStorage is invalid or storage throws: site renders dark without error.
- Unknown URL such as `/foo`: redirects to `/` instead of a blank page.
- Hover card for the rightmost footer icon on a 360px screen: card stays inside the viewport.
- Page opened already scrolled (reload mid-page) or window resized: timeline fill and progress bar are correct on first paint.
- A project without a live link (Hand Cursor Control): no Live button rendered, no empty link.

---

### Task 1: Foundation (cleanup, tokens, theme, routing, test tooling)

**Files:**
- Delete: `src/components/ParticleBackground.jsx`, `src/components/Navbar.jsx`, `src/pages/Blogs.jsx`, `src/pages/Built.jsx`, `src/pages/Connect.jsx`, `src/pages/Resume.jsx`, `src/App.css`
- Create: `src/hooks/useTheme.js`, `src/test/setup.js`, `src/hooks/useTheme.test.js`
- Modify: `src/index.css` (replace with mockup tokens, dark and light), `src/App.jsx`, `src/main.jsx`, `package.json` (name `sanket-portfolio`, scripts `test`), `vite.config.js` (vitest jsdom config), `index.html` (Geist font link, theme-color)

**Interfaces:**
- Produces: `useTheme(): { theme: 'dark' | 'light', toggle: () => void }`; CSS variables `--bg --ink --mut --line --line2 --card --acc --accsoft --btn --btnfg` defined for `html[data-theme="dark"]` and `html[data-theme="light"]`; `<App>` with routes `/`, `/experience`, `/projects`, wildcard `*` redirecting to `/`.

- [ ] **Step 1: Write failing tests** in `useTheme.test.js`: `defaults to dark with empty storage`; `toggle flips data-theme on <html> and persists to localStorage key "theme"`; `falls back to dark when localStorage.getItem throws or returns "purple"`.
- [ ] **Step 2: Run** `npm test -- useTheme` → FAIL (module missing).
- [ ] **Step 3: Install** `npm i -D vitest jsdom @testing-library/react @testing-library/jest-dom`; implement `useTheme` with try/catch around every storage call.
- [ ] **Step 4: Run** `npm test -- useTheme` → PASS.
- [ ] **Step 5: Replace** `index.css` with the mockup's variable blocks and base styles; reduce `App.jsx` to router + placeholder pages; delete listed files; confirm `npm run build` succeeds.
- [ ] **Step 6: Commit** `git commit -m "chore: strip old site, add tokens, theme hook and routing"`.

### Task 2: Content data modules

**Files:**
- Create: `src/data/profile.js`, `src/data/experience.js`, `src/data/projects.js`, `src/data/education.js`, `src/data/tools.js`, `src/data/socials.js`, `src/data/content.test.js`
- Create: `src/assets/logos/{devrev.svg,scrobits.png,manastik.png,rubixe.png,mitwpu.png,sppu.png}` (copy from `docs/design/logos/`, which is already committed with the mockup)

**Interfaces:**
- Produces: `profile: { name, title, company, location, bio, email, resumeUrl, photo }`; `experience: Array<{ id, role, company, logo, dates, current?: boolean, summary, bullets: string[] }>` (newest first: DevRev, Scrobits, Manastik, Rubixe); `projects: Array<{ id, title, image, stack, description, github, live?: string }>` (six, order as in the old Projects page); `education: Array<{ school, logo, dates, detail }>`; `tools: Array<{ group, items: string[] }>`; `socials: Array<{ id: 'github'|'x'|'linkedin'|'instagram', label, handle, href, blurb }>`.

- [ ] **Step 1: Write failing tests** in `content.test.js`: `no string in any data module contains "Contract"`; `no string contains "Camping" or "workflow-94" or "devrev.ai/"`; `experience[0] is DevRev, current, and experience has 4 entries`; `every project has github https URL and "Hand Cursor Control" has no live`; `socials has exactly github, x, linkedin, instagram with the spec's hrefs`.
- [ ] **Step 2: Run** `npm test -- content` → FAIL.
- [ ] **Step 3: Implement the modules**, copying the copy text from the mockup and the project data from the old `Projects.jsx` (read it via `git show main:src/pages/Projects.jsx`); `bullets` for DevRev come from the mockup's Experience page.
- [ ] **Step 4: Run** `npm test -- content` → PASS.
- [ ] **Step 5: Commit** `feat: add content data modules and logos`.

### Task 3: Shell components (Header, Footer, SocialIcons, ThemeToggle, ProgressBar)

**Files:**
- Create: `src/components/Header.jsx`, `Footer.jsx` (overwrite old), `SocialIcons.jsx`, `ThemeToggle.jsx`, `ProgressBar.jsx`, `Layout.jsx`, plus `*.test.jsx` for Header, ThemeToggle, SocialIcons
- Modify: `src/App.jsx` to wrap routes in `<Layout>` (ProgressBar, Header, `<Outlet/>`, Footer)

**Interfaces:**
- Consumes: `useTheme`, `socials`, `profile.email`.
- Produces: `<SocialIcons />` renders four links `aria-label="GitHub"` etc., each opening a card with `handle` and `blurb` on hover and on focus; `clampCard(cardRect: DOMRect, viewportWidth: number, margin = 12): number` (returns the horizontal shift in px) exported from `SocialIcons.jsx`; `<ThemeToggle />` is a button whose accessible name is "Switch to light theme" in dark and "Switch to dark theme" in light and shows the sun in dark, the moon in light.

- [ ] **Step 1: Write failing tests**: `ThemeToggle label and icon change after click`; `Header has links Experience and Projects and the toggle after Projects`; `SocialIcons shows handle card on focus`; `clampCard returns a negative shift when the card overflows the right edge at 360px and 0 when it fits`.
- [ ] **Step 2: Run** `npm test -- components` → FAIL.
- [ ] **Step 3: Implement** the components per the mockup's markup and CSS; ProgressBar updates a CSS width from scroll position inside `requestAnimationFrame`, recalculated on mount and resize.
- [ ] **Step 4: Run** `npm test -- components` → PASS.
- [ ] **Step 5: Commit** `feat: header, footer, social hover cards, theme toggle`.

### Task 4: Experience timeline and sections

**Files:**
- Create: `src/components/Timeline.jsx`, `ExperienceRow.jsx`, `ProjectCard.jsx`, `EducationList.jsx`, `ToolsList.jsx`, `Section.jsx`, `src/hooks/useScrollFill.js`, tests `Timeline.test.jsx`, `ProjectCard.test.jsx`, `useScrollFill.test.js`

**Interfaces:**
- Produces: `<Timeline items={experience} detailed={boolean} />`; `<ProjectCard project />` (renders Live button only when `project.live`); `<EducationList items />`; `<ToolsList groups />`; `useScrollFill(ref): { fillHeight: number, reached: boolean[] }` where `computeFill(dotOffsets: number[], baseTop: number, viewportLine: number): { fillHeight: number, reached: boolean[] }` is exported from `useScrollFill.js` and unit tested (pure function).

- [ ] **Step 1: Write failing tests**: `computeFill clamps fillHeight to 0 when the viewport line is above the first dot and to the full span below the last`; `computeFill marks dots at or above the line as reached`; `Timeline renders four logos with alt text "<Company> logo"`; `ProjectCard hides the Live link when live is undefined`; `Timeline detailed renders bullets, summary mode does not`.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement**; fill line height follows `viewportLine = innerHeight * 0.62`; compute once on mount and on scroll/resize; with reduced motion set the line fully filled and drop transitions.
- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `feat: timeline, project cards, education and tools sections`.

### Task 5: Pages (Home, Experience, Projects) and hero

**Files:**
- Create: `src/pages/Home.jsx` (overwrite), `Experience.jsx`, `Projects.jsx` (overwrite), `src/components/Hero.jsx`, `src/pages/pages.test.jsx`
- Modify: `src/App.jsx` routes

**Interfaces:**
- Consumes: all Task 2–4 modules. Produces: `<Home/>` (Hero, Experience preview with "See full experience" link to `/experience`, three project cards with "See all projects" link to `/projects`, Education, Tools, Beyond code), `<Experience/>` (detailed Timeline + Education), `<Projects/>` (all six cards).

- [ ] **Step 1: Write failing tests** (render with MemoryRouter): `Home shows "Forward Deployed Engineer at DevRev" and no "Contract"`; `Home lists exactly three project cards and links to /projects`; `Projects page lists six cards`; `/foo redirects to /`; `/connect redirects to /`.
- [ ] **Step 2: Run** `npm test -- pages` → FAIL.
- [ ] **Step 3: Implement** pages and hero (photo 640px wide asset, `loading="eager"`, `width`/`height` set to avoid layout shift; hero fade-in only).
- [ ] **Step 4: Run** `npm test` (whole suite) → PASS.
- [ ] **Step 5: Commit** `feat: home, experience and projects pages`.

### Task 6: Assets, SEO and housekeeping

**Files:**
- Modify: `index.html` (title, description, OG and Twitter text, favicon from `public/favicon.png`), `README.md` (replace Vite default with project overview and commands), `public/og-image.png` (regenerated 1200x630 only if the current one shows old content; otherwise keep)
- Create: `public/favicon.png` (from `src/assets/S_logo.png`, 64x64)
- Delete: unused `src/assets/journey/*`, `src/assets/medal/*`, `1000136928.jpg`, `Sanket_Sonkusare_Resume.jpg` only if no component imports them (check with grep first); remove `framer-motion` and `daisyui` from `package.json` if unused

- [ ] **Step 1: Verify** `grep -R "framer-motion\|daisyui" src` returns nothing, then remove both packages.
- [ ] **Step 2: Resize** project screenshots to <= 800px wide and the photo to 640px using `sips` or `npx sharp-cli`; confirm each file under 200KB.
- [ ] **Step 3: Update** meta tags and favicon; replace README.
- [ ] **Step 4: Run** `npm run build && npm run lint` → both exit 0.
- [ ] **Step 5: Commit** `chore: seo, favicon, image optimisation, cleanup`.

### Task 7: Visual and behavioural QA

**Files:**
- Create: `scripts/qa-screenshots.mjs` (Playwright: dark and light, 1280 and 390 wide, all three routes)

- [ ] **Step 1: Run** `npm run build && npm run preview` and `node scripts/qa-screenshots.mjs`; compare against `docs/design/portfolio-mockup.html` screenshots.
- [ ] **Step 2: Check** at 390px: no horizontal scroll (`document.documentElement.scrollWidth <= innerWidth`), footer hover cards inside the viewport.
- [ ] **Step 3: Check** keyboard: Tab reaches theme toggle, each social icon opens its card on focus, focus ring visible in both themes.
- [ ] **Step 4: Check** reduced motion: emulate `prefers-reduced-motion: reduce`; hero shows without fade, timeline fully filled.
- [ ] **Step 5: Fix** any differences, rerun `npm test && npm run build`, commit `fix: qa findings`.
- [ ] **Step 6: Hand off** a preview (`npm run preview` screenshots) to Sanket; do not push, merge or deploy.
