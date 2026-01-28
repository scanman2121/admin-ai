"use client";

import { cn } from "@/lib/utils";
import { RiAlertLine, RiArrowDownSLine, RiArrowRightSLine, RiArrowUpSLine, RiSparklingLine } from "@remixicon/react";
import * as React from "react";

interface MetricInsight {
  title: string;
  value: string | number;
  comparison: string;
  trend?: "up" | "down";
  trendValue?: number;
}

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: "default" | "danger" | "warning";
}

interface AIInsightsProps {
  insights: MetricInsight[];
  className?: string;
  actionButtons?: ActionButton[];
}

export function AIInsights({ insights, className, actionButtons }: AIInsightsProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const getButtonStyles = (variant?: "default" | "danger" | "warning") => {
    switch (variant) {
      case "danger":
        return "border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:border-red-300 dark:border-red-800 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900";
      case "warning":
        return "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:border-amber-300 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300 dark:hover:bg-amber-900";
      default:
        return "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100";
    }
  };

  const getIconColor = (variant?: "default" | "danger" | "warning") => {
    switch (variant) {
      case "danger":
        return "text-red-500 dark:text-red-400";
      case "warning":
        return "text-amber-500 dark:text-amber-400";
      default:
        return "text-primary";
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="rounded-lg border border-gray-200 bg-white transition-all duration-300 dark:border-gray-800 dark:bg-gray-950">
        <div className={cn("flex flex-col", isExpanded ? "space-y-2" : "space-y-0")}>
          <div className={cn(
            "flex w-full items-center justify-between px-4 pt-4",
            isExpanded ? "pb-2" : "pb-4"
          )}>
            {/* Left side - Insights label */}
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 dark:bg-primary/20">
                <RiSparklingLine className="h-5 w-5 text-primary" />
              </div>
              <h3 className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">Insights</h3>
            </div>

            {/* Right side - Action buttons and Expand/Collapse */}
            <div className="flex items-center gap-3">
              {/* Action buttons - right aligned before caret */}
              {actionButtons && actionButtons.map((button, index) => (
                <button
                  key={index}
                  onClick={button.onClick}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                    getButtonStyles(button.variant)
                  )}
                >
                  <RiAlertLine className={cn("h-4 w-4", getIconColor(button.variant))} />
                  {button.label}
                </button>
              ))}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="group flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={isExpanded ? "Collapse insights" : "Expand insights"}
              >
                {isExpanded ? (
                  <RiArrowUpSLine className="h-5 w-5 text-gray-500 transition-transform group-hover:-translate-y-0.5 dark:text-gray-400" />
                ) : (
                  <RiArrowDownSLine className="h-5 w-5 text-gray-500 transition-transform group-hover:translate-y-0.5 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              isExpanded
                ? "max-h-[500px] opacity-100 px-4 pb-4"
                : "max-h-0 opacity-0"
            )}
          >
            <div className={cn(
              "grid gap-4",
              "md:grid-cols-4"
            )}>
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
            {/* View all insights - bottom right when expanded */}
            <div className="mt-4 flex justify-end">
              <a
                href="#"
                className="flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80 dark:text-primary dark:hover:text-primary/80"
              >
                View all insights
                <RiArrowRightSLine className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 