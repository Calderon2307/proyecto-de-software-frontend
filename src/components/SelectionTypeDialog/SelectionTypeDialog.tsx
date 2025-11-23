import React from 'react';
import { TypeData } from '@models/types';
import style from '@components/SelectionTypeDialog/SelectionTypeDialog.module.css';
import SearchBar from '@components/SearchBar/SearchBar';

interface SelectionTypeDialogProps {
  isOpen: boolean;
  types: TypeData[];
  onClose: () => void;
  onSelectType: (typeName: string) => void;
}

const SelectionTypeDialog: React.FC<SelectionTypeDialogProps> = ({
  isOpen,
  types,
  onClose,
  onSelectType,
}) => {
  if (!isOpen) return null;

  return (
    <div className={style.backdrop} role="dialog" aria-modal="true">
      <div className={style.dialog}>
        {/* Header */}
        <header className={style.header}>
          <h2 className={style.title}>Select a Type</h2>
          <button
            type="button"
            className={style.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </header>

        {/* Texto descriptivo (opcional) */}
        <p className={style.contentText}>
          Choose your preferred Pokémon type. This will be saved in your trainer
          profile.
        </p>

        {/* Barra de búsqueda visual (usa SearchContext internamente, aquí solo es estética) */}
        <SearchBar showButton={false} />

        {/* Grid de tipos */}
        <div className={style.typesGrid}>
          {types.map((type) => (
            <button
              key={type.name}
              type="button"
              className={`${type.name} ${style.typeCard}`}
              onClick={() => {
                onSelectType(type.name);
                onClose();
              }}
            >
              <div className={style.typeLogoWrapper}>
                <img
                  src={type.logo}
                  alt={`${type.name} type logo`}
                  className={style.typeLogo}
                />
              </div>
              <span className={style.typeName}>
                {type.name.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectionTypeDialog;
