# Tenderly 프라이빗 데모 런북

이 런북은 `../staple2`와 함께 사용합니다. 컨트랙트 배포와 Admin RPC 작업은 모두 `staple2`에서 실행하고, 이 repo는 초대자용 온보딩만 담당합니다.

## 1. Virtual Environment 생성

- Parent network: Ethereum Mainnet
- Chain ID override: `5745438`
- Sync mode: VC 데모 재현성을 위해 static 권장
- Public Explorer: 내부 dry run은 off, VC 검토가 필요할 때만 on
- Contract visibility: 초기 프라이빗 cohort는 `ABI only` 또는 `None` 권장

## 2. staple2에서 배포

```bash
cd ../staple2

export RPC_URL="<Tenderly Admin RPC>"
cast chain-id --rpc-url "$RPC_URL"

ALLOW_NON_MAINNET_CHAIN=true \
ALLOW_UNFINALIZED_GOVERNANCE=true \
PRIVATE_KEY="$PK" \
KEEPER_OPERATOR="<keeper-operator-address>" \
REBALANCER_EXECUTOR="<rebalancer-executor-address>" \
WRITE_DEPLOYMENTS_ENV=true \
forge script script/DeployMainnetFork.s.sol:DeployMainnetFork \
  --fork-url "$RPC_URL" \
  --broadcast \
  --slow \
  -vvvv
```

`DeployMainnetFork`는 Virtual Environment chain ID가 `5745438`일 때만 이 경로를 허용합니다.

## 3. Public Manifest 준비

```bash
cd ../staple-demo-onboarding

npm run manifest:from-staple2 -- \
  --source ../staple2/deployments.env \
  --out public/deployments/<cohort>.generated.json \
  --public-rpc "$TENDERLY_PUBLIC_RPC_URL" \
  --explorer "$TENDERLY_PUBLIC_EXPLORER_URL" \
  --cohort "<cohort-name>" \
  --fork-block "<fork-block>"
```

공유 전에 생성 파일을 검토합니다. Admin RPC URL, private key, access token, operator-only note가 들어가면 안 됩니다.

## 4. 초대자 자금 지급

운영자 shell에서만 Tenderly Admin RPC를 사용합니다.

Native ETH:

```bash
curl -s "$TENDERLY_ADMIN_RPC_URL" \
  -H 'content-type: application/json' \
  --data '{"jsonrpc":"2.0","id":1,"method":"tenderly_setBalance","params":["<invitee-address>","0xDE0B6B3A7640000"]}'
```

USDC 또는 USDT:

```bash
curl -s "$TENDERLY_ADMIN_RPC_URL" \
  -H 'content-type: application/json' \
  --data '{"jsonrpc":"2.0","id":2,"method":"tenderly_addErc20Balance","params":["<token-address>",["<invitee-address>"],"0x12A05F200"]}'
```

UI나 indexer가 ERC-20 `Transfer` log를 필요로 하면 `tenderly_addErc20Balance`를 우선 사용합니다.

## 5. 공유

공유 가능:

- onboarding frontend URL
- Tenderly Public RPC
- public explorer URL
- 검토된 cohort manifest

공유 금지:

- Tenderly Admin RPC
- Tenderly access key
- deployer private key
- faucet mutation commands
- reset 또는 fork controls

## 6. Reset

새 cohort는 새 Virtual Environment를 fork 또는 재생성한 뒤 `staple2`에서 다시 배포하고, manifest를 다시 생성한 다음 `VITE_DEFAULT_MANIFEST`를 갱신합니다.
