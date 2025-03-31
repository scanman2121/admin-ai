import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripHorizontal } from 'lucide-react';
import type { Tenant } from './KanbanBoard';

interface KanbanCardProps {
    tenant: Tenant;
    className?: string;
}

export function KanbanCard({ tenant, className }: KanbanCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: tenant.id,
        data: tenant
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : undefined
    };

    const logoUrl = tenant.logo.startsWith('http')
        ? tenant.logo
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(tenant.name)}&background=random`;

    const showMoveInDate = ['Fit out', 'Onboard', 'Active tenant'].includes(tenant.stage);

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={cn(
                "bg-white rounded-lg p-4 shadow-sm border border-gray-100",
                "hover:shadow-md transition-shadow duration-200",
                isDragging && "shadow-lg opacity-90",
                className
            )}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <img
                        src={logoUrl}
                        alt={`${tenant.name} logo`}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="font-medium text-gray-900">{tenant.name}</h3>
                        <p className="text-sm text-gray-500">{tenant.industry}</p>
                    </div>
                </div>
                <button
                    {...listeners}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <GripHorizontal className="h-5 w-5" />
                </button>
            </div>

            <div className="space-y-3">
                {tenant.contact && (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="text-sm text-gray-600 hover:text-gray-900">
                            Contact: {tenant.contact.name}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <div>
                                    <div className="font-medium">{tenant.contact.role}</div>
                                    <div className="text-sm text-gray-500">{tenant.contact.email}</div>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

                {tenant.broker && (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="text-sm text-gray-600 hover:text-gray-900">
                            Broker: {tenant.broker.name}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <div>
                                    <div className="font-medium">{tenant.broker.role}</div>
                                    <div className="text-sm text-gray-500">{tenant.broker.email}</div>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>

            {showMoveInDate && tenant.moveInDate && (
                <div className="mt-3 text-sm text-gray-500">
                    Move in: {tenant.moveInDate}
                </div>
            )}

            {tenant.spaces.length > 0 && (
                <>
                    <div className="mt-4 pt-3 border-t">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Spaces of Interest</h4>
                        <div className="space-y-2">
                            {tenant.spaces.map(space => (
                                <div key={space.id} className="text-sm">
                                    <div className="font-medium text-gray-700">{space.name}</div>
                                    <div className="text-gray-500">
                                        {space.floor} • {space.sqft}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
} 