"use client"

import { Button } from "@/components/Button"
import { Label } from "@/components/Label"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FullPageModal } from "@/components/ui/FullPageModal"
import { RiAddLine, RiArrowLeftLine, RiDeleteBin6Line, RiEdit2Line, RiSettings3Line } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Work Orders Settings page
const tabs = [
    { name: "Settings", href: "/operations/work-orders/settings/general" },
    { name: "Teams", href: "/operations/work-orders/settings/teams" },
    { name: "Categories", href: "/operations/work-orders/settings/categories" },
    { name: "Statuses", href: "/operations/work-orders/settings/statuses" },
    { name: "Service Types", href: "/operations/work-orders/settings" },
]

// Default statuses data based on the image provided
const defaultStatuses = [
    {
        id: 1,
        name: "New",
        description: "Newly created work orders awaiting review",
        status: true,
        color: "yellow",
        orderCount: 45
    },
    {
        id: 2,
        name: "Open",
        description: "Work orders that have been reviewed and are ready to be worked on",
        status: true,
        color: "blue",
        orderCount: 23
    },
    {
        id: 3,
        name: "In Progress",
        description: "Work orders currently being worked on",
        status: true,
        color: "purple",
        orderCount: 18
    },
    {
        id: 4,
        name: "Pending",
        description: "Work orders waiting for additional information or resources",
        status: true,
        color: "orange",
        orderCount: 12
    },
    {
        id: 5,
        name: "Completed",
        description: "Successfully completed work orders",
        status: true,
        color: "green",
        orderCount: 156
    },
    {
        id: 6,
        name: "Cancelled",
        description: "Work orders that have been cancelled",
        status: true,
        color: "red",
        orderCount: 8
    },
    {
        id: 7,
        name: "On Hold",
        description: "Work orders temporarily paused or suspended",
        status: true,
        color: "gray",
        orderCount: 5
    }
]

export default function WorkOrdersStatuses() {
    const pathname = usePathname()
    const [statuses, setStatuses] = useState(defaultStatuses)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [isAddStatusModalOpen, setIsAddStatusModalOpen] = useState(false)
    const [editingStatus, setEditingStatus] = useState<typeof defaultStatuses[0] | null>(null)
    const [isSetupModalOpen, setIsSetupModalOpen] = useState(false)
    const [newStatus, setNewStatus] = useState({
        name: "",
        description: ""
    })

    const handleStatusToggle = (id: number) => {
        setStatuses(prev => prev.map(status => 
            status.id === id ? { ...status, status: !status.status } : status
        ))
    }

    const handleAddStatus = () => {
        if (!newStatus.name.trim() || !newStatus.description.trim()) return

        const newId = Math.max(...statuses.map(s => s.id)) + 1
        const newStatusItem = {
            id: newId,
            name: newStatus.name,
            description: newStatus.description,
            status: true,
            color: "blue",
            orderCount: 0
        }

        setStatuses(prev => [...prev, newStatusItem])
        setNewStatus({ name: "", description: "" })
        setIsAddStatusModalOpen(false)
    }

    const handleEditStatus = (status: typeof defaultStatuses[0]) => {
        setEditingStatus(status)
        setNewStatus({
            name: status.name,
            description: status.description
        })
        setIsAddStatusModalOpen(true)
    }

    const handleUpdateStatus = () => {
        if (!newStatus.name.trim() || !newStatus.description.trim() || !editingStatus) return

        setStatuses(prev => prev.map(status => 
            status.id === editingStatus.id 
                ? { ...status, name: newStatus.name, description: newStatus.description }
                : status
        ))
        
        setEditingStatus(null)
        setNewStatus({ name: "", description: "" })
        setIsAddStatusModalOpen(false)
    }

    const handleDeleteStatus = (id: number) => {
        setStatuses(prev => prev.filter(status => status.id !== id))
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
                    href="/operations/work-orders"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <RiArrowLeftLine className="mr-1 size-4" />
                    Work Orders
                </Link>
            </div>

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                        Work order settings
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <Button 
                        variant="ghost" 
                        onClick={() => setIsSetupModalOpen(true)}
                    >
                        <RiSettings3Line className="size-4 mr-1.5" />
                        Setup
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
                            Manage work order statuses and define custom status types for your workflow
                        </p>
                    </div>
                    <Button 
                        variant="ghost" 
                        onClick={() => {
                            setEditingStatus(null)
                            setNewStatus({ name: "", description: "" })
                            setIsAddStatusModalOpen(true)
                        }}
                    >
                        <RiAddLine className="size-4 mr-1.5" />
                        Add status
                    </Button>
                </div>

                {/* Search and Filter */}
                <div className="flex items-center gap-4">
                    <div className="flex-1 max-w-sm">
                        <input
                            type="text"
                            placeholder="Search by status name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="All">All statuses</option>
                        <option value="Enabled">Enabled only</option>
                        <option value="Disabled">Disabled only</option>
                    </select>
                </div>

                {/* Statuses Table */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Count</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredStatuses.map((status) => (
                                <tr key={status.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full bg-${status.color}-400`}></div>
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
                                        <Switch
                                            checked={status.status}
                                            onCheckedChange={() => handleStatusToggle(status.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEditStatus(status)}
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                            >
                                                <RiEdit2Line className="size-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteStatus(status.id)}
                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                <RiDeleteBin6Line className="size-4" />
                                            </button>
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
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingStatus ? 'Edit Status' : 'Add New Status'}</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="status-name">Status Name *</Label>
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
                    </div>
                    
                    <div className="flex items-center justify-end gap-3 mt-6">
                        <Button 
                            variant="ghost" 
                            onClick={() => {
                                setIsAddStatusModalOpen(false)
                                setEditingStatus(null)
                                setNewStatus({ name: "", description: "" })
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="primary" 
                            onClick={editingStatus ? handleUpdateStatus : handleAddStatus}
                        >
                            {editingStatus ? "Update" : "Add"} Status
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Setup Modal */}
            <FullPageModal
                isOpen={isSetupModalOpen}
                onClose={() => setIsSetupModalOpen(false)}
                title="Service Request Setup"
                iframeUrl="https://v0-workflow-system-design-sage.vercel.app/"
            />
        </div>
    )
}
