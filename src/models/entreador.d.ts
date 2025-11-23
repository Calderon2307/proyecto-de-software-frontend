import {ShortViewPokemon, PokemonToSaveInBD} from '@models/pokemon';
import { PokemonTeam } from '@models/pokemonTeam';
//import {EntrenadorFavoriteRegion} from '@models/region';

export interface EntrenadorProfileInfo {
  id: number;
  nombre: string;
  email: string;
  tipoPreferido: string | null;
  regionPreferida: string | null;
  pokemonFavorito: ShortViewPokemon | null;
  equiposPokemon: PokemonTeam[];
}

export interface EntrenadorToBD {
  nombre: string;
  email: string;
  contrasenia: string;
  region_preferida?: string | null;
  tipo_preferido?: string | null;
  pokemon_favorito?: PokemonToSaveInBD | null;
}

export type EntrenadorEquipoToDB = {
  id_entrenador: number;
  nombre_equipo: string;
  equipo_pokemon: PokemonToSaveInBD[];
}

export interface EntrenadorProfilePicture {
  img: string;
  background: string;
}