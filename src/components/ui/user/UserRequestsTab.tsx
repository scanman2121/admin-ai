"use client"

import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table/DataTable"

// Mock data for service requests
const serviceRequestsData = [
    {
        id: "1",
        requestId: "REQ-2024-001",
        dateSubmitted: "Dec 8, 2024 9:30 AM",
        requestType: "New Employee Access",
        description: "Badge access for new hire Sarah Chen",
        status: "In Progress",
        assignee: "IT Security Team",
        priority: "High"
    },
    {
        id: "2",
        requestId: "REQ-2024-002", 
        dateSubmitted: "Nov 25, 2024 2:15 PM",
        requestType: "Access Modification",
        description: "Update access permissions for conference rooms",
        status: "Completed",
        assignee: "Facilities Team",
        priority: "Medium"
    },
    {
        id: "3",
        requestId: "REQ-2024-003",
        dateSubmitted: "Nov 20, 2024 11:45 AM",
        requestType: "Badge Replacement",
        description: "Replace lost access badge",
        status: "Completed",
        assignee: "Security Office",
        priority: "Low"
    },
    {
        id: "4",
        requestId: "REQ-2024-004",
        dateSubmitted: "Nov 15, 2024 4:20 PM",
        requestType: "Temporary Access",
        description: "Weekend access for project deadline",
        status: "Completed",
        assignee: "Building Manager",
        priority: "Medium"
    }
]

// Define columns for service requests table
const serviceRequestColumns = [
    {
        accessorKey: "requestId",
        header: "Request ID",
        cell: ({ row }: { row: any }) => {
            const requestId = row.getValue("requestId") as string;
            return (
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {requestId}
                </span>
            );
        },
    },
    {
        accessorKey: "dateSubmitted",
        header: "Date Submitted",
        cell: ({ row }: { row: any }) => {
            const dateSubmitted = row.getValue("dateSubmitted") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50">
                    {dateSubmitted}
                </span>
            );
        },
    },
    {
        accessorKey: "requestType",
        header: "Request Type",
        cell: ({ row }: { row: any }) => {
            const requestType = row.getValue("requestType") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50 font-medium">
                    {requestType}
                </span>
            );
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }: { row: any }) => {
            const description = row.getValue("description") as string;
            return (
                <span className="text-gray-600 dark:text-gray-400">
                    {description}
                </span>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("status") as string;
            const getStatusBadge = (status: string) => {
                switch (status) {
                    case "In Progress":
                        return (
                            <Badge 
                                variant="default" 
                                className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30"
                            >
                                • {status}
                            </Badge>
                        );
                    case "Completed":
                        return (
                            <Badge 
                                variant="default" 
                                className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30"
                            >
                                • {status}
                            </Badge>
                        );
                    case "Pending":
                        return (
                            <Badge 
                                variant="default" 
                                className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800/30"
                            >
                                • {status}
                            </Badge>
                        );
                    default:
                        return <Badge variant="secondary">• {status}</Badge>;
                }
            };
            return getStatusBadge(status);
        },
    },
    {
        accessorKey: "assignee",
        header: "Assignee",
        cell: ({ row }: { row: any }) => {
            const assignee = row.getValue("assignee") as string;
            return (
                <span className="text-gray-600 dark:text-gray-400">
                    {assignee}
                </span>
            );
        },
    },
    {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }: { row: any }) => {
            const priority = row.getValue("priority") as string;
            const getPriorityBadge = (priority: string) => {
                switch (priority) {
                    case "High":
                        return (
                            <Badge 
                                variant="default" 
                                className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30"
                            >
                                {priority}
                            </Badge>
                        );
                    case "Medium":
                        return (
                            <Badge 
                                variant="default" 
                                className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800/30"
                            >
                                {priority}
                            </Badge>
                        );
                    case "Low":
                        return (
                            <Badge 
                                variant="default" 
                                className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800/30"
                            >
                                {priority}
                            </Badge>
                        );
                    default:
                        return <Badge variant="secondary">{priority}</Badge>;
                }
            };
            return getPriorityBadge(priority);
        },
    },
]

interface UserRequestsTabProps {
    userId?: string
    containerClassName?: string
}

export function UserRequestsTab({ userId, containerClassName }: UserRequestsTabProps) {
    return (
        <div className={containerClassName || "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full"}>
            <div className="p-6">
                <DataTable
                    columns={serviceRequestColumns}
                    data={serviceRequestsData}
                    searchKey="requestType"
                />
            </div>
        </div>
    )
}
