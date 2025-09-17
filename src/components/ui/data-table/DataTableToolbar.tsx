"use client"

import { Button } from "@/components/ui/button"
import { DataTableFacetedFilter } from "@/components/ui/data-table/DataTableFacetedFilter"
import { DataTableViewOptions } from "@/components/ui/data-table/DataTableViewOptions"
import { Input } from "@/components/ui/input"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

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
                {table.getColumn("industry") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("industry")}
                        title="Industry"
                        options={[
                            { value: "technology", label: "Technology" },
                            { value: "software", label: "Software" },
                            { value: "healthcare", label: "Healthcare" },
                            { value: "finance", label: "Finance" },
                            { value: "retail", label: "Retail" },
                            { value: "manufacturing", label: "Manufacturing" },
                            { value: "design", label: "Design" }
                        ]}
                    />
                )}
                {table.getColumn("status") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("status")}
                        title="Status"
                        options={[
                            { value: "new-prospect", label: "New prospect" },
                            { value: "tour", label: "Tour" },
                            { value: "negotiation", label: "Negotiation" },
                            { value: "proposal", label: "Proposal" },
                            { value: "contract", label: "Contract" },
                            { value: "closed", label: "Closed" },
                            { value: "lost", label: "Lost" }
                        ]}
                    />
                )}
                {table.getColumn("company") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("company")}
                        title="Company"
                        options={[
                            { value: "TechCorp Solutions", label: "TechCorp Solutions" },
                            { value: "Rodriguez & Associates Law", label: "Rodriguez & Associates Law" },
                            { value: "Thompson Consulting Group", label: "Thompson Consulting Group" },
                            { value: "HealthTech Innovations", label: "HealthTech Innovations" },
                            { value: "Wilson Strategic Consulting", label: "Wilson Strategic Consulting" },
                            { value: "Park Architecture Studio", label: "Park Architecture Studio" }
                        ]}
                    />
                )}
                {table.getColumn("acsStatus") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("acsStatus")}
                        title="Status"
                        options={[
                            { value: "active", label: "Active" },
                            { value: "not-in-acs", label: "Not in ACS" },
                            { value: "revoked", label: "Revoked" }
                        ]}
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