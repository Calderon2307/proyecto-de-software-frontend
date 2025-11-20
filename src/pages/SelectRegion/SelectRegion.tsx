import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Header from '@components/Header/Header';
import SelectRegionDialog from '@components/SelectRegionDialog/SelectRegionDialog';
import { RegionData } from '@models/region';

import faviconIcon from '@assets/icons/Favicon.png';

import style from '@pages/SelectRegion/SelectRegion.module.css';

const SelectRegionPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleSelectRegion = (region: RegionData) => {
    setSelectedRegion(region);
  };

  // 🔜 Aquí luego llamaremos al backend (update/registro entrenador)
  const handleContinue = () => {
    if (!selectedRegion) {
      alert('Please select a region first.');
      return;
    }

    // TODO: reemplazar por llamada a servicio del backend
    // trainerService.updateRegion(selectedRegion.name) ...
    console.log('Selected region to send to backend:', selectedRegion.name);
  };

  return (
    <>
      <Helmet>
        <title>Select Region | Register</title>
        <link rel="shortcut icon" href={faviconIcon} />
      </Helmet>

      {/* Header general de la app */}
      <Header mode="complete" />

      {/* Fondo tipo ComparePokemon */}
      <main className={style.wrapperBody}>
        <section className={style.card}>
          <h1 className={style.title}>Select a Region</h1>
          <p className={style.subtitle}>
            Choose the region where your trainer comes from. You can change this later in your profile.
          </p>

          {/* Input de región seleccionada */}
          <div className={style.fieldGroup}>
            <label className={style.label}>Region</label>
            <button
              type="button"
              className={style.regionInput}
              onClick={handleOpenDialog}
            >
              <span className={style.regionText}>
                {selectedRegion ? selectedRegion.name : 'Click to select a region'}
              </span>
            </button>
          </div>

          {/* Botones de acción (por ahora solo Continue) */}
          <div className={style.actions}>
            <button
              type="button"
              className={style.primaryBtn}
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </section>

        {/* Dialog de selección de región */}
        <SelectRegionDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onSelectRegion={handleSelectRegion}
        />
      </main>
    </>
  );
};

export default SelectRegionPage;
