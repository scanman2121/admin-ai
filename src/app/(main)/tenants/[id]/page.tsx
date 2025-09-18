"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Copy, Edit2, Mail, NotepadText, User, UserPlus, Zap } from "lucide-react"
import Link from "next/link"

// Mock data for tenants
const tenantsData = {
    "1": {
        id: "1",
        name: "EcoVolt Energy Solutions",
        industry: "Renewables & Environment",
        website: "https://www.ecovolt.io",
        domains: "ecovolt.com",
        employees: 314,
        billingAddress: "162 E Berkeley St, Boston, MA 02118, USA",
        creationDate: "March 14, 2024 at 04:05 PM",
        status: "Active",
        description: "EcoVolt Energy Solutions innovates in the Renewable Electricity industry, focusing on sustainable energy generation and storage from wind, solar, and more. We aim to provide clean electricity, reduce carbon footprints, and promote energy independence, driving towards a greener future.",
        contacts: [
            {
                id: "1",
                name: "Alex Morgan",
                email: "amorgan@ecovoltenergy.com",
                avatar: "/avatars/default-avatar.png",
                notificationCount: 1
            },
            {
                id: "2", 
                name: "Jordon Lee",
                email: "jlee@ecovoltenergy.com",
                avatar: "/avatars/default-avatar.png",
                notificationCount: 3
            },
            {
                id: "3",
                name: "Taylor Kim",
                email: "kim@ecovoltenergy.com", 
                avatar: "/avatars/default-avatar.png",
                notificationCount: 1
            }
        ],
        activity: [
            {
                id: "1",
                type: "Note Added",
                title: "They went to the gym today",
                date: "September 04, 2025 at 02:55 PM",
                icon: NotepadText
            },
            {
                id: "2",
                type: "Note Added", 
                title: "Test note",
                date: "September 04, 2025 at 11:17 AM",
                icon: NotepadText
            },
            {
                id: "3",
                type: "Note Added",
                title: "Alex was asking about the next rooftop event",
                date: "September 02, 2025 at 04:43 PM", 
                icon: NotepadText
            },
            {
                id: "4",
                type: "Visitor Invited",
                title: "User registered Ashley Colella to visit on July 22, 2025 at 02:45 PM.",
                subtitle: "View Visitors",
                date: "July 22, 2025 at 01:55 PM",
                icon: UserPlus
            }
        ]
    },
    "2": {
        id: "2",
        name: "Global Enterprises",
        industry: "Finance",
        website: "https://www.globalent.com",
        domains: "globalent.com",
        employees: 200,
        billingAddress: "400 Market Street, San Francisco, CA 94102, USA",
        creationDate: "May 1, 2024 at 09:00 AM",
        status: "Active",
        description: "Global Enterprises is a leading financial services company providing comprehensive solutions for businesses worldwide.",
        contacts: [
            {
                id: "1",
                name: "Sarah Johnson",
                email: "sarah.j@globalent.com",
                avatar: "/avatars/default-avatar.png",
                notificationCount: 2
            }
        ],
        activity: [
            {
                id: "1",
                type: "Note Added",
                title: "Quarterly review meeting scheduled",
                date: "September 01, 2025 at 10:30 AM",
                icon: NotepadText
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
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/tenants" className="hover:text-gray-700">Tenants</Link>
                <ChevronRight className="size-4" />
                <span className="text-gray-900 font-medium">{tenant.name}</span>
            </nav>

            {/* Company Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Company Logo */}
                    <div className="size-16 rounded-full bg-green-500 flex items-center justify-center">
                        <Zap className="size-8 text-white" />
                    </div>
                    
                    {/* Company Name and Edit Button */}
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-semibold text-gray-900">{tenant.name}</h1>
                        <Button variant="ghost" size="sm" className="p-1">
                            <Edit2 className="size-4 text-gray-500" />
                        </Button>
                    </div>
                </div>

                {/* Building Selector */}
                <div className="w-48">
                    <Select defaultValue="all-buildings">
                        <SelectTrigger>
                            <SelectValue placeholder="Select building" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-buildings">All Buildings</SelectItem>
                            <SelectItem value="building-1">Building 1</SelectItem>
                            <SelectItem value="building-2">Building 2</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Tab Navigation */}
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="contacts">Contacts</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="app-configurations">App Configurations</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Details */}
                        <div className="lg:col-span-1">
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">Details</h3>
                                    <Button variant="ghost" size="sm" className="p-1">
                                        <Edit2 className="size-4 text-gray-500" />
                                    </Button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-2">{tenant.description}</p>
                                        <Button variant="ghost" size="sm" className="p-1 -ml-1">
                                            <Edit2 className="size-4 text-gray-500" />
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900">{tenant.industry}</p>
                                                <p className="text-sm text-gray-500">Industry</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="p-1">
                                                <Edit2 className="size-4 text-gray-500" />
                                            </Button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900">{tenant.billingAddress}</p>
                                                <p className="text-sm text-gray-500">Billing Address</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="p-1">
                                                <Edit2 className="size-4 text-gray-500" />
                                            </Button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900">{tenant.website}</p>
                                                <p className="text-sm text-gray-500">Website</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="p-1">
                                                <Edit2 className="size-4 text-gray-500" />
                                            </Button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900">{tenant.employees}</p>
                                                <p className="text-sm text-gray-500">Employees</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="p-1">
                                                <Edit2 className="size-4 text-gray-500" />
                                            </Button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900">{tenant.domains}</p>
                                                <p className="text-sm text-gray-500">Domains</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="p-1">
                                                <Edit2 className="size-4 text-gray-500" />
                                            </Button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900">{tenant.creationDate}</p>
                                                <p className="text-sm text-gray-500">Creation Date</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Right Column - Contacts and Activity */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Contacts Section */}
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">Contacts</h3>
                                    <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        View Contacts
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {tenant.contacts.map((contact) => (
                                        <div key={contact.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="size-10">
                                                    <AvatarFallback className="bg-gray-100">
                                                        <User className="size-5 text-gray-500" />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium text-gray-900">{contact.name}</p>
                                                    <p className="text-sm text-gray-500">{contact.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm" className="p-1">
                                                    <Mail className="size-4 text-gray-500" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="p-1">
                                                    <Copy className="size-4 text-gray-500" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="p-1">
                                                    <User className="size-4 text-gray-500" />
                                                </Button>
                                                {contact.notificationCount > 0 && (
                                                    <div className="size-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                                                        {contact.notificationCount}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Activity Section */}
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">Activity</h3>
                                    <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        View Activity
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {tenant.activity.map((activity) => (
                                        <div key={activity.id} className="flex items-start gap-3">
                                            <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1">
                                                <activity.icon className="size-4 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-sm">{activity.type}</span>
                                                    <span className="text-xs text-gray-500">{activity.date}</span>
                                                </div>
                                                <p className="text-sm text-gray-900">{activity.title}</p>
                                                {'subtitle' in activity && activity.subtitle && (
                                                    <Link href="#" className="text-sm text-blue-600 hover:text-blue-700">
                                                        {activity.subtitle}
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="contacts">
                    <Card className="p-6">
                        <p>Contacts content coming soon...</p>
                    </Card>
                </TabsContent>

                <TabsContent value="activity">
                    <Card className="p-6">
                        <p>Activity content coming soon...</p>
                    </Card>
                </TabsContent>

                <TabsContent value="app-configurations">
                    <Card className="p-6">
                        <p>App Configurations content coming soon...</p>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
} 