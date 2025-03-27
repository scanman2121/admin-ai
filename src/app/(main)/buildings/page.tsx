"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { RiAddLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { AIInsights } from "@/components/ui/insights/AIInsights"
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

export default function Buildings() {
    const pathname = usePathname()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Buildings</h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Manage and monitor all your building properties in one place.
                    </p>
                </div>
                <Button>
                    <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                    Add Building
                </Button>
            </div>

            <AIInsights insights={mockInsights} />

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