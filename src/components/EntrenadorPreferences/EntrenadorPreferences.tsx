import React, { useId } from 'react';
import TypeButton from '@components/TypeButton/TypeButton.tsx';
import PokemonSummaryView from '@components/PokemonSummaryView/PokemonSummaryView.tsx';
import ShowTrainerTeam from '@components/ShowTrainerTeam/ShowTrainerTeam.tsx';
import { MdOutlineCatchingPokemon } from 'react-icons/md';
import styles from '@components/EntrenadorPreferences/EntrenadorPreferences.module.css';

import { Types } from '@data/types';
//import { moreTeams } from '@data/teams.test';
import { ShortViewPokemon } from '@models/pokemon';
import { PokemonTeam } from '@models/pokemonTeam';

const garchomp: ShortViewPokemon = {
  name: 'garchomp',
  types: ['dragon', 'ground'],
  sprites: {
    icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/445.png',
    normal:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/445.png',
    shiny:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/445.png',
  },
};

const EntrenadorPreferences = (): React.JSX.Element => {
  const teamId: string = useId();

  const trainerTeams: React.JSX.Element[] = moreTeams.map(
    (team: PokemonTeam, index: number): React.JSX.Element => (
      <ShowTrainerTeam
        key={`${teamId}-team-${index}`}
        teamName={team.teamName}
        pokemonTeam={team.pokemonTeam}
      />
    ),
  );

  return (
    <article className={`${styles.detailsSection}`}>
      <section className={`${styles.preferencesSection}`}>
        <h3 className={`${styles.title}`}>Preferencias</h3>
        <section className={`${styles.preferences}`}>
          <article className={`${styles.preferenceItem}`}>
            <h5 className={`${styles.subtitle}`}>Tipo preferido</h5>
            <div className={`${styles.wrapper}`}>
              <TypeButton name={Types[2]!.name} logo={Types[2]!.logo} />
            </div>
          </article>

          <article className={`${styles.preferenceItem}`}>
            <h5 className={`${styles.subtitle}`}>Pokemon favorito</h5>
            <div className={`${styles.wrapper}`}>
              <PokemonSummaryView
                name={garchomp.name}
                types={garchomp.types}
                sprites={garchomp.sprites}
                isShiny={false}
              />
            </div>
          </article>

          <article className={`${styles.preferenceItem}`}>
            <h5 className={`${styles.subtitle}`}>Region preferida</h5>
          </article>
        </section>
      </section>

      <section className={`${styles.teamsSection}`}>
        <section className={`${styles.teamsHeader}`}>
          <h3 className={`${styles.title}`}>Equipos Pokémon</h3>

          <a
            href=""
            className={`${styles.addTeamButton}`}
            title={`Agregar equipo`}
          >
            <span className={`${styles.textWrapper}`}>Agregar equipo</span>
            <MdOutlineCatchingPokemon className={`${styles.icon}`} />
          </a>
        </section>

        <section className={`${styles.teamsContainer}`}>
          {trainerTeams}
        </section>
      </section>
    </article>
  );
};

export default EntrenadorPreferences;
