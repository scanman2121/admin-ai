"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader"
import { ServiceRequestsDataTable } from "@/components/ui/data-table/ServiceRequestsDataTable"
import { ServiceRequestsBulkActions } from "@/components/ui/service-requests/ServiceRequestsBulkActions"
import { AssigneeOwnerPopover } from "@/components/ui/service-requests/AssigneeOwnerPopover"
import { StatusPopover } from "@/components/ui/service-requests/StatusPopover"
import { UserDetailsModal } from "@/components/ui/user-access/UserDetailsModal"
import { serviceRequests, serviceRequestStatuses } from "@/data/data"
import { getRelativeTime } from "@/lib/utils"
import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Factory function to create columns with click handlers
const createServiceRequestsColumns = (
    onRequestorClick: (requestorDetails: any) => void,
    onAssigneeOwnerChange: (id: string, assignees: string[], owner: string | null) => void,
    onStatusChange: (id: string, status: string) => void,
    onApprovalChange: (id: string, approval: string) => void,
    router: any
) => [
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
        accessorKey: "messages",
        header: ({ column }: { column: any }) => (
            <DataTableColumnHeader column={column} title="Msg" />
        ),
        cell: ({ row }: { row: any }) => {
            const unreadCount = row.original.unreadMessages as number | undefined || 0;
            const requestId = row.original.id;
            
            const handleMessageClick = (e: React.MouseEvent) => {
                e.stopPropagation();
                // Navigate to service request detail page with messages tab
                router.push(`/operations/service-requests/${requestId}?tab=messages`);
            };
            
            return (
                <div 
                    className="relative inline-flex items-center justify-center cursor-pointer"
                    onClick={handleMessageClick}
                >
                    <MessageCircle className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-pink-500 rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </div>
            );
        },
        meta: {
            displayName: "Msg",
        },
        enableSorting: false,
    },
    {
        accessorKey: "description",
        header: ({ column }: { column: any }) => (
            <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }: { row: any }) => {
            const description = row.getValue("description") as string;
            return (
                <div className="max-w-md">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {description || "-"}
                    </p>
                </div>
            );
        },
        meta: {
            displayName: "Description",
        },
        enableSorting: false,
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
            const requestId = row.original.id;
            
            // Convert single assignee to array format for the popover
            const assignees = assignee ? [assignee] : [];
            const currentOwner = owner || null;
            
            const handleAssigneesChange = (newAssignees: string[]) => {
                // If owner is being removed, clear owner
                const newOwner = currentOwner && newAssignees.includes(currentOwner) 
                    ? currentOwner 
                    : null;
                onAssigneeOwnerChange(requestId, newAssignees, newOwner)
            }
            
            const handleOwnerChange = (newOwner: string | null) => {
                // Get current assignees from the row data
                const currentAssignee = row.getValue("assignee") as string;
                const currentAssignees = currentAssignee ? [currentAssignee] : [];
                onAssigneeOwnerChange(requestId, currentAssignees, newOwner)
            }
            
            return (
                <AssigneeOwnerPopover
                    assignees={assignees}
                    owner={owner || null}
                    onAssigneesChange={handleAssigneesChange}
                    onOwnerChange={handleOwnerChange}
                >
                    <div 
                        className="flex flex-col cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded px-2 py-1 -mx-2 -my-1"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {assignees.length > 0 ? (
                            <>
                                {assignees.map((a, idx) => (
                                    <span key={idx} className="text-gray-600 dark:text-gray-400">
                                        {a}
                                    </span>
                                ))}
                                {owner && (
                                    <span className="text-sm text-gray-500 dark:text-gray-500 mt-0.5">
                                        Owner: {owner}
                                    </span>
                                )}
                            </>
                        ) : (
                            <span className="text-gray-400 dark:text-gray-500 italic">No lead</span>
                        )}
                    </div>
                </AssigneeOwnerPopover>
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
        accessorKey: "approval",
        header: ({ column }: { column: any }) => (
            <DataTableColumnHeader column={column} title="Approval" />
        ),
        cell: ({ row }: { row: any }) => {
            const requestId = row.original.id;
            const approval = row.original.approval as string | undefined;
            const approver = row.original.approver as string | undefined;
            const approvalDate = row.original.approvalDate as string | undefined;
            
            // For demo purposes, assume current user is not the approver if approver is set
            // In production, you would check against the actual current user
            const isCurrentUserApprover = !approver; // If no approver set, show buttons
            
            const handleApprove = (e: React.MouseEvent) => {
                e.stopPropagation();
                onApprovalChange(requestId, "Approved");
            };
            
            const handleDeny = (e: React.MouseEvent) => {
                e.stopPropagation();
                onApprovalChange(requestId, "Denied");
            };
            
            // Format date for display: MM/DD/YYYY, H:MM AM/PM
            const formatApprovalDate = (dateString: string | undefined) => {
                if (!dateString) return "";
                const date = new Date(dateString);
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const day = date.getDate().toString().padStart(2, "0");
                const year = date.getFullYear();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const ampm = hours >= 12 ? "PM" : "AM";
                const displayHours = hours % 12 || 12;
                const displayMinutes = minutes.toString().padStart(2, "0");
                return `${month}/${day}/${year}, ${displayHours}:${displayMinutes} ${ampm}`;
            };
            
            if (approval === "Approved") {
                const approverName = approver || "Unknown";
                const dateTime = formatApprovalDate(approvalDate);
                return (
                    <div 
                        className="text-sm text-gray-900 dark:text-gray-50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Approved by {approverName} {dateTime}
                    </div>
                );
            }
            
            if (approval === "Denied") {
                const approverName = approver || "Unknown";
                const dateTime = formatApprovalDate(approvalDate);
                return (
                    <div 
                        className="text-sm text-orange-600 dark:text-orange-400"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Denied by {approverName} {dateTime}
                    </div>
                );
            }
            
            // If there's an approver and current user is not the approver, show "Waiting for [Name]"
            if (approver && !isCurrentUserApprover) {
                return (
                    <div 
                        className="text-sm text-gray-600 dark:text-gray-400"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Waiting for {approver}
                    </div>
                );
            }
            
            // Show Approve/Deny buttons if approval is pending and user is the approver (or no approver set)
            return (
                <div 
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Button
                        variant="default"
                        size="sm"
                        onClick={handleApprove}
                        className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-3"
                    >
                        Approve
                    </Button>
                    <Button
                        variant="default"
                        size="sm"
                        onClick={handleDeny}
                        className="bg-pink-600 hover:bg-pink-700 text-white h-8 px-3"
                    >
                        Deny
                    </Button>
                </div>
            );
        },
        meta: {
            displayName: "Approval",
        },
        enableSorting: false,
    },
    {
        accessorKey: "status",
        header: ({ column }: { column: any }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("status") as string;
            const requestId = row.original.id;
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

            const handleStatusChange = (newStatus: string) => {
                onStatusChange(requestId, newStatus)
            }

            return (
                <StatusPopover
                    currentStatus={status}
                    onStatusChange={handleStatusChange}
                >
                    <div 
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded px-2 py-1 -mx-2 -my-1 inline-block"
                        onClick={(e) => e.stopPropagation()}
                    >
                <Badge variant={badgeVariant}>
                    • {status}
                </Badge>
                    </div>
                </StatusPopover>
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
    const [data, setData] = useState(serviceRequests)
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

    const handleAssigneeOwnerChange = (requestId: string, assignees: string[], owner: string | null) => {
        setData(prevData => 
            prevData.map(request => {
                if (request.id === requestId) {
                    // For now, store the first assignee (data structure supports single assignee)
                    // In the future, this could be updated to support multiple assignees
                    return {
                        ...request,
                        assignee: assignees.length > 0 ? assignees[0] : "",
                        owner: owner || ""
                    }
                }
                return request
            })
        )
    }

    const handleStatusChange = (requestId: string, newStatus: string) => {
        setData(prevData => 
            prevData.map(request => {
                if (request.id === requestId) {
                    return {
                        ...request,
                        status: newStatus
                    }
                }
                return request
            })
        )
    }

    const handleApprovalChange = (requestId: string, approval: string) => {
        setData(prevData => 
            prevData.map(request => {
                if (request.id === requestId) {
                    // Set approver to current user (for demo, using a default name)
                    // In production, get from auth context
                    const currentUser = "Abby Canova";
                    return {
                        ...request,
                        approval: approval,
                        approver: currentUser,
                        approvalDate: new Date().toISOString()
                    }
                }
                return request
            })
        )
    }

    const serviceRequestsColumns = createServiceRequestsColumns(handleRequestorClick, handleAssigneeOwnerChange, handleStatusChange, handleApprovalChange, router)

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