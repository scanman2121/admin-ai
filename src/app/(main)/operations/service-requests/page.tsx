"use client"

import { Badge } from "@/components/Badge"
import { ServiceRequestsDataTable } from "@/components/ui/data-table/ServiceRequestsDataTable"
import { UserDetailsModal } from "@/components/ui/user-access/UserDetailsModal"
import { serviceRequests, serviceRequestStatuses } from "@/data/data"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Factory function to create columns with click handlers
const createServiceRequestsColumns = (onRequestorClick: (requestorDetails: any) => void) => [
    {
        accessorKey: "request",
        header: "Request",
        cell: ({ row }: { row: any }) => {
            const request = row.getValue("request") as string;
            const requestorDetails = row.original.requestorDetails;
            const name = requestorDetails?.name || "";
            const company = requestorDetails?.company || "";

            return (
                <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-50 mb-1">
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
                        <span className="text-gray-500 mx-1">·</span>
                        <span className="text-gray-600 dark:text-gray-400">{company}</span>
                    </div>
                </div>
            );
        },
        meta: {
            displayName: "Request",
            className: "w-80 min-w-80",
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
    },
    // Hidden columns for filtering
    {
        accessorKey: "company",
        header: "Company",
        cell: ({ row: _row }: { row: any }) => {
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

    const serviceRequestsColumns = createServiceRequestsColumns(handleRequestorClick)

    return (
        <div>
            <ServiceRequestsDataTable 
                columns={serviceRequestsColumns} 
                data={data} 
                onRowClick={handleRowClick} 
                searchKey="request" 
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