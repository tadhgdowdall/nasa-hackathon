"use client";

import { useState } from "react";
import axios from "axios";
import SearchBar from "@/components/SearchBar";
import ResultsList, { SearchResult } from "@/components/ResultsList";
import { AlertCircle, Loader2 } from "lucide-react";

export default function SearchPage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/summaries?query=${encodeURIComponent(query)}`
      );

      setResults(response.data);
    } catch (err) {
      console.error("Search error:", err);
      setError(
        "Failed to fetch results. Please ensure the backend server is running."
      );
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Search <span className="gradient-text">Publications</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore 608 NASA bioscience publications with AI-powered search
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 text-space-purple animate-spin mb-4" />
            <p className="text-gray-400">Searching publications...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="card-glass p-6 border-red-500/50 max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-400 mb-1">Error</h3>
                <p className="text-gray-300 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && !error && hasSearched && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                {results.length > 0
                  ? `Found ${results.length} result${results.length !== 1 ? "s" : ""}`
                  : "Results"}
              </h2>
            </div>
            <ResultsList results={results} />
          </div>
        )}

        {/* Initial State */}
        {!loading && !error && !hasSearched && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Start your search
            </h3>
            <p className="text-gray-400">
              Enter a query above to search through NASA bioscience publications
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
