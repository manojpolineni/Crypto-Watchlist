import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
  };
  return (
    <div className="flex items-center space-x-2 p-4 ">
      <input
        type="text"
        placeholder="Search Cryptocurrency..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border rounded-md w-full"
      />
      <button
        onClick={handleSearch}
        className="p-2  text-white rounded-md mb-2"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
