import { useEffect, useState } from "react";

export const useWebSocket = (symbols: string[]) => {
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    if (symbols.length === 0) return;

    const socket = new WebSocket("wss://stream.binance.com:9443/ws");

    socket.onopen = () => {
      const payload = symbols.map((symbol) => `${symbol.toLowerCase()}@trade`);
      socket.send(JSON.stringify({ method: "SUBSCRIBE", params: payload, id: 1 }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.s && data.p) {
        setPrices((prev) => ({ ...prev, [data.s]: parseFloat(data.p) }));
      }
    };

    return () => socket.close();
  }, [symbols]);

  return prices;
};
