"use client"

import { Checkbox } from "@/components/Checkbox"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Row, Table } from "@tanstack/react-table"
import { Key, Users, KeyRound, MapPin } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/Button"
import { RiAddLine } from "@remixicon/react"

// Sample access control data
const accessControlData = [
    {
        id: "1",
        user: "John Doe",
        userStatus: "active",
        lastScan: "2024-03-15 10:30 AM",
        activationDate: "2024-01-01",
        credentialStatus: "Activated",
        credential: "CARD-001",
    },
    {
        id: "2",
        user: "Jane Smith",
        userStatus: "deactivated",
        lastScan: "2024-03-14 2:15 PM",
        activationDate: "2024-01-02",
        credentialStatus: "Deactivated",
        credential: "CARD-002",
    },
    {
        id: "3",
        user: "Bob Johnson",
        userStatus: "active",
        lastScan: "2024-03-15 9:45 AM",
        activationDate: "2024-01-03",
        credentialStatus: "Activated",
        credential: "CARD-003",
    },
]

// Define columns for the access control table
const accessControlColumns = [
    {
        id: "select",
        header: ({ table }: { table: Table<any> }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected()
                        ? true
                        : table.getIsSomePageRowsSelected()
                            ? "indeterminate"
                            : false
                }
                onCheckedChange={(value) => {
                    table.toggleAllPageRowsSelected(!!value)
                }}
                aria-label="Select all"
            />
        ),
        cell: ({ row }: { row: Row<any> }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => {
                    row.toggleSelected(!!value)
                }}
                onClick={(e) => {
                    e.stopPropagation()
                }}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
        meta: {
            displayName: "Select",
        },
    },
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }: { row: any }) => {
            const user = row.getValue("user") as string;
            return (
                <span className="font-medium text-gray-900 dark:text-gray-50">{user}</span>
            );
        },
        meta: {
            displayName: "User",
        },
        filterFn: "includesString" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "userStatus",
        header: "User status",
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("userStatus") as string;
            const isActive = status === "active";
            
            return (
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                    isActive 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                }`}>
                    {isActive ? "Active" : "Deactivated"}
                </span>
            );
        },
        meta: {
            displayName: "User Status",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "lastScan",
        header: "Last scan",
        cell: ({ row }: { row: any }) => {
            const lastScan = row.getValue("lastScan") as string;
            return <span className="text-gray-600 dark:text-gray-400">{lastScan}</span>;
        },
        meta: {
            displayName: "Last Scan",
        },
        filterFn: "includesString" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "activationDate",
        header: "Activation date",
        cell: ({ row }: { row: any }) => {
            const date = row.getValue("activationDate") as string;
            return <span className="text-gray-600 dark:text-gray-400">{date}</span>;
        },
        meta: {
            displayName: "Activation Date",
        },
        filterFn: "includesString" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "credentialStatus",
        header: "Credential status",
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("credentialStatus") as string;
            return (
                <span className="text-gray-700 dark:text-gray-300">{status}</span>
            );
        },
        meta: {
            displayName: "Credential Status",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "credential",
        header: "Credential",
        cell: ({ row }: { row: any }) => {
            const credential = row.getValue("credential") as string;
            return <span className="text-gray-700 dark:text-gray-300">{credential}</span>;
        },
        meta: {
            displayName: "Credential",
        },
        filterFn: "includesString" as const,
        enableColumnFilter: true,
    },
]

export default function TenantAccessControlPage() {
    const [data] = useState(accessControlData)

    return (
        <div className="flex h-full w-full flex-col space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                        Access control
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage credentials and access points
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        3 credentials available
                    </span>
                    <Button>
                        <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                        Assign credentials
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Total credentials */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                            <Key className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total credentials</span>
                    </div>
                    <div className="text-3xl font-semibold text-gray-900 dark:text-gray-50">3</div>
                </div>

                {/* Active users */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                            <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Active users</span>
                    </div>
                    <div className="text-3xl font-semibold text-gray-900 dark:text-gray-50">2</div>
                </div>

                {/* Available credentials */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                            <KeyRound className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Available credentials</span>
                    </div>
                    <div className="text-3xl font-semibold text-gray-900 dark:text-gray-50">3</div>
                </div>

                {/* Access points */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                            <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Access points</span>
                    </div>
                    <div className="text-3xl font-semibold text-gray-900 dark:text-gray-50">3</div>
                </div>
            </div>

            {/* Data Table */}
            <div className="pt-2">
                <DataTable columns={accessControlColumns} data={data} />
            </div>
        </div>
    )
}
