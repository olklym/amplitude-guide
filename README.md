This is a small [Next.js](https://nextjs.org) POC for testing Amplitude Guides and Surveys with:

- `@amplitude/analytics-browser`
- `@amplitude/engagement-browser`

## Getting Started

1) Install dependencies (Node 18+ recommended)

```bash
npm install
```

2) Create your local env file

```bash
cp .env.example .env.local
```

3) Set values in `.env.local`:

- `NEXT_PUBLIC_AMPLITUDE_API_KEY`: your Amplitude project API key
- `NEXT_PUBLIC_AMPLITUDE_SERVER_ZONE`: `US` or `EU`
- `NEXT_PUBLIC_POC_USER_ID`: fixed test user id for targeting
- `NEXT_PUBLIC_AMPLITUDE_GUIDE_FLAG_KEY`: optional guide flag key used by the POC controls

4) Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to test:

- automatic SDK init on app load
- page view tracking (`poc_page_view`)
- tracked UI actions (open encounter, nav clicks, profile save, etc.)
- manual guide actions from Dashboard:
  - show guide by flag key
  - refresh guide config
  - open resource center
  - list active guides

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Notes

- In this environment, package install failed under Node 12; run with Node 18+ (or 20+) locally.
- Guides must be configured in Amplitude and targeted to the POC user/project to render.
