# Manifest Schema

Frontend는 `public/deployments` 아래 JSON manifest를 읽습니다.

필수 top-level keys:

- `meta`
- `network`
- `contracts`
- `testScope`
- `notices`

## `meta`

- `name`: 표시 이름
- `cohort`: 초대 cohort label
- `environment`: 보통 `Tenderly Virtual Environment`
- `forkBlock`: fork block 또는 `latest-at-creation`
- `forkedAtUtc`: ISO timestamp
- `resetPolicy`: 사용자에게 보여줄 reset policy
- `operatorContact`: support 또는 operator contact

## `network`

- `name`: wallet network name
- `chainId`: decimal chain ID, expected `5745438`
- `chainIdHex`: hex chain ID, expected `0x57AB1E`
- `currencySymbol`: 보통 `ETH`
- `publicRpcUrl`: Tenderly Public RPC only
- `explorerUrl`: public explorer URL, enabled일 때 사용

## `contracts`

Frontend는 주소를 다음 그룹으로 나눕니다.

- `core`
- `adapters`
- `operations`

이 파일에는 private keys, Admin RPC URLs, access tokens가 들어가면 안 됩니다.
