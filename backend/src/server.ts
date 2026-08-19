import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

const PORT = 3000;
const datasets = [
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

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

app.get("/api/datasets", (_req, res) => {
  res.json(datasets);
});
app.post("/api/datasets", (req, res) => {
  const newDataset = {
    id: datasets.length + 1,
    name: req.body.name,
    status: "pending",
  };

  datasets.push(newDataset);

  res.status(201).json(newDataset);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
