import { useEffect, useState } from "react";
import { fetchCryptoPrices } from "../utils/api";
import { useWatchlist } from "../context/WatchlistContext";
import { Crypto } from "../types";
import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
  const { addToWatchlist, watchlists, removeWatchlist, removeFromWatchlist } =
    useWatchlist();
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newWatchlist, setNewWatchlist] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const getData = async () => {
      if (loading) return;
      setLoading(true);
      const data = await fetchCryptoPrices(page);
      setCryptos((prev) => [...prev, ...data]);
      setLoading(false);
    };

    getData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Available Cryptos
      </h2>

      <input
        type="text"
        placeholder="Search for crypto..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4 text-black"
      />

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="New Watchlist"
          value={newWatchlist}
          onChange={(e) => setNewWatchlist(e.target.value)}
          className="p-2 border rounded text-black"
        />
        <button
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={() => {
            addToWatchlist(newWatchlist, {} as Crypto);
            setNewWatchlist("");
          }}
        >
          Create
        </button>
      </div>

      <ul>
        {filteredCryptos.map((crypto) => (
          <li key={crypto.id} className="flex justify-between p-3 border-b">
            {crypto.symbol}: ${crypto.lastPrice} ({crypto.priceChangePercent}%)
            <button
              className="bg-blue-600 dark:bg-blue-400 text-white dark:text-gray-900 px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition"
              onClick={() => addToWatchlist("My Watchlist", crypto)}
            >
              Add to Watchlist
            </button>
          </li>
        ))}
      </ul>

      {loading && <p className="text-center mt-4">Loading more cryptos...</p>}

      <h2 className="text-xl font-bold mt-8">Your Watchlists</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(watchlists).map((listName) => (
          <div
            key={listName}
            className={`border p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ${
              theme === "dark" ? "text-black bg-gray-700" : ""
            }`}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex justify-between">
              {listName}
              <button
                className="text-red-500 dark:text-red-400  cursor-pointer  hover:underline"
                onClick={() => removeWatchlist(listName)}
              >
                Delete Watchlist
              </button>
            </h3>

            <ul>
              {watchlists[listName].map((crypto) => (
                <li
                  key={crypto.id}
                  className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300 p-2 border-b"
                >
                  <span>
                    {crypto.symbol.toUpperCase()}: ${crypto.lastPrice}
                  </span>
                  <button
                    className="text-red-500 dark:text-red-400 px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-red-300 dark:hover:bg-red-500 cursor-pointer  transition"
                    onClick={() => removeFromWatchlist(listName, crypto.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
