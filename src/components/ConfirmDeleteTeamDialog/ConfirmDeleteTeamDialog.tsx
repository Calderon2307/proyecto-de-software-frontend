import React from 'react';
import styles from './ConfirmDeleteTeamDialog.module.css';

interface ConfirmDeleteTeamDialogProps {
  isOpen: boolean;
  teamName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteTeamDialog: React.FC<ConfirmDeleteTeamDialogProps> = ({
                                                                           isOpen,
                                                                           teamName,
                                                                           onConfirm,
                                                                           onCancel
                                                                         }) => {
  if (!isOpen) return null;

  return (
    <dialog open className={styles.dialog}>
      <div className={styles.container}>
        <h2 className={styles.title}>Eliminar equipo</h2>

        <p className={styles.message}>
          {teamName
            ? `¿Estás seguro que deseas eliminar el equipo “${teamName}”?`
            : "¿Estás seguro que deseas eliminar este equipo?"}
        </p>

        <div className={styles.buttonRow}>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Eliminar
          </button>

          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmDeleteTeamDialog;


//import ConfirmDeleteTeamDialog from '@components/ConfirmDeleteTeamDialog/ConfirmDeleteTeamDialog';