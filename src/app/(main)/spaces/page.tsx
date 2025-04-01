"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { getPageInsights } from "@/lib/insights"
import { RiAddLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { spacesColumns } from "./columns"
import { data } from "./data"

// Define tabs for the Spaces page
const tabs = [
    { name: "All Spaces", href: "/spaces" },
    { name: "Active", href: "/spaces/active" },
    { name: "Inactive", href: "/spaces/inactive" },
] as const

export default function SpacesPage() {
    const pathname = usePathname()
    const router = useRouter()
    const insights = getPageInsights("spaces")

    return (
        <div className="flex h-full w-full flex-col space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">Spaces</h1>
                <Button onClick={() => router.push("/spaces/new")}>
                    <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                    Add Space
                </Button>
            </div>

            <AIInsights insights={insights} className="mt-6" />

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

                <DataTable
                    columns={spacesColumns}
                    data={data}
                />
            </div>
        </div>
    )
} 