"use client"

import { Calendar, momentLocalizer, View, type SlotInfo } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { cn } from "@/lib/utils"

const localizer = momentLocalizer(moment)

interface BigCalendarProps {
    events: Array<{
        id: string
        title: string
        start: Date
        end: Date
        resource?: any
    }>
    onSelectEvent?: (event: any) => void
    onSelectSlot?: (slotInfo: SlotInfo) => void
    defaultView?: View
    className?: string
}

export function BigCalendar({
    events,
    onSelectEvent,
    onSelectSlot,
    defaultView = "month",
    className
}: BigCalendarProps) {
    return (
        <div className={cn("h-[600px] w-full", className)}>
            <style jsx global>{`
                .rbc-calendar {
                    background: hsl(var(--background));
                    color: hsl(var(--foreground));
                    border-radius: 0.5rem;
                }
                
                .rbc-header {
                    padding: 0.75rem 0.5rem;
                    border-bottom: 1px solid hsl(var(--border));
                    color: hsl(var(--muted-foreground));
                    font-weight: 500;
                    font-size: 0.875rem;
                }
                
                .rbc-today {
                    background-color: hsl(var(--accent) / 0.3);
                }
                
                .rbc-off-range-bg {
                    background: hsl(var(--muted) / 0.3);
                }
                
                .rbc-date-cell {
                    text-align: right;
                    padding: 0.5rem;
                }
                
                .rbc-date-cell > a {
                    color: hsl(var(--foreground));
                }
                
                .rbc-date-cell.rbc-now > a {
                    color: hsl(var(--primary));
                    font-weight: 600;
                }
                
                .rbc-event {
                    background-color: hsl(var(--primary));
                    border-color: hsl(var(--primary));
                    color: hsl(var(--primary-foreground));
                    border-radius: 0.375rem;
                    padding: 0.125rem 0.25rem;
                    font-size: 0.75rem;
                    cursor: pointer;
                }
                
                .rbc-event:hover {
                    background-color: hsl(var(--primary) / 0.9);
                }
                
                .rbc-event.rbc-selected {
                    background-color: hsl(var(--primary) / 0.8);
                }
                
                .rbc-day-slot .rbc-time-slot {
                    border-top: 1px solid hsl(var(--border));
                }
                
                .rbc-time-header-content {
                    border-left: 1px solid hsl(var(--border));
                }
                
                .rbc-time-content {
                    border-top: 2px solid hsl(var(--border));
                }
                
                .rbc-time-header-gutter,
                .rbc-time-gutter {
                    background: hsl(var(--muted));
                }
                
                .rbc-day-bg {
                    border: 1px solid hsl(var(--border));
                }
                
                .rbc-toolbar {
                    padding: 1rem;
                    border-bottom: 1px solid hsl(var(--border));
                    margin-bottom: 0;
                }
                
                .rbc-toolbar button {
                    background: hsl(var(--background));
                    border: 1px solid hsl(var(--border));
                    color: hsl(var(--foreground));
                    padding: 0.5rem 1rem;
                    border-radius: 0.375rem;
                    font-size: 0.875rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .rbc-toolbar button:hover {
                    background: hsl(var(--accent));
                    color: hsl(var(--accent-foreground));
                }
                
                .rbc-toolbar button:active,
                .rbc-toolbar button.rbc-active {
                    background: hsl(var(--primary));
                    color: hsl(var(--primary-foreground));
                    border-color: hsl(var(--primary));
                }
                
                .rbc-toolbar button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .rbc-toolbar-label {
                    font-weight: 600;
                    color: hsl(var(--foreground));
                    font-size: 1rem;
                }
                
                .rbc-agenda-view table {
                    border: 1px solid hsl(var(--border));
                    border-radius: 0.5rem;
                    overflow: hidden;
                }
                
                .rbc-agenda-date-cell,
                .rbc-agenda-time-cell {
                    padding: 0.75rem;
                    border-right: 1px solid hsl(var(--border));
                    background: hsl(var(--muted) / 0.3);
                }
                
                .rbc-agenda-event-cell {
                    padding: 0.75rem;
                }
                
                .rbc-month-view {
                    border: 1px solid hsl(var(--border));
                    border-radius: 0.5rem;
                }
                
                .rbc-month-row {
                    border-bottom: 1px solid hsl(var(--border));
                }
                
                .rbc-month-row:last-child {
                    border-bottom: none;
                }
            `}</style>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%" }}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                selectable
                defaultView={defaultView}
                views={["month", "week", "day", "agenda"]}
                popup
            />
        </div>
    )
}

