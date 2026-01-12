// Shared types for Service Request Setup Wizard

export interface TeamMember {
  id: string
  name: string
  role: string
  initials: string
  email: string
}

export interface Team {
  id: string
  name: string
  description: string
  members: TeamMember[]
}

export interface Category {
  id: number
  name: string
  description: string
  status: boolean
  assignedTo: string
  assignedToType: "user" | "team"
}

export interface ServiceType {
  id: number
  requestType: string
  description: string
  category: string
  approval: string
  needsApproval: boolean
  approvalType?: "tenant-admin" | "specific-member" | "team" | "role"
  assignedTo: string
  assignedToType: "user" | "team"
  priceType?: "none" | "fixed" | "range"
  priceFixed?: string
  priceMin?: string
  priceMax?: string
  status: boolean
  statuses: Array<{
    name: string
    notifyRequestor: boolean
    notifyAssignee: boolean
  }>
}

export interface Status {
  id: number
  name: string
  description: string
  status: boolean
  color: string
  orderCount?: number
}

export interface FormField {
  id: string
  name: string
  description: string
  type: "text" | "textarea" | "dropdown" | "checkbox" | "number" | "date" | "file"
  enabled: boolean
  required: boolean
  serviceTypes: string[]
  isCore: boolean
  options: string[]
}

export interface NotificationSettings {
  notifyRequestor: boolean
  notifyAssignedTeam: boolean
  notifyOnStatusChanges: boolean
}

export interface WizardData {
  teams: Team[]
  categories: Category[]
  serviceTypes: ServiceType[]
  statuses: Status[]
  formFields: FormField[]
  notifications: NotificationSettings
}

