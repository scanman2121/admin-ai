"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Switch } from "@/components/Switch"
import { users } from "@/data/data"
import { cn } from "@/lib/utils"
import { ChevronLeft, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useState } from "react"

// Mock additional user data for the detail page
const getUserDetailData = (userId: string) => {
    const baseUser = users.find(user => user.email.split('@')[0].replace('.', '') === userId)
    
    if (!baseUser) return null
    
    return {
        ...baseUser,
        id: userId,
        phoneNumber: null,
        lastActive: null,
        signupDate: "April 9, 2025 at 07:48 PM",
        isTestUser: true,
        deviceType: "Internal",
        uuid: "c02e86ff-0cb4-4adf-b44f-c443a680124e"
    }
}

// Activity tabs
const activityTabs = [
    { name: "All", active: true },
    { name: "Access", active: false },
    { name: "Bookings", active: false },
    { name: "Visitors", active: false },
    { name: "RSVPs", active: false },
    { name: "Notes", active: false },
]

export default function UserDetailPage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState("overview")
    const [isTestUser, setIsTestUser] = useState(true)
    
    const userDetail = getUserDetailData(params.id)
    
    if (!userDetail) {
        notFound()
    }

    return (
        <div className="space-y-6">
            {/* Header with back navigation */}
            <div className="flex items-center gap-3">
                <Link 
                    href="/users"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Link>
                <span className="text-sm text-gray-500">Users</span>
            </div>

            {/* User header section */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative size-16 overflow-hidden rounded-full">
                        {userDetail.avatarUrl ? (
                            <Image
                                src={userDetail.avatarUrl}
                                alt={userDetail.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-lg font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                {userDetail.initials}
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
                            {userDetail.name}
                        </h1>
                    </div>
                </div>
                
                {/* Status dropdown */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium text-green-700 dark:text-green-400">Active</span>
                    </div>
                    <Button variant="ghost" size="sm">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </Button>
                </div>
            </div>

            {/* Tab navigation */}
            <div className="border-b border-gray-200 dark:border-gray-800">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={cn(
                            "border-b-2 py-2 px-1 text-sm font-medium",
                            activeTab === "overview"
                                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        )}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab("tenant-roles")}
                        className={cn(
                            "border-b-2 py-2 px-1 text-sm font-medium",
                            activeTab === "tenant-roles"
                                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        )}
                    >
                        Tenant roles
                    </button>
                    <button
                        onClick={() => setActiveTab("building-admin-roles")}
                        className={cn(
                            "border-b-2 py-2 px-1 text-sm font-medium",
                            activeTab === "building-admin-roles"
                                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        )}
                    >
                        Building admin roles
                    </button>
                </nav>
            </div>

            {/* Main content */}
            {activeTab === "overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Activity section - Left side (2/3 width) */}
                    <div className="lg:col-span-2">
                        <Card className="h-full">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Activity</h2>
                                    <Button variant="primary" size="sm" className="flex items-center gap-2">
                                        <Plus className="h-4 w-4" />
                                        Add note
                                    </Button>
                                </div>
                                
                                {/* Activity tabs */}
                                <div className="flex space-x-1 mb-6">
                                    {activityTabs.map((tab) => (
                                        <button
                                            key={tab.name}
                                            className={cn(
                                                "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                                                tab.active
                                                    ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
                                            )}
                                        >
                                            {tab.name}
                                        </button>
                                    ))}
                                </div>

                                {/* No activity state */}
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No activity yet</h3>
                                    <p className="text-gray-500 dark:text-gray-400">User activity will appear here when available</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* User info section - Right side (1/3 width) */}
                    <div className="lg:col-span-1">
                        <Card>
                            <div className="p-6 space-y-6">
                                {/* User basic info */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                        {userDetail.name}
                                    </h3>
                                    <p className="text-xs text-gray-500">User name</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                                        {userDetail.company}
                                    </h3>
                                    <p className="text-xs text-gray-500">Company</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                        {userDetail.email}
                                    </h3>
                                    <p className="text-xs text-gray-500">Email</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                        {userDetail.phoneNumber || "-"}
                                    </h3>
                                    <p className="text-xs text-gray-500">Phone number</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                        {userDetail.lastActive || "-"}
                                    </h3>
                                    <p className="text-xs text-gray-500">Last active</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                        {userDetail.signupDate}
                                    </h3>
                                    <p className="text-xs text-gray-500">Signup date</p>
                                </div>

                                {/* Test user toggle */}
                                <div className="flex items-center justify-between pt-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Test user</h3>
                                        <p className="text-xs text-gray-500">Test users and their actions are not shown in analytics</p>
                                    </div>
                                    <Switch 
                                        checked={isTestUser}
                                        onCheckedChange={setIsTestUser}
                                    />
                                </div>

                                {/* Internal section */}
                                <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Internal</h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                                {userDetail.deviceType}
                                            </h4>
                                            <p className="text-xs text-gray-500">Device type</p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1 break-all">
                                                {userDetail.uuid}
                                            </h4>
                                            <p className="text-xs text-gray-500">UUID</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            )}

            {/* Other tab content placeholders */}
            {activeTab === "tenant-roles" && (
                <Card>
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">Tenant Roles</h2>
                        <p className="text-gray-500 dark:text-gray-400">Tenant role management content will be implemented here.</p>
                    </div>
                </Card>
            )}

            {activeTab === "building-admin-roles" && (
                <Card>
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">Building Admin Roles</h2>
                        <p className="text-gray-500 dark:text-gray-400">Building admin role management content will be implemented here.</p>
                    </div>
                </Card>
            )}
        </div>
    )
}
