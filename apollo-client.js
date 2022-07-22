import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
  }),
});

export default client;
export const ApolloContext = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
