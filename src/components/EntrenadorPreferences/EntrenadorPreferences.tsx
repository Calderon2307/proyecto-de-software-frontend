import React, { useId } from 'react';
import { Link } from 'react-router-dom';
import TypeButton from '@components/TypeButton/TypeButton.tsx';
import PokemonSummaryView from '@components/PokemonSummaryView/PokemonSummaryView.tsx';
import ShowTrainerTeam from '@components/ShowTrainerTeam/ShowTrainerTeam.tsx';
import RegionCard from '@components/RegionCard/RegionCard.tsx';
import { EntrenadorProfileInfo } from '@models/entreador';
import { PokemonTeam } from '@models/pokemonTeam';
import { getRegionDataByName } from '@utils/regionData.ts';
import { getTypeDataByName } from '@utils/typeData.ts';
import { MdOutlineCatchingPokemon } from 'react-icons/md';
import styles from '@components/EntrenadorPreferences/EntrenadorPreferences.module.css';

type EntrenadorPreferencesProps = {
  tipoFavorito: EntrenadorProfileInfo['tipoPreferido'];
  regionFavorita: EntrenadorProfileInfo['regionPreferida'];
  pokemonFavorito: EntrenadorProfileInfo['pokemonFavorito'];
  equiposPokemon: EntrenadorProfileInfo['equiposPokemon'];
};

const EntrenadorPreferences = ({
  tipoFavorito,
  regionFavorita,
  pokemonFavorito,
  equiposPokemon,
}: EntrenadorPreferencesProps): React.JSX.Element => {
  const teamId: string = useId();

  const favoriteType = getTypeDataByName(tipoFavorito);
  const favoriteRegion = getRegionDataByName(regionFavorita);

  const trainerTeams: React.JSX.Element[] = equiposPokemon.map(
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
              {favoriteType ? (
                <TypeButton name={favoriteType.name} logo={favoriteType.logo} />
              ) : (
                <p className={`${styles.emptyMessage}`}>
                  No has seleccionado tipo favorito
                </p>
              )}
            </div>
          </article>

          <article className={`${styles.preferenceItem}`}>
            <h5 className={`${styles.subtitle}`}>Pokemon favorito</h5>
            <div className={`${styles.wrapper}`}>
              {pokemonFavorito ? (
                <PokemonSummaryView
                  name={pokemonFavorito.name}
                  types={pokemonFavorito.types}
                  sprites={pokemonFavorito.sprites}
                  isShiny={false}
                />
              ) : (
                <p className={`${styles.emptyMessage}`}>
                  No has seleccionado Pokémon favorito
                </p>
              )}
            </div>
          </article>

          <article className={`${styles.preferenceItem}`}>
            <h5 className={`${styles.subtitle}`}>Region preferida</h5>
            <div className={`${styles.wrapper}`}>
              {favoriteRegion ? (
                <RegionCard region={favoriteRegion} />
              ) : (
                <p className={`${styles.emptyMessage}`}>
                  No has seleccionado region favorita
                </p>
              )}
            </div>
          </article>
        </section>
      </section>

      <section className={`${styles.teamsSection}`}>
        <section className={`${styles.teamsHeader}`}>
          <h3 className={`${styles.title}`}>Equipos Pokémon</h3>

          <Link
            to={'/create-team'}
            className={`${styles.addTeamButton}`}
            title={`Agregar equipo`}
          >
            <span className={`${styles.textWrapper}`}>Agregar equipo</span>
            <MdOutlineCatchingPokemon className={`${styles.icon}`} />
          </Link>
        </section>

        <section className={`${styles.teamsContainer}`}>
          {trainerTeams.length > 0 ? (
            trainerTeams
          ) : (
            <p className={`${styles.emptyMessage}`}>
              No hay equipos para mostrar. <br/>
              Crea tu primer equipo Pokémon dandole al boton verde.
            </p>
          )}
        </section>
      </section>
    </article>
  );
};

export default EntrenadorPreferences;
