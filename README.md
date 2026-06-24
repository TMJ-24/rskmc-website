# RSKMC Website

Official website for Rev Sione Kami Memorial Church (RSKMC), built with Next.js 15 (App Router) and deployed on Cloudflare Workers via OpenNext.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Deployment**: Cloudflare Workers via `@opennextjs/cloudflare`
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Features

- Static public-facing church website with:
  - Hero slider with autoplay
  - Ministry and leadership information
  - Service times and schedules
  - Sermons and messages
  - News and events
  - Projects and testimonials
  - Giving and contact page (mailto form)
- Admin dashboard stub (UI only, no backend)
- Responsive design with mobile navigation

## Getting Started

### Prerequisites

- Node.js 20+

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Preview on Cloudflare Workers runtime

```bash
npm run preview
```

## Deployment

Deployed via Cloudflare Pages with continuous deployment from the `main` branch.

### Manual deploy

```bash
npx wrangler login   # first time only
npm run deploy
```

### Cloudflare Pages (CI/CD)

Connect the GitHub repo in the Cloudflare dashboard under **Workers & Pages → Create → Pages → Connect to Git** with these build settings:

| Setting | Value |
|---|---|
| Build command | `npx opennextjs-cloudflare build` |
| Build output directory | `.open-next/assets` |
| Node.js version (env var) | `20` |

Push to `main` to trigger a build.

## Project Structure

```
app/
  page.tsx          # Homepage
  about/            # About page
  admin/            # Admin dashboard (stub)
  events/           # News & events
  give/             # Giving & contact
  ministries/       # Ministries
  projects/         # Projects
  sermons/          # Sermons
  services/         # Service times
  testimonials/     # Testimonials
components/         # Shared UI components
public/             # Static assets
open-next.config.ts # OpenNext / Cloudflare config
wrangler.jsonc      # Cloudflare Workers config
```

## License

This project is licensed under the MIT-0 License. See the LICENSE file.
