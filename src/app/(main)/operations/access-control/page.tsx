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

// Generate access control data from centralized users with specific service request details
const generateServiceRequest = (user: any) => {
    switch (user.id) {
        case "jennifer-martinez-new":
            return {
                request: "New Employee MKA Request...",
                type: "New Employee MKA",
                status: "New"
            }
        case "kevin-chen-new":
            return {
                request: "Lost Device Replacement...",
                type: "Lost Device", 
                status: "In Progress"
            }
        case "rachel-thompson-new":
            return {
                request: "New Phone Setup Request...",
                type: "New Phone",
                status: "New"
            }
        case "marcus-rodriguez-new":
            return {
                request: "Access Level Update Request...",
                type: "Access Level Update",
                status: "In Progress"
            }
        case "amanda-kim-contractor":
            return {
                request: "Tenant Departure Processing...",
                type: "Tenant Departure",
                status: "New"
            }
        case "brian-wilson-suspended":
            return {
                request: "Termination of Employment...",
                type: "Termination of Employment",
                status: "New"
            }
        default:
            if (user.acsStatus === "pending") {
                return {
                    request: "New Employee MKA Request...",
                    type: "New Employee MKA",
                    status: "In Progress"
                }
            } else if (user.acsStatus === "suspended") {
                return {
                    request: "Lost Device Replacement...",
                    type: "Lost Device", 
                    status: "Under Review"
                }
            } else if (user.acsStatus === "inactive") {
                return {
                    request: "Termination of Employment...",
                    type: "Termination of Employment",
                    status: "Pending Review"
                }
            }
            return {
                request: "No open requests",
                type: null,
                status: null
            }
    }
}

// Filter users to only show those with access requests (pending, suspended, or inactive)
const accessRequestsData = centralizedUsers
    .filter(user => user.acsStatus === "pending" || user.acsStatus === "suspended" || user.acsStatus === "inactive")
    .map(user => {
        const serviceDetails = generateServiceRequest(user)
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            company: user.company,
            floorSuite: user.floorSuite,
            serviceRequest: serviceDetails.request,
            serviceRequestType: serviceDetails.type,
            serviceRequestStatus: serviceDetails.status,
            acsStatus: user.acsStatus,
            hasNotes: true,
            badgeId: user.badgeId,
        }
    })

export default function AccessControl() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 8, 17)) // Sep 17, 2025
    const [selectedTenant, setSelectedTenant] = useState<string>("all-tenants")
    const pathname = usePathname()

    // Calculate access requests count for the badge
    const accessRequestsCount = accessRequestsData.length

    // Get status color variant
    const getStatusVariant = (status: string) => {
        switch (status) {
            case "New":
                return "text-red-600 dark:text-red-400"
            case "In Progress":
                return "text-blue-600 dark:text-blue-400"
            case "Under Review":
                return "text-orange-600 dark:text-orange-400"
            case "Pending Review":
                return "text-yellow-600 dark:text-yellow-400"
            case "Completed":
                return "text-green-600 dark:text-green-400"
            default:
                return "text-gray-600 dark:text-gray-400"
        }
    }

    // Get initials from name
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }

    // Get avatar background color
    const getAvatarColor = (index: number) => {
        const colors = [
            "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
            "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400", 
            "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400",
            "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400",
            "bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400"
        ]
        return colors[index % colors.length]
    }

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
                <div className="flex items-center gap-2">
                    <Button variant="ghost">
                        Export
                    </Button>
                    <Button variant="primary">
                        Generate report
                    </Button>
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
                                            {accessRequestsCount} users awaiting access
                                        </p>
                                        <p className="text-sm text-blue-700 dark:text-blue-300">
                                            Review and approve pending access requests
                                        </p>
                                    </div>
                                </div>
                                <Link href="/operations/access-control/access-requests">
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
                            {accessRequestsData.slice(0, 3).map((user, index) => (
                                <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${getAvatarColor(index)}`}>
                                            <span className="text-sm font-medium">
                                                {getInitials(user.name)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                                {user.name}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {user.company} • {user.serviceRequestType}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-900 dark:text-gray-50">
                                            {new Date().toLocaleDateString('en-US', { 
                                                month: 'short', 
                                                day: 'numeric', 
                                                year: 'numeric' 
                                            })}
                                        </p>
                                        <p className={`text-sm ${getStatusVariant(user.serviceRequestStatus || 'New')}`}>
                                            {user.serviceRequestStatus}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {accessRequestsData.length === 0 && (
                                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                                    No pending access requests
                                </div>
                            )}
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