"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Checkbox } from "@/components/Checkbox"
import { Dialog } from "@/components/Dialog"
import { Input } from "@/components/Input"
import { Select } from "@/components/Select"
import { Switch } from "@/components/Switch"
import { Table } from "@/components/Table"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { FullPageModal } from "@/components/ui/FullPageModal"
import { RiAddLine, RiArrowLeftLine, RiDeleteBinLine, RiEditLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Work Orders Settings page
const tabs = [
    { name: "Settings", href: "/operations/work-orders/settings/general" },
    { name: "Teams", href: "/operations/work-orders/settings/teams" },
    { name: "Service types", href: "/operations/work-orders/settings/service-types-categories" },
    { name: "Statuses", href: "/operations/work-orders/settings/statuses" },
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

export default function WorkOrdersGeneralSettings() {
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
            options: []
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
            options: []
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
            options: []
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
                    <Table.Header>
                        <Table.Row>
                            <Table.Head>Field Name</Table.Head>
                            <Table.Head>Type</Table.Head>
                            <Table.Head>Service Types</Table.Head>
                            <Table.Head>Required</Table.Head>
                            <Table.Head>Enabled</Table.Head>
                            <Table.Head className="text-right">Actions</Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {formFields.map((field) => (
                            <Table.Row key={field.id}>
                                <Table.Cell>
                                    <div>
                                        <div className="font-medium text-gray-900 dark:text-gray-100">
                                            {field.name}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {field.description}
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        {fieldTypes.find(ft => ft.value === field.type)?.label || field.type}
                                    </span>
                                </Table.Cell>
                                <Table.Cell>
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
                                </Table.Cell>
                                <Table.Cell>
                                    <Switch
                                        checked={field.required}
                                        onCheckedChange={() => handleRequiredFieldToggle(field.id)}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Switch
                                        checked={field.enabled}
                                        onCheckedChange={() => handleFormFieldToggle(field.id)}
                                    />
                                </Table.Cell>
                                <Table.Cell className="text-right">
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
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
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
            <Dialog
                isOpen={isAddFieldModalOpen}
                onClose={() => setIsAddFieldModalOpen(false)}
                title="Add Custom Field"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Field Name
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
                            Field Type
                        </label>
                        <Select
                            value={newField.type}
                            onValueChange={(value) => handleNewFieldChange('type', value)}
                        >
                            {fieldTypes.map((type) => (
                                <Select.Item key={type.value} value={type.value}>
                                    {type.label}
                                </Select.Item>
                            ))}
                        </Select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Service Types
                        </label>
                        <div className="space-y-2">
                            {serviceTypes.map((serviceType) => (
                                <div key={serviceType.value} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`service-${serviceType.value}`}
                                        checked={newField.serviceTypes.includes(serviceType.value)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                handleNewFieldChange('serviceTypes', [...newField.serviceTypes, serviceType.value])
                                            } else {
                                                handleNewFieldChange('serviceTypes', newField.serviceTypes.filter(st => st !== serviceType.value))
                                            }
                                        }}
                                    />
                                    <label htmlFor={`service-${serviceType.value}`} className="text-sm text-gray-700 dark:text-gray-300">
                                        {serviceType.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {newField.type === 'dropdown' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Dropdown Options
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
                                    Add Option
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
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
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
                </div>
            </Dialog>

            {/* Edit Field Modal */}
            <Dialog
                isOpen={isEditFieldModalOpen}
                onClose={() => setIsEditFieldModalOpen(false)}
                title="Edit Field"
            >
                {editingField && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Field Name
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
                                Field Type
                            </label>
                            <Select
                                value={newField.type || editingField.type}
                                onValueChange={(value) => handleNewFieldChange('type', value)}
                            >
                                {fieldTypes.map((type) => (
                                    <Select.Item key={type.value} value={type.value}>
                                        {type.label}
                                    </Select.Item>
                                ))}
                            </Select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Service Types
                            </label>
                            <div className="space-y-2">
                                {serviceTypes.map((serviceType) => (
                                    <div key={serviceType.value} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`edit-service-${serviceType.value}`}
                                            checked={(newField.serviceTypes.length > 0 ? newField.serviceTypes : editingField.serviceTypes).includes(serviceType.value)}
                                            onCheckedChange={(checked) => {
                                                const currentServiceTypes = newField.serviceTypes.length > 0 ? newField.serviceTypes : editingField.serviceTypes
                                                if (checked) {
                                                    handleNewFieldChange('serviceTypes', [...currentServiceTypes, serviceType.value])
                                                } else {
                                                    handleNewFieldChange('serviceTypes', currentServiceTypes.filter(st => st !== serviceType.value))
                                                }
                                            }}
                                        />
                                        <label htmlFor={`edit-service-${serviceType.value}`} className="text-sm text-gray-700 dark:text-gray-300">
                                            {serviceType.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {(newField.type || editingField.type) === 'dropdown' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Dropdown Options
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
                                        Add Option
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
                    </div>
                )}
                
                <div className="flex justify-end space-x-3 mt-6">
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
                </div>
            </Dialog>
        </div>
    )
}
