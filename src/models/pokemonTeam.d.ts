import { PokemonTeamMember } from './pokemon';

export interface PokemonTeam {
  teamId?: number;
  teamName: string;
  pokemonTeam: PokemonTeamMember[];
  fechaCreacion?: string;
}