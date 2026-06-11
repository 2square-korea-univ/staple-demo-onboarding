# STAPLE 데모 온보딩

VC, 파트너, 프라이빗 초대 테스트를 위한 STAPLE Tenderly Virtual Environment 온보딩 화면입니다.

이 repo는 컨트랙트를 배포하지 않습니다. 프로토콜, Foundry 스크립트, 운영자 키, Tenderly Admin RPC는 sibling repo인 `staple2`에 둡니다. 이 앱은 공개 가능한 manifest만 읽고 초대자에게 안전한 네트워크 정보만 보여줍니다.

## 실행

```bash
npm install
npm run dev
```

Vite가 출력하는 로컬 URL을 브라우저에서 엽니다.

## Repo 경계

`staple2`에 유지:

- Solidity contracts와 Foundry tests
- deploy scripts와 `cli-agent`
- Tenderly Admin RPC workflows
- deployer keys, faucet mutations, reset controls

이 repo에 유지:

- 초대자 온보딩 UI
- Tenderly Public RPC와 public explorer links
- contract address manifests
- cohort별 문구, scope, reset policy

## Cohort Manifest 생성

`staple2`에서 배포한 뒤 `deployments.env`를 invite-safe manifest로 변환합니다.

```bash
npm run manifest:from-staple2 -- \
  --source ../staple2/deployments.env \
  --out public/deployments/vc-june.generated.json \
  --public-rpc "$TENDERLY_PUBLIC_RPC_URL" \
  --explorer "$TENDERLY_PUBLIC_EXPLORER_URL" \
  --cohort "vc-june"
```

앱이 해당 manifest를 읽게 하려면:

```bash
VITE_DEFAULT_MANIFEST=/deployments/vc-june.generated.json npm run dev
```

생성된 manifest는 기본적으로 gitignore 됩니다. 공개해도 되는지 검토한 manifest만 commit하세요.

## 초대자 안전 규칙

초대자에게는 frontend URL, Public RPC, public explorer, 검토된 manifest만 제공합니다. Tenderly Admin RPC, access key, private key, raw faucet controls, reset controls는 절대 공유하지 않습니다.

## 배포

배포 절차는 [docs/DEPLOYMENT.ko.md](docs/DEPLOYMENT.ko.md)를 따릅니다.
