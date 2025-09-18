"use client"

import { Button } from "@/components/Button"
import { PageHeader } from "@/components/PageHeader"
import { Badge } from "@/components/ui/badge"
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
import { Building, ChevronDown, FileText, MoreVertical, User, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Access Control User Access page
const tabs = [
    { name: "Overview", href: "/operations/access-control" },
    { name: "User access", href: "/operations/access-control/user-access" },
    { name: "Activity", href: "/operations/access-control/activity" },
    { name: "Access groups", href: "/operations/access-control/access-groups" },
]

// Mock data for user access management
const userAccessData = [
    {
        id: "1",
        name: "Sarah Chen",
        email: "sarah.chen@techcorp.com",
        company: "TechCorp Solutions",
        floorSuite: "Floor 12 / Suite 1205",
        serviceRequest: "New Employee MKA Req...",
        serviceRequestType: "New Employee Access",
        serviceRequestStatus: "In Progress",
        acsStatus: "not-in-acs",
        hasNotes: true,
    },
    {
        id: "2",
        name: "David Rodriguez",
        email: "david.rodriguez@lawfirm.com",
        company: "Rodriguez & Associates Law",
        floorSuite: "Floor 8 / Suite 802",
        serviceRequest: "No open requests",
        serviceRequestType: null,
        serviceRequestStatus: null,
        acsStatus: "active",
        hasNotes: false,
        badgeId: "HID-7AB12C",
    },
    {
        id: "3",
        name: "Michael Thompson",
        email: "michael.thompson@consulting.com",
        company: "Thompson Consulting Group",
        floorSuite: "Floor 15 / Suite 1501",
        serviceRequest: "No open requests",
        serviceRequestType: null,
        serviceRequestStatus: null,
        acsStatus: "active",
        hasNotes: false,
        badgeId: "HID-9XY34Z",
    },
    {
        id: "4",
        name: "Emily Watson",
        email: "emily.watson@healthtech.com",
        company: "HealthTech Innovations",
        floorSuite: "Floor 6 / Suite 605",
        serviceRequest: "Lost Device Access R...",
        serviceRequestType: "Lost Device",
        serviceRequestStatus: "In Progress",
        acsStatus: "active",
        hasNotes: false,
    },
    {
        id: "5",
        name: "James Wilson",
        email: "james.wilson@consulting.com",
        company: "Wilson Strategic Consulting",
        floorSuite: "Floor 11 / Suite 1108",
        serviceRequest: "No open requests",
        serviceRequestType: null,
        serviceRequestStatus: null,
        acsStatus: "active",
        hasNotes: false,
        badgeId: "HID-5MN67P",
    },
    {
        id: "6",
        name: "Lisa Park",
        email: "lisa.park@architecture.com",
        company: "Park Architecture Studio",
        floorSuite: "Floor 7 / Suite 705",
        serviceRequest: "No open requests",
        serviceRequestType: null,
        serviceRequestStatus: null,
        acsStatus: "revoked",
        hasNotes: false,
        badgeId: "HID-2QR89S",
    },
]

// Define columns for the user access table
const createUserAccessColumns = (onUserClick: (user: any) => void, onCreateClick: (user: any) => void) => [
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
            
            if (serviceRequest === "No open requests") {
                return (
                    <span className="text-gray-500 dark:text-gray-400">
                        No open requests
                    </span>
                );
            }
            
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
        accessorKey: "acsStatus",
        header: "ACS Status",
        cell: ({ row }: { row: any }) => {
            const acsStatus = row.getValue("acsStatus") as string;
            const badgeId = row.original.badgeId as string;
            
            const getStatusBadge = (status: string) => {
                switch (status) {
                    case "active":
                        return (
                            <Badge 
                                variant="default" 
                                className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30"
                            >
                                • Active
                            </Badge>
                        );
                    case "not-in-acs":
                        return (
                            <Badge 
                                variant="secondary" 
                                className="bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800/30"
                            >
                                • Not in ACS
                            </Badge>
                        );
                    case "revoked":
                        return (
                            <Badge 
                                variant="secondary" 
                                className="bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800/30"
                            >
                                • Revoked
                            </Badge>
                        );
                    default:
                        return <Badge variant="secondary">• Unknown</Badge>;
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
            const acsStatus = row.original.acsStatus as string;
            const serviceRequest = row.original.serviceRequest as string;
            
            if (acsStatus === "not-in-acs" || serviceRequest !== "No open requests") {
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
            
            return (
                <Button variant="secondary" size="sm">
                    View
                </Button>
            );
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

export default function AccessControlUserAccess() {
    const pathname = usePathname()
    const [data] = useState(userAccessData)
    const [selectedUser, setSelectedUser] = useState<typeof userAccessData[0] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedUsersForAccess, setSelectedUsersForAccess] = useState<typeof userAccessData | null>(null)
    const [isCreateAccessModalOpen, setIsCreateAccessModalOpen] = useState(false)

    const handleUserClick = (user: typeof userAccessData[0]) => {
        setSelectedUser(user)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedUser(null)
    }

    const handleCreateAccessClick = (user: typeof userAccessData[0]) => {
        setSelectedUsersForAccess([user])
        setIsCreateAccessModalOpen(true)
    }

    const handleCloseCreateAccessModal = () => {
        setIsCreateAccessModalOpen(false)
        setSelectedUsersForAccess(null)
    }

    const handleBulkCreateAccess = (selectedUsers: typeof userAccessData) => {
        setSelectedUsersForAccess(selectedUsers)
        setIsCreateAccessModalOpen(true)
    }

    const handleBulkRemoveAccess = (selectedUsers: typeof userAccessData) => {
        console.log('Removing access for multiple users:', selectedUsers)
        // In a real app, this would call an API to remove access for multiple users
        // For now, we'll just log the action
    }

    const handleReviewPendingUsers = () => {
        // Filter users who need access creation (same logic as Actions column)
        const pendingUsers = data.filter(user => 
            user.acsStatus === "not-in-acs" || user.serviceRequest !== "No open requests"
        )
        setSelectedUsersForAccess(pendingUsers)
        setIsCreateAccessModalOpen(true)
    }

    const userAccessColumns = createUserAccessColumns(handleUserClick, handleCreateAccessClick)

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <PageHeader 
                title="Access Control" 
                customButtons={
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
                }
            />

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
                        </Link>
                    </TabNavigationLink>
                ))}
            </TabNavigation>

            {/* Access Banner */}
            <div className="relative overflow-hidden rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800/30 dark:bg-blue-900/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800/50">
                            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                3 users awaiting access approval
                            </p>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                Review and approve pending access requests below
                            </p>
                        </div>
                    </div>
                    <Button 
                        variant="ghost"
                        onClick={handleReviewPendingUsers}
                        className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:text-primary-400 dark:hover:text-primary-300 dark:hover:bg-primary-900/20 font-medium"
                    >
                        Review
                    </Button>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={userAccessColumns}
                data={data}
                searchKey="name"
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
