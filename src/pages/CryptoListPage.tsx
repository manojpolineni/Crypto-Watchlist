import { useEffect, useState } from "react";
import { fetchCryptoPrices } from "../utils/api";
import { useWatchlist } from "../context/WatchlistContext";
import { Crypto } from "../types";
import { useTheme } from "../context/ThemeContext";
import CryptoCard from "../components/CryptoCard";

const CryptoListPage = () => {
  const { addToWatchlist } = useWatchlist();
  const [search, setSearch] = useState("");
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const {theme} = useTheme()

  useEffect(() => {
    const getData = async () => {
      if (loading) return; 
      setLoading(true);
      try {
        const data = await fetchCryptoPrices(page);
        setCryptos((prev) => {
          const uniqueCryptos = [...prev, ...data].reduce<Crypto[]>(
            (acc, crypto) => {
              if (!acc.some((c) => c.id === crypto.id)) {
                acc.push(crypto);
              }
              return acc;
            },
            []
          );
          return uniqueCryptos;
        });
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
      setLoading(false);
    };

    getData();
  }, [page]);


  // Infinite Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  // Search filter
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
          theme === "dark" ? "placeholder:text-white " : ""
        } `}
      />

      {/* Crypto List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCryptos.map((crypto) => (
          <div
            key={crypto.id}
            className={`p-4 shadow-md rounded-lg ${
              theme === "dark" ? " bg-gray-200 shadow-2xl text-white " : ""
            } `}
          >
            <h2 className="font-bold text-lg dark:text-white text-black">
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
              className="mt-2 flex cursor-pointer mx-auto w-1/2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => addToWatchlist("My Watchlist", crypto)}
            >
              Add to Watchlist
            </button>
          </div>
        ))}
      </div> 
      

      {/* Loading Indicator */}
      {loading && <p className="text-center mt-4">Loading more data...</p>}
    </div>
  );
};

export default CryptoListPage;
