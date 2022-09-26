import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://172.17.37.188:4000/graphql',
  //uri: 'http://192.168.0.217:4000/graphql',
  cache: new InMemoryCache(),
});

export default client;
