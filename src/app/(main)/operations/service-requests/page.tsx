"use client"

import { Badge } from "@/components/Badge"
import { Checkbox } from "@/components/Checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader"
import { ServiceRequestsDataTable } from "@/components/ui/data-table/ServiceRequestsDataTable"
import { ServiceRequestsBulkActions } from "@/components/ui/service-requests/ServiceRequestsBulkActions"
import { UserDetailsModal } from "@/components/ui/user-access/UserDetailsModal"
import { serviceRequests, serviceRequestStatuses } from "@/data/data"
import { getRelativeTime } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Factory function to create columns with click handlers
const createServiceRequestsColumns = (onRequestorClick: (requestorDetails: any) => void) => [
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
            const requestorDetails = row.original.requestorDetails;
            const name = requestorDetails?.name || "";

            return (
                <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-50 mb-1 line-clamp-2">
                        {request}
                    </div>
                    <div className="text-sm">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onRequestorClick(requestorDetails);
                            }}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer underline hover:no-underline"
                        >
                            {name}
                        </button>
                    </div>
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
            const owner = row.original.owner as string;
            return (
                <div className="flex flex-col">
                    <span className="text-gray-600 dark:text-gray-400">{assignee}</span>
                    {owner && (
                        <span className="text-sm text-gray-500 dark:text-gray-500 mt-0.5">Owner: {owner}</span>
                    )}
                </div>
            );
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
]

export default function ServiceRequests() {
    const [data] = useState(serviceRequests)
    const [selectedUser, setSelectedUser] = useState<{
        id: string
        name: string
        email: string
        company: string
        floorSuite: string
        serviceRequest: string
        serviceRequestType: string | null
        serviceRequestStatus: string | null
        acsStatus: string
        hasNotes: boolean
        badgeId?: string
    } | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()

    const handleRowClick = (serviceRequest: any) => {
        // Generate service request ID for navigation
        router.push(`/operations/service-requests/${serviceRequest.id}`)
    }

    const handleRequestorClick = (requestorDetails: any) => {
        setSelectedUser(requestorDetails)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedUser(null)
    }

    const handleExport = () => {
        // Prepare CSV data
        const csvHeaders = [
            "ID",
            "Request",
            "Requestor",
            "Date & Time",
            "Building",
            "Floor",
            "Assignee",
            "Owner",
            "Last Updated",
            "Status",
            "Issue Type"
        ].join(",")

        const csvRows = data.map(row => {
            const requestorName = row.requestorDetails?.name || ""
            
            return [
                row.id,
                `"${row.request}"`,
                `"${requestorName}"`,
                row.dateTime,
                row.building,
                row.floor,
                row.assignee,
                row.owner || "-",
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

    const handleChangeStatus = (selectedRequests: any[], status: string) => {
        console.log('Changing status to:', status, 'for requests:', selectedRequests)
        // TODO: Implement status change logic
    }

    const handleAssignTo = (selectedRequests: any[], assignee: string) => {
        console.log('Assigning to:', assignee, 'for requests:', selectedRequests)
        // TODO: Implement assign logic
    }

    const serviceRequestsColumns = createServiceRequestsColumns(handleRequestorClick)

    return (
        <div>
            <ServiceRequestsDataTable 
                columns={serviceRequestsColumns} 
                data={data} 
                onRowClick={handleRowClick} 
                searchKey="request"
                onExport={handleExport}
                renderBulkActions={(table, rowSelection) => (
                    <ServiceRequestsBulkActions
                        table={table}
                        rowSelection={rowSelection}
                        totalCount={data.length}
                        onChangeStatus={handleChangeStatus}
                        onAssignTo={handleAssignTo}
                    />
                )}
            />
            
            {/* User Details Modal */}
            <UserDetailsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                user={selectedUser}
                defaultTab="requests"
            />
        </div>
    )
}