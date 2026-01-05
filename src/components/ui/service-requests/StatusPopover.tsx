"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/Input"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { useState, useEffect } from "react"
import { serviceRequestStatuses, type ServiceRequestStatus } from "@/data/statuses"

interface StatusPopoverProps {
    currentStatus: string
    onStatusChange: (status: string) => void
    children: React.ReactNode
}

// Map color names to Tailwind color classes for dots
const colorMap: Record<string, string> = {
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    green: "bg-green-500",
    pink: "bg-pink-500",
    gray: "bg-gray-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    indigo: "bg-indigo-500",
    teal: "bg-teal-500",
}

export function StatusPopover({
    currentStatus,
    onStatusChange,
    children,
}: StatusPopoverProps) {
    const [open, setOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [availableStatuses, setAvailableStatuses] = useState<ServiceRequestStatus[]>(serviceRequestStatuses)

    // Load statuses from localStorage if available (includes custom statuses)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('serviceRequestStatuses')
            if (saved) {
                try {
                    const parsedStatuses = JSON.parse(saved)
                    setAvailableStatuses(parsedStatuses)
                } catch (e) {
                    // If parsing fails, use default statuses
                    setAvailableStatuses(serviceRequestStatuses)
                }
            }
        }
    }, [])

    // Reset search when popover opens
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
        if (newOpen) {
            setSearchQuery("")
            // Reload statuses when opening to get latest custom statuses
            if (typeof window !== 'undefined') {
                const saved = localStorage.getItem('serviceRequestStatuses')
                if (saved) {
                    try {
                        const parsedStatuses = JSON.parse(saved)
                        setAvailableStatuses(parsedStatuses)
                    } catch (e) {
                        setAvailableStatuses(serviceRequestStatuses)
                    }
                }
            }
        }
    }

    const filteredStatuses = availableStatuses.filter(status =>
        status.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleStatusSelect = (statusName: string) => {
        onStatusChange(statusName)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent 
                className="w-64 p-0" 
                align="start"
            >
                <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                    <Input
                        placeholder="Search status..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-8"
                        autoFocus
                    />
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                    {filteredStatuses.length > 0 ? (
                        filteredStatuses.map((status) => {
                            const isSelected = currentStatus === status.name
                            const dotColor = colorMap[status.color] || "bg-gray-500"
                            
                            return (
                                <div
                                    key={status.id}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer",
                                        isSelected && "bg-gray-50 dark:bg-gray-800"
                                    )}
                                    onClick={() => handleStatusSelect(status.name)}
                                >
                                    <div className={cn("w-2 h-2 rounded-full", dotColor)} />
                                    <span className="flex-1 text-sm text-gray-900 dark:text-gray-50">
                                        {status.name}
                                    </span>
                                    {isSelected && (
                                        <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    )}
                                </div>
                            )
                        })
                    ) : (
                        <div className="px-3 py-2 text-sm text-gray-500">
                            No statuses found
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}

