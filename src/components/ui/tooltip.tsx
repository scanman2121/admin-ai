"use client"

import { cn } from "@/lib/utils"
import * as TooltipPrimitives from "@radix-ui/react-tooltip"
import * as React from "react"

const TooltipProvider = TooltipPrimitives.Provider

const TooltipTrigger = TooltipPrimitives.Trigger

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitives.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitives.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitives.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
            "z-50 overflow-hidden rounded-md px-3 py-1.5 text-sm text-gray-50 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            "bg-gray-900 dark:bg-gray-50 dark:text-gray-900",
            "shadow-md",
            "break-words max-w-[200px]",
            className
        )}
        {...props}
    />
))
TooltipContent.displayName = TooltipPrimitives.Content.displayName

const Tooltip = TooltipPrimitives.Root

export {
    Tooltip, TooltipContent,
    TooltipProvider, TooltipTrigger
}
