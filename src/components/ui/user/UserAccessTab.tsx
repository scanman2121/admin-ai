"use client"

import { Button } from "@/components/Button"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table/DataTable"

// Mock data for access information
const accessData = [
    {
        id: "1",
        userId: "376828",
        credential: "Awaiting user",
        device: "-",
        credStatus: "Awaiting user"
    },
    {
        id: "2",
        userId: "419902",
        credential: "324",
        device: "iOS - iPhone14.3",
        credStatus: "Issued"
    },
    {
        id: "3", 
        userId: "419903",
        credential: "525",
        device: "Android - Samsung Galaxy",
        credStatus: "Issued"
    }
]

// Mock data for activity log (moved from UserActivityTab)
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

// Define columns for activity table (moved from UserActivityTab)
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

// Define columns for access table
const accessColumns = [
    {
        accessorKey: "userId",
        header: "User ID",
        cell: ({ row }: { row: any }) => {
            const userId = row.getValue("userId") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50 font-medium">
                    {userId}
                </span>
            );
        },
    },
    {
        accessorKey: "credential",
        header: "Credential",
        cell: ({ row }: { row: any }) => {
            const credential = row.getValue("credential") as string;
            return (
                <span className="text-gray-600 dark:text-gray-400">
                    {credential}
                </span>
            );
        },
    },
    {
        accessorKey: "device",
        header: "Device",
        cell: ({ row }: { row: any }) => {
            const device = row.getValue("device") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50">
                    {device}
                </span>
            );
        },
    },
    {
        accessorKey: "credStatus",
        header: "Cred status",
        cell: ({ row }: { row: any }) => {
            const credStatus = row.getValue("credStatus") as string;
            const getCredStatusBadge = (status: string) => {
                switch (status) {
                    case "Issued":
                        return (
                            <Badge 
                                variant="default" 
                                className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30"
                            >
                                {status}
                            </Badge>
                        );
                    case "Awaiting user":
                        return (
                            <Badge 
                                variant="default" 
                                className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800/30"
                            >
                                {status}
                            </Badge>
                        );
                    default:
                        return <Badge variant="secondary">{status}</Badge>;
                }
            };
            return getCredStatusBadge(credStatus);
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: any }) => {
            const credStatus = row.original.credStatus as string;
            
            if (credStatus === "Awaiting user") {
                return (
                    <Button 
                        variant="secondary" 
                        size="sm"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                    >
                        View user in Origo
                    </Button>
                );
            }
            
            return (
                <Button 
                    variant="primary" 
                    size="sm"
                >
                    Activate access
                </Button>
            );
        },
        enableSorting: false,
    },
]

interface UserAccessTabProps {
    userId?: string // Future: will be used to filter access data by user
    containerClassName?: string
}

export function UserAccessTab({ containerClassName }: UserAccessTabProps) {
    return (
        <div className={containerClassName || "space-y-8"}>
            {/* Access Credentials Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">Access credentials</h3>
                    <DataTable
                        columns={accessColumns}
                        data={accessData}
                        searchKey="userId"
                    />
                </div>
            </div>

            {/* Access Activity Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">Access activity</h3>
                    <DataTable
                        columns={activityColumns}
                        data={activityData}
                        searchKey="action"
                    />
                </div>
            </div>
        </div>
    )
}
