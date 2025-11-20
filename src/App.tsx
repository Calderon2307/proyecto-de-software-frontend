import { useState } from "react";
import NameTeamDialog from "./components/NameTeamDialog/NameTeamDialog";

function App() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div>
      <button onClick={() => setShowDialog(true)}>
        Probar NameTeamDialog
      </button>

      {showDialog && (
        <NameTeamDialog
          onConfirm={(name) => {
            alert("Nombre del equipo: " + name);
            setShowDialog(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
