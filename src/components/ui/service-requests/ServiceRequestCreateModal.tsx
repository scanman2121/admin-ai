"use client"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { buildings, issueTypes } from "@/data/data"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"

interface ServiceRequestCreateModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit?: (serviceRequest: ServiceRequestData) => void
}

interface ServiceRequestData {
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

export function ServiceRequestCreateModal({ isOpen, onClose, onSubmit }: ServiceRequestCreateModalProps) {
    const [formData, setFormData] = useState<ServiceRequestData>({
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
    
    // State for dropdown open/close
    const [issueTypeOpen, setIssueTypeOpen] = useState(false)
    const [assignToOpen, setAssignToOpen] = useState(false)
    const [buildingOpen, setBuildingOpen] = useState(false)

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
        
        // Close all dropdowns
        setIssueTypeOpen(false)
        setAssignToOpen(false)
        setBuildingOpen(false)
        
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
        
        // Close all dropdowns
        setIssueTypeOpen(false)
        setAssignToOpen(false)
        setBuildingOpen(false)
        
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
                        <Popover open={issueTypeOpen} onOpenChange={setIssueTypeOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={issueTypeOpen}
                                    className="w-full justify-between mt-1"
                                >
                                    {formData.issueType
                                        ? issueTypes.find((type) => type.value === formData.issueType)?.label
                                        : "Select issue type"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Search issue types..." />
                                    <CommandEmpty>No issue type found.</CommandEmpty>
                                    <CommandGroup>
                                        {issueTypes.map((type) => (
                                            <CommandItem
                                                key={type.value}
                                                value={type.value}
                                                onSelect={(currentValue) => {
                                                    handleInputChange("issueType", currentValue === formData.issueType ? "" : currentValue)
                                                    setIssueTypeOpen(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        formData.issueType === type.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {type.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Assign To */}
                    <div>
                        <Label htmlFor="assignedTo" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Assign To
                        </Label>
                        <Popover open={assignToOpen} onOpenChange={setAssignToOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={assignToOpen}
                                    className="w-full justify-between mt-1"
                                >
                                    {formData.assignedTo
                                        ? assigneeOptions.find((assignee) => assignee.value === formData.assignedTo)?.label
                                        : "Select assignee"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Search assignees..." />
                                    <CommandEmpty>No assignee found.</CommandEmpty>
                                    <CommandGroup>
                                        {assigneeOptions.map((assignee) => (
                                            <CommandItem
                                                key={assignee.value}
                                                value={assignee.value}
                                                onSelect={(currentValue) => {
                                                    handleInputChange("assignedTo", currentValue === formData.assignedTo ? "" : currentValue)
                                                    setAssignToOpen(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        formData.assignedTo === assignee.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {assignee.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Building, Floor, Unit */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="building" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Building
                            </Label>
                            <Popover open={buildingOpen} onOpenChange={setBuildingOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={buildingOpen}
                                        className="w-full justify-between mt-1"
                                    >
                                        {formData.building
                                            ? buildings.find((building) => building.value === formData.building)?.label
                                            : "Select building"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search buildings..." />
                                        <CommandEmpty>No building found.</CommandEmpty>
                                        <CommandGroup>
                                            {buildings.map((building) => (
                                                <CommandItem
                                                    key={building.value}
                                                    value={building.value}
                                                    onSelect={(currentValue) => {
                                                        handleInputChange("building", currentValue === formData.building ? "" : currentValue)
                                                        setBuildingOpen(false)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            formData.building === building.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {building.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
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
