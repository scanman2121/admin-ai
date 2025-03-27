"use client"

import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { visitorColumns } from "@/components/ui/data-table/visitorColumns"
import { visitors } from "@/data/data"
import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
    { name: "All visitors", href: "/visitor-management" },
    { name: "Expected", href: "/visitor-management/expected" },
    { name: "Reports", href: "/visitor-management/reports" },
] as const

export default function VisitorManagement() {
    const pathname = usePathname()
    return (
        <div className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
            <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                Visitor Management
            </h1>
            <TabNavigation className="mt-4 sm:mt-6 lg:mt-10">
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
            <div className="mt-8">
                <DataTable data={visitors} columns={visitorColumns} />
            </div>
        </div>
    )
} 