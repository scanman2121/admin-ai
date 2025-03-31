"use client"

import { Button } from "@/components/Button"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { getPageInsights } from "@/lib/insights"
import { RiAddLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Audiences page
const tabs = [
    { name: "All Audiences", href: "/audiences" },
    { name: "Active", href: "/audiences/active" },
    { name: "Archived", href: "/audiences/archived" },
] as const

// Mock data for audiences
const audiencesData = [
    {
        id: "1",
        name: "Office Managers",
        description: "All office managers across buildings",
        members: 45,
        buildings: ["All Buildings"],
        created: "2023-10-15",
        lastSent: "2024-03-01",
        status: "Active",
    },
    {
        id: "2",
        name: "Highland Ave Tenants",
        description: "All tenants at 125 Highland Ave",
        members: 120,
        buildings: ["125 Highland Ave"],
        created: "2023-11-20",
        lastSent: "2024-02-15",
        status: "Active",
    },
    {
        id: "3",
        name: "Retail Tenants",
        description: "All retail tenants across properties",
        members: 35,
        buildings: ["75 State Street", "400 Market Street"],
        created: "2023-08-05",
        lastSent: "2023-12-10",
        status: "Archived",
    },
    {
        id: "4",
        name: "Tech Companies",
        description: "All technology companies across buildings",
        members: 75,
        buildings: ["200 Congress Ave", "125 Highland Ave"],
        created: "2024-01-10",
        lastSent: "2024-02-28",
        status: "Active",
    },
    {
        id: "5",
        name: "Boston Properties",
        description: "All tenants in Boston properties",
        members: 215,
        buildings: ["125 Highland Ave", "500 Boylston Street"],
        created: "2023-09-01",
        lastSent: "2024-03-05",
        status: "Active",
    },
]

// Define columns for the audiences table
const audiencesColumns = [
    {
        accessorKey: "name",
        header: "Audience Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "members",
        header: "Members",
    },
    {
        accessorKey: "buildings",
        header: "Buildings",
        cell: ({ row }: { row: any }) => {
            const buildings = row.getValue("buildings") as string[]
            return (
                <div>
                    {buildings.map((building, index) => (
                        <span key={index} className="inline-block mr-1 last:mr-0">
                            {building}{index < buildings.length - 1 ? ", " : ""}
                        </span>
                    ))}
                </div>
            )
        },
    },
    {
        accessorKey: "created",
        header: "Created Date",
    },
    {
        accessorKey: "lastSent",
        header: "Last Message Sent",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("status") as string
            return (
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === "Active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}>
                    {status}
                </span>
            )
        },
    },
]

export default function Audiences() {
    const pathname = usePathname()
    const [data] = useState(audiencesData)
    const insights = getPageInsights("analytics") // Using analytics insights for audiences

    return (
        <div className="flex h-full w-full flex-col space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                    Audiences
                </h1>
                <Button>
                    <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                    Create audience
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

                <DataTable columns={audiencesColumns} data={data} />
            </div>
        </div>
    )
} 