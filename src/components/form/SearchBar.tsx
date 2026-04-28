import { useState, useEffect, useMemo, useRef } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, Loading02Icon } from "@hugeicons/core-free-icons";

const searchSchema = z.object({
  query: z.string().min(1, "Please enter a search term"),
});

// Mock search data
const mockSearchResults = [
  "Laptop",
  "Smartphone",
  "Headphones",
  "Tablet",
  "Smartwatch",
  "Gaming Mouse",
  "Wireless Keyboard",
  "Bluetooth Speaker",
  "USB Cable",
  "Power Bank",
  "Laptop Stand",
  "Phone Case",
  "Screen Protector",
  "Wireless Charger",
  "Gaming Headset",
];

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search products...",
  className = "",
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const form = useForm({
    defaultValues: {
      query: "",
    },
    validators: {
      onSubmit: searchSchema,
    },
    onSubmit: async ({ value }) => {
      onSearch?.(value.query);
      setIsOpen(false);
    },
  });

  // Mock search function
  const searchResults = useMemo(() => {
    const query = form.state.values.query.toLowerCase();
    if (query.length < 2) return [];

    return mockSearchResults.filter((item) =>
      item.toLowerCase().includes(query)
    );
  }, [form.state.values.query]);

  // Handle searching state
  useEffect(() => {
    const query = form.state.values.query.toLowerCase();
    if (query.length >= 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSearching(true);
      // Simulate API delay
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [form.state.values.query]);

  const handleResultClick = (result: string) => {
    form.setFieldValue("query", result);
    onSearch?.(result);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    if (form.state.values.query.length >= 2) {
      setIsOpen(true);
    }
  };

  const handleInputChange = (value: string) => {
    form.setFieldValue("query", value);
    setIsOpen(value.length >= 2);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="relative"
      >
        <div className="relative">
          <form.Field name="query">
            {(field) => (
              <Input
                value={field.state.value}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={handleInputFocus}
                placeholder={placeholder}
                className="pr-10"
              />
            )}
          </form.Field>
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
            disabled={isSearching}
          >
            {isSearching ? (
              <HugeiconsIcon
                icon={Loading02Icon}
                className="size-4 animate-spin"
              />
            ) : (
              <HugeiconsIcon icon={Search01Icon} className="size-4" />
            )}
          </Button>
        </div>
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {isSearching ? (
            <div className="flex items-center justify-center p-4">
              <HugeiconsIcon
                icon={Loading02Icon}
                className="size-4 animate-spin mr-2"
              />
              <span className="text-sm text-gray-500">Searching...</span>
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <button
                key={index}
                onClick={() => handleResultClick(result)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800 focus:outline-none transition-colors"
              >
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={Search01Icon} className="size-4 text-gray-400" />
                  <span>{result}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No results found for "{form.state.values.query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}