"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { cn } from "@/lib/utils"
import { MessageCircle, Plus } from "lucide-react"
import { useState } from "react"

// Mock activity data
const activityData = [
    {
        id: "1",
        type: "note",
        title: "Admin note",
        author: "Steve D.",
        timestamp: "September 4, 2025 at 2:55 PM",
        content: "They went to the gym today"
    },
    {
        id: "2", 
        type: "note",
        title: "Admin note",
        author: "Chris S.",
        timestamp: "September 4, 2025 at 11:17 AM",
        content: "Test note"
    },
    {
        id: "3",
        type: "note", 
        title: "Admin note",
        author: "Chris S.",
        timestamp: "September 2, 2025 at 4:43 PM",
        content: "Alex was asking about the next rooftop event"
    }
]

// Activity filter tabs
const activityTabs = [
    { name: "All", active: true },
    { name: "Access", active: false },
    { name: "Bookings", active: false },
    { name: "Visitors", active: false },
    { name: "RSVPs", active: false },
    { name: "Notes", active: false },
]

interface UserActivityFeedProps {
    userId?: string // Future: will be used to filter activity data by user
    containerClassName?: string
}

export function UserActivityFeed({ containerClassName }: UserActivityFeedProps) {
    const [activeFilter, setActiveFilter] = useState("All")

    return (
        <Card className={cn("h-full", containerClassName)}>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Activity</h2>
                    <Button variant="primary" size="sm" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add note
                    </Button>
                </div>
                
                {/* Activity filter tabs */}
                <div className="flex space-x-1 mb-6">
                    {activityTabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveFilter(tab.name)}
                            className={cn(
                                "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                                activeFilter === tab.name
                                    ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
                            )}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Activity Timeline */}
                <div className="space-y-6">
                    {activityData.map((activity, index) => (
                        <div key={activity.id} className="flex gap-4">
                            {/* Timeline indicator */}
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full border-2 border-blue-500 bg-white dark:bg-gray-800 flex items-center justify-center">
                                    <MessageCircle className="h-4 w-4 text-blue-500" />
                                </div>
                                {index < activityData.length - 1 && (
                                    <div className="w-px h-16 bg-gray-200 dark:bg-gray-700 mt-2" />
                                )}
                            </div>

                            {/* Activity content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {activity.title}
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                            {activity.timestamp}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                                    {activity.author}
                                </div>
                                
                                {/* Note content bubble */}
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        {activity.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty state if no activity */}
                {activityData.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                            <MessageCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No activity yet</h3>
                        <p className="text-gray-500 dark:text-gray-400">User activity will appear here when available</p>
                    </div>
                )}
            </div>
        </Card>
    )
}
