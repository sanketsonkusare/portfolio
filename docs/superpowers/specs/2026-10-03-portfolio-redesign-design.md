# Portfolio redesign: design spec

Date: 2026-10-03. Owner: Sanket Sonkusare. Site: sanketsonkusare.me (React 19, Vite 7, Tailwind 4, react-router-dom 7).
Visual source of truth: `docs/design/portfolio-mockup.html` (approved mockup; open in a browser, nav icon toggles theme).

## Goal
Replace the current playful, particle-background portfolio with a simple, professional site that shows all of Sanket's work. Three pages: Home, Experience, Projects. Nothing is deployed until Sanket says so.

## Pages and order
- Home (`/`): hero (name, title, current workplace, short bio, large photo, Download resume + Email me), Experience preview (4 roles, short summaries, link to full page), Projects preview (3 cards, link to full page), Education, Tools, Beyond code, footer.
- Experience (`/experience`): full detail per role (bullets), Education, footer.
- Projects (`/projects`): all six projects as cards (screenshot, name, stack, description, GitHub link, live link where one exists), footer.
- Removed: Blogs, Built, Connect, Resume pages, Random Stats, Philosophy, ParticleBackground. Old routes (`/blogs`, `/built`, `/connect`, `/resume`) redirect to `/`.

## Design language
- Single centred column, max width 800px, 24px side padding. Font Geist (fallback Inter, system-ui). Dark by default, light via toggle. One blue accent. Hairline dividers.
- Label-left rows (9rem label column). Cards lift 4px and zoom image on hover. Scroll progress bar at the top.
- Header: name on the left; Experience, Projects, then a theme icon button (sun in dark, moon in light) on the right. No other floating controls.
- Footer on every page, full-width bar: Email me button plus GitHub, X, LinkedIn, Instagram icons, each with a hover/focus card (handle plus a one-line description), clamped inside the viewport.
- Experience timeline: vertical line connecting dots; line fills with the accent as the page scrolls; dots light up when reached. Company logos (DevRev, Scrobits, Manastik, Rubixe) in white rounded tiles. Education uses university logos.
- Motion: hero fade-in on load; hover and scroll-linked effects only. `prefers-reduced-motion` disables all of it.

## Content rules
- Title is "Forward Deployed Engineer at DevRev". Never write "Contract" in the title or company line.
- Do not name the DevRev customer. Do not include internal workflow URLs.
- 167 datasets figure is allowed. Instagram stays in the footer. Hand Cursor Control has no Live link (the old one was a rickroll GIF).
- Hover-card wording: GitHub "Source code for my projects."; X "Notes on AI and what I am building."; LinkedIn "Forward Deployed Engineer at DevRev."; Instagram "Fitness and life outside work." (Sanket to confirm.)
- Handles: github.com/sanketsonkusare, x.com/sassysanket, linkedin.com/in/sanketsonkusare, instagram.com/sassysanket. Email sanketsonkusare01@gmail.com.
- Education: MIT World Peace University (Aug 2023 – Aug 2025), Savitribai Phule Pune University (2019 – 2023).
- Resume: "Download resume" button points at `/resume.pdf`; Sanket will supply the updated PDF later. Until it is replaced, the existing PDF stays.

## Technical requirements
- Keep React + Vite + Tailwind 4 + react-router-dom. Drop framer-motion and daisyUI if unused after the rewrite.
- Theme stored in `data-theme` on `<html>`, persisted in localStorage (guarded with try/catch), initial value from saved choice, else dark.
- Content lives in `src/data/*.js`; components hold no copy.
- Images: resized and compressed (project screenshots <= 800px wide, photo <= 700px). Logos stored as files in `src/assets/logos/`.
- SEO: title "Sanket Sonkusare | Forward Deployed Engineer", updated description and OG/Twitter text, favicon fixed, `package.json` name `sanket-portfolio`, README replaced.
- Accessible: visible keyboard focus, hover cards also open on focus, buttons have labels, contrast meets WCAG AA in both themes.
- Responsive to 360px wide with no horizontal scroll.

## Out of scope
Blog, analytics changes, deployment, new resume PDF, custom domain changes.
