import { ApolloClient, InMemoryCache } from '@apollo/client';

const sehanClient = new ApolloClient({
  uri: 'http://192.168.0.221:4000/bzznbyd',
  cache: new InMemoryCache(),
});

export default sehanClient;
