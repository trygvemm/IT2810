import { Routes, Route, HashRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  makeVar,
  gql,
} from "@apollo/client";
import BookFilters from "./components/types/BookFilters";

import Home from "./pages/home";
import Book from "./pages/Book";
import { useState } from "react";

export const GET_REFETCH = gql`
  query Query {
    refetchFunction @client
  }
`;
export const GET_HASMORE = gql`
  query Query {
    hasMoreFunction @client
  }
`;
export const GET_CURRENT_FILTERS = gql`
  query Query {
    currentFiltersFunction @client
  }
`;

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        books: {
          keyArgs: false,
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
        refetchFunction: {
          read() {
            return refetchVar();
          },
        },
        hasMoreFunction: {
          read() {
            return hasMoreVar();
          },
        },
        currentFiltersFunction: {
          read() {
            return currentFiltersVar;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://it2810-57.idi.ntnu.no:4001/",
  cache: cache,
});

export const refetchVar = makeVar<any>(null);
export const hasMoreVar = makeVar<any>(null);
export const currentFiltersVar = makeVar<BookFilters>({
  title: undefined,
  author: undefined,
  language: undefined,
  minYear: undefined,
  maxYear: undefined,
});

function App() {
  const [bookID, setBookID] = useState<string | null>(null);
  return (
    <ApolloProvider client={client}>
      <HashRouter basename="">
        <Routes>
          <Route path="/" element={<Home idHook={setBookID} />} />
          <Route path="/Book" element={<Book id={bookID} />} />
        </Routes>
      </HashRouter>
    </ApolloProvider>
  );
}

export default App;
