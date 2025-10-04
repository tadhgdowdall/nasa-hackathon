"use client";

import { useState, FormEvent } from "react";
import { Send } from "lucide-react";

interface ChatbotProps {
  onQuery: (query: string) => void;
  loading: boolean;
  responseText: string;
}

/**
 * Minimal chatbot component for space biology queries
 * Submits natural language questions and displays mock AI responses
 */
export default function Chatbot({ onQuery, loading, responseText }: ChatbotProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    onQuery(input.trim());
    setInput(""); // Clear input after submission
  };

  return (
    <div className="card-glass p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Ask About Space Biology
        </h2>
        <p className="text-sm text-gray-400">
          Ask natural language questions about space biology research (e.g., "What does microgravity do to bones?")
        </p>
      </div>

      {/* Chat Input Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about space biology..."
            className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-space-purple focus:border-transparent"
            disabled={loading}
            aria-label="Space biology question input"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
            aria-label="Send question"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </form>

      {/* Response Area */}
      {responseText && (
        <div className="bg-white/5 border border-white/20 rounded-lg p-4">
          <p className="text-sm text-gray-300 whitespace-pre-wrap">
            {responseText}
          </p>
        </div>
      )}
    </div>
  );
}
