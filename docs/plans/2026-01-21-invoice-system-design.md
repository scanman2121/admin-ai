# Invoice System Design

## Overview

Build out the invoice system with invoice types, detail views, line items from inventory, and source linking to service requests, bookings, and events.

## Invoice Types

- `service_request` - Linked to a work order/service request
- `resource_booking` - Linked to a resource booking
- `event_registration` - Linked to an event registration
- `manual` - Custom/manual invoice
- `recurring` - Recurring charge

## Data Model

### InvoiceLineItem
```typescript
type InvoiceLineItem = {
  id: string
  serviceId?: string // Link to inventory item (optional)
  description: string
  quantity: number
  unitPrice: number
  total: number
}
```

### InvoiceSource
```typescript
type InvoiceSource = {
  type: InvoiceType
  sourceId?: string // e.g., work order ID, booking ID
  sourceName?: string // Display name
  sourceDate?: string
  sourceStatus?: string
  sourceRequestor?: string
}
```

### TenantInvoice (Updated)
```typescript
type InvoiceType = "service_request" | "resource_booking" | "event_registration" | "manual" | "recurring"

type TenantInvoice = {
  invoiceId: string
  invoiceDate: string
  property: string
  tenantName: string
  invoiceType: InvoiceType
  source?: InvoiceSource
  lineItems: InvoiceLineItem[]
  subtotal: number
  tax?: number
  total: number
  dueDate: string
  status: "draft" | "pending" | "paid" | "overdue" | "void"
  paymentMethod: "stripe" | "manual" | "external" | null
  paidDate: string | null
  notes?: string
}
```

## Routes

- `/invoices` - List page with Type column, row click navigation
- `/invoices/new` - Create new invoice
- `/invoices/[id]` - View/Edit invoice detail

## Page Layout

### Invoice Detail Page

**Header:**
- Back link to /invoices
- Cancel/Save buttons (edit mode) or Edit button (view mode)
- Invoice ID and Status badge

**Source Card (conditional):**
- Shows for service_request, resource_booking, event_registration types
- Displays: link to source, date, status, requestor
- Clickable link navigates to source detail

**Invoice Details Section:**
- Type dropdown
- Property dropdown
- Tenant input
- Invoice date

**Line Items Section:**
- Table: Description, Qty, Unit Price, Total, Actions
- "+ Add Item" button opens item selector
- Can select from inventory or add custom line
- Price can be overridden per line
- Delete action per row

**Totals:**
- Subtotal (auto-calculated)
- Tax (configurable, default 0%)
- Total (auto-calculated)

**Payment Section:**
- Due Date picker
- Status dropdown
- Payment Method (when paid)
- Paid Date (when paid)

## Row Click Behavior

| Status | Mode |
|--------|------|
| Draft | Edit |
| Pending | Edit |
| Paid | View (with Edit button) |
| Overdue | Edit |
| Void | View (no Edit) |

## Add Line Item Flow

1. Click "+ Add Item"
2. Modal with inventory dropdown or "Custom" option
3. Select item → pre-fills description and unit price
4. Enter quantity
5. Optionally override unit price
6. Click Add → row added to table
7. Total auto-updates

## Implementation Files

### Schema Updates
- `src/data/schema.ts` - Add InvoiceType, InvoiceLineItem, InvoiceSource, update TenantInvoice

### Data Updates
- `src/data/data.ts` - Update mock invoices with new structure

### Column Updates
- `src/components/ui/data-table/invoices-columns.tsx` - Add Type column

### New Components
- `src/components/ui/invoices/InvoiceForm.tsx` - Shared form component
- `src/components/ui/invoices/LineItemsTable.tsx` - Line items management
- `src/components/ui/invoices/AddLineItemModal.tsx` - Add item modal
- `src/components/ui/invoices/SourceCard.tsx` - Source info card

### New Pages
- `src/app/(main)/invoices/new/page.tsx` - Create invoice
- `src/app/(main)/invoices/[id]/page.tsx` - View/Edit invoice

### Page Updates
- `src/app/(main)/invoices/page.tsx` - Add row click navigation
