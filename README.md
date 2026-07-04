# Žijeme v Židech

Next.js app for [zijemevzidech.cz](https://zijemevzidech.cz), deployed to Cloudflare Workers via [@opennextjs/cloudflare](https://opennext.js.org/cloudflare).

## Development

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
yarn build              # Next.js build (Cloudflare / Node)
yarn build:cloudflare   # Full OpenNext bundle for Cloudflare
yarn build:static       # Static HTML export for shared hosting → out/
yarn generate-paths     # Refresh data/static-paths.json when API unreachable at build
```

## Shared hosting (Apache / cPanel)

```bash
yarn build:static
```

Upload the contents of the **`out/`** directory to your web root (e.g. `public_html`). The build includes:

- Pre-rendered HTML for all routes (48 pages)
- OG meta tags in each page
- `.htaccess` for Apache URL rewriting

After adding new content, run `yarn generate-paths` and rebuild.

## Cloudflare

Preview locally in the Workers runtime:

```bash
yarn preview
```

Deploy to Cloudflare (build + deploy in one step):

```bash
yarn deploy
```

For Cloudflare Workers CI with separate build and deploy steps:

- **Build command:** `yarn build:cloudflare`
- **Deploy command:** `npx wrangler deploy`

Do not use plain `yarn build` before deploy — that only runs `next build` and skips the OpenNext bundle (`.open-next/`), which causes the deploy error you saw.

Optional environment variable:

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — Google Maps API key (falls back to the existing key)
