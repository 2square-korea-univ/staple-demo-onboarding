# 배포 노트

이 저장소는 의도적으로 빌드 산출물만 담습니다. 비공개 소스 코드, 개인키, RPC
시크릿, 원본 환경변수 파일을 복사하지 않습니다.

## 릴리스 절차

1. `/Users/shlee/app/projects/staple-app`에서 비공개 앱을 빌드합니다.
2. GitHub Pages base path를 사용합니다.

   ```bash
   npx vite build --base /staple-demo-onboarding/
   cp dist/public/index.html dist/public/404.html
   ```

3. `dist/public/` 내용을 이 저장소의 `site/` 디렉터리로 복사합니다.
4. `site/staple-runtime-config.js`를 현재 데모 RPC와 배포 컨트랙트 주소로
   갱신합니다.
5. `main`에 커밋하고 푸시합니다.
6. GitHub Actions가 `site/`를 Pages에 배포합니다.

## 런타임 설정

현재 앱은 STAPLE 데모 체인을 기본값으로 사용합니다.

- 체인 이름: `STAPLE Public Demo`
- Chain ID: `5745438`
- Native symbol: `ETH`

로컬, 맥미니, VPS 배포 후에는 `site/staple-runtime-config.js`를 수정합니다.
로컬 테스트에서는 loopback proxy를 사용합니다.

```js
window.STAPLE_DEMO_CONFIG = {
  demoRpcUrl: "http://127.0.0.1:9545",
  demoChainId: 5745438
};
```

공개 초대 데모에서는 GitHub Pages가 HTTPS이므로 RPC도 HTTPS여야 합니다.

```js
window.STAPLE_DEMO_CONFIG = {
  demoRpcUrl: "https://rpc.example.com",
  demoChainId: 5745438
};
```

실제 개인키나 비공개 유료 RPC URL은 이 공개 저장소에 커밋하지 않습니다.
