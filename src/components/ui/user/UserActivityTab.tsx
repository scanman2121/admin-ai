"use client"

import { Button } from "@/components/Button"
import { DataTable } from "@/components/ui/data-table/DataTable"

// Mock data for activity log
const activityData = [
    {
        id: "1",
        dateTime: "Dec 10, 2024 9:15 AM",
        action: "Access granted",
        accessPoint: "Main Entrance",
        details: "Badge scan successful"
    },
    {
        id: "2",
        dateTime: "Dec 10, 2024 9:14 AM",
        action: "Access granted", 
        accessPoint: "Parking Garage",
        details: "Mobile app access"
    },
    {
        id: "3",
        dateTime: "Dec 9, 2024 5:30 PM",
        action: "Access granted",
        accessPoint: "Main Entrance",
        details: "Badge scan successful"
    },
    {
        id: "4",
        dateTime: "Dec 9, 2024 8:45 AM",
        action: "Access granted",
        accessPoint: "Main Entrance", 
        details: "Badge scan successful"
    },
    {
        id: "5",
        dateTime: "Dec 8, 2024 6:15 PM",
        action: "Access denied",
        accessPoint: "Conference Room A",
        details: "Insufficient permissions"
    }
]

// Define columns for activity table
const activityColumns = [
    {
        accessorKey: "dateTime",
        header: "Date and Time",
        cell: ({ row }: { row: any }) => {
            const dateTime = row.getValue("dateTime") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50 font-medium">
                    {dateTime}
                </span>
            );
        },
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }: { row: any }) => {
            const action = row.getValue("action") as string;
            const isGranted = action === "Access granted";
            return (
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isGranted ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-gray-900 dark:text-gray-50">
                        {action}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "accessPoint",
        header: "Access Point",
        cell: ({ row }: { row: any }) => {
            const accessPoint = row.getValue("accessPoint") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50">
                    {accessPoint}
                </span>
            );
        },
    },
    {
        accessorKey: "details",
        header: "Details",
        cell: ({ row }: { row: any }) => {
            const details = row.getValue("details") as string;
            return (
                <span className="text-gray-600 dark:text-gray-400">
                    {details}
                </span>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: any }) => {
            const rowId = row.original.id as string;
            
            // Third row (id: "3") gets "Remove access" button in red
            if (rowId === "3") {
                return (
                    <Button 
                        variant="destructive" 
                        size="sm"
                    >
                        Remove access
                    </Button>
                );
            }
            
            // Other rows get standard action buttons
            return (
                <Button 
                    variant="secondary" 
                    size="sm"
                >
                    View details
                </Button>
            );
        },
        enableSorting: false,
    },
]

interface UserActivityTabProps {
    userId?: string // Future: will be used to filter activity data by user
    containerClassName?: string
}

export function UserActivityTab({ containerClassName }: UserActivityTabProps) {
    return (
        <div className={containerClassName || "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full"}>
            <div className="p-6">
                <DataTable
                    columns={activityColumns}
                    data={activityData}
                    searchKey="action"
                />
            </div>
        </div>
    )
}
