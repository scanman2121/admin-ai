"use client"

import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useState } from 'react'
import { KanbanCard } from './KanbanCard'
import { KanbanColumn } from './KanbanColumn'
import { KanbanToolbar } from './KanbanToolbar'

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
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedBrokers, setSelectedBrokers] = useState<string[]>([])
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
    const [selectedSpaces, setSelectedSpaces] = useState<string[]>([])

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
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

    const handleUpdateContact = (tenantId: string, contact: Contact | undefined) => {
        setTenants(current =>
            current.map(t =>
                t.id === tenantId
                    ? { ...t, contact }
                    : t
            )
        )
    }

    const handleUpdateBroker = (tenantId: string, broker: Contact | undefined) => {
        setTenants(current =>
            current.map(t =>
                t.id === tenantId
                    ? { ...t, broker }
                    : t
            )
        )
    }

    const handleUpdateSpaces = (tenantId: string, spaces: Space[]) => {
        setTenants(current =>
            current.map(t =>
                t.id === tenantId
                    ? { ...t, spaces }
                    : t
            )
        )
    }

    const filteredTenants = tenants.filter(tenant => {
        const matchesSearch = searchQuery === "" ||
            tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tenant.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tenant.contact?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tenant.broker?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tenant.spaces.some(space =>
                space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                space.floor.toLowerCase().includes(searchQuery.toLowerCase())
            )

        const matchesBroker = selectedBrokers.length === 0 ||
            (tenant.broker && selectedBrokers.includes(tenant.broker.id))

        const matchesCompany = selectedCompanies.length === 0 ||
            selectedCompanies.includes(tenant.id)

        const matchesSpace = selectedSpaces.length === 0 ||
            tenant.spaces.some(space => selectedSpaces.includes(space.id))

        return matchesSearch && matchesBroker && matchesCompany && matchesSpace
    })

    const activeTenant = activeId ? tenants.find(t => t.id === activeId) : null

    return (
        <div className="space-y-4">
            <KanbanToolbar
                tenants={tenants}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedBrokers={selectedBrokers}
                onBrokersChange={setSelectedBrokers}
                selectedCompanies={selectedCompanies}
                onCompaniesChange={setSelectedCompanies}
                selectedSpaces={selectedSpaces}
                onSpacesChange={setSelectedSpaces}
            />
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
                                    tenants={filteredTenants.filter(t => t.stage === stage)}
                                    className={getStageColor(stage)}
                                >
                                    {filteredTenants
                                        .filter(t => t.stage === stage)
                                        .map(tenant => (
                                            <KanbanCard
                                                key={tenant.id}
                                                tenant={tenant}
                                                onUpdateContact={handleUpdateContact}
                                                onUpdateBroker={handleUpdateBroker}
                                                onUpdateSpaces={handleUpdateSpaces}
                                            />
                                        ))}
                                </KanbanColumn>
                            ))}
                            <DragOverlay>
                                {activeTenant ? (
                                    <KanbanCard
                                        tenant={activeTenant}
                                        className="rotate-3 cursor-grabbing"
                                        onUpdateContact={handleUpdateContact}
                                        onUpdateBroker={handleUpdateBroker}
                                        onUpdateSpaces={handleUpdateSpaces}
                                    />
                                ) : null}
                            </DragOverlay>
                        </DndContext>
                    </div>
                </div>
            </div>
        </div>
    )
} 