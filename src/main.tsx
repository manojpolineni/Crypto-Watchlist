import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { WatchlistProvider } from "./context/WatchlistContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Root element not found! Make sure you have <div id='root'></div> in your index.html."
  );
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
  </StrictMode>
);
