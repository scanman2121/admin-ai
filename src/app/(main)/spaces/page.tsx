"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Input } from "@/components/ui/input"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { getPageInsights } from "@/lib/insights"
import { RiAddLine, RiLayoutLine, RiSearchLine } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

// Define tabs for the Spaces page
const tabs = [
    { name: "All Spaces", href: "/spaces" },
    { name: "Active", href: "/spaces/active" },
    { name: "Inactive", href: "/spaces/inactive" },
] as const

// Define the type for space data
interface Space {
    id: string
    name: string
    imageUrl: string
    building: string
    type: string
    capacity: number
    accessGroup: string
    status: string
    lastUpdated: string
}

// Mock data for spaces
const spacesData = [
    {
        id: "1",
        name: "Executive Conference Room",
        imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2669&auto=format&fit=crop",
        building: "125 Highland Ave",
        type: "Conference Room",
        capacity: 20,
        accessGroup: "Executive Team",
        status: "Active",
        lastUpdated: "2024-03-01",
    },
    {
        id: "2",
        name: "75 Varick Roof Deck",
        imageUrl: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        building: "75 Varick",
        type: "Outdoor Space",
        capacity: 200,
        accessGroup: "All Tenants",
        status: "Active",
        lastUpdated: "2024-03-10",
    },
    {
        id: "3",
        name: "Innovation Lab",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop",
        building: "75 State Street",
        type: "Workshop",
        capacity: 30,
        accessGroup: "Tech Teams",
        status: "Inactive",
        lastUpdated: "2024-01-15",
    },
    {
        id: "4",
        name: "Wellness Center",
        imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop",
        building: "200 Congress Ave",
        type: "Fitness Space",
        capacity: 40,
        accessGroup: "All Tenants",
        status: "Active",
        lastUpdated: "2024-02-20",
    },
    {
        id: "5",
        name: "Library & Study Area",
        imageUrl: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2670&auto=format&fit=crop",
        building: "500 Boylston Street",
        type: "Quiet Space",
        capacity: 25,
        accessGroup: "All Tenants",
        status: "Active",
        lastUpdated: "2024-03-05",
    },
]

// Define columns for the spaces table
const spacesColumns = [
    {
        accessorKey: "name",
        header: "Space Name",
        cell: ({ row }: { row: any }) => {
            const name = row.getValue("name") as string;
            const imageUrl = row.original.imageUrl as string;

            return (
                <div className="flex items-center gap-3">
                    <div className="relative size-8 overflow-hidden rounded-md">
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span>{name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "building",
        header: "Building",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "capacity",
        header: "Capacity",
    },
    {
        accessorKey: "accessGroup",
        header: "Access Group",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("status") as string
            return (
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === "Active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}>
                    {status}
                </span>
            )
        },
    },
    {
        accessorKey: "lastUpdated",
        header: "Last Updated",
    },
]

export default function SpacesPage() {
    const pathname = usePathname()
    const router = useRouter()
    const insights = getPageInsights("spaces")

    return (
        <div className="flex h-full w-full flex-col space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950">
                        <RiLayoutLine className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                    </div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Spaces</h1>
                </div>
                <Button onClick={() => router.push("/spaces/new")} size="sm">
                    <RiAddLine className="mr-1 h-4 w-4" />
                    Add space
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

                <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                        <RiSearchLine className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Search spaces..."
                            className="pl-9"
                        />
                    </div>
                    <Button variant="outline">Filters</Button>
                </div>

                <DataTable<Space, any>
                    columns={spacesColumns}
                    data={spacesData}
                    onRowClick={(row) => router.push(`/spaces/${row.id}`)}
                />
            </div>
        </div>
    )
} 