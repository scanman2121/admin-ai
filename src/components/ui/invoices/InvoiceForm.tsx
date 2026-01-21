"use client"

import { Badge, BadgeProps } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { buildings } from "@/data/data"
import { InvoiceLineItem, InvoiceType, TenantInvoice } from "@/data/schema"
import { formatters } from "@/lib/utils"
import { ArrowLeft, Edit2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { LineItemsTable } from "./LineItemsTable"
import { SourceCard } from "./SourceCard"

const invoiceTypes: { value: InvoiceType; label: string }[] = [
  { value: "service_request", label: "Service Request" },
  { value: "resource_booking", label: "Resource Booking" },
  { value: "event_registration", label: "Event Registration" },
  { value: "manual", label: "Manual" },
  { value: "recurring", label: "Recurring" },
]

const invoiceStatuses: { value: TenantInvoice["status"]; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "overdue", label: "Overdue" },
  { value: "void", label: "Void" },
]

const propertyOptions = [
  { value: "All Properties", label: "All Properties" },
  ...buildings,
]

interface InvoiceFormProps {
  initialData?: TenantInvoice
  isNew?: boolean
}

export function InvoiceForm({ initialData, isNew = false }: InvoiceFormProps) {
  const router = useRouter()

  // Determine initial editing state based on status
  const canEdit = !initialData || ["draft", "pending", "overdue"].includes(initialData.status)
  const [isEditing, setIsEditing] = useState(isNew || canEdit)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState<Partial<TenantInvoice>>({
    invoiceId: initialData?.invoiceId || "",
    invoiceDate: initialData?.invoiceDate || new Date().toLocaleDateString(),
    property: initialData?.property || "All Properties",
    tenantName: initialData?.tenantName || "",
    invoiceType: initialData?.invoiceType || "manual",
    source: initialData?.source,
    lineItems: initialData?.lineItems || [],
    subtotal: initialData?.subtotal || 0,
    tax: initialData?.tax || 0,
    total: initialData?.total || 0,
    dueDate: initialData?.dueDate || "",
    status: initialData?.status || "draft",
    paymentMethod: initialData?.paymentMethod || null,
    paidDate: initialData?.paidDate || null,
    notes: initialData?.notes || "",
  })

  const recalculateTotals = (lineItems: InvoiceLineItem[]) => {
    const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0)
    const tax = formData.tax || 0
    const total = subtotal + (subtotal * tax / 100)
    return { subtotal, total }
  }

  const handleLineItemsChange = (lineItems: InvoiceLineItem[]) => {
    const { subtotal, total } = recalculateTotals(lineItems)
    setFormData({ ...formData, lineItems, subtotal, total })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // In a real app, save to API
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push("/invoices")
  }

  const handleCancel = () => {
    if (isNew) {
      router.push("/invoices")
    } else {
      setIsEditing(false)
    }
  }

  const getStatusVariant = (status: string): BadgeProps["variant"] => {
    switch (status) {
      case "paid":
        return "success"
      case "pending":
        return "warning"
      case "overdue":
        return "error"
      case "void":
      case "draft":
      default:
        return "default"
    }
  }

  const showSource = formData.source && ["service_request", "resource_booking", "event_registration"].includes(formData.invoiceType || "")

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/invoices"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Invoices
        </Link>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <Button variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Invoice"}
              </Button>
            </>
          ) : (
            canEdit && (
              <Button variant="secondary" onClick={() => setIsEditing(true)} className="gap-1">
                <Edit2 className="h-4 w-4" />
                Edit
              </Button>
            )
          )}
        </div>
      </div>

      {/* Title and Status */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isNew ? "New Invoice" : `Invoice ${formData.invoiceId}`}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isNew ? "Create a new invoice" : `Created ${formData.invoiceDate}`}
          </p>
        </div>
        {!isNew && formData.status && (
          <Badge variant={getStatusVariant(formData.status)} className="text-sm px-3 py-1">
            {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
          </Badge>
        )}
      </div>

      {/* Source Card */}
      {showSource && formData.source && (
        <Card>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Source
          </h2>
          <SourceCard source={formData.source} />
        </Card>
      )}

      {/* Invoice Details */}
      <Card>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Invoice Details
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="invoiceType">Type</Label>
            <Select
              value={formData.invoiceType}
              onValueChange={(value) =>
                setFormData({ ...formData, invoiceType: value as InvoiceType })
              }
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {invoiceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="property">Property</Label>
            <Select
              value={formData.property}
              onValueChange={(value) => setFormData({ ...formData, property: value })}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {propertyOptions.map((prop) => (
                  <SelectItem key={prop.value} value={prop.value}>
                    {prop.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenantName">Tenant</Label>
            <Input
              id="tenantName"
              value={formData.tenantName}
              onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
              disabled={!isEditing}
              placeholder="Tenant name"
            />
          </div>
        </div>
      </Card>

      {/* Line Items */}
      <Card>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Line Items
        </h2>
        <LineItemsTable
          lineItems={formData.lineItems || []}
          onLineItemsChange={handleLineItemsChange}
          isEditing={isEditing}
        />

        {/* Totals */}
        <div className="flex justify-end mt-6">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-900">{formatters.currency(formData.subtotal || 0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tax ({formData.tax || 0}%)</span>
              <span className="text-gray-900">
                {formatters.currency((formData.subtotal || 0) * (formData.tax || 0) / 100)}
              </span>
            </div>
            <div className="flex justify-between text-base font-medium border-t pt-2">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">{formatters.currency(formData.total || 0)}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Payment Section */}
      <Card>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Payment
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="text"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              disabled={!isEditing}
              placeholder="MM/DD/YYYY"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value as TenantInvoice["status"] })
              }
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {invoiceStatuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.status === "paid" && (
            <div className="space-y-2">
              <Label htmlFor="paidDate">Paid Date</Label>
              <Input
                id="paidDate"
                type="text"
                value={formData.paidDate || ""}
                onChange={(e) => setFormData({ ...formData, paidDate: e.target.value })}
                disabled={!isEditing}
                placeholder="MM/DD/YYYY"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Notes */}
      <Card>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Notes
        </h2>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          disabled={!isEditing}
          placeholder="Optional notes..."
          rows={3}
        />
      </Card>
    </div>
  )
}
