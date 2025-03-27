"use client"

import { cn } from "@/lib/utils"

interface KeyboardShortcutProps {
    keys: string[]
    className?: string
}

export function KeyboardShortcut({ keys, className }: KeyboardShortcutProps) {
    return (
        <div className={cn("flex items-center gap-1", className)}>
            {keys.map((key, index) => (
                <span key={index} className="inline-flex">
                    {index > 0 && <span className="mx-1 text-gray-400">+</span>}
                    <kbd className="px-2 py-1 text-xs font-medium bg-gray-100 border border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                        {key}
                    </kbd>
                </span>
            ))}
        </div>
    )
} 