import React, { useState } from "react";
import ConfirmDeleteTeamDialog from "./components/ConfirmDeleteTeamDialog/ConfirmDeleteTeamDialog";

function App() {
  const [showDialog, setShowDialog] = useState(false);

  const handleConfirm = () => {
    alert("Equipo eliminado correctamente");
    setShowDialog(false);
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  return (
    <div>
      <button onClick={() => setShowDialog(true)}>Probar diálogo</button>

      {showDialog && (
        <ConfirmDeleteTeamDialog
          teamName="Equipo Pokémon"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default App;
