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

- **Build command:** `yarn build` (runs OpenNext → `.open-next/`)
- **Deploy command:** `npx wrangler deploy --keep-vars`

Plain Next only: `yarn build:next`. Static export: `yarn build:static`.

### DNS

| Name | Type | Content | Proxy |
|------|------|---------|-------|
| `api` | A | origin IP | **Proxied (orange)** — required for Worker runtime → API |
| `@` / `www` | Worker custom domain | — | served by Worker `zijemevzidech` |

SSL/TLS: **Full (Strict)**.

### CI builds and the API

Cloudflare Workers Builds **cannot** fetch CF-proxied hostnames (hairpin). The build therefore skips live API calls when `CI=true`, uses `data/static-paths.json` for routes, and lets the **browser** load content after deploy. Refresh paths after CMS changes:

```bash
yarn generate-paths
```

To force a local offline build: `SKIP_API_FETCH=1 yarn build`.

### Environment variables

1. **Build variables** — at least `NEXT_PUBLIC_*` (inlined into the client bundle)  
2. **Runtime variables** — `API_BASE` / `EE_BASE` / `SITE_BASE` for Worker ISR  

| Variable | Example |
|----------|---------|
| `NEXT_PUBLIC_API_BASE` | `https://api.zijemevzidech.cz/json/` |
| `NEXT_PUBLIC_EE_BASE` | `https://api.zijemevzidech.cz/index.php` |
| `NEXT_PUBLIC_SITE_BASE` | `https://zijemevzidech.cz/` |
| `API_BASE` / `EE_BASE` / `SITE_BASE` | same values (server / ISR) |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | (optional) |

`wrangler.jsonc` already defines these `vars`. Use `--keep-vars` on deploy so dashboard values are not wiped.
