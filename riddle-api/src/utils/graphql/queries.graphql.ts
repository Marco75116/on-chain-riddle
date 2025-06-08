import { gql } from "graphql-request";
import { graphqlClient } from "../clients/graphql.client";
import { GetAnswerAttemptsResponse } from "./schema.graphql";
import { ApiResponse } from "./schema.graphql";
import { AnswerAttempt } from "./schema.graphql";

export const GET_ANSWER_ATTEMPTS = gql`
  query GetAnswerAttempts($answer: String!) {
    answerAttempts(where: { answer_eq: $answer }) {
      id
      answer
      riddleId
      userId
      correct
      numberAttempt
      createdAt
    }
  }
`;

export const getAnswerAttemptsByAnswer = async (
  answerText: string
): Promise<ApiResponse<AnswerAttempt[]>> => {
  try {
    const data = await graphqlClient.request<GetAnswerAttemptsResponse>(
      GET_ANSWER_ATTEMPTS,
      { answer: answerText }
    );
    return { success: true, data: data.answerAttempts, error: null };
  } catch (error) {
    return { success: false, data: null, error: error as Error };
  }
};
