import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://172.17.37.104:4000/graphql',
  cache: new InMemoryCache(),
});

export default client;
