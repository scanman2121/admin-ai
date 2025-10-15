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
                        <Image src={imageUrl} alt={name} fill className="object-cover" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-gray-50">{name}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => <span className="text-gray-600 dark:text-gray-400">{row.getValue("location")}</span>,
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <span className="text-gray-600 dark:text-gray-400">{row.getValue("type")}</span>,
    },
    {
        accessorKey: "floors",
        header: "Floors",
        cell: ({ row }) => <span className="text-gray-600 dark:text-gray-400">{row.getValue("floors")}</span>,
    },
    {
        accessorKey: "tenants",
        header: "Tenants",
        cell: ({ row }) => <span className="text-gray-600 dark:text-gray-400">{row.getValue("tenants")}</span>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                {row.getValue("status")}
            </span>
        ),
    },
    {
        accessorKey: "lastUpdated",
        header: "Last Updated",
        cell: ({ row }) => <span className="text-gray-600 dark:text-gray-400">{row.getValue("lastUpdated")}</span>,
    },
]

export default function ActiveBuildingsPage() {
    const [data] = useState(buildingsData.filter(b => b.status === "Active"))
    return <DataTable columns={buildingsColumns} data={data} />
}

