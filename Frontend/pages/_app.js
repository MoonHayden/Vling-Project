import GlobalStyle from '../styles/GlobalStyle';
import Layout from '../components/Layout';
import { ApolloProvider } from '@apollo/client';
import client from '../components/apollo-client';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ApolloProvider client={client}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}

export default MyApp;