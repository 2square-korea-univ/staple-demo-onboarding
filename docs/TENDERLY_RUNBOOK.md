# Tenderly Private Demo Runbook

This runbook pairs with `../staple2`. Run all contract deployment and Admin RPC work from `staple2`; use this repo only for invitee-facing onboarding.

## 1. Create the Virtual Environment

- Parent network: Ethereum Mainnet
- Chain ID override: `5745438`
- Sync mode: static for reproducible VC demos
- Public Explorer: off for private dry runs; on for VC review if needed
- Contract visibility: `ABI only` or `None` for early private cohorts

## 2. Deploy from staple2

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

`DeployMainnetFork` accepts this only when the Virtual Environment chain ID is `5745438`.

## 3. Prepare the Public Manifest

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

Review the generated file before sharing. It must not include Admin RPC URLs, private keys, access tokens, or operator-only notes.

## 4. Fund Invitees

Use Tenderly Admin RPC only from the operator shell.

Native ETH:

```bash
curl -s "$TENDERLY_ADMIN_RPC_URL" \
  -H 'content-type: application/json' \
  --data '{"jsonrpc":"2.0","id":1,"method":"tenderly_setBalance","params":["<invitee-address>","0xDE0B6B3A7640000"]}'
```

USDC or USDT:

```bash
curl -s "$TENDERLY_ADMIN_RPC_URL" \
  -H 'content-type: application/json' \
  --data '{"jsonrpc":"2.0","id":2,"method":"tenderly_addErc20Balance","params":["<token-address>",["<invitee-address>"],"0x12A05F200"]}'
```

Prefer `tenderly_addErc20Balance` when the UI or indexer needs ERC-20 `Transfer` logs.

## 5. Share

Share only:

- onboarding frontend URL
- Tenderly Public RPC
- public explorer URL
- reviewed cohort manifest

Do not share:

- Tenderly Admin RPC
- Tenderly access key
- deployer private key
- faucet mutation commands
- reset or fork controls

## 6. Reset

For a fresh cohort, fork a new Virtual Environment or recreate it, deploy again from `staple2`, regenerate the manifest, and update `VITE_DEFAULT_MANIFEST`.
