import { prisma } from "../core/db.js";

export async function getCheckpoint(source) {
  const checkpoint = await prisma.etlCheckpoint.findUnique({
    where: { source },
  });

  return checkpoint?.lastProcessedAt ?? new Date(0);
}

export async function updateCheckpoint(source, time) {
  await prisma.etlCheckpoint.upsert({
    where: { source },
    update: { lastProcessedAt: time },
    create: {
      source,
      lastProcessedAt: time,
    },
  });
}
