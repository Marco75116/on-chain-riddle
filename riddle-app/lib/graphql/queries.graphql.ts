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

export const GET_LASTANSWER_ATTEMPTS = gql`
  query GetLastAnswerAttempts($riddleId: String!) {
    answerAttempts(
      orderBy: createdAt_DESC
      limit: 5
      where: { riddleId_eq: $riddleId }
    ) {
      id
      answer
      correct
      createdAt
      numberAttempt
      riddleId
      userId
    }
  }
`;
