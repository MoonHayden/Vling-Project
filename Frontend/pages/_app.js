import GlobalStyle from '../styles/GlobalStyle';
import variables from '../styles/variables';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
