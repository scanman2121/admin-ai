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
        title: "Occupancy Rate Increase",
        description: "Building occupancy rates have increased significantly over the past month.",
        impact: "positive" as const,
        percentage: 15,
    },
    {
        title: "Energy Consumption Optimization",
        description: "Smart building systems have reduced energy consumption in common areas.",
        impact: "positive" as const,
        percentage: 8,
    },
    {
        title: "Maintenance Schedule Alert",
        description: "Three buildings require preventive maintenance in the next two weeks.",
        impact: "neutral" as const,
    },
]

export default function Buildings() {
    const pathname = usePathname()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Buildings</h1>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Manage and monitor all your building properties in one place.
                </p>
            </div>

            <AIInsights insights={mockInsights} className="my-6" />

            <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                        Buildings
                    </h1>
                    <Button>
                        <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                        Add Building
                    </Button>
                </div>

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