import { useQuery } from "@apollo/client";
import { GET_LASTANSWER_ATTEMPTS } from "../graphql/queries.graphql";

export function useLastAnswerAttempts(riddleId: string) {
  const { loading, error, data } = useQuery(GET_LASTANSWER_ATTEMPTS, {
    variables: { riddleId },
    skip: !riddleId,
  });

  return {
    answerAttempts: data?.answerAttempts || [],
    loading,
    error,
  };
}
