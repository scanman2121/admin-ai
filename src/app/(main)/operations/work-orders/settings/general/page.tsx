"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Request Form Settings Card */}
                <Card className="lg:col-span-2">
                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                                Request Form Settings
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Configure which fields appear on service request forms and validation requirements.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Default Form Fields */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
                                    Default Form Fields
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                                    Choose which fields appear on all service request forms by default.
                                </p>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-2">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Location
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Building, floor, room number
                                            </p>
                                        </div>
                                        <Switch
                                            checked={formFields.location}
                                            onCheckedChange={() => handleFormFieldToggle('location')}
                                        />
                                    </div>
                                    
                                    <div className="flex items-center justify-between py-2">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Description
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Detailed issue description
                                            </p>
                                        </div>
                                        <Switch
                                            checked={formFields.description}
                                            onCheckedChange={() => handleFormFieldToggle('description')}
                                        />
                                    </div>
                                    
                                    <div className="flex items-center justify-between py-2">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Attachments
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Photo/file uploads
                                            </p>
                                        </div>
                                        <Switch
                                            checked={formFields.attachments}
                                            onCheckedChange={() => handleFormFieldToggle('attachments')}
                                        />
                                    </div>
                                    
                                    <div className="flex items-center justify-between py-2">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Urgency Level
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
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

                            {/* Required Fields */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
                                    Required Fields
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                                    Select which fields must be filled out before submission.
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
                        </div>
                    </div>
                </Card>

                {/* Notification Preferences Card */}
                <Card>
                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                                Notification Preferences
                </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Configure email notifications for work order events and status changes.
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            {/* Always Notify Requestor - Highlighted */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                            Always Notify Requestor
                                        </h3>
                                        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                            Send confirmation and status updates to the person who submitted each request
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notifications.alwaysNotifyRequestor}
                                        onCheckedChange={() => handleNotificationToggle('alwaysNotifyRequestor')}
                                    />
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Notify Assigned Team
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Send email to assigned team when new requests are submitted
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.notifyAssignedTeam}
                                    onCheckedChange={() => handleNotificationToggle('notifyAssignedTeam')}
                                />
                            </div>
                            
                            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Notify on Status Changes
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Send email when request status is updated or comments are added
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.notifyOnStatusChanges}
                                    onCheckedChange={() => handleNotificationToggle('notifyOnStatusChanges')}
                                />
                            </div>
                            
                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Notify on Reassignment
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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
                </Card>

                {/* File & Attachment Settings Card */}
                <Card>
                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                                File & Attachment Settings
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Configure file upload limits and attachment handling for service requests.
                            </p>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                                    Maximum Attachments
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                                    Limit the number of files users can upload per request
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

                            {/* Future settings can be added here */}
                            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex items-center justify-between py-2">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Auto-compress Images
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Automatically compress uploaded images to save storage
                                        </p>
                                    </div>
                                    <Switch checked={true} disabled />
                                </div>
                                
                                <div className="flex items-center justify-between py-2">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Virus Scanning
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Scan all uploaded files for security threats
                                        </p>
                                    </div>
                                    <Switch checked={true} disabled />
                                </div>
                            </div>
                    </div>
                </div>
                </Card>
            </div>
        </div>
    )
}
