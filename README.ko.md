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

온체인 조회에는 접근 가능한 데모 RPC가 필요합니다. 앱은 React 번들보다 먼저
`site/staple-runtime-config.js`를 읽습니다. 그래서 private 소스 앱을 다시 빌드하지
않고도 RPC URL, chain ID, WalletConnect project ID, 배포 컨트랙트 주소를 바꿀 수
있습니다.

로컬 테스트에서는 이 파일이 `http://127.0.0.1:9545`를 가리켜도 됩니다. VC 또는
초대 데모에서는 `https://rpc.example.com` 같은 HTTPS JSON-RPC proxy를 바라보게
합니다.
