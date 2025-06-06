import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

const botPrivateKey = process.env.BOT_PRIVATE_KEY as `0x${string}`;

if (!botPrivateKey) {
  throw new Error("BOT_PRIVATE_KEY environment variable is required");
}

const account = privateKeyToAccount(botPrivateKey);

export const botViemClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http(),
});
