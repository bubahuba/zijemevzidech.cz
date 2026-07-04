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
yarn build
```

## Cloudflare

Preview locally in the Workers runtime:

```bash
yarn preview
```

Deploy to Cloudflare:

```bash
yarn deploy
```

For Cloudflare Pages/Workers CI, set:

- **Build command:** `yarn build`
- **Deploy command:** `yarn deploy`

Optional environment variable:

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — Google Maps API key (falls back to the existing key)
