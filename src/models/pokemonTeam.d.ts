import {PokemonTeamMember} from '@models/pokemon';

export interface PokemonTeam {
  teamName: string;
  pokemonTeam: PokemonTeamMember[];
}