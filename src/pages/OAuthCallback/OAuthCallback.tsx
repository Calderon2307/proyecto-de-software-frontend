import React, { useEffect, useState } from 'react'; // 🛑 Importar useState
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext'; 

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthToken } = useAuth(); 
  
  // 🛑 NUEVO ESTADO: Bloquear la ejecución después del primer uso exitoso del token
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    // Si ya procesamos la URL, salimos inmediatamente para romper el bucle.
    if (processed) {
        return;
    }
    
    const params = new URLSearchParams(location.search);
    const token = params.get('token'); 

    if (token) {
      // 1. Guarda el token
      setAuthToken(token); 
      
      // 2. Marca como procesado
      setProcessed(true); 
      
      // 3. Redirigir (La redirección debe ser el último paso síncrono en la ejecución)
      // Usamos setTimeout para asegurar que el estado se actualice antes de navegar
      setTimeout(() => {
         navigate('/Home', { replace: true }); 
      }, 0); 
      
    } else {
      // Si no hay token, marca como procesado y redirige al login
      setProcessed(true);
      navigate('/Auth', { state: { error: 'Autenticación con Google fallida.' } });
    }
    
  // El array de dependencias sigue siendo necesario.
  }, [location, navigate, setAuthToken, processed]); // 🛑 Añadimos 'processed' al array de dependencias

  // Muestra un mensaje de carga hasta que la navegación se complete
  return <div>Procesando autenticación social...</div>;
};

export default OAuthCallback;