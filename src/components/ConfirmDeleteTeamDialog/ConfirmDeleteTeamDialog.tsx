import React from "react";
import styles from "./ConfirmDeleteTeamDialog.module.css";

interface Props {
  teamName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteTeamDialog: React.FC<Props> = ({
                                                    teamName,
                                                    onConfirm,
                                                    onCancel,
                                                  }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialogBox}>
        <div className={styles.header}>¿Eliminar el equipo?</div>

        <div className={styles.content}>
          <p className={styles.message}>
            Estás por eliminar el equipo <strong>{teamName}</strong>.
            <br />
            ¿Deseas continuar?
          </p>

          <div className={styles.buttonsContainer}>
            <button className={styles.confirmButton} onClick={onConfirm}>
              Confirmar
            </button>

            <button className={styles.cancelButton} onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteTeamDialog;
