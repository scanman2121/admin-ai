"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader"
import { ServiceRequestsDataTable } from "@/components/ui/data-table/ServiceRequestsDataTable"
import { serviceRequests, serviceRequestStatuses } from "@/data/data"
import { getRelativeTime } from "@/lib/utils"
import { RiAddLine } from "@remixicon/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Factory function to create columns
const createServiceRequestsColumns = () => [
    {
        id: "select",
        header: ({ table }: { table: any }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }: { row: any }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
                onClick={(e) => e.stopPropagation()}
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "request",
        header: ({ column }: { column: any }) => (
            <DataTableColumnHeader column={column} title="Request" />
        ),
        cell: ({ row }: { row: any }) => {
            const request = row.getValue("request") as string;
            return (
                <div className="font-medium text-gray-900 dark:text-gray-50 line-clamp-2">
                    {request}
                </div>
            );
        },
        meta: {
            displayName: "Request",
            className: "w-72 min-w-72",
        },
        enableSorting: true,
    },
    {
        accessorKey: "dateTime",
        header: ({ column }: { column: any }) => (
            <DataTableColumnHeader column={column} title="Date & Time" />
        ),
        cell: ({ row }: { row: any }) => {
            const dateTime = row.getValue("dateTime") as string;
            return <span className="text-gray-600 dark:text-gray-400">{dateTime}</span>;
        },
        meta: {
            displayName: "Date & Time",
        },
        enableSorting: true,
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }: { row: any }) => {
            const description = row.getValue("description") as string;
            return (
                <div className="max-w-48 text-gray-600 dark:text-gray-400">
                    <span className="line-clamp-2">
                        {description || "-"}
                    </span>
                </div>
            );
        },
        meta: {
            displayName: "Description",
            className: "w-48 max-w-48",
        },
    },
    {
        accessorKey: "building",
        header: ({ column }: { column: any }) => (
            <DataTableColumnHeader column={column} title="Building" />
        ),
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
        enableSorting: true,
    },
    {
        accessorKey: "assignee",
        header: ({ column }: { column: any }) => (
            <DataTableColumnHeader column={column} title="Assignee" />
        ),
        cell: ({ row }: { row: any }) => {
            const assignee = row.getValue("assignee") as string;
            return <span className="text-gray-600 dark:text-gray-400">{assignee}</span>;
        },
        meta: {
            displayName: "Assignee",
        },
        enableSorting: true,
    },
    {
        accessorKey: "lastUpdated",
        header: ({ column }: { column: any }) => (
            <DataTableColumnHeader column={column} title="Last updated" />
        ),
        cell: ({ row }: { row: any }) => {
            const lastUpdated = row.getValue("lastUpdated") as string;
            return <span className="text-gray-600 dark:text-gray-400">{getRelativeTime(lastUpdated)}</span>;
        },
        meta: {
            displayName: "Last updated",
        },
        enableSorting: true,
        sortingFn: (rowA: any, rowB: any) => {
            const dateA = new Date(rowA.getValue("lastUpdated")).getTime();
            const dateB = new Date(rowB.getValue("lastUpdated")).getTime();
            return dateA - dateB;
        },
    },
    {
        accessorKey: "status",
        header: ({ column }: { column: any }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("status") as string;
            const statusConfig = serviceRequestStatuses.find(s => s.value === status);
            
            let badgeVariant: "default" | "success" | "warning" | "error" = "default";
            if (statusConfig?.variant === "success") badgeVariant = "success";
            else if (statusConfig?.variant === "warning") badgeVariant = "warning";
            else if (statusConfig?.variant === "error") badgeVariant = "error";
            else if (statusConfig?.variant === "blue") badgeVariant = "default";
            
            // Map status names to appropriate badge variants
            if (status === "Completed") badgeVariant = "success";
            else if (status === "In Progress") badgeVariant = "warning";
            else if (status === "Denied" || status === "Failed" || status === "Cancelled") badgeVariant = "error";
            else if (status === "New" || status === "Assigned to Building") badgeVariant = "default";

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
        enableSorting: true,
    },
    // Hidden columns for filtering
    {
        accessorKey: "issueType",
        header: "Issue Type",
        cell: ({ row: _row }: { row: any }) => {
            return null; // Hidden column
        },
        meta: {
            displayName: "Issue Type",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
]

export default function TenantServiceRequestsPage() {
    // Filter service requests to only show those from Acme Inc (tenant's company)
    const tenantCompany = "Acme Inc"
    const [data] = useState(
        serviceRequests.filter(
            (request) => request.company === tenantCompany
        )
    )
    const router = useRouter()

    const handleRowClick = (serviceRequest: any) => {
        // For now, just log the click since we don't have detail pages set up for tenant
        console.log('Service request clicked:', serviceRequest)
        // router.push(`/tenant/service-requests/${serviceRequest.id}`)
    }

    const handleExport = () => {
        // Prepare CSV data
        const csvHeaders = [
            "ID",
            "Request",
            "Date & Time",
            "Description",
            "Building",
            "Floor",
            "Assignee",
            "Last Updated",
            "Status",
            "Issue Type"
        ].join(",")

        const csvRows = data.map(row => {
            const description = (row.description || "").replace(/"/g, '""') // Escape quotes
            
            return [
                row.id,
                `"${row.request}"`,
                row.dateTime,
                `"${description}"`,
                row.building,
                row.floor,
                row.assignee,
                row.lastUpdated,
                row.status,
                row.issueType
            ].join(",")
        }).join("\n")

        const csvContent = `${csvHeaders}\n${csvRows}`

        // Create blob and download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const link = document.createElement("a")
        const url = URL.createObjectURL(blob)
        
        link.setAttribute("href", url)
        link.setAttribute("download", `service-requests-${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = "hidden"
        
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const serviceRequestsColumns = createServiceRequestsColumns()

    return (
        <div className="flex h-full w-full flex-col space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                    Service Requests
                </h1>
                <Button>
                    <RiAddLine className="size-4 shrink-0 mr-1.5" aria-hidden="true" />
                    Add service request
                </Button>
            </div>

            {/* Data Table */}
            <div>
                <ServiceRequestsDataTable 
                    columns={serviceRequestsColumns} 
                    data={data} 
                    onRowClick={handleRowClick} 
                    searchKey="request"
                    onExport={handleExport}
                />
            </div>
        </div>
    )
}

