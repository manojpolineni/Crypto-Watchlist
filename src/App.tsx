import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import CryptoListPage from "./pages/CryptoListPage";
import WatchlistPage from "./pages/WatchlistPage";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex h-screen w-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <div className="flex-1 overflow-auto p-4">
              <Routes>
                <Route path="/" element={<CryptoListPage />} />
                <Route path="/watchlist" element={<WatchlistPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
