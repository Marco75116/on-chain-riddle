import { DataHandlerContext, EvmBatchProcessor } from "@subsquid/evm-processor";
import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import * as riddleAbi from "./abi/riddle";
import {
  handleAnswerAttempt,
  handleRiddleSet,
  handleTxAnswerAttempt,
} from "./mappings/riddle";
import { initialiazeGlobalStats } from "./utils/entities/globalstats";

const RIDDLE_CONTRACT_ADDRESS = "0x2e70b3109ccd31256e9cf4596eeb1bc23c9b2f3c";

const RIDDLE_START_BLOCK = 8_486_215;
const processor = new EvmBatchProcessor()
  .setGateway("https://v2.archive.subsquid.io/network/ethereum-sepolia")
  .setRpcEndpoint(process.env.RPC_SEPOLIA_URL)
  .setFinalityConfirmation(75)
  .addLog({
    range: { from: RIDDLE_START_BLOCK },
    address: [RIDDLE_CONTRACT_ADDRESS],
    topic0: [
      riddleAbi.events.AnswerAttempt.topic,
      riddleAbi.events.RiddleSet.topic,
    ],
  })
  .addTransaction({
    to: [RIDDLE_CONTRACT_ADDRESS],
    sighash: [riddleAbi.functions.submitAnswer.sighash],
    range: { from: RIDDLE_START_BLOCK },
  })
  .setFields({
    log: {
      transactionHash: true,
    },
    transaction: {
      input: true,
    },
  });

const db = new TypeormDatabase({ supportHotBlocks: true });

let handleOnce = false;

processor.run(db, async (ctx) => {
  if (!handleOnce) {
    await initialiazeGlobalStats(ctx);
    handleOnce = true;
  }

  for (let c of ctx.blocks) {
    for (let txn of c.transactions) {
      if (txn.to === RIDDLE_CONTRACT_ADDRESS) {
        const inputData = (txn as any).input || "";

        if (!inputData || !inputData.startsWith("0x")) continue;

        const functionSelector = inputData.slice(0, 10);
        switch (functionSelector) {
          case riddleAbi.functions.submitAnswer.sighash:
            await handleTxAnswerAttempt(ctx, txn);
            break;
          default:
            break;
        }
      }
    }
  }
  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      if (log.address === RIDDLE_CONTRACT_ADDRESS) {
        switch (log.topics[0]) {
          case riddleAbi.events.AnswerAttempt.topic:
            await handleAnswerAttempt(ctx, log);
            break;
          case riddleAbi.events.RiddleSet.topic:
            await handleRiddleSet(ctx, log);
            break;
          default:
            break;
        }
      }
    }
  }
});

export type ctxType = DataHandlerContext<
  Store,
  {
    log: {
      transactionHash: true;
    };
  }
>;
