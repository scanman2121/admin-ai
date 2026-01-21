"use client"

import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { inventoryColumns } from "@/components/ui/data-table/inventory-columns"
import { serviceInventory } from "@/data/data"
import { ServiceInventory } from "@/data/schema"
import { useRouter } from "next/navigation"

export default function Inventory() {
  const router = useRouter()

  const handleRowClick = (row: ServiceInventory) => {
    router.push(`/inventory/${row.serviceId}`)
  }

  const handleAddService = () => {
    router.push("/inventory/new")
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageHeader
        title="Inventory"
        primaryCta="Add new item"
        onPrimaryClick={handleAddService}
      />
      <DataTable
        data={serviceInventory}
        columns={inventoryColumns}
        onRowClick={handleRowClick}
      />
    </div>
  )
}
