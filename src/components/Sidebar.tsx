// import { Link } from "react-router-dom";
// import { useTheme } from "../context/ThemeContext";

// const Sidebar = () => {
//   const { theme } = useTheme();
//   return (
//     <aside
//       className={`w-64 h-screen p-5 ${
//         theme === "dark"
//           ? "bg-gray-[#1a202c] text-white shadow-lg "
//           : "bg-white text-gray-900 shadow-lg "
//       }`}
//     >
//       <h2 className="text-xl font-bold">Crypto Watchlist</h2>
//       <nav className="mt-5">
//         <ul>
//           <li>
//             <Link
//               to="/"
//               className="block py-2 px-3 rounded-md hover:bg-gray-200 hover:text-black dark:hover:bg-gray-700"
//             >
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/watchlist"
//               className="block py-2 px-3 rounded-md hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700"
//             >
//               My Watchlist
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 w-full bg-gray-900 text-white p-4 flex items-center justify-between shadow-md z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <h2 className="text-lg font-bold flex-1 text-center">
          Crypto Watchlist
        </h2>

        <button onClick={toggleTheme} className="text-white">
          {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5.5 right-4 text-white"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4">Crypto Watchlist</h2>
        <ul className="mt-10">
          <li className="py-2 h-14 px-3 hover:bg-gray-700 rounded cursor-pointer">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
          </li>
          <li className="py-2 px-3 hover:bg-gray-700 rounded cursor-pointer">
            <Link to="/watchlist" onClick={() => setIsOpen(false)}>
              My Watchlist
            </Link>
          </li>
        </ul>
      </div>

      <aside
        className={`hidden md:block w-64 h-screen p-5 ${
          theme === "dark"
            ? "bg-gray-900 text-white shadow-lg"
            : "bg-white text-gray-900 shadow-lg"
        }`}
      >
        <h2 className="text-xl font-bold">Crypto Watchlist</h2>
        <nav className="mt-5">
          <ul>
            <li>
              <Link
                to="/"
                className="block py-2 px-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/watchlist"
                className="block py-2 px-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                My Watchlist
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;



