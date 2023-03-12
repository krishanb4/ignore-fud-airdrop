import { Chain } from "@wagmi/core";

export const coredao = {
  id: 1116,
  name: "Core DAO",
  network: "coredao",
  nativeCurrency: {
    decimals: 18,
    name: "Core DAO",
    symbol: "CORE",
  },
  rpcUrls: {
    public: { http: ["https://rpc.coredao.org"] },
    default: { http: ["https://rpc.coredao.org"] },
  },
  blockExplorers: {
    etherscan: { name: "CoredaoScan", url: "https://scan.coredao.org" },
    default: { name: "CoredaoScan", url: "https://scan.coredao.org" },
  },
  contracts: {
    // multicall3: {
    //   address: "0xca11bde05977b3631167028862be2a173976ca11",
    //   blockCreated: 11_907_934,
    // },
  },
} as const satisfies Chain;
