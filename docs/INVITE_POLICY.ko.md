# 초대 정책

VC, 파트너, 프라이빗 cohort 테스트에는 아래 문구와 정책을 사용합니다.

## 포지셔닝

STAPLE Private Demo는 Tenderly에서 실행되는 invite-only, resettable mainnet-mirror 환경입니다. Ethereum state를 fork하고 데모 잔액을 사용합니다. Ethereum mainnet이 아니며 실제 사용자 자산을 이동하지 않습니다.

## 접근 권한

초대자에게 제공 가능:

- onboarding URL
- Public RPC URL
- public explorer URL
- contract addresses
- test scope와 reset policy

초대자에게 제공 금지:

- Admin RPC
- Tenderly access keys
- private keys
- operator faucet commands
- reset controls

## Cohort Reset 문구

이 환경은 보안, 유지보수, 새 cohort 운영을 위해 사전 공지 후 reset될 수 있습니다. Reset 시 balances, transactions, deployed addresses가 변경될 수 있습니다.

## 권장 Cohort Flow

1. 깨끗한 Tenderly Virtual Environment를 만들거나 fork합니다.
2. `staple2`에서 배포합니다.
3. 이 repo에서 manifest를 생성하고 검토합니다.
4. onboarding URL을 공유합니다.
5. 승인된 wallet에 operator-only Admin RPC로 자금을 지급합니다.
6. feedback을 정리하고 다음 cohort 전에 reset합니다.
