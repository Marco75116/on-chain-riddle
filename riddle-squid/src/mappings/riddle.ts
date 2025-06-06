import { Log } from "@subsquid/evm-processor";
import * as riddleAbi from "../abi/riddle";
import { GlobalStats, Riddle, Wallet } from "../model";
import { ctxType } from "../main";
import { CHAIN_ID } from "../utils/constants/global.contant";
import { createWallet } from "./wallet";

export const handleRiddleSet = async (ctx: ctxType, log: Log) => {
  const { riddle } = riddleAbi.events.RiddleSet.decode(log);

  const globalStats = await ctx.store.get(GlobalStats, CHAIN_ID.toString());
  if (!globalStats) {
    console.log("Global stats not found");
    return;
  }

  globalStats.totalRiddles++;
  await ctx.store.save(globalStats);

  const newRiddle = new Riddle({
    id: globalStats.totalRiddles.toString(),
    riddle,
    createdAt: BigInt(log.block.timestamp),
    totalAttempts: 0,
    numberRiddle: globalStats.totalRiddles,
  });

  await ctx.store.insert(newRiddle);
};

export const handleWinner = async (ctx: ctxType, log: Log) => {
  const { user } = riddleAbi.events.Winner.decode(log);

  const globalStats = await ctx.store.get(GlobalStats, CHAIN_ID.toString());
  if (!globalStats) {
    console.log("Global stats not found");
    return;
  }

  const riddle = await ctx.store.get(
    Riddle,
    globalStats.totalRiddles.toString()
  );
  if (!riddle) {
    console.log("handleWinner Riddle not found");
    return;
  }

  let wallet = await ctx.store.get(Wallet, user);
  if (!wallet) {
    wallet = createWallet(user);
    await ctx.store.insert(wallet);
  }

  riddle.winnerId = user;
  riddle.winAt = BigInt(log.block.timestamp);

  await ctx.store.upsert(riddle);
};
