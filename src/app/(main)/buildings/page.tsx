"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { RiAddLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { buildingsColumns } from "./columns"
import { data } from "./data"

// Define tabs for the Buildings page
const tabs = [
    { name: "All Buildings", href: "/buildings" },
    { name: "Active", href: "/buildings/active" },
    { name: "Inactive", href: "/buildings/inactive" },
] as const

const mockInsights = [
    {
        title: "Occupancy Rate",
        value: "87.5%",
        comparison: "vs. Industry Avg: 89.5%",
        trend: "down" as const,
        trendValue: 2,
    },
    {
        title: "Tenant Satisfaction",
        value: "4.4 / 5",
        comparison: "vs. Industry Avg: 3.9",
        trend: "up" as const,
        trendValue: 12,
    },
    {
        title: "Amenity Usage",
        value: "54.1%",
        comparison: "vs. Industry Avg: 40.5%",
        trend: "up" as const,
        trendValue: 33,
    },
    {
        title: "Average Revenue",
        value: "$31.09",
        comparison: "vs. Industry Avg: $34.00 per sqft",
        trend: "down" as const,
        trendValue: 8,
    },
]

const mockSuggestions = [
    {
        title: "Review Lease Renewals",
        description: "5 leases are due for renewal in the next 30 days",
        action: "Review renewals",
        priority: "high" as const,
    },
    {
        title: "Optimize Energy Usage",
        description: "Energy consumption is 15% above average during off-hours",
        action: "View energy report",
        priority: "medium" as const,
    },
    {
        title: "Schedule Maintenance",
        description: "HVAC maintenance is due for 3 buildings",
        action: "Schedule now",
        priority: "medium" as const,
    },
    {
        title: "Update Tenant Directory",
        description: "Directory information needs review for accuracy",
        action: "Update directory",
        priority: "low" as const,
    },
]

const mockTrends = [
    {
        title: "Occupancy Patterns",
        description: "Peak occupancy shifting to mid-week",
        change: "+12% Wed-Thu",
        period: "Last 30 days",
        trend: "up" as const,
        trendValue: 12,
    },
    {
        title: "Maintenance Requests",
        description: "Decrease in HVAC-related issues",
        change: "-8% requests",
        period: "vs. Last Quarter",
        trend: "down" as const,
        trendValue: 8,
    },
    {
        title: "Tenant Mix",
        description: "Growing tech sector presence",
        change: "+15% tech tenants",
        period: "Year to Date",
        trend: "up" as const,
        trendValue: 15,
    },
    {
        title: "Operating Costs",
        description: "Utility costs trending higher",
        change: "+5% costs",
        period: "vs. Last Month",
        trend: "up" as const,
        trendValue: 5,
    },
]

const mockPrompts = [
    {
        title: "Occupancy Analysis",
        description: "Get detailed insights about building occupancy patterns",
        example: "Show me occupancy trends for the last quarter compared to industry benchmarks",
    },
    {
        title: "Lease Optimization",
        description: "Analyze and optimize lease terms and rates",
        example: "What are the recommended lease rates for vacant spaces based on market data?",
    },
    {
        title: "Maintenance Planning",
        description: "Plan preventive maintenance schedules",
        example: "Generate a maintenance schedule for Q2 based on historical patterns and tenant feedback",
    },
    {
        title: "Revenue Forecasting",
        description: "Predict future revenue and identify opportunities",
        example: "Forecast revenue for the next 6 months considering current trends and market conditions",
    },
]

export default function Buildings() {
    const pathname = usePathname()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">Buildings</h1>
                </div>
                <Button>
                    <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                    Add Building
                </Button>
            </div>

            <AIInsights
                insights={mockInsights}
                suggestions={mockSuggestions}
                trends={mockTrends}
                prompts={mockPrompts}
            />

            <div className="flex flex-col gap-4 w-full">
                <TabNavigation>
                    {tabs.map((tab) => (
                        <TabNavigationLink
                            key={tab.name}
                            asChild
                            active={pathname === tab.href}
                        >
                            <Link href={tab.href}>{tab.name}</Link>
                        </TabNavigationLink>
                    ))}
                </TabNavigation>

                <div className="pt-4">
                    <DataTable columns={buildingsColumns} data={data} />
                </div>
            </div>
        </div>
    )
} 