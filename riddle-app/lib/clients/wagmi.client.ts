import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [sepolia],
  connectors: [],
  transports: {
    [sepolia.id]: http(),
  },
});
