import { useState } from 'react';
import SelectRegionDialog from '../../components/SelectRegionDialog/SelectRegionDialog';
import { RegionData } from '../../models/region';

const PreviewRegion = () => {
  const [open, setOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Preview Region Dialog</h2>

      {/* Input que muestra la región seleccionada */}
      <input
        style={{
          padding: "0.5rem 1rem",
          width: "250px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "1rem",
        }}
        readOnly
        value={selectedRegion ? selectedRegion.name : ""}
        placeholder="Select region…"
      />

      <br />

      {/* Botón para abrir el dialog */}
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          backgroundColor: "#4CAF50",
          color: "white",
          cursor: "pointer",
          border: "none",
          fontWeight: "600",
        }}
      >
        Open Region Dialog
      </button>

      {/* Dialog */}
      <SelectRegionDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        onSelectRegion={(region) => setSelectedRegion(region)}
      />
    </div>
  );
};

export default PreviewRegion;
