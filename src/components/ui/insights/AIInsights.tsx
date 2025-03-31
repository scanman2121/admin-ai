"use client";

import { cn } from "@/lib/utils";
import { RiArrowDownSLine, RiArrowRightSLine, RiArrowUpSLine, RiSparklingLine } from "@remixicon/react";
import * as React from "react";

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
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className={cn("w-full", className)}>
      <div className={cn(
        "rounded-lg border transition-all duration-300",
        isExpanded
          ? "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
          : "border-gray-200/80 bg-white/95 backdrop-blur-sm dark:border-gray-800/80 dark:bg-gray-950/95 insights-shimmer hover:border-gray-300 dark:hover:border-gray-700"
      )}>
        <div className={cn("flex flex-col", isExpanded ? "space-y-2" : "space-y-0")}>
          <div className={cn(
            "flex w-full items-center justify-between px-4 pt-4",
            isExpanded ? "pb-2" : "pb-3"
          )}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex items-center transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center">
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                  isExpanded
                    ? "bg-gray-100 dark:bg-gray-900"
                    : "bg-blue-50 dark:bg-blue-950"
                )}>
                  <RiSparklingLine className={cn(
                    "h-5 w-5 transition-colors",
                    isExpanded
                      ? "text-gray-500 dark:text-gray-400"
                      : "text-blue-500 dark:text-blue-400"
                  )} />
                </div>
                <h3 className={cn(
                  "ml-2 text-sm transition-colors",
                  isExpanded
                    ? "text-gray-500 dark:text-gray-400"
                    : "text-gray-700 dark:text-gray-200"
                )}>Insights</h3>
                <div className="ml-3 flex h-6 w-6 items-center justify-center">
                  {isExpanded ? (
                    <RiArrowUpSLine className="h-5 w-5 text-gray-500 transition-transform group-hover:-translate-y-0.5 dark:text-gray-400" />
                  ) : (
                    <RiArrowDownSLine className="h-5 w-5 text-gray-500 transition-transform group-hover:translate-y-0.5 dark:text-gray-400" />
                  )}
                </div>
              </div>
            </button>
            {isExpanded && (
              <a
                href="#"
                className="flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                View all insights
                <RiArrowRightSLine className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            )}
          </div>

          <div
            className={cn(
              "grid gap-4 transition-all duration-300",
              isExpanded ? "px-4 pb-4 grid-rows-[1fr]" : "grid-rows-[0fr] invisible h-0",
              "md:grid-cols-4"
            )}
          >
            {insights.map((insight, index) => (
              <div
                key={index}
                className="overflow-hidden"
              >
                <div className="rounded-lg border border-[#9BB8FD] bg-[#F6F7F8] p-4 dark:border-[#9BB8FD] dark:bg-gray-900">
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
      </div>
    </div>
  );
} 