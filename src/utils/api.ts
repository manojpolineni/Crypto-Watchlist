import axios from "axios";
import { Crypto } from "../types";

const BASE_URL = "https://api.binance.com/api/v3/ticker/24hr";

export const fetchCryptoPrices = async (page: number): Promise<Crypto[]> => {
  try {
    const response = await axios.get(BASE_URL);

    const start = (page - 1) * 50;
    const end = start + 50;

    // Ensure unique keys by combining multiple properties
    const formattedData = response.data.slice(start, end).map((crypto: any) => ({
      id: `${crypto.symbol}-${crypto.priceChangePercent}-${Math.random().toString(36).substr(2, 5)}`, // Unique key
      name: crypto.symbol,
      symbol: crypto.symbol,
      lastPrice: parseFloat(crypto.lastPrice).toFixed(2),
      priceChangePercent: parseFloat(crypto.priceChangePercent).toFixed(2),
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return [];
  }
};
