"use client"

import { Badge } from "@/components/Badge"
import { WorkOrdersDataTable } from "@/components/ui/data-table/WorkOrdersDataTable"
import { UserDetailsModal } from "@/components/ui/user-access/UserDetailsModal"
import { workOrders, workOrderStatuses } from "@/data/data"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Factory function to create columns with click handlers
const createWorkOrdersColumns = (onRequestorClick: (requestorDetails: any) => void) => [
    {
        accessorKey: "request",
        header: "Request",
        cell: ({ row }: { row: any }) => {
            const request = row.getValue("request") as string;
            const requestor = row.original.requestor as string;
            const requestorDetails = row.original.requestorDetails;

            return (
                <div>
                    <div className="font-medium text-gray-900 dark:text-gray-50">
                        {request}
                    </div>
                    <button
                        onClick={() => onRequestorClick(requestorDetails)}
                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer underline"
                    >
                        {requestor}
                    </button>
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

export default function WorkOrders() {
    const [data] = useState(workOrders)
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

    const handleRowClick = (workOrder: any) => {
        // Generate work order ID for navigation
        router.push(`/operations/work-orders/${workOrder.id}`)
    }

    const handleRequestorClick = (requestorDetails: any) => {
        setSelectedUser(requestorDetails)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedUser(null)
    }

    const workOrdersColumns = createWorkOrdersColumns(handleRequestorClick)

    return (
        <div>
            <WorkOrdersDataTable 
                columns={workOrdersColumns} 
                data={data} 
                onRowClick={handleRowClick} 
                searchKey="request" 
            />
            
            {/* User Details Modal */}
            <UserDetailsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                user={selectedUser}
                defaultTab="request"
            />
        </div>
    )
}