import { useEffect, useState } from "react";

import { useWatchlist } from "../context/WatchlistContext";
import { Crypto } from "../types";
import { useTheme } from "../context/ThemeContext";
import CryptoCard from "../components/CryptoCard";

const CryptoListPage = () => {
  const { addToWatchlist, removeFromWatchlist } = useWatchlist();
  const [search, setSearch] = useState("");
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const socket = new WebSocket("wss://stream.binance.com/ws/!ticker@arr");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (!Array.isArray(data)) return;

      const updatedCryptos = data.map((crypto) => ({
        id: crypto.s, 
        symbol: crypto.s, 
        name: crypto.s.replace("USDT", ""), 
        lastPrice: parseFloat(crypto.c).toFixed(2), 
        priceChangePercent: parseFloat(crypto.P).toFixed(2), 
      }));

      setCryptos(updatedCryptos);
    };

    return () => socket.close();
  }, []);


  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(search.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5">
      <input
        type="text"
        placeholder="Search Cryptos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`w-full p-2 border mb-10 pl-5 focus:outline-0 placeholder:text-gray-900 border-gray-400 rounded-full ${
          theme === "dark" ? "placeholder:text-white " : " "
        } `}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCryptos.length > 0 ? (
          filteredCryptos.map((crypto) => (
            <CryptoCard
              key={crypto.symbol}
              crypto={crypto}
              isInWatchlist={false} 
              onAddToWatchlist={() => addToWatchlist(crypto.symbol, crypto)}
              onRemoveFromWatchlist={() => removeFromWatchlist(crypto.symbol, crypto.id)}
            />
          ))
        ) : (
          <p className="text-center ">No cryptos available</p>
        )}
      </div>
    </div>
  );
};

export default CryptoListPage;
