# Invite Policy

Use this wording for VC, partner, and private cohort testing.

## Positioning

STAPLE Private Demo is an invite-only, resettable mainnet-mirror environment running on Tenderly. It uses forked Ethereum state and demo balances. It is not Ethereum mainnet and does not move real user assets.

## Access

Invitees may receive:

- onboarding URL
- Public RPC URL
- public explorer URL
- contract addresses
- test scope and reset policy

Invitees must not receive:

- Admin RPC
- Tenderly access keys
- private keys
- operator faucet commands
- reset controls

## Cohort Reset Language

This environment may be reset after notice for security, maintenance, or a new cohort. When reset, balances, transactions, and deployed addresses may change.

## Recommended Cohort Flow

1. Create or fork a clean Tenderly Virtual Environment.
2. Deploy from `staple2`.
3. Generate and review the manifest in this repo.
4. Share the onboarding URL.
5. Fund approved wallets through operator-only Admin RPC.
6. Archive feedback and reset before the next cohort.
