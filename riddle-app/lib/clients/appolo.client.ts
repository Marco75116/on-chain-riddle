import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { from } from "@apollo/client";

const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL;

if (!graphqlUrl) {
  throw new Error(
    "NEXT_PUBLIC_GRAPHQL_URL environment variable is not defined"
  );
}

const httpLink = createHttpLink({
  uri: graphqlUrl,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
  },
});

export default client;
