import React, { useState } from 'react';
import EntrenadorInfo from '@components/EntrenadorInfo/EntrenadorInfo.tsx';
import EntrenadorPreferences from '@components/EntrenadorPreferences/EntrenadorPreferences.tsx';
import Header from '@components/Header/Header.tsx';
import { EntrenadorProfileInfo } from '@models/entreador';
import styles from '@pages/EntrenadorProfile/EntrenadorProfile.module.css';

const EntrenadorProfile = (): React.JSX.Element => {
  const [entrenador, setEntrenador] = useState<EntrenadorProfileInfo>({
    id: -1,
    nombre: '',
    email: '',
    tipoPreferido: null,
    regionPreferida: null,
    pokemonFavorito: null,
    equiposPokemon: [],
  });

  // const entrenador: EntrenadorProfileInfo = {
  //   id: 1,
  //   nombre: 'Leonel Vargas',
  //   email: 'leonel.vargas@example.com',
  //   tipoPreferido: 'dragon',
  //   regionPreferida: 'sinnoh',
  //   pokemonFavorito: {
  //     name: 'Garchomp',
  //     sprites: {
  //       icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/445.png',
  //       normal:
  //         'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png',
  //       shiny:
  //         'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/445.png',
  //     },
  //     types: ['dragon', 'ground'],
  //   },
  //   equiposPokemon: [
  //     // ================= TEAM 1 =================
  //     {
  //       teamName: 'Equipo Terremoto',
  //       pokemonTeam: [
  //         // 1
  //         {
  //           name: 'Garchomp',
  //           sprites: {
  //             icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/445.png',
  //             normal:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png',
  //             shiny:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/445.png',
  //           },
  //           stats: [
  //             { statName: 'hp', baseStat: 108 },
  //             { statName: 'attack', baseStat: 130 },
  //             { statName: 'defense', baseStat: 95 },
  //             { statName: 'special-attack', baseStat: 80 },
  //             { statName: 'special-defense', baseStat: 85 },
  //             { statName: 'speed', baseStat: 102 },
  //           ],
  //           posicionEquipo: 1,
  //         },
  //         // 2
  //         {
  //           name: 'Salamence',
  //           sprites: {
  //             icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/373.png',
  //             normal:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/373.png',
  //             shiny:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/373.png',
  //           },
  //           stats: [
  //             { statName: 'hp', baseStat: 95 },
  //             { statName: 'attack', baseStat: 135 },
  //             { statName: 'defense', baseStat: 80 },
  //             { statName: 'special-attack', baseStat: 110 },
  //             { statName: 'special-defense', baseStat: 80 },
  //             { statName: 'speed', baseStat: 100 },
  //           ],
  //           posicionEquipo: 2,
  //         },
  //         // 3
  //         {
  //           name: 'Dragonite',
  //           sprites: {
  //             icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/149.png',
  //             normal:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png',
  //             shiny:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/149.png',
  //           },
  //           stats: [
  //             { statName: 'hp', baseStat: 91 },
  //             { statName: 'attack', baseStat: 134 },
  //             { statName: 'defense', baseStat: 95 },
  //             { statName: 'special-attack', baseStat: 100 },
  //             { statName: 'special-defense', baseStat: 100 },
  //             { statName: 'speed', baseStat: 80 },
  //           ],
  //           posicionEquipo: 3,
  //         },
  //         // 4
  //         {
  //           name: 'Haxorus',
  //           sprites: {
  //             icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/612.png',
  //             normal:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/612.png',
  //             shiny:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/612.png',
  //           },
  //           stats: [
  //             { statName: 'hp', baseStat: 76 },
  //             { statName: 'attack', baseStat: 147 },
  //             { statName: 'defense', baseStat: 90 },
  //             { statName: 'special-attack', baseStat: 60 },
  //             { statName: 'special-defense', baseStat: 70 },
  //             { statName: 'speed', baseStat: 97 },
  //           ],
  //           posicionEquipo: 4,
  //         },
  //         // 5
  //         {
  //           name: 'Latios',
  //           sprites: {
  //             icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/381.png',
  //             normal:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/381.png',
  //             shiny:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/381.png',
  //           },
  //           stats: [
  //             { statName: 'hp', baseStat: 80 },
  //             { statName: 'attack', baseStat: 90 },
  //             { statName: 'defense', baseStat: 80 },
  //             { statName: 'special-attack', baseStat: 130 },
  //             { statName: 'special-defense', baseStat: 110 },
  //             { statName: 'speed', baseStat: 110 },
  //           ],
  //           posicionEquipo: 5,
  //         },
  //         // 6
  //         {
  //           name: 'Flygon',
  //           sprites: {
  //             icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/330.png',
  //             normal:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/330.png',
  //             shiny:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/330.png',
  //           },
  //           stats: [
  //             { statName: 'hp', baseStat: 80 },
  //             { statName: 'attack', baseStat: 100 },
  //             { statName: 'defense', baseStat: 80 },
  //             { statName: 'special-attack', baseStat: 80 },
  //             { statName: 'special-defense', baseStat: 80 },
  //             { statName: 'speed', baseStat: 100 },
  //           ],
  //           posicionEquipo: 6,
  //         },
  //       ],
  //     },
  //
  //     // ================= TEAM 2 =================
  //     {
  //       teamName: 'Equipo Estratégico',
  //       pokemonTeam: [
  //         {
  //           name: 'Metagross',
  //           sprites: {
  //             icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/376.png',
  //             normal:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/376.png',
  //             shiny:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/376.png',
  //           },
  //           stats: [
  //             { statName: 'hp', baseStat: 80 },
  //             { statName: 'attack', baseStat: 135 },
  //             { statName: 'defense', baseStat: 130 },
  //             { statName: 'special-attack', baseStat: 95 },
  //             { statName: 'special-defense', baseStat: 90 },
  //             { statName: 'speed', baseStat: 70 },
  //           ],
  //           posicionEquipo: 1,
  //         },
  //
  //         {
  //           name: 'Gardevoir',
  //           sprites: {
  //             icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/282.png',
  //             normal:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png',
  //             shiny:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/282.png',
  //           },
  //           stats: [
  //             { statName: 'hp', baseStat: 68 },
  //             { statName: 'attack', baseStat: 65 },
  //             { statName: 'defense', baseStat: 65 },
  //             { statName: 'special-attack', baseStat: 125 },
  //             { statName: 'special-defense', baseStat: 115 },
  //             { statName: 'speed', baseStat: 80 },
  //           ],
  //           posicionEquipo: 2,
  //         },
  //
  //         {
  //           name: 'Aegislash',
  //           sprites: {
  //             icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/681.png',
  //             normal:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/681.png',
  //             shiny:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/681.png',
  //           },
  //           stats: [
  //             { statName: 'hp', baseStat: 60 },
  //             { statName: 'attack', baseStat: 150 },
  //             { statName: 'defense', baseStat: 50 },
  //             { statName: 'special-attack', baseStat: 150 },
  //             { statName: 'special-defense', baseStat: 50 },
  //             { statName: 'speed', baseStat: 60 },
  //           ],
  //           posicionEquipo: 3,
  //         },
  //
  //         {
  //           name: 'Scizor',
  //           sprites: {
  //             icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/212.png',
  //             normal:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/212.png',
  //             shiny:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/212.png',
  //           },
  //           stats: [
  //             { statName: 'hp', baseStat: 70 },
  //             { statName: 'attack', baseStat: 130 },
  //             { statName: 'defense', baseStat: 100 },
  //             { statName: 'special-attack', baseStat: 55 },
  //             { statName: 'special-defense', baseStat: 80 },
  //             { statName: 'speed', baseStat: 65 },
  //           ],
  //           posicionEquipo: 4,
  //         },
  //
  //         {
  //           name: 'Lucario',
  //           sprites: {
  //             icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/448.png',
  //             normal:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png',
  //             shiny:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/448.png',
  //           },
  //           stats: [
  //             { statName: 'hp', baseStat: 70 },
  //             { statName: 'attack', baseStat: 110 },
  //             { statName: 'defense', baseStat: 70 },
  //             { statName: 'special-attack', baseStat: 115 },
  //             { statName: 'special-defense', baseStat: 70 },
  //             { statName: 'speed', baseStat: 90 },
  //           ],
  //           posicionEquipo: 5,
  //         },
  //
  //         {
  //           name: 'Blaziken',
  //           sprites: {
  //             icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/257.png',
  //             normal:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/257.png',
  //             shiny:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/257.png',
  //           },
  //           stats: [
  //             { statName: 'hp', baseStat: 80 },
  //             { statName: 'attack', baseStat: 120 },
  //             { statName: 'defense', baseStat: 70 },
  //             { statName: 'special-attack', baseStat: 110 },
  //             { statName: 'special-defense', baseStat: 70 },
  //             { statName: 'speed', baseStat: 80 },
  //           ],
  //           posicionEquipo: 6,
  //         },
  //       ],
  //     },
  //
  //     // ================= TEAM 3 =================
  //     {
  //       teamName: 'Equipo Leyendas',
  //       pokemonTeam: [
  //         {
  //           name: 'Greninja',
  //           sprites: {
  //             icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/658.png',
  //             normal:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/658.png',
  //             shiny:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/658.png',
  //           },
  //           stats: [
  //             { statName: 'hp', baseStat: 72 },
  //             { statName: 'attack', baseStat: 95 },
  //             { statName: 'defense', baseStat: 67 },
  //             { statName: 'special-attack', baseStat: 103 },
  //             { statName: 'special-defense', baseStat: 71 },
  //             { statName: 'speed', baseStat: 122 },
  //           ],
  //           posicionEquipo: 1,
  //         },
  //
  //         {
  //           name: 'Tyranitar',
  //           sprites: {
  //             icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/248.png',
  //             normal:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/248.png',
  //             shiny:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/248.png',
  //           },
  //           stats: [
  //             { statName: 'hp', baseStat: 100 },
  //             { statName: 'attack', baseStat: 134 },
  //             { statName: 'defense', baseStat: 110 },
  //             { statName: 'special-attack', baseStat: 95 },
  //             { statName: 'special-defense', baseStat: 100 },
  //             { statName: 'speed', baseStat: 61 },
  //           ],
  //           posicionEquipo: 2,
  //         },
  //
  //         {
  //           name: 'Charizard',
  //           sprites: {
  //             icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png',
  //             normal:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
  //             shiny:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/6.png',
  //           },
  //           stats: [
  //             { statName: 'hp', baseStat: 78 },
  //             { statName: 'attack', baseStat: 84 },
  //             { statName: 'defense', baseStat: 78 },
  //             { statName: 'special-attack', baseStat: 109 },
  //             { statName: 'special-defense', baseStat: 85 },
  //             { statName: 'speed', baseStat: 100 },
  //           ],
  //           posicionEquipo: 3,
  //         },
  //
  //         {
  //           name: 'Excadrill',
  //           sprites: {
  //             icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/530.png',
  //             normal:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/530.png',
  //             shiny:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/530.png',
  //           },
  //           stats: [
  //             { statName: 'hp', baseStat: 110 },
  //             { statName: 'attack', baseStat: 135 },
  //             { statName: 'defense', baseStat: 60 },
  //             { statName: 'special-attack', baseStat: 50 },
  //             { statName: 'special-defense', baseStat: 65 },
  //             { statName: 'speed', baseStat: 88 },
  //           ],
  //           posicionEquipo: 4,
  //         },
  //
  //         {
  //           name: 'Hydreigon',
  //           sprites: {
  //             icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/635.png',
  //             normal:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/635.png',
  //             shiny:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/635.png',
  //           },
  //           stats: [
  //             { statName: 'hp', baseStat: 92 },
  //             { statName: 'attack', baseStat: 105 },
  //             { statName: 'defense', baseStat: 90 },
  //             { statName: 'special-attack', baseStat: 125 },
  //             { statName: 'special-defense', baseStat: 90 },
  //             { statName: 'speed', baseStat: 98 },
  //           ],
  //           posicionEquipo: 5,
  //         },
  //
  //         {
  //           name: 'Sceptile',
  //           sprites: {
  //             icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/254.png',
  //             normal:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/254.png',
  //             shiny:
  //               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/254.png',
  //           },
  //           stats: [
  //             { statName: 'hp', baseStat: 70 },
  //             { statName: 'attack', baseStat: 85 },
  //             { statName: 'defense', baseStat: 65 },
  //             { statName: 'special-attack', baseStat: 105 },
  //             { statName: 'special-defense', baseStat: 85 },
  //             { statName: 'speed', baseStat: 120 },
  //           ],
  //           posicionEquipo: 6,
  //         },
  //       ],
  //     },
  //   ],
  // };

  return (
    <>
      <Header mode={'partial'} />
      <article className={`${styles.mainSection}`}>
        <EntrenadorInfo nombre={entrenador.nombre} />
        <EntrenadorPreferences
          tipoFavorito={entrenador.tipoPreferido}
          regionFavorita={entrenador.regionPreferida}
          pokemonFavorito={entrenador.pokemonFavorito}
          equiposPokemon={entrenador.equiposPokemon}
        />
      </article>
    </>
  );
};

export default EntrenadorProfile;
