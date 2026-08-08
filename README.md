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
- **Deploy command:** `npx wrangler deploy --keep-vars`

Do not use plain `yarn build` before deploy — that only runs `next build` and skips the OpenNext bundle (`.open-next/`).

### DNS (required for API fetches from the Worker)

`UND_ERR_CONNECT_TIMEOUT` means the Worker/build cannot open TCP to the origin IP. Your host (WY-CLOUD) accepts **Cloudflare proxy** traffic (apex already works) but not direct Worker/CI egress. Fix: proxy `api` through Cloudflare.

In **DNS** for `zijemevzidech.cz`, set:

| Name | Type | Content | Proxy |
|------|------|---------|-------|
| `api` | A | `195.181.251.29` | **Proxied (orange cloud)** — click the grey cloud until it turns orange |
| `@` / `www` | Worker custom domain | — | served by Worker `zijemevzidech` |

SSL/TLS mode: **Full (Strict)**.

Verify proxy is on (must NOT show the origin IP):

```bash
dig +short api.zijemevzidech.cz
# expected: 188.114.x.x / 104.x.x.x (Cloudflare)
# wrong:    195.181.251.29  ← still grey cloud

curl -sI https://api.zijemevzidech.cz/json/menu | grep -i cf-ray
# must print a cf-ray line
```

Until that changes, server-side fetch will keep timing out. Browser → API can still work.

Attach the site hostname in **Workers → zijemevzidech → Settings → Domains & Routes** (or uncomment `routes` with `custom_domain` in `wrangler.jsonc` and redeploy). Until that is set, the app is only on `https://zijemevzidech.shadow-hub.workers.dev/`.

### Environment variables

Set both:

1. **Build variables** (Workers Builds) — needed during `next build` / SSG  
2. **Runtime variables** (Worker Settings) — needed for ISR / server fetch  

| Variable | Example |
|----------|---------|
| `NEXT_PUBLIC_API_BASE` | `https://api.zijemevzidech.cz/json/` |
| `NEXT_PUBLIC_EE_BASE` | `https://api.zijemevzidech.cz/index.php` |
| `NEXT_PUBLIC_SITE_BASE` | `https://zijemevzidech.cz/` |
| `API_BASE` / `EE_BASE` / `SITE_BASE` | same values (server / ISR) |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | (optional) |

`wrangler.jsonc` already defines the non-secret `vars` above. Use `--keep-vars` on deploy so dashboard secrets are not wiped (see `yarn deploy`).
