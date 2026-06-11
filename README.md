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

On-chain reads require a reachable demo RPC. The app loads
`site/staple-runtime-config.js` before the bundled React app, so the RPC URL,
chain ID, WalletConnect project ID, and deployed contract addresses can be
changed without rebuilding the private source app.

For local testing this file may point at `http://127.0.0.1:9545`. For a VC or
invite demo, point it at an HTTPS JSON-RPC proxy such as
`https://rpc.example.com`.
