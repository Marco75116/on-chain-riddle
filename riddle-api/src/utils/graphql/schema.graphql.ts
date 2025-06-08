export interface AnswerAttempt {
  id: string;
  answer: string;
  riddleId: string;
  userId?: string;
  correct?: boolean;
  numberAttempt?: number;
  createdAt?: string;
}

export interface Riddle {
  id: string;
  riddle: string;
  answer?: string;
  winAt?: string;
  createdAt: string;
  totalAttempts: number;
  numberRiddle: number;
  winnerId?: string;
  winner?: Wallet;
  answerAttempts?: AnswerAttempt[];
}

export interface Wallet {
  id: string;
  winRiddles?: Riddle[];
  answerAttempts?: AnswerAttempt[];
}

export interface GlobalStats {
  id: string;
  totalRiddles: number;
}

export interface GetAnswerAttemptsResponse {
  answerAttempts: AnswerAttempt[];
}

export interface GetRiddleResponse {
  riddle: Riddle;
}

export interface GetWalletResponse {
  wallet: Wallet;
}

export interface GetRiddlesResponse {
  riddles: Riddle[];
}

export interface GetGlobalStatsResponse {
  globalStats: GlobalStats[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: Error | null;
}
