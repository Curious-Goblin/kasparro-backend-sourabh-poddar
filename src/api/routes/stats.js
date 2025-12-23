import express from "express";
import { prisma } from "../../core/db.js";

export const statsRouter = express.Router();

statsRouter.get("/", async (req, res) => {
  const lastRun = await prisma.etlRun.findFirst({
    orderBy: { startedAt: "desc" },
  });

  const totalRuns = await prisma.etlRun.count();

  res.json({
    total_runs: totalRuns,
    last_run: lastRun,
  });
});
