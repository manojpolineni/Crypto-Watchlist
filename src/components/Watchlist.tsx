import { useWatchlist } from "../context/WatchlistContext";

const Watchlist = () => {
  const { watchlists, removeFromWatchlist, removeWatchlist } = useWatchlist();

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Your Watchlists</h2>

      {Object.keys(watchlists).length === 0 ? (
        <p>No watchlists available.</p>
      ) : (
        Object.entries(watchlists).map(([listName, cryptos]) => (
          <div
            key={listName}
            className="border p-4 rounded shadow-lg bg-gray-900"
          >
            <h3 className="text-lg font-bold">{listName}</h3>

            <ul>
              {cryptos.map((crypto, index) => (
                <li
                  key={`${listName}-${crypto.symbol}-${index}`}
                  className="flex justify-between p-3 border-b"
                >
                  <span>
                    {crypto.symbol}: ${crypto.lastPrice}
                  </span>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => removeFromWatchlist(listName, crypto.symbol)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="text-red-500 mt-3"
              onClick={() => removeWatchlist(listName)}
            >
              Delete Watchlist
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Watchlist;
