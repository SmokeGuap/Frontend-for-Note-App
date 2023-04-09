import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  gql,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

import Pages from './pages/index';
import GlobalStyle from './components/GlobalStyle';

const uri = process.env.REACT_APP_API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true,
});

const data = {
  isLoggedIn: !!localStorage.getItem('token'),
};
const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;
cache.writeQuery({
  query: IS_LOGGED_IN,
  data,
});
client.onResetStore(() =>
  cache.writeQuery({
    query: IS_LOGGED_IN,
    data,
  })
);

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
}

export default App;
