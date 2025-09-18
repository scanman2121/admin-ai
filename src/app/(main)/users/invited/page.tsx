"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
import { Tooltip } from "@/components/Tooltip"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { invitedUsers, roles } from "@/data/data"
import { showError } from "@/lib/toast"
import { Row, Table } from "@tanstack/react-table"
import { CreditCard, RotateCcw } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Define columns for the invited users table
const invitedUsersColumns = [
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
            
            return (
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                        Pending
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
    {
        accessorKey: "invitedDate",
        header: "Invited",
        cell: ({ row }: { row: any }) => {
            const invitedDate = row.getValue("invitedDate") as string;
            const expiresInDays = row.original.expiresInDays as number;
            
            return (
                <div>
                    <div className="text-sm text-gray-900 dark:text-gray-100">{invitedDate}</div>
                    <div className="text-xs text-gray-500">Expires in {expiresInDays} days</div>
                </div>
            );
        },
        meta: {
            displayName: "Invited",
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: any }) => {
            const email = row.original.email as string;
            
            const handleResendInvitation = (e: React.MouseEvent) => {
                e.stopPropagation(); // Prevent row click
                try {
                    // In a real app, you would call an API to resend the invitation
                    console.log("Resending invitation to:", email)
                    showError("This feature is not implemented yet.")
                } catch (err) {
                    console.error("Error resending invitation:", err)
                    showError("Failed to resend invitation. Please try again.")
                }
            };

            return (
                <Tooltip content="Resend invitation">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleResendInvitation}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-500 dark:hover:text-indigo-400"
                    >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Resend
                    </Button>
                </Tooltip>
            );
        },
        enableSorting: false,
        meta: {
            displayName: "Actions",
        },
    },
]

export default function InvitedUsers() {
    const [data] = useState(invitedUsers)
    const router = useRouter()

    const handleRowClick = (user: any) => {
        // Generate user ID from email (remove @ and domain, replace dots)
        const userId = user.email.split('@')[0].replace('.', '')
        router.push(`/users/${userId}`)
    }

    return <DataTable columns={invitedUsersColumns} data={data} onRowClick={handleRowClick} />
}