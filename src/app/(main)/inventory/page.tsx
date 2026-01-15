import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { inventoryColumns } from "@/components/ui/data-table/inventory-columns"
import { serviceInventory } from "@/data/data"

export default function Inventory() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageHeader
        title="Inventory"
        primaryCta="Add new service"
      />
      <DataTable data={serviceInventory} columns={inventoryColumns} />
    </div>
  )
}
