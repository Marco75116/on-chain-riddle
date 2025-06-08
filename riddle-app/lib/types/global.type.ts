export interface AnswerAttempt {
  id?: string;
  answer: string;
  isCorrect: boolean;
  createdAt?: string;
  timestamp?: string;
  userId?: string;
  riddleNumber?: number;
}
