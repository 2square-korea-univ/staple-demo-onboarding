import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  Clipboard,
  ExternalLink,
  FileJson,
  KeyRound,
  Network,
  RefreshCcw,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { fallbackManifest, loadManifest } from "./demoManifest";
import type { ContractGroup, CopyState, DemoManifest } from "./types";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    };
  }
}

type ActiveView = "start" | "contracts" | "operator";

const manifestPath =
  import.meta.env.VITE_DEFAULT_MANIFEST || `${import.meta.env.BASE_URL}deployments/staple-private-demo.example.json`;
const assetBase = import.meta.env.BASE_URL;

function shortAddress(value: string) {
  if (!value.startsWith("0x") || value.length < 12) return value;
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

async function copyText(value: string, setState: (state: CopyState) => void) {
  try {
    await navigator.clipboard.writeText(value);
    setState("copied");
    window.setTimeout(() => setState("idle"), 1400);
  } catch {
    setState("failed");
    window.setTimeout(() => setState("idle"), 1800);
  }
}

function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const icon = state === "copied" ? <Check size={16} /> : <Clipboard size={16} />;

  return (
    <button className={`icon-button ${state}`} onClick={() => copyText(value, setState)} type="button">
      {icon}
      <span>{state === "copied" ? "Copied" : state === "failed" ? "Failed" : label}</span>
    </button>
  );
}

function StatusPill({ tone, children }: { tone: "green" | "amber" | "blue"; children: React.ReactNode }) {
  return <span className={`status-pill ${tone}`}>{children}</span>;
}

function ContractRows({ title, rows }: { title: string; rows: ContractGroup }) {
  return (
    <section className="contract-section" aria-labelledby={`${title}-title`}>
      <div className="section-heading">
        <h2 id={`${title}-title`}>{title}</h2>
        <span>{Object.keys(rows).length} addresses</span>
      </div>
      <div className="address-list">
        {Object.entries(rows).map(([name, address]) => (
          <article className="address-row" key={name}>
            <div>
              <strong>{name}</strong>
              <code>{shortAddress(address)}</code>
            </div>
            <CopyButton value={address} />
          </article>
        ))}
      </div>
    </section>
  );
}

function AddNetworkButton({ manifest }: { manifest: DemoManifest }) {
  const [label, setLabel] = useState("Add network");

  async function addNetwork() {
    if (!window.ethereum) {
      setLabel("No wallet found");
      window.setTimeout(() => setLabel("Add network"), 1800);
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: manifest.network.chainIdHex,
            chainName: manifest.network.name,
            nativeCurrency: {
              name: manifest.network.currencySymbol,
              symbol: manifest.network.currencySymbol,
              decimals: 18,
            },
            rpcUrls: [manifest.network.publicRpcUrl],
            blockExplorerUrls: manifest.network.explorerUrl ? [manifest.network.explorerUrl] : [],
          },
        ],
      });
      setLabel("Added");
      window.setTimeout(() => setLabel("Add network"), 1600);
    } catch {
      setLabel("Wallet rejected");
      window.setTimeout(() => setLabel("Add network"), 1800);
    }
  }

  return (
    <button className="primary-button" onClick={addNetwork} type="button">
      <Wallet size={17} />
      <span>{label}</span>
    </button>
  );
}

