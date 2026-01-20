# Add/Edit Service Flow Design

## Overview

Add dedicated pages for creating and editing services in the Service Catalog (Inventory), with unified categories shared with the work orders system and support for linking services to work order service types.

## Data Model

### Updated ServiceInventory Schema

```typescript
type ServiceInventory = {
  serviceId: string
  serviceName: string
  category: "Electrical" | "Plumbing" | "HVAC" | "Maintenance" | "Security" | "Cleaning" | "Other"
  priceType: "fixed" | "quote" | "free"
  basePrice: number | null
  property: string
  status: "active" | "inactive"
  description?: string
  serviceTypes: string[] // Links to work order service types (one-to-many)
}
```

### Unified Categories

Both service catalog and work orders use the same categories:
- Electrical
- Plumbing
- HVAC
- Maintenance
- Security
- Cleaning
- Other

## Routes

- `/inventory/new` - Add new service page
- `/inventory/[id]` - Edit service page

## Page Structure

Both add and edit pages share the same form layout:

### Header
- Back link: "← Back to Inventory"
- Cancel button (ghost)
- Save Service button (primary)

### Form Sections

**Service Details**
- Service Name (required, text input)
- Service ID (auto-generated for new, read-only for edit)
- Description (optional, textarea)

**Classification**
- Category (required, dropdown): Electrical, Plumbing, HVAC, Maintenance, Security, Cleaning, Other
- Property (required, dropdown): "All Properties" + list of properties
- Service Types (optional, multi-select): Links to work order service types for auto-assignment

**Pricing**
- Price Type (required, radio buttons): Fixed, Quote, Free
- Base Price (required if Fixed, number input with $ prefix)

**Status**
- Status (required, radio buttons): Active, Inactive (defaults to Active)

## Interactions

### Navigation
| Action | Behavior |
|--------|----------|
| "Add new service" button (Inventory page) | Navigate to `/inventory/new` |
| Row click (Inventory table) | Navigate to `/inventory/[serviceId]` |
| Cancel button | Navigate back to `/inventory` (confirm if unsaved changes) |
| Save Service button | Validate → Save → Navigate to `/inventory` with success toast |

### Conditional Fields
| Price Type | Base Price Field |
|------------|------------------|
| Fixed | Visible, required |
| Quote | Hidden |
| Free | Hidden |

## Validation Rules

- Service Name: Required, max 100 characters
- Category: Required
- Property: Required
- Price Type: Required
- Base Price: Required only when Price Type = "Fixed", must be positive number
- Status: Required, defaults to "Active"
- Service Types: Optional

## Service ID Generation

- New services: Auto-generate `SVC-XXX` format (incrementing based on existing max ID)
- Edit: Display as read-only, non-editable

## Implementation Files

### New Files
- `src/app/(main)/inventory/new/page.tsx` - Add service page
- `src/app/(main)/inventory/[id]/page.tsx` - Edit service page
- `src/components/ui/inventory/ServiceForm.tsx` - Shared form component

### Modified Files
- `src/data/schema.ts` - Update ServiceInventory type
- `src/data/data.ts` - Update mock data with new fields
- `src/components/ui/data-table/inventory-columns.tsx` - Add row click handler
- `src/app/(main)/inventory/page.tsx` - Wire up "Add new service" button navigation
