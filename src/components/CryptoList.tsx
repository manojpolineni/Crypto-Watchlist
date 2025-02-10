import { useState, useEffect } from "react";
import { useWatchlist } from "../context/WatchlistContext";
import { Crypto } from "../types"; 

interface CryptoCardProps {
  crypto: Crypto;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  const { addToWatchlist, watchlists } = useWatchlist();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const isAlreadyAdded = watchlists["My Watchlist"]?.some(
      (c) => c.symbol === crypto.symbol
    );
    setIsAdded(isAlreadyAdded);
  }, [watchlists, crypto.symbol]);

  const handleAddToWatchlist = () => {
    addToWatchlist("My Watchlist", crypto);
    setIsAdded(true);
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800">
      <h2 className="font-bold text-lg text-black dark:text-white">
        {crypto.name} ({crypto.symbol})
      </h2>
      <p className="text-green-500">💲 {crypto.lastPrice}</p>
      <p
        className={
          crypto.priceChangePercent.startsWith("-")
            ? "text-red-500"
            : "text-green-500"
        }
      >
        {crypto.priceChangePercent}%
      </p>
      <button
        className={`mt-2 flex cursor-pointer mx-auto w-1/2 ${
          isAdded ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
        } text-white px-4 py-2 rounded`}
        onClick={handleAddToWatchlist}
        disabled={isAdded}
      >
        {isAdded ? "Added to Watchlist ✅" : "Add to Watchlist"}
      </button>
    </div>
  );
};

export default CryptoCard;
