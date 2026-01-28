"use client"

import { Button } from "@/components/Button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { getPageInsights } from "@/lib/insights"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Mock data for leases
const leasesData = [
    {
        id: "LSE-001",
        tenant: "Acme Corporation",
        building: "125 Highland Ave",
        suite: "Suite 400",
        sqft: 12500,
        monthlyRent: "$31,250",
        startDate: "2022-01-15",
        endDate: "2025-01-14",
        status: "Active",
        renewalProbability: 85,
    },
    {
        id: "LSE-002",
        tenant: "Global Enterprises",
        building: "400 Market Street",
        suite: "Suite 200",
        sqft: 8500,
        monthlyRent: "$21,250",
        startDate: "2021-06-01",
        endDate: "2024-05-31",
        status: "Expiring Soon",
        renewalProbability: 72,
    },
    {
        id: "LSE-003",
        tenant: "Tech Innovators",
        building: "200 Congress Ave",
        suite: "Floor 3",
        sqft: 25000,
        monthlyRent: "$62,500",
        startDate: "2023-03-01",
        endDate: "2028-02-28",
        status: "Active",
        renewalProbability: 90,
    },
    {
        id: "LSE-004",
        tenant: "Financial Services Inc",
        building: "500 Boylston Street",
        suite: "Suite 1200",
        sqft: 6000,
        monthlyRent: "$18,000",
        startDate: "2022-09-01",
        endDate: "2025-08-31",
        status: "Active",
        renewalProbability: 65,
    },
    {
        id: "LSE-005",
        tenant: "Retail Solutions",
        building: "75 State Street",
        suite: "Suite 100",
        sqft: 4500,
        monthlyRent: "$11,250",
        startDate: "2020-03-15",
        endDate: "2024-03-14",
        status: "Expired",
        renewalProbability: 0,
    },
]

// Define columns for the leases table
const leasesColumns = [
    {
        accessorKey: "id",
        header: "Lease ID",
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
        accessorKey: "suite",
        header: "Suite",
    },
    {
        accessorKey: "sqft",
        header: "Sq Ft",
        cell: ({ row }: { row: any }) => (
            <span>{(row.getValue("sqft") as number).toLocaleString()}</span>
        ),
    },
    {
        accessorKey: "monthlyRent",
        header: "Monthly Rent",
        cell: ({ row }: { row: any }) => (
            <span className="font-medium text-gray-900 dark:text-gray-50">{row.getValue("monthlyRent")}</span>
        ),
    },
    {
        accessorKey: "endDate",
        header: "End Date",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("status") as string
            const colorClass = status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : status === "Expiring Soon" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
            return (
                <span className={cn("px-2 py-1 rounded-full text-xs font-medium", colorClass)}>
                    {status}
                </span>
            )
        },
    },
    {
        accessorKey: "renewalProbability",
        header: "Renewal %",
        cell: ({ row }: { row: any }) => {
            const probability = row.getValue("renewalProbability") as number
            const colorClass = probability >= 75 ? "text-green-600 dark:text-green-400"
                : probability >= 50 ? "text-yellow-600 dark:text-yellow-400"
                : "text-red-600 dark:text-red-400"
            return <span className={cn("font-medium", colorClass)}>{probability}%</span>
        },
    },
]

interface Lease {
    id: string;
    [key: string]: any;
}

export default function LeasesPage() {
    const router = useRouter()
    const [data] = useState(leasesData)
    const insights = getPageInsights("leasing")

    return (
        <div className="flex h-full w-full flex-col space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">Leases</h1>
                <Button onClick={() => router.push("/leasing/leases/new")}>
                    Add Lease
                </Button>
            </div>

            <AIInsights insights={insights} />

            <div className="flex flex-col gap-4 w-full">
                <DataTable
                    columns={leasesColumns}
                    data={data}
                    onRowClick={(row: Lease) => router.push(`/leasing/leases/${row.id}`)}
                />
            </div>
        </div>
    )
}
