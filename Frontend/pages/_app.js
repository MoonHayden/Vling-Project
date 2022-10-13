import GlobalStyle from '../styles/GlobalStyle';
import Layout from '../components/Layout';
import { ApolloProvider } from '@apollo/client';
import client from '../components/apollo-client';
import Authentication from '../components/authentication';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Authentication>
        <ApolloProvider client={client}>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </Authentication>
    </>
  );
}

export default MyApp;
