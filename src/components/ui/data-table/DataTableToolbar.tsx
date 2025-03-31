"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { DataTableFacetedFilter } from "./DataTableFacetedFilter"
import { DataTableViewOptions } from "./DataTableViewOptions"

const documentTypes = [
    { label: "PDF", value: "pdf" },
    { label: "Word", value: "doc" },
    { label: "Excel", value: "xls" },
    { label: "Image", value: "img" },
    { label: "Other", value: "other" }
]

const buildings = [
    { label: "125 Highland Ave", value: "125-highland" },
    { label: "200 Broadway", value: "200-broadway" },
    { label: "500 Tech Square", value: "500-tech-square" }
]

const tenants = [
    { label: "Acme Corp", value: "acme" },
    { label: "Globex Corp", value: "globex" },
    { label: "Initech", value: "initech" }
]

interface DataTableToolbarProps<TData> {
    table: Table<TData>
    searchKey: string
}

export function DataTableToolbar<TData>({
    table,
    searchKey,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder={`Search by ${searchKey}...`}
                    value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(searchKey)?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("documentType") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("documentType")}
                        title="Document Type"
                        options={documentTypes}
                    />
                )}
                {table.getColumn("building") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("building")}
                        title="Building"
                        options={buildings}
                    />
                )}
                {table.getColumn("tenant") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("tenant")}
                        title="Tenant"
                        options={tenants}
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