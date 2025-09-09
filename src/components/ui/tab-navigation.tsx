"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface TabNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface TabNavigationLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

const TabNavigation = React.forwardRef<HTMLDivElement, TabNavigationProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2 border-b border-gray-200 dark:border-gray-800",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabNavigation.displayName = "TabNavigation";

const TabNavigationLink = React.forwardRef<HTMLDivElement, TabNavigationLinkProps>(
  ({ className, active, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex items-center px-4 py-2 text-sm font-medium transition-colors",
          "hover:text-gray-900 dark:hover:text-gray-50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          active
            ? "border-b-2 border-primary text-primary dark:border-primary dark:text-primary"
            : "text-gray-500 dark:text-gray-400",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
TabNavigationLink.displayName = "TabNavigationLink";

export { TabNavigation, TabNavigationLink }; 