"use client"

import { Card } from "@/components/Card"
import { BigCalendar } from "@/components/ui/big-calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { serviceRequests } from "@/data/data"
import { equipment } from "@/data/equipment"
import { useState, useMemo } from "react"
import { parseISO, addHours } from "date-fns"
import { useRouter } from "next/navigation"

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
    const router = useRouter()
    const [filterType, setFilterType] = useState<"all" | "service-request" | "maintenance">("all")
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
            if (filterStatus !== "all" && event.status !== filterStatus) return false
            return true
        })
    }, [allEvents, filterType, filterStatus])

    // Convert to react-big-calendar format and sort by start time (earliest first)
    const calendarEvents = useMemo(() => {
        return filteredEvents
            .map(event => ({
                id: event.id,
                title: event.title,
                start: event.date,
                end: addHours(event.date, 1), // Default 1 hour duration
                resource: event
            }))
            .sort((a, b) => a.start.getTime() - b.start.getTime())
    }, [filteredEvents])

    // Get unique statuses for filter
    const statuses = useMemo(() => {
        const statusSet = new Set(allEvents.map(e => e.status))
        return Array.from(statusSet).sort()
    }, [allEvents])


    const handleSelectEvent = (event: any) => {
        const calendarEvent = event.resource as CalendarEvent
        if (calendarEvent.type === "maintenance" && calendarEvent.equipmentId) {
            router.push(`/operations/service-requests/equipment/${calendarEvent.equipmentId}`)
        } else if (calendarEvent.type === "service-request") {
            router.push(`/operations/service-requests/${calendarEvent.id.replace("sr-", "")}`)
        }
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <BigCalendar
                                events={calendarEvents}
                                onSelectEvent={handleSelectEvent}
                                defaultView="week"
                            />
                        </div>
                    </Card>
                </div>

                {/* Summary Stats */}
                <div className="lg:col-span-1 space-y-4">
                    <Card>
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
