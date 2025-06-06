import { botViemClient, publicClient } from "../../clients/viem.client";
import { RIDDLE_ABI } from "../../constants/abis/riddle.abi";
import { RIDDLE_CONTRACT_ADDRESS } from "../../constants/addresses/global.addresses";
import { generateAnswerHash } from "../global.helper";

export const setRiddle = async (riddleText: string, answer: string) => {
  try {
    const answerHash = generateAnswerHash(answer.toLowerCase());

    const { request } = await publicClient.simulateContract({
      address: RIDDLE_CONTRACT_ADDRESS,
      abi: RIDDLE_ABI,
      functionName: "setRiddle",
      args: [riddleText, answerHash],
      account: botViemClient.account,
    });

    const tx = await botViemClient.writeContract(request);

    console.log(`Riddle set transaction submitted: ${tx}`);

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: tx,
    });

    console.log(`Riddle set confirmed in block: ${receipt.blockNumber}`);

    return tx;
  } catch (error) {
    console.error("Error setting riddle:", error);
  }
};
