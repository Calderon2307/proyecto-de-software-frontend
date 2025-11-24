// Importa correctamente desde los modelos (Nota: Se usan las exportaciones del final del archivo)
import type { ShortViewPokemon, PokemonToSaveInBD, PokemonInfo } from '@/models/pokemon';
import { EntrenadorProfileInfo } from '@/models/entreador';

type Stat = PokemonInfo['stats'][number]; 
type StatArray = PokemonInfo['stats']; 

/**
 * Transforma ShortViewPokemon a PokemonToSaveInBD (Requisito 9)
 * @param pokemon El objeto ShortViewPokemon a convertir.
 */
export const convertShortToSaveDB = (pokemon: ShortViewPokemon | null): PokemonToSaveInBD | null => {
    if (!pokemon) {
        return null;
    }
    
    if (!pokemon.stats || pokemon.stats.length === 0) {
        throw new Error('ShortViewPokemon does not contain stats.');
    }

    return {
        nombre: pokemon.name,
        tipos: pokemon.types,
        stats: pokemon.stats as StatArray,
        sprite_normal: pokemon.sprites.normal,
        sprite_shiny: pokemon.sprites.shiny,
    } as PokemonToSaveInBD;
};

/**
 * Mapea la respuesta del Backend (EntrenadorResponse) a nuestro modelo local (EntrenadorProfileInfo).
 * @param backendData Respuesta del GET /entrenador/email/{email}
 */
export const mapEntrenadorResponseToProfile = (backendData: any): EntrenadorProfileInfo => {
    // Validar pokemonFavorito con estructura segura de ShortViewPokemon
    const pokemonFavorito: ShortViewPokemon | null = backendData.pokemon_favorito 
        ? {
            name: backendData.pokemon_favorito.nombre || 'Desconocido',
            types: Array.isArray(backendData.pokemon_favorito.tipos) 
                ? backendData.pokemon_favorito.tipos 
                : [],
            sprites: {
                icon: null,
                normal: backendData.pokemon_favorito.sprite_normal || null,
                shiny: backendData.pokemon_favorito.sprite_shiny || null,
            },
            stats: backendData.pokemon_favorito.stats || undefined,
        }
        : null;

    return {
        id: backendData.id || -1,
        nombre: backendData.nombre_entrenador || '',
        email: backendData.email || '',
        tipoPreferido: backendData.tipo_preferido || null,
        regionPreferida: backendData.region_preferida || null,
        pokemonFavorito: pokemonFavorito,
        equiposPokemon: [], 
    };
};