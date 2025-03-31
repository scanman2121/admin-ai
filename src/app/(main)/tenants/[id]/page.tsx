"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RiArrowLeftLine, RiBuilding4Line, RiCalendarEventLine, RiMapPinLine, RiShoppingBag3Line, RiTeamLine, RiUserLine } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"

// Mock data for tenants
const tenantsData = {
    "1": {
        id: "1",
        name: "Acme Corporation",
        industry: "Technology",
        space: "5,000 sqft",
        floor: "15th Floor",
        building: "125 Highland Ave",
        moveInDate: "April 15, 2024",
        leaseStart: "2024-04-15",
        leaseEnd: "2027-04-14",
        status: "Active",
        logo: "https://ui-avatars.com/api/?name=Acme+Corporation&background=0D9488&color=fff",
        primaryContact: {
            name: "John Smith",
            role: "Office Manager",
            email: "john.smith@acme.com",
            phone: "(555) 123-4567"
        },
        stats: {
            totalEmployees: 150,
            activeUsers: 142,
            pendingUsers: 8,
            totalVisits: 3245,
            avgDailyVisits: 85
        },
        recentActivity: [
            {
                type: "Event",
                title: "Team Building Workshop",
                date: "2024-03-25",
                status: "Upcoming"
            },
            {
                type: "Marketplace",
                title: "Catering Order",
                date: "2024-03-24",
                status: "Completed"
            },
            {
                type: "Access",
                title: "After Hours Access Request",
                date: "2024-03-23",
                status: "Approved"
            }
        ]
    },
    "2": {
        id: "2",
        name: "Global Enterprises",
        industry: "Finance",
        space: "8,000 sqft",
        floor: "20th Floor",
        building: "400 Market Street",
        moveInDate: "May 1, 2024",
        leaseStart: "2024-05-01",
        leaseEnd: "2027-04-30",
        status: "Active",
        logo: "https://ui-avatars.com/api/?name=Global+Enterprises&background=6366F1&color=fff",
        primaryContact: {
            name: "Sarah Johnson",
            role: "Facilities Manager",
            email: "sarah.j@globalent.com",
            phone: "(555) 234-5678"
        },
        stats: {
            totalEmployees: 200,
            activeUsers: 185,
            pendingUsers: 15,
            totalVisits: 4500,
            avgDailyVisits: 120
        },
        recentActivity: [
            {
                type: "Event",
                title: "Office Expansion Meeting",
                date: "2024-03-26",
                status: "Upcoming"
            },
            {
                type: "Access",
                title: "Weekend Access Approval",
                date: "2024-03-23",
                status: "Completed"
            },
            {
                type: "Marketplace",
                title: "Office Supplies Order",
                date: "2024-03-22",
                status: "Completed"
            }
        ]
    }
} as const

// Type for tenant data
type TenantData = typeof tenantsData[keyof typeof tenantsData]

export default function TenantDetailPage({ params }: { params: { id: string } }) {
    // Get tenant data based on ID
    const tenant: TenantData | undefined = tenantsData[params.id as keyof typeof tenantsData]

    if (!tenant) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">Tenant not found</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">The tenant you're looking for doesn't exist or has been removed.</p>
                    <Link href="/tenants" className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                        Back to tenants
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header with back button */}
            <div className="flex items-center gap-4">
                <Link href="/tenants" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                    <RiArrowLeftLine className="size-5" />
                </Link>
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                    Tenant Details
                </h1>
            </div>

            {/* Tenant Overview Card */}
            <Card className="p-6">
                <div className="flex items-center gap-6">
                    <div className="relative shrink-0">
                        <div className="size-20 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center">
                            <Image
                                src={tenant.logo}
                                alt={tenant.name}
                                width={60}
                                height={60}
                                className="rounded object-contain"
                            />
                        </div>
                        <div className="absolute -bottom-1 -right-1 size-6 bg-green-500 rounded-full flex items-center justify-center">
                            <RiBuilding4Line className="size-3.5 text-white" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 truncate">
                                {tenant.name}
                            </h2>
                            <Badge className={tenant.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : ""}>
                                • {tenant.status}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                            <span>{tenant.industry}</span>
                            <span>{tenant.space}</span>
                            <span>{tenant.floor}</span>
                            <span>Move-in: {tenant.moveInDate}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline">
                            Edit details
                        </Button>
                        <Button>
                            Contact tenant
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium">User overview</h3>
                                <RiTeamLine className="size-5 text-gray-400" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-3xl font-semibold">{tenant.stats.totalEmployees}</p>
                                    <p className="text-sm text-gray-500">Total employees</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-3xl font-semibold text-green-600">{tenant.stats.activeUsers}</p>
                                    <p className="text-sm text-gray-500">Active users</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-3xl font-semibold text-amber-600">{tenant.stats.pendingUsers}</p>
                                    <p className="text-sm text-gray-500">Pending users</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium">Access activity</h3>
                                <RiMapPinLine className="size-5 text-gray-400" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-3xl font-semibold">{tenant.stats.totalVisits}</p>
                                    <p className="text-sm text-gray-500">Total visits</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-3xl font-semibold">{tenant.stats.avgDailyVisits}</p>
                                    <p className="text-sm text-gray-500">Avg. daily visits</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium">Primary contact</h3>
                                <RiUserLine className="size-5 text-gray-400" />
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <p className="font-medium">{tenant.primaryContact.name}</p>
                                    <p className="text-sm text-gray-500">{tenant.primaryContact.role}</p>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <p>{tenant.primaryContact.email}</p>
                                    <p>{tenant.primaryContact.phone}</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Recent Activity */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-medium">Recent activity</h3>
                            <Button variant="outline" size="sm">View all</Button>
                        </div>
                        <div className="space-y-6">
                            {tenant.recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="size-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                                        {activity.type === "Event" && <RiCalendarEventLine className="size-4 text-gray-600" />}
                                        {activity.type === "Marketplace" && <RiShoppingBag3Line className="size-4 text-gray-600" />}
                                        {activity.type === "Access" && <RiMapPinLine className="size-4 text-gray-600" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-gray-50">{activity.title}</p>
                                        <div className="flex items-center gap-3 text-sm">
                                            <span className="text-gray-500">{activity.type}</span>
                                            <span className="text-gray-500">{activity.date}</span>
                                        </div>
                                    </div>
                                    <Badge className={
                                        activity.status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                                            activity.status === "Upcoming" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" :
                                                ""
                                    }>
                                        {activity.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="users">
                    {/* Users tab content will go here */}
                    <Card className="p-6">
                        <p>Users content coming soon...</p>
                    </Card>
                </TabsContent>

                <TabsContent value="activity">
                    {/* Activity tab content will go here */}
                    <Card className="p-6">
                        <p>Activity content coming soon...</p>
                    </Card>
                </TabsContent>

                <TabsContent value="settings">
                    {/* Settings tab content will go here */}
                    <Card className="p-6">
                        <p>Settings content coming soon...</p>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
} 