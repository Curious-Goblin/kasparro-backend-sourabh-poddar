import axios from "axios";
import { config } from "../../core/config.js";

export async function fetchCoinPaprikaCoins() {
  const response = await axios.get(
    "https://api.coinpaprika.com/v1/coins"
  );

  return response.data;
}
