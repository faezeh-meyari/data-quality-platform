import { useEffect, useState } from "react";

type Dataset = {
  id: number;
  name: string;
  status: string;
};

function App() {
  const [backendStatus, setBackendStatus] = useState("checking...");
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [newDatasetName, setNewDatasetName] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/health")
      .then((response) => response.json())
      .then((data) => {
        setBackendStatus(data.status);
      })
      .catch((error) => {
        console.error("Backend request failed:", error);
        setBackendStatus("error");
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/datasets")
      .then((response) => response.json())
      .then((data) => setDatasets(data))
      .catch((error) => {
        console.error("Failed to load datasets:", error);
      });
  }, []);

  function handleAddDataset() {
    if (!newDatasetName.trim()) {
      return;
    }

    fetch("http://localhost:3000/api/datasets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newDatasetName,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create dataset");
        }

        return response.json();
      })
      .then((newDataset: Dataset) => {
        setDatasets((currentDatasets) => [...currentDatasets, newDataset]);

        setNewDatasetName("");
      })
      .catch((error) => {
        console.error("Failed to create dataset:", error);
      });
  }

  return (
    <div>
      <h1>Data Quality Platform</h1>

      <p>Backend status: {backendStatus}</p>
      <div>
        <input
          type="text"
          placeholder="Dataset name"
          value={newDatasetName}
          onChange={(event) => {
            setNewDatasetName(event.target.value);
          }}
        />

        <button onClick={handleAddDataset}>Add Dataset</button>
      </div>

      <h2>Datasets</h2>
      <ul>
        {datasets.map((dataset) => (
          <li key={dataset.id}>
            {dataset.name} - {dataset.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
