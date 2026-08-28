type AddDatasetFormProps = {
  newDatasetName: string;
  onNameChange: (value: string) => void;
  onAddDataset: () => void;
  isLoading: boolean;
};

function AddDatasetForm({
  newDatasetName,
  onNameChange,
  onAddDataset,
  isLoading,
}: AddDatasetFormProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="Dataset name"
        value={newDatasetName}
        onChange={(event) => {
          onNameChange(event.target.value);
        }}
      />

      <button onClick={onAddDataset} disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Dataset"}
      </button>
    </div>
  );
}
export default AddDatasetForm;
