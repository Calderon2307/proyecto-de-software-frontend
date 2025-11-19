import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import SearchBar from '@components/SearchBar/SearchBar';
import LoadingView from '@components/LoadingView/LoadingView';
import PokemonSummaryView from '@components/PokemonSummaryView/PokemonSummaryView.tsx';
import { fetchCompletePokemon } from '@services/PokemonServices/pokemonCompletePokedexService.ts';
import { SearchItemContext } from '@context/SearchContext.ts';
import { capitalizeText } from '@utils/formatText.ts';
import { POKEMON_ALL_POKEMON_URL } from '@routes/api.routes.ts';
import { PokemonCard, ShortViewPokemon } from '@models/pokemon';
import closeIconDark from '@assets/icons/closeDark.png';
import style from '@components/SelectPokemonDialog/SelectPokemonDialog.module.css';

type SelectPokemonDialogProps = {
  componentMode: 'team' | 'single';
  idSelected?: number;
  isOpen: boolean;
  teamArr?: (ShortViewPokemon | null)[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setTeamArr?: Dispatch<SetStateAction<(ShortViewPokemon | null)[]>>;
  setFavoritePokemon?: Dispatch<SetStateAction<ShortViewPokemon | null>>;
};

const SelectPokemonDialog = ({
  componentMode,
  idSelected,
  isOpen,
  teamArr,
  setIsOpen,
  setTeamArr,
  setFavoritePokemon,
}: SelectPokemonDialogProps): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMorePokemon, setLoadingMorePokemon] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const pokemonListRef = useRef<HTMLDivElement | null>(null);
  const pokemonSearchName = useContext(SearchItemContext);

  const [pokemonList, setPokemonList] = useState<ShortViewPokemon[]>([
    {
      name: 'POKEMON_NAME',
      sprites: {
        icon: 'ICON_SPRITE',
        normal: 'NORMAL_SPRITE',
        shiny: 'SHINY_SPRITE',
      },
      types: ['POKEMON_TYPE_1', 'POKEMON_TYPE_2'],
    },
  ]);

  const cacheRef = useRef<{ data: ShortViewPokemon[]; lastUrl: string | null }>(
    {
      data: [
        {
          name: 'POKEMON_NAME',
          sprites: {
            icon: 'ICON_SPRITE',
            normal: 'NORMAL_SPRITE',
            shiny: 'SHINY_SPRITE',
          },
          types: ['POKEMON_TYPE_1', 'POKEMON_TYPE_2'],
        },
      ],
      lastUrl: null,
    },
  );

  const filteredSearch = pokemonList.filter((pokemon: ShortViewPokemon) =>
    pokemon.name.includes(pokemonSearchName.toLowerCase()),
  );

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const fetchMorePokemon = async () => {
    if (
      cacheRef.current.lastUrl === null ||
      cacheRef.current.lastUrl === 'THERE_ARE_NO_MORE_POKEMON'
    )
      return;

    setLoadingMorePokemon(true);

    try {
      const data = await fetchCompletePokemon(cacheRef.current.lastUrl);
      const pokeArr: ShortViewPokemon[] = data.pokemonCards.map(
        (pokemon: PokemonCard) => {
          return {
            name: pokemon.name,
            sprites: {
              normal: pokemon.sprites.normal,
              shiny: pokemon.sprites.shiny,
              icon: pokemon.sprites.icon,
            },
            types: pokemon.types,
          };
        },
      );

      cacheRef.current.lastUrl = data.nextUrl ?? 'THERE_ARE_NO_MORE_POKEMON';
      cacheRef.current.data = [...cacheRef.current.data, ...pokeArr];
      setPokemonList([...cacheRef.current.data]);
    } catch (error) {
      alert(error);
    } finally {
      setLoadingMorePokemon(false);
    }
  };

  const handleScroll = () => {
    if (!pokemonListRef.current || loadingMorePokemon) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = pokemonListRef.current;
    if (scrollHeight - (scrollTop + clientHeight) <= 200) {
      fetchMorePokemon();
    }
  };

  const handleSelectPokemon = (pokemonSelected: ShortViewPokemon) => {
    if (componentMode === 'team' && teamArr && setTeamArr) {
      const newTeamArr: (ShortViewPokemon | null)[] = teamArr.map(
        (item: ShortViewPokemon | null, index: number) => {
          if (idSelected === index) return pokemonSelected;
          else return item;
        },
      );

      setTeamArr(newTeamArr);
    } else if (componentMode === 'single' && setFavoritePokemon) {
      setFavoritePokemon(pokemonSelected);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current?.showModal();
    } else {
      setTimeout(() => {
        dialogRef.current?.close();
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCompletePokemon(POKEMON_ALL_POKEMON_URL);
        const pokeArr: ShortViewPokemon[] = data.pokemonCards.map(
          (pokemon: PokemonCard) => {
            return {
              name: pokemon.name,
              sprites: {
                normal: pokemon.sprites.normal,
                shiny: pokemon.sprites.shiny,
                icon: pokemon.sprites.icon,
              },
              types: pokemon.types,
            };
          },
        );

        cacheRef.current.data = pokeArr;
        cacheRef.current.lastUrl = data.nextUrl;
        setPokemonList(cacheRef.current.data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && cacheRef.current.lastUrl === null) fetchAllPokemon();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={`${style.dialog} ${isOpen ? style.openDialog : style.closeDialog}`}
      onClose={handleDialogClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) handleDialogClose();
      }}
    >
      {isLoading ? (
        <LoadingView message={`Loading Pokemons`} />
      ) : (
        <article className={`${style.dialogContent}`}>
          <button
            className={`${style.closeButton}`}
            onClick={handleDialogClose}
          >
            <img
              src={closeIconDark}
              alt="Close Icon"
              className={`${style.closeIcon}`}
            />
          </button>
          <h3 className={`${style.dialogTitle}`}>Select a Pokémon</h3>
          <section className={`${style.mainContent}`}>
            <section className={`${style.searchBarContent}`}>
              <SearchBar showButton={false} />
            </section>
            <section
              ref={pokemonListRef}
              className={`${style.pokemonList}`}
              onScroll={handleScroll}
            >
              {filteredSearch.length > 0 ? (
                filteredSearch.map((pokemon: ShortViewPokemon) => {
                  const formatedName = capitalizeText(pokemon.name);
                  return (
                    <button
                      key={pokemon.name}
                      className={`${style.pokemonButton}`}
                      onClick={() => handleSelectPokemon(pokemon)}
                      title={`Choose ${formatedName} for your team?`}
                    >
                      <PokemonSummaryView
                        name={pokemon.name}
                        sprites={pokemon.sprites}
                        types={pokemon.types}
                        isShiny={false}
                        size="small"
                      />
                    </button>
                  );
                })
              ) : (
                <p className={`${style.emptyPokemonMessage}`}>
                  <span className={`${style.emptyPokemonTitle}`}>
                    NO RESULTS!
                  </span>
                  Try loading up more Pokémon or look for one with its full
                  name!
                </p>
              )}
            </section>
            {loadingMorePokemon ? (
              <p className={`${style.loadingMessage}`}>
                Loading more Pokémon...
              </p>
            ) : (
              ''
            )}
          </section>
        </article>
      )}
    </dialog>
  );
};

export default SelectPokemonDialog;
