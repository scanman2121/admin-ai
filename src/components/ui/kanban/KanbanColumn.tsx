import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ReactNode } from 'react';
import type { Tenant } from './KanbanBoard';

interface KanbanColumnProps {
    stage: string;
    tenants: Tenant[];
    className?: string;
    children?: ReactNode;
}

export function KanbanColumn({ stage, tenants, className, children }: KanbanColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: stage,
    });

    return (
        <div className="flex flex-col w-[350px] shrink-0 h-full">
            <div className="mb-3 flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-gray-50">{stage}</h3>
                <Badge variant="outline" className="font-normal">
                    {tenants.length}
                </Badge>
            </div>
            <div
                ref={setNodeRef}
                className={cn(
                    "rounded-lg p-4 flex-1 overflow-y-auto transition-colors duration-200",
                    className,
                    isOver && "ring-2 ring-primary/20 shadow-lg"
                )}
            >
                <SortableContext
                    items={tenants.map(t => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className={cn(
                        "space-y-3 min-h-[100px]",
                        isOver && "scale-[0.98] transition-transform duration-200"
                    )}>
                        {children}
                        {tenants.length === 0 && (
                            <div className="h-24 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-800 flex items-center justify-center">
                                <p className="text-sm text-gray-500">Drop here</p>
                            </div>
                        )}
                    </div>
                </SortableContext>
            </div>
        </div>
    );
} 