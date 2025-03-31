"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Input } from "@/components/ui/input"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { getPageInsights } from "@/lib/insights"
import { RiAddLine, RiBuildingLine, RiSearchLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { buildingsColumns } from "./columns"
import { data } from "./data"

// Define tabs for the Buildings page
const tabs = [
    { name: "All Buildings", href: "/buildings" },
    { name: "Active", href: "/buildings/active" },
    { name: "Inactive", href: "/buildings/inactive" },
] as const

interface Building {
    id: string;
    [key: string]: any;
}

export default function Buildings() {
    const pathname = usePathname()
    const router = useRouter()
    const insights = getPageInsights("buildings")

    return (
        <div className="flex h-full w-full flex-col space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950">
                        <RiBuildingLine className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                    </div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Buildings</h1>
                </div>
                <Button onClick={() => router.push("/buildings/new")} size="sm">
                    <RiAddLine className="mr-1 h-4 w-4" />
                    Add building
                </Button>
            </div>

            <AIInsights insights={insights} className="mt-6" />

            <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                    <RiSearchLine className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Search buildings..."
                        className="pl-9"
                    />
                </div>
                <Button variant="outline">Filters</Button>
            </div>

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
                    <DataTable
                        columns={buildingsColumns}
                        data={data}
                        onRowClick={(row: Building) => router.push(`/buildings/${row.id}`)}
                    />
                </div>
            </div>
        </div>
    )
} 