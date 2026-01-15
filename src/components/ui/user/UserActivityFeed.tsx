"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { cn } from "@/lib/utils"
import { Calendar, Mail, MessageCircle, Phone, Plus, Users } from "lucide-react"
import { useState } from "react"

// Mock activity data for regular users
const tenantActivityData = [
    {
        id: "1",
        type: "note",
        title: "Admin note",
        author: "Steve D.",
        timestamp: "September 4, 2025 at 2:55 PM",
        content: "They went to the gym today",
        icon: "note"
    },
    {
        id: "2",
        type: "note",
        title: "Admin note",
        author: "Chris S.",
        timestamp: "September 4, 2025 at 11:17 AM",
        content: "Test note",
        icon: "note"
    },
    {
        id: "3",
        type: "note",
        title: "Admin note",
        author: "Chris S.",
        timestamp: "September 2, 2025 at 4:43 PM",
        content: "Alex was asking about the next rooftop event",
        icon: "note"
    }
]

// Mock activity data for leads - sales/outreach focused
const leadActivityData = [
    {
        id: "1",
        type: "outreach",
        title: "Initial outreach",
        author: "Sarah M.",
        timestamp: "January 14, 2025 at 3:30 PM",
        content: "Sent introductory email about available spaces on Floor 10. Mentioned upcoming amenity improvements and current promotional rates.",
        icon: "email"
    },
    {
        id: "2",
        type: "call",
        title: "Discovery call",
        author: "Sarah M.",
        timestamp: "January 12, 2025 at 11:00 AM",
        content: "Had a 30-minute call with J. Jones. They're looking for 5,000-7,000 sqft for their team of 25. Budget is flexible. Interested in modern amenities and parking.",
        icon: "phone"
    },
    {
        id: "3",
        type: "tour",
        title: "Tour scheduled",
        author: "Mike R.",
        timestamp: "January 10, 2025 at 2:15 PM",
        content: "Scheduled building tour for January 20th at 10:00 AM. Will show Floor 10 spaces and rooftop amenities. Jerry Helfer will also attend.",
        icon: "calendar"
    },
    {
        id: "4",
        type: "note",
        title: "Lead qualification",
        author: "Sarah M.",
        timestamp: "January 8, 2025 at 4:00 PM",
        content: "Lead referred by Jerry Helfer (CEO). High priority prospect. Company is expanding and needs space within 60 days. Decision maker.",
        icon: "note"
    },
    {
        id: "5",
        type: "meeting",
        title: "Team introduction",
        author: "Sarah M.",
        timestamp: "January 5, 2025 at 9:30 AM",
        content: "Connected with J. Jones at the networking event. Expressed strong interest in Willis Tower location. Exchanged contact information.",
        icon: "users"
    }
]

// Activity filter tabs for regular users
const tenantActivityTabs = [
    { name: "All", active: true },
    { name: "Access", active: false },
    { name: "Bookings", active: false },
    { name: "Visitors", active: false },
    { name: "RSVPs", active: false },
    { name: "Notes", active: false },
]

// Activity filter tabs for leads
const leadActivityTabs = [
    { name: "All", active: true },
    { name: "Outreach", active: false },
    { name: "Calls", active: false },
    { name: "Tours", active: false },
    { name: "Notes", active: false },
]

interface UserActivityFeedProps {
    userId?: string
    userType?: "tenant" | "lead"
    containerClassName?: string
}

// Helper function to get the icon component based on activity type
const getActivityIcon = (iconType: string) => {
    switch (iconType) {
        case "email":
            return <Mail className="h-4 w-4 text-blue-500" />
        case "phone":
            return <Phone className="h-4 w-4 text-green-500" />
        case "calendar":
            return <Calendar className="h-4 w-4 text-purple-500" />
        case "users":
            return <Users className="h-4 w-4 text-orange-500" />
        case "note":
        default:
            return <MessageCircle className="h-4 w-4 text-blue-500" />
    }
}

// Helper function to get border color based on activity type
const getActivityBorderColor = (iconType: string) => {
    switch (iconType) {
        case "email":
            return "border-blue-500"
        case "phone":
            return "border-green-500"
        case "calendar":
            return "border-purple-500"
        case "users":
            return "border-orange-500"
        case "note":
        default:
            return "border-blue-500"
    }
}

export function UserActivityFeed({ userType, containerClassName }: UserActivityFeedProps) {
    const [activeFilter, setActiveFilter] = useState("All")

    // Use different data and tabs based on user type
    const activityData = userType === "lead" ? leadActivityData : tenantActivityData
    const activityTabs = userType === "lead" ? leadActivityTabs : tenantActivityTabs

    return (
        <Card className={cn("h-full", containerClassName)}>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Activity</h2>
                    <Button variant="primary" size="sm" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        {userType === "lead" ? "Log activity" : "Add note"}
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
                                <div className={cn(
                                    "w-10 h-10 rounded-full border-2 bg-white dark:bg-gray-800 flex items-center justify-center",
                                    getActivityBorderColor(activity.icon)
                                )}>
                                    {getActivityIcon(activity.icon)}
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
                        <p className="text-gray-500 dark:text-gray-400">
                            {userType === "lead" ? "Lead activity will appear here when available" : "User activity will appear here when available"}
                        </p>
                    </div>
                )}
            </div>
        </Card>
    )
}
