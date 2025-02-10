import { createContext, useContext, useState, useEffect } from "react";
import { Crypto } from "../types";

interface WatchlistContextType {
  watchlists: Record<string, Crypto[]>;
  addToWatchlist: (listName: string, crypto: Crypto) => void;
  removeFromWatchlist: (listName: string, cryptoId: string) => void;
  removeWatchlist: (listName: string) => void;
}

// Create context
const WatchlistContext = createContext<WatchlistContextType | null>(null);

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};

export const WatchlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [watchlists, setWatchlists] = useState<Record<string, Crypto[]>>(() => {
    const savedWatchlists = localStorage.getItem("watchlists");
    return savedWatchlists ? JSON.parse(savedWatchlists) : {};
  });

  useEffect(() => {
    localStorage.setItem("watchlists", JSON.stringify(watchlists));
  }, [watchlists]);

  const addToWatchlist = (listName: string, crypto: Crypto) => {
    setWatchlists((prevWatchlists) => {
      const existingList = prevWatchlists[listName] || [];

      if (existingList.some((c) => c.symbol === crypto.symbol)) {
        return prevWatchlists; 
      }

      return {
        ...prevWatchlists,
        [listName]: [...existingList, crypto],
      };
    });
  };

  const removeFromWatchlist = (
    watchlistName: string,
    cryptoIdOrSymbol: string
  ) => {
    setWatchlists((prevWatchlists) => {
      if (!prevWatchlists[watchlistName]) return prevWatchlists;

      const updatedList = prevWatchlists[watchlistName].filter(
        (crypto) =>
          crypto.id !== cryptoIdOrSymbol && crypto.symbol !== cryptoIdOrSymbol
      );

      const newWatchlists = { ...prevWatchlists };

      if (updatedList.length === 0) {
        delete newWatchlists[watchlistName];
      } else {
        newWatchlists[watchlistName] = updatedList;
      }

      localStorage.setItem("watchlists", JSON.stringify(newWatchlists));

      return { ...newWatchlists }; 
    });
  };


  const removeWatchlist = (listName: string) => {
    console.log(`Removing watchlist: ${listName}`);

    setWatchlists((prev) => {
      const updated = { ...prev };
      delete updated[listName];

      localStorage.setItem("watchlists", JSON.stringify(updated)); 

      return { ...updated }; 
    });
  };

  useEffect(() => {
    console.log("Updated localStorage:", watchlists);
    localStorage.setItem("watchlists", JSON.stringify(watchlists));
  }, [watchlists]);


  return (
    <WatchlistContext.Provider
      value={{
        watchlists,
        addToWatchlist,
        removeFromWatchlist,
        removeWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
