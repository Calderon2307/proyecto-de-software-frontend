import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import SelectPokemonDialog from '@components/SelectPokemonDialog/SelectPokemonDialog.tsx';
import SelectRegionDialog from '@components/SelectRegionDialog/SelectRegionDialog.tsx';
import SelectionTypeDialog from '@components/SelectionTypeDialog/SelectionTypeDialog.tsx';

import { EntrenadorToBD } from '@models/entreador';
import { PokemonToSaveInBD, ShortViewPokemon } from '@models/pokemon';
import { convertShortToSaveDB } from '@utils/shortInfoPokemonToDB.ts';
import { Types } from '@data/types';

import styles from './Auth.module.css';

const Auth = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [pokemonDialogState, setPokemonDialogState] = useState<boolean>(false);
  const [typeDialogState, setTypeDialogState] = useState<boolean>(false);
  const [regionDialogState, setRegionDialogState] = useState<boolean>(false);

  const [favoritePokemon, setFavoritePokemon] =
    useState<ShortViewPokemon | null>(null);

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<EntrenadorToBD>({
    nombre: '',
    email: '',
    contrasenia: '',
    region_preferida: null,
    tipo_preferido: null,
    pokemon_favorito: null,
  });

  const handleChange = (field: keyof EntrenadorToBD, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const pokemonToSave: PokemonToSaveInBD | null =
      convertShortToSaveDB(favoritePokemon);

    try {
      if (isLogin) {
        await login(formData.email, formData.contrasenia);
      } else {
        await register({
          nombre: formData.nombre,
          email: formData.email,
          contrasenia: formData.contrasenia,
          region_preferida: formData.region_preferida,
          tipo_preferido: formData.tipo_preferido,
          pokemon_favorito: pokemonToSave,
        });
      }
      navigate('/Home');
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.message ||
        'Error al conectar con la API o credenciales inválidas.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://proyecto-de-software-backend.onrender.com/oauth2/authorization/google';
  };

  return (
    <div className={styles.container}>
      {/* Dialog Pokémon */}
      <SelectPokemonDialog
        componentMode="single"
        isOpen={pokemonDialogState}
        setIsOpen={setPokemonDialogState}
        setFavoritePokemon={setFavoritePokemon}
      />

      {/* Dialog Región */}
      <SelectRegionDialog
        isOpen={regionDialogState}
        onClose={() => setRegionDialogState(false)}
        onSelectRegion={(region) => {
          handleChange('region_preferida', region.name);
        }}
      />

      {/* Dialog Tipo */}
      <SelectionTypeDialog
        isOpen={typeDialogState}
        types={Types}
        onClose={() => setTypeDialogState(false)}
        onSelectType={(typeName) => {
          handleChange('tipo_preferido', typeName);
        }}
      />

      {/* Pokémon Logo */}
      <h1 className={styles.logo}>POKEDEX</h1>

      {error && <div className={styles.error}>{error}</div>}

      {/* Auth Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>{isLogin ? 'Login' : 'Sign up'}</h2>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Campo Name (Solo Registro) */}
          {!isLogin && (
            <div className={styles.field}>
              <label>Name:</label>
              <input
                type="text"
                placeholder="Trainer Red"
                value={formData.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
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
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>

          {/* Campo Password */}
          <div className={styles.field}>
            <label>Password:</label>
            <input
              type="password"
              placeholder="*************"
              value={formData.contrasenia}
              onChange={(e) => handleChange('contrasenia', e.target.value)}
            />
          </div>

          {/* Campos de Registro Adicionales */}
          {!isLogin && (
            <>
              {/* Preferred Type (Dialog) */}
              <div className={styles.field}>
                <label>Preferred Type:</label>
                <button
                  type="button"
                  className={styles.fakeSelectButton}
                  onClick={() => setTypeDialogState(true)}
                >
                  {formData.tipo_preferido
                    ? formData.tipo_preferido.toUpperCase()
                    : '--- Select a type ---'}
                </button>
              </div>

              {/* Preferred Region (Dialog) */}
              <div className={styles.field}>
                <label>Preferred Region:</label>
                <button
                  type="button"
                  className={styles.fakeSelectButton}
                  onClick={() => setRegionDialogState(true)}
                >
                  {formData.region_preferida
                    ? formData.region_preferida.toUpperCase()
                    : '--- Select a region ---'}
                </button>
              </div>

              {/* Favorite Pokémon */}
              <div className={styles.field}>
                <label>Favorite Pokémon:</label>
                <button
                  type="button"
                  className={styles.fakeSelectButton}
                  onClick={() => setPokemonDialogState(true)}
                >
                  {favoritePokemon
                    ? favoritePokemon.name.toUpperCase()
                    : '--- Select a Pokémon ---'}
                </button>
              </div>
            </>
          )}

          {/* Switch form */}
          <div className={styles.swap}>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              disabled={loading}
            >
              {isLogin
                ? '¿Do not have an account yet?'
                : '¿Do you have an account?'}
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
          <button
            type="button"
            className={styles.googleBtn}
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="google"
            />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
