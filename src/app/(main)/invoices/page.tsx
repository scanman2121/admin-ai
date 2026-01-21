"use client"

import { Button } from "@/components/Button"
import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { invoicesColumns } from "@/components/ui/data-table/invoices-columns"
import { tenantInvoices } from "@/data/data"
import { TenantInvoice } from "@/data/schema"
import { Download } from "lucide-react"
import { useRouter } from "next/navigation"

function exportToCSV() {
  const headers = [
    "Invoice ID",
    "Date",
    "Type",
    "Property",
    "Tenant",
    "Subtotal",
    "Tax",
    "Total",
    "Due Date",
    "Status",
    "Payment Method",
    "Paid Date",
  ]

  const rows = tenantInvoices.map((invoice) => [
    invoice.invoiceId,
    invoice.invoiceDate,
    invoice.invoiceType,
    invoice.property,
    invoice.tenantName,
    invoice.subtotal.toFixed(2),
    (invoice.tax || 0).toFixed(2),
    invoice.total.toFixed(2),
    invoice.dueDate,
    invoice.status,
    invoice.paymentMethod || "",
    invoice.paidDate || "",
  ])

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `invoices-${new Date().toISOString().split("T")[0]}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default function Invoices() {
  const router = useRouter()

  const handleRowClick = (row: TenantInvoice) => {
    router.push(`/invoices/${row.invoiceId}`)
  }

  const handleCreateInvoice = () => {
    router.push("/invoices/new")
  }

  const exportButton = (
    <Button
      variant="outline"
      size="sm"
      className="h-8"
      onClick={exportToCSV}
    >
      <Download className="mr-2 h-4 w-4" />
      Export
    </Button>
  )

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageHeader
        title="Invoices"
        primaryCta="Create invoice"
        onPrimaryClick={handleCreateInvoice}
      />
      <DataTable
        data={tenantInvoices}
        columns={invoicesColumns}
        onRowClick={handleRowClick}
        customViewActions={exportButton}
      />
    </div>
  )
}
