"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getDemoConfig } from "@/config/demos"
import { useDemo } from "@/contexts/DemoContext"
import { cn } from "@/lib/utils"
import {
    Calendar,
    ChevronRight,
    Copy,
    DoorOpen,
    Edit2,
    Grid,
    List,
    Mail,
    MessageCircle,
    MessageSquare,
    MoreVertical,
    NotepadText,
    Plus,
    Search,
    Settings,
    User,
    UserCheck,
    Users,
    X,
    Zap
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

// Generate touchpoints heatmap data from lease start to lease end
function generateTouchpointsData(leaseStart: Date, leaseEnd: Date, today: Date) {
    const data: { date: Date; count: number }[] = []
    const endDate = leaseEnd > today ? today : leaseEnd

    // Calculate total days in lease period for decay calculation
    const totalLeaseDays = Math.max(1, (endDate.getTime() - leaseStart.getTime()) / (1000 * 60 * 60 * 24))

    // Generate data for each day from lease start to today (or lease end if passed)
    const current = new Date(leaseStart)
    while (current <= endDate) {
        // Calculate how far into the lease we are (0 = start, 1 = end)
        const daysIntoLease = (current.getTime() - leaseStart.getTime()) / (1000 * 60 * 60 * 24)
        const leaseProgress = daysIntoLease / totalLeaseDays

        // Decay factor: starts at 1.0, decays to ~0.15 by end of lease
        // Using exponential decay for natural falloff
        const decayFactor = Math.exp(-2.5 * leaseProgress)

        // Random touchpoints count with decay applied
        const dayOfWeek = current.getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

        // Base chance: weekdays high (0.85), weekends very low (0.1)
        const baseChance = isWeekend ? 0.1 * decayFactor : 0.85 * decayFactor

        // Max count: weekdays up to 4, weekends max 1
        const maxCount = isWeekend ? 1 : Math.max(1, Math.round(4 * decayFactor))

        let count = 0
        if (Math.random() < baseChance) {
            if (isWeekend) {
                // Weekends: always just 1 if any activity
                count = 1
            } else {
                // Weekdays: Higher counts more likely at start of lease
                const countChance = Math.random()
                if (countChance < 0.3 * decayFactor) {
                    count = maxCount // High activity
                } else if (countChance < 0.6 * decayFactor) {
                    count = Math.max(1, maxCount - 1)
                } else {
                    count = Math.max(1, Math.ceil(maxCount / 2))
                }
            }
        }

        data.push({
            date: new Date(current),
            count
        })
        current.setDate(current.getDate() + 1)
    }

    // Add future days up to lease end with count -2 (future/empty)
    if (leaseEnd > today) {
        const futureDate = new Date(today)
        futureDate.setDate(futureDate.getDate() + 1)
        while (futureDate <= leaseEnd) {
            data.push({
                date: new Date(futureDate),
                count: -2 // -2 means future
            })
            futureDate.setDate(futureDate.getDate() + 1)
        }
    }

    return data
}

// Touchpoints Heatmap Component
interface TouchpointsHeatmapProps {
    leaseStart: Date
    leaseEnd: Date
}

function TouchpointsHeatmap({ leaseStart, leaseEnd }: TouchpointsHeatmapProps) {
    // Use Feb 26, 2026 as "today" for demo purposes
    const today = useMemo(() => new Date(2026, 1, 26), []) // Month is 0-indexed, so 1 = February
    const touchpointsData = useMemo(() => generateTouchpointsData(leaseStart, leaseEnd, today), [leaseStart, leaseEnd, today])

    // Get months for header - only up to today or lease end, whichever is earlier
    const months = useMemo(() => {
        const result: { name: string; weeks: number; startWeekIdx: number }[] = []
        const endDate = leaseEnd > today ? today : leaseEnd

        let currentMonth = leaseStart.getMonth()
        let currentYear = leaseStart.getFullYear()
        let weekCount = 0
        let startWeekIdx = 0

        const tempDate = new Date(leaseStart)
        while (tempDate <= endDate) {
            if (tempDate.getMonth() !== currentMonth || tempDate.getFullYear() !== currentYear) {
                result.push({
                    name: new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
                    weeks: Math.ceil(weekCount / 7),
                    startWeekIdx
                })
                currentMonth = tempDate.getMonth()
                currentYear = tempDate.getFullYear()
                startWeekIdx += Math.ceil(weekCount / 7)
                weekCount = 0
            }
            weekCount++
            tempDate.setDate(tempDate.getDate() + 1)
        }
        // Add last month
        result.push({
            name: new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
            weeks: Math.ceil(weekCount / 7),
            startWeekIdx
        })

        return result
    }, [leaseStart, leaseEnd])

    // Organize data into weeks (columns) and days (rows)
    const weeks = useMemo(() => {
        const result: { date: Date; count: number }[][] = []
        let currentWeek: { date: Date; count: number }[] = []

        // Pad the first week if it doesn't start on Sunday
        const firstDayOfWeek = touchpointsData[0]?.date.getDay() || 0
        for (let i = 0; i < firstDayOfWeek; i++) {
            currentWeek.push({ date: new Date(0), count: -1 }) // -1 means empty/before lease
        }

        touchpointsData.forEach((day) => {
            currentWeek.push(day)
            if (currentWeek.length === 7) {
                result.push(currentWeek)
                currentWeek = []
            }
        })

        // Pad the last week
        while (currentWeek.length > 0 && currentWeek.length < 7) {
            currentWeek.push({ date: new Date(0), count: -1 })
        }
        if (currentWeek.length > 0) {
            result.push(currentWeek)
        }

        return result
    }, [touchpointsData])

    // Find week indices for lease start, lease end, and current week
    const markerWeeks = useMemo(() => {
        let leaseStartWeekIdx = 0
        let leaseEndWeekIdx = weeks.length - 1
        let currentWeekIdx = -1

        weeks.forEach((week, weekIdx) => {
            week.forEach((day) => {
                if (day.count >= -1 && day.date.getTime() > 0) {
                    // Lease start week
                    if (day.date.toDateString() === leaseStart.toDateString()) {
                        leaseStartWeekIdx = weekIdx
                    }
                    // Lease end week
                    if (day.date.toDateString() === leaseEnd.toDateString()) {
                        leaseEndWeekIdx = weekIdx
                    }
                    // Current week
                    const weekStart = new Date(today)
                    weekStart.setDate(today.getDate() - today.getDay())
                    const weekEnd = new Date(weekStart)
                    weekEnd.setDate(weekStart.getDate() + 6)
                    if (day.date >= weekStart && day.date <= weekEnd) {
                        currentWeekIdx = weekIdx
                    }
                }
            })
        })

        return { leaseStartWeekIdx, leaseEndWeekIdx, currentWeekIdx }
    }, [weeks, leaseStart, leaseEnd, today])

    // Calculate stats
    const stats = useMemo(() => {
        const validData = touchpointsData.filter(d => d.count >= 0)
        const total = validData.reduce((sum, d) => sum + d.count, 0)
        const weeksWithData = weeks.filter(w => w.some(d => d.count >= 0)).length
        const avgPerWeek = weeksWithData > 0 ? (total / weeksWithData).toFixed(1) : '0'
        return { total, avgPerWeek }
    }, [touchpointsData, weeks])

    const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

    const getColorClass = (count: number) => {
        if (count === -1) return 'bg-transparent'
        if (count === -2) return 'bg-gray-50 dark:bg-gray-900' // Future
        if (count === 0) return 'bg-gray-100 dark:bg-gray-800'
        if (count === 1) return 'bg-blue-200 dark:bg-blue-900'
        if (count === 2) return 'bg-blue-400 dark:bg-blue-700'
        if (count === 3) return 'bg-blue-500 dark:bg-blue-600'
        return 'bg-blue-600 dark:bg-blue-500'
    }

    // Calculate total width needed for the heatmap
    const totalWeeks = weeks.length
    const heatmapWidth = totalWeeks * 12 + (totalWeeks - 1) * 2 // 10px cells + 2px gaps

    return (
        <Card className="p-6 mb-6 max-w-full overflow-hidden">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 leading-tight">Touchpoints with Key Contacts</h3>
                    <p className="text-sm text-gray-500 leading-tight">Interactions over tenant lifecycle</p>
                </div>
                <div className="flex items-center gap-8 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-semibold text-gray-900 dark:text-gray-50">{stats.total}</span>
                        <span className="text-gray-500">Total touchpoints</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-semibold text-gray-900 dark:text-gray-50">{stats.avgPerWeek}</span>
                        <span className="text-gray-500">Avg per week</span>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                        <Button variant="outline" size="sm">
                            Record Touchpoint
                        </Button>
                        <Button size="sm">
                            Reach Out
                        </Button>
                    </div>
                </div>
            </div>

            {/* Heatmap container with scroll */}
            <div className="flex mt-10">
                {/* Fixed day labels column */}
                <div className="shrink-0 pr-2">
                    {/* Spacer to match month labels height */}
                    <div className="h-5 mb-1" />
                    <div className="flex flex-col gap-[2px] text-xs text-gray-500">
                        {dayLabels.map((day, idx) => (
                            <div key={idx} className="h-[10px] flex items-center justify-end w-7">
                                {day}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scrollable heatmap area - key: w-0 flex-1 forces it to not grow beyond container */}
                <div className="w-0 flex-1 overflow-x-auto">
                    <div style={{ width: `${heatmapWidth}px` }}>
                        {/* Month labels */}
                        <div className="flex h-5 mb-1">
                            {months.map((month, idx) => (
                                <div
                                    key={idx}
                                    className="text-xs text-gray-500"
                                    style={{ width: `${month.weeks * 14}px`, minWidth: `${month.weeks * 14}px` }}
                                >
                                    {month.name}
                                </div>
                            ))}
                        </div>

                        {/* Grid with marker lines */}
                        <div className="flex gap-[2px] relative">
                            {weeks.map((week, weekIdx) => (
                                <div key={weekIdx} className="flex flex-col gap-[2px] relative">
                                    {/* Lease start marker (red line) */}
                                    {weekIdx === markerWeeks.leaseStartWeekIdx && (
                                        <div className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-red-500 z-10" title={`Lease Start: ${leaseStart.toLocaleDateString()}`} />
                                    )}
                                    {/* Current week marker (blue line) */}
                                    {weekIdx === markerWeeks.currentWeekIdx && (
                                        <div className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-blue-500 z-10" title={`Current Week`} />
                                    )}
                                    {/* Lease end marker (red line) */}
                                    {weekIdx === markerWeeks.leaseEndWeekIdx && (
                                        <div className="absolute -right-[1px] top-0 bottom-0 w-[2px] bg-red-500 z-10" title={`Lease End: ${leaseEnd.toLocaleDateString()}`} />
                                    )}
                                    {/* Reorder to start from Monday */}
                                    {[1, 2, 3, 4, 5, 6, 0].map((dayIndex) => {
                                        const day = week[dayIndex]
                                        if (!day) return <div key={dayIndex} className="w-[10px] h-[10px]" />
                                        return (
                                            <div
                                                key={dayIndex}
                                                className={cn(
                                                    "w-[10px] h-[10px] rounded-[2px]",
                                                    getColorClass(day.count)
                                                )}
                                                title={day.count >= 0 ? `${day.date.toLocaleDateString()}: ${day.count} touchpoint${day.count !== 1 ? 's' : ''}` : day.count === -2 ? `${day.date.toLocaleDateString()}: Future` : ''}
                                            />
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend - outside scrollable area */}
            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <div className="w-[2px] h-3 bg-red-500" />
                        <span>Lease Start/End</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-[2px] h-3 bg-blue-500" />
                        <span>Current Week</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span>Less</span>
                    <div className="flex gap-[2px]">
                        <div className="w-[10px] h-[10px] rounded-[2px] bg-gray-100 dark:bg-gray-800" />
                        <div className="w-[10px] h-[10px] rounded-[2px] bg-blue-200 dark:bg-blue-900" />
                        <div className="w-[10px] h-[10px] rounded-[2px] bg-blue-400 dark:bg-blue-700" />
                        <div className="w-[10px] h-[10px] rounded-[2px] bg-blue-500 dark:bg-blue-600" />
                        <div className="w-[10px] h-[10px] rounded-[2px] bg-blue-600 dark:bg-blue-500" />
                    </div>
                    <span>More</span>
                </div>
            </div>
        </Card>
    )
}

// Seeded random number generator for consistent activity data
function seededRandom(seed: number): () => number {
    return () => {
        seed = (seed * 9301 + 49297) % 233280
        return seed / 233280
    }
}

// Generate activity heatmap data (combined from all activity types)
// Activity GROWS over time (opposite of touchpoints which decay)
function generateActivityData(leaseStart: Date, leaseEnd: Date, today: Date) {
    const data: { date: Date; count: number }[] = []
    const endDate = leaseEnd > today ? today : leaseEnd

    const totalLeaseDays = Math.max(1, (endDate.getTime() - leaseStart.getTime()) / (1000 * 60 * 60 * 24))

    // Use seeded random based on lease start for consistency
    const random = seededRandom(leaseStart.getTime() % 10000)

    const current = new Date(leaseStart)
    while (current <= endDate) {
        const daysIntoLease = (current.getTime() - leaseStart.getTime()) / (1000 * 60 * 60 * 24)
        const leaseProgress = daysIntoLease / totalLeaseDays

        // Growth factor: starts low (~0.3), grows to 1.0 by end of lease
        // Using inverse exponential for natural growth
        const growthFactor = 0.3 + 0.7 * (1 - Math.exp(-3 * leaseProgress))

        const dayOfWeek = current.getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

        // Activity increases over time - more engagement as tenant settles in
        const baseChance = isWeekend ? 0.1 + 0.15 * growthFactor : 0.5 + 0.45 * growthFactor
        const maxCount = isWeekend ? Math.round(1 + growthFactor) : Math.round(3 + 5 * growthFactor)

        let count = 0
        if (random() < baseChance) {
            if (isWeekend) {
                count = random() < 0.3 * growthFactor ? 2 : 1
            } else {
                const countChance = random()
                if (countChance < 0.3 * growthFactor) {
                    count = maxCount
                } else if (countChance < 0.55 * growthFactor) {
                    count = Math.max(2, maxCount - 2)
                } else if (countChance < 0.8) {
                    count = Math.max(1, Math.ceil(maxCount / 2))
                } else {
                    count = Math.max(1, Math.ceil(maxCount / 3))
                }
            }
        }

        data.push({ date: new Date(current), count })
        current.setDate(current.getDate() + 1)
    }

    return data
}

// Activity Heatmap Component with Range Brush
interface ActivityHeatmapProps {
    leaseStart: Date
    leaseEnd: Date
    activeFilters: Set<string>
    onRangeChange: (range: [Date, Date], metrics: { access: number; bookings: number; visitors: number; notes: number; responses: number; requests: number }) => void
}

// All 6 activity categories
const ALL_CATEGORIES = ['access', 'bookings', 'visitors', 'notes', 'responses', 'requests'] as const

function ActivityHeatmap({ leaseStart, leaseEnd, activeFilters, onRangeChange }: ActivityHeatmapProps) {
    const today = useMemo(() => new Date(2026, 1, 26), [])
    const activityData = useMemo(() => generateActivityData(leaseStart, leaseEnd, today), [leaseStart, leaseEnd, today])
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Organize data into weeks
    const weeks = useMemo(() => {
        const result: { date: Date; count: number }[][] = []
        let currentWeek: { date: Date; count: number }[] = []

        const firstDayOfWeek = activityData[0]?.date.getDay() || 0
        for (let i = 0; i < firstDayOfWeek; i++) {
            currentWeek.push({ date: new Date(0), count: -1 })
        }

        activityData.forEach((day) => {
            currentWeek.push(day)
            if (currentWeek.length === 7) {
                result.push(currentWeek)
                currentWeek = []
            }
        })

        while (currentWeek.length > 0 && currentWeek.length < 7) {
            currentWeek.push({ date: new Date(0), count: -1 })
        }
        if (currentWeek.length > 0) {
            result.push(currentWeek)
        }

        return result
    }, [activityData])

    // Get months for header
    const months = useMemo(() => {
        const result: { name: string; weeks: number; startWeekIdx: number }[] = []
        const endDate = leaseEnd > today ? today : leaseEnd

        let currentMonth = leaseStart.getMonth()
        let currentYear = leaseStart.getFullYear()
        let weekCount = 0
        let startWeekIdx = 0

        const tempDate = new Date(leaseStart)
        while (tempDate <= endDate) {
            if (tempDate.getMonth() !== currentMonth || tempDate.getFullYear() !== currentYear) {
                result.push({
                    name: new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
                    weeks: Math.ceil(weekCount / 7),
                    startWeekIdx
                })
                currentMonth = tempDate.getMonth()
                currentYear = tempDate.getFullYear()
                startWeekIdx += Math.ceil(weekCount / 7)
                weekCount = 0
            }
            weekCount++
            tempDate.setDate(tempDate.getDate() + 1)
        }
        result.push({
            name: new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
            weeks: Math.ceil(weekCount / 7),
            startWeekIdx
        })

        return result
    }, [leaseStart, leaseEnd, today])

    // Calculate default 90-day range (approximately 13 weeks)
    const default90DayRange = useMemo((): [number, number] => {
        const weeksFor90Days = Math.ceil(90 / 7) // ~13 weeks
        const endWeekIdx = weeks.length - 1
        const startWeekIdx = Math.max(0, endWeekIdx - weeksFor90Days + 1)
        return [startWeekIdx, endWeekIdx]
    }, [weeks.length])

    // Range brush state (week indices) - default to last 90 days
    const [selectedRange, setSelectedRange] = useState<[number, number]>(default90DayRange)
    const [dragState, setDragState] = useState<{ type: 'start' | 'end' | 'range'; startX: number; startRange: [number, number] } | null>(null)
    const [hasInitialized, setHasInitialized] = useState(false)

    // Convert week index to date
    const weekIndexToDate = useCallback((weekIdx: number, position: 'start' | 'end'): Date => {
        if (weekIdx < 0) weekIdx = 0
        if (weekIdx >= weeks.length) weekIdx = weeks.length - 1

        const week = weeks[weekIdx]
        if (!week) return leaseStart

        if (position === 'start') {
            // Find first valid date in week
            for (const day of week) {
                if (day.count >= 0) return day.date
            }
            return leaseStart
        } else {
            // Find last valid date in week
            for (let i = week.length - 1; i >= 0; i--) {
                if (week[i].count >= 0) return week[i].date
            }
            return today
        }
    }, [weeks, leaseStart, today])

    // Calculate metrics for selected range using seeded random for distribution
    const calculateRangeMetrics = useCallback((range: [number, number]) => {
        let totalCount = 0

        // Sum up activity counts in the selected range
        for (let weekIdx = range[0]; weekIdx <= range[1]; weekIdx++) {
            const week = weeks[weekIdx]
            if (!week) continue
            for (const day of week) {
                if (day.count > 0) {
                    totalCount += day.count
                }
            }
        }

        // Distribute total across categories using consistent ratios
        // Access tends to be highest, then bookings, then visitors, etc.
        const ratios = {
            access: 0.30,
            bookings: 0.22,
            visitors: 0.18,
            notes: 0.12,
            responses: 0.10,
            requests: 0.08
        }

        return {
            access: Math.round(totalCount * ratios.access),
            bookings: Math.round(totalCount * ratios.bookings),
            visitors: Math.round(totalCount * ratios.visitors),
            notes: Math.round(totalCount * ratios.notes),
            responses: Math.round(totalCount * ratios.responses),
            requests: Math.round(totalCount * ratios.requests)
        }
    }, [weeks])

    // Notify parent of range changes with metrics
    const notifyRangeChange = useCallback((range: [number, number]) => {
        const startDate = weekIndexToDate(range[0], 'start')
        const endDate = weekIndexToDate(range[1], 'end')
        const metrics = calculateRangeMetrics(range)
        onRangeChange([startDate, endDate], metrics)
    }, [weekIndexToDate, calculateRangeMetrics, onRangeChange])

    // Handle mouse events for range brush
    const handleMouseDown = useCallback((e: React.MouseEvent, type: 'start' | 'end' | 'range') => {
        e.preventDefault()
        setDragState({ type, startX: e.clientX, startRange: [...selectedRange] as [number, number] })
    }, [selectedRange])

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!dragState || !containerRef.current) return

        const cellWidth = 14 // 10px cell + 2px gap (adjusted for both sides)
        const deltaX = e.clientX - dragState.startX
        const deltaWeeks = Math.round(deltaX / cellWidth)

        let newRange: [number, number] = [...dragState.startRange] as [number, number]

        if (dragState.type === 'start') {
            newRange[0] = Math.max(0, Math.min(dragState.startRange[0] + deltaWeeks, newRange[1] - 1))
        } else if (dragState.type === 'end') {
            newRange[1] = Math.min(weeks.length - 1, Math.max(dragState.startRange[1] + deltaWeeks, newRange[0] + 1))
        } else if (dragState.type === 'range') {
            const rangeSize = dragState.startRange[1] - dragState.startRange[0]
            let newStart = dragState.startRange[0] + deltaWeeks
            newStart = Math.max(0, Math.min(newStart, weeks.length - 1 - rangeSize))
            newRange = [newStart, newStart + rangeSize]
        }

        setSelectedRange(newRange)
        notifyRangeChange(newRange)
    }, [dragState, weeks.length, notifyRangeChange])

    const handleMouseUp = useCallback(() => {
        setDragState(null)
    }, [])

    // Attach global mouse listeners for drag
    useEffect(() => {
        if (dragState) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
            return () => {
                window.removeEventListener('mousemove', handleMouseMove)
                window.removeEventListener('mouseup', handleMouseUp)
            }
        }
    }, [dragState, handleMouseMove, handleMouseUp])

    // Auto-scroll to selected range on mount and notify parent
    useEffect(() => {
        if (!hasInitialized && scrollContainerRef.current && weeks.length > 0) {
            const cellWidth = 14 // 10px cell + 2px gap
            const scrollPosition = Math.max(0, selectedRange[0] * cellWidth - 50) // 50px offset for context
            scrollContainerRef.current.scrollLeft = scrollPosition

            // Notify parent of initial range
            notifyRangeChange(selectedRange)
            setHasInitialized(true)
        }
    }, [hasInitialized, weeks.length, selectedRange, notifyRangeChange])

    // Calculate filter scale factor - when filters are active, scale down density
    const filterScale = useMemo(() => {
        // If no filters active, show full density (all categories)
        if (activeFilters.size === 0) return 1
        // Scale based on how many categories are selected (out of 6)
        return activeFilters.size / ALL_CATEGORIES.length
    }, [activeFilters.size])

    const getColorClass = (count: number, weekIdx: number) => {
        const isInRange = weekIdx >= selectedRange[0] && weekIdx <= selectedRange[1]
        const opacity = isInRange ? '' : 'opacity-30'

        if (count === -1) return 'bg-transparent'

        // Scale the count based on active filters
        const scaledCount = Math.round(count * filterScale)

        if (scaledCount === 0) return cn('bg-gray-100 dark:bg-gray-800', opacity)
        if (scaledCount <= 2) return cn('bg-blue-200 dark:bg-blue-900', opacity)
        if (scaledCount <= 4) return cn('bg-blue-400 dark:bg-blue-700', opacity)
        if (scaledCount <= 6) return cn('bg-blue-500 dark:bg-blue-600', opacity)
        return cn('bg-blue-600 dark:bg-blue-500', opacity)
    }

    const totalWeeks = weeks.length
    const heatmapWidth = totalWeeks * 12 + (totalWeeks - 1) * 2

    // Format date range for display
    const formatRangeLabel = (weekIdx: number): string => {
        const date = weekIndexToDate(weekIdx, weekIdx === selectedRange[0] ? 'start' : 'end')
        return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    }

    return (
        <Card className="p-6 mb-6 max-w-full overflow-hidden">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 leading-tight">Activity</h3>
            </div>

            {/* Heatmap container */}
            <div className="flex mt-6" ref={containerRef}>
                {/* Fixed day labels column */}
                <div className="shrink-0 pr-2">
                    <div className="h-5 mb-1" />
                    <div className="flex flex-col gap-[2px] text-xs text-gray-500">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                            <div key={idx} className="h-[10px] flex items-center justify-end w-7">
                                {day}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scrollable heatmap area */}
                <div className="w-0 flex-1 overflow-x-auto" ref={scrollContainerRef}>
                    <div style={{ width: `${heatmapWidth}px` }}>
                        {/* Month labels */}
                        <div className="flex h-5 mb-1">
                            {months.map((month, idx) => (
                                <div
                                    key={idx}
                                    className="text-xs text-gray-500"
                                    style={{ width: `${month.weeks * 14}px`, minWidth: `${month.weeks * 14}px` }}
                                >
                                    {month.name}
                                </div>
                            ))}
                        </div>

                        {/* Grid */}
                        <div className="flex gap-[2px] relative">
                            {weeks.map((week, weekIdx) => (
                                <div key={weekIdx} className="flex flex-col gap-[2px]">
                                    {[1, 2, 3, 4, 5, 6, 0].map((dayIndex) => {
                                        const day = week[dayIndex]
                                        if (!day) return <div key={dayIndex} className="w-[10px] h-[10px]" />
                                        return (
                                            <div
                                                key={dayIndex}
                                                className={cn(
                                                    "w-[10px] h-[10px] rounded-[2px] transition-opacity",
                                                    getColorClass(day.count, weekIdx)
                                                )}
                                                title={day.count >= 0 ? `${day.date.toLocaleDateString()}: ${day.count} activities` : ''}
                                            />
                                        )
                                    })}
                                </div>
                            ))}
                        </div>

                        {/* Range Brush */}
                        <div className="relative mt-3 h-8">
                            {/* Track background */}
                            <div className="absolute inset-x-0 top-3 h-2 bg-gray-100 dark:bg-gray-800 rounded-full" />

                            {/* Selected range highlight */}
                            <div
                                className="absolute top-3 h-2 bg-blue-200 dark:bg-blue-800 rounded-full cursor-move"
                                style={{
                                    left: `${(selectedRange[0] / totalWeeks) * 100}%`,
                                    width: `${((selectedRange[1] - selectedRange[0] + 1) / totalWeeks) * 100}%`
                                }}
                                onMouseDown={(e) => handleMouseDown(e, 'range')}
                            />

                            {/* Start handle */}
                            <div
                                className="absolute top-1 w-4 h-6 bg-blue-500 rounded cursor-ew-resize flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors"
                                style={{ left: `calc(${(selectedRange[0] / totalWeeks) * 100}% - 8px)` }}
                                onMouseDown={(e) => handleMouseDown(e, 'start')}
                            >
                                <div className="w-0.5 h-3 bg-white rounded-full" />
                            </div>

                            {/* End handle */}
                            <div
                                className="absolute top-1 w-4 h-6 bg-blue-500 rounded cursor-ew-resize flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors"
                                style={{ left: `calc(${((selectedRange[1] + 1) / totalWeeks) * 100}% - 8px)` }}
                                onMouseDown={(e) => handleMouseDown(e, 'end')}
                            >
                                <div className="w-0.5 h-3 bg-white rounded-full" />
                            </div>
                        </div>

                        {/* Range labels */}
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                            <span>{formatRangeLabel(selectedRange[0])}</span>
                            <span>{formatRangeLabel(selectedRange[1])}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

// Type for building details
interface BuildingDetail {
    rentedArea: string
    employees: number
    leaseExpiration: string
    floors: { number: number; suites: string[] }[]
}

// Type for tenant data
interface TenantData {
    id: string
    name: string
    industry: string
    website: string
    domains: string
    employees: number
    billingAddress: string
    creationDate: string
    status: string
    description: string
    leaseStartDate: string
    leaseEndDate: string
    buildingIds: string[]
    contacts: {
        id: string
        name: string
        email: string
        buildingId: string
        avatar: string
        notificationCount: number
        badges: string[]
        isPrimary: boolean
    }[]
    activity: {
        id: string
        type: string
        title: string
        subtitle?: string
        date: string
        icon: string
        category?: string
    }[]
    buildingDetails: Record<string, BuildingDetail>
    appConfigurations: {
        buildingId: string
        lastEdited: string | null
        apps: {
            submitRequest: boolean
            registerVisitor: boolean
            digitalKey: boolean
            foodhub: boolean
            wellnessSpaces: boolean
            bookAClass: boolean
            meetingSpaces: boolean
        } | null
    }[]
    activityMetrics: {
        access: number
        bookings: number
        visitors: number
        notes: number
        responses: number
        requests: number
    }
}

// Mock data for tenants - references demo building IDs
const tenantsData: Record<string, TenantData> = {
    "1": {
        id: "1",
        name: "EcoVolt Energy Solutions",
        industry: "Renewables & Environment",
        website: "https://www.ecovolt.io",
        domains: "ecovolt.com",
        employees: 466,
        billingAddress: "200 Clarendon Street, Boston, MA 02116, USA",
        creationDate: "March 14, 2024 at 04:05 PM",
        status: "Active",
        description: "EcoVolt Energy Solutions innovates in the Renewable Electricity industry, focusing on sustainable energy generation and storage from wind, solar, and more. We aim to provide clean electricity, reduce carbon footprints, and promote energy independence, driving towards a greener future.",
        leaseStartDate: "2022-03-22",
        leaseEndDate: "2027-03-22",
        // References to demo building IDs
        buildingIds: ["1", "2", "3"],
        // Contact building references by demo building ID
        contacts: [
            {
                id: "1",
                name: "Alex Morgan",
                email: "amorgan@ecovoltenergy.com",
                buildingId: "1", // 200 Clarendon
                avatar: "/avatars/default-avatar.png",
                notificationCount: 0,
                badges: ["VIP", "Executive"],
                isPrimary: false
            },
            {
                id: "2",
                name: "Jordon Lee",
                email: "jlee@ecovoltenergy.com",
                buildingId: "2", // Prudential Tower
                avatar: "/avatars/default-avatar.png",
                notificationCount: 2,
                badges: [],
                isPrimary: true
            },
            {
                id: "3",
                name: "Taylor Kim",
                email: "kim@ecovoltenergy.com",
                buildingId: "3", // One Congress
                avatar: "/avatars/default-avatar.png",
                notificationCount: 1,
                badges: [],
                isPrimary: false
            }
        ],
        activity: [
            {
                id: "1",
                type: "Access",
                title: "Alex Morgan accessed 200 Clarendon via mobile key",
                date: "February 26, 2026 at 09:15 AM",
                icon: "access",
                category: "access"
            },
            {
                id: "2",
                type: "Booking",
                title: "Conference Room A booked for team meeting",
                subtitle: "200 Clarendon - Floor 8, 2:00 PM - 4:00 PM",
                date: "February 26, 2026 at 08:30 AM",
                icon: "booking",
                category: "bookings"
            },
            {
                id: "3",
                type: "Request",
                title: "HVAC temperature adjustment requested",
                subtitle: "Suite 801 - Pending review",
                date: "February 25, 2026 at 04:45 PM",
                icon: "request",
                category: "requests"
            },
            {
                id: "4",
                type: "Visitor",
                title: "Sarah Chen checked in as visitor",
                subtitle: "Host: Jordan Lee - Prudential Tower",
                date: "February 25, 2026 at 02:30 PM",
                icon: "visitor",
                category: "visitors"
            },
            {
                id: "5",
                type: "Access",
                title: "Jordan Lee accessed Prudential Tower via badge",
                date: "February 25, 2026 at 08:45 AM",
                icon: "access",
                category: "access"
            },
            {
                id: "6",
                type: "Response",
                title: "Survey response submitted",
                subtitle: "Q4 2025 Tenant Satisfaction Survey - Rating: 4.5/5",
                date: "February 24, 2026 at 03:20 PM",
                icon: "response",
                category: "responses"
            },
            {
                id: "7",
                type: "Note Added",
                title: "Discussed lease renewal options with Alex Morgan",
                date: "February 24, 2026 at 11:00 AM",
                icon: "note",
                category: "notes"
            },
            {
                id: "8",
                type: "Booking",
                title: "Wellness room reserved for yoga session",
                subtitle: "Prudential Tower - Floor 4, 12:00 PM - 1:00 PM",
                date: "February 24, 2026 at 09:15 AM",
                icon: "booking",
                category: "bookings"
            },
            {
                id: "9",
                type: "Request",
                title: "Parking pass renewal submitted",
                subtitle: "Employee: Michael Torres - Approved",
                date: "February 23, 2026 at 02:00 PM",
                icon: "request",
                category: "requests"
            },
            {
                id: "10",
                type: "Access",
                title: "15 employees accessed 111 Huntington Ave",
                date: "February 23, 2026 at 09:00 AM",
                icon: "access",
                category: "access"
            },
            {
                id: "11",
                type: "Visitor",
                title: "Client meeting visitors checked in (3 guests)",
                subtitle: "Host: Alex Morgan - 200 Clarendon",
                date: "February 22, 2026 at 10:00 AM",
                icon: "visitor",
                category: "visitors"
            },
            {
                id: "12",
                type: "Note Added",
                title: "Locked in the elevator - maintenance notified",
                date: "February 21, 2026 at 03:07 PM",
                icon: "note",
                category: "notes"
            },
            {
                id: "13",
                type: "Response",
                title: "Event feedback received",
                subtitle: "Holiday Party 2025 - Very satisfied",
                date: "February 20, 2026 at 04:30 PM",
                icon: "response",
                category: "responses"
            },
            {
                id: "14",
                type: "Request",
                title: "Office supplies request submitted",
                subtitle: "Suite 901 - Delivered",
                date: "February 20, 2026 at 10:45 AM",
                icon: "request",
                category: "requests"
            },
            {
                id: "15",
                type: "Booking",
                title: "Training room booked for onboarding",
                subtitle: "200 Clarendon - Floor 9, 9:00 AM - 5:00 PM",
                date: "February 19, 2026 at 04:00 PM",
                icon: "booking",
                category: "bookings"
            }
        ],
        // Tenant-specific building details (rented area, employees, lease, floors)
        buildingDetails: {
            "1": {
                rentedArea: "27,475",
                employees: 157,
                leaseExpiration: "May 28, 2029",
                floors: [
                    { number: 8, suites: ["801"] },
                    { number: 9, suites: ["901"] }
                ]
            },
            "2": {
                rentedArea: "18,500",
                employees: 155,
                leaseExpiration: "September 1, 2026",
                floors: [
                    { number: 4, suites: ["401"] }
                ]
            },
            "3": {
                rentedArea: "22,000",
                employees: 154,
                leaseExpiration: "March 26, 2026",
                floors: [
                    { number: 9, suites: ["901"] },
                    { number: 8, suites: ["801"] }
                ]
            }
        },
        // App configurations reference demo building IDs
        appConfigurations: [
            {
                buildingId: "1",
                lastEdited: "Anastas Vartanyan on October 22, 2025",
                apps: {
                    submitRequest: true,
                    registerVisitor: true,
                    digitalKey: false,
                    foodhub: true,
                    wellnessSpaces: false,
                    bookAClass: true,
                    meetingSpaces: false
                }
            },
            {
                buildingId: "2",
                lastEdited: "Unknown user on December 31, 1969",
                apps: {
                    submitRequest: false,
                    registerVisitor: false,
                    digitalKey: false,
                    foodhub: false,
                    wellnessSpaces: false,
                    bookAClass: false,
                    meetingSpaces: false
                }
            },
            {
                buildingId: "3",
                lastEdited: null,
                apps: null
            }
        ],
        activityMetrics: {
            access: 1247,
            bookings: 89,
            visitors: 156,
            notes: 24,
            responses: 18,
            requests: 42
        }
    },
    "2": {
        id: "2",
        name: "Global Enterprises",
        industry: "Finance",
        website: "https://www.globalent.com",
        domains: "globalent.com",
        employees: 200,
        billingAddress: "415 Mission Street, San Francisco, CA 94105, USA",
        creationDate: "May 1, 2024 at 09:00 AM",
        status: "Active",
        description: "Global Enterprises is a leading financial services company providing comprehensive solutions for businesses worldwide.",
        leaseStartDate: "2023-06-01",
        leaseEndDate: "2028-05-31",
        buildingIds: ["21"], // Salesforce Tower
        contacts: [
            {
                id: "1",
                name: "Sarah Johnson",
                email: "sarah.j@globalent.com",
                buildingId: "21", // Salesforce Tower
                avatar: "/avatars/default-avatar.png",
                notificationCount: 2,
                badges: [],
                isPrimary: true
            }
        ],
        activity: [
            {
                id: "1",
                type: "Note Added",
                title: "Quarterly review meeting scheduled",
                date: "September 01, 2025 at 10:30 AM",
                icon: "note",
                category: "notes"
            }
        ],
        buildingDetails: {
            "21": {
                rentedArea: "15,000",
                employees: 200,
                leaseExpiration: "December 31, 2027",
                floors: [
                    { number: 10, suites: ["1001", "1002"] }
                ]
            }
        },
        appConfigurations: [],
        activityMetrics: {
            access: 534,
            bookings: 45,
            visitors: 78,
            notes: 12,
            responses: 8,
            requests: 15
        }
    }
}

// Activity Icon component
function ActivityIcon({ type }: { type: string }) {
    const iconClass = "size-4"
    const containerClass = "size-8 rounded-full flex items-center justify-center shrink-0"

    switch (type) {
        case "access":
            return (
                <div className={cn(containerClass, "bg-blue-100 dark:bg-blue-900/30")}>
                    <DoorOpen className={cn(iconClass, "text-blue-600 dark:text-blue-400")} />
                </div>
            )
        case "booking":
            return (
                <div className={cn(containerClass, "bg-green-100 dark:bg-green-900/30")}>
                    <Calendar className={cn(iconClass, "text-green-600 dark:text-green-400")} />
                </div>
            )
        case "visitor":
            return (
                <div className={cn(containerClass, "bg-yellow-100 dark:bg-yellow-900/30")}>
                    <UserCheck className={cn(iconClass, "text-yellow-600 dark:text-yellow-400")} />
                </div>
            )
        case "note":
            return (
                <div className={cn(containerClass, "bg-purple-100 dark:bg-purple-900/30")}>
                    <NotepadText className={cn(iconClass, "text-purple-600 dark:text-purple-400")} />
                </div>
            )
        case "response":
            return (
                <div className={cn(containerClass, "bg-red-100 dark:bg-red-900/30")}>
                    <MessageSquare className={cn(iconClass, "text-red-600 dark:text-red-400")} />
                </div>
            )
        case "request":
            return (
                <div className={cn(containerClass, "bg-orange-100 dark:bg-orange-900/30")}>
                    <MessageCircle className={cn(iconClass, "text-orange-600 dark:text-orange-400")} />
                </div>
            )
        case "settings":
            return (
                <div className={cn(containerClass, "bg-gray-100 dark:bg-gray-900/30")}>
                    <Settings className={cn(iconClass, "text-gray-600 dark:text-gray-400")} />
                </div>
            )
        default:
            return (
                <div className={cn(containerClass, "bg-blue-100 dark:bg-blue-900/30")}>
                    <NotepadText className={cn(iconClass, "text-blue-600 dark:text-blue-400")} />
                </div>
            )
    }
}

export default function TenantDetailPage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState("overview")
    const [contactViewMode, setContactViewMode] = useState<"list" | "grid">("list")
    const [searchQuery, setSearchQuery] = useState("")
    const [activityFilters, setActivityFilters] = useState<Set<string>>(new Set())
    const [activityDateRange, setActivityDateRange] = useState<[Date, Date] | null>(null)
    const [activityMetrics, setActivityMetrics] = useState<{ access: number; bookings: number; visitors: number; notes: number; responses: number; requests: number } | null>(null)
    const { demo } = useDemo()
    const demoConfig = getDemoConfig(demo)

    // Get tenant data based on ID
    const tenant: TenantData | undefined = tenantsData[params.id as keyof typeof tenantsData]

    // Get buildings from demo config that this tenant uses
    const tenantBuildings = useMemo(() => {
        if (!tenant) return []
        return tenant.buildingIds
            .map(id => demoConfig.buildings.find(b => b.id === id))
            .filter((b): b is NonNullable<typeof b> => b !== undefined)
    }, [tenant, demoConfig.buildings])

    // Helper function to get building name by ID
    const getBuildingName = (buildingId: string) => {
        const building = demoConfig.buildings.find(b => b.id === buildingId)
        return building?.name || "Unknown Building"
    }

    if (!tenant) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">Tenant not found</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">The tenant you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                    <Link href="/tenants" className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                        Back to tenants
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
                <Link href="/tenants" className="hover:text-gray-700 dark:hover:text-gray-300">Tenants</Link>
                <ChevronRight className="size-4" />
                <span className="text-gray-900 dark:text-gray-50 font-medium">{tenant.name}</span>
            </nav>

            {/* Company Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Company Logo */}
                    <div className="size-16 rounded-full bg-gradient-to-br from-green-400 to-yellow-400 flex items-center justify-center">
                        <Zap className="size-8 text-white" />
                    </div>

                    {/* Company Name and Edit Button */}
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">{tenant.name}</h1>
                        <Button variant="ghost" size="sm" className="p-1">
                            <Edit2 className="size-4 text-gray-500" />
                        </Button>
                    </div>
                </div>

                {/* Building Selector */}
                <div className="w-48">
                    <Select defaultValue="all-buildings">
                        <SelectTrigger className="bg-white dark:bg-gray-950">
                            <SelectValue placeholder="Select building" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-buildings">All Buildings</SelectItem>
                            {tenantBuildings.map((building) => (
                                <SelectItem key={building.id} value={building.id}>
                                    {building.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Tab Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="bg-transparent border-b border-gray-200 dark:border-gray-800 rounded-none p-0 h-auto w-full justify-start">
                    <TabsTrigger
                        value="overview"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-3 pt-0 text-gray-500 data-[state=active]:text-gray-900 dark:text-gray-400 dark:data-[state=active]:text-gray-50"
                    >
                        Overview
                    </TabsTrigger>
                    <TabsTrigger
                        value="contacts"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-3 pt-0 text-gray-500 data-[state=active]:text-gray-900 dark:text-gray-400 dark:data-[state=active]:text-gray-50"
                    >
                        Contacts
                    </TabsTrigger>
                    <TabsTrigger
                        value="activity"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-3 pt-0 text-gray-500 data-[state=active]:text-gray-900 dark:text-gray-400 dark:data-[state=active]:text-gray-50"
                    >
                        Activity
                    </TabsTrigger>
                    <TabsTrigger
                        value="app-configurations"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-3 pt-0 text-gray-500 data-[state=active]:text-gray-900 dark:text-gray-400 dark:data-[state=active]:text-gray-50"
                    >
                        App Configurations
                    </TabsTrigger>
                    <TabsTrigger
                        value="buildings"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-3 pt-0 text-gray-500 data-[state=active]:text-gray-900 dark:text-gray-400 dark:data-[state=active]:text-gray-50"
                    >
                        Buildings
                    </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-0 mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Details */}
                        <div className="lg:col-span-1">
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Details</h3>
                                    <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        View contacts
                                    </Link>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{tenant.description}</p>
                                        <Button variant="ghost" size="sm" className="p-1 -ml-1">
                                            <Edit2 className="size-4 text-gray-500" />
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-50">{tenant.industry}</p>
                                                <p className="text-sm text-gray-500">Industry</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="p-1">
                                                <Edit2 className="size-4 text-gray-500" />
                                            </Button>
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-50">{tenant.billingAddress}</p>
                                                <p className="text-sm text-gray-500">Billing Address</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="p-1">
                                                <Edit2 className="size-4 text-gray-500" />
                                            </Button>
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-50">{tenant.website}</p>
                                                <p className="text-sm text-gray-500">Website</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="p-1">
                                                <Edit2 className="size-4 text-gray-500" />
                                            </Button>
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-50">{tenant.employees}</p>
                                                <p className="text-sm text-gray-500">Employees</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="p-1">
                                                <Edit2 className="size-4 text-gray-500" />
                                            </Button>
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-50">{tenant.domains}</p>
                                                <p className="text-sm text-gray-500">Domains</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="p-1">
                                                <Edit2 className="size-4 text-gray-500" />
                                            </Button>
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-50">{tenant.creationDate}</p>
                                                <p className="text-sm text-gray-500">Creation Date</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Right Column - Contacts, Activity, Buildings */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Contacts Section */}
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Contacts</h3>
                                    <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        View contacts
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {tenant.contacts.slice(0, 3).map((contact) => (
                                        <div key={contact.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="size-10">
                                                    <AvatarFallback className="bg-gray-100 dark:bg-gray-800">
                                                        <User className="size-5 text-gray-500" />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-medium text-gray-900 dark:text-gray-50">{contact.name}</p>
                                                        {contact.badges?.map((badge) => (
                                                            <span key={badge} className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                                                {badge}
                                                            </span>
                                                        ))}
                                                        {contact.isPrimary && (
                                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                                                                Primary Contact
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500">{contact.email}</p>
                                                    <p className="text-xs text-gray-400 flex items-center gap-1">
                                                        <span className="size-3 rounded-full bg-gray-300 inline-block" />
                                                        {getBuildingName(contact.buildingId)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8">
                                                    <Mail className="size-4 text-gray-500" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8">
                                                    <Copy className="size-4 text-gray-500" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8">
                                                    <User className="size-4 text-gray-500" />
                                                </Button>
                                                {contact.notificationCount > 0 && (
                                                    <div className="size-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                                                        {contact.notificationCount}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Activity Section */}
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Activity</h3>
                                    <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        View activity
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {tenant.activity.slice(0, 4).map((activity) => (
                                        <div key={activity.id} className="flex items-start gap-3">
                                            <ActivityIcon type={activity.icon} />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className="font-medium text-sm text-gray-900 dark:text-gray-50">{activity.type}</span>
                                                    <span className="text-xs text-gray-500">{activity.date}</span>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{activity.title}</p>
                                                {'subtitle' in activity && activity.subtitle && (
                                                    <p className="text-sm text-gray-400">{activity.subtitle}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Buildings Section */}
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Buildings</h3>
                                    <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        View buildings
                                    </Link>
                                </div>

                                <div className="space-y-3">
                                    {tenantBuildings.slice(0, 3).map((building) => (
                                        <div key={building.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                                    {building.imageUrl ? (
                                                        <Image
                                                            src={building.imageUrl}
                                                            alt={building.name}
                                                            width={40}
                                                            height={40}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    ) : (
                                                        <Zap className="size-5 text-gray-500" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-gray-50">{building.name}</p>
                                                    <p className="text-sm text-gray-500">{building.address}</p>
                                                </div>
                                            </div>
                                            <span className={cn(
                                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                                building.status === "Active"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                                    : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                            )}>
                                                {building.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Contacts Tab */}
                <TabsContent value="contacts" className="mt-6">
                    <div className="space-y-4">
                        {/* Touchpoints Heatmap */}
                        <TouchpointsHeatmap
                            leaseStart={new Date(tenant.leaseStartDate)}
                            leaseEnd={new Date(tenant.leaseEndDate)}
                        />

                        {/* Search and Filters */}
                        <div className="flex items-center justify-between">
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                                <Input
                                    placeholder="Search by name"
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Users className="size-4" />
                                    Tags
                                </Button>
                                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
                                    <Button
                                        variant={contactViewMode === "list" ? "secondary" : "ghost"}
                                        size="sm"
                                        className="rounded-r-none"
                                        onClick={() => setContactViewMode("list")}
                                    >
                                        <List className="size-4" />
                                    </Button>
                                    <Button
                                        variant={contactViewMode === "grid" ? "secondary" : "ghost"}
                                        size="sm"
                                        className="rounded-l-none"
                                        onClick={() => setContactViewMode("grid")}
                                    >
                                        <Grid className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Contacts List */}
                        <div className="space-y-2">
                            {tenant.contacts
                                .filter(contact => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((contact) => (
                                    <Card key={contact.id} className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="size-10">
                                                    <AvatarFallback className="bg-gray-100 dark:bg-gray-800">
                                                        <User className="size-5 text-gray-500" />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-medium text-gray-900 dark:text-gray-50">{contact.name}</p>
                                                        {contact.badges?.map((badge) => (
                                                            <span key={badge} className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                                                {badge}
                                                            </span>
                                                        ))}
                                                        {contact.isPrimary && (
                                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                                                                Primary Contact
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500">{contact.email}</p>
                                                    <p className="text-xs text-gray-400 flex items-center gap-1">
                                                        <span className="size-3 rounded-full bg-gray-300 inline-block" />
                                                        {getBuildingName(contact.buildingId)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8">
                                                    <Mail className="size-4 text-gray-500" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8">
                                                    <Copy className="size-4 text-gray-500" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8">
                                                    <User className="size-4 text-gray-500" />
                                                </Button>
                                                {contact.notificationCount > 0 && (
                                                    <div className="size-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                                                        {contact.notificationCount}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                        </div>
                    </div>
                </TabsContent>

                {/* Activity Tab */}
                <TabsContent value="activity" className="mt-6">
                    <div className="space-y-6">
                        {/* Activity Heatmap with Range Brush */}
                        <ActivityHeatmap
                            leaseStart={new Date(tenant.leaseStartDate)}
                            leaseEnd={new Date(tenant.leaseEndDate)}
                            activeFilters={activityFilters}
                            onRangeChange={(range, metrics) => {
                                setActivityDateRange(range)
                                setActivityMetrics(metrics)
                            }}
                        />

                        {/* Metrics Cards - Clickable Filters */}
                        <div className="grid grid-cols-6 gap-4">
                            {[
                                { label: "Access", key: "access" as const, icon: DoorOpen, color: "text-blue-600", bgActive: "bg-blue-50 border-blue-200", category: "access" },
                                { label: "Bookings", key: "bookings" as const, icon: Calendar, color: "text-green-600", bgActive: "bg-green-50 border-green-200", category: "bookings" },
                                { label: "Visitors", key: "visitors" as const, icon: UserCheck, color: "text-yellow-600", bgActive: "bg-yellow-50 border-yellow-200", category: "visitors" },
                                { label: "Notes", key: "notes" as const, icon: NotepadText, color: "text-purple-600", bgActive: "bg-purple-50 border-purple-200", category: "notes" },
                                { label: "Responses", key: "responses" as const, icon: MessageSquare, color: "text-red-600", bgActive: "bg-red-50 border-red-200", category: "responses" },
                                { label: "Requests", key: "requests" as const, icon: MessageCircle, color: "text-orange-600", bgActive: "bg-orange-50 border-orange-200", category: "requests" }
                            ].map((metric) => {
                                const isActive = activityFilters.has(metric.category)
                                // Use metrics from brush selection, fall back to tenant data
                                const value = activityMetrics ? activityMetrics[metric.key] : tenant.activityMetrics[metric.key]
                                return (
                                    <Card
                                        key={metric.label}
                                        className={cn(
                                            "p-4 cursor-pointer transition-all border-2",
                                            isActive
                                                ? metric.bgActive
                                                : "border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                                        )}
                                        onClick={() => {
                                            const newFilters = new Set(activityFilters)
                                            if (isActive) {
                                                newFilters.delete(metric.category)
                                            } else {
                                                newFilters.add(metric.category)
                                            }
                                            setActivityFilters(newFilters)
                                        }}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <metric.icon className={cn("size-4", metric.color)} />
                                            <span className="text-sm text-gray-500">{metric.label}</span>
                                        </div>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50">{value}</p>
                                    </Card>
                                )
                            })}
                        </div>

                        {/* Activity Search and Filters */}
                        <div className="flex items-center gap-4">
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                                <Input placeholder="Search activity events" className="pl-9" />
                            </div>
                            {activityFilters.size > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Filtering by:</span>
                                    {Array.from(activityFilters).map(filter => (
                                        <span
                                            key={filter}
                                            className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300"
                                        >
                                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                            <button
                                                onClick={() => {
                                                    const newFilters = new Set(activityFilters)
                                                    newFilters.delete(filter)
                                                    setActivityFilters(newFilters)
                                                }}
                                                className="hover:text-gray-900 dark:hover:text-gray-100"
                                            >
                                                <X className="size-3" />
                                            </button>
                                        </span>
                                    ))}
                                    <button
                                        onClick={() => setActivityFilters(new Set())}
                                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                    >
                                        Clear all
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Activity List */}
                        <div className="space-y-3">
                            {tenant.activity
                                .filter(activity => {
                                    // Filter by category
                                    if (activityFilters.size > 0) {
                                        if (!('category' in activity) || !activityFilters.has(activity.category as string)) {
                                            return false
                                        }
                                    }
                                    // Filter by date range if set
                                    if (activityDateRange) {
                                        const activityDate = new Date(activity.date)
                                        if (activityDate < activityDateRange[0] || activityDate > activityDateRange[1]) {
                                            return false
                                        }
                                    }
                                    return true
                                })
                                .map((activity) => (
                                <Card key={activity.id} className="p-4">
                                    <div className="flex items-start gap-3">
                                        <ActivityIcon type={activity.icon} />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className="font-medium text-sm text-gray-900 dark:text-gray-50">{activity.type}</span>
                                                <span className="text-xs text-gray-500">{activity.date}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{activity.title}</p>
                                            {'subtitle' in activity && activity.subtitle && (
                                                <p className="text-sm text-gray-400">{activity.subtitle}</p>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                {/* App Configurations Tab */}
                <TabsContent value="app-configurations" className="mt-6">
                    <div className="space-y-6">
                        {tenant.appConfigurations.map((config) => {
                            const building = demoConfig.buildings.find(b => b.id === config.buildingId)
                            if (!building) return null
                            return (
                            <Card key={config.buildingId} className="p-6">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                            {building.imageUrl ? (
                                                <Image
                                                    src={building.imageUrl}
                                                    alt={building.name}
                                                    width={40}
                                                    height={40}
                                                    className="object-cover w-full h-full"
                                                />
                                            ) : (
                                                <Zap className="size-5 text-gray-500" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-50">{building.name}</p>
                                            <p className="text-sm text-gray-500">{building.address}</p>
                                        </div>
                                    </div>
                                    <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        View configuration history
                                    </Link>
                                </div>

                                {config.apps ? (
                                    <>
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-500">
                                                <span className="font-medium">Current configuration</span>
                                                <br />
                                                Last edited by {config.lastEdited}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-4 gap-4 mb-6">
                                            {[
                                                { key: "submitRequest", label: "Submit Request" },
                                                { key: "registerVisitor", label: "Register a Visitor" },
                                                { key: "digitalKey", label: "Digital Key" },
                                                { key: "foodhub", label: "Foodhub" },
                                                { key: "wellnessSpaces", label: "Wellness Spaces" },
                                                { key: "bookAClass", label: "Book a Class" },
                                                { key: "meetingSpaces", label: "Meeting Spaces" }
                                            ].map((app) => (
                                                <div key={app.key} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">{app.label}</span>
                                                    <Switch
                                                        checked={config.apps![app.key as keyof NonNullable<typeof config.apps>]}
                                                        className="data-[state=checked]:bg-primary"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-end gap-3">
                                            <Button variant="outline">Reset</Button>
                                            <Button>Update</Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="size-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                                            <Settings className="size-6 text-gray-400" />
                                        </div>
                                        <p className="text-gray-900 dark:text-gray-50 font-medium">No app configurations yet</p>
                                        <p className="text-sm text-gray-500">App configurations will appear here when available</p>
                                    </div>
                                )}
                            </Card>
                        )})}
                    </div>
                </TabsContent>

                {/* Buildings Tab */}
                <TabsContent value="buildings" className="mt-6">
                    <div className="space-y-6">
                        <div className="flex justify-end">
                            <Button>
                                <Plus className="size-4 mr-2" />
                                Add building
                            </Button>
                        </div>

                        {tenantBuildings.map((building) => {
                            const details = tenant.buildingDetails[building.id as keyof typeof tenant.buildingDetails]
                            return (
                            <Card key={building.id} className="p-6">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="size-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                            {building.imageUrl ? (
                                                <Image
                                                    src={building.imageUrl}
                                                    alt={building.name}
                                                    width={48}
                                                    height={48}
                                                    className="object-cover w-full h-full"
                                                />
                                            ) : (
                                                <Zap className="size-6 text-gray-500" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-gray-50">{building.name}</p>
                                            <p className="text-sm text-gray-500">{building.address}</p>
                                        </div>
                                    </div>

                                    {/* Building Stats */}
                                    <div className="flex items-center gap-8">
                                        <div className="text-center">
                                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">{details?.rentedArea || "-"}</p>
                                            <p className="text-sm text-gray-500">Rented area (ft2)</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">{details?.employees || "-"}</p>
                                            <p className="text-sm text-gray-500">Number of employees</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">{details?.leaseExpiration || "-"}</p>
                                            <p className="text-sm text-gray-500">Lease expiration</p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="p-1.5">
                                            <MoreVertical className="size-5 text-gray-500" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Floors and Suites */}
                                {details?.floors && (
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                        <span className="w-24">Floors</span>
                                        <span className="flex-1">Suites</span>
                                        <span className="w-20">Actions</span>
                                    </div>

                                    {details.floors.map((floor, index) => (
                                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                                            <div className="w-24">
                                                <Input
                                                    type="number"
                                                    value={floor.number}
                                                    className="w-16 h-8"
                                                    readOnly
                                                />
                                            </div>
                                            <div className="flex-1 flex items-center gap-2">
                                                {floor.suites.map((suite, suiteIndex) => (
                                                    <div key={suiteIndex} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
                                                        <span className="text-sm">{suite}</span>
                                                        <button className="hover:text-red-500">
                                                            <X className="size-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                                <Button variant="ghost" size="sm" className="text-gray-500 h-7">
                                                    <Plus className="size-3 mr-1" />
                                                    Add suite
                                                </Button>
                                            </div>
                                            <div className="w-20 text-right">
                                                <Button variant="ghost" size="sm" className="p-1 h-7 w-7 text-gray-400 hover:text-red-500">
                                                    <X className="size-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                    <Button variant="ghost" size="sm" className="mt-3 text-gray-500">
                                        <Plus className="size-4 mr-1" />
                                        Add floor
                                    </Button>
                                </div>
                                )}

                                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <Button variant="outline">Reset</Button>
                                    <Button>Save</Button>
                                </div>
                            </Card>
                        )})}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
