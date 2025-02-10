import axios from "axios";
import { Crypto } from "../types";

const BASE_URL = "https://api.binance.com/api/v3/ticker/24hr";

export const fetchCryptoPrices = async (page: number): Promise<Crypto[]> => {
  console.log(`Fetching crypto prices for page ${page}...`); 

  try {
    const response = await axios.get(BASE_URL);

    console.log("✅ Binance API Response:", response.data.length, "items received");

    const start = (page - 1) * 100;
    const end = start + 50;

    const formattedData = response.data.slice(start, end).map((crypto: any) => ({
      name: crypto.symbol,
      symbol: crypto.symbol,
      lastPrice: parseFloat(crypto.lastPrice).toFixed(2),
      priceChangePercent: parseFloat(crypto.priceChangePercent).toFixed(2),
    }));

    console.log("✅ Processed Data:", formattedData.length, "items formatted");

    return formattedData;
  } catch (error: any) {
    console.error("❌ Error fetching crypto data:", error?.message || error);
    return [];
  }
};
