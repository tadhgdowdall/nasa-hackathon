"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "@/components/SearchBar";
import ResultsList, { SearchResult } from "@/components/ResultsList";
import TopicChart from "@/components/TopicChart";
import Chatbot from "@/components/Chatbot";
import { AlertCircle, Loader2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Topic {
  name: string;
  count: number;
}

export default function DashboardPage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [chatbotResponse, setChatbotResponse] = useState("");

  // Fetch topics once on mount
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/topics");
        setTopics(response.data);
      } catch (err) {
        console.error("Error fetching topics:", err);
      }
    };
    fetchTopics();
  }, []);

  // Standard search
  const handleSearch = async (query: string) => {
    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      let url = `http://localhost:5001/api/summaries?query=${encodeURIComponent(query)}`;
      if (selectedTopic !== "All") {
        url += `&topic=${encodeURIComponent(selectedTopic)}`;
      }

      const response = await axios.get(url);
      setResults(response.data);
    } catch (err) {
      console.error("Search error:", err);
      setError(
        "Failed to fetch results. Please ensure the backend server is running.",
      );
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Browse all publications in a topic
  const handleBrowseTopic = async () => {
    if (selectedTopic === "All") return;

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const topicData = topics.find((t) => t.name === selectedTopic);
      const limit = topicData ? Math.min(topicData.count, 200) : 100;

      const url = `http://localhost:5001/api/summaries?topic=${encodeURIComponent(
        selectedTopic,
      )}&limit=${limit}`;

      const response = await axios.get(url);
      setResults(response.data);
    } catch (err) {
      console.error("Browse error:", err);
      setError(
        "Failed to fetch results. Please ensure the backend server is running.",
      );
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // AI chatbot query
  const handleChatQuery = async (query: string) => {
    setLoading(true);
    setError("");
    setHasSearched(true);
    setChatbotResponse("Analyzing your question with AI...");

    try {
      const response = await axios.post("http://localhost:5001/api/chat", {
        query,
        limit: 10,
      });

      const { response: aiResponse, results: fetchedResults } = response.data;
      setResults(fetchedResults);
      setChatbotResponse(aiResponse);
    } catch (err: any) {
      console.error("Chatbot query error:", err);
      const errorMsg = err.response?.data?.error || "";

      if (
        err.response?.status === 429 ||
        errorMsg.includes("Rate limit exceeded") ||
        errorMsg.includes("Daily limit exceeded")
      ) {
        setChatbotResponse(
          `${errorMsg}\n\nFree tier limits:\n• 15 requests per minute\n• 1,500 requests per day\n\nPlease wait a moment and try again.`,
        );
      } else if (errorMsg.includes("GEMINI_API_KEY")) {
        setChatbotResponse(
          "Gemini API key not configured. Please add GEMINI_API_KEY to your backend .env file\n\nGet your key from: https://aistudio.google.com/app/apikey",
        );
      } else {
        setError(
          "Failed to process your question. Please check the backend server.",
        );
        setChatbotResponse(
          "Sorry, I couldn't process your question. Please try again.",
        );
      }

      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Hero Banner */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=2071')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-space-dark" />
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            BioCosmos <span className="gradient-text">Research Explorer</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-3xl">
            Unlocking NASA's 608 bioscience publications for Moon & Mars
            missions
          </p>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <Rocket className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-12">
        {/* Topic Distribution Chart */}
        <div className="card-glass p-6 mb-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              Research Topic Distribution
            </h3>
            <p className="text-xs text-gray-400">
              Visual breakdown of 607 publications across 8 major research
              categories
            </p>
          </div>
          {topics.length > 0 ? (
            <TopicChart topics={topics} />
          ) : (
            <div className="h-[300px] flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-space-purple animate-spin" />
            </div>
          )}
        </div>

        {/* Explore & Search Section */}
        <div className="card-glass p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Explore Publications</h2>
            <p className="text-sm text-gray-400">
              Search by keywords or browse by research topic to discover
              relevant studies
            </p>
          </div>

          {/* Search + Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start mb-4">
            <SearchBar onSearch={handleSearch} loading={loading} />
            <div className="flex gap-3">
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-space-purple focus:border-transparent [&>option]:bg-space-dark [&>option]:text-white"
              >
                <option value="All">All Topics</option>
                {topics.map((topic) => (
                  <option key={topic.name} value={topic.name}>
                    {topic.name} ({topic.count})
                  </option>
                ))}
              </select>

              {selectedTopic !== "All" && (
                <Button
                  onClick={handleBrowseTopic}
                  disabled={loading}
                  size="lg"
                >
                  Browse All
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* AI Chatbot Section */}
        <div className="mb-8">
          <Chatbot
            onQuery={handleChatQuery}
            loading={loading}
            responseText={chatbotResponse}
          />
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

        {/* Results Section */}
        {!loading && !error && hasSearched && (
          <div className="card-glass p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Research Results{" "}
                  {selectedTopic !== "All" && (
                    <span className="text-sm font-normal text-gray-400 ml-2">
                      - {selectedTopic}
                    </span>
                  )}
                </h2>
                <div className="text-sm text-gray-400">
                  {results.length} publication{results.length !== 1 ? "s" : ""}{" "}
                  found
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Summaries highlight key findings and mission relevance for
                scientists and mission planners
              </p>
            </div>
            <ResultsList results={results} />
          </div>
        )}

        {/* Empty State (before searching) */}
        {!loading && !error && !hasSearched && (
          <div className="card-glass p-12 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                Start Exploring
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Search for specific topics like "bone density" or "plant
                growth", or browse by research category to discover relevant
                studies.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs">
                  microgravity
                </span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs">
                  radiation
                </span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs">
                  bone loss
                </span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs">
                  plant biology
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
