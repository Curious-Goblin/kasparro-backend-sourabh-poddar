import express from "express";
import { healthRouter } from "./routes/health.js";
import { dataRouter } from "./routes/data.js";
import { statsRouter } from "./routes/stats.js";

export const app = express();

app.use(express.json());

app.use("/health", healthRouter);
app.use("/data", dataRouter);
app.use("/stats", statsRouter);