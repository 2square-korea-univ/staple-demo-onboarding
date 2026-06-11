# STAPLE Demo Onboarding

Private onboarding surface for VC, partner, and invite-only testing on a STAPLE Tenderly Virtual Environment.

Korean version: [README.ko.md](README.ko.md)

This repo intentionally does not deploy contracts. The protocol, Foundry scripts, operator keys, and Tenderly Admin RPC stay in the sibling `staple2` repo. This app consumes a public manifest and exposes only the invitee-safe network data.

## Run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Repo Boundary

Keep in `staple2`:

- Solidity contracts and Foundry tests
- deploy scripts and `cli-agent`
- Tenderly Admin RPC workflows
- deployer keys, faucet mutations, reset controls

Keep here:

- invitee onboarding UI
- Tenderly Public RPC and public explorer links
- contract address manifests
- cohort-specific copy, scope, and reset policy

## Generate a Cohort Manifest

After deploying from `staple2`, convert its `deployments.env` into an invite-safe manifest:

```bash
npm run manifest:from-staple2 -- \
  --source ../staple2/deployments.env \
  --out public/deployments/vc-june.generated.json \
  --public-rpc "$TENDERLY_PUBLIC_RPC_URL" \
  --explorer "$TENDERLY_PUBLIC_EXPLORER_URL" \
  --cohort "vc-june"
```

Then point the app at it:

```bash
VITE_DEFAULT_MANIFEST=/deployments/vc-june.generated.json npm run dev
```

Generated manifests are ignored by git by default. Commit only reviewed public manifests.

## Invitee Safety Rule

Invitees receive the frontend URL, Public RPC, public explorer, and reviewed manifest only. Never share Tenderly Admin RPC, access keys, private keys, raw faucet controls, or reset controls.

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).
