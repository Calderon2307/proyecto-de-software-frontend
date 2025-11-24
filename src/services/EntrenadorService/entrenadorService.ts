// src/services/entrenadorService.ts

import api from '@/services/Api/api';
import { EntrenadorProfileInfo } from '@/models/entreador';
import { PokemonTeam } from '@models/pokemonTeam';
import { PokemonTeamMember } from '@models/pokemon';
import { mapEntrenadorResponseToProfile } from '@/utils/pokemonMappers/pokemonMappers';

// NOTA: Tipos de respuesta del backend para el Entrenador (Paso 1)
interface BackendEntrenadorResponse {
    id: number;
    nombre_entrenador: string;
    email: string;
    tipo_preferido: string | null;
    region_preferida: string | null;
    pokemon_favorito: any;
}

// 🛑 Tipo de respuesta del backend para Equipos
interface BackendEquipoResponse {
    id_equipo: number;
    nombre_equipo: string;
    equipo_pokemon: {
        id_pokemon: number;
        nombre: string;
        sprite_normal: string;
        sprite_shiny: string;
        stats: any[];
        posicion_equipo: number;
    }[];
    fecha_creacion: string;
}

const ENTRENADOR_RESOURCE = '/entrenador'; 
const EQUIPO_RESOURCE = '/equipo'; 

// Función auxiliar para obtener la info básica por email (Requisito 1)
const fetchTrainerByEmail = async (email: string): Promise<BackendEntrenadorResponse> => {
    try {
        const response = await api.get(`${ENTRENADOR_RESOURCE}/email/${email}`); 
        return response.data.data as BackendEntrenadorResponse; 
    } catch (error) {
        throw new Error('Error al cargar la información básica del entrenador.');
    }
};

// 🛑 Mapear BackendEquipoResponse a PokemonTeam
const mapBackendEquipoToPokemonTeam = (backendEquipo: BackendEquipoResponse): PokemonTeam => {
    const pokemonTeam: PokemonTeamMember[] = backendEquipo.equipo_pokemon.map(pokemon => ({
        name: pokemon.nombre,
        sprites: {
            icon: null,
            normal: pokemon.sprite_normal,
            shiny: pokemon.sprite_shiny,
        },
        stats: pokemon.stats,
        posicionEquipo: pokemon.posicion_equipo,
    }));

    return {
        teamId: backendEquipo.id_equipo,
        teamName: backendEquipo.nombre_equipo,
        pokemonTeam: pokemonTeam,
        fechaCreacion: backendEquipo.fecha_creacion,
    };
};

// Función auxiliar para obtener los equipos por ID (Requisito 3)
const fetchTeamsByTrainerId = async (trainerId: number): Promise<PokemonTeam[]> => {
    try {
        const response = await api.get(`${EQUIPO_RESOURCE}/trainer/${trainerId}`);
        
        console.log('🔍 Response completo de equipos:', response);
        console.log('🔍 response.data:', response.data);
        console.log('🔍 response.data.data:', response.data.data);
        
        // 🛑 CORRECCIÓN: La respuesta es un objeto con la propiedad 'equipos'
        const backendTeams = response.data.data?.equipos || response.data.data;
        
        console.log('🔍 backendTeams extraído:', backendTeams);
        console.log('🔍 ¿backendTeams es array?', Array.isArray(backendTeams));
        
        if (!backendTeams || !Array.isArray(backendTeams) || backendTeams.length === 0) {
            console.warn('⚠️ No hay equipos o está vacío');
            return []; 
        }
        
        // 🛑 Mapear cada equipo del backend al modelo local
        const mappedTeams = backendTeams.map((team: BackendEquipoResponse) => 
            mapBackendEquipoToPokemonTeam(team)
        );
        
        console.log('✅ Equipos mapeados:', mappedTeams);
        return mappedTeams;

    } catch (error) {
        console.error("❌ Error al obtener equipos:", error);
        return []; 
    }
};

/**
 * Función principal para cargar el perfil completo del entrenador en dos pasos.
 */
export const fetchFullEntrenadorProfile = async (email: string): Promise<EntrenadorProfileInfo> => {
    
    const profileResponse = await fetchTrainerByEmail(email);
    const trainerId = profileResponse.id;
    
    let profileInfo: EntrenadorProfileInfo = mapEntrenadorResponseToProfile(profileResponse);
    console.log('profileInfo después del mapper:', profileInfo);

    const teamsData = await fetchTeamsByTrainerId(trainerId);
    console.log('teamsData recibido:', teamsData);
    console.log('¿teamsData es array?', Array.isArray(teamsData));

    const result = {
        ...profileInfo,
        equiposPokemon: teamsData, 
    };
    
    console.log('Resultado final:', result);
    console.log('equiposPokemon final:', result.equiposPokemon);
    
    return result;
};