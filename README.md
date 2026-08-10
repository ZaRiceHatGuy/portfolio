This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Editing content (Admin)

All page content lives in [`app/admin/data/content.json`](app/admin/data/content.json). Edit it directly, or use the admin UI:

1. Run `npm run dev` and open http://localhost:3000/admin
2. Edit any section (profile, about, education, career log, awards, tech stack, projects) and click **Save changes**
3. The change is written to `app/admin/data/content.json` and appears on the site immediately in dev; commit the file to deploy it

The site reads `app/admin/data/content.json` at request time in dev and bakes it in at build time for production. On Vercel serverless the filesystem is read-only, so edit via the local admin (or the file directly) and commit.

### Uploading media from the admin

Each upload field stages a file locally, and clicking **Save changes** writes it into the folder for that section, keeping the **original file name**:

- **Profile picture** → `public/profile/` (path `/profile/<name>`)
- **Tech-stack / language logos** → `public/icons/` (path `/icons/<name>`, SVG only)
- **Project images & videos** → `public/project/` (path `/project/<name>`)
- **Resume** → `public/Resume/` (path `/Resume/<name>`, PDF only)

Uploading a file with the same name overwrites the existing one. Commit both `app/admin/data/content.json` and the new files under `public/` to deploy them. Like saving content, uploads require a writable filesystem, so they only work when running locally (or on a host with persistent disk).

### Reordering the tech stack

In the **Tech stack** section of the admin, drag the grip handle (⋮⋮) of a group or skill to move it above/below other items — skills can also be dragged into a different group. The ↑/↓ arrow buttons do the same thing for keyboard/touch use. The order is saved with the rest of the content.

### Visitor counter

Each browser session that opens the site records one visit via `POST /admin/api/visits`, persisted in [`app/admin/data/visits.json`](app/admin/data/visits.json). The admin header shows the running total (click it to refresh). Like content saves, the count is stored on a writable filesystem, so it accumulates locally (or on a host with persistent disk).

### Favicon & navbar logo

The signature logo in the navbar (`public/images/signature.png`, white, centered in the bar) and the browser-tab favicon both derive from `public/images/logo.png` (a transparent PNG of the monogram) via [`app/admin/scripts/generate-favicons.py`](app/admin/scripts/generate-favicons.py). The script extracts the strokes through the alpha channel and renders `public/images/favicon-light.png` (black monogram, used in light mode) and `public/images/favicon-dark.png` (white monogram, used in dark mode) at 512×512, plus the white navbar `signature.png`. The favicon is **transparent** and **theme-aware**, switched by `FaviconTheme` via `prefers-color-scheme`. The icon URLs carry a `?v=3` cache-buster — bump it when regenerating so browsers pick up the new icon. To change the logo, replace `public/images/logo.png` and rerun the script (or swap the generated files directly).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