function StartView({ manifest }: { manifest: DemoManifest }) {
  return (
    <div className="content-grid">
      <section className="network-panel">
        <div className="panel-title-row">
          <div>
            <p className="eyebrow">Invite console</p>
            <h1>{manifest.meta.name}</h1>
          </div>
          <StatusPill tone="green">Public RPC only</StatusPill>
        </div>

        <div className="network-metrics">
          <div>
            <span>Chain ID</span>
            <strong>{manifest.network.chainId}</strong>
            <small>{manifest.network.chainIdHex}</small>
          </div>
          <div>
            <span>Fork block</span>
            <strong>{manifest.meta.forkBlock}</strong>
            <small>{manifest.meta.forkedAtUtc}</small>
          </div>
          <div>
            <span>Cohort</span>
            <strong>{manifest.meta.cohort}</strong>
            <small>{manifest.meta.environment}</small>
          </div>
        </div>

        <div className="rpc-strip">
          <div>
            <span>Public RPC</span>
            <code>{manifest.network.publicRpcUrl}</code>
          </div>
          <CopyButton value={manifest.network.publicRpcUrl} label="Copy RPC" />
        </div>

        <div className="button-row">
          <AddNetworkButton manifest={manifest} />
          <a className="secondary-button" href={manifest.network.explorerUrl} rel="noreferrer" target="_blank">
            <ExternalLink size={17} />
            <span>Explorer</span>
          </a>
          <CopyButton value={JSON.stringify(manifest, null, 2)} label="Copy manifest" />
        </div>
      </section>

      <aside className="briefing-panel">
        <img alt="STAPLE architecture flow" src={`${assetBase}assets/staple-architecture.svg`} />
        <div className="briefing-copy">
          <h2>Mainnet-mirror, resettable, invite-only.</h2>
          <p>{manifest.meta.resetPolicy}</p>
        </div>
      </aside>

      <section className="scope-panel">
        <div className="section-heading">
          <h2>Test Scope</h2>
          <StatusPill tone="blue">Cohort gated</StatusPill>
        </div>
        <div className="scope-columns">
          <div>
            <h3>Available to invitees</h3>
            <ul>
              {manifest.testScope.available.map((item) => (
                <li key={item}>
                  <Check size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Operator only</h3>
            <ul>
              {manifest.testScope.operatorOnly.map((item) => (
                <li key={item}>
                  <KeyRound size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="notice-panel">
        <div className="section-heading">
          <h2>Disclosures</h2>
          <StatusPill tone="amber">Not mainnet</StatusPill>
        </div>
        <div className="notice-list">
          {manifest.notices.map((notice) => (
            <p key={notice}>
              <AlertTriangle size={16} />
              <span>{notice}</span>
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}

function ContractsView({ manifest }: { manifest: DemoManifest }) {
  return (
    <div className="contracts-layout">
      <ContractRows rows={manifest.contracts.core} title="Core" />
      <ContractRows rows={manifest.contracts.adapters} title="Adapters" />
      <ContractRows rows={manifest.contracts.operations} title="Operations" />
    </div>
  );
}

function OperatorView({ manifest }: { manifest: DemoManifest }) {
  const networkConfig = useMemo(
    () =>
      JSON.stringify(
        {
          chainId: manifest.network.chainIdHex,
          chainName: manifest.network.name,
          rpcUrls: [manifest.network.publicRpcUrl],
          blockExplorerUrls: [manifest.network.explorerUrl],
          nativeCurrency: { name: "Ether", symbol: manifest.network.currencySymbol, decimals: 18 },
        },
        null,
        2,
      ),
    [manifest],
  );

  return (
    <div className="operator-layout">
      <section className="operator-panel">
        <div className="section-heading">
          <h2>Manifest Source</h2>
          <FileJson size={18} />
        </div>
        <p>
          This app reads <code>{manifestPath}</code>. Generate a cohort manifest from the protocol repo, review it,
          then publish it under <code>public/deployments</code>.
        </p>
        <pre>{`npm run manifest:from-staple2 -- \\
  --source ../staple2/deployments.env \\
  --out public/deployments/vc-june.generated.json \\
  --public-rpc "$TENDERLY_PUBLIC_RPC_URL" \\
  --explorer "$TENDERLY_PUBLIC_EXPLORER_URL"`}</pre>
      </section>

      <section className="operator-panel">
        <div className="section-heading">
          <h2>Wallet Config</h2>
          <Network size={18} />
        </div>
        <pre>{networkConfig}</pre>
        <CopyButton value={networkConfig} label="Copy config" />
      </section>

      <section className="operator-panel wide">
        <div className="section-heading">
          <h2>Access Boundary</h2>
          <ShieldCheck size={18} />
        </div>
        <div className="boundary-grid">
          <div>
            <strong>Share</strong>
            <span>Frontend URL, Public RPC, public explorer, cohort manifest.</span>
          </div>
          <div>
            <strong>Keep private</strong>
            <span>Admin RPC, Tenderly access key, deployer key, faucet mutations, reset controls.</span>
          </div>
          <div>
            <strong>Reset</strong>
            <span>Fork a fresh environment, deploy again from staple2, publish a new manifest.</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [manifest, setManifest] = useState<DemoManifest>(fallbackManifest);
  const [activeView, setActiveView] = useState<ActiveView>("start");

  useEffect(() => {
    loadManifest().then(setManifest);
  }, []);

  return (
    <main>
      <nav className="topbar" aria-label="Primary">
        <div className="brand">
          <span className="brand-mark">S</span>
          <div>
            <strong>STAPLE</strong>
            <small>Private demo onboarding</small>
          </div>
        </div>
        <div className="tab-list" role="tablist">
          <button
            aria-selected={activeView === "start"}
            className={activeView === "start" ? "active" : ""}
            onClick={() => setActiveView("start")}
            role="tab"
            type="button"
          >
            <Wallet size={16} />
            <span>Start</span>
          </button>
          <button
            aria-selected={activeView === "contracts"}
            className={activeView === "contracts" ? "active" : ""}
            onClick={() => setActiveView("contracts")}
            role="tab"
            type="button"
          >
            <ShieldCheck size={16} />
            <span>Contracts</span>
          </button>
          <button
            aria-selected={activeView === "operator"}
            className={activeView === "operator" ? "active" : ""}
            onClick={() => setActiveView("operator")}
            role="tab"
            type="button"
          >
            <RefreshCcw size={16} />
            <span>Operator</span>
          </button>
        </div>
      </nav>

      {activeView === "start" && <StartView manifest={manifest} />}
      {activeView === "contracts" && <ContractsView manifest={manifest} />}
      {activeView === "operator" && <OperatorView manifest={manifest} />}
    </main>
  );
}
