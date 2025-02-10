interface CryptoCardProps {
  crypto: {
    symbol: string;
    lastPrice: string;
    priceChangePercent: string;
  };
  isInWatchlist: boolean; 
  onAddToWatchlist?: () => void;
  onRemoveFromWatchlist?: () => void;
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  crypto,
  isInWatchlist,
  onAddToWatchlist,
  onRemoveFromWatchlist,
}) => {
  return (
    <div className="border p-4 rounded-md shadow-md bg-white">
      <h3 className="text-lg font-semibold">{crypto.symbol}</h3>
      <p className="text-gray-600">
        Price: ${parseFloat(crypto.lastPrice).toFixed(2)}
      </p>
      <p
        className={`${
          parseFloat(crypto.priceChangePercent) >= 0
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {parseFloat(crypto.priceChangePercent).toFixed(2)}%
      </p>

      {!isInWatchlist && onAddToWatchlist && (
        <button
          onClick={onAddToWatchlist}
          className="mt-2 bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-md"
        >
          Add to Watchlist
        </button>
      )}

      {isInWatchlist && onRemoveFromWatchlist && (
        <button
          onClick={onRemoveFromWatchlist}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default CryptoCard;
