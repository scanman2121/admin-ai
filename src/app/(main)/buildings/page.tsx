"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Input } from "@/components/ui/input"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { getPageInsights } from "@/lib/insights"
import { RiAddLine, RiSearchLine } from "@remixicon/react"
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
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">Buildings</h1>
                <Button onClick={() => router.push("/buildings/new")}>
                    <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                    Add Building
                </Button>
            </div>

            <AIInsights insights={insights} className="mt-6" />

            <div className="flex flex-col gap-4 w-full">
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

                <DataTable
                    columns={buildingsColumns}
                    data={data}
                    onRowClick={(row: Building) => router.push(`/buildings/${row.id}`)}
                />
            </div>
        </div>
    )
} 