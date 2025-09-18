"use client"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Select } from "@/components/Select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { buildings, issueTypes } from "@/data/data"
import { useState } from "react"

interface WorkOrderCreateModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit?: (workOrder: WorkOrderData) => void
}

interface WorkOrderData {
    title: string
    description: string
    issueType: string
    assignedTo: string
    building: string
    floor: string
    unit: string
    requestedBy: string
    dueDate: string
}

const assigneeOptions = [
    { value: "unassigned", label: "Unassigned" },
    { value: "security-team", label: "Security Team" },
    { value: "maintenance-team", label: "Maintenance Team" },
    { value: "electrical-team", label: "Electrical Team" },
    { value: "plumbing-team", label: "Plumbing Team" },
    { value: "hvac-team", label: "HVAC Team" },
    { value: "cleaning-team", label: "Cleaning Team" },
]

export function WorkOrderCreateModal({ isOpen, onClose, onSubmit }: WorkOrderCreateModalProps) {
    const [formData, setFormData] = useState<WorkOrderData>({
        title: "",
        description: "",
        issueType: "",
        assignedTo: "",
        building: "",
        floor: "",
        unit: "",
        requestedBy: "",
        dueDate: "",
    })

    const handleInputChange = (field: keyof WorkOrderData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        // Basic validation
        if (!formData.title.trim() || !formData.description.trim() || !formData.issueType || !formData.building || !formData.requestedBy.trim()) {
            return
        }

        onSubmit?.(formData)
        
        // Reset form
        setFormData({
            title: "",
            description: "",
            issueType: "",
            assignedTo: "",
            building: "",
            floor: "",
            unit: "",
            requestedBy: "",
            dueDate: "",
        })
        
        onClose()
    }

    const handleCancel = () => {
        // Reset form
        setFormData({
            title: "",
            description: "",
            issueType: "",
            assignedTo: "",
            building: "",
            floor: "",
            unit: "",
            requestedBy: "",
            dueDate: "",
        })
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                        Work Order Details
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            placeholder="Enter work order title"
                            className="mt-1"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            placeholder="Describe the issue or request in detail"
                            className="mt-1 min-h-[100px] resize-none"
                            required
                        />
                    </div>

                    {/* Issue Type */}
                    <div>
                        <Label htmlFor="issueType" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Issue Type
                        </Label>
                        <Select
                            value={formData.issueType}
                            onValueChange={(value) => handleInputChange("issueType", value)}
                            required
                        >
                            <option value="">Select issue type</option>
                            {issueTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </Select>
                    </div>

                    {/* Assign To */}
                    <div>
                        <Label htmlFor="assignedTo" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Assign To
                        </Label>
                        <Select
                            value={formData.assignedTo}
                            onValueChange={(value) => handleInputChange("assignedTo", value)}
                        >
                            <option value="">Select assignee</option>
                            {assigneeOptions.map((assignee) => (
                                <option key={assignee.value} value={assignee.value}>
                                    {assignee.label}
                                </option>
                            ))}
                        </Select>
                    </div>

                    {/* Building, Floor, Unit */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="building" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Building
                            </Label>
                            <Select
                                value={formData.building}
                                onValueChange={(value) => handleInputChange("building", value)}
                                required
                            >
                                <option value="">Select building</option>
                                {buildings.map((building) => (
                                    <option key={building.value} value={building.value}>
                                        {building.label}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="floor" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Floor
                            </Label>
                            <Input
                                id="floor"
                                value={formData.floor}
                                onChange={(e) => handleInputChange("floor", e.target.value)}
                                placeholder="Floor number"
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="unit" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Unit (Optional)
                            </Label>
                            <Input
                                id="unit"
                                value={formData.unit}
                                onChange={(e) => handleInputChange("unit", e.target.value)}
                                placeholder="Unit number"
                                className="mt-1"
                            />
                        </div>
                    </div>

                    {/* Requested By and Due Date */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="requestedBy" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Requested By
                            </Label>
                            <Input
                                id="requestedBy"
                                value={formData.requestedBy}
                                onChange={(e) => handleInputChange("requestedBy", e.target.value)}
                                placeholder="Name of requester"
                                className="mt-1"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="dueDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Due Date
                            </Label>
                            <Input
                                id="dueDate"
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-3 pt-6">
                        <Button 
                            type="button" 
                            variant="ghost" 
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            Create Work Order
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
