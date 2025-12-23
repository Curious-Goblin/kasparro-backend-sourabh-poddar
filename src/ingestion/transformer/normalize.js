export function normalizeCoinPaprika(raw) {
  return {
    source: "coinpaprika",
    externalId: raw.id,
    symbol: raw.symbol,
    name: raw.name,
    lastUpdated: new Date(),
  };
}


export function normalizeCoinGecko(raw) {
  return {
    source: "coingecko",
    externalId: raw.id,
    symbol: raw.symbol.toUpperCase(),
    name: raw.name,
    lastUpdated: new Date(),
  };
}
