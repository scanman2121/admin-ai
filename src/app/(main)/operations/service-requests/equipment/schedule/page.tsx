"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { Textarea } from "@/components/ui/textarea"
import { equipment } from "@/data/equipment"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Calendar, Clock, Repeat, Users, AlertCircle } from "lucide-react"
import Link from "next/link"
import { format, parseISO, addDays, addWeeks, addMonths, addQuarters, addYears } from "date-fns"

interface MaintenanceSchedule {
    id: string
    equipmentId: string
    equipmentName: string
    type: "preventive" | "inspection" | "repair" | "calibration"
    frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annually" | "annually" | "as-needed"
    startDate: string
    nextDueDate: string
    assignedTeam: string
    estimatedDuration: number // in minutes
    description: string
    isActive: boolean
    lastCompleted?: string
    nextOccurrence?: string
}

// Mock maintenance schedules
const mockSchedules: MaintenanceSchedule[] = [
    {
        id: "ms-001",
        equipmentId: "eq-001",
        equipmentName: "Main HVAC Unit - Floor 12",
        type: "preventive",
        frequency: "quarterly",
        startDate: "2020-03-15",
        nextDueDate: "2024-04-15",
        assignedTeam: "Maintenance Team",
        estimatedDuration: 120,
        description: "Quarterly preventive maintenance: filter replacement, refrigerant check, system testing",
        isActive: true,
        lastCompleted: "2024-01-15",
        nextOccurrence: "2024-04-15"
    },
    {
        id: "ms-002",
        equipmentId: "eq-002",
        equipmentName: "Elevator 1 - Main Lobby",
        type: "inspection",
        frequency: "monthly",
        startDate: "2019-06-10",
        nextDueDate: "2024-04-28",
        assignedTeam: "Maintenance Team",
        estimatedDuration: 60,
        description: "Monthly elevator inspection and safety check",
        isActive: true,
        lastCompleted: "2024-02-28",
        nextOccurrence: "2024-03-28"
    },
    {
        id: "ms-003",
        equipmentId: "eq-004",
        equipmentName: "Fire Sprinkler System - Building Wide",
        type: "inspection",
        frequency: "semi-annually",
        startDate: "2020-08-05",
        nextDueDate: "2024-07-05",
        assignedTeam: "Security Team",
        estimatedDuration: 180,
        description: "Semi-annual fire safety system inspection",
        isActive: true,
        lastCompleted: "2024-01-05",
        nextOccurrence: "2024-07-05"
    }
]

