"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { CreateUserAccessModal } from "@/components/ui/user-access/CreateUserAccessModal"
import { UserAccessBulkActions } from "@/components/ui/user-access/UserAccessBulkActions"
import { UserDetailsModal } from "@/components/ui/user-access/UserDetailsModal"
import { centralizedUsers } from "@/data/centralizedUsers"
import { RiSettings3Line } from "@remixicon/react"
import { Building, ChevronDown, FileText, MoreVertical, User, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Access Control Access Requests page
const tabs = [
    { name: "Overview", href: "/operations/access-control" },
    { name: "Access requests", href: "/operations/access-control/access-requests" },
    { name: "Active access", href: "/operations/access-control/active-access" },
    { name: "Activity", href: "/operations/access-control/activity" },
    { name: "Access groups", href: "/operations/access-control/access-groups" },
    { name: "Audit trail", href: "/operations/access-control/audit-trail" },
]

// Generate access control data from centralized users with specific service request details
const generateServiceRequest = (user: any) => {
    switch (user.id) {
        case "jennifer-martinez-new":
            return {
                request: "New Employee MKA Request...",
                type: "New Employee MKA",
                status: "New",
                acsStatus: "pending",
                badgeId: null
            }
        case "kevin-chen-new":
            return {
                request: "Lost Device Replacement...",
                type: "Lost Device", 
                status: "In Progress",
                acsStatus: "active",
                badgeId: "HC-KC-004"
            }
        case "rachel-thompson-new":
            return {
                request: "New Phone Setup Request...",
                type: "New Phone",
                status: "New",
                acsStatus: "pending",
                badgeId: null
            }
        case "marcus-rodriguez-new":
            return {
                request: "Access Level Update Request...",
                type: "Access Level Update",
                status: "In Progress",
                acsStatus: "active",
                badgeId: "FG-MR-007"
            }
        case "amanda-kim-contractor":
            return {
                request: "Tenant Departure Processing...",
                type: "Tenant Departure",
                status: "New",
                acsStatus: null,
                badgeId: null
            }
        case "brian-wilson-suspended":
            return {
                request: "Termination of Employment...",
                type: "Termination of Employment",
                status: "New",
                acsStatus: "active",
                badgeId: "TC-BW-008"
            }
        default:
            if (user.acsStatus === "pending") {
                return {
                    request: "New Employee MKA Request...",
                    type: "New Employee MKA",
                    status: "In Progress",
                    acsStatus: "pending",
                    badgeId: null
                }
            } else if (user.acsStatus === "suspended") {
                return {
                    request: "Lost Device Replacement...",
                    type: "Lost Device", 
                    status: "Under Review",
                    acsStatus: "active",
                    badgeId: user.badgeId
                }
            } else if (user.acsStatus === "inactive") {
                return {
                    request: "Termination of Employment...",
                    type: "Termination of Employment",
                    status: "Pending Review",
                    acsStatus: "active",
                    badgeId: user.badgeId
                }
            }
            return {
                request: "No open requests",
                type: null,
                status: null,
                acsStatus: null,
                badgeId: null
            }
    }
}

// Filter users to only show those with access requests (pending, suspended, or inactive)
const accessRequestsData = centralizedUsers
    .filter(user => user.acsStatus === "pending" || user.acsStatus === "suspended" || user.acsStatus === "inactive")
    .map(user => {
        const serviceDetails = generateServiceRequest(user)
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            company: user.company,
            floorSuite: user.floorSuite,
            serviceRequest: serviceDetails.request,
            serviceRequestType: serviceDetails.type,
            serviceRequestStatus: serviceDetails.status,
            acsStatus: serviceDetails.acsStatus, // Use ACS status from service details
            hasNotes: true, // All users in this view have notes/requests
            badgeId: serviceDetails.badgeId, // Use badge ID from service details
        }
    })

