"use client"

import { Button } from "@/components/Button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { getPageInsights } from "@/lib/insights"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Mock data for transactions
const transactionsData = [
    {
        id: "TXN-001",
        tenant: "Acme Corporation",
        building: "125 Highland Ave",
        type: "New Lease",
        status: "In Progress",
        value: "$2,450,000",
        startDate: "2024-01-15",
        expectedClose: "2024-03-01",
        assignedTo: "Sarah Johnson",
    },
    {
        id: "TXN-002",
        tenant: "Global Enterprises",
        building: "400 Market Street",
        type: "Renewal",
        status: "Negotiation",
        value: "$1,850,000",
        startDate: "2024-01-10",
        expectedClose: "2024-02-28",
        assignedTo: "Michael Chen",
    },
    {
        id: "TXN-003",
        tenant: "Tech Innovators",
        building: "200 Congress Ave",
        type: "Expansion",
        status: "Documentation",
        value: "$3,200,000",
        startDate: "2024-01-05",
        expectedClose: "2024-02-15",
        assignedTo: "Emily Davis",
    },
    {
        id: "TXN-004",
        tenant: "Financial Services Inc",
        building: "500 Boylston Street",
        type: "New Lease",
        status: "Pending Approval",
        value: "$1,100,000",
        startDate: "2024-01-20",
        expectedClose: "2024-03-15",
        assignedTo: "Sarah Johnson",
    },
    {
        id: "TXN-005",
        tenant: "Retail Solutions",
        building: "75 State Street",
        type: "Termination",
        status: "Completed",
        value: "$0",
        startDate: "2023-12-01",
        expectedClose: "2024-01-31",
        assignedTo: "Michael Chen",
    },
]

// Define columns for the transactions table
const transactionsColumns = [
    {
        accessorKey: "id",
        header: "Transaction ID",
        cell: ({ row }: { row: any }) => (
            <span className="font-medium text-gray-900 dark:text-gray-50">{row.getValue("id")}</span>
        ),
    },
    {
        accessorKey: "tenant",
        header: "Tenant",
    },
    {
        accessorKey: "building",
        header: "Building",
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }: { row: any }) => {
            const type = row.getValue("type") as string
            const colorClass = type === "New Lease" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : type === "Renewal" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                : type === "Expansion" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
            return (
                <span className={cn("px-2 py-1 rounded-full text-xs font-medium", colorClass)}>
                    {type}
                </span>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("status") as string
            const colorClass = status === "Completed" ? "text-green-600 dark:text-green-400"
                : status === "In Progress" ? "text-blue-600 dark:text-blue-400"
                : status === "Negotiation" ? "text-yellow-600 dark:text-yellow-400"
                : "text-gray-600 dark:text-gray-400"
            return <span className={cn("font-medium", colorClass)}>{status}</span>
        },
    },
    {
        accessorKey: "value",
        header: "Value",
        cell: ({ row }: { row: any }) => (
            <span className="font-medium text-gray-900 dark:text-gray-50">{row.getValue("value")}</span>
        ),
    },
    {
        accessorKey: "expectedClose",
        header: "Expected Close",
    },
    {
        accessorKey: "assignedTo",
        header: "Assigned To",
    },
]

interface Transaction {
    id: string;
    [key: string]: any;
}

export default function TransactionManagementPage() {
    const router = useRouter()
    const [data] = useState(transactionsData)
    const insights = getPageInsights("leasing")

    return (
        <div className="flex h-full w-full flex-col space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">Transaction Management</h1>
                <Button onClick={() => router.push("/leasing/transaction-management/new")}>
                    New Transaction
                </Button>
            </div>

            <AIInsights insights={insights} />

            <div className="flex flex-col gap-4 w-full">
                <DataTable
                    columns={transactionsColumns}
                    data={data}
                    onRowClick={(row: Transaction) => router.push(`/leasing/transaction-management/${row.id}`)}
                />
            </div>
        </div>
    )
}
