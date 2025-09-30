"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RiAddLine, RiArrowLeftLine, RiDeleteBin6Line, RiEdit2Line } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Work Orders Settings page
const tabs = [
    { name: "Settings", href: "/operations/work-orders/settings/general" },
    { name: "Teams", href: "/operations/work-orders/settings/teams" },
    { name: "Categories", href: "/operations/work-orders/settings/categories" },
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
                <Button variant="primary">
                    Save
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

                {/* Filters */}
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Search categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div>
                        <select 
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Categories List */}
                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-600 dark:text-gray-300">
                                        Category Name
                                    </th>
                                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-600 dark:text-gray-300">
                                        Description
                                    </th>
                                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-600 dark:text-gray-300">
                                        Service Types
                                    </th>
                                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-600 dark:text-gray-300">
                                        Status
                                    </th>
                                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-600 dark:text-gray-300">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCategories.map((category) => (
                                    <tr key={category.id} className="border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                                        <td className="py-4 px-4">
                                            <div className="font-medium text-gray-900 dark:text-gray-50">
                                                {category.name}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="text-sm text-gray-600 dark:text-gray-300">
                                                {category.description}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="text-sm text-gray-600 dark:text-gray-300">
                                                {category.serviceCount} types
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    checked={category.status}
                                                    onCheckedChange={() => handleStatusToggle(category.id)}
                                                />
                                                <Badge 
                                                    variant={category.status ? "success" : "secondary"}
                                                >
                                                    {category.status ? "Active" : "Inactive"}
                                                </Badge>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEditCategory(category)}
                                                >
                                                    <RiEdit2Line className="size-4" />
                                                </Button>
                                                {category.serviceCount === 0 && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteCategory(category.id)}
                                                        className="text-red-600 hover:text-red-700"
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
                </Card>
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
                            <Input
                                id="category-name"
                                placeholder="e.g., Security"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category-description">Description</Label>
                            <Input
                                id="category-description"
                                placeholder="Brief description of this category"
                                value={newCategory.description}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
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
        </div>
    )
}
