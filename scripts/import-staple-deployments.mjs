#!/usr/bin/env node
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const args = new Map();
for (let index = 2; index < process.argv.length; index += 1) {
  const arg = process.argv[index];
  if (arg.startsWith("--")) {
    args.set(arg.slice(2), process.argv[index + 1] || "");
    index += 1;
  }
}

const source = resolve(args.get("source") || "../staple2/deployments.env");
const out = resolve(args.get("out") || "public/deployments/staple-private-demo.generated.json");
const publicRpc = args.get("public-rpc") || process.env.TENDERLY_PUBLIC_RPC_URL || "";
const explorer = args.get("explorer") || process.env.TENDERLY_PUBLIC_EXPLORER_URL || "";
const cohort = args.get("cohort") || process.env.STAPLE_DEMO_COHORT || "private-cohort";
const forkBlock = args.get("fork-block") || process.env.TENDERLY_FORK_BLOCK || "latest-at-creation";
const operatorContact = args.get("operator") || process.env.STAPLE_OPERATOR_CONTACT || "operator@staple.example";

function parseEnv(contents) {
  const values = {};
  for (const line of contents.split(/\r?\n/)) {
    const match = line.match(/^\s*(?:export\s+)?([A-Z0-9_]+)=(.*)\s*$/);
    if (!match) continue;
    const [, key, raw] = match;
    values[key] = raw.replace(/^["']|["']$/g, "");
  }
  return values;
}

function pick(values, keys) {
  return Object.fromEntries(keys.map((key) => [key, values[key] || ""]));
}

const contents = await readFile(source, "utf8");
const values = parseEnv(contents);

const manifest = {
  meta: {
    name: "STAPLE Private Mainnet-Mirror Demo",
    cohort,
    environment: "Tenderly Virtual Environment",
    forkBlock,
    forkedAtUtc: new Date().toISOString(),
    resetPolicy: "Resettable after notice for security, maintenance, or a new cohort.",
    operatorContact,
  },
  network: {
    name: "STAPLE Private Demo",
    chainId: 5745438,
    chainIdHex: "0x57AB1E",
    currencySymbol: "ETH",
    publicRpcUrl: publicRpc || values.TENDERLY_PUBLIC_RPC_URL || values.PUBLIC_RPC_URL || "",
    explorerUrl: explorer || values.TENDERLY_PUBLIC_EXPLORER_URL || "",
  },
  contracts: {
    core: pick(values, ["STAPLE", "VAULT", "ATM", "ORACLE", "QUEUE", "LENS"]),
    adapters: pick(values, ["AAVE_ADAPTER", "SPARK_ADAPTER", "COMPOUND_V3_ADAPTER"]),
    operations: pick(values, ["SWAP_GUARD", "REBALANCER", "KEEPER_CONTRACT"]),
  },
  testScope: {
    available: [
      "Connect wallet to the private demo network",
      "Inspect deployed addresses and explorer activity",
      "Request ETH, USDC, and USDT test balances from the operator",
      "Deposit through the STAPLE ATM flow when the cohort is funded",
    ],
    operatorOnly: [
      "Tenderly Admin RPC",
      "Balance mutation and token faucet",
      "Governance cutover drills",
      "Pause, reset, and redeploy controls",
    ],
  },
  notices: [
    "This is a forked, resettable Tenderly environment, not Ethereum mainnet.",
    "No real assets are moved and balances may be reset between cohorts.",
    "Use only the Public RPC in wallets and frontends.",
  ],
};

await mkdir(dirname(out), { recursive: true });
await writeFile(out, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`wrote ${out}`);
