// src/contexts/AuthContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import api from '@/services/Api/api';
import { useNavigate } from 'react-router-dom';
import { EntrenadorToBD } from '@/models/entreador';

// --- Interfaces de Tipos ---
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
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Función auxiliar para decodificar JWT sin librerías
const decodeJwt = (token: string): any => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Token JWT inválido: debe tener 3 partes');
      return null;
    }
    const base64Url = parts[1];
    if (!base64Url) {
      console.error('Token JWT inválido: payload vacío');
      return null;
    }
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decodificando JWT:', error);
    return null;
  }
};

// --- Componente Proveedor (Provider) ---
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<TrainerData | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  const setAuthToken = (token: string) => {
    localStorage.setItem('jwtToken', token);
    const decoded = decodeJwt(token);
    if (decoded?.sub) {
      setUser({
        id: 0,
        nombre_entrenador: 'OAuth User',
        email: decoded.sub, // El 'subject' del JWT es el email
      });
    }
  };

  const loadProfileFromToken = useCallback(() => {
    try {
      const storedToken = localStorage.getItem('jwtToken');
      if (storedToken) {
        const decoded = decodeJwt(storedToken);
        if (decoded?.sub) {
          setUser({
            id: 1,
            nombre_entrenador: 'Trainer',
            email: decoded.sub, // Extraer el email del JWT
          });
        } else {
          console.warn('No se pudo extraer el email del token');
          localStorage.removeItem('jwtToken');
        }
      }
    } catch (error) {
      console.error('Error cargando perfil:', error);
      localStorage.removeItem('jwtToken');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfileFromToken();
  }, [loadProfileFromToken]);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {
        usuario: email,
        password: password,
      });

      const {
        token,
        id,
        nombre_entrenador,
        email: userEmail,
      } = response.data.data;

      // Guardar el token ANTES de hacer otras peticiones
      localStorage.setItem('jwtToken', token);

      // Actualizar el estado del usuario con los datos del backend
      setUser({ id, nombre_entrenador, email: userEmail });
    } catch (error: any) {
      console.error('Error en login:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  const register = async (data: EntrenadorToBD) => {
    try {
      const payload = {
        nombre: data.nombre,
        email: data.email,
        contrasenia: data.contrasenia,
        region_preferida: data.region_preferida,
        tipo_preferido: data.tipo_preferido,
        pokemon_favorito: data.pokemon_favorito,
      };

      await api.post('/auth/register', payload);

      // Hacer login para obtener el token y el perfil
      await login(data.email, data.contrasenia);
    } catch (error: any) {
      console.error('Error en registro:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Error al registrarse');
    }
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
    navigate('/Auth');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        setAuthToken,
        loading,
      }}
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