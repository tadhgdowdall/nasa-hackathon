"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!query.trim()) {
      setError("Please enter a search query");
      return;
    }

    setError("");
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setError("");
              }}
              placeholder="Search NASA bioscience publications..."
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-space-purple focus:border-transparent transition-all"
              disabled={loading}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <Button
            type="submit"
            disabled={loading}
            size="lg"
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    </form>
  );
}
