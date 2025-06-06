import { Hash } from "viem";

import { toBytes } from "viem";

import { keccak256 } from "viem";

export function generateAnswerHash(answer: string): Hash {
  return keccak256(toBytes(answer));
}
