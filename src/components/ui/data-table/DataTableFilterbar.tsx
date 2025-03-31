"use client"

import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"
import { useDebouncedCallback } from "use-debounce"
import { DataTableFilter } from "./DataTableFilter"
import { DataTableViewOptions } from "./DataTableViewOptions"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filter: string
  onFilterChange: (value: string) => void
}

export function DataTableFilterbar<TData>({
  table,
  filter,
  onFilterChange,
}: DataTableToolbarProps<TData>) {
  const handleSearchChange = useDebouncedCallback((term: string) => {
    onFilterChange(term)
  }, 500)

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter records..."
          value={filter}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFilter
            column={table.getColumn("status")}
            title="Status"
            type="select"
          />
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
