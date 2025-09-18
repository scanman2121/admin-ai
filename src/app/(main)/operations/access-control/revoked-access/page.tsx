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
import { Building, MoreVertical, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Access Control Revoked Access page
const tabs = [
    { name: "Overview", href: "/operations/access-control" },
    { name: "Access requests", href: "/operations/access-control/access-requests" },
    { name: "Active access", href: "/operations/access-control/active-access" },
    { name: "Revoked access", href: "/operations/access-control/revoked-access" },
    { name: "Activity", href: "/operations/access-control/activity" },
    { name: "Access groups", href: "/operations/access-control/access-groups" },
    { name: "Audit trail", href: "/operations/access-control/audit-trail" },
]

// Filter users to only show those with revoked access (inactive or suspended)
const revokedAccessData = centralizedUsers
    .filter(user => user.acsStatus === "inactive" || user.acsStatus === "suspended")
    .map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company,
        floorSuite: user.floorSuite,
        serviceRequest: user.acsStatus === "suspended" ? "Access suspended" : "Access revoked",
        serviceRequestType: "Access Control",
        serviceRequestStatus: user.acsStatus === "suspended" ? "Suspended" : "Inactive",
        acsStatus: user.acsStatus,
        hasNotes: true, // Revoked users typically have notes explaining why
        badgeId: user.badgeId,
        revokedDate: user.acsStatus === "suspended" ? "2025-01-15" : "2024-12-20", // Mock revoked dates
    }))

// Calculate access requests count for the badge
const accessRequestsCount = centralizedUsers.filter(user => user.acsStatus === "pending").length

const createRevokedAccessColumns = (onUserClick: (user: typeof revokedAccessData[0]) => void) => [
    {
        accessorKey: "name",
        header: "User",
        cell: ({ row }: any) => {
            const user = row.original
            return (
                <div 
                    className="flex items-center gap-3 cursor-pointer hover:text-blue-600"
                    onClick={() => onUserClick(user)}
                >
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
                        {user.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900 dark:text-gray-50">
                            {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                        </div>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }: any) => {
            const user = row.original
            return (
                <div>
                    <div className="font-medium text-gray-900 dark:text-gray-50">
                        {user.company}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        {user.floorSuite}
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "serviceRequestStatus",
        header: "Status",
        cell: ({ row }: any) => {
            const status = row.getValue("serviceRequestStatus") as string
            const variant = status === "Suspended" ? "warning" : "neutral"
            return (
                <Badge variant={variant}>
                    • {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: "revokedDate",
        header: "Revoked Date",
        cell: ({ row }: any) => {
            const date = row.getValue("revokedDate") as string
            return (
                <div className="text-sm text-gray-900 dark:text-gray-50">
                    {new Date(date).toLocaleDateString()}
                </div>
            )
        },
    },
    {
        accessorKey: "badgeId",
        header: "Badge ID",
        cell: ({ row }: any) => {
            const badgeId = row.getValue("badgeId") as string
            return (
                <div className="text-sm text-gray-900 dark:text-gray-50 font-mono">
                    {badgeId}
                </div>
            )
        },
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }: any) => {
            const user = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Restore access
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            Permanently remove
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        size: 50, // Fixed width for the kebab column
    },
]

export default function AccessControlRevokedAccess() {
    const pathname = usePathname()
    const [data] = useState(revokedAccessData)
    const [selectedUser, setSelectedUser] = useState<typeof revokedAccessData[0] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleUserClick = (user: typeof revokedAccessData[0]) => {
        setSelectedUser(user)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedUser(null)
    }

    const handleBulkRestoreAccess = (selectedUsers: typeof revokedAccessData) => {
        console.log('Restoring access for multiple users:', selectedUsers)
        // In a real app, this would call an API to restore access for multiple users
        // For now, we'll just log the action
    }

    const revokedAccessColumns = createRevokedAccessColumns(handleUserClick)

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                        Access Control
                    </h1>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 h-8 w-8"
                    >
                        <RiSettings3Line className="size-4" />
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost">
                        Export
                    </Button>
                    <Button>
                        Bulk restore access
                    </Button>
                </div>
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
                columns={revokedAccessColumns}
                data={data}
                searchKey="name"
                initialSorting={[
                    {
                        id: "revokedDate",
                        desc: true // Sort by most recently revoked first
                    }
                ]}
                renderBulkActions={(table, rowSelection) => (
                    <UserAccessBulkActions
                        table={table}
                        rowSelection={rowSelection}
                        totalCount={data.length}
                        onCreateAccess={() => {}} // Not applicable for revoked users
                        onRemoveAccess={handleBulkRestoreAccess}
                        actionLabel="Restore access" // Custom label for revoked users
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
