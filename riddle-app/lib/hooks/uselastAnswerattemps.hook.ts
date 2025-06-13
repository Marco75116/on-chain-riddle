import { useQuery } from "@apollo/client";
import { GET_LASTANSWER_ATTEMPTS } from "../graphql/queries.graphql";
import { useEffect, useState } from "react";
import { WEBSOCKET_URL } from "../constants/global.constant";
import { AnswerAttempt } from "@/lib/types/global.type";

interface WebSocketMessage {
  type: string;
  data: {
    id: string;
    answer: string;
    correct: boolean;
    created_at: number;
    number_attempt: number | null;
    riddle_id: string | null;
    user_id: string;
  };
  timestamp: string;
}

export function useLastAnswerAttempts(riddleId: string) {
  const [wsAnswerAttempts, setWsAnswerAttempts] = useState<AnswerAttempt[]>([]);
  const { loading, error, data } = useQuery(GET_LASTANSWER_ATTEMPTS, {
    variables: { riddleId },
    skip: !riddleId,
  });

  useEffect(() => {
    if (data?.answerAttempts) {
      setWsAnswerAttempts(data.answerAttempts);
    }
  }, [data?.answerAttempts]);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onmessage = (event) => {
      const message: WebSocketMessage = JSON.parse(event.data);

      if (message.type === "new_attempt") {
        setWsAnswerAttempts((prevAttempts) => {
          const newAttempt: AnswerAttempt = {
            id: message.data.id,
            answer: message.data.answer,
            isCorrect: message.data.correct,
            createdAt: message.data.created_at.toString(),
            userId: message.data.user_id,
            riddleNumber: message.data.number_attempt || undefined,
          };
          const newAttempts = [newAttempt, ...prevAttempts];
          return newAttempts.slice(0, 5);
        });
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return {
    answerAttempts: wsAnswerAttempts,
    loading,
    error,
  };
}
