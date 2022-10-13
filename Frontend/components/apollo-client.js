import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://www2.wecode.buzzntrend.com:4000/graphql',
  // uri: 'http://172.17.37.41:4000/graphql',
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default client;
