"use client"

import { Button } from "@/components/Button"
import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Access Control Activity page
const tabs = [
    { name: "Overview", href: "/operations/access-control" },
    { name: "Activity", href: "/operations/access-control/activity" },
    { name: "Access groups", href: "/operations/access-control/access-groups" },
    { name: "User access", href: "/operations/access-control/user-access" },
]

// Mock data for activity log
const activityData = [
    {
        id: "1",
        dateTime: "Oct 18, 2024 12:37 PM",
        action: "Access granted",
        accessPoint: "Test_",
        company: "Garbarino Property Trust",
        name: "Chris LastName Test",
        host: "-",
    },
    {
        id: "2",
        dateTime: "Oct 18, 2024 12:37 PM",
        action: "Access granted",
        accessPoint: "Test_",
        company: "Garbarino Property Trust",
        name: "Chris LastName Test",
        host: "-",
    },
    {
        id: "3",
        dateTime: "Oct 18, 2024 11:02 AM",
        action: "Access granted",
        accessPoint: "Test_",
        company: "Garbarino Property Trust",
        name: "Chris LastName Test",
        host: "-",
    },
    {
        id: "4",
        dateTime: "Oct 16, 2024 10:20 AM",
        action: "Access granted",
        accessPoint: "Test_",
        company: "Garbarino Property Trust",
        name: "Chris LastName Test",
        host: "-",
    },
    {
        id: "5",
        dateTime: "Oct 16, 2024 8:26 AM",
        action: "Access granted",
        accessPoint: "Test_",
        company: "Garbarino Property Trust",
        name: "Chris LastName Test",
        host: "-",
    },
    {
        id: "6",
        dateTime: "Oct 14, 2024 6:43 AM",
        action: "Access granted",
        accessPoint: "Test_",
        company: "Garbarino Property Trust",
        name: "Chris LastName Test",
        host: "-",
    },
    {
        id: "7",
        dateTime: "Oct 14, 2024 6:43 AM",
        action: "Access granted",
        accessPoint: "Test_",
        company: "Garbarino Property Trust",
        name: "Chris LastName Test",
        host: "-",
    },
    {
        id: "8",
        dateTime: "Oct 14, 2024 5:04 AM",
        action: "Access granted",
        accessPoint: "Test_",
        company: "Garbarino Property Trust",
        name: "Chris LastName Test",
        host: "-",
    },
]


// Define columns for the activity table
const activityColumns = [
    {
        accessorKey: "dateTime",
        header: "Date and time",
        cell: ({ row }: { row: any }) => {
            const dateTime = row.getValue("dateTime") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50 font-medium">
                    {dateTime}
                </span>
            );
        },
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }: { row: any }) => {
            const action = row.getValue("action") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50">
                    {action}
                </span>
            );
        },
    },
    {
        accessorKey: "accessPoint",
        header: "Access point",
        cell: ({ row }: { row: any }) => {
            const accessPoint = row.getValue("accessPoint") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50">
                    {accessPoint}
                </span>
            );
        },
    },
    {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }: { row: any }) => {
            const company = row.getValue("company") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50">
                    {company}
                </span>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }: { row: any }) => {
            const name = row.getValue("name") as string;
            return (
                <Link 
                    href={`/users/${row.original.id}`}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 font-medium"
                >
                    {name}
                </Link>
            );
        },
    },
    {
        accessorKey: "host",
        header: "Host",
        cell: ({ row }: { row: any }) => {
            const host = row.getValue("host") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50">
                    {host}
                </span>
            );
        },
    },
]

export default function AccessControlActivity() {
    const pathname = usePathname()
    const [data] = useState(activityData)

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <PageHeader 
                title="Access Control" 
                customButtons={
                    <Button variant="primary">
                        Add Access Point
                    </Button>
                }
            />

            {/* Tab Navigation */}
            <TabNavigation>
                {tabs.map((tab) => (
                    <TabNavigationLink
                        key={tab.name}
                        asChild
                        active={pathname === tab.href}
                    >
                        <Link href={tab.href}>
                            {tab.name}
                        </Link>
                    </TabNavigationLink>
                ))}
            </TabNavigation>

            {/* Data Table */}
            <DataTable
                columns={activityColumns}
                data={data}
                searchKey="name"
            />
        </div>
    )
}
