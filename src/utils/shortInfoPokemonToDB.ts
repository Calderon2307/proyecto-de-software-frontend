import { PokemonToSaveInBD, ShortViewPokemon } from '@models/pokemon';

export const convertShortToSaveDB = (
  pokemon: ShortViewPokemon | null
): PokemonToSaveInBD | null => {
  if (!pokemon) return null;
  if (!pokemon.stats) {
    throw new Error("ShortViewPokemon does not contain stats.");
  }
  return {
    nombre: pokemon.name,
    tipos: pokemon.types,
    stats: pokemon.stats,
    sprite_normal: pokemon.sprites.normal!,
    sprite_shiny: pokemon.sprites.shiny!,
  };
};
