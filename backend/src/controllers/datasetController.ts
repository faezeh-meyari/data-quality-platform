import type { Request, Response } from "express";
import type { Dataset } from "../types/dataset.js";

const datasets: Dataset[] = [
  {
    id: 1,
    name: "customers.csv",
    status: "completed",
  },
  {
    id: 2,
    name: "orders.csv",
    status: "pending",
  },
];

export function getDatasets(_req: Request, res: Response) {
  res.json(datasets);
}

export function createDataset(req: Request, res: Response) {
  const { name } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      message: "Dataset name is required",
    });
  }
  const newDataset: Dataset = {
    id: datasets.length + 1,
    name: name.trim(),
    status: "pending",
  };

  datasets.push(newDataset);

  res.status(201).json(newDataset);
}
