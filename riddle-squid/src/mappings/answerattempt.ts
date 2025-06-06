import { AnswerAttempt } from "../model";

export const createAnswerAttempt = (
  id: string,
  userId: string,
  answer: string,
  timestamp: number
) => {
  return new AnswerAttempt({
    id: id,
    userId: userId,
    answer: answer,
    correct: false,
    createdAt: BigInt(timestamp),
  });
};
