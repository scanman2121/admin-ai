"use client"

import { Button } from "@/components/Button"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { RiArrowLeftLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Define tabs for the Work Orders Settings page
const tabs = [
    { name: "Service Types", href: "/operations/work-orders/settings" },
    { name: "Teams", href: "/operations/work-orders/settings/teams" },
    { name: "Settings", href: "/operations/work-orders/settings/general" },
]

export default function WorkOrdersTeams() {
    const pathname = usePathname()

    return (
        <div className="space-y-6">
            {/* Header with back navigation */}
            <div className="flex items-center gap-3">
                <Link 
                    href="/operations/work-orders"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <RiArrowLeftLine className="mr-1 size-4" />
                    Work Orders
                </Link>
            </div>

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                        Work Orders 
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Manage individual service request types and their configurations
                    </p>
                </div>
                <Button variant="primary">
                    Save
                </Button>
            </div>

            {/* Tab Navigation */}
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

            {/* Teams Content */}
            <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                    Teams
                </h2>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="p-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            Teams management content will be rendered here
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
