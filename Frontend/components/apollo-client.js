import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://www2.wecode.buzzntrend.com:4000/graphql',
  cache: new InMemoryCache(),
  ssrMode: true,
});

export default client;