export default function MaintenanceSchedulePage() {
    const router = useRouter()
    const [schedules] = useState<MaintenanceSchedule[]>(mockSchedules)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [formData, setFormData] = useState({
        equipmentId: "",
        type: "preventive" as MaintenanceSchedule["type"],
        frequency: "monthly" as MaintenanceSchedule["frequency"],
        startDate: "",
        assignedTeam: "",
        estimatedDuration: 60,
        description: ""
    })

    const calculateNextDueDate = (startDate: string, frequency: MaintenanceSchedule["frequency"], lastCompleted?: string): string => {
        const baseDate = lastCompleted ? parseISO(lastCompleted) : parseISO(startDate)
        
        switch (frequency) {
            case "daily":
                return format(addDays(baseDate, 1), "yyyy-MM-dd")
            case "weekly":
                return format(addWeeks(baseDate, 1), "yyyy-MM-dd")
            case "monthly":
                return format(addMonths(baseDate, 1), "yyyy-MM-dd")
            case "quarterly":
                return format(addQuarters(baseDate, 1), "yyyy-MM-dd")
            case "semi-annually":
                return format(addMonths(baseDate, 6), "yyyy-MM-dd")
            case "annually":
                return format(addYears(baseDate, 1), "yyyy-MM-dd")
            default:
                return format(addMonths(baseDate, 1), "yyyy-MM-dd")
        }
    }

    const getFrequencyBadge = (frequency: MaintenanceSchedule["frequency"]) => {
        const colors: Record<MaintenanceSchedule["frequency"], "default" | "success" | "warning" | "error"> = {
            "daily": "error",
            "weekly": "warning",
            "monthly": "default",
            "quarterly": "default",
            "semi-annually": "success",
            "annually": "success",
            "as-needed": "default"
        }
        return <Badge variant={colors[frequency]}>{frequency}</Badge>
    }

    const getDaysUntilDue = (dueDate: string): number => {
        const due = parseISO(dueDate)
        const today = new Date()
        const diffTime = due.getTime() - today.getTime()
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement schedule creation
        console.log("Creating schedule:", formData)
        setShowCreateForm(false)
        // Reset form
        setFormData({
            equipmentId: "",
            type: "preventive",
            frequency: "monthly",
            startDate: "",
            assignedTeam: "",
            estimatedDuration: 60,
            description: ""
        })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link 
                        href="/operations/service-requests/equipment"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-medium text-gray-900 dark:text-gray-50">
                            Maintenance Schedules
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Manage recurring maintenance schedules for equipment
                        </p>
                    </div>
                </div>
                
                <Button onClick={() => setShowCreateForm(!showCreateForm)}>
                    <Calendar className="h-4 w-4 mr-2" />
                    {showCreateForm ? "Cancel" : "Create schedule"}
                </Button>
            </div>

            {/* Create Schedule Form */}
            {showCreateForm && (
                <Card>
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
                            Create maintenance schedule
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="equipment">Equipment</Label>
                                    <Select
                                        value={formData.equipmentId}
                                        onValueChange={(value) => setFormData({ ...formData, equipmentId: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select equipment" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {equipment.filter(eq => eq.status === "active").map(eq => (
                                                <SelectItem key={eq.id} value={eq.id}>
                                                    {eq.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="type">Type</Label>
                                    <Select
                                        value={formData.type}
                                        onValueChange={(value) => setFormData({ ...formData, type: value as MaintenanceSchedule["type"] })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="preventive">Preventive</SelectItem>
                                            <SelectItem value="inspection">Inspection</SelectItem>
                                            <SelectItem value="repair">Repair</SelectItem>
                                            <SelectItem value="calibration">Calibration</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="frequency">Frequency</Label>
                                    <Select
                                        value={formData.frequency}
                                        onValueChange={(value) => setFormData({ ...formData, frequency: value as MaintenanceSchedule["frequency"] })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                            <SelectItem value="quarterly">Quarterly</SelectItem>
                                            <SelectItem value="semi-annually">Semi-annually</SelectItem>
                                            <SelectItem value="annually">Annually</SelectItem>
                                            <SelectItem value="as-needed">As needed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="startDate">Start Date</Label>
                                    <Input
                                        id="startDate"
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="assignedTeam">Assigned Team</Label>
                                    <Select
                                        value={formData.assignedTeam}
                                        onValueChange={(value) => setFormData({ ...formData, assignedTeam: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select team" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Maintenance Team">Maintenance Team</SelectItem>
                                            <SelectItem value="Security Team">Security Team</SelectItem>
                                            <SelectItem value="Electrical Team">Electrical Team</SelectItem>
                                            <SelectItem value="Plumbing Team">Plumbing Team</SelectItem>
                                            <SelectItem value="HVAC Team">HVAC Team</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="duration">Estimated Duration (minutes)</Label>
                                    <Input
                                        id="duration"
                                        type="number"
                                        value={formData.estimatedDuration}
                                        onChange={(e) => setFormData({ ...formData, estimatedDuration: parseInt(e.target.value) })}
                                        min={1}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Describe the maintenance tasks to be performed..."
                                    className="min-h-[100px]"
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <Button 
                                    type="button" 
                                    variant="ghost"
                                    onClick={() => setShowCreateForm(false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Create schedule
                                </Button>
                            </div>
                        </form>
                    </div>
                </Card>
            )}

            {/* Schedules List */}
            <div className="space-y-4">
                {schedules.map((schedule) => {
                    const daysUntil = getDaysUntilDue(schedule.nextDueDate)
                    const equipmentItem = equipment.find(eq => eq.id === schedule.equipmentId)
                    
                    return (
                        <Card key={schedule.id}>
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                                                {schedule.equipmentName}
                                            </h3>
                                            {getFrequencyBadge(schedule.frequency)}
                                            {schedule.isActive ? (
                                                <Badge variant="success">• Active</Badge>
                                            ) : (
                                                <Badge variant="default">• Inactive</Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {schedule.type}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="h-4 w-4" />
                                                {schedule.assignedTeam}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {schedule.estimatedDuration} min
                                            </span>
                                        </div>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => router.push(`/operations/service-requests/equipment/${schedule.equipmentId}`)}
                                    >
                                        View equipment
                                    </Button>
                                </div>

                                {schedule.description && (
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                                        {schedule.description}
                                    </p>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Last Completed</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                            {schedule.lastCompleted 
                                                ? format(parseISO(schedule.lastCompleted), "MMM d, yyyy")
                                                : "Never"
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Next Due Date</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                                {format(parseISO(schedule.nextDueDate), "MMM d, yyyy")}
                                            </p>
                                            {daysUntil < 0 && (
                                                <Badge variant="error">
                                                    <AlertCircle className="h-3 w-3 mr-1" />
                                                    Overdue
                                                </Badge>
                                            )}
                                            {daysUntil >= 0 && daysUntil <= 7 && (
                                                <Badge variant="warning">
                                                    Due in {daysUntil} days
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Frequency</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-50 capitalize">
                                            {schedule.frequency.replace("-", " ")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>

            {schedules.length === 0 && (
                <Card>
                    <div className="p-8 text-center">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            No maintenance schedules created yet
                        </p>
                        <Button onClick={() => setShowCreateForm(true)}>
                            Create your first schedule
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    )
}

