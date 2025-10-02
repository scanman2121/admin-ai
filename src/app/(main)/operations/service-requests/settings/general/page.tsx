"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Checkbox } from "@/components/Checkbox"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/Dialog"
import { Input } from "@/components/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { Switch } from "@/components/Switch"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/Table"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { FullPageModal } from "@/components/ui/FullPageModal"
import { RiAddLine, RiArrowDownSLine, RiArrowLeftLine, RiArrowRightSLine, RiDeleteBinLine, RiEditLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Service Requests Settings page
const tabs = [
    { name: "Settings", href: "/operations/service-requests/settings/general" },
    { name: "Teams", href: "/operations/service-requests/settings/teams" },
    { name: "Service types", href: "/operations/service-requests/settings/service-types-categories" },
    { name: "Statuses", href: "/operations/service-requests/settings/statuses" },
]

// Field types for custom fields
const fieldTypes = [
    { value: "text", label: "Text Input" },
    { value: "textarea", label: "Textarea" },
    { value: "dropdown", label: "Dropdown" },
    { value: "checkbox", label: "Checkbox" },
    { value: "number", label: "Number" },
    { value: "date", label: "Date" },
    { value: "file", label: "File Upload" }
]

// Service types for field assignment
const serviceTypes = [
    { value: "maintenance", label: "Maintenance" },
    { value: "cleaning", label: "Cleaning" },
    { value: "security", label: "Security" },
    { value: "it", label: "IT Support" },
    { value: "facilities", label: "Facilities" },
    { value: "all", label: "All Service Types" }
]

// Request types organized by category
const requestTypesByCategory = {
    Security: ['Access Request', 'Key Card Request', 'Visitor Access', 'Security Incident'],
    Maintenance: ['HVAC Issue', 'Plumbing Repair', 'Electrical Problem', 'General Repair'],
    Cleaning: ['Deep Cleaning', 'Carpet Cleaning', 'Window Cleaning', 'Waste Removal'],
    Concierge: ['Package Delivery', 'Event Setup', 'Guest Services', 'Information Request']
}

export default function ServiceRequestsGeneralSettings() {
    const pathname = usePathname()
    
    // Form Fields state with enhanced structure for custom fields
    const [formFields, setFormFields] = useState([
        {
            id: "location",
            name: "Location",
            description: "Building, floor, room number",
            type: "text",
            enabled: true,
            required: true,
            serviceTypes: ["all"],
            isCore: true,
            options: [] as string[]
        },
        {
            id: "description",
            name: "Description",
            description: "Detailed issue description",
            type: "textarea",
            enabled: true,
            required: true,
            serviceTypes: ["all"],
            isCore: true,
            options: [] as string[]
        },
        {
            id: "attachments",
            name: "Attachments",
            description: "Photo/file uploads",
            type: "file",
            enabled: true,
            required: false,
            serviceTypes: ["all"],
            isCore: true,
            options: [] as string[]
        }
    ])
    
    // Notifications state
    const [notifications, setNotifications] = useState({
        notifyRequestor: true,
        notifyAssignedTeam: true,
        notifyOnStatusChanges: true
    })
    
    // Setup modal state
    const [isSetupModalOpen, setIsSetupModalOpen] = useState(false)
    
    // Field management modal states
    const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false)
    const [isEditFieldModalOpen, setIsEditFieldModalOpen] = useState(false)
    const [editingField, setEditingField] = useState<typeof formFields[0] | null>(null)
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
    
    // New field form state
    const [newField, setNewField] = useState({
        name: "",
        description: "",
        type: "text",
        required: false,
        serviceTypes: ["all"],
        options: [] as string[]
    })
    
    const handleFormFieldToggle = (fieldId: string) => {
        setFormFields(prev => prev.map(field => 
            field.id === fieldId 
                ? { ...field, enabled: !field.enabled }
                : field
        ))
    }
    
    const handleRequiredFieldToggle = (fieldId: string) => {
        setFormFields(prev => prev.map(field => 
            field.id === fieldId 
                ? { ...field, required: !field.required }
                : field
        ))
    }
    
    const handleNotificationToggle = (field: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [field]: !prev[field] }))
    }
    
    const handleAddField = () => {
        const fieldId = newField.name.toLowerCase().replace(/\s+/g, '-')
        const newFieldData = {
            id: fieldId,
            name: newField.name,
            description: newField.description,
            type: newField.type,
            enabled: true,
            required: newField.required,
            serviceTypes: newField.serviceTypes,
            isCore: false,
            options: newField.options
        }
        
        setFormFields(prev => [...prev, newFieldData])
        setNewField({
            name: "",
            description: "",
            type: "text",
            required: false,
            serviceTypes: ["all"],
            options: []
        })
        setIsAddFieldModalOpen(false)
    }
    
    const handleEditField = (fieldId: string) => {
        const field = formFields.find(f => f.id === fieldId)
        if (field) {
            setEditingField(field)
            setIsEditFieldModalOpen(true)
        }
    }
    
    const handleUpdateField = () => {
        if (!editingField) return
        
        setFormFields(prev => prev.map(field => 
            field.id === editingField.id 
                ? { ...editingField, ...newField }
                : field
        ))
        setEditingField(null)
        setIsEditFieldModalOpen(false)
        setNewField({
            name: "",
            description: "",
            type: "text",
            required: false,
            serviceTypes: ["all"],
            options: []
        })
    }
    
    const handleDeleteField = (fieldId: string) => {
        const field = formFields.find(f => f.id === fieldId)
        if (field && !field.isCore) {
            setFormFields(prev => prev.filter(f => f.id !== fieldId))
        }
    }
    
    const handleNewFieldChange = (field: string, value: any) => {
        setNewField(prev => ({ ...prev, [field]: value }))
    }
    
    const handleAddOption = () => {
        setNewField(prev => ({
            ...prev,
            options: [...prev.options, ""]
        }))
    }
    
    const handleOptionChange = (index: number, value: string) => {
        setNewField(prev => ({
            ...prev,
            options: prev.options.map((opt, i) => i === index ? value : opt)
        }))
    }
    
    const handleRemoveOption = (index: number) => {
        setNewField(prev => ({
            ...prev,
            options: prev.options.filter((_, i) => i !== index)
        }))
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
    
    const handleCategoryToggle = (category: string) => {
        const categoryRequestTypes = requestTypesByCategory[category as keyof typeof requestTypesByCategory]
        const allCategoryTypesSelected = categoryRequestTypes.every(type => 
            newField.serviceTypes.includes(type.toLowerCase().replace(/\s+/g, '-'))
        )

        setNewField(prev => ({
            ...prev,
            serviceTypes: allCategoryTypesSelected
                ? prev.serviceTypes.filter(type => !categoryRequestTypes.some(rt => rt.toLowerCase().replace(/\s+/g, '-') === type))
                : Array.from(new Set([...prev.serviceTypes, ...categoryRequestTypes.map(rt => rt.toLowerCase().replace(/\s+/g, '-'))]))
        }))

        // Expand the category if we're selecting it
        if (!allCategoryTypesSelected) {
            setExpandedCategories(prev => {
                const newSet = new Set(prev)
                newSet.add(category)
                return newSet
            })
        }
    }
    
    const handleRequestTypeToggle = (requestType: string) => {
        const typeKey = requestType.toLowerCase().replace(/\s+/g, '-')
        setNewField(prev => ({
            ...prev,
            serviceTypes: prev.serviceTypes.includes(typeKey)
                ? prev.serviceTypes.filter(type => type !== typeKey)
                : [...prev.serviceTypes, typeKey]
        }))
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

            {/* Request Form Settings - Full Width Table */}
            <Card>
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                                Request form settings
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Configure which fields appear on service request forms and their validation requirements.
                            </p>
                        </div>
                        <Button 
                            variant="primary" 
                            onClick={() => setIsAddFieldModalOpen(true)}
                            className="flex items-center gap-2"
                        >
                            <RiAddLine className="size-4" />
                            Add Field
                        </Button>
                    </div>
                </div>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Field Name</TableHeaderCell>
                            <TableHeaderCell>Type</TableHeaderCell>
                            <TableHeaderCell>Service Types</TableHeaderCell>
                            <TableHeaderCell>Required</TableHeaderCell>
                            <TableHeaderCell>Enabled</TableHeaderCell>
                            <TableHeaderCell className="text-right">Actions</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {formFields.map((field) => (
                            <TableRow key={field.id}>
                                <TableCell>
                                    <div>
                                        <div className="font-medium text-gray-900 dark:text-gray-100">
                                            {field.name}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {field.description}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        {fieldTypes.find(ft => ft.value === field.type)?.label || field.type}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {field.serviceTypes.map((serviceType) => (
                                            <span 
                                                key={serviceType}
                                                className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                            >
                                                {serviceTypes.find(st => st.value === serviceType)?.label || serviceType}
                                            </span>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Switch
                                        checked={field.required}
                                        onCheckedChange={() => handleRequiredFieldToggle(field.id)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Switch
                                        checked={field.enabled}
                                        onCheckedChange={() => handleFormFieldToggle(field.id)}
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEditField(field.id)}
                                            className="h-8 w-8 p-0"
                                        >
                                            <RiEditLine className="size-4" />
                                        </Button>
                                        {!field.isCore && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteField(field.id)}
                                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <RiDeleteBinLine className="size-4" />
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            {/* Notification Preferences Card */}
            <Card className="h-fit">
                <div>
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                            Notification preferences
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Configure email notifications for work order events and status changes.
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3 py-2">
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Notify requestor
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                    Send confirmation and status updates to the person who submitted each request
                                </p>
                            </div>
                            <Switch
                                checked={notifications.notifyRequestor}
                                onCheckedChange={() => handleNotificationToggle('notifyRequestor')}
                            />
                        </div>
                        
                        <div className="flex items-start justify-between gap-3 py-2">
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Notify assigned team
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                    Send email to assigned team when new requests are submitted
                                </p>
                            </div>
                            <Switch
                                checked={notifications.notifyAssignedTeam}
                                onCheckedChange={() => handleNotificationToggle('notifyAssignedTeam')}
                            />
                        </div>
                        
                        <div className="flex items-start justify-between gap-3 py-2">
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Notify on status changes
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                    Send email when request status is updated or comments are added. You can customize which statuses trigger notifications in the Service types or Statuses tabs.
                                </p>
                            </div>
                            <Switch
                                checked={notifications.notifyOnStatusChanges}
                                onCheckedChange={() => handleNotificationToggle('notifyOnStatusChanges')}
                            />
                        </div>
                    </div>
                </div>
            </Card>

            {/* Setup Modal */}
            <FullPageModal
                isOpen={isSetupModalOpen}
                onClose={() => setIsSetupModalOpen(false)}
                title="Service Request Setup"
                iframeUrl="https://v0-workflow-system-design-sage.vercel.app/"
            />

            {/* Add Field Modal */}
            <Dialog open={isAddFieldModalOpen} onOpenChange={setIsAddFieldModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Custom Field</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Field name
                            </label>
                            <Input
                                value={newField.name}
                                onChange={(e) => handleNewFieldChange('name', e.target.value)}
                                placeholder="Enter field name"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Description
                            </label>
                            <Input
                                value={newField.description}
                                onChange={(e) => handleNewFieldChange('description', e.target.value)}
                                placeholder="Enter field description"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Field type
                            </label>
                            <Select
                                value={newField.type}
                                onValueChange={(value) => handleNewFieldChange('type', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select field type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {fieldTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        {newField.type === 'dropdown' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Dropdown options
                                </label>
                                <div className="space-y-2">
                                    {newField.options.map((option, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Input
                                                value={option}
                                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                                placeholder={`Option ${index + 1}`}
                                            />
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveOption(index)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <RiDeleteBinLine className="size-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleAddOption}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        <RiAddLine className="size-4 mr-1" />
                                        Add option
                                    </Button>
                                </div>
                            </div>
                        )}
                        
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="required-field"
                                checked={newField.required}
                                onCheckedChange={(checked) => handleNewFieldChange('required', checked)}
                            />
                            <label htmlFor="required-field" className="text-sm text-gray-700 dark:text-gray-300">
                                Required field
                            </label>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Service categories & request types
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                Select categories to automatically include all their request types, or customize individual selections
                            </p>
                            
                            <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                                {Object.entries(requestTypesByCategory).map(([category, requestTypes]) => {
                                    const isExpanded = expandedCategories.has(category)
                                    const isFullySelected = newField.serviceTypes.includes('all') || 
                                        requestTypes.every(type => newField.serviceTypes.includes(type.toLowerCase().replace(/\s+/g, '-')))
                                    const isPartiallySelected = !isFullySelected && 
                                        requestTypes.some(type => newField.serviceTypes.includes(type.toLowerCase().replace(/\s+/g, '-')))
                                    
                                    return (
                                        <div key={category} className="space-y-2">
                                            {/* Category Header */}
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
                                                <Checkbox
                                                    id={`category-${category}`}
                                                    checked={isFullySelected ? true : isPartiallySelected ? "indeterminate" : false}
                                                    onCheckedChange={() => handleCategoryToggle(category)}
                                                />
                                                <label 
                                                    htmlFor={`category-${category}`} 
                                                    className="font-medium text-sm text-gray-900 dark:text-gray-100 cursor-pointer"
                                                    onClick={() => toggleCategoryExpansion(category)}
                                                >
                                                    {category}
                                                </label>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    ({requestTypes.filter(type => newField.serviceTypes.includes(type.toLowerCase().replace(/\s+/g, '-'))).length}/{requestTypes.length})
                                                </span>
                                            </div>
                                            
                                            {/* Request Types (when expanded) */}
                                            {isExpanded && (
                                                <div className="ml-6 space-y-1.5">
                                                    {requestTypes.map((requestType) => {
                                                        const typeKey = requestType.toLowerCase().replace(/\s+/g, '-')
                                                        return (
                                                            <div key={requestType} className="flex items-center space-x-2">
                                                                <Checkbox
                                                                    id={`request-${requestType}`}
                                                                    checked={newField.serviceTypes.includes(typeKey)}
                                                                    onCheckedChange={() => handleRequestTypeToggle(requestType)}
                                                                />
                                                                <label htmlFor={`request-${requestType}`} className="text-sm text-gray-700 dark:text-gray-300">
                                                                    {requestType}
                                                                </label>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    
                    <DialogFooter>
                        <Button
                            variant="ghost"
                            onClick={() => setIsAddFieldModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleAddField}
                            disabled={!newField.name.trim()}
                        >
                            Add Field
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Field Modal */}
            <Dialog open={isEditFieldModalOpen} onOpenChange={setIsEditFieldModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Field</DialogTitle>
                    </DialogHeader>
                    
                    {editingField && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Field name
                                </label>
                                <Input
                                    value={newField.name || editingField.name}
                                    onChange={(e) => handleNewFieldChange('name', e.target.value)}
                                    placeholder="Enter field name"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description
                                </label>
                                <Input
                                    value={newField.description || editingField.description}
                                    onChange={(e) => handleNewFieldChange('description', e.target.value)}
                                    placeholder="Enter field description"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Field type
                                </label>
                                <Select
                                    value={newField.type || editingField.type}
                                    onValueChange={(value) => handleNewFieldChange('type', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select field type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {fieldTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            {(newField.type || editingField.type) === 'dropdown' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Dropdown options
                                    </label>
                                    <div className="space-y-2">
                                        {(newField.options.length > 0 ? newField.options : editingField.options).map((option, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <Input
                                                    value={option}
                                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                                    placeholder={`Option ${index + 1}`}
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleRemoveOption(index)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <RiDeleteBinLine className="size-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleAddOption}
                                            className="text-blue-600 hover:text-blue-700"
                                        >
                                            <RiAddLine className="size-4 mr-1" />
                                            Add option
                                        </Button>
                                    </div>
                                </div>
                            )}
                            
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="edit-required-field"
                                    checked={newField.required !== undefined ? newField.required : editingField.required}
                                    onCheckedChange={(checked) => handleNewFieldChange('required', checked)}
                                />
                                <label htmlFor="edit-required-field" className="text-sm text-gray-700 dark:text-gray-300">
                                    Required field
                                </label>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Service categories & request types
                                </label>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                    Select categories to automatically include all their request types, or customize individual selections
                                </p>
                                
                                <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                                    {Object.entries(requestTypesByCategory).map(([category, requestTypes]) => {
                                        const isExpanded = expandedCategories.has(category)
                                        const currentServiceTypes = newField.serviceTypes.length > 0 ? newField.serviceTypes : editingField.serviceTypes
                                        const isFullySelected = currentServiceTypes.includes('all') || 
                                            requestTypes.every(type => currentServiceTypes.includes(type.toLowerCase().replace(/\s+/g, '-')))
                                        const isPartiallySelected = !isFullySelected && 
                                            requestTypes.some(type => currentServiceTypes.includes(type.toLowerCase().replace(/\s+/g, '-')))
                                        
                                        return (
                                            <div key={category} className="space-y-2">
                                                {/* Category Header */}
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
                                                    <Checkbox
                                                        id={`edit-category-${category}`}
                                                        checked={isFullySelected ? true : isPartiallySelected ? "indeterminate" : false}
                                                        onCheckedChange={() => handleCategoryToggle(category)}
                                                    />
                                                    <label 
                                                        htmlFor={`edit-category-${category}`} 
                                                        className="font-medium text-sm text-gray-900 dark:text-gray-100 cursor-pointer"
                                                        onClick={() => toggleCategoryExpansion(category)}
                                                    >
                                                        {category}
                                                    </label>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        ({requestTypes.filter(type => currentServiceTypes.includes(type.toLowerCase().replace(/\s+/g, '-'))).length}/{requestTypes.length})
                                                    </span>
                                                </div>
                                                
                                                {/* Request Types (when expanded) */}
                                                {isExpanded && (
                                                    <div className="ml-6 space-y-1.5">
                                                        {requestTypes.map((requestType) => {
                                                            const typeKey = requestType.toLowerCase().replace(/\s+/g, '-')
                                                            return (
                                                                <div key={requestType} className="flex items-center space-x-2">
                                                                    <Checkbox
                                                                        id={`edit-request-${requestType}`}
                                                                        checked={currentServiceTypes.includes(typeKey)}
                                                                        onCheckedChange={() => handleRequestTypeToggle(requestType)}
                                                                    />
                                                                    <label htmlFor={`edit-request-${requestType}`} className="text-sm text-gray-700 dark:text-gray-300">
                                                                        {requestType}
                                                                    </label>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <DialogFooter>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setIsEditFieldModalOpen(false)
                                setEditingField(null)
                                setNewField({
                                    name: "",
                                    description: "",
                                    type: "text",
                                    required: false,
                                    serviceTypes: ["all"],
                                    options: []
                                })
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleUpdateField}
                            disabled={!newField.name.trim()}
                        >
                            Update Field
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
