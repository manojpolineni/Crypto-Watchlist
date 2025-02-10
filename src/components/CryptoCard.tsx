import { CryptoCardProps } from "../types";

const CryptoCard: React.FC<CryptoCardProps> = ({
  crypto,
  isInWatchlist,
  onAddToWatchlist,

}) => {
  return (
    <div className="p-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800">
      <h2 className="font-bold text-lg text-black dark:text-white">
        {crypto.name} ( {crypto.symbol.slice(0,3)})
      </h2>
      <p className="text-green-500"> 💲 {crypto.lastPrice}</p>
      
      <p
        className={`font-semibold ${
          parseFloat(crypto.priceChangePercent) < 0
            ? "text-red-500"
            : "text-green-500"
        }`}
      >
        📈 24h:  {crypto.priceChangePercent}%
      </p>

      {isInWatchlist ? (
        <button className="mt-2  bg-blue-500 text-white px-4 py-2 rounded w-full">
          Added
        </button>
      ) : (
        <button
          className="mt-2 bg-blue-400 flex justify-center mx-auto cursor-pointer text-white px-4 py-2 rounded w-auto"
          onClick={onAddToWatchlist}
          >
            
          Add to Watchlist
        </button>
      )}
      
    </div>
  );
};

export default CryptoCard;
