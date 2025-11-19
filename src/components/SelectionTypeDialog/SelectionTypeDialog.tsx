import React from 'react';
import { TypeData } from '@models/types';
import style from '@components/SelectionTypeDialog/SelectionTypeDialog.module.css';
import SearchBar from '@components/SearchBar/SearchBar';
import TypeButton from '@components/TypeButton/TypeButton';

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
                                                                 }): React.JSX.Element | null => {
  if (!isOpen) {
    return null;
  }
  console.log('types en modal:', types);
  return (
    <div className={style.backdrop}>
      <div className={style.dialog}>
        <header className={style.header}>
          <h2 className={style.title}>Select one Type</h2>

          <button
            type="button"
            onClick={onClose}
            className={style.closeButton}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </header>

        <main>
          <SearchBar showButton={false} />

          <div className={style.typesGrid}>
            {types.map((type) => (
              <TypeButton
                key={type.name}
                name={type.name}
                logo={type.logo}
              />
            ))}
          </div>
        </main>

      </div>
    </div>
  );
};

export default SelectionTypeDialog;
