"use client"

import { InvoiceForm } from "@/components/ui/invoices/InvoiceForm"
import { tenantInvoices } from "@/data/data"
import { useParams } from "next/navigation"

export default function InvoiceDetailPage() {
  const params = useParams()
  const id = params.id as string

  // Find the invoice by ID
  const invoice = tenantInvoices.find((inv) => inv.invoiceId === id)

  if (!invoice) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-lg font-medium text-gray-900">Invoice not found</h2>
          <p className="text-sm text-gray-500 mt-1">
            The invoice with ID "{id}" could not be found.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <InvoiceForm initialData={invoice} />
    </div>
  )
}
