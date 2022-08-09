import { ApolloContext } from '../apollo-client';
import '../styles/globals.css';
import { AuthContextProvider } from '../context/AuthContext';
import ProtectedRoute from '../src/components/layout/ProtectedRoute';
import { useRouter } from 'next/router';

const authRequired = '/account';
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      <ApolloContext>
        {router.pathname === authRequired ? (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        ) : (
          <Component {...pageProps} />
        )}
      </ApolloContext>
    </AuthContextProvider>
  );
}

export default MyApp;
