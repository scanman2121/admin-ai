"use client"

import { Badge } from "@/components/Badge"
import { WorkOrdersDataTable } from "@/components/ui/data-table/WorkOrdersDataTable"
import { workOrders, workOrderStatuses } from "@/data/data"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Define columns for the work orders table
const workOrdersColumns = [
    {
        accessorKey: "request",
        header: "Request",
        cell: ({ row }: { row: any }) => {
            const request = row.getValue("request") as string;
            const requestor = row.original.requestor as string;

            return (
                <div>
                    <div className="font-medium text-gray-900 dark:text-gray-50">
                        {request}
                    </div>
                    <div className="text-sm text-gray-500">
                        {requestor}
                    </div>
                </div>
            );
        },
        meta: {
            displayName: "Request",
        },
    },
    {
        accessorKey: "dateTime",
        header: "Date & Time",
        cell: ({ row }: { row: any }) => {
            const dateTime = row.getValue("dateTime") as string;
            return <span className="text-gray-600 dark:text-gray-400">{dateTime}</span>;
        },
        meta: {
            displayName: "Date & Time",
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }: { row: any }) => {
            const description = row.getValue("description") as string;
            return (
                <span className="text-gray-600 dark:text-gray-400">
                    {description || "-"}
                </span>
            );
        },
        meta: {
            displayName: "Description",
        },
    },
    {
        accessorKey: "building",
        header: "Building",
        cell: ({ row }: { row: any }) => {
            const building = row.getValue("building") as string;
            const floor = row.original.floor as string;
            return (
                <div>
                    <div className="font-medium text-gray-900 dark:text-gray-50">
                        {building}
                    </div>
                    <div className="text-sm text-gray-500">
                        {floor}
                    </div>
                </div>
            );
        },
        meta: {
            displayName: "Building",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "assignee",
        header: "Assignee",
        cell: ({ row }: { row: any }) => {
            const assignee = row.getValue("assignee") as string;
            return <span className="text-gray-600 dark:text-gray-400">{assignee}</span>;
        },
        meta: {
            displayName: "Assignee",
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("status") as string;
            const statusConfig = workOrderStatuses.find(s => s.value === status);
            
            let badgeVariant: "default" | "success" | "warning" | "error" = "default";
            if (statusConfig?.variant === "success") badgeVariant = "success";
            else if (statusConfig?.variant === "warning") badgeVariant = "warning";
            else if (statusConfig?.variant === "error") badgeVariant = "error";
            else if (statusConfig?.variant === "blue") badgeVariant = "default";

            return (
                <Badge variant={badgeVariant}>
                    • {status}
                </Badge>
            );
        },
        meta: {
            displayName: "Status",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
    // Hidden columns for filtering
    {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }: { row: any }) => {
            return null; // Hidden column
        },
        meta: {
            displayName: "Company",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "issueType",
        header: "Issue Type",
        cell: ({ row }: { row: any }) => {
            return null; // Hidden column
        },
        meta: {
            displayName: "Issue Type",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
]

export default function WorkOrders() {
    const [data] = useState(workOrders)
    const router = useRouter()

    const handleRowClick = (workOrder: any) => {
        // Generate work order ID for navigation
        router.push(`/operations/work-orders/${workOrder.id}`)
    }

    return <WorkOrdersDataTable columns={workOrdersColumns} data={data} onRowClick={handleRowClick} searchKey="request" />
}