/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `RawCoinGecko` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[externalId]` on the table `RawCoinPaprika` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "RawCoinGecko_externalId_idx";

-- DropIndex
DROP INDEX "RawCoinPaprika_externalId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "RawCoinGecko_externalId_key" ON "RawCoinGecko"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "RawCoinPaprika_externalId_key" ON "RawCoinPaprika"("externalId");
