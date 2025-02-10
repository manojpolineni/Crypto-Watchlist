import { createContext, useContext, useState } from "react";
import { Crypto } from "../types";

interface WatchlistContextType {
  watchlists: { [key: string]: Crypto[] };
  addToWatchlist: (listName: string, crypto: Crypto) => void;
  removeFromWatchlist: (listName: string, cryptoId: string) => void;
  removeWatchlist: (listName: string) => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined
);

export const WatchlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [watchlists, setWatchlists] = useState<{ [key: string]: Crypto[] }>({});

  const addToWatchlist = (listName: string, crypto: Crypto) => {
    setWatchlists((prev) => ({
      ...prev,
      [listName]: prev[listName] ? [...prev[listName], crypto] : [crypto],
    }));
  };

  const removeFromWatchlist = (watchlistName: string, cryptoSymbol: string) => {
    setWatchlists((prevWatchlists) => {
      if (!prevWatchlists[watchlistName]) return prevWatchlists; 

      const updatedList = prevWatchlists[watchlistName].filter(
        (crypto) => crypto.symbol !== cryptoSymbol 
      );

      return {
        ...prevWatchlists,
        [watchlistName]: updatedList, 
      };
    });
  };


  const removeWatchlist = (listName: string) => {
    setWatchlists((prev) => {
      const updatedLists = { ...prev };
      delete updatedLists[listName];
      return updatedLists;
    });
  };

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

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
