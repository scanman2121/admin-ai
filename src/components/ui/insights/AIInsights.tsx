"use client";

import * as React from "react";
import { RiSparklingLine, RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

interface MetricInsight {
  title: string;
  value: string | number;
  comparison: string;
  trend?: "up" | "down";
  trendValue?: number;
}

interface AIInsightsProps {
  insights: MetricInsight[];
  className?: string;
}

export function AIInsights({ insights, className }: AIInsightsProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="flex w-full items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center"
        >
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center">
              <RiSparklingLine className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="ml-3 text-sm text-gray-500 dark:text-gray-400">AI Insights</h3>
            <div className="ml-3 flex h-6 w-6 items-center justify-center">
              {isExpanded ? (
                <RiArrowUpSLine className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <RiArrowDownSLine className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
            </div>
          </div>
        </button>
        <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          View all insights
        </a>
      </div>

      <div
        className={cn(
          "grid gap-4 transition-all duration-300",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          "md:grid-cols-4"
        )}
      >
        {insights.map((insight, index) => (
          <div
            key={index}
            className="overflow-hidden"
          >
            <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <div className="relative">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {insight.title}
                </h4>
                <div className="mt-2 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {insight.value}
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  {insight.trend && (
                    <span
                      className={cn(
                        "flex items-center text-sm font-medium",
                        insight.trend === "up"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      )}
                    >
                      {insight.trend === "up" ? (
                        <RiArrowUpSLine className="h-4 w-4" />
                      ) : (
                        <RiArrowDownSLine className="h-4 w-4" />
                      )}
                      {insight.trendValue}%
                    </span>
                  )}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {insight.comparison}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 