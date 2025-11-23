// src/contexts/AuthContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import api from '@/services/Api/api'; // Cliente Axios
import { useNavigate } from 'react-router-dom';
import { EntrenadorToBD } from '@models/entreador';

// --- Interfaces de Tipos (Basadas en EntrenadorResponse) ---
interface TrainerData {
  id: number;
  nombre_entrenador: string;
  email: string;
}

interface AuthContextType {
  user: TrainerData | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: EntrenadorToBD) => Promise<void>;
  logout: () => void;
  setAuthToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Componente Proveedor (Provider) ---
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<TrainerData | null>(null);
  const isAuthenticated = !!user;

  const setAuthToken = (token: string) => {
    localStorage.setItem('jwtToken', token);
    // Placeholder para la carga de perfil después de OAuth2
    setUser({
      id: 0,
      nombre_entrenador: 'OAuth User',
      email: 'verified@google.com',
    });
  };

  const loadProfileFromToken = useCallback(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setUser({
        id: 1,
        nombre_entrenador: 'Trainer',
        email: 'default@pokedex.com',
      });
    }
  }, []);

  useEffect(() => {
    loadProfileFromToken();
  }, [loadProfileFromToken]);

  const login = async (email: string, password: string) => {
    // 🛑 CORRECCIÓN: Usar 'usuario' para el email y 'password' para la contraseña
    const response = await api.post('/auth/login', {
      usuario: email,
      password: password,
    });

    // Asumimos que la respuesta de Login contiene: { data: { token: '...', id: 1, nombre_entrenador: '...', email: '...' } }
    const {
      token,
      id,
      nombre_entrenador,
      email: userEmail,
    } = response.data.data;

    localStorage.setItem('jwtToken', token);
    setUser({ id, nombre_entrenador, email: userEmail });
  };

  const register = async (data: EntrenadorToBD) => {
    // 🛑 CORRECCIÓN: Mapear los campos del frontend a las claves exactas del backend (contrasenia, pokemon_favorito)
    const payload = {
      nombre: data.nombre,
      email: data.email,
      contrasenia: data.contrasenia, // Clave esperada por el backend
      region_preferida: data.region_preferida,
      tipo_preferido: data.tipo_preferido,
      pokemon_favorito: data.pokemon_favorito, // Clave esperada por el backend
    };

    await api.post('/auth/register', payload);

    // Hacemos login para obtener el token y el perfil
    await login(data.email, data.contrasenia);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
    navigate('/Auth');
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout, setAuthToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
