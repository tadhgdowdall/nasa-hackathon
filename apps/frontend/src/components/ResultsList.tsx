"use client";

import { ExternalLink, FileText } from "lucide-react";

export interface SearchResult {
  id: number;
  Title: string;
  Summary: string;
  Link: string;
  Topic?: string;
}

interface ResultsListProps {
  results: SearchResult[];
}

export default function ResultsList({ results }: ResultsListProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 mx-auto text-gray-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No results found</h3>
        <p className="text-gray-400">Try adjusting your search query</p>
      </div>
    );
  }

  const getTopicColor = (topic: string) => {
    const colors: Record<string, string> = {
      "Human Health": "bg-red-500/20 text-red-300 border-red-500/30",
      "Microgravity": "bg-purple-500/20 text-purple-300 border-purple-500/30",
      "Plants": "bg-green-500/20 text-green-300 border-green-500/30",
      "Cell Biology": "bg-blue-500/20 text-blue-300 border-blue-500/30",
      "Radiation": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      "Development": "bg-pink-500/20 text-pink-300 border-pink-500/30",
      "Metabolism": "bg-orange-500/20 text-orange-300 border-orange-500/30",
      "Other": "bg-gray-500/20 text-gray-300 border-gray-500/30",
    };
    return colors[topic] || colors["Other"];
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {results.map((result) => (
        <div
          key={result.id}
          className="card-glass p-6 hover:bg-white/10 transition-all group"
        >
          {result.Topic && (
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium border mb-3 ${getTopicColor(result.Topic)}`}>
              {result.Topic}
            </span>
          )}

          <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-space-cyan transition-colors">
            {result.Title}
          </h3>

          <p className="text-gray-400 text-sm mb-4 line-clamp-3">
            {result.Summary}
          </p>

          <a
            href={result.Link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-space-purple hover:text-space-cyan transition-colors"
          >
            Read more
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      ))}
    </div>
  );
}
