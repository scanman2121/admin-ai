# Configurable Pricing for Service Requests

## Overview

This design introduces configurable pricing for service requests, allowing admins to set prices, provide quotes, and manage payment options for concierge services.

## Pages

### Inventory Page (Service Catalog)

The Inventory page becomes a service catalog where admins configure available services and their pricing.

**Schema:**
```typescript
type ServiceInventory = {
  serviceId: string
  serviceName: string
  category: string // Badge, Cleaning, Parking, Key, etc.
  priceType: "fixed" | "quote" | "free"
  basePrice: number | null // null for quote-based
  property: string
  status: "active" | "inactive"
  description?: string
}
```

**Columns:**
| Service ID | Service Name | Category | Price Type | Base Price | Property | Status | Actions |

**Price Type Display:**
- Fixed: Shows formatted price (e.g., "$25.00")
- Quote: Badge showing "Quote Required"
- Free: Badge showing "Free"

**Row Actions:**
- Edit service
- Duplicate service
- Deactivate/Activate

**Page Header:**
- Title: "Inventory"
- Primary CTA: "Add new service"

---

### Invoices Page

The Invoices page shows charge records with full management capabilities.

**Schema:**
```typescript
type TenantInvoice = {
  invoiceId: string
  invoiceDate: string
  property: string
  tenantName: string
  description: string
  amount: number
  dueDate: string
  status: "draft" | "pending" | "paid" | "overdue" | "void"
  paymentMethod: "stripe" | "manual" | "external" | null
  paidDate: string | null
  serviceType?: string
}
```

**Columns:**
| Invoice ID | Date | Property | Tenant | Description | Amount | Due Date | Status | Payment Method | Paid Date | Actions |

**Status Badges:**
- Draft: Gray (price not yet set)
- Pending: Yellow (awaiting payment)
- Paid: Green
- Overdue: Red
- Void: Gray strikethrough

**Payment Method Display:**
- Stripe: "Stripe" with icon
- Manual: "Manual"
- External: "External"
- null: "—"

**Page Header:**
- Title: "Invoices"
- Primary CTA: "Create invoice"
- Secondary CTA: "Export CSV"

**Row Actions:**
1. Set Price - Modal to set/edit amount (draft/pending/overdue)
2. Mark as Paid - Modal to select payment method and confirm (pending/overdue)
3. Send to Stripe - Generates Stripe payment link (pending/overdue)
4. Void Invoice - Cancels with confirmation (draft/pending/overdue)
5. View Details - Opens detail panel (all statuses)

**Action Availability Matrix:**
| Action | Draft | Pending | Paid | Overdue | Void |
|--------|-------|---------|------|---------|------|
| Set Price | Yes | Yes | No | Yes | No |
| Mark as Paid | No | Yes | No | Yes | No |
| Send to Stripe | No | Yes | No | Yes | No |
| Void | Yes | Yes | No | Yes | No |
| View Details | Yes | Yes | Yes | Yes | Yes |

---

## Implementation Notes

### Data Changes
- Update `ServiceInventory` type in `src/data/schema.ts`
- Update `TenantInvoice` type in `src/data/schema.ts`
- Update mock data in `src/data/data.ts`

### Component Changes
- Update `src/components/ui/data-table/inventory-columns.tsx`
- Update `src/components/ui/data-table/invoices-columns.tsx`
- Update `src/app/(main)/inventory/page.tsx`
- Update `src/app/(main)/invoices/page.tsx`

### New Features
- CSV export utility for invoices
- Price type badge component (or reuse existing Badge)
- Payment method display logic
