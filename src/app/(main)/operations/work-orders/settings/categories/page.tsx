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

// Default categories data
const defaultCategories = [
    {
        id: 1,
        name: "Security",
        description: "Security-related service requests and incidents",
        status: true,
        serviceCount: 12
    },
    {
        id: 2,
        name: "Maintenance",
        description: "Building maintenance and repair requests",
        status: true,
        serviceCount: 18
    },
    {
        id: 3,
        name: "Cleaning",
        description: "Cleaning and janitorial service requests",
        status: true,
        serviceCount: 8
    },
    {
        id: 4,
        name: "Concierge",
        description: "Concierge and guest services",
        status: true,
        serviceCount: 6
    },
    {
        id: 5,
        name: "IT Support",
        description: "Technology and IT-related requests",
        status: true,
        serviceCount: 9
    },
    {
        id: 6,
        name: "HVAC",
        description: "Heating, ventilation, and air conditioning",
        status: false,
        serviceCount: 4
    },
    {
        id: 7,
        name: "Landscaping",
        description: "Outdoor maintenance and landscaping",
        status: false,
        serviceCount: 3
    }
]

export default function WorkOrdersCategories() {
    const pathname = usePathname()
    const [categories, setCategories] = useState(defaultCategories)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<typeof defaultCategories[0] | null>(null)
    const [isSetupModalOpen, setIsSetupModalOpen] = useState(false)
    const [newCategory, setNewCategory] = useState({
        name: "",
        description: ""
    })

    const handleStatusToggle = (id: number) => {
        setCategories(prev => 
            prev.map(category => 
                category.id === id ? { ...category, status: !category.status } : category
            )
        )
    }

    const handleAddCategory = () => {
        if (!newCategory.name.trim() || !newCategory.description.trim()) {
            return
        }

        const newId = Math.max(...categories.map(cat => cat.id)) + 1
        const category = {
            id: newId,
            ...newCategory,
            status: true,
            serviceCount: 0
        }

        setCategories(prev => [...prev, category])
        setNewCategory({
            name: "",
            description: ""
        })
        setIsAddCategoryModalOpen(false)
    }

    const handleEditCategory = (category: typeof defaultCategories[0]) => {
        setEditingCategory(category)
        setNewCategory({
            name: category.name,
            description: category.description
        })
        setIsAddCategoryModalOpen(true)
    }

    const handleUpdateCategory = () => {
        if (!editingCategory || !newCategory.name.trim() || !newCategory.description.trim()) {
            return
        }

        setCategories(prev => 
            prev.map(category => 
                category.id === editingCategory.id 
                    ? { ...category, name: newCategory.name, description: newCategory.description }
                    : category
            )
        )
        setEditingCategory(null)
        setNewCategory({
            name: "",
            description: ""
        })
        setIsAddCategoryModalOpen(false)
    }

    const handleDeleteCategory = (id: number) => {
        setCategories(prev => prev.filter(category => category.id !== id))
    }

    const filteredCategories = categories.filter(category => {
        const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            category.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "All" || 
                            (statusFilter === "Active" && category.status) ||
                            (statusFilter === "Inactive" && !category.status)
        
        return matchesSearch && matchesStatus
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

            {/* Categories Content */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                            Service Categories
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {categories.filter(cat => cat.status).length} of {categories.length} categories enabled
                        </p>
                    </div>
                    <Button variant="ghost" onClick={() => setIsAddCategoryModalOpen(true)}>
                        <RiAddLine className="size-4 mr-1.5" />
                        Add Category
                    </Button>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center justify-between gap-4">
                    <div className="relative max-w-sm">
                        <input
                            type="text"
                            placeholder="Search categories..."
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
                            <option>All</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Categories Table */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Category Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Service Types
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
                            {filteredCategories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                            {category.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {category.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-50">
                                        {category.serviceCount} types
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Switch
                                            checked={category.status}
                                            onCheckedChange={() => handleStatusToggle(category.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="p-2 h-8 w-8"
                                                onClick={() => handleEditCategory(category)}
                                            >
                                                <RiEdit2Line className="size-4" />
                                            </Button>
                                            
                                            {category.serviceCount === 0 && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="p-2 h-8 w-8 text-red-600 hover:text-red-700"
                                                    onClick={() => handleDeleteCategory(category.id)}
                                                >
                                                    <RiDeleteBin6Line className="size-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Category Modal */}
            <Dialog open={isAddCategoryModalOpen} onOpenChange={setIsAddCategoryModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {editingCategory ? "Edit Category" : "Add New Category"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="category-name">Category name</Label>
                            <input
                                type="text"
                                id="category-name"
                                placeholder="e.g., Security"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category-description">Description</Label>
                            <input
                                type="text"
                                id="category-description"
                                placeholder="Brief description of this category"
                                value={newCategory.description}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button 
                            variant="ghost" 
                            onClick={() => {
                                setIsAddCategoryModalOpen(false)
                                setEditingCategory(null)
                                setNewCategory({ name: "", description: "" })
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="primary" 
                            onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                        >
                            {editingCategory ? "Update" : "Add"} Category
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
