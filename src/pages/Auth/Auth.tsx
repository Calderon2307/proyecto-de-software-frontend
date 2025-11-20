import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    preferredType: "",
    preferredRegion: "",
    favoritePokemon: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.container}>
      
      {/* Pokémon Logo */}
      <h1 className={styles.logo}>POKEDEX</h1>

      {/* Auth Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>{isLogin ? "Login" : "Sign up"}</h2>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          
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

          <div className={styles.field}>
            <label>Email:</label>
            <input
              type="email"
              placeholder="trainer@pokedex.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label>Password:</label>
            <input
              type="password"
              placeholder="*************"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>

          {!isLogin && (
            <>
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
            <button type="button" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "¿Do not have an account yet?" : "¿Do you have an account?"}
            </button>
          </div>

          {/* Submit */}
          <button onClick={() => navigate("/Home")} type="submit" className={styles.submitBtn}> 
            catch them all!
          </button>

          {/* Divider */}
          <div className={styles.divider}>
            <span>Or continue with</span>
          </div>

          {/* Google Button */}
          <button type="button" className={styles.googleBtn}>
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="google" />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
