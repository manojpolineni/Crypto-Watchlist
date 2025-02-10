import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`flex justify-between items-center p-4 dark:text-white md:shadow-lg dark:md:shadow-2xl`}
    >
      <h1 className="text-lg font-bold">Crypto Watchlist</h1>
      <button
        onClick={toggleTheme}
        className="p-2 rounded cursor-pointer dark:bg-gray-700"
      >
        {theme === "light" ? <Moon size={25} /> : <Sun size={25} />}
      </button>
    </nav>
  );
};

export default Navbar;
