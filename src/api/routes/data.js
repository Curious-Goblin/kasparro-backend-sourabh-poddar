import express from "express";
import { prisma } from "../../core/db.js";
import crypto from "crypto";

export const dataRouter = express.Router();

dataRouter.get("/", async (req, res) => {
  const start = Date.now();
  const requestId = crypto.randomUUID();

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const source = req.query.source;

  const skip = (page - 1) * limit;

  const where = source ? { source } : {};

  const [data, total] = await Promise.all([
    prisma.normalizedCoin.findMany({
      where,
      skip,
      take: limit,
      orderBy: { lastUpdated: "desc" },
    }),
    prisma.normalizedCoin.count({ where }),
  ]);

  const latency = Date.now() - start;

  res.json({
    request_id: requestId,
    api_latency_ms: latency,
    pagination: {
      page,
      limit,
      total,
    },
    data,
  });
});
