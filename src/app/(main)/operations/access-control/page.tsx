"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { DatePicker } from "@/components/DatePicker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { centralizedUsers } from "@/data/centralizedUsers"
import { RiSettings3Line } from "@remixicon/react"
import { ArrowRight, InfoIcon, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Access Control page
const tabs = [
    { name: "Overview", href: "/operations/access-control" },
    { name: "Access requests", href: "/operations/access-control/access-requests" },
    { name: "Active access", href: "/operations/access-control/active-access" },
    { name: "Revoked access", href: "/operations/access-control/revoked-access" },
    { name: "Activity", href: "/operations/access-control/activity" },
    { name: "Access groups", href: "/operations/access-control/access-groups" },
    { name: "Audit trail", href: "/operations/access-control/audit-trail" },
]

export default function AccessControl() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 8, 17)) // Sep 17, 2025
    const [selectedTenant, setSelectedTenant] = useState<string>("all-tenants")
    const pathname = usePathname()

    // Calculate access requests count for the badge
    const accessRequestsCount = centralizedUsers.filter(user => 
        user.acsStatus === "pending" || user.acsStatus === "suspended" || user.acsStatus === "inactive"
    ).length

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                        Access Control
                    </h1>
                    <Link href="/operations/access-control/settings">
                        <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                            <RiSettings3Line className="size-4" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Tab Navigation */}
            <TabNavigation>
                {tabs.map((tab) => (
                    <TabNavigationLink
                        key={tab.name}
                        asChild
                        active={pathname === tab.href}
                    >
                        <Link href={tab.href}>
                            {tab.name}
                            {tab.name === "Access requests" && (
                                <Badge variant="error" className="ml-2 text-xs">
                                    {accessRequestsCount}
                                </Badge>
                            )}
                        </Link>
                    </TabNavigationLink>
                ))}
            </TabNavigation>



            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Main Content */}
                <div className="space-y-6">
                    {/* Dashboard Analytics Card */}
                    <Card>
                        <div className="mb-6">
                            <DatePicker
                                value={selectedDate}
                                onChange={(date) => date && setSelectedDate(date)}
                                placeholder="Select date"
                                className="w-48"
                            />
                        </div>
                        <div className="space-y-6">
                            {/* Attendance Card */}
                    <Card>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Attendance
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                                        0 of 112
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Employees</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                                        0 of 0
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Visitors</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                                    0 of 112
                                </span>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total on site</p>
                            </div>
                        </div>
                    </Card>

                    {/* Traffic Report Card */}
                    <Card>
                        <div className="flex items-center gap-2 mb-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                                Traffic report
                            </h3>
                            <InfoIcon className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="space-y-2">
                            <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">0</span>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total badge-ins</p>
                        </div>
                    </Card>

                    {/* Mobile Badge Attendance Card */}
                    <Card>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Mobile badge attendance
                        </h3>
                        <div className="flex items-center justify-between">
                            <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Select tenant" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all-tenants">All tenants</SelectItem>
                                    <SelectItem value="tenant-1">Tenant 1</SelectItem>
                                    <SelectItem value="tenant-2">Tenant 2</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                                    0 of 2
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Mobile badge swipes
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Visitor Management Card */}
                    <Card>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Visitor Management
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Today's summary
                                </p>
                                <div className="grid grid-cols-3 gap-6 mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                        <span className="text-lg font-semibold text-gray-900 dark:text-gray-50">0</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Expected</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                                        <span className="text-lg font-semibold text-gray-900 dark:text-gray-50">0</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Checked-in</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                                        <span className="text-lg font-semibold text-gray-900 dark:text-gray-50">0</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Checked-out</span>
                                    </div>
                                </div>
                                {/* Progress Bar */}
                                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full flex">
                                        <div className="bg-orange-500 flex-1"></div>
                                        <div className="bg-teal-500 flex-1"></div>
                                        <div className="bg-pink-500 flex-1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                        </div>
                    </Card>
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-6">
                    {/* Access Requests Card */}
                    <Card>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Access requests
                        </h3>
                        
                        {/* Banner Content */}
                        <div className="relative overflow-hidden rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800/30 dark:bg-blue-900/20 mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800/50">
                                        <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                            3 users awaiting access
                                        </p>
                                        <p className="text-sm text-blue-700 dark:text-blue-300">
                                            Review and approve pending access requests
                                        </p>
                                    </div>
                                </div>
                                <Link href="/operations/access-control/user-access">
                                    <Button 
                                        variant="primary" 
                                        className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        <span className="flex items-center gap-2">
                                            View
                                            <ArrowRight className="h-4 w-4" />
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Active Access Requests List */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                            SC
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                            Sarah Chen
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            TechCorp Solutions • New Employee Access
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-900 dark:text-gray-50">Dec 15, 2024</p>
                                    <p className="text-sm text-blue-600 dark:text-blue-400">In Progress</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50">
                                        <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                                            ED
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                            Dr. Emma Davis
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            HealthTech Innovations • Lost Device Access
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-900 dark:text-gray-50">Dec 14, 2024</p>
                                    <p className="text-sm text-orange-600 dark:text-orange-400">Pending Review</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                            MT
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                            Michael Thompson
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Thompson Consulting • Access Level Change
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-900 dark:text-gray-50">Dec 13, 2024</p>
                                    <p className="text-sm text-green-600 dark:text-green-400">Approved</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Bottom Row - Visitor Profiles and Mobile Access */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Visitor Profiles Card */}
                        <Card>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                                Visitor profiles
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">53</div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Total unique visitor records
                                    </p>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">0</div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        First time visitors this week
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Mobile Access Card */}
                        <Card>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                                Mobile access
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                                        2 of 112
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Active users</p>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">8</div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Badge-ins today
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
} 