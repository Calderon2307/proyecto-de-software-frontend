import api from '@/services/Api/api';
import { EntrenadorEquipoToDB } from '@/models/entreador';

export const createEquipo = async (equipoData: EntrenadorEquipoToDB) => {
    try {
        const response = await api.post('/equipo/create', equipoData);
        return response.data;
    } catch (error) {
        console.error('Error al crear equipo:', error);
        throw error;
    }
};

/**
 * Obtiene solo el ID del entrenador por email
 */
export const getEntrenadorIdByEmail = async (email: string): Promise<number> => {
    try {
        const response = await api.get(`/entrenador/email/${email}`);
        return response.data.data.id as number;
    } catch (error) {
        throw new Error('Error al obtener el ID del entrenador.');
    }
};