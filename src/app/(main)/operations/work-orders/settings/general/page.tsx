"use client"

import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
import { Select } from "@/components/Select"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { RiArrowLeftLine } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Work Orders Settings page
const tabs = [
    { name: "Service Types", href: "/operations/work-orders/settings" },
    { name: "Teams", href: "/operations/work-orders/settings/teams" },
    { name: "Settings", href: "/operations/work-orders/settings/general" },
]

export default function WorkOrdersGeneralSettings() {
    const pathname = usePathname()
    
    // Default Form Fields state
    const [formFields, setFormFields] = useState({
        location: true,
        description: true,
        attachments: true,
        urgencyLevel: false
    })
    
    // Notifications state
    const [notifications, setNotifications] = useState({
        alwaysNotifyRequestor: true,
        notifyAssignedTeam: true,
        notifyOnStatusChanges: true,
        notifyOnReassignment: false
    })
    
    // Form Configuration state
    const [formConfig, setFormConfig] = useState({
        requiredFields: {
            location: true,
            description: true,
            attachments: false,
            contactInfo: false
        },
        maxAttachments: "5"
    })
    
    const handleFormFieldToggle = (field: keyof typeof formFields) => {
        setFormFields(prev => ({ ...prev, [field]: !prev[field] }))
    }
    
    const handleNotificationToggle = (field: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [field]: !prev[field] }))
    }
    
    const handleRequiredFieldToggle = (field: keyof typeof formConfig.requiredFields) => {
        setFormConfig(prev => ({
            ...prev,
            requiredFields: { ...prev.requiredFields, [field]: !prev.requiredFields[field] }
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
                        Work Order Settings
                    </h1>
                </div>
                <Button variant="primary">
                    Save Changes
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

            {/* Settings Content */}
            <div className="space-y-8">
                {/* Default Form Fields Section */}
                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-1">
                            Default Form Fields
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Choose which fields appear on all service request forms by default.
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        {/* Location */}
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Location
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Building, floor, room number
                                </p>
                            </div>
                            <Switch
                                checked={formFields.location}
                                onCheckedChange={() => handleFormFieldToggle('location')}
                            />
                        </div>
                        
                        {/* Description */}
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Description
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Detailed issue description
                                </p>
                            </div>
                            <Switch
                                checked={formFields.description}
                                onCheckedChange={() => handleFormFieldToggle('description')}
                            />
                        </div>
                        
                        {/* Attachments */}
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Attachments
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Photo/file uploads
                                </p>
                            </div>
                            <Switch
                                checked={formFields.attachments}
                                onCheckedChange={() => handleFormFieldToggle('attachments')}
                            />
                        </div>
                        
                        {/* Urgency Level */}
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Urgency Level
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Low, medium, high urgency
                                </p>
                            </div>
                            <Switch
                                checked={formFields.urgencyLevel}
                                onCheckedChange={() => handleFormFieldToggle('urgencyLevel')}
                            />
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-1">
                            Notifications
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Global notification settings that apply to all request types (unless overridden in individual type settings).
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        {/* Always Notify Requestor */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                        Always Notify Requestor
                                    </h3>
                                    <p className="text-sm text-blue-700 dark:text-blue-300">
                                        Send confirmation and status updates to the person who submitted each request
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.alwaysNotifyRequestor}
                                    onCheckedChange={() => handleNotificationToggle('alwaysNotifyRequestor')}
                                />
                            </div>
                        </div>
                        
                        {/* Notify Assigned Team */}
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Notify Assigned Team
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Send email to assigned team when new requests are submitted
                                </p>
                            </div>
                            <Switch
                                checked={notifications.notifyAssignedTeam}
                                onCheckedChange={() => handleNotificationToggle('notifyAssignedTeam')}
                            />
                        </div>
                        
                        {/* Notify on Status Changes */}
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Notify on Status Changes
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Send email when request status is updated or comments are added
                                </p>
                            </div>
                            <Switch
                                checked={notifications.notifyOnStatusChanges}
                                onCheckedChange={() => handleNotificationToggle('notifyOnStatusChanges')}
                            />
                        </div>
                        
                        {/* Notify on Reassignment */}
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Notify on Reassignment
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Send email to new assignee when requests are reassigned between teams
                                </p>
                            </div>
                            <Switch
                                checked={notifications.notifyOnReassignment}
                                onCheckedChange={() => handleNotificationToggle('notifyOnReassignment')}
                            />
                        </div>
                    </div>
                </div>

                {/* Form Configuration Section */}
                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-1">
                            Form Configuration
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Customize how service request forms behave and validate input.
                        </p>
                    </div>
                    
                    <div className="space-y-6">
                        {/* Required Fields */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                                Required Fields
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Select which fields must be filled out
                            </p>
                            
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="required-location"
                                        checked={formConfig.requiredFields.location}
                                        onCheckedChange={() => handleRequiredFieldToggle('location')}
                                    />
                                    <label htmlFor="required-location" className="text-sm text-gray-900 dark:text-gray-100">
                                        Location
                                    </label>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="required-description"
                                        checked={formConfig.requiredFields.description}
                                        onCheckedChange={() => handleRequiredFieldToggle('description')}
                                    />
                                    <label htmlFor="required-description" className="text-sm text-gray-900 dark:text-gray-100">
                                        Description
                                    </label>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="required-attachments"
                                        checked={formConfig.requiredFields.attachments}
                                        onCheckedChange={() => handleRequiredFieldToggle('attachments')}
                                    />
                                    <label htmlFor="required-attachments" className="text-sm text-gray-900 dark:text-gray-100">
                                        Attachments
                                    </label>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="required-contact"
                                        checked={formConfig.requiredFields.contactInfo}
                                        onCheckedChange={() => handleRequiredFieldToggle('contactInfo')}
                                    />
                                    <label htmlFor="required-contact" className="text-sm text-gray-900 dark:text-gray-100">
                                        Contact Info
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        {/* Maximum Attachments */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                                Maximum Attachments
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Limit number of files per request
                            </p>
                            
                            <div className="max-w-xs">
                                <Select
                                    value={formConfig.maxAttachments}
                                    onValueChange={(value) => setFormConfig(prev => ({ ...prev, maxAttachments: value }))}
                                >
                                    <option value="1">1 file</option>
                                    <option value="3">3 files</option>
                                    <option value="5">5 files</option>
                                    <option value="10">10 files</option>
                                    <option value="unlimited">Unlimited</option>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
