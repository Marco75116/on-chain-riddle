import { ctxType } from "../../main";
import { GlobalStats } from "../../model";
import { CHAIN_ID } from "../constants/global.contant";

export const initialiazeGlobalStats = async (ctx: ctxType) => {
  const globalStatsId = CHAIN_ID.toString();
  let globalStats = await ctx.store.get(GlobalStats, globalStatsId);

  if (!globalStats) {
    globalStats = new GlobalStats({
      id: globalStatsId,
      totalRiddles: 0,
    });

    await ctx.store.insert(globalStats);
  }
};
