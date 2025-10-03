"use client";

import { ExternalLink, FileText } from "lucide-react";

export interface SearchResult {
  id: number;
  Title: string;
  Summary: string;
  Link: string;
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

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {results.map((result) => (
        <div
          key={result.id}
          className="card-glass p-6 hover:bg-white/10 transition-all group"
        >
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
