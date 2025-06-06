import { Wallet } from "../model";

export const createWallet = (address: string): Wallet => {
  const wallet = new Wallet({
    id: address,
  });

  return wallet;
};
