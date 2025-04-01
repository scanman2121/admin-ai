"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { RiAddLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { buildingsColumns } from "../columns"
import { data as allBuildingsData } from "../data"

// Define tabs for the Buildings page
const tabs = [
    { name: "All Buildings", href: "/buildings" },
    { name: "Active", href: "/buildings/active" },
    { name: "Inactive", href: "/buildings/inactive" },
] as const

export default function BuildingsActive() {
    const pathname = usePathname()
    const [data, setData] = useState<typeof allBuildingsData>([])

    // Filter for active buildings only
    useEffect(() => {
        const activeBuildings = allBuildingsData.filter(building => building.status === "Active")
        setData(activeBuildings)
    }, [])

    return (
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
    )
} 