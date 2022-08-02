import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Header from './Components/Header';
import CollectionList from './Components/Collection/CollectionList';
import AnimeList from './Components/Anime/AnimeList';
import AnimeDetail from './Components/Anime/AnimeDetail';
import CollectionDetail from './Components/Collection/CollectionDetail';
import { AnimeListContext } from './context/Context';
import { useMemo, useState } from 'react';

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache(),
});

function App() {
  
  const [dataContext, setDataContext] = useState(null);

  const value = useMemo(() => ({ dataContext, setDataContext }), [dataContext, setDataContext]);
  return (
    <Router>
      <AnimeListContext.Provider value={value}>
        <ApolloProvider client={client}>
          <Header />
            <Routes>
                <Route path="/" element={<AnimeList />} />
                <Route path="/detail/:animeId" element={<AnimeDetail />} />
                <Route path="/collection" element={<CollectionList />} />
                <Route path="/collection/detail/:collectionId" element={<CollectionDetail />} />
                {/* <Route path='/about' component={About} /> */}
            </Routes>
        </ApolloProvider>
      </AnimeListContext.Provider>
    </Router>
  );
}

export default App;
