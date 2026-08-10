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

## Editing content

All page content is embedded in the site components under `app/components/` (`Intro.js`, `Foundation.js`, `Career.js`, `Tech.js`, `Projects.js`, `Contact.js`), with site-level values (brand, tagline, resume URL) in `app/page.js` and `app/layout.js`. To change content, edit the relevant component and deploy normally.

### Local admin tool (not part of the deployed site)

`app/admin/` is a local-only editing tool — it's gitignored and never pushed to GitHub. It can edit content and count visits on your machine, but the deployed site is fully static: its content comes from the components above, and it doesn't track visits.

### Favicon & navbar logo

The signature logo in the navbar (`public/images/signature.png`) and the browser-tab favicon both derive from `public/images/logo.png` (a transparent PNG of the monogram). The generated files are `public/images/favicon-light.png`, `public/images/favicon-dark.png`, and `public/images/signature.png` — theme-aware and switched by `FaviconTheme` via `prefers-color-scheme`. To change the logo, replace `public/images/logo.png`, regenerate, and bump the `?v=` cache-buster in `app/layout.js`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
