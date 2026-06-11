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
4. Update `site/staple-runtime-config.js` with the active demo RPC and deployed
   contract addresses.
5. Commit and push to `main`.
6. GitHub Actions deploys `site/` to Pages.

## Runtime Configuration

The current app defaults to the STAPLE demo chain:

- Chain name: `STAPLE Public Demo`
- Chain ID: `5745438`
- Native symbol: `ETH`

Edit `site/staple-runtime-config.js` after each local, Mac mini, or VPS deploy.
For local testing, use the loopback proxy:

```js
window.STAPLE_DEMO_CONFIG = {
  demoRpcUrl: "http://127.0.0.1:9545",
  demoChainId: 5745438
};
```

For a public invite demo, the page is HTTPS, so the RPC must also be HTTPS:

```js
window.STAPLE_DEMO_CONFIG = {
  demoRpcUrl: "https://rpc.example.com",
  demoChainId: 5745438
};
```

Do not commit real private keys or private paid RPC URLs to this public
repository.
