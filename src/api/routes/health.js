import express from "express";
import { prisma } from "../../core/db.js";

export const healthRouter = express.Router();

healthRouter.get("/", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    const lastRun = await prisma.etlRun.findFirst({
      orderBy: { startedAt: "desc" },
    });

    res.json({
      status: "ok",
      db: "connected",
      last_etl_status: lastRun?.status ?? "never_run",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      db: "disconnected",
    });
  }
});
