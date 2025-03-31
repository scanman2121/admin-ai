"use client"

import { Button } from "@/components/Button"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { DataTable } from "@/components/ui/data-table/data-table"
import { RiAddLine } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Define tabs for the Spaces page
const tabs = [
    { name: "All Spaces", href: "/spaces" },
    { name: "Active", href: "/spaces/active" },
    { name: "Inactive", href: "/spaces/inactive" },
] as const

// Mock data for spaces
const allSpacesData = [
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
        name: "Rooftop Garden",
        imageUrl: "https://images.unsplash.com/photo-1533759413974-9e15f3b745ac?q=80&w=2674&auto=format&fit=crop",
        building: "400 Market Street",
        type: "Outdoor Space",
        capacity: 100,
        accessGroup: "All Tenants",
        status: "Active",
        lastUpdated: "2024-02-28",
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

export default function SpacesActive() {
    const pathname = usePathname()
    const router = useRouter()
    const [data, setData] = useState<typeof allSpacesData>([])

    // Filter for active spaces only
    useEffect(() => {
        const activeSpaces = allSpacesData.filter(space => space.status === "Active")
        setData(activeSpaces)
    }, [])

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                    Spaces
                </h1>
                <Button>
                    <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                    Add Space
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
                <DataTable<Space, any>
                    columns={spacesColumns}
                    data={data}
                    onRowClick={(row) => router.push(`/spaces/${row.original.id}`)}
                />
            </div>
        </div>
    )
} 