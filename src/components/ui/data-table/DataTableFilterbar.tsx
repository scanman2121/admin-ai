"use client"

import { Button } from "@/components/Button"
import { Searchbar } from "@/components/Searchbar"
import { companies, roles, statuses } from "@/data/data"
import { RiDownloadLine } from "@remixicon/react"
import { Table } from "@tanstack/react-table"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { DataTableFilter } from "./DataTableFilter"
import { ViewOptions } from "./DataTableViewOptions"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function Filterbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const [searchTerm, setSearchTerm] = useState<string>("")

  const debouncedSetGlobalFilter = useDebouncedCallback((value) => {
    table.setGlobalFilter(value)
  }, 300)

  const handleSearchChange = (event: any) => {
    const value = event.target.value
    setSearchTerm(value)
    debouncedSetGlobalFilter(value)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-x-6">
      <div className="flex w-full flex-col gap-2 sm:w-fit sm:flex-row sm:items-center">
        <Searchbar
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full sm:max-w-[250px] sm:[&>input]:h-[30px]"
        />
        {table.getColumn("status")?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
            type="select"
          />
        )}
        {table.getColumn("role")?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn("role")}
            title="Role"
            options={roles}
            type="select"
          />
        )}
        {table.getColumn("company")?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn("company")}
            title="Company"
            options={companies}
            type="select"
          />
        )}
        {table.getColumn("requestedResource")?.getIsVisible() && (
          <DataTableFilter
            column={table.getColumn("requestedResource")}
            title="Resource"
            type="select"
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        <ViewOptions table={table} />
        <Button
          variant="secondary"
          className="hidden gap-x-2 px-2 py-1.5 text-sm sm:text-xs lg:flex"
        >
          <RiDownloadLine className="size-4" aria-hidden="true" />
          Download
        </Button>
      </div>
    </div>
  )
}
