-- CreateTable
CREATE TABLE "RawCoinPaprika" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RawCoinPaprika_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RawCoinGecko" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RawCoinGecko_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NormalizedCoin" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "marketCap" DOUBLE PRECISION,
    "priceUsd" DOUBLE PRECISION,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NormalizedCoin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EtlCheckpoint" (
    "source" TEXT NOT NULL,
    "lastProcessedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EtlCheckpoint_pkey" PRIMARY KEY ("source")
);

-- CreateTable
CREATE TABLE "EtlRun" (
    "id" SERIAL NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "recordsProcessed" INTEGER NOT NULL,
    "errorMessage" TEXT,

    CONSTRAINT "EtlRun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RawCoinPaprika_externalId_idx" ON "RawCoinPaprika"("externalId");

-- CreateIndex
CREATE INDEX "RawCoinGecko_externalId_idx" ON "RawCoinGecko"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "NormalizedCoin_source_externalId_key" ON "NormalizedCoin"("source", "externalId");
