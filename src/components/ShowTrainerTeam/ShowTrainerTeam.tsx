import React, { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { PokemonTeam } from '@models/pokemonTeam';
import { PokemonTeamMember } from '@models/pokemon';
import styles from '@components/ShowTrainerTeam/ShowTrainerTeam.module.css';
import {
  MdDelete,
  MdModeEdit,
  MdAutoAwesome,
  MdAddCircleOutline,
} from 'react-icons/md';
import { capitalizeText } from '@utils/formatText.ts';

type ShowTrainerTeamProps = PokemonTeam;

const ShowTrainerTeam = ({
  teamName,
  pokemonTeam,
}: ShowTrainerTeamProps): React.JSX.Element => {
  const pokemonTeamMemberId: string = useId();
  const pokemonStatId: string = useId();
  const [showshiny, setShowShiny] = useState<boolean>(false);
  const [expandTeam, setExpandTeam] = useState<boolean>(false);

  const handleShowShiny = (): void => {
    setShowShiny(!showshiny);
  };

  const handleExpandTeam = (): void => {
    setExpandTeam(!expandTeam);
  };

  const handleDeleteTeam = (): void => {};

  const pokemonTeamElement: React.JSX.Element[] = pokemonTeam.map(
    (pokemon: PokemonTeamMember, index: number): React.JSX.Element =>
      expandTeam ? (
        <section className={`${styles.pokemoInfoSection}`}>
          <figure
            key={`${pokemonTeamMemberId}-${index}`}
            className={`${styles.pokemonImgContainer} ${styles.spriteExpanded}`}
            title={`${showshiny ? 'Shiny' : ''} ${capitalizeText(pokemon.name)}`}
          >
            <img
              src={showshiny ? pokemon.sprites.shiny! : pokemon.sprites.normal!}
              alt={`${capitalizeText(pokemon.name)} sprite`}
              className={`${styles.pokemonImg}`}
            />
          </figure>

          <h5 className={`${styles.pokemonName}`}>{pokemon.name}</h5>

          <section className={`${styles.statsContainer}`}>
            {pokemon.stats.map(
              (
                stat: { statName: string; baseStat: number },
                index: number,
              ): React.JSX.Element => {
                let statName: string = '';

                switch (stat.statName) {
                  case 'hp':
                    statName = 'HTP';
                    break;
                  case 'attack':
                    statName = 'ATK';
                    break;
                  case 'defense':
                    statName = 'DEF';
                    break;
                  case 'special-attack':
                    statName = 'SPA';
                    break;
                  case 'special-defense':
                    statName = 'SDF';
                    break;
                  case 'speed':
                    statName = 'SPD';
                    break;
                  default:
                    break;
                }

                return (
                  <section
                    key={`${pokemonStatId}-${stat.statName}-${index}`}
                    className={`${styles.pokemonStatContainer}`}
                    title={`${capitalizeText(stat.statName)}`}
                  >
                    <div className={`${styles.statWrapper}`}>
                      <p className={`${styles.pokemonStat}`}>{stat.baseStat}</p>
                    </div>
                    <h6 className={`${styles.pokemonStatTitle}`}>{statName}</h6>
                  </section>
                );
              },
            )}

            <section className={`${styles.pokemonStatContainer}`}>
              <div className={`${styles.statWrapper}`}>
                <p className={`${styles.pokemonStat}`}>
                  {pokemon.stats.reduce(
                    (total: number, stat: { baseStat: number }) =>
                      total + stat.baseStat,
                    0,
                  )}
                </p>
              </div>
              <h6 className={`${styles.pokemonStatTitle}`}>Total Stats</h6>
            </section>
          </section>
        </section>
      ) : (
        <figure
          key={`${pokemonTeamMemberId}-${index}`}
          className={`${styles.pokemonImgContainer}`}
          title={`${showshiny ? 'Shiny' : ''} ${capitalizeText(pokemon.name)}`}
        >
          <img
            src={showshiny ? pokemon.sprites.shiny! : pokemon.sprites.normal!}
            alt={`${capitalizeText(pokemon.name)} sprite`}
            className={`${styles.pokemonImg}`}
          />
        </figure>
      ),
  );

  return (
    <article
      className={`${styles.pokemonTeamItem} ${expandTeam ? styles.expandInfoTeam : false}`}
    >
      <h4 className={`${styles.teamTitle}`}>{capitalizeText(teamName)}</h4>

      {expandTeam ? (
        false
      ) : (
        <section className={`${styles.teamSection}`}>
          {pokemonTeamElement}
        </section>
      )}

      <section className={`${styles.iconsSection}`}>
        <MdAutoAwesome
          onClick={handleShowShiny}
          className={`${styles.icon} ${showshiny ? styles.shinyOn : ''}`}
          title={`${showshiny ? 'Show normal version' : 'Show shiny version'}`}
        />

        <MdAddCircleOutline
          onClick={handleExpandTeam}
          className={`${styles.icon} ${expandTeam ? styles.expandOn : ''}`}
          title="Expand Team"
        />

        <Link to={`/create-team`} className={`${styles.iconLink}`}>
          <MdModeEdit className={`${styles.icon}`} title="Edit Team" />
        </Link>

        <MdDelete
          onClick={handleDeleteTeam}
          className={`${styles.icon}`}
          title="Delete Team"
        />
      </section>

      {expandTeam ? (
        <section className={`${styles.teamSectionExpanded}`}>
          {pokemonTeamElement}
        </section>
      ) : (
        false
      )}
    </article>
  );
};

export default ShowTrainerTeam;
