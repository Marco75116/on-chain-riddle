import { gql } from "@apollo/client";

export const GET_RIDDLES = gql`
  query MyQuery {
    riddles(limit: 1, orderBy: numberRiddle_DESC) {
      riddle
      totalAttempts
      winAt
      numberRiddle
      id
      createdAt
      answer
    }
  }
`;
