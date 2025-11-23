import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useWindowSize from '@/hooks/useWindowSize';
import Header from '@components/Header/Header';
import SelectPokemonBtn from '@components/SelectPokemonBtn/SelectPokemonBtn';
import PokemonSummaryView from '@components/PokemonSummaryView/PokemonSummaryView';
import { capitalizeText } from '@utils/formatText';
import { ShortViewPokemon } from '@models/pokemon';
import closeIconLight from '@assets/icons/closeLight.png';
import faviconIcon from '@assets/icons/Favicon_Alt.png';
import style from '@pages/CreateTeam/CreateTeam.module.css';
import SelectPokemonDialog from '@components/SelectPokemonDialog/SelectPokemonDialog.tsx';
import NameTeamDialog from "@components/NameTeamDialog/NameTeamDialog";
import { convertShortToSaveDB } from "@/utils/shortInfoPokemonToDB";
import { useAuth } from "@/contexts/AuthContext";
import { createTeamService } from "@/services/TeamServices/createTeamService";

const CreateTeam = () => {
  const { width } = useWindowSize();

  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showNameDialog, setShowNameDialog] = useState<boolean>(false);

  const [teamArr, setTeamArr] = useState<(ShortViewPokemon | null)[]>(() => {
    const storedTeam = localStorage.getItem('PokemonTeam');
    return storedTeam ? JSON.parse(storedTeam) : new Array(6).fill(null);
  });

  const [showShiny, setShowShiny] = useState<boolean>(false);
  const [idSelected, setIdSelected] = useState<number>(-1);

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

  // NUEVO: al presionar Save Team → abrir el modal
  const handleSaveTeam = () => {
    if (!teamComplete) {
      setShowNameDialog(true);
    }
  };

  const handleConfirmTeamName = async (teamName: string) => {
    try {
      if (!user || !user.id) {
        alert("No se encontró el usuario autenticado.");
        return;
      }

      // Convertir cada Pokémon
      const convertedTeam = teamArr
        .filter((p) => p !== null)
        .map((p) => convertShortToSaveDB(p));

      if (convertedTeam.length === 0) {
        alert("Selecciona al menos un Pokémon para crear el equipo.");
        return;
      }

      const body = {
        id_entrenador: user.id,
        nombre_equipo: teamName,
        equipo_pokemon: convertedTeam,
      };

      console.log(" Enviando equipo al backend:", body);

      const response = await createTeamService(body);

      console.log(" Equipo creado exitosamente:", response);

      alert("Equipo creado con éxito!");

      // Limpiar equipo
      setTeamArr(new Array(6).fill(null));

      // Cerrar modal
      setShowNameDialog(false);

    } catch (error: any) {
      console.error(" Error al crear equipo:", error);
      alert("Error al crear equipo: " + (error.response?.data?.message || "Revisa la consola"));
    }
  };

  const teamComplete = teamArr.includes(null);

  return (
    <>
      <Helmet>
        <title>Create Pokémon Team | POKÉDEX</title>
        <link rel="shortcut icon" href={faviconIcon} type="image/x-icon" />
      </Helmet>

      {/* Diálogo para seleccionar Pokémon */}
      <SelectPokemonDialog
        componentMode={'team'}
        idSelected={idSelected}
        isOpen={isOpen}
        teamArr={teamArr}
        setIsOpen={setIsOpen}
        setTeamArr={setTeamArr}
      />

      {/* Modal para nombrar el equipo */}
      {showNameDialog && (
        <NameTeamDialog
          onConfirm={handleConfirmTeamName}
          onClose={() => setShowNameDialog(false)}
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
            disabled={teamComplete}
            className={`${style.saveBtn}`}
            title={`Are you sure to save this team?`}
          >
            Save Team
          </button>
        </section>
      </article>
    </>
  );
};

export default CreateTeam;
