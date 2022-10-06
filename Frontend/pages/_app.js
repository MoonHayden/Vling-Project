import GlobalStyle from '../styles/GlobalStyle';
import Layout from '../components/Layout';
import { ApolloProvider } from '@apollo/client';
import client from '../components/apollo-client';
import Authentication from '../components/authentication';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ApolloProvider client={client}>
        <Authentication>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Authentication>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
