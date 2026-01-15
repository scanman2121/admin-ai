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

export type ServiceInventory = {
  inventoryId: string
  dateCreated: string
  propertyName: string
  serviceType: string
  description: string
  requestedBy: string
  status: string
  quantity: number
}

export type TenantInvoice = {
  invoiceId: string
  invoiceDate: string
  propertyName: string
  unitNumber: string
  tenantName: string
  description: string
  amountDue: number
  dueDate: string
  paymentStatus: string
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
