import { useQuery } from "@apollo/client";

import { GET_RIDDLES } from "../graphql/queries.graphql";

export function useRiddles() {
  const { loading, error, data } = useQuery(GET_RIDDLES);

  return {
    riddles: data?.riddles || [],
    loading,
    error,
  };
}
