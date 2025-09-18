"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Switch } from "@/components/Switch"
import { UserAccessTab } from "@/components/ui/user/UserAccessTab"
import { UserActivityFeed } from "@/components/ui/user/UserActivityFeed"
import { UserActivityTab } from "@/components/ui/user/UserActivityTab"
import { UserRequestsTab } from "@/components/ui/user/UserRequestsTab"
import { UserVisitorsTab } from "@/components/ui/user/UserVisitorsTab"
import { centralizedUsers, getUserById } from "@/data/centralizedUsers"
import { cn } from "@/lib/utils"
import { Activity, Calendar, ChevronLeft, FileText, Shield, User as UserIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useState } from "react"

// Get user detail data from centralized database with fallback to old system
const getUserDetailData = (userId: string) => {
    // First try to find by centralized user ID
    let baseUser = getUserById(userId)
    
    // If not found, try to find by email-based ID (backward compatibility)
    if (!baseUser) {
        baseUser = centralizedUsers.find(user => user.email.split('@')[0].replace('.', '') === userId)
    }
    
    if (!baseUser) return null
    
    return {
        ...baseUser,
        id: userId,
        phoneNumber: baseUser.phone || null,
        lastActive: null,
        signupDate: baseUser.startDate ? new Date(baseUser.startDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }) : "April 9, 2025 at 07:48 PM",
        isTestUser: false,
        deviceType: "Internal",
        uuid: "c02e86ff-0cb4-4adf-b44f-c443a680124e",
        // Use existing fields from centralized database
        acsStatus: baseUser.acsStatus,
        floorSuite: baseUser.floorSuite,
        serviceRequest: baseUser.acsStatus === "pending" ? "New Employee Access Request..." : 
                       baseUser.acsStatus === "suspended" ? "Access Restoration Request..." :
                       "No open requests",
        department: baseUser.department,
        title: baseUser.title,
        manager: baseUser.manager,
        badgeId: baseUser.badgeId
    }
}


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
                            "border-b-2 py-2 px-1 text-sm font-medium flex items-center gap-2",
                            activeTab === "overview"
                                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        )}
                    >
                        <UserIcon className="h-4 w-4" />
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab("access")}
                        className={cn(
                            "border-b-2 py-2 px-1 text-sm font-medium flex items-center gap-2",
                            activeTab === "access"
                                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        )}
                    >
                        <Shield className="h-4 w-4" />
                        Access
                    </button>
                    <button
                        onClick={() => setActiveTab("requests")}
                        className={cn(
                            "border-b-2 py-2 px-1 text-sm font-medium flex items-center gap-2",
                            activeTab === "requests"
                                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        )}
                    >
                        <FileText className="h-4 w-4" />
                        Requests
                    </button>
                    <button
                        onClick={() => setActiveTab("visitors")}
                        className={cn(
                            "border-b-2 py-2 px-1 text-sm font-medium flex items-center gap-2",
                            activeTab === "visitors"
                                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        )}
                    >
                        <Calendar className="h-4 w-4" />
                        Visitors
                    </button>
                    <button
                        onClick={() => setActiveTab("activity")}
                        className={cn(
                            "border-b-2 py-2 px-1 text-sm font-medium flex items-center gap-2",
                            activeTab === "activity"
                                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        )}
                    >
                        <Activity className="h-4 w-4" />
                        Activity
                    </button>
                </nav>
            </div>

            {/* Main content */}
            {activeTab === "overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Activity Feed - Left side (2/3 width) */}
                    <div className="lg:col-span-2">
                        <UserActivityFeed 
                            userId={userDetail.id}
                        />
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

            {/* Access tab */}
            {activeTab === "access" && (
                <UserAccessTab 
                    userId={userDetail.id}
                    containerClassName="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                />
            )}

            {/* Requests tab */}
            {activeTab === "requests" && (
                <UserRequestsTab 
                    userId={userDetail.id}
                    containerClassName="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                />
            )}

            {/* Visitors tab */}
            {activeTab === "visitors" && (
                <UserVisitorsTab 
                    userId={userDetail.id}
                    containerClassName="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                />
            )}

            {/* Activity tab */}
            {activeTab === "activity" && (
                <UserActivityTab 
                    userId={userDetail.id}
                    containerClassName="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                />
            )}
        </div>
    )
}
