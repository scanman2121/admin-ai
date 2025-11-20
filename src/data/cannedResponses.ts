export interface CannedResponse {
  id: string
  title: string
  content: string
  features: string[] // Service Request, Resource Booking, Visitor, General
  serviceRequestCategories?: string[]
  serviceRequestTypes?: string[]
  resourceTypes?: string[]
}

// Feature options
export const FEATURES = [
  "Service Request",
  "Resource Booking",
  "Visitor",
  "General"
] as const

// Service Request Categories
export const SERVICE_REQUEST_CATEGORIES = [
  "Cleaning & Waste",
  "Temperature & Air",
  "Repairs & Maintenance",
  "Security",
  "Other"
] as const

// Service Request Types (examples - can be expanded)
export const SERVICE_REQUEST_TYPES = [
  "HVAC Issue",
  "Plumbing Repair",
  "Electrical Problem",
  "General Repair",
  "Deep Cleaning",
  "Carpet Cleaning",
  "Window Cleaning",
  "Waste Removal",
  "Access Request",
  "Key Card Request",
  "Visitor Access",
  "Security Incident"
] as const

// Resource Types
export const RESOURCE_TYPES = [
  "Conference Rooms",
  "Rooftops",
  "Auditoriums",
  "Parking Spaces",
  "Desk Spaces",
  "Meeting Rooms",
  "Event Spaces",
  "Lounges"
] as const

// Default canned responses
export const defaultCannedResponses: CannedResponse[] = [
  {
    id: "1",
    title: "Request completed",
    content: "Your service request has been completed. Please let us know if you need any additional assistance.",
    features: ["Service Request"]
  },
  {
    id: "2",
    title: "Request in progress",
    content: "We're currently working on your service request and will update you as soon as we have more information.",
    features: ["Service Request"]
  },
  {
    id: "3",
    title: "Scheduling follow-up",
    content: "We'll be following up with you shortly to schedule a convenient time to address your request.",
    features: ["Service Request", "Resource Booking"]
  },
  {
    id: "4",
    title: "Additional information needed",
    content: "To better assist you, we need some additional information about your request. Could you please provide more details?",
    features: ["General"]
  },
  {
    id: "5",
    title: "Request received",
    content: "Thank you for submitting your service request. We've received it and will begin processing it shortly.",
    features: ["Service Request"]
  }
]

// Load canned responses from localStorage or use defaults
export const getCannedResponses = (): CannedResponse[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('cannedResponses')
    return saved ? JSON.parse(saved) : defaultCannedResponses
  }
  return defaultCannedResponses
}

// Save canned responses to localStorage
export const saveCannedResponses = (responses: CannedResponse[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cannedResponses', JSON.stringify(responses))
  }
}

