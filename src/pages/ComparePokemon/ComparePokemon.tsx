import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@components/Header/Header';

import PokemonSummaryView from '@components/PokemonSummaryView/PokemonSummaryView';
import SelectPokemonBtn from '@components/SelectPokemonBtn/SelectPokemonBtn';

import { fetchPokemonInfo } from '@services/PokemonServices/pokemonSummaryService';
import { fetchPokemonSpecie } from '@services/PokemonServices/pokemonMainDetailsService';

import { Pokemon } from '@models/pokemon';
import { capitalizeText } from '@utils/formatText';

import faviconIcon from '@assets/icons/Favicon.png';
import { MdClose } from 'react-icons/md';

import style from '@pages/ComparePokemon/ComparePokemon.module.css';

const ComparePokemon = () => {
  const [comparedPokemons, setComparedPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddPokemon = async () => {
    //add search bar component to search for a pokemon to add
    const name = window.prompt('Enter the Pokémon name to compare:');
    if (!name) return;

    try {
      setLoading(true);

      const info = await fetchPokemonInfo(name.toLowerCase());
      const specie = await fetchPokemonSpecie(info.pokemonId);

      const fullPokemon: Pokemon = {
        ...info,
        ...specie,
      };

      setComparedPokemons((prev) => [...prev, fullPokemon]);
    } catch (err) {
      alert('Error fetching Pokémon');
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePokemon = (id: number) => {
    setComparedPokemons((prev) => prev.filter((pkm) => pkm.pokemonId !== id));
  };

  const getStatTotal = (pokemon: Pokemon) =>
    pokemon.stats.reduce((acc, s) => acc + s.baseStat, 0);

  return (
    <>
      <Helmet>
        <title>Compare Pokémon | Pokédex</title>
        <link rel="shortcut icon" href={faviconIcon} type="image/x-icon" />
      </Helmet>

 
      <Header mode="complete" />


      <div className={style.wrapperBody}>
        <header className={style.headerRow}>
          <h2 className={style.title}>Compare Pokémon</h2>

          <div className={style.actionsContainer}>
            <button className={style.historyButton} type="button">
              <span className={style.historyText}>History</span>
              <span className={style.historyIcon}>+</span>
            </button>
            <button className={style.shinyButton} type="button">
              Show Shiny versions
            </button>
          </div>
        </header>

        <section className={style.columnsWrapper}>
          {comparedPokemons.map((pokemon) => {
            const total = getStatTotal(pokemon);

            return (
              <article key={pokemon.pokemonId} className={style.pokemonColumn}>
                {/* Botón de eliminar con React Icons */}
                <button
                  className={style.closeBtn}
                  onClick={() => handleRemovePokemon(pokemon.pokemonId)}
                  type="button"
                >
                  <MdClose className={style.closeIcon} />
                </button>

                {/* Parte superior: sprite, nombre, tipos */}
                <PokemonSummaryView
                  sprites={pokemon.sprites}
                  name={pokemon.name}
                  types={pokemon.types}
                  isShiny={false}
                  size="medium"
                />

                {/* Total Stats */}
                <div className={style.totalStatsBox}>
                  <p className={style.totalNumber}>{total}</p>
                  <p className={style.totalLabel}>Total Stats</p>
                </div>

                {/* Stats individuales */}
                <ul className={style.statsList}>
                  {pokemon.stats.map((stat) => (
                    <li key={stat.statName} className={style.statRow}>
                      <span>{capitalizeText(stat.statName)}</span>
                      <span className={style.statValue}>{stat.baseStat}</span>
                    </li>
                  ))}
                </ul>

                {/* Abilities (hidden en rojo) */}
                <h3 className={style.abilitiesTitle}>Abilities</h3>
                <ul className={style.abilitiesList}>
                  {pokemon.abilities.map((ab) => (
                    <li
                      key={ab.name}
                      className={`${style.ability} ${
                        ab.isHidden ? style.hiddenAbility : ''
                      }`}
                    >
                      {capitalizeText(ab.name)}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}

          {/* Columna para agregar Pokémon */}
          <article className={style.addColumn}>
            <SelectPokemonBtn onClick={handleAddPokemon} />
          </article>
        </section>
      </div>
    </>
  );
};

export default ComparePokemon;
