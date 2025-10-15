"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RiAddLine, RiArrowDownSLine, RiArrowLeftLine, RiArrowRightSLine, RiDeleteBin6Line, RiMore2Line } from "@remixicon/react"
import { Pencil, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Service Requests Settings page
const tabs = [
    { name: "Settings", href: "/operations/service-requests/settings/general" },
    { name: "Teams", href: "/operations/service-requests/settings/teams" },
    { name: "Service types", href: "/operations/service-requests/settings/service-types-categories" },
    { name: "Statuses", href: "/operations/service-requests/settings/statuses" },
    { name: "Users", href: "/operations/service-requests/settings/users" },
]

// Tenants data
const tenantsData = [
    {
        id: 1,
        name: "TechCorp Solutions",
        description: "Technology solutions and software development",
        status: true,
        industry: "Technology",
        building: "Main Tower",
        employees: 145,
    },
    {
        id: 2,
        name: "HealthTech Inc",
        description: "Healthcare technology and medical devices",
        status: true,
        industry: "Healthcare",
        building: "Main Tower",
        employees: 89,
    },
    {
        id: 3,
        name: "Legal Partners",
        description: "Legal services and consulting",
        status: true,
        industry: "Legal",
        building: "East Wing",
        employees: 67,
    },
    {
        id: 4,
        name: "Global Finance Corp",
        description: "Financial services and investment banking",
        status: true,
        industry: "Finance",
        building: "Main Tower",
        employees: 112,
    },
    {
        id: 5,
        name: "MarketingHub Agency",
        description: "Digital marketing and advertising",
        status: true,
        industry: "Marketing",
        building: "East Wing",
        employees: 54,
    },
    {
        id: 6,
        name: "Design Studio Co",
        description: "Creative design and branding services",
        status: false,
        industry: "Design",
        building: "West Building",
        employees: 32,
    },
]

// Service Request Users data
const serviceRequestUsersData = [
    // TechCorp Solutions users
    {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.johnson@techcorp.com",
        tenant: "TechCorp Solutions",
        role: "Admin",
        permissions: ["Submit", "Process", "Approve"],
        status: true,
        phone: "(555) 123-4567",
        department: "IT Administration",
    },
    {
        id: 2,
        name: "Michael Chen",
        email: "michael.chen@techcorp.com",
        tenant: "TechCorp Solutions",
        role: "User",
        permissions: ["Submit", "Process"],
        status: true,
        phone: "(555) 234-5678",
        department: "Software Development",
    },
    {
        id: 3,
        name: "Emily Brown",
        email: "emily.brown@techcorp.com",
        tenant: "TechCorp Solutions",
        role: "User",
        permissions: ["Submit"],
        status: true,
        phone: "(555) 345-6789",
        department: "Product Management",
    },
    // HealthTech Inc users
    {
        id: 4,
        name: "Dr. Emma Wilson",
        email: "emma.wilson@healthtech.com",
        tenant: "HealthTech Inc",
        role: "Admin",
        permissions: ["Submit", "Process", "Approve"],
        status: true,
        phone: "(555) 456-7890",
        department: "Medical Research",
    },
    {
        id: 5,
        name: "Kevin Chen",
        email: "kevin.chen@healthtech.com",
        tenant: "HealthTech Inc",
        role: "User",
        permissions: ["Submit", "Process"],
        status: true,
        phone: "(555) 567-8901",
        department: "Clinical Operations",
    },
    // Legal Partners users
    {
        id: 6,
        name: "Rachel Thompson",
        email: "rachel.thompson@legalpartners.com",
        tenant: "Legal Partners",
        role: "Admin",
        permissions: ["Submit", "Process", "Approve"],
        status: true,
        phone: "(555) 678-9012",
        department: "Corporate Law",
    },
    {
        id: 7,
        name: "James Anderson",
        email: "james.anderson@legalpartners.com",
        tenant: "Legal Partners",
        role: "User",
        permissions: ["Submit"],
        status: true,
        phone: "(555) 789-0123",
        department: "Litigation",
    },
    // Global Finance Corp users
    {
        id: 8,
        name: "Marcus Rodriguez",
        email: "marcus.rodriguez@globalfinance.com",
        tenant: "Global Finance Corp",
        role: "Admin",
        permissions: ["Submit", "Process", "Approve"],
        status: true,
        phone: "(555) 890-1234",
        department: "Investment Banking",
    },
    {
        id: 9,
        name: "Lisa Wang",
        email: "lisa.wang@globalfinance.com",
        tenant: "Global Finance Corp",
        role: "User",
        permissions: ["Submit", "Process"],
        status: true,
        phone: "(555) 901-2345",
        department: "Trading Floor",
    },
    // MarketingHub Agency users
    {
        id: 10,
        name: "David Martinez",
        email: "david.martinez@marketinghub.com",
        tenant: "MarketingHub Agency",
        role: "Admin",
        permissions: ["Submit", "Process", "Approve"],
        status: true,
        phone: "(555) 012-3456",
        department: "Creative Services",
    },
    {
        id: 11,
        name: "Amanda Kim",
        email: "amanda.kim@marketinghub.com",
        tenant: "MarketingHub Agency",
        role: "User",
        permissions: ["Submit"],
        status: false,
        phone: "(555) 123-4568",
        department: "Account Management",
    },
    // Design Studio Co users
    {
        id: 12,
        name: "Chris Taylor",
        email: "chris.taylor@designstudio.com",
        tenant: "Design Studio Co",
        role: "Admin",
        permissions: ["Submit", "Process", "Approve"],
        status: false,
        phone: "(555) 234-5679",
        department: "Creative Direction",
    },
]

export default function ServiceRequestsUsersSettings() {
    const pathname = usePathname()
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [tenantFilter, setTenantFilter] = useState("All Tenants")
    
    const [tenants, setTenants] = useState(tenantsData)
    const [users, setUsers] = useState(serviceRequestUsersData)
    const [expandedTenants, setExpandedTenants] = useState<Set<string>>(new Set(["TechCorp Solutions"]))
    
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)
    const [editingUser, setEditingUser] = useState<typeof serviceRequestUsersData[0] | null>(null)
    const [openUserDropdownId, setOpenUserDropdownId] = useState<number | null>(null)
    
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        tenant: "",
        role: "User" as "Admin" | "User",
        permissions: [] as string[],
        phone: "",
        department: "",
    })

    const getRoleBadgeVariant = (role: string) => {
        switch (role) {
            case 'Admin':
                return 'error' as const
            case 'User':
                return 'default' as const
            default:
                return 'neutral' as const
        }
    }

    const toggleTenantExpansion = (tenantName: string) => {
        setExpandedTenants(prev => {
            const newSet = new Set(Array.from(prev))
            if (newSet.has(tenantName)) {
                newSet.delete(tenantName)
            } else {
                newSet.add(tenantName)
            }
            return newSet
        })
    }

    const handleTenantStatusToggle = (id: number) => {
        setTenants(prev => 
            prev.map(tenant => 
                tenant.id === id ? { ...tenant, status: !tenant.status } : tenant
            )
        )
    }

    const handleUserStatusToggle = (id: number) => {
        setUsers(prev => 
            prev.map(user => 
                user.id === id ? { ...user, status: !user.status } : user
            )
        )
    }

    const handleAddUser = () => {
        if (!newUser.name.trim() || !newUser.email.trim() || !newUser.tenant) {
            return
        }

        const newId = Math.max(...users.map(user => user.id)) + 1
        const user = {
            id: newId,
            ...newUser,
            status: true,
        }

        setUsers(prev => [...prev, user])
        setNewUser({
            name: "",
            email: "",
            tenant: "",
            role: "User",
            permissions: [],
            phone: "",
            department: "",
        })
        setIsAddUserModalOpen(false)
    }

    const handleEditUser = (user: typeof serviceRequestUsersData[0]) => {
        setEditingUser(user)
        setNewUser({
            name: user.name,
            email: user.email,
            tenant: user.tenant,
            role: user.role as "Admin" | "User",
            permissions: [...user.permissions],
            phone: user.phone,
            department: user.department,
        })
        setIsEditUserModalOpen(true)
    }

    const handleUpdateUser = () => {
        if (!editingUser || !newUser.name.trim() || !newUser.email.trim()) {
            return
        }

        setUsers(prev => prev.map(user => 
            user.id === editingUser.id 
                ? { ...user, ...newUser }
                : user
        ))
        
        setEditingUser(null)
        setNewUser({
            name: "",
            email: "",
            tenant: "",
            role: "User",
            permissions: [],
            phone: "",
            department: "",
        })
        setIsEditUserModalOpen(false)
    }

    const handleDeleteUser = (id: number) => {
        setUsers(prev => prev.filter(user => user.id !== id))
        setOpenUserDropdownId(null)
    }

    const handlePermissionToggle = (permission: string) => {
        setNewUser(prev => ({
            ...prev,
            permissions: prev.permissions.includes(permission)
                ? prev.permissions.filter(p => p !== permission)
                : [...prev.permissions, permission]
        }))
    }

    const filteredTenants = tenants.filter(tenant => {
        const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tenant.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "All" || 
                            (statusFilter === "Active" && tenant.status) ||
                            (statusFilter === "Inactive" && !tenant.status)
        const matchesTenantFilter = tenantFilter === "All Tenants" || tenant.name === tenantFilter
        return matchesSearch && matchesStatus && matchesTenantFilter
    })

    const getFilteredUsers = (tenantName: string) => {
        const tenantUsers = users.filter(user => user.tenant === tenantName)
        return tenantUsers.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesStatus = statusFilter === "All" || 
                                (statusFilter === "Active" && user.status) ||
                                (statusFilter === "Inactive" && !user.status)
            return matchesSearch && matchesStatus
        })
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
                            onClick={() => setIsAddUserModalOpen(true)}
                        >
                            <RiAddLine className="size-4 mr-1.5" />
                            Add tenant user
                        </Button>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center justify-between gap-4">
                    <input
                        type="text"
                        placeholder="Search tenants and users..."
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="flex items-center gap-3">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option>All</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                        <select
                            value={tenantFilter}
                            onChange={(e) => setTenantFilter(e.target.value)}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option>All Tenants</option>
                            {tenants.map(tenant => (
                                <option key={tenant.id}>{tenant.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Hierarchical Table */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Name / User
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Permissions
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Department
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Enable
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredTenants.map((tenant) => {
                                const isExpanded = expandedTenants.has(tenant.name)
                                const tenantUsers = getFilteredUsers(tenant.name)
                                
                                return (
                                    <>
                                        {/* Tenant Row */}
                                        <tr key={`tenant-${tenant.id}`} className="bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => toggleTenantExpansion(tenant.name)}
                                                    className="flex items-center gap-2 text-left w-full"
                                                >
                                                    {isExpanded ? (
                                                        <RiArrowDownSLine className="size-4 text-gray-500" />
                                                    ) : (
                                                        <RiArrowRightSLine className="size-4 text-gray-500" />
                                                    )}
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                                                            {tenant.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {tenant.description} ({tenantUsers.length} users)
                                                        </div>
                                                    </div>
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                -
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge variant="neutral">
                                                    Tenant
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                -
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {tenant.building}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex justify-start">
                                                    <Switch
                                                        checked={tenant.status}
                                                        onCheckedChange={() => handleTenantStatusToggle(tenant.id)}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center gap-1 justify-start">
                                                    {/* Tenant actions can be added here if needed */}
                                                </div>
                                            </td>
                                        </tr>
                                        
                                        {/* User Rows (shown when expanded) */}
                                        {isExpanded && tenantUsers.map((user) => (
                                            <tr key={`user-${user.id}`} className="hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                                                <td className="px-6 py-4 pl-12">
                                                    <div className="flex items-center gap-2">
                                                        <User className="size-4 text-gray-400" />
                                                        <div className="space-y-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                                                {user.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                {user.phone}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-50">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Badge variant={getRoleBadgeVariant(user.role)}>
                                                        {user.role}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1 min-h-[32px]">
                                                        {user.permissions.map((permission) => (
                                                            <span
                                                                key={permission}
                                                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                                            >
                                                                {permission}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-50">
                                                    {user.department}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex justify-start">
                                                        <Switch
                                                            checked={user.status}
                                                            onCheckedChange={() => handleUserStatusToggle(user.id)}
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center gap-1 justify-start">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="p-2 h-8 w-8"
                                                            onClick={() => handleEditUser(user)}
                                                        >
                                                            <Pencil className="size-4" style={{ color: '#696E72' }} />
                                                        </Button>
                                                        
                                                        <div className="relative">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="p-2 h-8 w-8"
                                                                onClick={() => setOpenUserDropdownId(openUserDropdownId === user.id ? null : user.id)}
                                                            >
                                                                <RiMore2Line className="size-4" />
                                                            </Button>
                                                            
                                                            {openUserDropdownId === user.id && (
                                                                <>
                                                                    <div 
                                                                        className="fixed inset-0 z-10" 
                                                                        onClick={() => setOpenUserDropdownId(null)}
                                                                    />
                                                                    <div className="absolute right-0 top-full mt-1 z-20 min-w-[120px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                                                                        <button
                                                                            onClick={() => handleDeleteUser(user.id)}
                                                                            className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                                                        >
                                                                            <RiDeleteBin6Line className="size-4" />
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                    
                    {filteredTenants.length === 0 && (
                        <div className="p-8 text-center">
                            <p className="text-gray-500 dark:text-gray-400">
                                No tenants or users found matching your criteria.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add User Modal */}
            <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Add tenant user</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="userName">Name</Label>
                                <Input
                                    id="userName"
                                    placeholder="Enter user name"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="userEmail">Email</Label>
                                <Input
                                    id="userEmail"
                                    type="email"
                                    placeholder="user@example.com"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="userTenant">Tenant</Label>
                                <select
                                    id="userTenant"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={newUser.tenant}
                                    onChange={(e) => setNewUser(prev => ({ ...prev, tenant: e.target.value }))}
                                >
                                    <option value="">Select tenant</option>
                                    {tenants.filter(t => t.status).map(tenant => (
                                        <option key={tenant.id} value={tenant.name}>{tenant.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="userRole">Role</Label>
                                <select
                                    id="userRole"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={newUser.role}
                                    onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as "Admin" | "User" }))}
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="userPhone">Phone</Label>
                                <Input
                                    id="userPhone"
                                    placeholder="(555) 123-4567"
                                    value={newUser.phone}
                                    onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="userDepartment">Department</Label>
                                <Input
                                    id="userDepartment"
                                    placeholder="Enter department"
                                    value={newUser.department}
                                    onChange={(e) => setNewUser(prev => ({ ...prev, department: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Permissions</Label>
                            <div className="flex gap-4">
                                {['Submit', 'Process', 'Approve'].map(permission => (
                                    <label key={permission} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={newUser.permissions.includes(permission)}
                                            onChange={() => handlePermissionToggle(permission)}
                                            className="rounded border-gray-300"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{permission}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsAddUserModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddUser}>
                            Add user
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit User Modal */}
            <Dialog open={isEditUserModalOpen} onOpenChange={setIsEditUserModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit user</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="editUserName">Name</Label>
                                <Input
                                    id="editUserName"
                                    placeholder="Enter user name"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="editUserEmail">Email</Label>
                                <Input
                                    id="editUserEmail"
                                    type="email"
                                    placeholder="user@example.com"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="editUserTenant">Tenant</Label>
                                <select
                                    id="editUserTenant"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={newUser.tenant}
                                    onChange={(e) => setNewUser(prev => ({ ...prev, tenant: e.target.value }))}
                                >
                                    <option value="">Select tenant</option>
                                    {tenants.filter(t => t.status).map(tenant => (
                                        <option key={tenant.id} value={tenant.name}>{tenant.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="editUserRole">Role</Label>
                                <select
                                    id="editUserRole"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={newUser.role}
                                    onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as "Admin" | "User" }))}
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="editUserPhone">Phone</Label>
                                <Input
                                    id="editUserPhone"
                                    placeholder="(555) 123-4567"
                                    value={newUser.phone}
                                    onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="editUserDepartment">Department</Label>
                                <Input
                                    id="editUserDepartment"
                                    placeholder="Enter department"
                                    value={newUser.department}
                                    onChange={(e) => setNewUser(prev => ({ ...prev, department: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Permissions</Label>
                            <div className="flex gap-4">
                                {['Submit', 'Process', 'Approve'].map(permission => (
                                    <label key={permission} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={newUser.permissions.includes(permission)}
                                            onChange={() => handlePermissionToggle(permission)}
                                            className="rounded border-gray-300"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{permission}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsEditUserModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdateUser}>
                            Update user
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

