import React from "react";
import styles from "./NameTeamDialog.module.css";

interface NameTeamDialogProps {
  isOpen: boolean;
  teamName: string;
  onChangeName: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const NameTeamDialog: React.FC<NameTeamDialogProps> = ({
                                                         isOpen,
                                                         teamName,
                                                         onChangeName,
                                                         onConfirm,
                                                         onCancel
                                                       }) => {
  if (!isOpen) return null;

  return (
    <dialog open className={styles.dialog}>
      <div className={styles.container}>
        <div className={styles.header}>Dale un nombre a tu equipo</div>

        <div className={styles.body}>
          <input
            type="text"
            className={styles.inputBox}
            placeholder="Equipo Pokémon"
            value={teamName}
            onChange={(e) => onChangeName(e.target.value)}
          />
        </div>

        <div className={styles.footer}>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Confirmar
          </button>

          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default NameTeamDialog;
