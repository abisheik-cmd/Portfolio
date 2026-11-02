# ABIZK — Creative Portfolio

A responsive, single-page portfolio for ABIZK, a creative editor and designer working across video editing, motion graphics and graphic design. The homepage places the About statement beside the ABIZK wordmark and presents original user-supplied poster and video work in an editorial, neo-brutalist visual system.

## Built with

- React 19, TypeScript and Wouter
- Vite for development and static production builds
- Tailwind CSS with the visual system in `client/src/index.css`
- Lucide React icons

The current website is a static frontend with no application database or customer-facing backend flow.

## Original media

The four original user uploads are included in `client/public/media/` and mapped in `client/src/components/portfolio/portfolioAssets.ts`:

- `abizk-profile.jpeg` — profile photo
- `poster-01-leofarewell.webp` — featured poster 01
- `poster-02-messi.webp` — featured poster 02
- `featured-video.mp4` — original 10-second 1080p H.264/AAC video

The site uses these original files directly; no generated or unrelated stock imagery replaces the supplied portfolio work. The video remains user-started and uses the custom Play/Pause and Mute/Unmute controls.

## Local development

```bash
pnpm install --frozen-lockfile
pnpm dev:static
```

The Vite server listens on `PORT` when set, otherwise on port `3000`.

## Project scripts

- `pnpm dev:static` — start the frontend development server.
- `pnpm build:static` — build the deployable frontend into `dist/public/`.
- `pnpm check` — run the TypeScript check.
- `pnpm test` — run the configured Vitest suite.

The package also retains server and database scripts, but they are not used by the current static portfolio.

## Main source files

- `client/src/components/portfolio/PortfolioSections.tsx` — homepage, About copy, featured work, services, Recipe slider and contact sections.
- `client/src/components/portfolio/MinimalVideoPlayer.tsx` — accessible player with only Play/Pause and Mute/Unmute controls.
- `client/src/components/portfolio/portfolioAssets.ts` — centralized paths for the supplied profile, posters and video.
- `client/src/index.css` — palette, typography, responsive layout and interaction styling.
