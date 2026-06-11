# STAPLE Public Frontend

This repository publishes the public GitHub Pages build for the STAPLE app.

The React source of the service app lives in the private repository:

- `2square-korea-univ/staple-app`

The deployed static files are copied into `site/` and served from:

- https://2square-korea-univ.github.io/staple-demo-onboarding/

## Current Build

- Source app: `staple-app`
- Build command: `npx vite build --base /staple-demo-onboarding/`
- Output copied from: `dist/public`
- SPA fallback: `site/404.html`
- Demo chain default: `STAPLE Public Demo`, chain ID `5745438`

On-chain reads require a reachable demo RPC. Build the source app with
`VITE_DEMO_RPC_URL` set to the public Tenderly or JSON-RPC proxy endpoint before
copying the output here.

