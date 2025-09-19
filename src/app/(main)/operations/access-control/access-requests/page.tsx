"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { DataTableFacetedFilter } from "@/components/ui/data-table/DataTableFacetedFilter"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { CreateUserAccessModal } from "@/components/ui/user-access/CreateUserAccessModal"
import { UserAccessBulkActions } from "@/components/ui/user-access/UserAccessBulkActions"
import { UserDetailsModal } from "@/components/ui/user-access/UserDetailsModal"
import { centralizedUsers } from "@/data/centralizedUsers"
import { RiSettings3Line } from "@remixicon/react"
import { Building, ChevronDown, FileText, Grid3X3, List, MoreVertical, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Access Control Access Requests page
const tabs = [
    { name: "Overview", href: "/operations/access-control" },
    { name: "Access requests", href: "/operations/access-control/access-requests" },
    { name: "Active access", href: "/operations/access-control/active-access" },
    { name: "Revoked access", href: "/operations/access-control/revoked-access" },
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
                                variant="secondary" 
                                size="sm"
                                onClick={() => onCreateClick(row.original)}
                            >
                                View
                            </Button>
                        );
                    case "Lost Device":
                        return (
                            <Button 
                                variant="secondary" 
                                size="sm"
                                onClick={() => onCreateClick(row.original)}
                            >
                                View
                            </Button>
                        );
                    case "Tenant Departure":
                        return (
                            <Button 
                                variant="secondary" 
                                size="sm"
                                onClick={() => onCreateClick(row.original)}
                            >
                                Review
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
    const [viewMode, setViewMode] = useState<'table' | 'card'>('card')
    const [searchValue, setSearchValue] = useState("")
    const [requestTypeFilter, setRequestTypeFilter] = useState<string[]>([])
    const [statusFilter, setStatusFilter] = useState<string[]>([])

    // Badge status options for dropdown
    const badgeStatusOptions = [
        { label: 'New', variant: 'error' as const },
        { label: 'In Progress', variant: 'warning' as const },
        { label: 'Under Review', variant: 'neutral' as const },
        { label: 'Pending Review', variant: 'default' as const },
        { label: 'Completed', variant: 'success' as const }
    ]

    const getCurrentStatusVariant = (status: string) => {
        const option = badgeStatusOptions.find(opt => opt.label === status)
        return option?.variant || 'default'
    }

    const handleStatusChange = (userId: string, newStatus: string) => {
        // Update status logic would go here
        console.log(`Updating user ${userId} status to ${newStatus}`)
    }

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

    const accessRequestsColumns = createAccessRequestsColumns(handleUserClick, handleCreateAccessClick)

    // Filter data for card view
    const filteredData = data.filter(user => {
        const matchesSearch = searchValue === "" || 
            user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.company.toLowerCase().includes(searchValue.toLowerCase())
        
        const matchesRequestType = requestTypeFilter.length === 0 || 
            (user.serviceRequestType && requestTypeFilter.includes(user.serviceRequestType))
        
        const matchesStatus = statusFilter.length === 0 || 
            (user.serviceRequestStatus && statusFilter.includes(user.serviceRequestStatus))
        
        return matchesSearch && matchesRequestType && matchesStatus
    })

    const handleClearFilters = () => {
        setSearchValue("")
        setRequestTypeFilter([])
        setStatusFilter([])
    }

    const isFiltered = searchValue !== "" || requestTypeFilter.length > 0 || statusFilter.length > 0

    // Request Type Filter Options
    const requestTypeOptions = [
        { value: "New Employee MKA", label: "New Employee MKA" },
        { value: "Lost Device", label: "Lost Device" },
        { value: "New Phone", label: "New Phone" },
        { value: "Access Level Update", label: "Access Level Update" },
        { value: "Tenant Departure", label: "Tenant Departure" },
        { value: "Termination of Employment", label: "Termination of Employment" }
    ]

    // Status Filter Options  
    const statusOptions = [
        { value: "New", label: "New" },
        { value: "In Progress", label: "In Progress" },
        { value: "Under Review", label: "Under Review" },
        { value: "Pending Review", label: "Pending Review" }
    ]

    // Card Filter Toolbar Component
    const CardFilterToolbar = () => (
        <div className="flex items-center justify-between pb-4">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search by name..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                <DataTableFacetedFilter
                    column={{
                        getFilterValue: () => requestTypeFilter,
                        setFilterValue: (value: any) => setRequestTypeFilter(value || []),
                        getFacetedUniqueValues: () => new Map()
                    } as any}
                    title="Request type"
                    options={requestTypeOptions}
                />
                <DataTableFacetedFilter
                    column={{
                        getFilterValue: () => statusFilter,
                        setFilterValue: (value: any) => setStatusFilter(value || []),
                        getFacetedUniqueValues: () => new Map()
                    } as any}
                    title="Status"
                    options={statusOptions}
                />
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={handleClearFilters}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <ViewToggle />
        </div>
    )

    // View Toggle Component
    const ViewToggle = () => (
        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
            <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="rounded-r-none border-r border-gray-200 dark:border-gray-700"
            >
                <List className="h-4 w-4" />
            </Button>
            <Button
                variant={viewMode === 'card' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('card')}
                className="rounded-l-none"
            >
                <Grid3X3 className="h-4 w-4" />
            </Button>
        </div>
    )

    // Card View Component
    const CardView = () => (
        <div className="space-y-4">
            {filteredData.map((user) => (
                <div
                    key={user.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                    {/* Main Service Request Card */}
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                {/* Request Type with Has Notes inline */}
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="text-base font-semibold text-gray-900 dark:text-gray-50">
                                        {user.serviceRequestType}
                                    </div>
                                    {user.hasNotes && (
                                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                            <FileText className="h-4 w-4" />
                                            Has notes
                                        </div>
                                    )}
                                </div>
                                
                                {/* Requested By */}
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Requested by Sarah Chen on Jan 5, 2025 at 10:10 PM
                                </div>
                            </div>
                            
                            {/* Request Status */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Request status:
                                </span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="h-9 px-3 py-1.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-1.5 w-40 justify-between text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                                        >
                                            <span className="flex items-center gap-1.5">
                                                <span 
                                                    className={`w-2 h-2 rounded-full ${
                                                        getCurrentStatusVariant(user.serviceRequestStatus || "New") === "error" ? "bg-red-500" :
                                                        getCurrentStatusVariant(user.serviceRequestStatus || "New") === "warning" ? "bg-yellow-500" :
                                                        getCurrentStatusVariant(user.serviceRequestStatus || "New") === "neutral" ? "bg-blue-500" :
                                                        getCurrentStatusVariant(user.serviceRequestStatus || "New") === "success" ? "bg-green-500" :
                                                        "bg-gray-500"
                                                    }`}
                                                />
                                                {user.serviceRequestStatus || "New"}
                                            </span>
                                            <ChevronDown className="h-3 w-3" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="min-w-[150px]">
                                        {badgeStatusOptions.map((option) => (
                                            <DropdownMenuItem
                                                key={option.label}
                                                onClick={() => handleStatusChange(user.id, option.label)}
                                                className="flex items-center gap-2 cursor-pointer"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span 
                                                        className={`w-2 h-2 rounded-full ${
                                                            option.variant === "error" ? "bg-red-500" :
                                                            option.variant === "warning" ? "bg-yellow-500" :
                                                            option.variant === "neutral" ? "bg-blue-500" :
                                                            option.variant === "success" ? "bg-green-500" :
                                                            "bg-gray-500"
                                                        }`}
                                                    />
                                                    {option.label}
                                                </span>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Horizontal Employee Access Information */}
                        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                                <div className="grid grid-cols-3 gap-6 flex-1 text-sm">
                                    {/* Name and Email Group */}
                                    <div>
                                        <button
                                            onClick={() => handleUserClick(user)}
                                            className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:underline text-left"
                                        >
                                            {user.name}
                                        </button>
                                        <div className="text-gray-500 dark:text-gray-400 text-sm">
                                            {user.email}
                                        </div>
                                    </div>

                                    {/* Company and Location Group */}
                                    <div>
                                        <div className="text-gray-500 dark:text-gray-400">
                                            {user.company}
                                        </div>
                                        <div className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                            <Building className="w-3 h-3 flex-shrink-0" />
                                            <span>{user.floorSuite}</span>
                                        </div>
                                    </div>

                                    {/* Access Info Group */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                                            Access info:
                                        </span>
                                        <Badge 
                                            variant={
                                                user.acsStatus === "active" ? "success" :
                                                user.acsStatus === "pending" ? "warning" :
                                                "error"
                                            }
                                            className="text-xs"
                                        >
                                            • {user.acsStatus === "active" ? "Active" : 
                                               user.acsStatus === "pending" ? "Pending" : "Not in ACS"}
                                        </Badge>
                                        <span className="text-gray-500 dark:text-gray-400 font-mono text-xs">
                                            {user.badgeId || "N/A"}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="flex-shrink-0 ml-4">
                                    <Button
                                        variant={user.serviceRequestType === "Termination of Employment" || user.serviceRequestType === "Lost Device" || user.serviceRequestType === "Tenant Departure" ? "secondary" : "outline"}
                                        size="sm"
                                        onClick={() => handleCreateAccessClick(user)}
                                        className={`w-24 justify-center ${user.serviceRequestType !== "Termination of Employment" && user.serviceRequestType !== "Lost Device" && user.serviceRequestType !== "Tenant Departure" ? "border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20" : ""}`}
                                    >
                                        {user.serviceRequestType === "Termination of Employment" || user.serviceRequestType === "Lost Device" ? "View" : 
                                         user.serviceRequestType === "Tenant Departure" ? "Review" : "Create"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {filteredData.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No access requests found matching your criteria.
                </div>
            )}
        </div>
    )

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
                <Button 
                    onClick={() => setIsCreateAccessModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    Create
                </Button>
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

            {/* Data View */}
            {viewMode === 'table' ? (
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
                    customViewActions={<ViewToggle />}
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
            ) : (
                <div className="space-y-4">
                    <CardFilterToolbar />
                    <CardView />
                </div>
            )}

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
