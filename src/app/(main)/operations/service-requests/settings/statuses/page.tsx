"use client"

import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
import { Label } from "@/components/Label"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { Tooltip } from "@/components/Tooltip"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FullPageModal } from "@/components/ui/FullPageModal"
import { ServiceRequestSetupWizard } from "@/components/ui/service-requests/ServiceRequestSetupWizard"
import { serviceRequestStatuses } from "@/data/statuses"
import { RiAddLine, RiArrowDownSLine, RiArrowLeftLine, RiArrowRightSLine, RiDeleteBin6Line } from "@remixicon/react"
import { Pencil, Lock } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

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

// Use shared statuses data - this will be updated when new statuses are created
const defaultStatuses = serviceRequestStatuses

// Request types organized by category (copied from teams page)
const requestTypesByCategory = {
    Security: ['Access Request', 'Key Card Request', 'Visitor Access', 'Security Incident'],
    Maintenance: ['HVAC Issue', 'Plumbing Repair', 'Electrical Problem', 'General Repair'],
    Cleaning: ['Deep Cleaning', 'Carpet Cleaning', 'Window Cleaning', 'Waste Removal'],
    Concierge: ['Package Delivery', 'Event Setup', 'Guest Services', 'Information Request']
}

// Color options for custom statuses
const statusColors = [
    { name: "Blue", value: "blue", bgClass: "bg-blue-400", textClass: "text-blue-800", bgLight: "bg-blue-50" },
    { name: "Green", value: "green", bgClass: "bg-green-400", textClass: "text-green-800", bgLight: "bg-green-50" },
    { name: "Yellow", value: "yellow", bgClass: "bg-yellow-400", textClass: "text-yellow-800", bgLight: "bg-yellow-50" },
    { name: "Orange", value: "orange", bgClass: "bg-orange-400", textClass: "text-orange-800", bgLight: "bg-orange-50" },
    { name: "Red", value: "red", bgClass: "bg-red-400", textClass: "text-red-800", bgLight: "bg-red-50" },
    { name: "Purple", value: "purple", bgClass: "bg-purple-400", textClass: "text-purple-800", bgLight: "bg-purple-50" },
    { name: "Gray", value: "gray", bgClass: "bg-gray-400", textClass: "text-gray-800", bgLight: "bg-gray-50" },
    { name: "Pink", value: "pink", bgClass: "bg-pink-400", textClass: "text-pink-800", bgLight: "bg-pink-50" },
    { name: "Indigo", value: "indigo", bgClass: "bg-indigo-400", textClass: "text-indigo-800", bgLight: "bg-indigo-50" },
    { name: "Teal", value: "teal", bgClass: "bg-teal-400", textClass: "text-teal-800", bgLight: "bg-teal-50" },
]

// Preset status colors (cannot be changed)
const presetStatusColors = {
    "New": "purple",
    "In Progress": "orange",
    "Completed": "green",
    "Denied": "pink",
    "Cancelled": "gray",
    "Assigned to Building": "blue",
    "Failed": "red"
}

