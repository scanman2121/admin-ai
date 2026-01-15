import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { invoicesColumns } from "@/components/ui/data-table/invoices-columns"
import { tenantInvoices } from "@/data/data"

export default function Invoices() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageHeader
        title="Invoices"
        primaryCta="Create invoice"
      />
      <DataTable data={tenantInvoices} columns={invoicesColumns} />
    </div>
  )
}
