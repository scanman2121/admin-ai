"use client"

import { Checkbox } from "@/components/Checkbox"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { Row, Table } from "@tanstack/react-table"
import Image from "next/image"
import { useState } from "react"

// Sample employee data
const employeesData = [
    {
        id: "1",
        name: "Tenny",
        email: "tenny@acme.com",
        avatarUrl: null,
        initials: "T",
        role: "Tenant Admin",
        company: "Acme Inc",
        status: "active",
    },
    {
        id: "2",
        name: "Alissia McCalister",
        email: "a.stone@gmail.com",
        avatarUrl: null,
        initials: "AM",
        role: "Tenant Admin",
        company: "Acme Inc",
        status: "active",
    },
    {
        id: "3",
        name: "Emily Luisa Bernacle",
        email: "e.luis.bernacle@gmail.com",
        avatarUrl: null,
        initials: "EB",
        role: "Member",
        company: "Acme Inc",
        status: "active",
    },
]

// Define columns for the employees table
const employeesColumns = [
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
        header: "Employee",
        cell: ({ row }: { row: any }) => {
            const name = row.getValue("name") as string;
            const email = row.original.email as string;
            const avatarUrl = row.original.avatarUrl as string;
            const initials = row.original.initials as string;

            return (
                <div className="flex items-center gap-3">
                    <div className="relative size-10 overflow-hidden rounded-full">
                        {avatarUrl ? (
                            <Image
                                src={avatarUrl}
                                alt={name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-sm font-medium text-white">
                                {initials}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900 dark:text-gray-50">
                            {name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {email}
                        </div>
                    </div>
                </div>
            );
        },
        meta: {
            displayName: "Employee",
        },
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }: { row: any }) => {
            const role = row.getValue("role") as string;
            return (
                <span className="text-gray-700 dark:text-gray-300">{role}</span>
            );
        },
        meta: {
            displayName: "Role",
        },
        filterFn: "equals" as const,
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
            const status = row.getValue("status") as string;
            const isActive = status === "active";
            
            return (
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    isActive 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                }`}>
                    {isActive ? "Active" : "Inactive"}
                </span>
            );
        },
        meta: {
            displayName: "Status",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
]

export default function TenantEmployeesPage() {
    const [data] = useState(employeesData)

    return <DataTable columns={employeesColumns} data={data} />
}

