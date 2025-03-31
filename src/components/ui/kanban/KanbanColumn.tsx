import { Badge } from '@/components/ui/badge';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Tenant } from './KanbanBoard';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
    stage: string;
    tenants: Tenant[];
    className?: string;
}

export function KanbanColumn({ stage, tenants, className }: KanbanColumnProps) {
    const { setNodeRef } = useDroppable({
        id: stage,
    });

    return (
        <div className="w-[350px] shrink-0">
            <div className="mb-3 flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-gray-50">{stage}</h3>
                <Badge variant="outline" className="font-normal">
                    {tenants.length}
                </Badge>
            </div>
            <div
                ref={setNodeRef}
                className={`rounded-lg p-4 ${className} min-h-[200px] transition-colors`}
            >
                <SortableContext
                    items={tenants.map(t => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-3">
                        {tenants.map(tenant => (
                            <KanbanCard key={tenant.id} tenant={tenant} />
                        ))}
                    </div>
                </SortableContext>
            </div>
        </div>
    );
} 