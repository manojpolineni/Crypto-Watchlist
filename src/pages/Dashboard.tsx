import { useEffect, useState, useMemo } from "react";
import { useWatchlist } from "../context/WatchlistContext";
import CryptoCard from "../components/CryptoCard";

interface CryptoData {
  s: string; // Symbol
  c: string; // Last price
  P: string; // Price change percentage
}

const Dashboard = () => {
  const { watchlists, removeFromWatchlist } = useWatchlist();
  const [cryptoPrices, setCryptoPrices] = useState<{
    [key: string]: { lastPrice: string; priceChangePercent: string };
  }>({});
  const [loading, setLoading] = useState(true); // ✅ Loading state

  useEffect(() => {
    const socket = new WebSocket("wss://stream.binance.com/ws/!ticker@arr");

    socket.onmessage = (event) => {
      const data: CryptoData[] = JSON.parse(event.data);
      if (!Array.isArray(data)) return;

      const newPriceMap: Record<
        string,
        { lastPrice: string; priceChangePercent: string }
      > = {};
      data.forEach((crypto) => {
        newPriceMap[crypto.s] = {
          lastPrice: parseFloat(crypto.c).toFixed(2),
          priceChangePercent: parseFloat(crypto.P).toFixed(2),
        };
      });

      setCryptoPrices((prev) =>
        JSON.stringify(prev) === JSON.stringify(newPriceMap)
          ? prev
          : newPriceMap
      );
      setLoading(false); // ✅ Hide spinner after first data update
    };

    return () => socket.close();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-5">📈 My Watchlist</h2>

      {loading ? ( // ✅ Show loading spinner while waiting for data
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {watchlists["My Watchlist"]?.length > 0 ? (
            watchlists["My Watchlist"].map((crypto) => {
              const memoizedCrypto = useMemo(
                () => ({
                  ...crypto,
                  lastPrice:
                    cryptoPrices[crypto.symbol]?.lastPrice || crypto.lastPrice,
                  priceChangePercent:
                    cryptoPrices[crypto.symbol]?.priceChangePercent ||
                    crypto.priceChangePercent,
                }),
                [cryptoPrices, crypto.symbol]
              );

              return (
                <CryptoCard
                  key={crypto.symbol}
                  crypto={memoizedCrypto}
                  isInWatchlist={true}
                  onAddToWatchlist={() => {}}
                  onRemoveFromWatchlist={() =>
                    removeFromWatchlist("My Watchlist", crypto.symbol)
                  }
                />
              );
            })
          ) : (
            <p className="text-gray-500">No cryptos in watchlist</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
