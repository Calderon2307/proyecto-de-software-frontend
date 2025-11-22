

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext'; 
import styles from './LogoutButton.module.css'; 

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout(); // 1. Limpia el token y el estado global
        navigate('/Auth'); // 2. Redirige a la página de autenticación
    };

    return (
        <button
            onClick={handleLogout}
            className={styles.logoutBtn} 
        >
            Logout
        </button>
    );
};

export default LogoutButton;