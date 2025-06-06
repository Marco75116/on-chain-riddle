import { DataHandlerContext, EvmBatchProcessor } from "@subsquid/evm-processor";
import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import * as riddleAbi from "./abi/riddle";
import {
  handleAnswerAttempt,
  handleRiddleSet,
  handleWinner,
} from "./mappings/riddle";
import { initialiazeGlobalStats } from "./utils/entities/globalstats";

const RIDDLE_CONTRACT_ADDRESS = "0x2e70b3109ccd31256e9cf4596eeb1bc23c9b2f3c";

const processor = new EvmBatchProcessor()
  .setGateway("https://v2.archive.subsquid.io/network/ethereum-sepolia")
  .setRpcEndpoint("https://rpc.sepolia.ethpandaops.io")
  .setFinalityConfirmation(75)
  .addLog({
    range: { from: 8_486_215 },
    address: [RIDDLE_CONTRACT_ADDRESS],
    topic0: [
      riddleAbi.events.AnswerAttempt.topic,
      riddleAbi.events.RiddleSet.topic,
      riddleAbi.events.Winner.topic,
    ],
  })
  .setFields({
    log: {
      transactionHash: true,
    },
  });

const db = new TypeormDatabase({ supportHotBlocks: true });

let handleOnce = false;

processor.run(db, async (ctx) => {
  if (!handleOnce) {
    await initialiazeGlobalStats(ctx);
    handleOnce = true;
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
          case riddleAbi.events.Winner.topic:
            await handleWinner(ctx, log);
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
