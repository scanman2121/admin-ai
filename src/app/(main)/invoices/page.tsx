"use client"

import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { invoicesColumns } from "@/components/ui/data-table/invoices-columns"
import { tenantInvoices } from "@/data/data"

function exportToCSV() {
  const headers = [
    "Invoice ID",
    "Date",
    "Property",
    "Tenant",
    "Description",
    "Amount",
    "Due Date",
    "Status",
    "Payment Method",
    "Paid Date",
  ]

  const rows = tenantInvoices.map((invoice) => [
    invoice.invoiceId,
    invoice.invoiceDate,
    invoice.property,
    invoice.tenantName,
    invoice.description,
    invoice.amount.toFixed(2),
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
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageHeader
        title="Invoices"
        primaryCta="Create invoice"
        secondaryCta="Export CSV"
        onSecondaryClick={exportToCSV}
      />
      <DataTable data={tenantInvoices} columns={invoicesColumns} />
    </div>
  )
}
