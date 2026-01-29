"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getDemoConfig } from "@/config/demos"
import { useDemo } from "@/contexts/DemoContext"
import { cn } from "@/lib/utils"
import {
    Calendar,
    ChevronRight,
    Copy,
    Edit2,
    Grid,
    Key,
    List,
    Mail,
    MessageSquare,
    MoreVertical,
    NotepadText,
    Plus,
    Search,
    Settings,
    User,
    Users,
    X,
    Zap
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

// Generate touchpoints heatmap data from lease start to lease end
function generateTouchpointsData(leaseStart: Date, leaseEnd: Date, today: Date) {
    const data: { date: Date; count: number }[] = []
    const endDate = leaseEnd > today ? today : leaseEnd

    // Calculate total days in lease period for decay calculation
    const totalLeaseDays = Math.max(1, (endDate.getTime() - leaseStart.getTime()) / (1000 * 60 * 60 * 24))

    // Generate data for each day from lease start to today (or lease end if passed)
    const current = new Date(leaseStart)
    while (current <= endDate) {
        // Calculate how far into the lease we are (0 = start, 1 = end)
        const daysIntoLease = (current.getTime() - leaseStart.getTime()) / (1000 * 60 * 60 * 24)
        const leaseProgress = daysIntoLease / totalLeaseDays

        // Decay factor: starts at 1.0, decays to ~0.15 by end of lease
        // Using exponential decay for natural falloff
        const decayFactor = Math.exp(-2.5 * leaseProgress)

        // Random touchpoints count with decay applied
        const dayOfWeek = current.getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

        // Base chance: weekdays high (0.85), weekends very low (0.1)
        const baseChance = isWeekend ? 0.1 * decayFactor : 0.85 * decayFactor

        // Max count: weekdays up to 4, weekends max 1
        const maxCount = isWeekend ? 1 : Math.max(1, Math.round(4 * decayFactor))

        let count = 0
        if (Math.random() < baseChance) {
            if (isWeekend) {
                // Weekends: always just 1 if any activity
                count = 1
            } else {
                // Weekdays: Higher counts more likely at start of lease
                const countChance = Math.random()
                if (countChance < 0.3 * decayFactor) {
                    count = maxCount // High activity
                } else if (countChance < 0.6 * decayFactor) {
                    count = Math.max(1, maxCount - 1)
                } else {
                    count = Math.max(1, Math.ceil(maxCount / 2))
                }
            }
        }

        data.push({
            date: new Date(current),
            count
        })
        current.setDate(current.getDate() + 1)
    }

    // Add future days up to lease end with count -2 (future/empty)
    if (leaseEnd > today) {
        const futureDate = new Date(today)
        futureDate.setDate(futureDate.getDate() + 1)
        while (futureDate <= leaseEnd) {
            data.push({
                date: new Date(futureDate),
                count: -2 // -2 means future
            })
            futureDate.setDate(futureDate.getDate() + 1)
        }
    }

    return data
}

// Touchpoints Heatmap Component
interface TouchpointsHeatmapProps {
    leaseStart: Date
    leaseEnd: Date
}

function TouchpointsHeatmap({ leaseStart, leaseEnd }: TouchpointsHeatmapProps) {
    // Use Feb 26, 2026 as "today" for demo purposes
    const today = useMemo(() => new Date(2026, 1, 26), []) // Month is 0-indexed, so 1 = February
    const touchpointsData = useMemo(() => generateTouchpointsData(leaseStart, leaseEnd, today), [leaseStart, leaseEnd, today])

    // Get months for header - only up to today or lease end, whichever is earlier
    const months = useMemo(() => {
        const result: { name: string; weeks: number; startWeekIdx: number }[] = []
        const endDate = leaseEnd > today ? today : leaseEnd

        let currentMonth = leaseStart.getMonth()
        let currentYear = leaseStart.getFullYear()
        let weekCount = 0
        let startWeekIdx = 0

        const tempDate = new Date(leaseStart)
        while (tempDate <= endDate) {
            if (tempDate.getMonth() !== currentMonth || tempDate.getFullYear() !== currentYear) {
                result.push({
                    name: new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
                    weeks: Math.ceil(weekCount / 7),
                    startWeekIdx
                })
                currentMonth = tempDate.getMonth()
                currentYear = tempDate.getFullYear()
                startWeekIdx += Math.ceil(weekCount / 7)
                weekCount = 0
            }
            weekCount++
            tempDate.setDate(tempDate.getDate() + 1)
        }
        // Add last month
        result.push({
            name: new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
            weeks: Math.ceil(weekCount / 7),
            startWeekIdx
        })

        return result
    }, [leaseStart, leaseEnd])

    // Organize data into weeks (columns) and days (rows)
    const weeks = useMemo(() => {
        const result: { date: Date; count: number }[][] = []
        let currentWeek: { date: Date; count: number }[] = []

        // Pad the first week if it doesn't start on Sunday
        const firstDayOfWeek = touchpointsData[0]?.date.getDay() || 0
        for (let i = 0; i < firstDayOfWeek; i++) {
            currentWeek.push({ date: new Date(0), count: -1 }) // -1 means empty/before lease
        }

        touchpointsData.forEach((day) => {
            currentWeek.push(day)
            if (currentWeek.length === 7) {
                result.push(currentWeek)
                currentWeek = []
            }
        })

        // Pad the last week
        while (currentWeek.length > 0 && currentWeek.length < 7) {
            currentWeek.push({ date: new Date(0), count: -1 })
        }
        if (currentWeek.length > 0) {
            result.push(currentWeek)
        }

        return result
    }, [touchpointsData])

    // Find week indices for lease start, lease end, and current week
    const markerWeeks = useMemo(() => {
        let leaseStartWeekIdx = 0
        let leaseEndWeekIdx = weeks.length - 1
        let currentWeekIdx = -1

        weeks.forEach((week, weekIdx) => {
            week.forEach((day) => {
                if (day.count >= -1 && day.date.getTime() > 0) {
                    // Lease start week
                    if (day.date.toDateString() === leaseStart.toDateString()) {
                        leaseStartWeekIdx = weekIdx
                    }
                    // Lease end week
                    if (day.date.toDateString() === leaseEnd.toDateString()) {
                        leaseEndWeekIdx = weekIdx
                    }
                    // Current week
                    const weekStart = new Date(today)
                    weekStart.setDate(today.getDate() - today.getDay())
                    const weekEnd = new Date(weekStart)
                    weekEnd.setDate(weekStart.getDate() + 6)
                    if (day.date >= weekStart && day.date <= weekEnd) {
                        currentWeekIdx = weekIdx
                    }
                }
            })
        })

        return { leaseStartWeekIdx, leaseEndWeekIdx, currentWeekIdx }
    }, [weeks, leaseStart, leaseEnd, today])

    // Calculate stats
    const stats = useMemo(() => {
        const validData = touchpointsData.filter(d => d.count >= 0)
        const total = validData.reduce((sum, d) => sum + d.count, 0)
        const weeksWithData = weeks.filter(w => w.some(d => d.count >= 0)).length
        const avgPerWeek = weeksWithData > 0 ? (total / weeksWithData).toFixed(1) : '0'
        return { total, avgPerWeek }
    }, [touchpointsData, weeks])

    const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

    const getColorClass = (count: number) => {
        if (count === -1) return 'bg-transparent'
        if (count === -2) return 'bg-gray-50 dark:bg-gray-900' // Future
        if (count === 0) return 'bg-gray-100 dark:bg-gray-800'
        if (count === 1) return 'bg-blue-200 dark:bg-blue-900'
        if (count === 2) return 'bg-blue-400 dark:bg-blue-700'
        if (count === 3) return 'bg-blue-500 dark:bg-blue-600'
        return 'bg-blue-600 dark:bg-blue-500'
    }

    // Calculate total width needed for the heatmap
    const totalWeeks = weeks.length
    const heatmapWidth = totalWeeks * 12 + (totalWeeks - 1) * 2 // 10px cells + 2px gaps

    return (
        <Card className="p-6 mb-6 max-w-full overflow-hidden">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 leading-tight">Touchpoints with Key Contacts</h3>
                    <p className="text-sm text-gray-500 leading-tight">Interactions over tenant lifecycle</p>
                </div>
                <div className="flex items-center gap-8 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-semibold text-gray-900 dark:text-gray-50">{stats.total}</span>
                        <span className="text-gray-500">Total touchpoints</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-semibold text-gray-900 dark:text-gray-50">{stats.avgPerWeek}</span>
                        <span className="text-gray-500">Avg per week</span>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                        <Button variant="outline" size="sm">
                            Record Touchpoint
                        </Button>
                        <Button size="sm">
                            Reach Out
                        </Button>
                    </div>
                </div>
            </div>

            {/* Heatmap container with scroll */}
            <div className="flex mt-10">
                {/* Fixed day labels column */}
                <div className="shrink-0 pr-2">
                    {/* Spacer to match month labels height */}
                    <div className="h-5 mb-1" />
                    <div className="flex flex-col gap-[2px] text-xs text-gray-500">
                        {dayLabels.map((day, idx) => (
                            <div key={idx} className="h-[10px] flex items-center justify-end w-7">
                                {day}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scrollable heatmap area - key: w-0 flex-1 forces it to not grow beyond container */}
                <div className="w-0 flex-1 overflow-x-auto">
                    <div style={{ width: `${heatmapWidth}px` }}>
                        {/* Month labels */}
                        <div className="flex h-5 mb-1">
                            {months.map((month, idx) => (
                                <div
                                    key={idx}
                                    className="text-xs text-gray-500"
                                    style={{ width: `${month.weeks * 14}px`, minWidth: `${month.weeks * 14}px` }}
                                >
                                    {month.name}
                                </div>
                            ))}
                        </div>

                        {/* Grid with marker lines */}
                        <div className="flex gap-[2px] relative">
                            {weeks.map((week, weekIdx) => (
                                <div key={weekIdx} className="flex flex-col gap-[2px] relative">
                                    {/* Lease start marker (red line) */}
                                    {weekIdx === markerWeeks.leaseStartWeekIdx && (
                                        <div className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-red-500 z-10" title={`Lease Start: ${leaseStart.toLocaleDateString()}`} />
                                    )}
                                    {/* Current week marker (blue line) */}
                                    {weekIdx === markerWeeks.currentWeekIdx && (
                                        <div className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-blue-500 z-10" title={`Current Week`} />
                                    )}
                                    {/* Lease end marker (red line) */}
                                    {weekIdx === markerWeeks.leaseEndWeekIdx && (
                                        <div className="absolute -right-[1px] top-0 bottom-0 w-[2px] bg-red-500 z-10" title={`Lease End: ${leaseEnd.toLocaleDateString()}`} />
                                    )}
                                    {/* Reorder to start from Monday */}
                                    {[1, 2, 3, 4, 5, 6, 0].map((dayIndex) => {
                                        const day = week[dayIndex]
                                        if (!day) return <div key={dayIndex} className="w-[10px] h-[10px]" />
                                        return (
                                            <div
                                                key={dayIndex}
                                                className={cn(
                                                    "w-[10px] h-[10px] rounded-[2px]",
                                                    getColorClass(day.count)
                                                )}
                                                title={day.count >= 0 ? `${day.date.toLocaleDateString()}: ${day.count} touchpoint${day.count !== 1 ? 's' : ''}` : day.count === -2 ? `${day.date.toLocaleDateString()}: Future` : ''}
                                            />
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend - outside scrollable area */}
            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <div className="w-[2px] h-3 bg-red-500" />
                        <span>Lease Start/End</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-[2px] h-3 bg-blue-500" />
                        <span>Current Week</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span>Less</span>
                    <div className="flex gap-[2px]">
                        <div className="w-[10px] h-[10px] rounded-[2px] bg-gray-100 dark:bg-gray-800" />
                        <div className="w-[10px] h-[10px] rounded-[2px] bg-blue-200 dark:bg-blue-900" />
                        <div className="w-[10px] h-[10px] rounded-[2px] bg-blue-400 dark:bg-blue-700" />
                        <div className="w-[10px] h-[10px] rounded-[2px] bg-blue-500 dark:bg-blue-600" />
                        <div className="w-[10px] h-[10px] rounded-[2px] bg-blue-600 dark:bg-blue-500" />
                    </div>
                    <span>More</span>
                </div>
            </div>
        </Card>
    )
}

// Type for building details
interface BuildingDetail {
    rentedArea: string
    employees: number
    leaseExpiration: string
    floors: { number: number; suites: string[] }[]
}

// Type for tenant data
interface TenantData {
    id: string
    name: string
    industry: string
    website: string
    domains: string
    employees: number
    billingAddress: string
    creationDate: string
    status: string
    description: string
    leaseStartDate: string
    leaseEndDate: string
    buildingIds: string[]
    contacts: {
        id: string
        name: string
        email: string
        buildingId: string
        avatar: string
        notificationCount: number
        badges: string[]
        isPrimary: boolean
    }[]
    activity: {
        id: string
        type: string
        title: string
        subtitle?: string
        date: string
        icon: string
    }[]
    buildingDetails: Record<string, BuildingDetail>
    appConfigurations: {
        buildingId: string
        lastEdited: string | null
        apps: {
            submitRequest: boolean
            registerVisitor: boolean
            digitalKey: boolean
            foodhub: boolean
            wellnessSpaces: boolean
            bookAClass: boolean
            meetingSpaces: boolean
        } | null
    }[]
    activityMetrics: {
        access: string
        bookings: string
        visitors: string
        notes: string
        responses: string
    }
}

// Mock data for tenants - references demo building IDs
const tenantsData: Record<string, TenantData> = {
    "1": {
        id: "1",
        name: "EcoVolt Energy Solutions",
        industry: "Renewables & Environment",
        website: "https://www.ecovolt.io",
        domains: "ecovolt.com",
        employees: 466,
        billingAddress: "200 Clarendon Street, Boston, MA 02116, USA",
        creationDate: "March 14, 2024 at 04:05 PM",
        status: "Active",
        description: "EcoVolt Energy Solutions innovates in the Renewable Electricity industry, focusing on sustainable energy generation and storage from wind, solar, and more. We aim to provide clean electricity, reduce carbon footprints, and promote energy independence, driving towards a greener future.",
        leaseStartDate: "2022-03-22",
        leaseEndDate: "2027-03-22",
        // References to demo building IDs
        buildingIds: ["1", "2", "3"],
        // Contact building references by demo building ID
        contacts: [
            {
                id: "1",
                name: "Alex Morgan",
                email: "amorgan@ecovoltenergy.com",
                buildingId: "1", // 200 Clarendon
                avatar: "/avatars/default-avatar.png",
                notificationCount: 0,
                badges: ["VIP", "Executive"],
                isPrimary: false
            },
            {
                id: "2",
                name: "Jordon Lee",
                email: "jlee@ecovoltenergy.com",
                buildingId: "2", // Prudential Tower
                avatar: "/avatars/default-avatar.png",
                notificationCount: 2,
                badges: [],
                isPrimary: true
            },
            {
                id: "3",
                name: "Taylor Kim",
                email: "kim@ecovoltenergy.com",
                buildingId: "3", // One Congress
                avatar: "/avatars/default-avatar.png",
                notificationCount: 1,
                badges: [],
                isPrimary: false
            }
        ],
        activity: [
            {
                id: "1",
                type: "Work Order Requested",
                title: "Taylor Kim requested a work order.",
                subtitle: "No description provided",
                date: "January 20, 2026 at 12:26 PM",
                icon: "settings"
            },
            {
                id: "2",
                type: "Note Added",
                title: "Locked in the elevator.",
                date: "December 03, 2025 at 03:07 PM",
                icon: "note"
            },
            {
                id: "3",
                type: "Note Added",
                title: "They went to the gym today.",
                date: "September 04, 2025 at 02:55 PM",
                icon: "note"
            },
            {
                id: "4",
                type: "Note Added",
                title: "Test note",
                date: "September 04, 2025 at 11:17 AM",
                icon: "note"
            }
        ],
        // Tenant-specific building details (rented area, employees, lease, floors)
        buildingDetails: {
            "1": {
                rentedArea: "27,475",
                employees: 157,
                leaseExpiration: "May 28, 2029",
                floors: [
                    { number: 8, suites: ["801"] },
                    { number: 9, suites: ["901"] }
                ]
            },
            "2": {
                rentedArea: "18,500",
                employees: 155,
                leaseExpiration: "September 1, 2026",
                floors: [
                    { number: 4, suites: ["401"] }
                ]
            },
            "3": {
                rentedArea: "22,000",
                employees: 154,
                leaseExpiration: "March 26, 2026",
                floors: [
                    { number: 9, suites: ["901"] },
                    { number: 8, suites: ["801"] }
                ]
            }
        },
        // App configurations reference demo building IDs
        appConfigurations: [
            {
                buildingId: "1",
                lastEdited: "Anastas Vartanyan on October 22, 2025",
                apps: {
                    submitRequest: true,
                    registerVisitor: true,
                    digitalKey: false,
                    foodhub: true,
                    wellnessSpaces: false,
                    bookAClass: true,
                    meetingSpaces: false
                }
            },
            {
                buildingId: "2",
                lastEdited: "Unknown user on December 31, 1969",
                apps: {
                    submitRequest: false,
                    registerVisitor: false,
                    digitalKey: false,
                    foodhub: false,
                    wellnessSpaces: false,
                    bookAClass: false,
                    meetingSpaces: false
                }
            },
            {
                buildingId: "3",
                lastEdited: null,
                apps: null
            }
        ],
        activityMetrics: {
            access: "-",
            bookings: "-",
            visitors: "-",
            notes: "-",
            responses: "-"
        }
    },
    "2": {
        id: "2",
        name: "Global Enterprises",
        industry: "Finance",
        website: "https://www.globalent.com",
        domains: "globalent.com",
        employees: 200,
        billingAddress: "415 Mission Street, San Francisco, CA 94105, USA",
        creationDate: "May 1, 2024 at 09:00 AM",
        status: "Active",
        description: "Global Enterprises is a leading financial services company providing comprehensive solutions for businesses worldwide.",
        leaseStartDate: "2023-06-01",
        leaseEndDate: "2028-05-31",
        buildingIds: ["21"], // Salesforce Tower
        contacts: [
            {
                id: "1",
                name: "Sarah Johnson",
                email: "sarah.j@globalent.com",
                buildingId: "21", // Salesforce Tower
                avatar: "/avatars/default-avatar.png",
                notificationCount: 2,
                badges: [],
                isPrimary: true
            }
        ],
        activity: [
            {
                id: "1",
                type: "Note Added",
                title: "Quarterly review meeting scheduled",
                date: "September 01, 2025 at 10:30 AM",
                icon: "note"
            }
        ],
        buildingDetails: {
            "21": {
                rentedArea: "15,000",
                employees: 200,
                leaseExpiration: "December 31, 2027",
                floors: [
                    { number: 10, suites: ["1001", "1002"] }
                ]
            }
        },
        appConfigurations: [],
        activityMetrics: {
            access: "-",
            bookings: "-",
            visitors: "-",
            notes: "-",
            responses: "-"
        }
    }
}

// Activity Icon component
function ActivityIcon({ type }: { type: string }) {
    const iconClass = "size-4"
    const containerClass = "size-8 rounded-full flex items-center justify-center shrink-0"

    switch (type) {
        case "settings":
            return (
                <div className={cn(containerClass, "bg-purple-100 dark:bg-purple-900/30")}>
                    <Settings className={cn(iconClass, "text-purple-600 dark:text-purple-400")} />
                </div>
            )
        case "note":
            return (
                <div className={cn(containerClass, "bg-green-100 dark:bg-green-900/30")}>
                    <NotepadText className={cn(iconClass, "text-green-600 dark:text-green-400")} />
                </div>
            )
        default:
            return (
                <div className={cn(containerClass, "bg-blue-100 dark:bg-blue-900/30")}>
                    <NotepadText className={cn(iconClass, "text-blue-600 dark:text-blue-400")} />
                </div>
            )
    }
}

export default function TenantDetailPage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState("overview")
    const [contactViewMode, setContactViewMode] = useState<"list" | "grid">("list")
    const [searchQuery, setSearchQuery] = useState("")
    const { demo } = useDemo()
    const demoConfig = getDemoConfig(demo)

    // Get tenant data based on ID
    const tenant: TenantData | undefined = tenantsData[params.id as keyof typeof tenantsData]

    // Get buildings from demo config that this tenant uses
    const tenantBuildings = useMemo(() => {
        if (!tenant) return []
        return tenant.buildingIds
            .map(id => demoConfig.buildings.find(b => b.id === id))
            .filter((b): b is NonNullable<typeof b> => b !== undefined)
    }, [tenant, demoConfig.buildings])

    // Helper function to get building name by ID
    const getBuildingName = (buildingId: string) => {
        const building = demoConfig.buildings.find(b => b.id === buildingId)
        return building?.name || "Unknown Building"
    }

    if (!tenant) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">Tenant not found</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">The tenant you&apos;re looking for doesn&apos;t exist or has been removed.</p>
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
                <Link href="/tenants" className="hover:text-gray-700 dark:hover:text-gray-300">Tenants</Link>
                <ChevronRight className="size-4" />
                <span className="text-gray-900 dark:text-gray-50 font-medium">{tenant.name}</span>
            </nav>

            {/* Company Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Company Logo */}
                    <div className="size-16 rounded-full bg-gradient-to-br from-green-400 to-yellow-400 flex items-center justify-center">
                        <Zap className="size-8 text-white" />
                    </div>

                    {/* Company Name and Edit Button */}
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">{tenant.name}</h1>
                        <Button variant="ghost" size="sm" className="p-1">
                            <Edit2 className="size-4 text-gray-500" />
                        </Button>
                    </div>
                </div>

                {/* Building Selector */}
                <div className="w-48">
                    <Select defaultValue="all-buildings">
                        <SelectTrigger className="bg-white dark:bg-gray-950">
                            <SelectValue placeholder="Select building" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-buildings">All Buildings</SelectItem>
                            {tenantBuildings.map((building) => (
                                <SelectItem key={building.id} value={building.id}>
                                    {building.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Tab Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="bg-transparent border-b border-gray-200 dark:border-gray-800 rounded-none p-0 h-auto w-full justify-start">
                    <TabsTrigger
                        value="overview"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-3 pt-0 text-gray-500 data-[state=active]:text-gray-900 dark:text-gray-400 dark:data-[state=active]:text-gray-50"
                    >
                        Overview
                    </TabsTrigger>
                    <TabsTrigger
                        value="contacts"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-3 pt-0 text-gray-500 data-[state=active]:text-gray-900 dark:text-gray-400 dark:data-[state=active]:text-gray-50"
                    >
                        Contacts
                    </TabsTrigger>
                    <TabsTrigger
                        value="activity"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-3 pt-0 text-gray-500 data-[state=active]:text-gray-900 dark:text-gray-400 dark:data-[state=active]:text-gray-50"
                    >
                        Activity
                    </TabsTrigger>
                    <TabsTrigger
                        value="app-configurations"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-3 pt-0 text-gray-500 data-[state=active]:text-gray-900 dark:text-gray-400 dark:data-[state=active]:text-gray-50"
                    >
                        App Configurations
                    </TabsTrigger>
                    <TabsTrigger
                        value="buildings"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-3 pt-0 text-gray-500 data-[state=active]:text-gray-900 dark:text-gray-400 dark:data-[state=active]:text-gray-50"
                    >
                        Buildings
                    </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-0 mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Details */}
                        <div className="lg:col-span-1">
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Details</h3>
                                    <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        View contacts
                                    </Link>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{tenant.description}</p>
                                        <Button variant="ghost" size="sm" className="p-1 -ml-1">
                                            <Edit2 className="size-4 text-gray-500" />
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-50">{tenant.industry}</p>
                                                <p className="text-sm text-gray-500">Industry</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="p-1">
                                                <Edit2 className="size-4 text-gray-500" />
                                            </Button>
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-50">{tenant.billingAddress}</p>
                                                <p className="text-sm text-gray-500">Billing Address</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="p-1">
                                                <Edit2 className="size-4 text-gray-500" />
                                            </Button>
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-50">{tenant.website}</p>
                                                <p className="text-sm text-gray-500">Website</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="p-1">
                                                <Edit2 className="size-4 text-gray-500" />
                                            </Button>
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-50">{tenant.employees}</p>
                                                <p className="text-sm text-gray-500">Employees</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="p-1">
                                                <Edit2 className="size-4 text-gray-500" />
                                            </Button>
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-50">{tenant.domains}</p>
                                                <p className="text-sm text-gray-500">Domains</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="p-1">
                                                <Edit2 className="size-4 text-gray-500" />
                                            </Button>
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-50">{tenant.creationDate}</p>
                                                <p className="text-sm text-gray-500">Creation Date</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Right Column - Contacts, Activity, Buildings */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Contacts Section */}
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Contacts</h3>
                                    <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        View contacts
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {tenant.contacts.slice(0, 3).map((contact) => (
                                        <div key={contact.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="size-10">
                                                    <AvatarFallback className="bg-gray-100 dark:bg-gray-800">
                                                        <User className="size-5 text-gray-500" />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-medium text-gray-900 dark:text-gray-50">{contact.name}</p>
                                                        {contact.badges?.map((badge) => (
                                                            <span key={badge} className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                                                {badge}
                                                            </span>
                                                        ))}
                                                        {contact.isPrimary && (
                                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                                                                Primary Contact
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500">{contact.email}</p>
                                                    <p className="text-xs text-gray-400 flex items-center gap-1">
                                                        <span className="size-3 rounded-full bg-gray-300 inline-block" />
                                                        {getBuildingName(contact.buildingId)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8">
                                                    <Mail className="size-4 text-gray-500" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8">
                                                    <Copy className="size-4 text-gray-500" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8">
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
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Activity</h3>
                                    <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        View activity
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {tenant.activity.slice(0, 4).map((activity) => (
                                        <div key={activity.id} className="flex items-start gap-3">
                                            <ActivityIcon type={activity.icon} />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className="font-medium text-sm text-gray-900 dark:text-gray-50">{activity.type}</span>
                                                    <span className="text-xs text-gray-500">{activity.date}</span>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{activity.title}</p>
                                                {'subtitle' in activity && activity.subtitle && (
                                                    <p className="text-sm text-gray-400">{activity.subtitle}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Buildings Section */}
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Buildings</h3>
                                    <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        View buildings
                                    </Link>
                                </div>

                                <div className="space-y-3">
                                    {tenantBuildings.slice(0, 3).map((building) => (
                                        <div key={building.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                                    {building.imageUrl ? (
                                                        <Image
                                                            src={building.imageUrl}
                                                            alt={building.name}
                                                            width={40}
                                                            height={40}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    ) : (
                                                        <Zap className="size-5 text-gray-500" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-gray-50">{building.name}</p>
                                                    <p className="text-sm text-gray-500">{building.address}</p>
                                                </div>
                                            </div>
                                            <span className={cn(
                                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                                building.status === "Active"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                                    : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                            )}>
                                                {building.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Contacts Tab */}
                <TabsContent value="contacts" className="mt-6">
                    <div className="space-y-4">
                        {/* Touchpoints Heatmap */}
                        <TouchpointsHeatmap
                            leaseStart={new Date(tenant.leaseStartDate)}
                            leaseEnd={new Date(tenant.leaseEndDate)}
                        />

                        {/* Search and Filters */}
                        <div className="flex items-center justify-between">
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                                <Input
                                    placeholder="Search by name"
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Users className="size-4" />
                                    Tags
                                </Button>
                                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
                                    <Button
                                        variant={contactViewMode === "list" ? "secondary" : "ghost"}
                                        size="sm"
                                        className="rounded-r-none"
                                        onClick={() => setContactViewMode("list")}
                                    >
                                        <List className="size-4" />
                                    </Button>
                                    <Button
                                        variant={contactViewMode === "grid" ? "secondary" : "ghost"}
                                        size="sm"
                                        className="rounded-l-none"
                                        onClick={() => setContactViewMode("grid")}
                                    >
                                        <Grid className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Contacts List */}
                        <div className="space-y-2">
                            {tenant.contacts
                                .filter(contact => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((contact) => (
                                    <Card key={contact.id} className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="size-10">
                                                    <AvatarFallback className="bg-gray-100 dark:bg-gray-800">
                                                        <User className="size-5 text-gray-500" />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-medium text-gray-900 dark:text-gray-50">{contact.name}</p>
                                                        {contact.badges?.map((badge) => (
                                                            <span key={badge} className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                                                {badge}
                                                            </span>
                                                        ))}
                                                        {contact.isPrimary && (
                                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                                                                Primary Contact
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500">{contact.email}</p>
                                                    <p className="text-xs text-gray-400 flex items-center gap-1">
                                                        <span className="size-3 rounded-full bg-gray-300 inline-block" />
                                                        {getBuildingName(contact.buildingId)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8">
                                                    <Mail className="size-4 text-gray-500" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8">
                                                    <Copy className="size-4 text-gray-500" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8">
                                                    <User className="size-4 text-gray-500" />
                                                </Button>
                                                {contact.notificationCount > 0 && (
                                                    <div className="size-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                                                        {contact.notificationCount}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                        </div>
                    </div>
                </TabsContent>

                {/* Activity Tab */}
                <TabsContent value="activity" className="mt-6">
                    <div className="space-y-6">
                        {/* Date Range Selector */}
                        <div className="flex justify-end">
                            <Select defaultValue="30">
                                <SelectTrigger className="w-40 bg-white dark:bg-gray-950">
                                    <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="7">Last 7 Days</SelectItem>
                                    <SelectItem value="30">Last 30 Days</SelectItem>
                                    <SelectItem value="90">Last 90 Days</SelectItem>
                                    <SelectItem value="365">Last Year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Metrics Cards */}
                        <div className="grid grid-cols-5 gap-4">
                            {[
                                { label: "Access", value: tenant.activityMetrics.access, icon: Key, color: "text-blue-600" },
                                { label: "Bookings", value: tenant.activityMetrics.bookings, icon: Calendar, color: "text-green-600" },
                                { label: "Visitors", value: tenant.activityMetrics.visitors, icon: Users, color: "text-yellow-600" },
                                { label: "Notes", value: tenant.activityMetrics.notes, icon: NotepadText, color: "text-purple-600" },
                                { label: "Responses", value: tenant.activityMetrics.responses, icon: MessageSquare, color: "text-red-600" }
                            ].map((metric) => (
                                <Card key={metric.label} className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <metric.icon className={cn("size-4", metric.color)} />
                                        <span className="text-sm text-gray-500">{metric.label}</span>
                                    </div>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50">{metric.value}</p>
                                </Card>
                            ))}
                        </div>

                        {/* Activity Search */}
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            <Input placeholder="Search activity events" className="pl-9" />
                        </div>

                        {/* Activity List */}
                        <div className="space-y-3">
                            {tenant.activity.map((activity) => (
                                <Card key={activity.id} className="p-4">
                                    <div className="flex items-start gap-3">
                                        <ActivityIcon type={activity.icon} />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className="font-medium text-sm text-gray-900 dark:text-gray-50">{activity.type}</span>
                                                <span className="text-xs text-gray-500">{activity.date}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{activity.title}</p>
                                            {'subtitle' in activity && activity.subtitle && (
                                                <p className="text-sm text-gray-400">{activity.subtitle}</p>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                {/* App Configurations Tab */}
                <TabsContent value="app-configurations" className="mt-6">
                    <div className="space-y-6">
                        {tenant.appConfigurations.map((config) => {
                            const building = demoConfig.buildings.find(b => b.id === config.buildingId)
                            if (!building) return null
                            return (
                            <Card key={config.buildingId} className="p-6">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                            {building.imageUrl ? (
                                                <Image
                                                    src={building.imageUrl}
                                                    alt={building.name}
                                                    width={40}
                                                    height={40}
                                                    className="object-cover w-full h-full"
                                                />
                                            ) : (
                                                <Zap className="size-5 text-gray-500" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-50">{building.name}</p>
                                            <p className="text-sm text-gray-500">{building.address}</p>
                                        </div>
                                    </div>
                                    <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        View configuration history
                                    </Link>
                                </div>

                                {config.apps ? (
                                    <>
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-500">
                                                <span className="font-medium">Current configuration</span>
                                                <br />
                                                Last edited by {config.lastEdited}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-4 gap-4 mb-6">
                                            {[
                                                { key: "submitRequest", label: "Submit Request" },
                                                { key: "registerVisitor", label: "Register a Visitor" },
                                                { key: "digitalKey", label: "Digital Key" },
                                                { key: "foodhub", label: "Foodhub" },
                                                { key: "wellnessSpaces", label: "Wellness Spaces" },
                                                { key: "bookAClass", label: "Book a Class" },
                                                { key: "meetingSpaces", label: "Meeting Spaces" }
                                            ].map((app) => (
                                                <div key={app.key} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">{app.label}</span>
                                                    <Switch
                                                        checked={config.apps![app.key as keyof NonNullable<typeof config.apps>]}
                                                        className="data-[state=checked]:bg-primary"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-end gap-3">
                                            <Button variant="outline">Reset</Button>
                                            <Button>Update</Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="size-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                                            <Settings className="size-6 text-gray-400" />
                                        </div>
                                        <p className="text-gray-900 dark:text-gray-50 font-medium">No app configurations yet</p>
                                        <p className="text-sm text-gray-500">App configurations will appear here when available</p>
                                    </div>
                                )}
                            </Card>
                        )})}
                    </div>
                </TabsContent>

                {/* Buildings Tab */}
                <TabsContent value="buildings" className="mt-6">
                    <div className="space-y-6">
                        <div className="flex justify-end">
                            <Button>
                                <Plus className="size-4 mr-2" />
                                Add building
                            </Button>
                        </div>

                        {tenantBuildings.map((building) => {
                            const details = tenant.buildingDetails[building.id as keyof typeof tenant.buildingDetails]
                            return (
                            <Card key={building.id} className="p-6">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="size-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                            {building.imageUrl ? (
                                                <Image
                                                    src={building.imageUrl}
                                                    alt={building.name}
                                                    width={48}
                                                    height={48}
                                                    className="object-cover w-full h-full"
                                                />
                                            ) : (
                                                <Zap className="size-6 text-gray-500" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-gray-50">{building.name}</p>
                                            <p className="text-sm text-gray-500">{building.address}</p>
                                        </div>
                                    </div>

                                    {/* Building Stats */}
                                    <div className="flex items-center gap-8">
                                        <div className="text-center">
                                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">{details?.rentedArea || "-"}</p>
                                            <p className="text-sm text-gray-500">Rented area (ft2)</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">{details?.employees || "-"}</p>
                                            <p className="text-sm text-gray-500">Number of employees</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">{details?.leaseExpiration || "-"}</p>
                                            <p className="text-sm text-gray-500">Lease expiration</p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="p-1.5">
                                            <MoreVertical className="size-5 text-gray-500" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Floors and Suites */}
                                {details?.floors && (
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                        <span className="w-24">Floors</span>
                                        <span className="flex-1">Suites</span>
                                        <span className="w-20">Actions</span>
                                    </div>

                                    {details.floors.map((floor, index) => (
                                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                                            <div className="w-24">
                                                <Input
                                                    type="number"
                                                    value={floor.number}
                                                    className="w-16 h-8"
                                                    readOnly
                                                />
                                            </div>
                                            <div className="flex-1 flex items-center gap-2">
                                                {floor.suites.map((suite, suiteIndex) => (
                                                    <div key={suiteIndex} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
                                                        <span className="text-sm">{suite}</span>
                                                        <button className="hover:text-red-500">
                                                            <X className="size-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                                <Button variant="ghost" size="sm" className="text-gray-500 h-7">
                                                    <Plus className="size-3 mr-1" />
                                                    Add suite
                                                </Button>
                                            </div>
                                            <div className="w-20 text-right">
                                                <Button variant="ghost" size="sm" className="p-1 h-7 w-7 text-gray-400 hover:text-red-500">
                                                    <X className="size-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                    <Button variant="ghost" size="sm" className="mt-3 text-gray-500">
                                        <Plus className="size-4 mr-1" />
                                        Add floor
                                    </Button>
                                </div>
                                )}

                                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <Button variant="outline">Reset</Button>
                                    <Button>Save</Button>
                                </div>
                            </Card>
                        )})}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
