# Repository Guidelines

Concise contributor reference for the Knowledge ARC webinar PWA. Keep changes minimal, focused, and consistent with the existing static setup.

## Project Structure & Module Organization
- `index.html`: Main landing page (markup, Tailwind utility classes, small scripts).
- `sw.js`: Service Worker (offline caching, install/activate lifecycle).
- `manifest.json`: PWA metadata and icon declarations.
- `icons/`: App icons; generate via `generate-icons.html` if updating.
- `generate-icons.html`: In-browser icon generation helper.
- `README.md`: Usage, customization, and deployment notes.
- `개인지식관리 웨비나*.md`: Slide/document content (non-runtime).

Prefer keeping small enhancements inline in `index.html`. If code grows, discuss introducing `assets/` or `scripts/` before creating new folders.

## Build, Test, and Development Commands
- `npm install`: Install local dev tooling (Tailwind, live-server).
- `npm run dev`: Start local server at `http://localhost:3000` with live reload.
- `npm run build`: Placeholder no-op today (safe to run for CI).

For a quick preview without npm, you can also use `npx live-server` in the repo root.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; UTF-8; LF line endings.
- HTML: Semantic elements, accessible labels/roles; group sections logically.
- CSS: Utility-first via Tailwind; customize brand via `:root` CSS vars inside `index.html`.
- JS: ES6+, small functions; avoid globals; keep script size minimal.
- Filenames/ids: `lowercase-dashes` for files, `kebab-case` classes, `camelCase` JS.

## Testing Guidelines
- No automated tests yet. Perform manual checks:
  - Lighthouse (Performance/PWA/Accessibility) in Chrome DevTools.
  - PWA installability (Application tab → Manifest; Service Workers).
  - Offline behavior (toggle “Offline” and reload).

Document manual test steps in PRs. If adding tooling later, prefer lightweight checks (e.g., HTML validate, Prettier).

## Commit & Pull Request Guidelines
- Commits: Imperative, concise; use conventional prefixes when clear: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`.
- PRs must include: purpose and scope, before/after screenshots (UI), links to issues, manual test notes (URLs, devices/viewport), and any PWA validation results.

## Security & Configuration Tips
- Serve over HTTPS for SW/PWA features. Do not commit secrets.
- When updating icons, ensure sizes in `manifest.json` match generated files in `icons/`.
