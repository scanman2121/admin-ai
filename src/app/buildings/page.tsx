"use client";

import * as React from "react";
import { AIInsights } from "@/components/ui/insights/AIInsights";

const mockInsights = [
  {
    title: "Occupancy Rate Increase",
    description: "Building occupancy rates have increased significantly over the past month.",
    impact: "positive" as const,
    percentage: 15,
  },
  {
    title: "Energy Consumption Optimization",
    description: "Smart building systems have reduced energy consumption in common areas.",
    impact: "positive" as const,
    percentage: 8,
  },
  {
    title: "Maintenance Schedule Alert",
    description: "Three buildings require preventive maintenance in the next two weeks.",
    impact: "neutral" as const,
  },
];

export default function BuildingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Buildings</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Manage and monitor all your building properties in one place.
        </p>
      </div>

      <AIInsights insights={mockInsights} className="my-6" />

      {/* Rest of your existing buildings page content */}
    </div>
  );
} 