"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Textarea } from "@/components/ui/textarea"
import { RiArrowLeftLine, RiUploadLine } from "@remixicon/react"
import { FileText } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

// Mock data for dropdowns
const buildings = [
    { value: "main-tower", label: "Main Tower" },
    { value: "east-wing", label: "East Wing" },
    { value: "west-building", label: "West Building" },
]

const serviceTypes = [
    { value: "hvac", label: "HVAC Maintenance" },
    { value: "plumbing", label: "Plumbing" },
    { value: "electrical", label: "Electrical" },
    { value: "cleaning", label: "Cleaning" },
    { value: "security", label: "Security" },
]

const statuses = [
    { value: "new", label: "New" },
    { value: "in-progress", label: "In Progress" },
    { value: "assigned", label: "Assigned to Building" },
]

const tenants = [
    { value: "techcorp", label: "TechCorp Solutions" },
    { value: "healthtech", label: "HealthTech Inc" },
    { value: "legal", label: "Legal Partners" },
]

const users = [
    { value: "sarah", label: "Sarah Johnson", tenant: "techcorp" },
    { value: "michael", label: "Michael Chen", tenant: "techcorp" },
    { value: "emma", label: "Dr. Emma Wilson", tenant: "healthtech" },
]

export default function NewServiceRequestPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        building: "",
        type: "",
        description: "",
        location: "",
        status: "",
        tenant: "",
        user: "",
    })
    const [attachments, setAttachments] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const filteredUsers = formData.tenant 
        ? users.filter(user => user.tenant === formData.tenant)
        : []

    const handleSubmit = () => {
        // TODO: Implement service request creation
        console.log("Creating service request:", formData, attachments)
        router.push("/operations/service-requests")
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAttachments(prev => [...prev, ...Array.from(e.target.files!)])
        }
    }

    const handleRemoveAttachment = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <div className="space-y-6">
            {/* Header with back navigation */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link 
                        href="/operations/service-requests"
                        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <RiArrowLeftLine className="mr-1 size-4" />
                        Service Requests
                    </Link>
                </div>
            </div>

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                    New Service Request
                </h1>
                <Button variant="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - 2/3 width */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Service Request Details */}
                    <Card>
                        <div className="p-6">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-6">
                                Service Request Details
                            </h2>
                            
                            <div className="space-y-6">
                                {/* Requested By */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="tenant" className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                            Tenant <span className="text-red-500">*</span>
                                        </Label>
                                        <select
                                            id="tenant"
                                            value={formData.tenant}
                                            onChange={(e) => setFormData(prev => ({ ...prev, tenant: e.target.value, user: "" }))}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select a tenant</option>
                                            {tenants.map(tenant => (
                                                <option key={tenant.value} value={tenant.value}>{tenant.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="user" className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                            User <span className="text-red-500">*</span>
                                        </Label>
                                        <select
                                            id="user"
                                            value={formData.user}
                                            onChange={(e) => setFormData(prev => ({ ...prev, user: e.target.value }))}
                                            disabled={!formData.tenant}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <option value="">Select a user</option>
                                            {filteredUsers.map(user => (
                                                <option key={user.value} value={user.value}>{user.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Building and Type */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="building" className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                            Building <span className="text-red-500">*</span>
                                        </Label>
                                        <select
                                            id="building"
                                            value={formData.building}
                                            onChange={(e) => setFormData(prev => ({ ...prev, building: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select a building</option>
                                            {buildings.map(building => (
                                                <option key={building.value} value={building.value}>{building.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="type" className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                            Type <span className="text-red-500">*</span>
                                        </Label>
                                        <select
                                            id="type"
                                            value={formData.type}
                                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select a type</option>
                                            {serviceTypes.map(type => (
                                                <option key={type.value} value={type.value}>{type.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Enter a description"
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        className="min-h-[100px]"
                                    />
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <Label htmlFor="location" className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                        Location
                                    </Label>
                                    <Input
                                        id="location"
                                        placeholder="Enter a location"
                                        value={formData.location}
                                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column - 1/3 width */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Status */}
                    <Card>
                        <div className="p-6">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-6">Status</h3>
                            
                            <div className="space-y-2">
                                <Label htmlFor="status" className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                    Status <span className="text-red-500">*</span>
                                </Label>
                                <select
                                    id="status"
                                    value={formData.status}
                                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select a status</option>
                                    {statuses.map(status => (
                                        <option key={status.value} value={status.value}>{status.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </Card>

                    {/* Attachments */}
                    <Card>
                        <div className="p-6">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-6">Attachments</h3>
                            
                            <div className="space-y-4">
                                {attachments.length === 0 ? (
                                    <div className="text-center py-8">
                                        <div className="flex justify-center mb-3">
                                            <FileText className="h-10 w-10 text-gray-400" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                            No attachments yet
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Once files are attached, they will appear here
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {attachments.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                                    <span className="text-sm text-gray-900 dark:text-gray-100 truncate">
                                                        {file.name}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveAttachment(index)}
                                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex-shrink-0"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        multiple
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                    <Button 
                                        variant="outline" 
                                        className="w-full" 
                                        type="button" 
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <RiUploadLine className="mr-2 h-4 w-4" />
                                        Upload files
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

