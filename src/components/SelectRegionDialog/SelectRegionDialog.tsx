import React, { useMemo, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { TbPokeball } from 'react-icons/tb';

import { Regions } from '@data/regions';
import { RegionData } from '@models/region';
import RegionCard from '@components/RegionCard/RegionCard';
import style from '@components/SelectRegionDialog/SelectRegionDialog.module.css';

type SelectRegionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectRegion: (region: RegionData) => void;
};

const SelectRegionDialog: React.FC<SelectRegionDialogProps> = ({
  isOpen,
  onClose,
  onSelectRegion,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRegions = useMemo(
    () =>
      Regions.filter((region) =>
        region.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  if (!isOpen) return null;

  return (
    <div className={style.backdrop} role="dialog" aria-modal="true">
      <div className={style.dialog}>
        {/* Header */}
        <header className={style.header}>
          <h2 className={style.title}>Select a Region</h2>
          <button
            type="button"
            className={style.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <MdClose className={style.closeIcon} />
          </button>
        </header>

        {/* Search bar */}
        <div className={style.searchWrapper}>
          <div className={style.searchInner}>
            <div className={style.searchIconBox}>
              <TbPokeball className={style.searchIcon} />
            </div>
            <input
              type="text"
              className={style.searchInput}
              placeholder="Pikachu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Grid of regions */}
        <section className={style.grid}>
          {filteredRegions.map((region) => (
            <RegionCard
              key={region.index}
              region={region}
              onClick={() => {
                onSelectRegion(region);
                onClose();
              }}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default SelectRegionDialog;
