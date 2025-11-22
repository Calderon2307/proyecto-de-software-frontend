import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { useAuth } from "@/contexts/AuthContext"; // 🛑 Importación del Hook de Autenticación

const Auth = () => {
  const navigate = useNavigate();
  // 🛑 Usar el contexto para las funciones de autenticación
  const { login, register } = useAuth(); 
  
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false); // Nuevo: Estado de carga
  const [error, setError] = useState<string | null>(null); // Nuevo: Estado de error
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    preferredType: "",
    preferredRegion: "",
    favoritePokemon: "",
  });

  // --- Arrays de Datos (No Cambian) ---
  const pokemonTypes = [
    "Normal", "Fire", "Water", "Electric", "Grass", "Ice",
    "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug",
    "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"
  ];

  const pokemonRegions = [
    "Kanto", "Johto", "Hoenn", "Sinnoh", "Unova",
    "Kalos", "Alola", "Galar", "Paldea"
  ];

  const popularPokemon = [
    "Pikachu", "Charizard", "Mewtwo", "Eevee", "Lucario",
    "Greninja", "Garchomp", "Dragonite", "Tyranitar", "Blaziken",
    "Sceptile", "Gengar", "Umbreon", "Sylveon", "Rayquaza"
  ];

  // --- Lógica del Formulario JWT/Local ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isLogin) {
        // LOGIN JWT (Envía solo email y password)
        await login(formData.email, formData.password);
      } else {
        // REGISTRO (Envía todos los campos)
        await register({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            preferredRegion: formData.preferredRegion,
            preferredType: formData.preferredType,
            favoritePokemon: formData.favoritePokemon,
        }); 
      }
      navigate("/Home"); // Redirigir al Home tras éxito
    } catch (err) {
      // Manejar el error de Axios y mostrar mensaje
      const errMsg = err.response?.data?.message || "Error al conectar con la API o credenciales inválidas.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  // --- Lógica del Botón Google (OAuth2) ---
  const handleGoogleLogin = () => {
    // Redirige al endpoint de Spring Security que inicia el flujo de Google
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };


  return (
    <div className={styles.container}>
      
      {/* Pokémon Logo */}
      <h1 className={styles.logo}>POKEDEX</h1>
      {error && <div className={styles.error}>{error}</div>} {/* Mostrar Error */}

      {/* Auth Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>{isLogin ? "Login" : "Sign up"}</h2>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          
          {/* Campo Name (Solo Registro) */}
          {!isLogin && (
            <div className={styles.field}>
              <label>Name:</label>
              <input
                type="text"
                placeholder="Trainer Red"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
          )}

          {/* Campo Email */}
          <div className={styles.field}>
            <label>Email:</label>
            <input
              type="email"
              placeholder="trainer@pokedex.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* Campo Password */}
          <div className={styles.field}>
            <label>Password:</label>
            <input
              type="password"
              placeholder="*************"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>

          {/* Campos de Registro Adicionales */}
          {!isLogin && (
            <>
              {/* Preferred Type */}
              <div className={styles.field}>
                <label>Preferred Type:</label>
                <select
                  value={formData.preferredType}
                  onChange={(e) => handleChange("preferredType", e.target.value)}
                >
                  <option value="">--- Select a type ---</option>
                  {pokemonTypes.map((type) => (
                    <option key={type} value={type.toLowerCase()}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Region */}
              <div className={styles.field}>
                <label>Preferred Region:</label>
                <select
                  value={formData.preferredRegion}
                  onChange={(e) =>
                    handleChange("preferredRegion", e.target.value)
                  }
                >
                  <option value="">--- Select a region ---</option>
                  {pokemonRegions.map((region) => (
                    <option key={region} value={region.toLowerCase()}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Favorite Pokémon */}
              <div className={styles.field}>
                <label>Favorite Pokémon:</label>
                <select
                  value={formData.favoritePokemon}
                  onChange={(e) =>
                    handleChange("favoritePokemon", e.target.value)
                  }
                >
                  <option value="">--- Select a Pokémon ---</option>
                  {popularPokemon.map((p) => (
                    <option key={p} value={p.toLowerCase()}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Switch form */}
          <div className={styles.swap}>
            <button type="button" onClick={() => setIsLogin(!isLogin)} disabled={loading}>
              {isLogin ? "¿Do not have an account yet?" : "¿Do you have an account?"}
            </button>
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitBtn} disabled={loading}> 
            {loading ? 'Cargando...' : 'catch them all!'}
          </button>

          {/* Divider */}
          <div className={styles.divider}>
            <span>Or continue with</span>
          </div>

          {/* Google Button */}
          <button type="button" className={styles.googleBtn} onClick={handleGoogleLogin} disabled={loading}>
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="google" />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;