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
import { UserAccessBulkActions } from "@/components/ui/user-access/UserAccessBulkActions"
import { UserDetailsModal } from "@/components/ui/user-access/UserDetailsModal"
import { centralizedUsers } from "@/data/centralizedUsers"
import { RiSettings3Line } from "@remixicon/react"
import { Building, ChevronDown, MoreVertical, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Access Control Active Access page
const tabs = [
    { name: "Overview", href: "/operations/access-control" },
    { name: "Access requests", href: "/operations/access-control/access-requests" },
    { name: "Active access", href: "/operations/access-control/active-access" },
    { name: "Activity", href: "/operations/access-control/activity" },
    { name: "Access groups", href: "/operations/access-control/access-groups" },
    { name: "Audit trail", href: "/operations/access-control/audit-trail" },
]

// Filter users to only show those with active access
const activeAccessData = centralizedUsers
    .filter(user => user.acsStatus === "active")
    .map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company,
        floorSuite: user.floorSuite,
        serviceRequest: "No open requests", // Active users don't have pending requests
        serviceRequestType: null,
        serviceRequestStatus: null,
        acsStatus: user.acsStatus,
        hasNotes: false, // Active users typically don't have notes
        badgeId: user.badgeId,
    }))

// Calculate access requests count for the badge
const accessRequestsCount = centralizedUsers.filter(user => 
    user.acsStatus === "pending" || user.acsStatus === "suspended" || user.acsStatus === "inactive"
).length

// Define columns for the active access table
const createActiveAccessColumns = (onUserClick: (user: any) => void) => [
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
            
            return (
                <span className="text-gray-500 dark:text-gray-400">
                    {serviceRequest}
                </span>
            );
        },
    },
    {
        accessorKey: "acsStatus",
        header: "ACS Status",
        cell: ({ row }: { row: any }) => {
            const badgeId = row.original.badgeId as string;
            
            return (
                <div>
                    <Badge 
                        variant="success"
                        className="text-xs"
                    >
                        • Active
                    </Badge>
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
        cell: () => (
            <Button variant="secondary" size="sm">
                View
            </Button>
        ),
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
                        Edit access permissions
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

export default function AccessControlActiveAccess() {
    const pathname = usePathname()
    const [data] = useState(activeAccessData)
    const [selectedUser, setSelectedUser] = useState<typeof activeAccessData[0] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleUserClick = (user: typeof activeAccessData[0]) => {
        setSelectedUser(user)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedUser(null)
    }

    const handleBulkRemoveAccess = (selectedUsers: typeof activeAccessData) => {
        console.log('Removing access for multiple users:', selectedUsers)
        // In a real app, this would call an API to remove access for multiple users
        // For now, we'll just log the action
    }

    const activeAccessColumns = createActiveAccessColumns(handleUserClick)

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
                                    {accessRequestsCount}
                                </Badge>
                            )}
                        </Link>
                    </TabNavigationLink>
                ))}
            </TabNavigation>

            {/* Data Table */}
            <DataTable
                columns={activeAccessColumns}
                data={data}
                searchKey="name"
                initialSorting={[
                    {
                        id: "name",
                        desc: false // Sort by name alphabetically
                    }
                ]}
                renderBulkActions={(table, rowSelection) => (
                    <UserAccessBulkActions
                        table={table}
                        rowSelection={rowSelection}
                        totalCount={data.length}
                        onCreateAccess={() => {}} // No create access needed for active users
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
        </div>
    )
}
