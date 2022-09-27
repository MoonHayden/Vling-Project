import { ApolloClient, InMemoryCache } from '@apollo/client';

const sehanClient = new ApolloClient({
  uri: 'http://172.17.36.234:4000/bzznbyd',
  cache: new InMemoryCache(),
});

export default sehanClient;
