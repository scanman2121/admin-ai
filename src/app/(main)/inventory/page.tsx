"use client"

import { Button } from "@/components/Button"
import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { inventoryColumns } from "@/components/ui/data-table/inventory-columns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BulkUploadModal } from "@/components/ui/inventory/BulkUploadModal"
import { serviceInventory } from "@/data/data"
import { ServiceInventory } from "@/data/schema"
import { ChevronDown, Plus, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Inventory() {
  const router = useRouter()
  const [showBulkUpload, setShowBulkUpload] = useState(false)

  const handleRowClick = (row: ServiceInventory) => {
    router.push(`/inventory/${row.serviceId}`)
  }

  const handleAddItem = () => {
    router.push("/inventory/new")
  }

  const splitButton = (
    <div className="flex">
      <Button
        onClick={handleAddItem}
        className="rounded-r-none gap-1"
      >
        <Plus className="h-4 w-4" />
        Add new item
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-l-none border-l border-primary-foreground/20 px-2"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowBulkUpload(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Bulk upload inventory
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageHeader
        title="Inventory"
        customButtons={splitButton}
      />
      <DataTable
        data={serviceInventory}
        columns={inventoryColumns}
        onRowClick={handleRowClick}
      />
      <BulkUploadModal
        open={showBulkUpload}
        onClose={() => setShowBulkUpload(false)}
      />
    </div>
  )
}
