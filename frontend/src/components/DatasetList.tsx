import type { Dataset } from "../types/dataset";

type DatasetListProps = {
  datasets: Dataset[];
  isLoading: boolean;
};

function DatasetList({ datasets, isLoading }: DatasetListProps) {
  if (isLoading) {
    return <p>Loading datasets...</p>;
  }
  if (datasets.length === 0) {
    return (
      <div>
        <h2>Datasets</h2>
        <p>No datasets found.</p>
      </div>
    );
  }
  return (
    <div>
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
export default DatasetList;
