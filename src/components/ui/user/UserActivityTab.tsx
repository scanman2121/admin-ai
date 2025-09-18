"use client"

import { Input } from "@/components/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, FileText, HelpCircle, Lock, Search, User } from "lucide-react"
import { useState } from "react"

// Mock data for activity events
const activityEvents = [
    {
        id: "1",
        type: "note",
        action: "Note Added",
        timestamp: "September 04, 2025 at 02:55 PM",
        content: "They went to the gym today"
    },
    {
        id: "2",
        type: "note", 
        action: "Note Added",
        timestamp: "September 04, 2025 at 11:17 AM",
        content: "Test note"
    },
    {
        id: "3",
        type: "note",
        action: "Note Added", 
        timestamp: "September 02, 2025 at 04:43 PM",
        content: "Alex was asking about the next rooftop event"
    }
]

// Statistics data
const statsData = [
    { name: "Accesses", value: "-", icon: Lock, color: "text-blue-600" },
    { name: "Bookings", value: "-", icon: Calendar, color: "text-green-600" },
    { name: "Visitors", value: "-", icon: User, color: "text-purple-600" },
    { name: "Notes", value: "3", icon: FileText, color: "text-teal-600" },
    { name: "Responses", value: "-", icon: HelpCircle, color: "text-cyan-600" },
]

interface UserActivityTabProps {
    userId?: string // Future: will be used to filter activity data by user
    containerClassName?: string
}

export function UserActivityTab({ containerClassName }: UserActivityTabProps) {
    const [selectedPeriod, setSelectedPeriod] = useState("last30days")
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className={containerClassName || "space-y-6"}>
            {/* Header with Time Period Dropdown */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">Activity</h2>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="last7days">Last 7 Days</SelectItem>
                        <SelectItem value="last30days">Last 30 Days</SelectItem>
                        <SelectItem value="last90days">Last 90 Days</SelectItem>
                        <SelectItem value="lastyear">Last Year</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {statsData.map((stat) => {
                    const IconComponent = stat.icon
                    return (
                        <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        <span>{stat.name}</span>
                                        <HelpCircle className="h-3 w-3" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                                        {stat.value}
                                    </div>
                                </div>
                                <div className={`${stat.color} bg-gray-50 dark:bg-gray-700 p-2 rounded-lg`}>
                                    <IconComponent className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                    placeholder="Search activity events"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Activity Timeline */}
            <div className="space-y-6">
                {activityEvents.map((event, index) => (
                    <div key={event.id} className="flex gap-4">
                        {/* Timeline indicator */}
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full border-2 border-blue-500 bg-white dark:bg-gray-800 flex items-center justify-center">
                                <FileText className="h-4 w-4 text-blue-500" />
                            </div>
                            {index < activityEvents.length - 1 && (
                                <div className="w-px h-16 bg-gray-200 dark:bg-gray-700 mt-2" />
                            )}
                        </div>

                        {/* Event content */}
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                {event.action} <span className="text-gray-500 dark:text-gray-400 font-normal">{event.timestamp}</span>
                            </div>
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                {event.content}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Empty state if no activity */}
                {activityEvents.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                            <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No activity yet</h3>
                        <p className="text-gray-500 dark:text-gray-400">User activity will appear here when available</p>
                    </div>
                )}
            </div>
        </div>
    )
}
