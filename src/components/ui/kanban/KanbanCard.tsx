"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';
import { CalendarIcon, GripVertical, PlusIcon, TrashIcon } from 'lucide-react';
import { Contact, Space, Tenant } from './KanbanBoard';

interface KanbanCardProps {
    tenant: Tenant
    className?: string
    onUpdateContact?: (tenantId: string, contact: Contact | undefined) => void
    onUpdateBroker?: (tenantId: string, broker: Contact | undefined) => void
    onUpdateSpaces?: (tenantId: string, spaces: Space[]) => void
}

const contacts: Contact[] = [
    {
        id: 'c1',
        name: 'John Smith',
        role: 'CTO',
        email: 'john@acme.com'
    },
    {
        id: 'c2',
        name: 'Emily Chen',
        role: 'Facilities Manager',
        email: 'emily@globex.com'
    },
    {
        id: 'c3',
        name: 'Peter Gibbons',
        role: 'Office Manager',
        email: 'peter@initech.com'
    }
]

const brokers: Contact[] = [
    {
        id: 'b1',
        name: 'Sarah Johnson',
        role: 'Senior Broker',
        email: 'sarah@brokerage.com'
    },
    {
        id: 'b2',
        name: 'Michael Brown',
        role: 'Principal Broker',
        email: 'michael@brokerage.com'
    },
    {
        id: 'b3',
        name: 'Lisa Wilson',
        role: 'Associate Broker',
        email: 'lisa@brokerage.com'
    }
]

const availableSpaces: Space[] = [
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
    },
    {
        id: 's3',
        name: 'Executive Suite',
        floor: '5th Floor',
        sqft: '8,000 sqft'
    },
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
    },
    {
        id: 's6',
        name: 'Creative Studio',
        floor: '4th Floor',
        sqft: '4,000 sqft'
    }
]

export function KanbanCard({ tenant, className, onUpdateContact, onUpdateBroker, onUpdateSpaces }: KanbanCardProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: tenant.id,
    })

    const style = transform ? {
        transform: CSS.Transform.toString(transform),
    } : undefined

    const handleContactChange = (contactId: string) => {
        if (!onUpdateContact) return
        const contact = contacts.find(c => c.id === contactId)
        onUpdateContact(tenant.id, contact)
    }

    const handleBrokerChange = (brokerId: string) => {
        if (!onUpdateBroker) return
        const broker = brokers.find(b => b.id === brokerId)
        onUpdateBroker(tenant.id, broker)
    }

    const handleAddSpace = (spaceId: string) => {
        if (!onUpdateSpaces) return
        const space = availableSpaces.find(s => s.id === spaceId)
        if (!space || tenant.spaces.some(s => s.id === spaceId)) return
        onUpdateSpaces(tenant.id, [...tenant.spaces, space])
    }

    const handleRemoveSpace = (spaceId: string) => {
        if (!onUpdateSpaces) return
        onUpdateSpaces(tenant.id, tenant.spaces.filter(s => s.id !== spaceId))
    }

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className={cn(
                'relative w-[300px] p-4 cursor-grab active:cursor-grabbing',
                isDragging && 'opacity-50',
                className
            )}
        >
            <div {...attributes} {...listeners} className="absolute top-4 right-4 text-muted-foreground">
                <GripVertical className="h-4 w-4" />
            </div>

            <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={tenant.logo} alt={tenant.name} />
                    <AvatarFallback>{tenant.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-medium">{tenant.name}</h3>
                    <p className="text-sm text-muted-foreground">{tenant.industry}</p>
                </div>
            </div>

            {tenant.moveInDate && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Move in {format(new Date(tenant.moveInDate), 'MMM d, yyyy')}</span>
                </div>
            )}

            <div className="space-y-4 py-2">
                <div>
                    <label className="text-sm font-medium mb-1.5 block">Contact</label>
                    <Select value={tenant.contact?.id} onValueChange={handleContactChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select contact" />
                        </SelectTrigger>
                        <SelectContent>
                            {contacts.map(contact => (
                                <SelectItem key={contact.id} value={contact.id}>
                                    {contact.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="text-sm font-medium mb-1.5 block">Broker</label>
                    <Select value={tenant.broker?.id} onValueChange={handleBrokerChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select broker" />
                        </SelectTrigger>
                        <SelectContent>
                            {brokers.map(broker => (
                                <SelectItem key={broker.id} value={broker.id}>
                                    {broker.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sm font-medium">Spaces of interest</label>
                        <Select onValueChange={handleAddSpace}>
                            <SelectTrigger className="w-8 h-8 p-0">
                                <PlusIcon className="h-4 w-4" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableSpaces
                                    .filter(space => !tenant.spaces.some(s => s.id === space.id))
                                    .map(space => (
                                        <SelectItem key={space.id} value={space.id}>
                                            {space.name} • {space.floor}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        {tenant.spaces.map(space => (
                            <div key={space.id} className="flex items-center justify-between bg-muted/50 rounded-md p-2">
                                <div>
                                    <p className="text-sm font-medium">{space.name}</p>
                                    <p className="text-xs text-muted-foreground">{space.floor} • {space.sqft}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleRemoveSpace(space.id)}
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    )
} 