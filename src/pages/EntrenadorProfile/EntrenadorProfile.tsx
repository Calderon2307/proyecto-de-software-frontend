// src/pages/EntrenadorProfile.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import EntrenadorInfo from '@components/EntrenadorInfo/EntrenadorInfo.tsx';
import EntrenadorPreferences from '@components/EntrenadorPreferences/EntrenadorPreferences.tsx';
import Header from '@components/Header/Header.tsx';
import { EntrenadorProfileInfo } from '@models/entreador';
import styles from '@pages/EntrenadorProfile/EntrenadorProfile.module.css';
import { useAuth } from '@/contexts/AuthContext'; // 🛑 Importar Auth Context
import { fetchFullEntrenadorProfile } from '@/services/EntrenadorService/entrenadorService'; // 🛑 Importar la función de carga

// Estado inicial con valores por defecto
const INITIAL_STATE: EntrenadorProfileInfo = {
    id: -1,
    nombre: '',
    email: '',
    tipoPreferido: null,
    regionPreferida: null,
    pokemonFavorito: null,
    equiposPokemon: [],
};

const EntrenadorProfile = (): React.JSX.Element => {
    const navigate = useNavigate();
    // 🛑 Obtener el email del usuario logeado y el estado de autenticación
    const { user, isAuthenticated } = useAuth(); 

    const [entrenador, setEntrenador] = useState<EntrenadorProfileInfo>(INITIAL_STATE);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // FUNCIÓN DE CARGA DE DATOS ASÍNCRONA
    const loadProfileData = useCallback(async () => {
        // Comprobación de seguridad: Redirigir si no hay token o usuario
        if (!isAuthenticated || !user?.email) {
            navigate('/Auth'); 
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            // 🛑 Llamada al flujo de dos pasos
            const profileData = await fetchFullEntrenadorProfile(user.email);
            
            // 🛑 Actualizar Estado Único
            setEntrenador(profileData);

        } catch (e) {
            setError(e.message || 'Fallo al cargar el perfil. Revisa la consola.');
            console.error('Error de carga de perfil:', e);
            setEntrenador(INITIAL_STATE); 
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, user?.email, navigate]); 

    // 🛑 Disparar la carga al montar y cuando el usuario se autentica
    useEffect(() => {
        if (isAuthenticated && user?.email) {
            loadProfileData();
        }
    }, [loadProfileData, isAuthenticated, user?.email]);


    if (loading) {
        return <p>Cargando perfil...</p>; 
    }

    if (error) {
        return <p>Error: {error}</p>; 
    }

    if (entrenador.id === -1) {
        // Este caso ocurre si el AuthContext tiene un token, pero la carga falló.
        return <p>No se pudo cargar el perfil del entrenador.</p>;
    }


    return (
        <>
            <Header mode={'partial'} />
            <article className={`${styles.mainSection}`}>
                {/* Pasar los datos del estado cargado */}
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