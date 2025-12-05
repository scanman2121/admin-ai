"use client"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RiAddLine, RiArrowLeftLine, RiCloseLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

// Define tabs for the Service Requests Settings page
const tabs = [
    { name: "Settings", href: "/operations/service-requests/settings/general" },
    { name: "Statuses", href: "/operations/service-requests/settings/statuses" },
    { name: "Service types", href: "/operations/service-requests/settings/service-types-categories" },
    { name: "Teams", href: "/operations/service-requests/settings/teams" },
    { name: "Tenant users", href: "/operations/service-requests/settings/users" },
    { name: "Email templates", href: "/operations/service-requests/settings/email-template" },
    { name: "Connected accounts", href: "/operations/service-requests/settings/connected-accounts" },
]

// Mock users database for type-ahead search
const allUsers = [
    { id: 1, name: "Sarah Johnson", email: "sarah.johnson@techcorp.com" },
    { id: 2, name: "Michael Chen", email: "michael.chen@techcorp.com" },
    { id: 3, name: "Emily Brown", email: "emily.brown@techcorp.com" },
    { id: 4, name: "Dr. Emma Wilson", email: "emma.wilson@healthtech.com" },
    { id: 5, name: "Kevin Chen", email: "kevin.chen@healthtech.com" },
    { id: 6, name: "Rachel Thompson", email: "rachel.thompson@legalpartners.com" },
    { id: 7, name: "James Anderson", email: "james.anderson@legalpartners.com" },
    { id: 8, name: "Marcus Rodriguez", email: "marcus.rodriguez@globalfinance.com" },
    { id: 9, name: "Lisa Wang", email: "lisa.wang@globalfinance.com" },
    { id: 10, name: "David Martinez", email: "david.martinez@marketinghub.com" },
    { id: 11, name: "Amanda Kim", email: "amanda.kim@marketinghub.com" },
    { id: 12, name: "Chris Taylor", email: "chris.taylor@designstudio.com" },
    { id: 13, name: "Jennifer Lee", email: "jennifer.lee@techcorp.com" },
    { id: 14, name: "Robert Smith", email: "robert.smith@healthtech.com" },
    { id: 15, name: "Maria Garcia", email: "maria.garcia@legalpartners.com" },
]

// Tenants data with their assigned users
const initialTenantsData = [
    {
        id: 1,
        name: "TechCorp Solutions",
        users: [
            { id: 1, name: "Sarah Johnson", email: "sarah.johnson@techcorp.com" },
            { id: 2, name: "Michael Chen", email: "michael.chen@techcorp.com" },
            { id: 3, name: "Emily Brown", email: "emily.brown@techcorp.com" },
        ],
    },
    {
        id: 2,
        name: "HealthTech Inc",
        users: [
            { id: 4, name: "Dr. Emma Wilson", email: "emma.wilson@healthtech.com" },
            { id: 5, name: "Kevin Chen", email: "kevin.chen@healthtech.com" },
        ],
    },
    {
        id: 3,
        name: "Legal Partners",
        users: [
            { id: 6, name: "Rachel Thompson", email: "rachel.thompson@legalpartners.com" },
        ],
    },
    {
        id: 4,
        name: "Global Finance Corp",
        users: [
            { id: 8, name: "Marcus Rodriguez", email: "marcus.rodriguez@globalfinance.com" },
            { id: 9, name: "Lisa Wang", email: "lisa.wang@globalfinance.com" },
        ],
    },
    {
        id: 5,
        name: "MarketingHub Agency",
        users: [
            { id: 10, name: "David Martinez", email: "david.martinez@marketinghub.com" },
        ],
    },
    {
        id: 6,
        name: "Design Studio Co",
        users: [],
    },
]

