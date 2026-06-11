# Agents Guide

이 repo는 STAPLE 초대 테스트용 onboarding surface입니다.

## 경계

- 컨트랙트 배포, Tenderly Admin RPC, operator key, faucet mutation은 sibling repo인 `../staple2`에서만 처리합니다.
- 이 repo에는 invitee-safe 정보만 둡니다: frontend, Public RPC, public explorer, reviewed manifest, invite/reset copy.
- Admin RPC, access token, private key, raw faucet command가 들어간 파일은 commit하지 않습니다.

## Markdown 규칙

- 영어 또는 혼합 언어 Markdown 파일을 새로 만들거나 수정하면, 같은 변경에 대응하는 한국어 `.ko.md` 파일도 생성/갱신합니다.
- `README.md`는 `README.ko.md`와 함께 유지합니다.
- `docs/*.md`는 가능하면 같은 디렉터리에 `*.ko.md`를 둡니다.

## 검증

- UI나 배포 설정을 바꾸면 `npm run build`를 실행합니다.
- 배포 전에는 `npm run preview:dist -- --port <port>`로 production preview를 확인합니다.
