"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Calendar } from "@/components/Calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { serviceRequests } from "@/data/data"
import { equipment } from "@/data/equipment"
import { useState, useMemo } from "react"
import { format, isSameDay, parseISO } from "date-fns"
import { Wrench, Calendar as CalendarIcon } from "lucide-react"

interface CalendarEvent {
    id: string
    type: "service-request" | "maintenance"
    title: string
    date: Date
    status: string
    equipmentId?: string
    equipmentName?: string
    building: string
    priority?: "low" | "medium" | "high"
}

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [filterType, setFilterType] = useState<"all" | "service-request" | "maintenance">("all")
    const [filterBuilding, setFilterBuilding] = useState<string>("all")
    const [filterStatus, setFilterStatus] = useState<string>("all")

    // Generate maintenance events from equipment
    const maintenanceEvents: CalendarEvent[] = useMemo(() => {
        return equipment
            .filter(eq => eq.nextMaintenanceDate && eq.status === "active")
            .map(eq => ({
                id: `maintenance-${eq.id}`,
                type: "maintenance" as const,
                title: `Maintenance: ${eq.name}`,
                date: parseISO(eq.nextMaintenanceDate!),
                status: "scheduled",
                equipmentId: eq.id,
                equipmentName: eq.name,
                building: eq.building,
                priority: eq.healthStatus === "critical" || eq.healthStatus === "poor" ? "high" : 
                         eq.healthStatus === "fair" ? "medium" : "low"
            }))
    }, [])

    // Generate service request events
    const serviceRequestEvents: CalendarEvent[] = useMemo(() => {
        return serviceRequests
            .filter(sr => sr.dateTime)
            .map(sr => {
                // Parse dateTime which is in format "MM/DD/YYYY HH:MM AM/PM"
                const dateStr = sr.dateTime
                const dateMatch = dateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})\s*(AM|PM)/i)
                let date: Date
                
                if (dateMatch) {
                    const [, month, day, year, hour, minute, ampm] = dateMatch
                    let hour24 = parseInt(hour)
                    if (ampm.toUpperCase() === "PM" && hour24 !== 12) hour24 += 12
                    if (ampm.toUpperCase() === "AM" && hour24 === 12) hour24 = 0
                    date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), hour24, parseInt(minute))
                } else {
                    // Fallback to lastUpdated if dateTime parsing fails
                    date = parseISO(sr.lastUpdated)
                }
                
                // Convert priority string to lowercase for consistency
                const priorityMap: Record<string, "low" | "medium" | "high"> = {
                    "low": "low",
                    "medium": "medium",
                    "high": "high",
                    "Low": "low",
                    "Medium": "medium",
                    "High": "high"
                }
                
                return {
                    id: `sr-${sr.id}`,
                    type: "service-request" as const,
                    title: sr.request,
                    date,
                    status: sr.status,
                    building: sr.building,
                    priority: sr.priority ? priorityMap[sr.priority] || "medium" : "medium"
                }
            })
    }, [])

    // Combine all events
    const allEvents = useMemo(() => {
        return [...maintenanceEvents, ...serviceRequestEvents]
    }, [maintenanceEvents, serviceRequestEvents])

    // Filter events
    const filteredEvents = useMemo(() => {
        return allEvents.filter(event => {
            if (filterType !== "all" && event.type !== filterType) return false
            if (filterBuilding !== "all" && event.building !== filterBuilding) return false
            if (filterStatus !== "all" && event.status !== filterStatus) return false
            return true
        })
    }, [allEvents, filterType, filterBuilding, filterStatus])

    // Get events for selected date
    const selectedDateEvents = useMemo(() => {
        if (!selectedDate) return []
        return filteredEvents.filter(event => isSameDay(event.date, selectedDate))
    }, [filteredEvents, selectedDate])

    // Get unique buildings for filter
    const buildings = useMemo(() => {
        const buildingSet = new Set(allEvents.map(e => e.building))
        return Array.from(buildingSet).sort()
    }, [allEvents])

    // Get unique statuses for filter
    const statuses = useMemo(() => {
        const statusSet = new Set(allEvents.map(e => e.status))
        return Array.from(statusSet).sort()
    }, [allEvents])

    // Mark dates with events
    const modifiers = useMemo(() => {
        const eventDates = filteredEvents.map(e => e.date)
        return {
            hasEvents: (date: Date) => eventDates.some(d => isSameDay(d, date))
        }
    }, [filteredEvents])

    const modifiersClassNames = {
        hasEvents: "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-semibold"
    }

    const getEventIcon = (event: CalendarEvent) => {
        if (event.type === "maintenance") {
            return <Wrench className="h-4 w-4" />
        }
        return <CalendarIcon className="h-4 w-4" />
    }

    const getPriorityBadge = (priority?: "low" | "medium" | "high") => {
        if (!priority) return null
        switch (priority) {
            case "high":
                return <Badge variant="error">High</Badge>
            case "medium":
                return <Badge variant="warning">Medium</Badge>
            case "low":
                return <Badge variant="default">Low</Badge>
        }
    }

    const getStatusBadge = (status: string) => {
        const statusLower = status.toLowerCase()
        if (statusLower === "completed") {
            return <Badge variant="success">• Completed</Badge>
        } else if (statusLower === "in progress") {
            return <Badge variant="warning">• In Progress</Badge>
        } else if (statusLower === "new") {
            return <Badge variant="default">• New</Badge>
        } else if (statusLower === "scheduled") {
            return <Badge variant="default">• Scheduled</Badge>
        }
        return <Badge variant="default">• {status}</Badge>
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                        Calendar
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        View all maintenance schedules and service requests
                    </p>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                Type
                            </label>
                            <Select
                                value={filterType}
                                onValueChange={(value) => setFilterType(value as typeof filterType)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All types</SelectItem>
                                    <SelectItem value="service-request">Service requests</SelectItem>
                                    <SelectItem value="maintenance">Maintenance</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                Building
                            </label>
                            <Select
                                value={filterBuilding}
                                onValueChange={setFilterBuilding}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select building" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All buildings</SelectItem>
                                    {buildings.map(building => (
                                        <SelectItem key={building} value={building}>{building}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                Status
                            </label>
                            <Select
                                value={filterStatus}
                                onValueChange={setFilterStatus}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All statuses</SelectItem>
                                    {statuses.map(status => (
                                        <SelectItem key={status} value={status}>{status}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-2">
                    <Card>
                        <div className="p-4">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                modifiers={modifiers}
                                modifiersClassNames={modifiersClassNames}
                                className="w-full"
                            />
                        </div>
                    </Card>
                </div>

                {/* Events for selected date */}
                <div className="lg:col-span-1">
                    <Card>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
                                {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
                            </h3>
                            
                            {selectedDateEvents.length === 0 ? (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    No events scheduled for this date
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {selectedDateEvents.map(event => (
                                        <div
                                            key={event.id}
                                            className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    {getEventIcon(event)}
                                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                                        {event.type === "maintenance" ? "Maintenance" : "Service Request"}
                                                    </span>
                                                </div>
                                                {getPriorityBadge(event.priority)}
                                            </div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                                {event.title}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {event.building}
                                                </span>
                                                {getStatusBadge(event.status)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Summary Stats */}
                    <Card className="mt-4">
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
                                Summary
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        Total events
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                        {filteredEvents.length}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        Service requests
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                        {filteredEvents.filter(e => e.type === "service-request").length}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        Maintenance scheduled
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                        {filteredEvents.filter(e => e.type === "maintenance").length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

