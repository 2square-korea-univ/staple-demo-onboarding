# Deployment Notes

This repository is intentionally artifact-only. Do not copy private source code,
private keys, RPC secrets, or unredacted environment files into it.

## Release Steps

1. Build the private app from `/Users/shlee/app/projects/staple-app`.
2. Use the GitHub Pages base path:

   ```bash
   npx vite build --base /staple-demo-onboarding/
   cp dist/public/index.html dist/public/404.html
   ```

3. Copy `dist/public/` into this repository's `site/` directory.
4. Commit and push to `main`.
5. GitHub Actions deploys `site/` to Pages.

## Runtime Configuration

The current app defaults to the STAPLE demo chain:

- Chain name: `STAPLE Public Demo`
- Chain ID: `5745438`
- Native symbol: `ETH`

Set these variables in the private source app before building when a public demo
RPC is available:

```bash
VITE_DEMO_RPC_URL=https://rpc.example.invalid
VITE_DEMO_EXPLORER_URL=https://explorer.example.invalid
VITE_WALLETCONNECT_PROJECT_ID=...
```

Do not commit real private keys or private paid RPC URLs to this public
repository.

