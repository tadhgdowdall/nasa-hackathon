"use client";

import { Github, Globe, Rocket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-space-dark/50 backdrop-blur-md mt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-space-purple" />
            <span className="font-semibold gradient-text">BioCosmos</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 NASA Space Apps Challenge
          </p>
          <a
            href="https://github.com/tadhgdowdall/nasa-hackathon"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
