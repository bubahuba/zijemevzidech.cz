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
yarn build              # next build only (used internally by OpenNext)
yarn build:cloudflare   # OpenNext bundle for Cloudflare → .open-next/
yarn build:static       # Static HTML export for shared hosting → out/
yarn generate-paths     # Optional: refresh data/static-paths.json
```

**Do not set `package.json` `"build"` to `opennextjs-cloudflare build`** — OpenNext calls `yarn build` itself; that caused an infinite loop and the 30‑minute CI timeout.

## Shared hosting (Apache / cPanel)

```bash
yarn build:static
```

Upload the contents of **`out/`** to the web root.

## Cloudflare

### Local deploy (recommended while iterating)

```bash
yarn deploy
```

This builds with `SKIP_API_FETCH=1`, deploys the Worker, and attaches custom domains from `wrangler.jsonc`.

### Workers Builds (CI)

In the Worker → Settings → Builds:

| Setting | Value |
|---------|--------|
| **Build command** | `yarn build:cloudflare` |
| **Deploy command** | `npx opennextjs-cloudflare deploy -- --keep-vars` |
 
Not `yarn build` (that is only `next build`).

### DNS

| Name | Type | Content | Proxy |
|------|------|---------|-------|
| `api` | A | origin IP | **Proxied (orange)** — Worker runtime → API |
| `ftp` | A | origin IP | **DNS only (grey)** — FTP clients use `ftp.zijemevzidech.cz` |
| `@` / `www` | A → origin IP | **Proxied (orange)** + Worker routes `zijemevzidech.cz/*` |
| `ftp` | A → origin IP | **DNS only (grey)** |

Keep `@`/`www` orange-clouded. Routes in `wrangler.jsonc` send HTTP to the Worker (origin FTP files are ignored for the website).

SSL/TLS: **Full (Strict)**.

### CI and the API

Workers Builds **cannot** call CF-proxied `api.*` (hairpin). `yarn build:cloudflare` sets `SKIP_API_FETCH=1`, uses `data/static-paths.json` for routes, and the browser/Worker load live CMS data after deploy.

A **git pre-commit** hook (`.githooks/pre-commit`) runs `yarn generate-paths` and stages `data/static-paths.json` when the API is reachable. Enable once after clone:

```bash
yarn install   # runs prepare → git config core.hooksPath .githooks
```

If the API is down, the hook warns and still allows the commit. New CMS slugs also work without that file (`dynamicParams`). Listing pages always refetch the API in the browser so CMS deletes/updates show without waiting on `generate-paths`.

### Environment variables

`wrangler.jsonc` already sets `API_BASE` / `NEXT_PUBLIC_*`. For CI, also set Build variables if you override them in the dashboard.
