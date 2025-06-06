import { Log } from "@subsquid/evm-processor";
import * as riddleAbi from "../abi/riddle";
import { AnswerAttempt, GlobalStats, Riddle, Wallet } from "../model";
import { ctxType } from "../main";
import { CHAIN_ID } from "../utils/constants/global.contant";
import { createWallet } from "./wallet";
import { createAnswerAttempt } from "./answerattempt";

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

export const handleAnswerAttempt = async (ctx: ctxType, log: Log) => {
  const { user, correct } = riddleAbi.events.AnswerAttempt.decode(log);

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
    console.log("handleAnswerAttempt handleAnswerAttempt Riddle not found");
    return;
  }

  const answerAttempt = await ctx.store.get(
    AnswerAttempt,
    (log.transaction as any).hash
  );
  if (!answerAttempt) {
    console.log(
      "handleAnswerAttempt AnswerAttempt not found",
      (log.transaction as any).hash
    );
    return;
  }
  if (correct) {
    answerAttempt.correct = true;
    riddle.winnerId = user;
    riddle.winAt = BigInt(log.block.timestamp);
    riddle.answer = answerAttempt.answer;
  }
  answerAttempt.riddleId = riddle.id;
  answerAttempt.numberAttempt = riddle.totalAttempts;
  await ctx.store.upsert(answerAttempt);

  riddle.totalAttempts++;
  await ctx.store.upsert(riddle);
};

export const handleTxAnswerAttempt = async (ctx: ctxType, txn: any) => {
  const { _answer } = riddleAbi.functions.submitAnswer.decode(txn);

  let wallet = await ctx.store.get(Wallet, txn.from);
  if (!wallet) {
    wallet = createWallet(txn.from);
    await ctx.store.insert(wallet);
  }

  const answerAttempt = createAnswerAttempt(
    txn.hash,
    txn.from,
    _answer,
    txn.block.timestamp
  );
  await ctx.store.insert(answerAttempt);
};
