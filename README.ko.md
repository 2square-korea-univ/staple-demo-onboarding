# STAPLE 공개 프론트엔드

이 저장소는 STAPLE 앱의 공개 GitHub Pages 빌드를 배포합니다.

실제 서비스 앱의 React 소스는 비공개 저장소에 둡니다.

- `2square-korea-univ/staple-app`

배포되는 정적 파일은 `site/`에 복사되며 아래 주소에서 서비스됩니다.

- https://2square-korea-univ.github.io/staple-demo-onboarding/

## 현재 빌드

- 소스 앱: `staple-app`
- 빌드 명령: `npx vite build --base /staple-demo-onboarding/`
- 복사 원본: `dist/public`
- SPA fallback: `site/404.html`
- 데모 체인 기본값: `STAPLE Public Demo`, chain ID `5745438`

온체인 조회에는 접근 가능한 데모 RPC가 필요합니다. 공개 Tenderly 또는 JSON-RPC
프록시 엔드포인트를 `VITE_DEMO_RPC_URL`로 지정해 소스 앱을 빌드한 뒤, 결과물을
이 저장소로 복사합니다.

