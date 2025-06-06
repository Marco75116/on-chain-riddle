import { Hash } from "viem";

import { toBytes } from "viem";

import { keccak256 } from "viem";
import { getOpenAIResponse } from "./openia/openia.helper";
import { setRiddle } from "./viem/global.viem";

export function generateAnswerHash(answer: string): Hash {
  return keccak256(toBytes(answer));
}

export const handleSetRiddle = async (maxRetries: number = 3): Promise<any> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const riddle = await getOpenAIResponse();

      if (!riddle) continue;

      const parsed = JSON.parse(riddle);

      if (
        Array.isArray(parsed) &&
        parsed.length === 2 &&
        typeof parsed[0] === "string" &&
        typeof parsed[1] === "string" &&
        parsed[0].trim() &&
        parsed[1].trim()
      ) {
        const riddleText = parsed[0].trim();
        let answer = parsed[1].trim();

        answer = answer
          .replace(/^["']|["']$/g, "")
          .replace(/^(a|an|the)\s+/i, "")
          .trim()
          .toLowerCase();

        console.log("Riddle:", riddleText, "Answer:", answer);

        return await setRiddle(riddleText, answer);
      }

      console.warn(`Attempt ${attempt}: Invalid format:`, riddle);
    } catch (error) {
      console.warn(`Attempt ${attempt}: Error:`, error);
    }
  }
};