export default function ServiceRequestsStatuses() {
    const pathname = usePathname()
    
    // Load statuses from localStorage or use default
    const [statuses, setStatuses] = useState<typeof defaultStatuses>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('serviceRequestStatuses')
            if (saved) {
                const parsedStatuses = JSON.parse(saved)
                // Ensure "New" status always exists
                const hasNewStatus = parsedStatuses.some((s: typeof defaultStatuses[0]) => s.name === "New")
                if (!hasNewStatus) {
                    const newStatus = defaultStatuses.find(s => s.name === "New")
                    if (newStatus) {
                        return [newStatus, ...parsedStatuses]
                    }
                }
                return parsedStatuses
            }
            return defaultStatuses
        }
        return defaultStatuses
    })
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [isAddStatusModalOpen, setIsAddStatusModalOpen] = useState(false)
    const [editingStatus, setEditingStatus] = useState<typeof defaultStatuses[0] | null>(null)
    const [isSetupModalOpen, setIsSetupModalOpen] = useState(false)
    const [newStatus, setNewStatus] = useState({
        name: "",
        description: "",
        color: "blue",
        requestTypes: [] as string[],
        notificationSettings: {} as Record<string, { notifyRequestor: boolean; notifyAssignee: boolean }>
    })
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

    const handleStatusToggle = (id: number) => {
        setStatuses(prev => prev.map(status => 
            status.id === id ? { ...status, status: !status.status } : status
        ))
    }

    // Helper function to get color classes
    const getColorClasses = (color: string) => {
        const colorOption = statusColors.find(c => c.value === color)
        return colorOption || statusColors[0] // Default to blue if not found
    }

    const toggleCategoryExpansion = (category: string) => {
        setExpandedCategories(prev => {
            const newExpanded = new Set(prev)
            if (newExpanded.has(category)) {
                newExpanded.delete(category)
            } else {
                newExpanded.add(category)
            }
            return newExpanded
        })
    }

    const handleRequestTypeToggle = (requestType: string) => {
        setNewStatus(prev => {
            const isCurrentlySelected = prev.requestTypes.includes(requestType)
            const newRequestTypes = isCurrentlySelected
                ? prev.requestTypes.filter(type => type !== requestType)
                : [...prev.requestTypes, requestType]
            
            // Update notification settings
            const newNotificationSettings = { ...prev.notificationSettings }
            if (isCurrentlySelected) {
                // Remove notification settings when deselecting
                delete newNotificationSettings[requestType]
            } else {
                // Add default notification settings when selecting
                newNotificationSettings[requestType] = {
                    notifyRequestor: true,
                    notifyAssignee: true
                }
            }
            
            return {
                ...prev,
                requestTypes: newRequestTypes,
                notificationSettings: newNotificationSettings
            }
        })
    }

    const handleNotificationToggle = (requestType: string, notificationType: 'requestor' | 'assignee') => {
        setNewStatus(prev => ({
            ...prev,
            notificationSettings: {
                ...prev.notificationSettings,
                [requestType]: {
                    ...prev.notificationSettings[requestType],
                    [notificationType === 'requestor' ? 'notifyRequestor' : 'notifyAssignee']: 
                        !prev.notificationSettings[requestType]?.[notificationType === 'requestor' ? 'notifyRequestor' : 'notifyAssignee']
                }
            }
        }))
    }

    const handleCategoryToggle = (category: string) => {
        const categoryRequestTypes = requestTypesByCategory[category as keyof typeof requestTypesByCategory]
        const allCategoryTypesSelected = categoryRequestTypes.every(type => 
            newStatus.requestTypes.includes(type)
        )

        setNewStatus(prev => {
            const newRequestTypes = allCategoryTypesSelected
                ? prev.requestTypes.filter(type => !categoryRequestTypes.includes(type))
                : Array.from(new Set([...prev.requestTypes, ...categoryRequestTypes]))
            
            // Update notification settings
            const newNotificationSettings = { ...prev.notificationSettings }
            if (allCategoryTypesSelected) {
                // Remove notification settings for all types in this category
                categoryRequestTypes.forEach(type => {
                    delete newNotificationSettings[type]
                })
            } else {
                // Add default notification settings for all types in this category
                categoryRequestTypes.forEach(type => {
                    newNotificationSettings[type] = {
                        notifyRequestor: true,
                        notifyAssignee: true
                    }
                })
            }
            
            return {
                ...prev,
                requestTypes: newRequestTypes,
                notificationSettings: newNotificationSettings
            }
        })

        // Expand the category if we're selecting it
        if (!allCategoryTypesSelected) {
            setExpandedCategories(prev => {
                const newSet = new Set(prev)
                newSet.add(category)
                return newSet
            })
        }
    }

    const isCategoryFullySelected = (category: string) => {
        const categoryRequestTypes = requestTypesByCategory[category as keyof typeof requestTypesByCategory]
        return categoryRequestTypes.every(type => newStatus.requestTypes.includes(type))
    }

    const isCategoryPartiallySelected = (category: string) => {
        const categoryRequestTypes = requestTypesByCategory[category as keyof typeof requestTypesByCategory]
        return categoryRequestTypes.some(type => newStatus.requestTypes.includes(type)) &&
               !categoryRequestTypes.every(type => newStatus.requestTypes.includes(type))
    }

    const handleAddStatus = () => {
        if (!newStatus.name.trim() || !newStatus.description.trim()) return

        const newId = Math.max(...statuses.map(s => s.id)) + 1
        const newStatusItem = {
            id: newId,
            name: newStatus.name,
            description: newStatus.description,
            status: true,
            color: newStatus.color,
            orderCount: 0
        }

        const updatedStatuses = [...statuses, newStatusItem]
        setStatuses(updatedStatuses)
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('serviceRequestStatuses', JSON.stringify(updatedStatuses))
        }
        
        setNewStatus({ name: "", description: "", color: "blue", requestTypes: [], notificationSettings: {} })
        setExpandedCategories(new Set())
        setIsAddStatusModalOpen(false)
    }

    const handleEditStatus = (status: typeof defaultStatuses[0]) => {
        setEditingStatus(status)
        setNewStatus({
            name: status.name,
            description: status.description,
            color: status.color,
            requestTypes: (status as any).requestTypes || [],
            notificationSettings: (status as any).notificationSettings || {}
        })
        
        // Auto-expand categories that have selected request types
        const categoriesToExpand = new Set<string>()
        Object.entries(requestTypesByCategory).forEach(([category, requestTypes]) => {
            if (requestTypes.some(type => ((status as any).requestTypes || []).includes(type))) {
                categoriesToExpand.add(category)
            }
        })
        setExpandedCategories(categoriesToExpand)
        
        setIsAddStatusModalOpen(true)
    }

    const handleUpdateStatus = () => {
        if (!newStatus.name.trim() || !newStatus.description.trim() || !editingStatus) return

        // Only allow color changes for custom statuses (not preset ones)
        const updatedStatus = {
            ...editingStatus,
            name: newStatus.name,
            description: newStatus.description,
            requestTypes: newStatus.requestTypes,
            notificationSettings: newStatus.notificationSettings
        }

        // If it's not a preset status, allow color change
        if (!presetStatusColors[editingStatus.name as keyof typeof presetStatusColors]) {
            updatedStatus.color = newStatus.color
        }

        const updatedStatuses = statuses.map(status => 
            status.id === editingStatus.id ? updatedStatus : status
        )
        setStatuses(updatedStatuses)
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('serviceRequestStatuses', JSON.stringify(updatedStatuses))
        }
        
        setEditingStatus(null)
        setNewStatus({ name: "", description: "", color: "blue", requestTypes: [], notificationSettings: {} })
        setExpandedCategories(new Set())
        setIsAddStatusModalOpen(false)
    }

    const handleDeleteStatus = (id: number) => {
        // Prevent deletion of "New" status
        const statusToDelete = statuses.find(status => status.id === id)
        if (statusToDelete?.name === "New") {
            return
        }
        
        const updatedStatuses = statuses.filter(status => status.id !== id)
        setStatuses(updatedStatuses)
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('serviceRequestStatuses', JSON.stringify(updatedStatuses))
        }
    }

    const filteredStatuses = statuses.filter(status => {
        const matchesSearch = status.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            status.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = statusFilter === "All" || 
                            (statusFilter === "Enabled" && status.status) ||
                            (statusFilter === "Disabled" && !status.status)
        return matchesSearch && matchesFilter
    })

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
                    <Button 
                        variant="ghost" 
                        onClick={() => setIsSetupModalOpen(true)}
                    >
                        Setup wizard
                    </Button>
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

            {/* Statuses Content */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                            Status management
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Manage service request statuses and define custom status types for your workflow
                        </p>
                    </div>
                    <Button 
                        variant="ghost" 
                        onClick={() => {
                            setEditingStatus(null)
                            setNewStatus({ name: "", description: "", color: "blue", requestTypes: [], notificationSettings: {} })
                            setExpandedCategories(new Set())
                            setIsAddStatusModalOpen(true)
                        }}
                    >
                        <RiAddLine className="size-4 mr-1.5" />
                        Add status
                    </Button>
                </div>

                {/* Search and Filter */}
                <div className="flex items-center justify-between gap-4">
                    <div className="relative max-w-sm">
                        <input
                            type="text"
                            placeholder="Search by status name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="All">All statuses</option>
                            <option value="Enabled">Enabled only</option>
                            <option value="Disabled">Disabled only</option>
                        </select>
                    </div>
                </div>

                {/* Statuses Table */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type count</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enable</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredStatuses.map((status) => (
                                <tr key={status.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${getColorClasses(status.color).bgClass}`}></div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {status.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                                            {status.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 dark:text-gray-100">
                                            {status.orderCount}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {status.name === "New" ? (
                                            <Tooltip content="New status is required and can't be disabled">
                                                <div>
                                                    <Switch
                                                        checked={status.status}
                                                        disabled={true}
                                                        onCheckedChange={() => {}}
                                                    />
                                                </div>
                                            </Tooltip>
                                        ) : (
                                            <Switch
                                                checked={status.status}
                                                onCheckedChange={() => handleStatusToggle(status.id)}
                                            />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEditStatus(status)}
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                            >
                                                <Pencil className="size-4" style={{ color: '#696E72' }} />
                                            </button>
                                            {status.name === "New" ? (
                                                <Tooltip content="New status is required and can't be deleted">
                                                    <div>
                                                        <button
                                                            disabled
                                                            className="text-gray-300 dark:text-gray-600 cursor-not-allowed"
                                                        >
                                                            <RiDeleteBin6Line className="size-4" />
                                                        </button>
                                                    </div>
                                                </Tooltip>
                                            ) : (
                                                <button
                                                    onClick={() => handleDeleteStatus(status.id)}
                                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                >
                                                    <RiDeleteBin6Line className="size-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredStatuses.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No statuses found matching your search criteria.
                    </div>
                )}
            </div>

            {/* Add/Edit Status Modal */}
            <Dialog open={isAddStatusModalOpen} onOpenChange={setIsAddStatusModalOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingStatus ? 'Edit status' : 'Add new status'}</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 px-6 py-4 overflow-y-auto flex-1">
                        <div>
                            <Label htmlFor="status-name">Status name *</Label>
                            <input
                                id="status-name"
                                type="text"
                                placeholder="Enter status name"
                                value={newStatus.name}
                                onChange={(e) => setNewStatus(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="status-description">Description *</Label>
                            <input
                                id="status-description"
                                type="text"
                                placeholder="Enter status description"
                                value={newStatus.description}
                                onChange={(e) => setNewStatus(prev => ({ ...prev, description: e.target.value }))}
                                className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        
                        {/* Color Selection - Only for custom statuses */}
                        {(!editingStatus || !presetStatusColors[editingStatus.name as keyof typeof presetStatusColors]) && (
                            <div>
                                <Label>Color</Label>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                    Choose a color for this status
                                </p>
                                <div className="grid grid-cols-5 gap-2">
                                    {statusColors.map((colorOption) => (
                                        <button
                                            key={colorOption.value}
                                            type="button"
                                            onClick={() => setNewStatus(prev => ({ ...prev, color: colorOption.value }))}
                                            className={`relative p-3 rounded-lg border-2 transition-all ${
                                                newStatus.color === colorOption.value
                                                    ? 'border-gray-900 dark:border-gray-100 ring-2 ring-offset-2 ring-gray-500'
                                                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                            } ${colorOption.bgLight} ${colorOption.textClass}`}
                                            title={colorOption.name}
                                        >
                                            <div className={`w-4 h-4 rounded-full ${colorOption.bgClass} mx-auto`}></div>
                                            <div className="text-xs mt-1 text-center font-medium">
                                                {colorOption.name}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Show preset color info for default statuses */}
                        {editingStatus && presetStatusColors[editingStatus.name as keyof typeof presetStatusColors] && (
                            <div>
                                <Label>Color</Label>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                    This is a default status with a preset color that can't be changed
                                </p>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div className={`w-4 h-4 rounded-full ${getColorClasses(editingStatus.color).bgClass}`}></div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {getColorClasses(editingStatus.color).name}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Service categories & request types section */}
                        <div>
                            <Label>Service categories & request types</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                Select categories and configure notification settings for each
                            </p>
                            
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Category / Request type
                                            </th>
                                            <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Notify requestor
                                            </th>
                                            <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Notify assignee
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                        {Object.entries(requestTypesByCategory).map(([category, requestTypes]) => {
                                            const isExpanded = expandedCategories.has(category)
                                            const isFullySelected = isCategoryFullySelected(category)
                                            const isPartiallySelected = isCategoryPartiallySelected(category)
                                            
                                            return (
                                                <>
                                                    {/* Category Row */}
                                                    <tr key={`category-${category}`} className="bg-gray-50 dark:bg-gray-800/50">
                                                        <td className="px-3 py-2">
                                                            <div className="flex items-center space-x-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => toggleCategoryExpansion(category)}
                                                                    className="flex items-center justify-center w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                                >
                                                                    {isExpanded ? (
                                                                        <RiArrowDownSLine className="w-4 h-4" />
                                                                    ) : (
                                                                        <RiArrowRightSLine className="w-4 h-4" />
                                                                    )}
                                                                </button>
                                                                {editingStatus?.name === "New" ? (
                                                                    <Tooltip content="New status is required and can't be disabled">
                                                                        <div className="flex items-center">
                                                                            <Lock className="size-4 text-gray-400" />
                                                                        </div>
                                                                    </Tooltip>
                                                                ) : (
                                                                    <Checkbox
                                                                        id={`category-${category}`}
                                                                        checked={isFullySelected ? true : isPartiallySelected ? "indeterminate" : false}
                                                                        onCheckedChange={() => handleCategoryToggle(category)}
                                                                    />
                                                                )}
                                                                <label 
                                                                    htmlFor={`category-${category}`} 
                                                                    className="font-medium text-sm text-gray-900 dark:text-gray-100 cursor-pointer"
                                                                    onClick={() => toggleCategoryExpansion(category)}
                                                                >
                                                                    {category}
                                                                </label>
                                                                {editingStatus?.name !== "New" && (
                                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                        ({requestTypes.filter(type => newStatus.requestTypes.includes(type)).length}/{requestTypes.length})
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-3 py-2 text-center">
                                                            <span className="text-gray-400 dark:text-gray-500">-</span>
                                                        </td>
                                                        <td className="px-3 py-2 text-center">
                                                            <span className="text-gray-400 dark:text-gray-500">-</span>
                                                        </td>
                                                    </tr>
                                                    
                                                    {/* Request Types (when expanded) */}
                                                    {isExpanded && requestTypes.map((requestType) => {
                                                        const isSelected = newStatus.requestTypes.includes(requestType)
                                                        
                                                        return (
                                                            <tr key={`request-${requestType}`} className="bg-white dark:bg-gray-900">
                                                                <td className="px-3 py-2 pl-8">
                                                                    <div className="flex items-center space-x-2">
                                                                        {editingStatus?.name === "New" ? (
                                                                            <Tooltip content="New status is required and can't be disabled">
                                                                                <div className="flex items-center">
                                                                                    <Lock className="size-4 text-gray-400" />
                                                                                </div>
                                                                            </Tooltip>
                                                                        ) : (
                                                                            <Checkbox
                                                                                id={`request-${requestType}`}
                                                                                checked={isSelected}
                                                                                onCheckedChange={() => handleRequestTypeToggle(requestType)}
                                                                            />
                                                                        )}
                                                                        <label htmlFor={`request-${requestType}`} className="text-sm text-gray-700 dark:text-gray-300">
                                                                            {requestType}
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td className="px-3 py-2 text-center">
                                                                    {isSelected ? (
                                                                        <Switch
                                                                            checked={newStatus.notificationSettings[requestType]?.notifyRequestor || false}
                                                                            onCheckedChange={() => handleNotificationToggle(requestType, 'requestor')}
                                                                        />
                                                                    ) : (
                                                                        <span className="text-gray-400 dark:text-gray-500">-</span>
                                                                    )}
                                                                </td>
                                                                <td className="px-3 py-2 text-center">
                                                                    {isSelected ? (
                                                                        <Switch
                                                                            checked={newStatus.notificationSettings[requestType]?.notifyAssignee || false}
                                                                            onCheckedChange={() => handleNotificationToggle(requestType, 'assignee')}
                                                                        />
                                                                    ) : (
                                                                        <span className="text-gray-400 dark:text-gray-500">-</span>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <DialogFooter>
                        <Button 
                            variant="ghost" 
                            onClick={() => {
                                setIsAddStatusModalOpen(false)
                                setEditingStatus(null)
                                setNewStatus({ name: "", description: "", color: "blue", requestTypes: [], notificationSettings: {} })
                                setExpandedCategories(new Set())
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="primary" 
                            onClick={editingStatus ? handleUpdateStatus : handleAddStatus}
                        >
                            {editingStatus ? "Update" : "Add"} status
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Setup Modal */}
            <FullPageModal
                isOpen={isSetupModalOpen}
                onClose={() => setIsSetupModalOpen(false)}
                title="Service Request Setup"
            >
                <ServiceRequestSetupWizard
                    onComplete={() => setIsSetupModalOpen(false)}
                    onClose={() => setIsSetupModalOpen(false)}
                />
            </FullPageModal>
        </div>
    )
}
