import { Log } from "@subsquid/evm-processor";
import * as riddleAbi from "../abi/riddle";
import { GlobalStats, Riddle } from "../model";
import { ctxType } from "../main";
import { CHAIN_ID } from "../utils/constants/global.contant";

export const handleRiddleSet = async (ctx: ctxType, log: Log) => {
  const { riddle } = riddleAbi.events.RiddleSet.decode(log);

  const globalStats = await ctx.store.get(GlobalStats, CHAIN_ID.toString());
  if (!globalStats) {
    console.log("Global stats not found");
    return;
  }

  const newRiddle = new Riddle({
    id: globalStats.totalRiddles.toString(),
    riddle,
    createdAt: BigInt(log.block.timestamp),
    totalAttempts: 0,
    numberRiddle: globalStats.totalRiddles,
  });

  await ctx.store.insert(newRiddle);

  globalStats.totalRiddles++;
  await ctx.store.save(globalStats);
};
