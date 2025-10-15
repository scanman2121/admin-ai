"use client"

import { Checkbox } from "@/components/Checkbox"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Row, Table } from "@tanstack/react-table"
import { Coins } from "lucide-react"
import { useState } from "react"

// Sample credits data
const creditsData = [
    {
        id: "1",
        name: "John Smith",
        email: "john.smith@company.com",
        department: "Engineering",
        creditsBalance: 500,
    },
    {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah.j@company.com",
        department: "Marketing",
        creditsBalance: 750,
    },
    {
        id: "3",
        name: "Mike Brown",
        email: "mike.b@company.com",
        department: "Sales",
        creditsBalance: 300,
    },
]

// Define columns for the credits table
const creditsColumns = [
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
        accessorKey: "name",
        header: "Name",
        cell: ({ row }: { row: any }) => {
            const name = row.getValue("name") as string;
            return (
                <span className="font-medium text-gray-900 dark:text-gray-50">{name}</span>
            );
        },
        meta: {
            displayName: "Name",
        },
        filterFn: "includesString" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }: { row: any }) => {
            const email = row.getValue("email") as string;
            return <span className="text-gray-600 dark:text-gray-400">{email}</span>;
        },
        meta: {
            displayName: "Email",
        },
        filterFn: "includesString" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }: { row: any }) => {
            const department = row.getValue("department") as string;
            return <span className="text-gray-700 dark:text-gray-300">{department}</span>;
        },
        meta: {
            displayName: "Department",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "creditsBalance",
        header: "Credits balance",
        cell: ({ row }: { row: any }) => {
            const balance = row.getValue("creditsBalance") as number;
            return (
                <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="font-medium text-gray-900 dark:text-gray-50">{balance}</span>
                </div>
            );
        },
        meta: {
            displayName: "Credits Balance",
        },
    },
]

export default function TenantCreditsPage() {
    const [data] = useState(creditsData)

    return <DataTable columns={creditsColumns} data={data} />
}

