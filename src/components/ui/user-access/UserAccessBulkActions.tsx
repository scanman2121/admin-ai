"use client"

import { RowSelectionState, Table } from "@tanstack/react-table"

type UserAccessBulkActionsProps<TData> = {
    table: Table<TData>
    rowSelection: RowSelectionState
    totalCount: number
    onCreateAccess: (selectedUsers: TData[]) => void
    onRemoveAccess: (selectedUsers: TData[]) => void
}

export function UserAccessBulkActions<TData>({
    table,
    rowSelection,
    totalCount,
    onCreateAccess,
    onRemoveAccess,
}: UserAccessBulkActionsProps<TData>) {
    const selectedRowsCount = Object.keys(rowSelection).length
    const hasSelectedRows = selectedRowsCount > 0

    const getSelectedUsers = (): TData[] => {
        return table.getSelectedRowModel().rows.map(row => row.original)
    }

    const handleSelectAll = () => {
        if (table.getIsAllRowsSelected()) {
            table.toggleAllRowsSelected(false)
        } else {
            table.toggleAllRowsSelected(true)
        }
    }

    if (!hasSelectedRows) return null

    return (
        <div className="fixed inset-x-0 bottom-8 mx-auto flex w-fit items-center z-50">
            <div className="relative flex items-center rounded-lg bg-gray-900 px-1 shadow-lg shadow-black/30 dark:ring-1 dark:ring-white/10">
                {/* Selection count */}
                <div className="px-3 py-2.5 text-sm tabular-nums text-gray-300">
                    {selectedRowsCount} users selected
                </div>
                
                <div className="h-4 w-px bg-gray-700" />
                
                {/* Select All button */}
                <span className="flex items-center gap-x-2 rounded-lg bg-gray-900 p-1 text-sm font-medium text-gray-50">
                    <button
                        onClick={handleSelectAll}
                        className="flex items-center gap-x-2 rounded-md px-3 py-1 hover:bg-gray-800 focus-visible:bg-gray-800"
                    >
                        Select All ({totalCount})
                    </button>
                </span>

                <div className="h-4 w-px bg-gray-700" />

                {/* Create access action */}
                <span className="flex items-center gap-x-2 rounded-lg bg-gray-900 p-1 text-sm font-medium text-gray-50">
                    <button
                        onClick={() => onCreateAccess(getSelectedUsers())}
                        className="flex items-center gap-x-2 rounded-md px-3 py-1 hover:bg-gray-800 focus-visible:bg-gray-800"
                    >
                        Create access
                    </button>
                </span>

                {/* Remove access action */}
                <span className="flex items-center gap-x-2 rounded-lg bg-gray-900 p-1 text-sm font-medium text-gray-50 sm:last-of-type:-mr-1">
                    <button
                        onClick={() => onRemoveAccess(getSelectedUsers())}
                        className="flex items-center gap-x-2 rounded-md px-3 py-1 hover:bg-gray-800 focus-visible:bg-gray-800 text-red-400 hover:text-red-300"
                    >
                        Remove access
                    </button>
                </span>
            </div>
        </div>
    )
}
