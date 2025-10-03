"use client";

import { Sparkles, Database, Brain, Rocket, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-space-purple/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-space-cyan/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-space-pink/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Unlock NASA's
            <br />
            <span className="gradient-text">Bioscience Library</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-20 max-w-3xl mx-auto leading-relaxed">
            AI-powered exploration of 608 NASA bioscience publications. Discover
            critical insights for Moon and Mars missions.
          </p>

          <div>
            <Button asChild size="lg">
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            <div className="card-glass p-8 hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-space-cyan to-space-purple rounded-lg flex items-center justify-center mb-4 group-hover:animate-glow">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">608 Publications</h3>
              <p className="text-gray-400">
                Complete access to NASA's bioscience research database spanning
                decades of space biology
              </p>
            </div>

            <div className="card-glass p-8 hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-space-purple to-space-pink rounded-lg flex items-center justify-center mb-4 group-hover:animate-glow">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Search</h3>
              <p className="text-gray-400">
                Natural language queries with intelligent summarization and
                context-aware results
              </p>
            </div>

            <div className="card-glass p-8 hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-space-pink to-nasa-red rounded-lg flex items-center justify-center mb-4 group-hover:animate-glow">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visual Insights</h3>
              <p className="text-gray-400">
                Interactive charts and graphs revealing research trends and
                mission-critical data
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
