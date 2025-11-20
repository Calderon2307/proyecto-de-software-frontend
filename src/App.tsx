import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  SearchLabelContext,
  UpdateSearchLabelContext,
  SearchItemContext,
  UpdateSearchItemContext,
} from '@context/SearchContext';
import { SearchLabelContextType, SearchItemContextType } from './types/types';
import Home from '@pages/Home/Home';
import Index from '@pages/Index/Index';
import Auth from '@pages/Auth/Auth';
import SearchPokemon from '@pages/SearchPokemon/SearchPokemon';
import SearchType from '@pages/SearchType/SearchType';
import SearchRegion from '@pages/SearchRegion/SearchRegion';
import SearchItem from '@pages/SearchItem/SearchItem';
import CompletePokedex from '@pages/CompletePokedex/CompletePokedex';
import CreateTeam from '@pages/CreateTeam/CreateTeam';
import Pokemon from '@pages/Pokemon/Pokemon';
import Item from '@pages/Item/Item';
import Item from '@pages/Item/Item';
import SelectionTypeDialog from '@components/SelectionTypeDialog/SelectionTypeDialog.tsx';
import { Types } from '@data/types.ts';
import SelectPokemonDialog from '@components/SelectPokemonDialog/SelectPokemonDialog.tsx';
import Header from '@components/Header/Header.tsx';
import EntrenadorPreferences from '@components/EntrenadorPreferences/EntrenadorPreferences.tsx';


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
                <Route path="/Home" element={<Home />} />
                <Route path="/" element={<Index />} />
                <Route path="/search-pokemon" element={<SearchPokemon />} />
                <Route path="/Auth" element={<Auth />} />
                <Route path="/search-type" element={<SearchType />} />
                <Route path="/search-region" element={<SearchRegion />} />
                <Route path="/search-item" element={<SearchItem />} />
                <Route
                  path="/pokedex/:context/:value"
                  element={<CompletePokedex />}
                />{' '}
                {/* POKEMONES ? */}
                <Route path="/create-team" element={<CreateTeam />} />{' '}
                {/* POKEMON COMPLETO */}
                <Route
                  path="/pokemon/:pokemonId/:pokemonName"
                  element={<Pokemon />}
                />
                <Route path="/items/:itemId/:itemName" element={<Item />} />
                <Route path="/preview" element={<EntrenadorPreferences />} />
              </Routes>
            </UpdateSearchLabelContext.Provider>
          </SearchLabelContext.Provider>
        </UpdateSearchItemContext.Provider>
      </SearchItemContext.Provider>
    </>
  );
};

export default App;
