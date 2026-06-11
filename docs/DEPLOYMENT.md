# Deployment

This app is a static Vite site. The production artifact is `dist/`.

## Local Production Preview

```bash
npm run preview:dist -- --port 4174
```

## Manifest Selection

Set the manifest path at build time:

```bash
VITE_DEFAULT_MANIFEST=/deployments/<cohort>.json npm run build
```

For local testing, generated files can stay ignored:

```bash
npm run manifest:from-staple2 -- \
  --source ../staple2/deployments.env \
  --out public/deployments/<cohort>.generated.json \
  --public-rpc "$TENDERLY_PUBLIC_RPC_URL" \
  --explorer "$TENDERLY_PUBLIC_EXPLORER_URL" \
  --cohort "<cohort>"
```

## GitHub Pages

This repo includes `.github/workflows/deploy-pages.yml`. After pushing the repo to GitHub:

1. Enable GitHub Pages with Source: GitHub Actions.
2. Push to `main`.
3. The workflow builds `dist/` and publishes it.

The Vite base path defaults to `./`, so the same build works from a GitHub Pages project subpath.

## Vercel

Use these project settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_DEFAULT_MANIFEST=/deployments/<cohort>.json`
- Optional environment variable: `VITE_BASE_PATH=/`

## Cloudflare Pages

Use these project settings:

- Build command: `npm run build`
- Build output directory: `dist`
- Environment variable: `VITE_DEFAULT_MANIFEST=/deployments/<cohort>.json`
- Optional environment variable: `VITE_BASE_PATH=/`

## Safety

Deploy only reviewed public manifests. Do not deploy Admin RPC URLs, Tenderly access keys, private keys, or raw faucet controls.
