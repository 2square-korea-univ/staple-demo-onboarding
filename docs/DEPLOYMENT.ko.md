# 배포

이 앱은 static Vite site입니다. Production artifact는 `dist/`입니다.

## 로컬 Production Preview

```bash
npm run preview:dist -- --port 4174
```

## Manifest 선택

Build 시점에 manifest path를 지정합니다.

```bash
VITE_DEFAULT_MANIFEST=/deployments/<cohort>.json npm run build
```

로컬 테스트에서는 generated manifest를 gitignore 상태로 유지할 수 있습니다.

```bash
npm run manifest:from-staple2 -- \
  --source ../staple2/deployments.env \
  --out public/deployments/<cohort>.generated.json \
  --public-rpc "$TENDERLY_PUBLIC_RPC_URL" \
  --explorer "$TENDERLY_PUBLIC_EXPLORER_URL" \
  --cohort "<cohort>"
```

## GitHub Pages

이 repo에는 `.github/workflows/deploy-pages.yml`이 포함됩니다. Repo를 GitHub에 push한 뒤:

1. GitHub Pages Source를 GitHub Actions로 설정합니다.
2. `main`에 push합니다.
3. Workflow가 `dist/`를 build하고 publish합니다.

Vite base path 기본값은 `./`이므로 GitHub Pages project subpath에서도 같은 build가 동작합니다.

## Vercel

Project settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_DEFAULT_MANIFEST=/deployments/<cohort>.json`
- Optional environment variable: `VITE_BASE_PATH=/`

## Cloudflare Pages

Project settings:

- Build command: `npm run build`
- Build output directory: `dist`
- Environment variable: `VITE_DEFAULT_MANIFEST=/deployments/<cohort>.json`
- Optional environment variable: `VITE_BASE_PATH=/`

## 안전 규칙

검토된 public manifest만 배포합니다. Admin RPC URL, Tenderly access key, private key, raw faucet control은 배포하지 않습니다.
