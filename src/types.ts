export type ContractGroup = Record<string, string>;

export type DemoManifest = {
  meta: {
    name: string;
    cohort: string;
    environment: string;
    forkBlock: string;
    forkedAtUtc: string;
    resetPolicy: string;
    operatorContact: string;
  };
  network: {
    name: string;
    chainId: number;
    chainIdHex: string;
    currencySymbol: string;
    publicRpcUrl: string;
    explorerUrl: string;
  };
  contracts: {
    core: ContractGroup;
    adapters: ContractGroup;
    operations: ContractGroup;
  };
  testScope: {
    available: string[];
    operatorOnly: string[];
  };
  notices: string[];
};

export type CopyState = "idle" | "copied" | "failed";
