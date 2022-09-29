import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  // uri: 'http://192.168.0.217:4000/graphql',
  uri: 'http://localhost:4000/graphql',
  ssrMode: true,
  cache: new InMemoryCache(),
});

export default client;
