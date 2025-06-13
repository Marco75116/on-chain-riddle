import { useQuery } from "@apollo/client";
import { GET_LASTANSWER_ATTEMPTS } from "../graphql/queries.graphql";
import { useEffect, useState } from "react";
import { WEBSOCKET_URL } from "../constants/global.constant";

interface AnswerAttempt {
  id: string;
  answer: string;
  correct: boolean;
  created_at: number;
  number_attempt: number | null;
  riddle_id: string | null;
  user_id: string;
}

interface WebSocketMessage {
  type: string;
  data: AnswerAttempt;
  timestamp: string;
}

export function useLastAnswerAttempts(riddleId: string) {
  const [wsAnswerAttempts, setWsAnswerAttempts] = useState<AnswerAttempt[]>([]);
  const { loading, error, data } = useQuery(GET_LASTANSWER_ATTEMPTS, {
    variables: { riddleId },
    skip: !riddleId,
  });

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onmessage = (event) => {
      const message: WebSocketMessage = JSON.parse(event.data);

      if (message.type === "new_attempt") {
        setWsAnswerAttempts((prevAttempts) => {
          const newAttempts = [message.data, ...prevAttempts];
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

  const combinedAttempts =
    wsAnswerAttempts.length > 0 ? wsAnswerAttempts : data?.answerAttempts || [];

  return {
    answerAttempts: combinedAttempts,
    loading,
    error,
  };
}
