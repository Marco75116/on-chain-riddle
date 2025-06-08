import { Hash } from "viem";

import { toBytes } from "viem";

import { keccak256 } from "viem";
import { getOpenAIResponse } from "./openia/openia.helper";
import { setRiddle } from "./viem/global.viem";
import { getAnswerAttemptsByAnswer } from "../graphql/queries.graphql";

export function generateAnswerHash(answer: string): Hash {
  return keccak256(toBytes(answer));
}

export const handleSetRiddle = async (maxRetries: number = 3): Promise<any> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const riddle = await getOpenAIResponse();

      if (!riddle) {
        console.warn(`Attempt ${attempt}: No riddle received from OpenAI`);
        continue;
      }

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

        console.log(
          `Attempt ${attempt}: Riddle: "${riddleText}", Answer: "${answer}"`
        );

        const isUnique = await isAnswerUnique(answer);

        if (!isUnique) {
          console.warn(
            `Attempt ${attempt}: Answer "${answer}" already exists, trying again...`
          );
          continue;
        }

        return await setRiddle(riddleText, answer);
      }

      console.warn(`Attempt ${attempt}: Invalid format received:`, riddle);
    } catch (error) {
      console.error(`Attempt ${attempt}: Error processing riddle:`, error);
    }
  }

  console.error(
    `Failed to generate a unique riddle after ${maxRetries} attempts`
  );
  return null;
};

export const isAnswerUnique = async (answer: string): Promise<boolean> => {
  try {
    const result = await getAnswerAttemptsByAnswer(answer);

    if (!result.success) {
      console.warn("Failed to check answer uniqueness:", result.error?.message);
      return false;
    }

    return result.data?.length === 0;
  } catch (error) {
    console.error("Error checking answer uniqueness:", error);
    return false;
  }
};
