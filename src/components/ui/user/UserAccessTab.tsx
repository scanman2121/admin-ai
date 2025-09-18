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
    userId?: string
    containerClassName?: string
}

export function UserAccessTab({ userId, containerClassName }: UserAccessTabProps) {
    return (
        <div className={containerClassName || "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full"}>
            <div className="p-6">
                <DataTable
                    columns={accessColumns}
                    data={accessData}
                    searchKey="userId"
                />
            </div>
        </div>
    )
}
