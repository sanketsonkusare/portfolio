# sanketsonkusare.me

Personal portfolio: Home, Experience and Projects. React 19, Vite 7, react-router-dom 7. Plain CSS with design tokens in `src/index.css`; dark by default with a light theme toggle.

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # serve the build
npm run lint
npm test          # node:test via scripts/test.mjs (uses the esbuild that ships with Vite)
```

## Where things live

- `src/data/` all copy and links (profile, experience, projects, education, tools, socials). Edit text here, not in components.
- `src/components/` presentational pieces (Header, Footer, Timeline, ProjectCard, SocialIcons, ...).
- `src/pages/` Home, Experience, Projects. `src/routes.jsx` maps URLs; old `/blogs`, `/built`, `/connect`, `/resume` and unknown URLs redirect to Home.
- `src/lib/` small pure helpers with tests (theme storage, timeline fill, hover-card clamping, scroll progress).
- `public/resume.pdf` is what "Download resume" links to. Replace the file to update it.
- `docs/` design spec, implementation plan and the approved HTML mockup (`docs/design/portfolio-mockup.html`).
