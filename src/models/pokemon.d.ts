import { Move } from '@models/moves';
import { Ability } from '@models/ability';
import { TypeRelation } from '@models/types';

type ChangePokemon = Pick<PokemonInfo, 'pokedexNumber' | 'name' | 'sprites'>;
type StatusPokemon = 'legendario' | 'mitico' | 'pseudo-legendario' | 'normal';
type PrevEvolution = Pick<PokemonInfo, 'name' | 'sprites' | 'pokedexNumber'>;

export interface PokemonInfo {
  pokemonId: number; //id
  pokedexNumber: number;
  name: string;
  height: number;
  weight: number;
  baseXP: number;
  souond: string;
  status?: StatusPokemon; //legendario, mitico/singular, pseudo-legendario, normal
  types: string[];
  abilities: Ability[];
  moves: Move[];
  weaknessResistance: TypeRelation[];
  nextPokemon: ChangePokemon | null;
  prevPokemon: ChangePokemon | null;
  stats: {
    statName: string;
    baseStat: number;
  }[];
  sprites: {
    icon: string | null;
    normal: string | null;
    shiny: string | null;
  };
  cards: {
    img: string;
  }[];
}

export interface PokemonSpecieInfo {
  nameMeaning: string;
  generation: string;
  evolvesFrom: PrevEvolution | null;
  evolutionChain: {
    firstPhase: ShortViewPokemon[];
    secondPhase: ShortViewPokemon[];
    thirdPhase: ShortViewPokemon[];
  };
  otherForms: ShortViewPokemon[];
  genderRate: {
    male: number;
    female: number;
  };
  pokedexEntries: {
    description: string;
    version: string;
  }[];
}

export type Pokemon = PokemonInfo & PokemonSpecieInfo;
export type ShortViewPokemon = Pick<
  PokemonInfo,
  'name' | 'sprites' | 'types'
> & {
  stats?: PokemonInfo['stats'];
};
//HACER STATS OPCIONALES PARA DESPUES Y CARGARLAS CUANDO SEA NECESARIO

//MODELOS DE LA BD
export type PokemonTeamMember = Pick<
  PokemonInfo,
  'name' | 'sprites' | 'stats'
> & { posicionEquipo: number };
export type PokemonToSaveInBD = {
  nombre: PokemonInfo['name'];
  tipos: PokemonInfo['types'];
  stats: PokemonInfo['stats'];
  sprite_normal: PokemonInfo['sprites']['normal'];
  sprite_shiny: PokemonInfo['sprites']['shiny'];
};
//FIN DE MODELOS DE LA BD
export type PokemonCard = Pick<
  Pokemon,
  | 'pokemonId'
  | 'pokedexNumber'
  | 'name'
  | 'nameMeaning'
  | 'height'
  | 'weight'
  | 'types'
  | 'sprites'
  | 'evolvesFrom'
  | 'stats'
>;
