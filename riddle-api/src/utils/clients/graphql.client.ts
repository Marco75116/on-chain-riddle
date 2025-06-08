import { GraphQLClient } from "graphql-request";

const GRAPHQL_URL = Bun.env.GRAPHQL_URL;

if (!GRAPHQL_URL) {
  throw new Error("GRAPHQL_URL must be provided in .env file");
}

export const graphqlClient = new GraphQLClient(GRAPHQL_URL);
