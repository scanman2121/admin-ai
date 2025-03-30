"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { RiAddLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { documentsColumns } from "./columns"
import { data } from "./data"
import { AddDocumentModal } from "./AddDocumentModal"

// Define tabs for the Documents page
const tabs = [
    { name: "All documents", href: "/settings-and-setup/documents" },
    { name: "Active", href: "/settings-and-setup/documents/active" },
    { name: "Pending", href: "/settings-and-setup/documents/pending" },
    { name: "Inactive", href: "/settings-and-setup/documents/inactive" },
] as const

const mockInsights = [
    {
        title: "Total Documents",
        value: "156",
        comparison: "12 new this month",
        trend: "up" as const,
        trendValue: 8,
    },
    {
        title: "Storage Used",
        value: "2.4 GB",
        comparison: "of 5 GB limit",
        trend: "up" as const,
        trendValue: 15,
    },
    {
        title: "Active Documents",
        value: "89%",
        comparison: "vs. Last Month: 85%",
        trend: "up" as const,
        trendValue: 4,
    },
    {
        title: "Average Upload Size",
        value: "3.2 MB",
        comparison: "vs. Last Month: 2.8 MB",
        trend: "up" as const,
        trendValue: 14,
    },
]

export default function Documents() {
    const pathname = usePathname()
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">Documents</h1>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                    Add document
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
                    <DataTable columns={documentsColumns} data={data} />
                </div>
            </div>

            <AddDocumentModal 
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </div>
    )
} 