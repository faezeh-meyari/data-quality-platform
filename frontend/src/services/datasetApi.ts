import type { Dataset } from "../types/dataset";

export function getDatasets() {
  return fetch("http://localhost:3000/api/datasets").then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load datasets");
    }

    return response.json();
  });
}

export function createDataset(name: string) {
  return fetch("http://localhost:3000/api/datasets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to create dataset");
    }

    return response.json();
  });
}
