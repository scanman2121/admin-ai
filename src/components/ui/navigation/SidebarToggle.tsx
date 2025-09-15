"use client"

import { SidebarContext } from "@/app/(main)/layout"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn, focusRing } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useContext, useEffect } from "react"

export function SidebarToggle() {
    const { collapsed, toggleCollapsed } = useContext(SidebarContext)
    const tooltipId = "sidebar-toggle-tooltip"

    // Add keyboard shortcuts for [ and ]
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Only trigger if no input/textarea is focused and no modifiers are pressed
            if (
                event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement ||
                event.ctrlKey ||
                event.metaKey ||
                event.altKey
            ) {
                return
            }

            if (event.key === '[' && !collapsed) {
                event.preventDefault()
                toggleCollapsed()
            } else if (event.key === ']' && collapsed) {
                event.preventDefault()
                toggleCollapsed()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [collapsed, toggleCollapsed])

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={toggleCollapsed}
                        className={cn(
                            "fixed z-50 hidden lg:flex items-center justify-center w-8 h-8 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full transition-all duration-200",
                            "hover:border-gray-400 dark:hover:border-gray-500",
                            // Position: 52px from top (48px + 4px), halfway over the right side of sidebar
                            collapsed ? "left-12" : "left-60",
                            "transform transition-all duration-300",
                            focusRing
                        )}
                        style={{ top: '52px' }}
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        aria-describedby={tooltipId}
                    >
                        {collapsed ? (
                            <ChevronRight className="size-4 text-gray-600 dark:text-gray-400" />
                        ) : (
                            <ChevronLeft className="size-4 text-gray-600 dark:text-gray-400" />
                        )}
                    </button>
                </TooltipTrigger>
                <TooltipContent 
                    side="right" 
                    className="flex items-center gap-2"
                    id={tooltipId}
                    role="tooltip"
                >
                    <span>{collapsed ? "Expand" : "Collapse"}</span>
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        {collapsed ? "]" : "["}
                    </kbd>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
