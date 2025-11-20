"use client"

import { RowSelectionState, Table } from "@tanstack/react-table"
import { useState } from "react"

type ServiceRequestsBulkActionsProps<TData> = {
    table: Table<TData>
    rowSelection: RowSelectionState
    totalCount: number
    onChangeStatus: (selectedRequests: TData[], status: string) => void
    onAssignTo: (selectedRequests: TData[], assignee: string) => void
    onApprove?: (selectedRequests: TData[]) => void
    showApprove?: boolean
}

export function ServiceRequestsBulkActions<TData>({
    table,
    rowSelection,
    totalCount,
    onChangeStatus,
    onAssignTo,
    onApprove,
    showApprove = false,
}: ServiceRequestsBulkActionsProps<TData>) {
    const selectedRowsCount = Object.keys(rowSelection).length
    const hasSelectedRows = selectedRowsCount > 0
    const [showStatusDropdown, setShowStatusDropdown] = useState(false)
    const [showAssignDropdown, setShowAssignDropdown] = useState(false)

    const getSelectedRequests = (): TData[] => {
        return table.getSelectedRowModel().rows.map(row => row.original)
    }

    const handleSelectAll = () => {
        if (table.getIsAllRowsSelected()) {
            table.toggleAllRowsSelected(false)
        } else {
            table.toggleAllRowsSelected(true)
        }
    }

    const statuses = [
        { value: "new", label: "New" },
        { value: "in-progress", label: "In Progress" },
        { value: "completed", label: "Completed" },
        { value: "assigned", label: "Assigned to Building" },
        { value: "denied", label: "Denied" },
        { value: "cancelled", label: "Cancelled" },
    ]

    const assignees = [
        { value: "john-doe", label: "John Doe" },
        { value: "jane-smith", label: "Jane Smith" },
        { value: "maintenance-team", label: "Maintenance Team" },
        { value: "engineering-team", label: "Engineering Team" },
        { value: "unassigned", label: "Unassigned" },
    ]

    const handleStatusChange = (status: string) => {
        onChangeStatus(getSelectedRequests(), status)
        setShowStatusDropdown(false)
        table.resetRowSelection()
    }

    const handleAssignTo = (assignee: string) => {
        onAssignTo(getSelectedRequests(), assignee)
        setShowAssignDropdown(false)
        table.resetRowSelection()
    }

    const handleApprove = () => {
        if (onApprove) {
            onApprove(getSelectedRequests())
            table.resetRowSelection()
        }
    }

    if (!hasSelectedRows) return null

    return (
        <>
            {/* Overlay to close dropdowns */}
            {(showStatusDropdown || showAssignDropdown) && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => {
                        setShowStatusDropdown(false)
                        setShowAssignDropdown(false)
                    }}
                />
            )}

            <div className="fixed inset-x-0 bottom-8 mx-auto flex w-fit items-center z-50">
                <div className="relative flex items-center rounded-lg bg-gray-900 px-1 shadow-lg shadow-black/30 dark:ring-1 dark:ring-white/10">
                    {/* Selection count */}
                    <div className="px-3 py-2.5 text-sm tabular-nums text-gray-300">
                        {selectedRowsCount} {selectedRowsCount === 1 ? 'request' : 'requests'} selected
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

                    {/* Change Status action */}
                    <div className="relative">
                        <span className="flex items-center gap-x-2 rounded-lg bg-gray-900 p-1 text-sm font-medium text-gray-50">
                            <button
                                onClick={() => {
                                    setShowStatusDropdown(!showStatusDropdown)
                                    setShowAssignDropdown(false)
                                }}
                                className="flex items-center gap-x-2 rounded-md px-3 py-1 hover:bg-gray-800 focus-visible:bg-gray-800"
                            >
                                Change Status
                            </button>
                        </span>
                        
                        {showStatusDropdown && (
                            <div className="absolute bottom-full mb-2 left-0 min-w-[200px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 py-1">
                                {statuses.map((status) => (
                                    <button
                                        key={status.value}
                                        onClick={() => handleStatusChange(status.value)}
                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        {status.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="h-4 w-px bg-gray-700" />

                    {/* Assign To action */}
                    <div className="relative">
                        <span className="flex items-center gap-x-2 rounded-lg bg-gray-900 p-1 text-sm font-medium text-gray-50">
                            <button
                                onClick={() => {
                                    setShowAssignDropdown(!showAssignDropdown)
                                    setShowStatusDropdown(false)
                                }}
                                className="flex items-center gap-x-2 rounded-md px-3 py-1 hover:bg-gray-800 focus-visible:bg-gray-800"
                            >
                                Assign To
                            </button>
                        </span>
                        
                        {showAssignDropdown && (
                            <div className="absolute bottom-full mb-2 left-0 min-w-[200px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 py-1">
                                {assignees.map((assignee) => (
                                    <button
                                        key={assignee.value}
                                        onClick={() => handleAssignTo(assignee.value)}
                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        {assignee.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="h-4 w-px bg-gray-700" />

                    {/* Approve button (conditional) */}
                    {showApprove && onApprove && (
                        <>
                            <span className="flex items-center gap-x-2 rounded-lg bg-gray-900 p-1 text-sm font-medium text-gray-50">
                                <button
                                    onClick={handleApprove}
                                    className="flex items-center gap-x-2 rounded-md px-3 py-1 bg-blue-600 hover:bg-blue-700 focus-visible:bg-blue-700"
                                >
                                    Approve
                                </button>
                            </span>
                            <div className="h-4 w-px bg-gray-700" />
                        </>
                    )}

                    {/* Clear selection */}
                    <span className="flex items-center gap-x-2 rounded-lg bg-gray-900 p-1 text-sm font-medium text-gray-50">
                        <button
                            onClick={() => table.resetRowSelection()}
                            className="flex items-center gap-x-2 rounded-md px-3 py-1 hover:bg-gray-800 focus-visible:bg-gray-800"
                        >
                            Clear
                        </button>
                    </span>
                </div>
            </div>
        </>
    )
}

