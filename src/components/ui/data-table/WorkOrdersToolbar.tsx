"use client"

import { Button } from "@/components/ui/button"
import { DataTableFacetedFilter } from "@/components/ui/data-table/DataTableFacetedFilter"
import { DataTableViewOptions } from "@/components/ui/data-table/DataTableViewOptions"
import { Input } from "@/components/ui/input"
import { buildings, companies, issueTypes, serviceRequestStatuses } from "@/data/data"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

interface WorkOrdersToolbarProps<TData> {
    table: Table<TData>
    searchKey: string
}

export function WorkOrdersToolbar<TData>({
    table,
    searchKey,
}: WorkOrdersToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search"
                    value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(searchKey)?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("company") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("company")}
                        title="Company"
                        options={companies}
                    />
                )}
                {/* Date filter - for now we'll show a simple filter */}
                <Button variant="outline" size="sm" className="h-8 border-dashed">
                    Date
                </Button>
                {table.getColumn("issueType") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("issueType")}
                        title="Issue Type"
                        options={issueTypes}
                    />
                )}
                {table.getColumn("building") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("building")}
                        title="Building"
                        options={buildings}
                    />
                )}
                {table.getColumn("status") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("status")}
                        title="Status"
                        options={serviceRequestStatuses.map(status => ({ 
                            value: status.value, 
                            label: status.label 
                        }))}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    )
}
