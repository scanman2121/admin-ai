"use client";

import * as React from "react";
import { RiArrowUpLine, RiArrowDownLine, RiInformationLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

interface AIInsight {
  title: string;
  description: string;
  impact: "positive" | "negative" | "neutral";
  percentage?: number;
}

interface AIInsightsProps {
  insights: AIInsight[];
  className?: string;
}

export function AIInsights({ insights, className }: AIInsightsProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-3", className)}>
      {insights.map((insight, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg border bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {insight.title}
            </h3>
            {insight.impact !== "neutral" && insight.percentage && (
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  insight.impact === "positive"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                )}
              >
                {insight.impact === "positive" ? (
                  <RiArrowUpLine className="size-4" />
                ) : (
                  <RiArrowDownLine className="size-4" />
                )}
                {insight.percentage}%
              </div>
            )}
            {insight.impact === "neutral" && (
              <RiInformationLine className="size-4 text-gray-400" />
            )}
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {insight.description}
          </p>
        </div>
      ))}
    </div>
  );
} 