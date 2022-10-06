import GlobalStyle from '../styles/GlobalStyle';
import Layout from '../components/Layout';
import { ApolloProvider } from '@apollo/client';
import client from '../components/apollo-client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Authentication from '../components/authentication';

function MyApp({ Component, pageProps }) {
  // const router = useRouter();
  // const [showChild, setShowChild] = useState(false);

  // useEffect(() => {
  //   if (!localStorage.getItem('masterToken') && router.pathname !== '/login') {
  //     router.replace('/login');
  //   } else if (
  //     localStorage.getItem('masterToken') &&
  //     router.pathname === '/login'
  //   ) {
  //     router.replace('/');
  //   } else {
  //     setShowChild(true);
  //   }
  // }, [router]);

  return (
    <>
      <ApolloProvider client={client}>
        {/* <Authentication> */}
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {/* </Authentication> */}
      </ApolloProvider>
    </>
  );
}

export default MyApp;
