"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "@/components/SearchBar";
import ResultsList, { SearchResult } from "@/components/ResultsList";
import TopicChart from "@/components/TopicChart";
import { AlertCircle, Loader2, Rocket, Database, Filter } from "lucide-react";
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

  useEffect(() => {
    // Fetch topics on component mount
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

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      let url = `http://localhost:5001/api/summaries?query=${encodeURIComponent(query)}`;

      // Add topic filter if not "All"
      if (selectedTopic !== "All") {
        url += `&topic=${encodeURIComponent(selectedTopic)}`;
      }

      const response = await axios.get(url);
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

  const handleBrowseTopic = async () => {
    if (selectedTopic === "All") return;

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      // Find the count for the selected topic to request all publications
      const topicData = topics.find(t => t.name === selectedTopic);
      const limit = topicData ? Math.min(topicData.count, 200) : 100;

      const url = `http://localhost:5001/api/summaries?topic=${encodeURIComponent(selectedTopic)}&limit=${limit}`;

      const response = await axios.get(url);
      setResults(response.data);
    } catch (err) {
      console.error("Browse error:", err);
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
        {/* Mission-focused Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                BioCosmos <span className="gradient-text">Research Explorer</span>
              </h1>
              <p className="text-gray-400 text-sm">
                Unlocking NASA's 608 bioscience publications for Moon & Mars missions
              </p>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                <Rocket className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>

          {/* Mission Context Banner */}
          <div className="card-glass p-4 border-l-4 border-space-purple">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🚀</div>
              <div>
                <h3 className="font-semibold text-sm mb-1">Mission Support Tool</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Explore decades of space biology research to identify progress in human health studies,
                  discover gaps in Mars environment research, and generate hypotheses for upcoming missions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights Section */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="card-glass p-4 border-l-2 border-green-500">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✅</span>
              <h3 className="font-semibold text-sm">Progress Highlights</h3>
            </div>
            <p className="text-xs text-gray-400">
              114 human health studies on bone density, muscle atrophy, and cardiovascular adaptation
            </p>
          </div>
          <div className="card-glass p-4 border-l-2 border-yellow-500">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚠️</span>
              <h3 className="font-semibold text-sm">Research Gaps</h3>
            </div>
            <p className="text-xs text-gray-400">
              Limited Mars soil interaction studies - critical for long-duration surface missions
            </p>
          </div>
          <div className="card-glass p-4 border-l-2 border-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📊</span>
              <h3 className="font-semibold text-sm">Research Distribution</h3>
            </div>
            <p className="text-xs text-gray-400">
              8 major topics spanning human health, plants, microgravity, and radiation
            </p>
          </div>
        </div>

        {/* Topic Distribution Chart */}
        <div className="card-glass p-6 mb-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <span>📈</span> Research Topic Distribution
            </h3>
            <p className="text-xs text-gray-400">
              Visual breakdown of 607 publications across 8 major research categories
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
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span>🔍</span> Explore Publications
            </h2>
            <p className="text-sm text-gray-400">
              Search by keywords or browse by research topic to discover relevant studies
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4 items-end">
            <div className="flex-1">
              <SearchBar onSearch={handleSearch} loading={loading} />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-space-purple focus:border-transparent [&>option]:bg-space-dark [&>option]:text-white min-w-[200px]"
              >
                <option value="All">All Topics</option>
                {topics.map((topic) => (
                  <option key={topic.name} value={topic.name}>
                    {topic.name} ({topic.count})
                  </option>
                ))}
              </select>
              {selectedTopic !== "All" && (
                <Button onClick={handleBrowseTopic} disabled={loading} size="lg">
                  Browse All
                </Button>
              )}
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 text-space-purple animate-spin mb-4" />
            <p className="text-gray-400">Searching publications...</p>
          </div>
        )}

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
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span>📚</span> Research Results
                  {selectedTopic !== "All" && (
                    <span className="text-sm font-normal text-gray-400">
                      - {selectedTopic}
                    </span>
                  )}
                </h2>
                <div className="text-sm text-gray-400">
                  {results.length} publication{results.length !== 1 ? "s" : ""} found
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Summaries highlight key findings and mission relevance for scientists and mission planners
              </p>
            </div>
            <ResultsList results={results} />
          </div>
        )}

        {!loading && !error && !hasSearched && (
          <div className="card-glass p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                Start Exploring
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Search for specific topics like "bone density" or "plant growth",
                or browse by research category to discover relevant studies.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs">microgravity</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs">radiation</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs">bone loss</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs">plant biology</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
