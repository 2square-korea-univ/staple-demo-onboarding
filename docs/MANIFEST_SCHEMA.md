# Manifest Schema

The frontend reads a JSON manifest from `public/deployments`.

Required top-level keys:

- `meta`
- `network`
- `contracts`
- `testScope`
- `notices`

## `meta`

- `name`: display name
- `cohort`: invite cohort label
- `environment`: usually `Tenderly Virtual Environment`
- `forkBlock`: fork block or `latest-at-creation`
- `forkedAtUtc`: ISO timestamp
- `resetPolicy`: user-facing reset policy
- `operatorContact`: support or operator contact

## `network`

- `name`: wallet network name
- `chainId`: decimal chain ID, expected `5745438`
- `chainIdHex`: hex chain ID, expected `0x57AB1E`
- `currencySymbol`: usually `ETH`
- `publicRpcUrl`: Tenderly Public RPC only
- `explorerUrl`: public explorer URL when enabled

## `contracts`

The frontend groups addresses into:

- `core`
- `adapters`
- `operations`

No private keys, Admin RPC URLs, or access tokens belong in this file.
