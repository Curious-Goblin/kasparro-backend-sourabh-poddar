import { prisma } from "../core/db.js";
import { fetchCoinPaprikaCoins } from "./sources/coinpaprika.js";
import { fetchCoinGeckoCoins } from "./sources/coingecko.js";
import {
  normalizeCoinPaprika,
  normalizeCoinGecko,
} from "./transformer/normalize.js";
import { getCheckpoint, updateCheckpoint } from "./checkpoint.js";

export async function runETL() {
  console.log("ETL started");

  const run = await prisma.etlRun.create({
    data: {
      status: "running",
      recordsProcessed: 0,
    },
  });

  try {
    /* ---------------- CoinPaprika ---------------- */

    const paprikaCheckpoint = await getCheckpoint("coinpaprika");
    const paprikaCoins = await fetchCoinPaprikaCoins();

    let paprikaProcessed = 0;

    for (const coin of paprikaCoins) {
      const fetchedAt = new Date();

      if (fetchedAt <= paprikaCheckpoint) continue;

      await prisma.rawCoinPaprika.upsert({
        where: { externalId: coin.id },
        update: {
          payload: coin,
          fetchedAt: new Date(),
        },
        create: {
          externalId: coin.id,
          payload: coin,
        },
      });

      const normalized = normalizeCoinPaprika(coin);

      await prisma.normalizedCoin.upsert({
        where: {
          source_externalId: {
            source: normalized.source,
            externalId: normalized.externalId,
          },
        },
        update: {
          symbol: normalized.symbol,
          name: normalized.name,
          lastUpdated: normalized.lastUpdated,
        },
        create: normalized,
      });

      paprikaProcessed++;
    }

    await updateCheckpoint("coinpaprika", new Date());

    /* ---------------- CoinGecko ---------------- */

    const geckoCheckpoint = await getCheckpoint("coingecko");
    const geckoCoins = await fetchCoinGeckoCoins();

    let geckoProcessed = 0;

    for (const coin of geckoCoins) {
      const fetchedAt = new Date();

      if (fetchedAt <= geckoCheckpoint) continue;

      await prisma.rawCoinGecko.upsert({
        where: { externalId: coin.id },
        update: {
          payload: coin,
          fetchedAt: new Date(),
        },
        create: {
          externalId: coin.id,
          payload: coin,
        },
      });

      const normalized = normalizeCoinGecko(coin);

      await prisma.normalizedCoin.upsert({
        where: {
          source_externalId: {
            source: normalized.source,
            externalId: normalized.externalId,
          },
        },
        update: {
          symbol: normalized.symbol,
          name: normalized.name,
          lastUpdated: normalized.lastUpdated,
        },
        create: normalized,
      });

      geckoProcessed++;
    }

    await updateCheckpoint("coingecko", new Date());

    await prisma.etlRun.update({
      where: { id: run.id },
      data: {
        status: "success",
        finishedAt: new Date(),
        recordsProcessed: paprikaProcessed + geckoProcessed,
      },
    });

    console.log("ETL completed successfully");
  } catch (err) {
    await prisma.etlRun.update({
      where: { id: run.id },
      data: {
        status: "failed",
        finishedAt: new Date(),
        errorMessage: err.message,
      },
    });

    console.error("ETL failed:", err);
  }
}
