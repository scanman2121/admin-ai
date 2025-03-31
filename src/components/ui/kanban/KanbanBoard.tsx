"use client"

import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useState } from 'react'
import { KanbanCard } from './KanbanCard'
import { KanbanColumn } from './KanbanColumn'

export interface Space {
    id: string
    name: string
    floor: string
    sqft: string
}

export interface Contact {
    id: string
    name: string
    role: string
    email: string
}

export interface Tenant {
    id: string
    name: string
    industry: string
    stage: Stage
    logo: string
    moveInDate?: string
    contact?: Contact
    broker?: Contact
    spaces: Space[]
}

const stages = [
    'New prospect',
    'Tour',
    'Negotiation',
    'Sign off',
    'Fit out',
    'Onboard',
    'Active tenant'
] as const

export type Stage = typeof stages[number]

// Mock data for the Kanban board
const mockTenants: Tenant[] = [
    {
        id: '1',
        name: 'Acme Corp',
        industry: 'Technology',
        stage: 'New prospect',
        logo: '/tenant-logos/acme.png',
        contact: {
            id: 'c1',
            name: 'John Smith',
            role: 'CTO',
            email: 'john@acme.com'
        },
        broker: {
            id: 'b1',
            name: 'Sarah Johnson',
            role: 'Senior Broker',
            email: 'sarah@brokerage.com'
        },
        spaces: [
            {
                id: 's1',
                name: 'North Wing',
                floor: '3rd Floor',
                sqft: '5,000 sqft'
            },
            {
                id: 's2',
                name: 'South Wing',
                floor: '3rd Floor',
                sqft: '3,500 sqft'
            }
        ]
    },
    {
        id: '2',
        name: 'Globex Corp',
        industry: 'Finance',
        stage: 'Fit out',
        moveInDate: '2024/07/15',
        logo: '/tenant-logos/globex.png',
        contact: {
            id: 'c2',
            name: 'Emily Chen',
            role: 'Facilities Manager',
            email: 'emily@globex.com'
        },
        broker: {
            id: 'b2',
            name: 'Michael Brown',
            role: 'Principal Broker',
            email: 'michael@brokerage.com'
        },
        spaces: [
            {
                id: 's3',
                name: 'Executive Suite',
                floor: '5th Floor',
                sqft: '8,000 sqft'
            }
        ]
    },
    {
        id: '3',
        name: 'Initech',
        industry: 'Software',
        stage: 'Tour',
        logo: '/tenant-logos/initech.png',
        contact: {
            id: 'c3',
            name: 'Peter Gibbons',
            role: 'Office Manager',
            email: 'peter@initech.com'
        },
        broker: {
            id: 'b3',
            name: 'Lisa Wilson',
            role: 'Associate Broker',
            email: 'lisa@brokerage.com'
        },
        spaces: [
            {
                id: 's4',
                name: 'Tech Hub',
                floor: '2nd Floor',
                sqft: '3,500 sqft'
            },
            {
                id: 's5',
                name: 'Innovation Center',
                floor: '2nd Floor',
                sqft: '2,500 sqft'
            }
        ]
    }
]

// Get background color for stage
const getStageColor = (stage: Stage): string => {
    const colors: Record<Stage, string> = {
        'New prospect': 'bg-blue-100 dark:bg-blue-950',
        'Tour': 'bg-purple-100 dark:bg-purple-950',
        'Negotiation': 'bg-amber-100 dark:bg-amber-950',
        'Sign off': 'bg-green-100 dark:bg-green-950',
        'Fit out': 'bg-pink-100 dark:bg-pink-950',
        'Onboard': 'bg-indigo-100 dark:bg-indigo-950',
        'Active tenant': 'bg-teal-100 dark:bg-teal-950'
    }
    return colors[stage]
}

export function KanbanBoard() {
    const [tenants, setTenants] = useState<Tenant[]>(mockTenants)
    const [activeId, setActiveId] = useState<string | null>(null)

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 5, // Minimum drag distance in pixels
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250, // Delay before touch activation
                tolerance: 5, // Touch movement tolerance
            },
        })
    )

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!over) {
            setActiveId(null)
            return
        }

        const activeTenant = tenants.find(t => t.id === active.id)
        const overStage = over.id as Stage

        if (activeTenant && activeTenant.stage !== overStage) {
            setTenants(current =>
                current.map(t =>
                    t.id === activeTenant.id
                        ? { ...t, stage: overStage }
                        : t
                )
            )
        }

        setActiveId(null)
    }

    const handleDragCancel = () => {
        setActiveId(null)
    }

    const activeTenant = activeId ? tenants.find(t => t.id === activeId) : null

    return (
        <div className="relative w-full h-[calc(100vh-13rem)]">
            <div className="absolute inset-0 overflow-x-auto">
                <div className="inline-flex gap-4 p-4 h-full">
                    <DndContext
                        sensors={sensors}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDragCancel={handleDragCancel}
                    >
                        {stages.map(stage => (
                            <KanbanColumn
                                key={stage}
                                stage={stage}
                                tenants={tenants.filter(t => t.stage === stage)}
                                className={getStageColor(stage)}
                            />
                        ))}
                        <DragOverlay>
                            {activeTenant ? (
                                <KanbanCard
                                    tenant={activeTenant}
                                    className="rotate-3 cursor-grabbing"
                                />
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                </div>
            </div>
        </div>
    )
} 