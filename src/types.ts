export interface Crypto {
  id: string;
  symbol: string;
  name: string;
  lastPrice: string;
  priceChangePercent: string; // Ensure this exists
}

export interface CryptoCardProps {
  crypto: Crypto;
  isInWatchlist: boolean;
  onAddToWatchlist: () => void;
  onRemoveFromWatchlist: () => void;
}