export default function ServiceRequestsUsersSettings() {
    const pathname = usePathname()
    const [searchQuery, setSearchQuery] = useState("")
    const [tenants, setTenants] = useState(initialTenantsData)
    
    // Popover state for adding users to a specific tenant
    const [openPopoverId, setOpenPopoverId] = useState<number | null>(null)
    const [popoverSearch, setPopoverSearch] = useState("")
    const popoverRef = useRef<HTMLDivElement>(null)
    
    // Modal state for adding tenant users
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [selectedTenant, setSelectedTenant] = useState("")
    const [selectedUsers, setSelectedUsers] = useState<typeof allUsers>([])
    const [tenantSearch, setTenantSearch] = useState("")
    const [userSearch, setUserSearch] = useState("")
    const [showTenantDropdown, setShowTenantDropdown] = useState(false)
    const [showUserDropdown, setShowUserDropdown] = useState(false)
    const tenantDropdownRef = useRef<HTMLDivElement>(null)
    const userDropdownRef = useRef<HTMLDivElement>(null)

    // Close popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setOpenPopoverId(null)
                setPopoverSearch("")
            }
        }

        if (openPopoverId !== null) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [openPopoverId])

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tenantDropdownRef.current && !tenantDropdownRef.current.contains(event.target as Node)) {
                setShowTenantDropdown(false)
            }
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
                setShowUserDropdown(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Close dropdowns when modal is closed
    useEffect(() => {
        if (!isAddModalOpen) {
            setShowTenantDropdown(false)
            setShowUserDropdown(false)
        }
    }, [isAddModalOpen])

    const filteredTenants = tenants.filter(tenant => 
        tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tenant.users.some(user => 
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )

    const getFilteredUsersForPopover = (tenantId: number) => {
        const tenant = tenants.find(t => t.id === tenantId)
        if (!tenant) return []
        
        const assignedUserIds = tenant.users.map(u => u.id)
        return allUsers.filter(user => 
            !assignedUserIds.includes(user.id) &&
            (user.name.toLowerCase().includes(popoverSearch.toLowerCase()) ||
            user.email.toLowerCase().includes(popoverSearch.toLowerCase()))
        )
    }

    const getFilteredTenantsForModal = () => {
        return tenants.filter(tenant =>
            tenant.name.toLowerCase().includes(tenantSearch.toLowerCase())
        )
    }

    const getFilteredUsersForModal = () => {
        const selectedTenantData = tenants.find(t => t.name === selectedTenant)
        const assignedUserIds = selectedTenantData?.users.map(u => u.id) || []
        const selectedUserIds = selectedUsers.map(u => u.id)
        
        return allUsers.filter(user => 
            !assignedUserIds.includes(user.id) &&
            !selectedUserIds.includes(user.id) &&
            (user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
            user.email.toLowerCase().includes(userSearch.toLowerCase()))
        )
    }

    const handleRemoveUser = (tenantId: number, userId: number) => {
        setTenants(prev => prev.map(tenant => {
            if (tenant.id === tenantId) {
                return {
                    ...tenant,
                    users: tenant.users.filter(user => user.id !== userId)
                }
            }
            return tenant
        }))
    }

    const handleAddUserFromPopover = (tenantId: number, user: typeof allUsers[0]) => {
        setTenants(prev => prev.map(tenant => {
            if (tenant.id === tenantId) {
                return {
                    ...tenant,
                    users: [...tenant.users, user]
                }
            }
            return tenant
        }))
        setPopoverSearch("")
    }

    const handleAddUsersFromModal = () => {
        if (!selectedTenant || selectedUsers.length === 0) return

        setTenants(prev => prev.map(tenant => {
            if (tenant.name === selectedTenant) {
                return {
                    ...tenant,
                    users: [...tenant.users, ...selectedUsers]
                }
            }
            return tenant
        }))

        // Reset modal state
        setSelectedTenant("")
        setSelectedUsers([])
        setTenantSearch("")
        setUserSearch("")
        setIsAddModalOpen(false)
    }

    const handleSelectTenant = (tenantName: string) => {
        setSelectedTenant(tenantName)
        setTenantSearch(tenantName)
        setShowTenantDropdown(false)
    }

    const handleSelectUser = (user: typeof allUsers[0]) => {
        setSelectedUsers(prev => [...prev, user])
        setUserSearch("")
        setShowUserDropdown(false)
    }

    const handleRemoveSelectedUser = (userId: number) => {
        setSelectedUsers(prev => prev.filter(u => u.id !== userId))
    }

    return (
        <div className="space-y-6">
            {/* Header with back navigation */}
            <div className="flex items-center gap-3">
                <Link 
                    href="/operations/service-requests"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <RiArrowLeftLine className="mr-1 size-4" />
                    Service Requests
                </Link>
            </div>

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                        Service request settings
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="primary">
                        Save
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
                        <Link href={tab.href}>{tab.name}</Link>
                    </TabNavigationLink>
                ))}
            </TabNavigation>

            {/* Service Request Users Content */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                            Service request users
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Manage users who can submit and process service requests for each tenant
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button 
                            variant="ghost" 
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            <RiAddLine className="size-4 mr-1.5" />
                            Add tenant user
                        </Button>
                    </div>
                </div>

                {/* Search */}
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search tenants and users..."
                        className="w-full sm:w-80 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Simple Two-Column Table */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" className="w-80 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Tenant
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Service Request Tenant Admins
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredTenants.map((tenant) => (
                                <tr key={tenant.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                                            {tenant.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {tenant.users.map((user) => (
                                                <div
                                                    key={user.id}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                                                >
                                                    <span>{user.name}</span>
                                                    <button
                                                        onClick={() => handleRemoveUser(tenant.id, user.id)}
                                                        className="hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors"
                                                    >
                                                        <RiCloseLine className="size-3.5" />
                                                    </button>
                                                </div>
                                            ))}
                                            
                                            {/* Add User Button and Popover */}
                                            <div className="relative inline-block">
                                                <button
                                                    onClick={() => {
                                                        setOpenPopoverId(openPopoverId === tenant.id ? null : tenant.id)
                                                        setPopoverSearch("")
                                                    }}
                                                    className="inline-flex items-center justify-center size-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
                                                >
                                                    <RiAddLine className="size-4" />
                                                </button>
                                                
                                                {/* Popover */}
                                                {openPopoverId === tenant.id && (
                                                    <div
                                                        ref={popoverRef}
                                                        className="absolute left-0 top-full mt-2 z-50 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
                                                    >
                                                        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                                                            <Input
                                                                placeholder="Search by name or email..."
                                                                value={popoverSearch}
                                                                onChange={(e) => setPopoverSearch(e.target.value)}
                                                                autoFocus
                                                            />
                                                        </div>
                                                        <div className="max-h-64 overflow-y-auto">
                                                            {getFilteredUsersForPopover(tenant.id).length === 0 ? (
                                                                <div className="p-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                                                                    {popoverSearch ? "No users found" : "No available users"}
                                                                </div>
                                                            ) : (
                                                                getFilteredUsersForPopover(tenant.id).map((user) => (
                                                                    <button
                                                                        key={user.id}
                                                                        onClick={() => {
                                                                            handleAddUserFromPopover(tenant.id, user)
                                                                            setOpenPopoverId(null)
                                                                        }}
                                                                        className="w-full px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                                                                    >
                                                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                                                            {user.name}
                                                                        </div>
                                                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                            {user.email}
                                                                        </div>
                                                                    </button>
                                                                ))
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {filteredTenants.length === 0 && (
                        <div className="p-8 text-center">
                            <p className="text-gray-500 dark:text-gray-400">
                                No tenants found matching your search.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Tenant User Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Add tenant user</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 px-6 py-4">
                        {/* Tenant Type-Ahead */}
                        <div className="space-y-2">
                            <Label htmlFor="tenantSelect" className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                Tenant
                            </Label>
                            <div className="relative" ref={tenantDropdownRef}>
                                <Input
                                    id="tenantSelect"
                                    placeholder="Search and select tenant..."
                                    value={tenantSearch}
                                    onChange={(e) => {
                                        setTenantSearch(e.target.value)
                                        setShowTenantDropdown(true)
                                        if (!e.target.value) {
                                            setSelectedTenant("")
                                        }
                                    }}
                                    onFocus={() => setShowTenantDropdown(true)}
                                    className="w-full"
                                />
                                
                                {showTenantDropdown && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto z-[100]">
                                        {getFilteredTenantsForModal().length === 0 ? (
                                            <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                                                No tenants found
                                            </div>
                                        ) : (
                                            <div className="py-1">
                                                {getFilteredTenantsForModal().map((tenant) => (
                                                    <button
                                                        key={tenant.id}
                                                        onClick={() => handleSelectTenant(tenant.name)}
                                                        className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none"
                                                    >
                                                        <div className="font-medium text-gray-900 dark:text-gray-50">
                                                            {tenant.name}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* User Type-Ahead with Multiple Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="userSelect" className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                Users
                            </Label>
                            
                            {/* Selected Users */}
                            {selectedUsers.length > 0 && (
                                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700">
                                    {selectedUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                                        >
                                            <span>{user.name}</span>
                                            <button
                                                onClick={() => handleRemoveSelectedUser(user.id)}
                                                className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded p-0.5 transition-colors"
                                                type="button"
                                            >
                                                <RiCloseLine className="size-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            <div className="relative" ref={userDropdownRef}>
                                <Input
                                    id="userSelect"
                                    placeholder={!selectedTenant ? "Select a tenant first..." : "Search by name or email..."}
                                    value={userSearch}
                                    onChange={(e) => {
                                        setUserSearch(e.target.value)
                                        setShowUserDropdown(true)
                                    }}
                                    onFocus={() => selectedTenant && setShowUserDropdown(true)}
                                    disabled={!selectedTenant}
                                    className="w-full"
                                />
                                
                                {showUserDropdown && selectedTenant && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-64 overflow-y-auto z-[100]">
                                        {getFilteredUsersForModal().length === 0 ? (
                                            <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                                                {userSearch ? "No users found" : "All users have been added"}
                                            </div>
                                        ) : (
                                            <div className="py-1">
                                                {getFilteredUsersForModal().map((user) => (
                                                    <button
                                                        key={user.id}
                                                        onClick={() => handleSelectUser(user)}
                                                        className="w-full px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none"
                                                    >
                                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                            {user.email}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            
                            {!selectedTenant && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                                    Please select a tenant first
                                </p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                            variant="ghost" 
                            onClick={() => {
                                setIsAddModalOpen(false)
                                setSelectedTenant("")
                                setSelectedUsers([])
                                setTenantSearch("")
                                setUserSearch("")
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleAddUsersFromModal}
                            disabled={!selectedTenant || selectedUsers.length === 0}
                        >
                            Add {selectedUsers.length > 0 ? `${selectedUsers.length} user${selectedUsers.length > 1 ? 's' : ''}` : 'users'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
