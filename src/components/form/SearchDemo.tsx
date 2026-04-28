import { useState } from "react";
import SearchBar from "./SearchBar";

export default function SearchDemo() {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    setSearchResults([`Results for "${query}"`]);
    setSearchHistory(prev => [query, ...prev.slice(0, 4)]); // Keep last 5 searches
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Search Bar Demo</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Try typing in the search bar below. It will show real-time search suggestions.
        </p>
      </div>

      <div className="flex justify-center">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search for products..."
          className="w-full max-w-md"
        />
      </div>

      {searchResults.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Search Results:</h3>
          <ul className="space-y-1">
            {searchResults.map((result, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchHistory.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Recent Searches:</h3>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((search, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                {search}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
        <p>Mock search data includes: Laptop, Smartphone, Headphones, Tablet, Smartwatch, etc.</p>
        <p>Type at least 2 characters to see suggestions.</p>
      </div>
    </div>
  );
}