import { EvmBatchProcessor } from "@subsquid/evm-processor";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as riddleAbi from "./abi/riddle";

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

processor.run(db, async (ctx) => {
  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      if (log.address === RIDDLE_CONTRACT_ADDRESS) {
        switch (log.topics[0]) {
          case riddleAbi.events.AnswerAttempt.topic:
            break;
          case riddleAbi.events.RiddleSet.topic:
            break;
          case riddleAbi.events.Winner.topic:
            break;
          default:
            break;
        }
      }
    }
  }
});
