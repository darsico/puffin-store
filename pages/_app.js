import { ApolloContext } from '../apollo-client';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloContext>
      <Component {...pageProps} />;
    </ApolloContext>
  );
}

export default MyApp;
