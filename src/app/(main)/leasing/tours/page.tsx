"use client"

import { Button } from "@/components/Button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { AIInsights } from "@/components/ui/insights/AIInsights"
import { getPageInsights } from "@/lib/insights"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Mock data for tours
const toursData = [
    {
        id: "TUR-001",
        prospect: "Innovate Labs",
        contact: "Jennifer Wu",
        building: "125 Highland Ave",
        suite: "Suite 500",
        sqft: 15000,
        date: "2024-02-05",
        time: "10:00 AM",
        status: "Scheduled",
        leadSource: "Broker Referral",
    },
    {
        id: "TUR-002",
        prospect: "DataSync Corp",
        contact: "Robert Miller",
        building: "400 Market Street",
        suite: "Suite 800",
        sqft: 8000,
        date: "2024-02-03",
        time: "2:00 PM",
        status: "Completed",
        leadSource: "Website",
    },
    {
        id: "TUR-003",
        prospect: "CloudFirst Inc",
        contact: "Amanda Torres",
        building: "200 Congress Ave",
        suite: "Floor 5",
        sqft: 22000,
        date: "2024-02-07",
        time: "11:30 AM",
        status: "Scheduled",
        leadSource: "Cold Outreach",
    },
    {
        id: "TUR-004",
        prospect: "FinTech Solutions",
        contact: "David Park",
        building: "500 Boylston Street",
        suite: "Suite 1500",
        sqft: 10000,
        date: "2024-02-01",
        time: "9:00 AM",
        status: "Completed",
        leadSource: "Existing Tenant Referral",
    },
    {
        id: "TUR-005",
        prospect: "GreenEnergy Co",
        contact: "Lisa Chen",
        building: "75 State Street",
        suite: "Suite 300",
        sqft: 6500,
        date: "2024-02-10",
        time: "3:30 PM",
        status: "Pending Confirmation",
        leadSource: "Trade Show",
    },
    {
        id: "TUR-006",
        prospect: "MediaHub",
        contact: "Chris Anderson",
        building: "125 Highland Ave",
        suite: "Suite 200",
        sqft: 5000,
        date: "2024-02-02",
        time: "1:00 PM",
        status: "Cancelled",
        leadSource: "LinkedIn",
    },
]

// Define columns for the tours table
const toursColumns = [
    {
        accessorKey: "id",
        header: "Tour ID",
        cell: ({ row }: { row: any }) => (
            <span className="font-medium text-gray-900 dark:text-gray-50">{row.getValue("id")}</span>
        ),
    },
    {
        accessorKey: "prospect",
        header: "Prospect",
        cell: ({ row }: { row: any }) => (
            <div>
                <div className="font-medium text-gray-900 dark:text-gray-50">{row.getValue("prospect")}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{row.original.contact}</div>
            </div>
        ),
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
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "time",
        header: "Time",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("status") as string
            const colorClass = status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : status === "Scheduled" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                : status === "Pending Confirmation" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
            return (
                <span className={cn("px-2 py-1 rounded-full text-xs font-medium", colorClass)}>
                    {status}
                </span>
            )
        },
    },
    {
        accessorKey: "leadSource",
        header: "Lead Source",
    },
]

interface Tour {
    id: string;
    [key: string]: any;
}

export default function ToursPage() {
    const router = useRouter()
    const [data] = useState(toursData)
    const insights = getPageInsights("leasing")

    return (
        <div className="flex h-full w-full flex-col space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">Tours</h1>
                <Button onClick={() => router.push("/leasing/tours/new")}>
                    Schedule Tour
                </Button>
            </div>

            <AIInsights insights={insights} />

            <div className="flex flex-col gap-4 w-full">
                <DataTable
                    columns={toursColumns}
                    data={data}
                    onRowClick={(row: Tour) => router.push(`/leasing/tours/${row.id}`)}
                />
            </div>
        </div>
    )
}
