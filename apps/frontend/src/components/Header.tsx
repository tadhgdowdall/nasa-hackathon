"use client";

import { Rocket } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-space-dark/80 border-b border-white/10">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-nasa-blue to-space-purple rounded-lg">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">BioCosmos</h1>
              <p className="text-xs text-gray-400">NASA Space Apps 2025</p>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}
