import GlobalStyle from '../styles/GlobalStyle';
import Layout from '../components/Layout';
import { ApolloProvider } from '@apollo/client';
import client from '../components/apollo-client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('masterToken') && router.pathname !== '/login') {
      router.replace('/login');
    } else if (
      localStorage.getItem('masterToken') &&
      router.pathname === '/login'
    ) {
      router.replace('/');
    } else {
      setShowChild(true);
    }
  }, [router]);

  return (
    <>
      {showChild && (
        <ApolloProvider client={client}>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      )}
    </>
  );
}

export default MyApp;