// Define columns for the access requests table
const createAccessRequestsColumns = (onUserClick: (user: any) => void, onCreateClick: (user: any) => void) => [
    {
        id: "select",
        header: ({ table }: { table: any }) => (
            <input
                type="checkbox"
                checked={table.getIsAllPageRowsSelected()}
                onChange={table.getToggleAllPageRowsSelectedHandler()}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
        ),
        cell: ({ row }: { row: any }) => (
            <input
                type="checkbox"
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "User",
        cell: ({ row }: { row: any }) => {
            const name = row.getValue("name") as string;
            const email = row.original.email as string;
            return (
                <div>
                    <button
                        onClick={() => onUserClick(row.original)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 font-medium text-left"
                    >
                        {name}
                    </button>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {email}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }: { row: any }) => {
            const company = row.getValue("company") as string;
            const floorSuite = row.original.floorSuite as string;
            return (
                <div>
                    <div className="font-medium text-gray-900 dark:text-gray-50">
                        {company}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {floorSuite}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "serviceRequest",
        header: "Request",
        cell: ({ row }: { row: any }) => {
            const serviceRequest = row.getValue("serviceRequest") as string;
            const serviceRequestStatus = row.original.serviceRequestStatus as string;
            const hasNotes = row.original.hasNotes as boolean;
            
            return (
                <div>
                    <Link 
                        href={`/operations/access-control/requests/${row.original.id}`}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 font-medium"
                    >
                        {serviceRequest}
                    </Link>
                    <div className="flex items-center gap-1 mt-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {serviceRequestStatus}
                        </span>
                        {hasNotes && (
                            <>
                                <span className="text-sm text-gray-400 dark:text-gray-500">•</span>
                                <div className="flex items-center gap-1">
                                    <FileText className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                    <span className="text-sm text-orange-600 dark:text-orange-400">
                                        Has notes
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "serviceRequestType",
        header: "Request Type",
        cell: ({ row }: { row: any }) => {
            return row.getValue("serviceRequestType");
        }
    },
    {
        accessorKey: "acsStatus",
        header: "ACS Status",
        cell: ({ row }: { row: any }) => {
            const acsStatus = row.getValue("acsStatus") as string | null;
            const badgeId = row.original.badgeId as string | null;
            
            // For Tenant Departure requests, show blank
            if (acsStatus === null) {
                return <div></div>;
            }
            
            const getStatusBadge = (status: string) => {
                switch (status) {
                    case "pending":
                        return (
                            <Badge 
                                variant="warning"
                                className="text-xs"
                            >
                                • Not in ACS
                            </Badge>
                        );
                    case "active":
                        return (
                            <Badge 
                                variant="success"
                                className="text-xs"
                            >
                                • Active
                            </Badge>
                        );
                    case "suspended":
                        return (
                            <Badge 
                                variant="error"
                                className="text-xs"
                            >
                                • Suspended
                            </Badge>
                        );
                    case "inactive":
                        return (
                            <Badge 
                                variant="neutral"
                                className="text-xs"
                            >
                                • Inactive
                            </Badge>
                        );
                    default:
                        return <Badge variant="neutral" className="text-xs">• Unknown</Badge>;
                }
            };
            
            return (
                <div>
                    {getStatusBadge(acsStatus)}
                    {badgeId && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {badgeId}
                        </div>
                    )}
                </div>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: any }) => {
            const requestType = row.original.serviceRequestType;
            
            const getActionButton = () => {
                switch (requestType) {
                    case "New Employee MKA":
                        return (
                            <Button 
                                variant="primary" 
                                size="sm"
                                onClick={() => onCreateClick(row.original)}
                            >
                                Create
                            </Button>
                        );
                    case "New Phone":
                        return (
                            <Button 
                                variant="primary" 
                                size="sm"
                                onClick={() => onCreateClick(row.original)}
                            >
                                Create
                            </Button>
                        );
                    case "Termination of Employment":
                        return (
                            <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => onCreateClick(row.original)}
                            >
                                Revoke
                            </Button>
                        );
                    case "Lost Device":
                        return (
                            <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => onCreateClick(row.original)}
                            >
                                Revoke
                            </Button>
                        );
                    case "Tenant Departure":
                        return (
                            <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => onCreateClick(row.original)}
                            >
                                Bulk revoke
                            </Button>
                        );
                    case "Access Level Update":
                        return (
                            <Button 
                                variant="secondary" 
                                size="sm"
                                onClick={() => onCreateClick(row.original)}
                            >
                                View
                            </Button>
                        );
                    default:
                        return (
                            <Button 
                                variant="primary" 
                                size="sm"
                                onClick={() => onCreateClick(row.original)}
                            >
                                Create
                            </Button>
                        );
                }
            };
            
            return getActionButton();
        },
        enableSorting: false,
    },
    {
        id: "menu",
        header: "",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        Activate access
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Revoke access
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Remove mobile app access
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        View user in ACS
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
        enableSorting: false,
        size: 60, // Fixed width for the kebab column
    },
]

export default function AccessControlAccessRequests() {
    const pathname = usePathname()
    const [data] = useState(accessRequestsData)
    const [selectedUser, setSelectedUser] = useState<typeof accessRequestsData[0] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedUsersForAccess, setSelectedUsersForAccess] = useState<typeof accessRequestsData | null>(null)
    const [isCreateAccessModalOpen, setIsCreateAccessModalOpen] = useState(false)

    const handleUserClick = (user: typeof accessRequestsData[0]) => {
        setSelectedUser(user)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedUser(null)
    }

    const handleCreateAccessClick = (user: typeof accessRequestsData[0]) => {
        setSelectedUsersForAccess([user])
        setIsCreateAccessModalOpen(true)
    }

    const handleCloseCreateAccessModal = () => {
        setIsCreateAccessModalOpen(false)
        setSelectedUsersForAccess(null)
    }

    const handleBulkCreateAccess = (selectedUsers: typeof accessRequestsData) => {
        setSelectedUsersForAccess(selectedUsers)
        setIsCreateAccessModalOpen(true)
    }

    const handleBulkRemoveAccess = (selectedUsers: typeof accessRequestsData) => {
        console.log('Removing access for multiple users:', selectedUsers)
        // In a real app, this would call an API to remove access for multiple users
        // For now, we'll just log the action
    }

    const handleReviewPendingUsers = () => {
        setSelectedUsersForAccess(data) // All users in this view need access
        setIsCreateAccessModalOpen(true)
    }

    const accessRequestsColumns = createAccessRequestsColumns(handleUserClick, handleCreateAccessClick)

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                        Access Control
                    </h1>
                    <Link href="/operations/access-control/settings">
                        <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                            <RiSettings3Line className="size-4" />
                        </Button>
                    </Link>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="primary" className="flex items-center gap-2">
                            Grant access
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuItem className="flex items-start gap-3 p-4 cursor-pointer">
                            <User className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                            <div className="flex-1">
                                <div className="font-medium text-gray-900 dark:text-gray-50">
                                    Individual
                                </div>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-start gap-3 p-4 cursor-pointer">
                            <Building className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                            <div className="flex-1">
                                <div className="font-medium text-gray-900 dark:text-gray-50">
                                    Bulk
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Best for onboarding new tenant companies
                                </div>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Tab Navigation */}
            <TabNavigation>
                {tabs.map((tab) => (
                    <TabNavigationLink
                        key={tab.name}
                        asChild
                        active={pathname === tab.href}
                    >
                        <Link href={tab.href}>
                            {tab.name}
                            {tab.name === "Access requests" && (
                                <Badge variant="error" className="ml-2 text-xs">
                                    {data.length}
                                </Badge>
                            )}
                        </Link>
                    </TabNavigationLink>
                ))}
            </TabNavigation>

            {/* Data Table */}
            <DataTable
                columns={accessRequestsColumns}
                data={data}
                searchKey="name"
                initialColumnVisibility={{
                    serviceRequestType: false // Hide the request type column since it's used for filtering only
                }}
                initialSorting={[
                    {
                        id: "serviceRequest",
                        desc: true // Sort by request type
                    }
                ]}
                renderBulkActions={(table, rowSelection) => (
                    <UserAccessBulkActions
                        table={table}
                        rowSelection={rowSelection}
                        totalCount={data.length}
                        onCreateAccess={handleBulkCreateAccess}
                        onRemoveAccess={handleBulkRemoveAccess}
                    />
                )}
            />

            {/* User Details Modal */}
            <UserDetailsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                user={selectedUser}
            />

            {/* Create User Access Modal */}
            <CreateUserAccessModal
                isOpen={isCreateAccessModalOpen}
                onClose={handleCloseCreateAccessModal}
                users={selectedUsersForAccess}
            />
        </div>
    )
}
