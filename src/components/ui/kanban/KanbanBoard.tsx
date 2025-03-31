"use client"

import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useState } from 'react'
import { KanbanCard } from './KanbanCard'
import { KanbanColumn } from './KanbanColumn'

export interface Tenant {
    id: string
    name: string
    industry: string
    space: string
    floor: string
    moveInDate: string
    stage: Stage
    assignedTo: string
    logo: string
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
        space: '5,000 sqft',
        floor: '3rd Floor',
        moveInDate: '2024/06/01',
        stage: 'New prospect',
        assignedTo: 'John Smith',
        logo: '/tenant-logos/acme.png'
    },
    {
        id: '2',
        name: 'Globex Corp',
        industry: 'Finance',
        space: '8,000 sqft',
        floor: '5th Floor',
        moveInDate: '2024/07/15',
        stage: 'Tour',
        assignedTo: 'Sarah Johnson',
        logo: '/tenant-logos/globex.png'
    },
    {
        id: '3',
        name: 'Initech',
        industry: 'Software',
        space: '3,500 sqft',
        floor: '2nd Floor',
        moveInDate: '2024/08/01',
        stage: 'Negotiation',
        assignedTo: 'Mike Wilson',
        logo: '/tenant-logos/initech.png'
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
        useSensor(MouseSensor),
        useSensor(TouchSensor)
    )

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!over) return

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

    const activeTenant = activeId ? tenants.find(t => t.id === activeId) : null

    return (
        <div className="relative w-full h-[calc(100vh-13rem)]">
            <div className="absolute inset-0 overflow-x-auto">
                <div className="inline-flex gap-4 p-4 h-full">
                    <DndContext
                        sensors={sensors}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
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
                            {activeId && activeTenant ? (
                                <KanbanCard tenant={activeTenant} />
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                </div>
            </div>
        </div>
    )
} 