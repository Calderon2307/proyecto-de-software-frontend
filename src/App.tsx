import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Contexts
import {
  SearchLabelContext,
  UpdateSearchLabelContext,
  SearchItemContext,
  UpdateSearchItemContext,
} from '@context/SearchContext';

import {
  SearchLabelContextType,
  SearchItemContextType,
} from './types/types';

// Pages
import Home from '@pages/Home/Home';
import SearchPokemon from '@pages/SearchPokemon/SearchPokemon';
import SearchType from '@pages/SearchType/SearchType';
import SearchRegion from '@pages/SearchRegion/SearchRegion';
import SearchItem from '@pages/SearchItem/SearchItem';
import CompletePokedex from '@pages/CompletePokedex/CompletePokedex';
import CreateTeam from '@pages/CreateTeam/CreateTeam';
import Pokemon from '@pages/Pokemon/Pokemon';
import Item from '@pages/Item/Item';


import ComparePokemon from '@pages/ComparePokemon/ComparePokemon';

const App = (): JSX.Element => {
  const [search, setSearch] = useState<SearchLabelContextType>('');
  const [searchValue, setSearchValue] = useState<SearchItemContextType>('');

  const handleSearchLabel = (label: SearchLabelContextType) => {
    setSearch(label);
  };

  const handleSearchItem = (item: SearchItemContextType) => {
    setSearchValue(item);
  };

  return (
    <>
      <SearchItemContext.Provider value={searchValue}>
        <UpdateSearchItemContext.Provider value={handleSearchItem}>
          <SearchLabelContext.Provider value={search}>
            <UpdateSearchLabelContext.Provider value={handleSearchLabel}>
              <Routes>
                <Route path="/" element={<Home />} />

                {/* Buscar */}
                <Route path="/search-pokemon" element={<SearchPokemon />} />
                <Route path="/search-type" element={<SearchType />} />
                <Route path="/search-region" element={<SearchRegion />} />
                <Route path="/search-item" element={<SearchItem />} />

                {/* Pokedex completa */}
                <Route
                  path="/pokedex/:context/:value"
                  element={<CompletePokedex />}
                />

                {/* Crear equipo */}
                <Route path="/create-team" element={<CreateTeam />} />

                {/* Pokémon individual */}
                <Route
                  path="/pokemon/:pokemonId/:pokemonName"
                  element={<Pokemon />}
                />

                {/* Item individual */}
                <Route path="/items/:itemId/:itemName" element={<Item />} />

                {/* Ruta temporal de pruebas */}
                <Route path="/preview" element={<ComparePokemon />} />
              </Routes>
            </UpdateSearchLabelContext.Provider>
          </SearchLabelContext.Provider>
        </UpdateSearchItemContext.Provider>
      </SearchItemContext.Provider>
    </>
  );
};

export default App;
