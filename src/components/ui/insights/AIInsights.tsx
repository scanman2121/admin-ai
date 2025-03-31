"use client";

import { cn } from "@/lib/utils";
import {
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiArrowUpSLine,
  RiBarChartLine,
  RiLightbulbLine,
  RiPulseLine,
  RiSparklingLine,
} from "@remixicon/react";
import * as React from "react";

export interface MetricInsight {
  title: string;
  value: string | number;
  comparison: string;
  trend?: "up" | "down";
  trendValue?: number;
}

export interface Suggestion {
  title: string;
  description: string;
  action: string;
  priority: "high" | "medium" | "low";
}

export interface Trend {
  title: string;
  description: string;
  change: string;
  period: string;
  trend: "up" | "down" | "stable";
  trendValue?: number;
}

export interface Prompt {
  title: string;
  description: string;
  example: string;
}

interface AIInsightsProps {
  insights: MetricInsight[];
  suggestions: Suggestion[];
  trends: Trend[];
  prompts: Prompt[];
  className?: string;
}

export function AIInsights({ insights, suggestions, trends, prompts, className }: AIInsightsProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"insights" | "suggestions" | "trends" | "prompts">("insights");

  const tabs = [
    {
      id: "insights" as const,
      name: "Insights",
      icon: <RiSparklingLine className="size-4" />,
      color: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      id: "suggestions" as const,
      name: "Suggestions",
      icon: <RiLightbulbLine className="size-4" />,
      color: "text-amber-500 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950",
    },
    {
      id: "trends" as const,
      name: "Trends",
      icon: <RiBarChartLine className="size-4" />,
      color: "text-purple-500 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      id: "prompts" as const,
      name: "Prompts",
      icon: <RiPulseLine className="size-4" />,
      color: "text-green-500 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
  ];

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
                )}>AI Assistant</h3>
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

          {isExpanded && (
            <div className="border-b border-gray-200 dark:border-gray-800 px-4">
              <div className="flex space-x-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 border-b-2 px-1 py-2 text-sm font-medium",
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300"
                    )}
                  >
                    <div className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md",
                      activeTab === tab.id ? tab.bgColor : "bg-gray-100 dark:bg-gray-900"
                    )}>
                      {React.cloneElement(tab.icon, {
                        className: cn(
                          "size-4",
                          activeTab === tab.id ? tab.color : "text-gray-500 dark:text-gray-400"
                        )
                      })}
                    </div>
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div
            className={cn(
              "grid gap-4 transition-all duration-300",
              isExpanded ? "px-4 pb-4 grid-rows-[1fr]" : "grid-rows-[0fr] invisible h-0",
              "md:grid-cols-4"
            )}
          >
            {activeTab === "insights" && insights.map((insight, index) => (
              <div
                key={index}
                className="overflow-hidden"
              >
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
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

            {activeTab === "suggestions" && suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="overflow-hidden"
              >
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                        {suggestion.title}
                      </h4>
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                        suggestion.priority === "high"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          : suggestion.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      )}>
                        {suggestion.priority}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {suggestion.description}
                    </p>
                    <button className="mt-3 text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300">
                      {suggestion.action}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {activeTab === "trends" && trends.map((trend, index) => (
              <div
                key={index}
                className="overflow-hidden"
              >
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-900 dark:bg-purple-950">
                  <div className="relative">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {trend.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {trend.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "flex items-center text-sm font-medium",
                          trend.trend === "up"
                            ? "text-green-600 dark:text-green-400"
                            : trend.trend === "down"
                              ? "text-red-600 dark:text-red-400"
                              : "text-gray-600 dark:text-gray-400"
                        )}>
                          {trend.trend === "up" ? (
                            <RiArrowUpSLine className="h-4 w-4" />
                          ) : trend.trend === "down" ? (
                            <RiArrowDownSLine className="h-4 w-4" />
                          ) : (
                            <span>•</span>
                          )}
                          {trend.change}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {trend.period}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {activeTab === "prompts" && prompts.map((prompt, index) => (
              <div
                key={index}
                className="overflow-hidden"
              >
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
                  <div className="relative">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {prompt.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {prompt.description}
                    </p>
                    <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                      Example: "{prompt.example}"
                    </div>
                    <button className="mt-3 text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                      Try this prompt
                    </button>
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