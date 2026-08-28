import { useEffect, useState } from "react";
import { createDataset, getDatasets } from "./services/datasetApi";
import type { Dataset } from "./types/dataset";
import DatasetList from "./components/DatasetList";
import AddDatasetForm from "./components/AddDatasetForm";
import BackendStatus from "./components/BackendStatus";
import { getBackendStatus } from "./services/healthApi";

function App() {
  const [backendStatus, setBackendStatus] = useState("checking...");
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [newDatasetName, setNewDatasetName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAddingDataset, setIsAddingDataset] = useState(false);
  const [isLoadingDatasets, setIsLoadingDatasets] = useState(true);

  useEffect(() => {
    getBackendStatus()
      .then((data) => {
        setBackendStatus(data.status);
      })
      .catch((error) => {
        console.error("Backend request failed:", error);
        setBackendStatus("error");
      });
  }, []);

  useEffect(() => {
    getDatasets()
      .then((data) => {
        setDatasets(data);
      })
      .catch((error) => {
        console.error("Failed to load datasets:", error);
      })
      .finally(() => {
        setIsLoadingDatasets(false);
      });
  }, []);

  function handleAddDataset() {
    if (!newDatasetName.trim()) {
      return;
    }
    setErrorMessage("");
    setIsAddingDataset(true);

    createDataset(newDatasetName)
      .then((newDataset: Dataset) => {
        setDatasets((currentDatasets) => [...currentDatasets, newDataset]);

        setNewDatasetName("");
      })
      .catch((error) => {
        console.error("Failed to create dataset:", error);
        setErrorMessage("Failed to create dataset. Please try again.");
      })
      .finally(() => {
        setIsAddingDataset(false);
      });
  }

  return (
    <div>
      <h1>Data Quality Platform</h1>

      <BackendStatus status={backendStatus} />
      <AddDatasetForm
        newDatasetName={newDatasetName}
        onNameChange={setNewDatasetName}
        onAddDataset={handleAddDataset}
        isLoading={isAddingDataset}
      />
      {errorMessage && <p>{errorMessage}</p>}

      <DatasetList datasets={datasets} isLoading={isLoadingDatasets} />
    </div>
  );
}

export default App;
