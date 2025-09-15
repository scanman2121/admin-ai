"use client"

import { useContext } from "react"
import { SidebarContext } from "@/app/(main)/layout"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn, focusRing } from "@/lib/utils"

export function SidebarToggle() {
    const { collapsed, toggleCollapsed } = useContext(SidebarContext)

    return (
        <button
            onClick={toggleCollapsed}
            className={cn(
                "fixed z-50 hidden lg:flex items-center justify-center w-8 h-8 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full transition-all duration-200",
                "hover:border-gray-400 dark:hover:border-gray-500",
                // Position: 48px from top (64px - 16px), halfway over the right side of sidebar
                collapsed ? "left-12" : "left-60",
                "transform transition-all duration-300",
                focusRing
            )}
            style={{ top: '48px' }}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
            {collapsed ? (
                <ChevronRight className="size-4 text-gray-600 dark:text-gray-400" />
            ) : (
                <ChevronLeft className="size-4 text-gray-600 dark:text-gray-400" />
            )}
        </button>
    )
}
