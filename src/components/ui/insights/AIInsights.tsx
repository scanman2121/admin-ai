"use client";

import * as React from "react";
import { RiArrowDownSLine, RiArrowUpSLine, RiRobot2Line } from "@remixicon/react";
import { cn } from "@/lib/utils";

interface AIInsightsProps {
  insights: {
    title: string;
    description: string;
    impact: "positive" | "negative" | "neutral";
    percentage?: number;
  }[];
  className?: string;
}

export function AIInsights({ insights, className }: AIInsightsProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className={cn("w-full rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900", className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
            <RiRobot2Line className="h-5 w-5" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white">AI Insights</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isExpanded ? "Click to collapse" : "Click to expand"}
            </p>
          </div>
        </div>
        <div className="flex h-6 w-6 items-center justify-center">
          {isExpanded ? (
            <RiArrowUpSLine className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <RiArrowDownSLine className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {insights.map((insight, index) => (
              <div key={index} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{insight.title}</h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{insight.description}</p>
                  </div>
                  {insight.percentage && (
                    <div
                      className={cn(
                        "flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-medium",
                        insight.impact === "positive" && "bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-400",
                        insight.impact === "negative" && "bg-red-50 text-red-700 dark:bg-red-900/50 dark:text-red-400",
                        insight.impact === "neutral" && "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      )}
                    >
                      {insight.percentage > 0 && "+"}
                      {insight.percentage}%
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 