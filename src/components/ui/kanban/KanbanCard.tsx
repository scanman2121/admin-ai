import { Card } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Building2, ChevronDown, GripHorizontal } from 'lucide-react';
import Image from 'next/image';
import type { Tenant } from './KanbanBoard';

interface KanbanCardProps {
    tenant: Tenant;
}

export function KanbanCard({ tenant }: KanbanCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: tenant.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'transform 200ms cubic-bezier(0.2, 0, 0, 1)',
        zIndex: isDragging ? 50 : undefined,
    };

    const logoUrl = tenant.logo.startsWith('http')
        ? tenant.logo
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(tenant.name)}&background=0D9488&color=fff`;

    const showMoveInDate = ['Fit out', 'Onboard', 'Active tenant'].includes(tenant.stage);

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={cn(
                "touch-none relative transition-colors",
                isDragging ? "z-50" : "hover:z-30"
            )}
        >
            <Card className={cn(
                "p-4 bg-white dark:bg-gray-900 transition-all duration-200",
                "hover:shadow-md hover:scale-[1.02]",
                isDragging && "shadow-xl scale-[1.02] cursor-grabbing ring-2 ring-primary/20"
            )}>
                <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity" {...listeners}>
                    <GripHorizontal className="h-4 w-4 text-gray-400 cursor-grab active:cursor-grabbing" />
                </div>
                <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                        <div className="size-10 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-gray-800">
                            <Image
                                src={logoUrl}
                                alt={tenant.name}
                                width={24}
                                height={24}
                                className="rounded object-contain"
                                unoptimized
                            />
                        </div>
                        <div className="absolute -bottom-1 -right-1 size-4 bg-green-500 rounded-full flex items-center justify-center">
                            <Building2 className="size-2.5 text-white" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-gray-50 truncate pr-6">
                            {tenant.name}
                        </p>
                        <div className="mt-3 space-y-2">
                            {tenant.contact && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors">
                                        <span>Contact: {tenant.contact.name}</span>
                                        <ChevronDown className="size-4 opacity-50" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem className="flex flex-col items-start gap-0.5">
                                            <span className="font-medium">{tenant.contact.role}</span>
                                            <span className="text-sm text-gray-500">{tenant.contact.email}</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                            {tenant.broker && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors">
                                        <span>Broker: {tenant.broker.name}</span>
                                        <ChevronDown className="size-4 opacity-50" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem className="flex flex-col items-start gap-0.5">
                                            <span className="font-medium">{tenant.broker.role}</span>
                                            <span className="text-sm text-gray-500">{tenant.broker.email}</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                        {showMoveInDate && tenant.moveInDate && (
                            <div className="mt-3">
                                <span className="text-xs text-gray-500">
                                    Move in: {tenant.moveInDate}
                                </span>
                            </div>
                        )}
                        {tenant.spaces.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                                <p className="text-xs font-medium text-gray-500 mb-2">Spaces of Interest</p>
                                <div className="space-y-2">
                                    {tenant.spaces.map(space => (
                                        <div key={space.id} className="text-sm group">
                                            <p className="font-medium text-gray-900 dark:text-gray-50">{space.name}</p>
                                            <p className="text-gray-500">{space.floor} • {space.sqft}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
} 