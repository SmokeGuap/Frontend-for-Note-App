import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Pages from './pages/index';
import GlobalStyle from './components/GlobalStyle';

const uri = process.env.REACT_APP_API_URI;
const cache = new InMemoryCache();
const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
}

export default App;
