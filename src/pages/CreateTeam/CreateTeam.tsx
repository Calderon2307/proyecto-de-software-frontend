import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '@/hooks/useWindowSize';
import Header from '@components/Header/Header';
import SelectPokemonBtn from '@components/SelectPokemonBtn/SelectPokemonBtn';
import PokemonSummaryView from '@components/PokemonSummaryView/PokemonSummaryView';
import { capitalizeText } from '@utils/formatText';
import { ShortViewPokemon } from '@models/pokemon';
import { createEquipo } from '@/services/EquipoService/equipoService';
import { getEntrenadorIdByEmail } from '@/services/EquipoService/equipoService';
import closeIconLight from '@assets/icons/closeLight.png';
import faviconIcon from '@assets/icons/Favicon_Alt.png';
import style from '@pages/CreateTeam/CreateTeam.module.css';
import SelectPokemonDialog from '@components/SelectPokemonDialog/SelectPokemonDialog.tsx';
import NameTeamDialog from "@components/NameTeamDialog/NameTeamDialog";

const CreateTeam = () => {
  const { width } = useWindowSize();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  console.log('🔍 User desde useAuth:', user);
  console.log('🔍 Email del user:', user?.email);
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showNameDialog, setShowNameDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [entrenadorId, setEntrenadorId] = useState<number | null>(null);

  const [teamArr, setTeamArr] = useState<(ShortViewPokemon | null)[]>(() => {
    const storedTeam = localStorage.getItem('PokemonTeam');
    return storedTeam ? JSON.parse(storedTeam) : new Array(6).fill(null);
  });

  const [showShiny, setShowShiny] = useState<boolean>(false);
  const [idSelected, setIdSelected] = useState<number>(-1);

  // 🛑 Obtener ID del entrenador cuando se monta el componente
  useEffect(() => {
    const fetchEntrenadorId = async () => {
      console.log('🔍 useEffect - user:', user);
      console.log('🔍 useEffect - user?.email:', user?.email);
      
      if (user?.email) {
        try {
          console.log('🚀 Llamando a getEntrenadorIdByEmail con:', user.email);
          const id = await getEntrenadorIdByEmail(user.email);
          console.log('✅ ID del entrenador obtenido:', id);
          setEntrenadorId(id);
        } catch (error) {
          console.error('❌ Error al obtener ID del entrenador:', error);
        }
      } else {
        console.warn('⚠️ No hay email de usuario disponible');
      }
    };

    fetchEntrenadorId();
  }, [user?.email]);

  let pokemonViewSize: 'normal' | 'medium' | 'small' = 'normal';

  if (width > 615 && width <= 1024) {
    pokemonViewSize = 'medium';
  } else if (width <= 615) {
    pokemonViewSize = 'small';
  }

  const handleDialogOpen = (index: number) => {
    setIsOpen(true);
    setIdSelected(index);
  };

  const handleDeletePokemon = (indexSelected: number) => {
    const newTeamArr: (ShortViewPokemon | null)[] = teamArr.map(
      (item: ShortViewPokemon | null, index: number) => {
        if (indexSelected === index) return null;
        else return item;
      }
    );
    setTeamArr(newTeamArr);
  };

  const handleSaveTeam = () => {
    console.log('🔍 handleSaveTeam - entrenadorId:', entrenadorId);
    if (!teamComplete) {
      setShowNameDialog(true);
    }
  };

  // 🛑 CONECTAR CON EL BACKEND
  const handleConfirmTeamName = async (name: string) => {
    console.log('🔍 handleConfirmTeamName - Iniciando...');
    console.log('🔍 entrenadorId:', entrenadorId);
    console.log('🔍 nombre del equipo:', name);
    console.log('🔍 teamArr:', teamArr);
    
    if (!entrenadorId) {
      console.error('❌ No hay entrenadorId');
      alert('No se pudo obtener el ID del entrenador');
      return;
    }

    setLoading(true);
    try {
      // Mapear ShortViewPokemon a PokemonRequest
      const equipoPokemon = teamArr
        .filter((pokemon): pokemon is ShortViewPokemon => pokemon !== null)
        .map((pokemon) => ({
          nombre: pokemon.name,
          tipos: pokemon.types,
          stats: pokemon.stats || [],
          sprite_normal: pokemon.sprites.normal,
          sprite_shiny: pokemon.sprites.shiny,
        }));

      console.log('🔍 equipoPokemon mapeado:', equipoPokemon);

      // Crear el objeto EquipoRequest
      const equipoData = {
        id_entrenador: entrenadorId,
        nombre_equipo: name,
        equipo_pokemon: equipoPokemon,
      };

      console.log('📦 Datos del equipo a enviar:', JSON.stringify(equipoData, null, 2));

      // Enviar al backend
      const response = await createEquipo(equipoData);
      console.log('✅ Respuesta del backend:', response);

      // Limpiar equipo y cerrar modal
      setTeamArr(new Array(6).fill(null));
      setShowNameDialog(false);
      localStorage.removeItem('PokemonTeam');

      // Redirigir al perfil
      navigate('/entrenador-profile');
    } catch (error: any) {
      console.error('❌ Error al guardar equipo:', error);
      console.error('❌ Error response:', error.response);
      console.error('❌ Error data:', error.response?.data);
      alert('Error al guardar el equipo: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const teamComplete = teamArr.includes(null);

  return (
    <>
      <Helmet>
        <title>Create Pokémon Team | POKÉDEX</title>
        <link rel="shortcut icon" href={faviconIcon} type="image/x-icon" />
      </Helmet>

      <SelectPokemonDialog
        componentMode={'team'}
        idSelected={idSelected}
        isOpen={isOpen}
        teamArr={teamArr}
        setIsOpen={setIsOpen}
        setTeamArr={setTeamArr}
      />

      {showNameDialog && (
        <NameTeamDialog
          onConfirm={handleConfirmTeamName}
          onClose={() => setShowNameDialog(false)}
          isLoading={loading}
        />
      )}

      <Header mode={'complete'} showSearchBar={false} />

      <article className={`${style.contentSection}`}>
        <h2 className={`${style.title}`}>Build your Team</h2>

        <button
          onClick={() => setShowShiny(!showShiny)}
          disabled={teamComplete}
          className={`${style.shinyButton} ${showShiny ? style.shinyActive : ''}`}
          title={`Show ${showShiny ? 'normal version' : 'shiny version'}`}
        >
          {showShiny ? 'Normal version' : 'Shiny version'}
        </button>

        <section className={`${style.teamWrapper}`}>
          {teamArr.map((item: ShortViewPokemon | null, index: number) => {
            if (item === null) {
              return (
                <SelectPokemonBtn
                  key={index}
                  onClick={() => handleDialogOpen(index)}
                />
              );
            } else {
              const formatedName = capitalizeText(item.name);

              return (
                <article key={index} className={`${style.selectedPokemonWrapper}`}>
                  <button
                    className={`${style.closeBtn}`}
                    onClick={() => handleDeletePokemon(index)}
                    title={`Delete ${formatedName} from your team?`}
                  >
                    <img
                      src={closeIconLight}
                      alt="Close Icon"
                      className={`${style.iconClose}`}
                    />
                  </button>
                  <PokemonSummaryView
                    name={item.name}
                    sprites={item.sprites}
                    types={item.types}
                    isShiny={showShiny}
                    size={pokemonViewSize}
                  />
                </article>
              );
            }
          })}
        </section>

        <section className={`${style.saveBtnSection}`}>
          <button
            onClick={handleSaveTeam}
            disabled={teamComplete || loading}
            className={`${style.saveBtn}`}
            title={`Are you sure to save this team?`}
          >
            {loading ? 'Guardando...' : 'Save Team'}
          </button>
        </section>
      </article>
    </>
  );
};

export default CreateTeam;