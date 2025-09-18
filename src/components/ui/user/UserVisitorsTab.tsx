"use client"

import { DataTable } from "@/components/ui/data-table/DataTable"
import { X } from "lucide-react"

// Mock data for upcoming visits
const upcomingVisitsData = [
    {
        id: "1",
        visitor: "John Smith",
        dateTime: "Dec 15, 2024 2:00 PM",
        purpose: "Client Meeting"
    },
    {
        id: "2", 
        visitor: "Sarah Johnson",
        dateTime: "Dec 16, 2024 10:30 AM",
        purpose: "Project Review"
    }
]

// Define columns for upcoming visits table
const visitsColumns = [
    {
        accessorKey: "visitor",
        header: "Visitor",
        cell: ({ row }: { row: any }) => {
            const visitor = row.getValue("visitor") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50 font-medium">
                    {visitor}
                </span>
            );
        },
    },
    {
        accessorKey: "dateTime",
        header: "Date and Time",
        cell: ({ row }: { row: any }) => {
            const dateTime = row.getValue("dateTime") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50">
                    {dateTime}
                </span>
            );
        },
    },
    {
        accessorKey: "purpose",
        header: "Purpose",
        cell: ({ row }: { row: any }) => {
            const purpose = row.getValue("purpose") as string;
            return (
                <span className="text-gray-600 dark:text-gray-400">
                    {purpose}
                </span>
            );
        },
    },
]

interface UserVisitorsTabProps {
    userId?: string // Future: will be used to filter visitors data by user
    containerClassName?: string
}

export function UserVisitorsTab({ containerClassName }: UserVisitorsTabProps) {
    return (
        <div className={containerClassName || "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full"}>
            <div className="p-6">
                {upcomingVisitsData.length > 0 ? (
                    <DataTable
                        columns={visitsColumns}
                        data={upcomingVisitsData}
                        searchKey="visitor"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                        <X className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                            No visitors
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
                            No visitors were found. Visitors will appear here after they're registered
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
