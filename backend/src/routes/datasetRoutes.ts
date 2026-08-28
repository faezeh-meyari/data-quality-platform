import { Router } from "express";
import {
  createDataset,
  getDatasets,
} from "../controllers/datasetController.js";

const router = Router();

router.get("/", getDatasets);

router.post("/", createDataset);

export default router;
