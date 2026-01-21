export type Usage = {
  requestSubmitted?: string
  requestedResource?: string
  requestedDate?: string
  requestedTime?: string
  requesterName?: string
  email?: string
  bookingInfo?: string
  status: string
  totalPrice?: number
  owner?: string
  costs?: number
  region?: string
  stability?: number
  lastEdited?: string
  transactionId?: string
  transactionDate?: string
  propertyName?: string
  unitNumber?: string
  tenantName?: string
  paymentMethod?: string
  paymentType?: string
  amount?: number
  dueDate?: string
  paymentStatus?: string
  creditId?: string
  creditAmount?: number
  creditReason?: string
  creditAppliedTo?: string
  discountId?: string
  discountType?: string
  discountAmount?: number
  discountPercentage?: number
  discountPeriod?: string
  discountAppliedTo?: string
}

export type Visitor = {
  checkInTime: string
  visitorName: string
  company: string
  hostName: string
  hostId?: string
  purpose: string
  status: string
  checkOutTime: string | null
  badgeNumber: string
}

export type ServiceCategory = "Electrical" | "Plumbing" | "HVAC" | "Maintenance" | "Security" | "Cleaning" | "Other"

export type ServiceInventory = {
  serviceId: string
  serviceName: string
  category: ServiceCategory
  priceType: "fixed" | "quote" | "free"
  basePrice: number | null
  property: string
  status: "active" | "inactive"
  description?: string
  serviceTypes?: string[] // Links to work order service types
}

export type InvoiceType = "service_request" | "resource_booking" | "event_registration" | "manual" | "recurring"

export type InvoiceLineItem = {
  id: string
  serviceId?: string // Link to inventory item (optional for custom lines)
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export type InvoiceSource = {
  type: InvoiceType
  sourceId?: string // e.g., work order ID, booking ID
  sourceName?: string // Display name
  sourceDate?: string
  sourceStatus?: string
  sourceRequestor?: string
}

export type TenantInvoice = {
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

export type OverviewData = {
  date: string
  "Rows written": number
  "Rows read": number
  Queries: number
  "Payments completed": number
  "Sign ups": number
  Logins: number
  "Sign outs": number
  "Support calls": number
}
