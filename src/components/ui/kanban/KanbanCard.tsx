import { Card } from '@/components/ui/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Building2 } from 'lucide-react';
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
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const logoUrl = tenant.logo.startsWith('http')
        ? tenant.logo
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(tenant.name)}&background=0D9488&color=fff`;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="touch-none cursor-grab active:cursor-grabbing"
        >
            <Card className="p-4 hover:bg-accent/5 transition-colors">
                <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                        <div className="size-10 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
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
                        <p className="font-medium text-gray-900 dark:text-gray-50 truncate">
                            {tenant.name}
                        </p>
                        <div className="mt-1 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                            <span>{tenant.space}</span>
                            <span>{tenant.floor}</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                                Move in: {tenant.moveInDate}
                            </span>
                            {tenant.assignedTo && (
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xs text-gray-500">{tenant.assignedTo}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
} 