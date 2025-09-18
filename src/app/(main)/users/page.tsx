"use client"

import { Badge } from "@/components/Badge"
import { Checkbox } from "@/components/Checkbox"
import { Tooltip } from "@/components/Tooltip"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { roles, users } from "@/data/data"
import { Row, Table } from "@tanstack/react-table"
import { CreditCard } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Define columns for the users table
const usersColumns = [
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
        header: "User",
        cell: ({ row }: { row: any }) => {
            const name = row.getValue("name") as string;
            const email = row.original.email as string;
            const avatarUrl = row.original.avatarUrl as string;
            const initials = row.original.initials as string;

            return (
                <div className="flex items-center gap-3">
                    <div className="relative size-8 overflow-hidden rounded-full">
                        {avatarUrl ? (
                            <Image
                                src={avatarUrl}
                                alt={name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                {initials}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900 dark:text-gray-50">
                            {name}
                        </div>
                        <div className="text-sm text-gray-500">
                            {email}
                        </div>
                    </div>
                </div>
            );
        },
        meta: {
            displayName: "User",
        },
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }: { row: any }) => {
            const role = row.getValue("role") as string;
            const roleLabel = roles.find(r => r.value === role)?.label || role;

            return (
                <span className="capitalize">{roleLabel}</span>
            );
        },
        meta: {
            displayName: "Role",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "buildings",
        header: "Buildings",
        cell: ({ row }: { row: any }) => {
            const buildings = row.getValue("buildings") as string[];
            return (
                <div className="flex flex-wrap gap-1">
                    {buildings.map((building) => (
                        <Badge
                            key={building}
                            variant="neutral"
                            className="text-xs"
                        >
                            {building}
                        </Badge>
                    ))}
                </div>
            );
        },
        meta: {
            displayName: "Buildings",
        },
    },
    {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }: { row: any }) => {
            const company = row.getValue("company") as string;
            return <span className="text-gray-600 dark:text-gray-400">{company}</span>;
        },
        meta: {
            displayName: "Company",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: any }) => {
            const hasMobileAccess = row.original.hasMobileAccess as boolean;
            const status = row.original.status as string;
            const isActive = status === "active";
            
            return (
                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        isActive 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}>
                        {isActive ? "Active" : "Inactive"}
                    </span>
                    {hasMobileAccess && (
                        <Tooltip content="Mobile access active">
                            <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </Tooltip>
                    )}
                </div>
            );
        },
        meta: {
            displayName: "Status",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
]

export default function Users() {
    const [data] = useState(users)
    const router = useRouter()

    const handleRowClick = (user: any) => {
        // Generate user ID from email (remove @ and domain, replace dots)
        const userId = user.email.split('@')[0].replace('.', '')
        router.push(`/users/${userId}`)
    }

    return <DataTable columns={usersColumns} data={data} onRowClick={handleRowClick} />
} 