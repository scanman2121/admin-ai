"use client"

import { DataTable } from "@/components/ui/data-table/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { useState } from "react"

interface Building {
    id: string
    name: string
    imageUrl: string
    location: string
    type: string
    floors: number
    tenants: number
    status: string
    lastUpdated: string
}

// Buildings data for tenant
const buildingsData: Building[] = [
    {
        id: "1",
        name: "125 Highland Ave",
        imageUrl: "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "Boston, MA",
        type: "Office",
        floors: 12,
        tenants: 8,
        status: "Active",
        lastUpdated: "2023-12-15",
    },
    {
        id: "2",
        name: "400 Market Street",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "San Francisco, CA",
        type: "Mixed Use",
        floors: 24,
        tenants: 15,
        status: "Active",
        lastUpdated: "2023-11-20",
    },
]

// Define columns for tenant buildings table
const buildingsColumns: ColumnDef<Building>[] = [
    {
        accessorKey: "name",
        header: "Building Name",
        cell: ({ row }) => {
            const name = row.getValue("name") as string
            const imageUrl = row.original.imageUrl

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
                    <span className="font-medium text-gray-900 dark:text-gray-50">{name}</span>
                </div>
            )
        },
        meta: {
            displayName: "Building Name",
        },
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => {
            const location = row.getValue("location") as string
            return <span className="text-gray-600 dark:text-gray-400">{location}</span>
        },
        meta: {
            displayName: "Location",
        },
        filterFn: "includesString" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
            const type = row.getValue("type") as string
            return <span className="text-gray-600 dark:text-gray-400">{type}</span>
        },
        meta: {
            displayName: "Type",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "floors",
        header: "Floors",
        cell: ({ row }) => {
            const floors = row.getValue("floors") as number
            return <span className="text-gray-600 dark:text-gray-400">{floors}</span>
        },
        meta: {
            displayName: "Floors",
        },
    },
    {
        accessorKey: "tenants",
        header: "Tenants",
        cell: ({ row }) => {
            const tenants = row.getValue("tenants") as number
            return <span className="text-gray-600 dark:text-gray-400">{tenants}</span>
        },
        meta: {
            displayName: "Tenants",
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}
                >
                    {status}
                </span>
            )
        },
        meta: {
            displayName: "Status",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "lastUpdated",
        header: "Last Updated",
        cell: ({ row }) => {
            const date = row.getValue("lastUpdated") as string
            return <span className="text-gray-600 dark:text-gray-400">{date}</span>
        },
        meta: {
            displayName: "Last Updated",
        },
    },
]

export default function TenantBuildingsPage() {
    const [data] = useState(buildingsData)

    return <DataTable columns={buildingsColumns} data={data} />
}

