import { useQuery } from "@apollo/client";
import { GET_RIDDLES } from "../graphql/queries.graphql";
import { useEffect } from "react";
import { WEBSOCKET_URL } from "../constants/global.constant";

export function useRiddles() {
  const { loading, error, data, refetch } = useQuery(GET_RIDDLES);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onmessage = (event) => {
      const message = event.data;
      if (message === "New riddle available!") {
        refetch();
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [refetch]);

  return {
    riddles: data?.riddles || [],
    loading,
    error,
  };
}
