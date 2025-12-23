import axios from "axios";

export async function fetchCoinGeckoCoins() {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/list"
  );

  return response.data;
}
