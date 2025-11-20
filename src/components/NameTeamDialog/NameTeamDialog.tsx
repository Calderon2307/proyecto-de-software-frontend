import React, { FC, useState } from "react";
import styles from "./NameTeamDialog.module.css";

interface Props {
  onConfirm: (teamName: string) => void;
}

const NameTeamDialog: FC<Props> = ({ onConfirm }) => {
  const [teamName, setTeamName] = useState("");

  return (
    <div className={styles.backdrop}>
      <div className={styles.dialog}>

        <div className={styles.header}>
          <h2 className={styles.title}>Dale un nombre a tu equipo</h2>
        </div>

        <div className={styles.body}>
          <input
            type="text"
            placeholder="Nombre del equipo"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.actions}>
          <button
            className={styles.confirmButton}
            onClick={() => onConfirm(teamName)}
          >
            Confirmar
          </button>
        </div>

      </div>
    </div>
  );
};

export default NameTeamDialog;
