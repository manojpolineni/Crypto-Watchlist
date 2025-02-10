import { useEffect, useState } from "react";
import { fetchCryptoPrices } from "../utils/api";
import { useTheme } from "../context/ThemeContext";
import CryptoCard from "../components/CryptoCard";
import { Crypto } from "../types";

const CryptoListPage = () => {
  const [search, setSearch] = useState("");
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { theme } = useTheme();

  useEffect(() => {
    const getData = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const data = await fetchCryptoPrices(page);
        if (!Array.isArray(data)) {
          console.error("API did not return an array:", data);
          return;
        }
        setCryptos((prev) => {
          const uniqueCryptos = [...prev, ...data].reduce<Crypto[]>(
            (acc, crypto) => {
              if (!acc.some((c) => c.symbol === crypto.symbol)) {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCryptos.length > 0 ? (
          filteredCryptos.map((crypto) => (
            <CryptoCard key={crypto.symbol} crypto={crypto} isInWatchlist={false} onAddToWatchlist={function (): void {
              throw new Error("Function not implemented.");
            } } onRemoveFromWatchlist={function (): void {
              throw new Error("Function not implemented.");
            } } />
          ))
        ) : (
          <p>No cryptos available</p>
        )}
      </div>
      {loading && <p className="text-center mt-4">Loading more data...</p>}
    </div>
  );
};

export default CryptoListPage;
