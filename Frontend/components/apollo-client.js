import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://192.168.0.217:4000/graphql',
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default client;
