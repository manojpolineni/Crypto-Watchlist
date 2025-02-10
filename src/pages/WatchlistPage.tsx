import { useWatchlist } from "../context/WatchlistContext";
import { useTheme } from "../context/ThemeContext";

const WatchlistPage = () => {
  const { watchlists, removeWatchlist, removeFromWatchlist } = useWatchlist();
  const { theme } = useTheme();

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Your Watchlists</h2>

      {Object.keys(watchlists).length === 0 ? (
        <p className="text-gray-500">
          No watchlists yet. Start adding cryptos!
        </p>
      ) : (
        <div
          className={`grid grid-cols-${
            Object.keys(watchlists).length < 3
              ? Object.keys(watchlists).length
              : 3
          } gap-4`}
        >
          {Object.keys(watchlists).map((listName) => (
            <div
              key={listName}
              className={`bg-white dark:bg-gray-900 shadow-md rounded-lg p-5 ${
                theme === "dark" ? "bg-gray-700 text-white" : "text-black"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-black ">{listName}</h3>
                <button
                  className="bg-red-500 text-white  px-3 py-1 cursor-pointer rounded hover:bg-red-600"
                  onClick={() => removeWatchlist(listName)}
                >
                  Delete List
                </button>
              </div>

              {watchlists[listName].length === 0 ? (
                <p className="text-gray-500">No cryptos added yet.</p>
              ) : (
                <ul className="space-y-3">
                  {Array.from(
                    new Set(watchlists[listName].map((c) => JSON.stringify(c)))
                  )
                    .map((c) => JSON.parse(c))
                    .map((crypto) => (
                      <li
                        key={crypto.symbol}
                        className="flex justify-between h-24 items-center p-3 border rounded bg-gray-100 dark:bg-gray-700"
                      >
                        <div>
                          <p className="text-md text-black font-medium">
                            {crypto.symbol.toUpperCase()}
                          </p>
                          <p className="text-sm  text-black">
                            ${crypto.lastPrice} ({crypto.priceChangePercent}%)
                          </p>
                        </div>
                        <button
                          className="bg-red-400 cursor-pointer text-white px-2 py-1 rounded hover:bg-red-500"
                          onClick={() =>
                            removeFromWatchlist(listName, crypto.symbol)
                          }
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
