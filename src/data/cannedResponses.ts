export interface QuickReply {
  id: string
  title: string
  content: string
  features: string[] // Service Request, Resource Booking, Visitor, General
  serviceRequestTypes?: string[]
  resourceTypes?: string[]
  usage?: number // Track how many times this response has been used
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

// Default quick replies
export const defaultQuickReplies: QuickReply[] = [
  {
    id: "1",
    title: "Request completed",
    content: "Your service request has been completed. Please let us know if you need any additional assistance.",
    features: ["Service Request"],
    usage: 28
  },
  {
    id: "2",
    title: "Request in progress",
    content: "We're currently working on your service request and will update you as soon as we have more information.",
    features: ["Service Request"],
    usage: 15
  },
  {
    id: "3",
    title: "Scheduling follow-up",
    content: "We'll be following up with you shortly to schedule a convenient time to address your request.",
    features: ["Service Request", "Resource Booking"],
    usage: 12
  },
  {
    id: "4",
    title: "Additional information needed",
    content: "To better assist you, we need some additional information about your request. Could you please provide more details?",
    features: ["General"],
    usage: 8
  },
  {
    id: "5",
    title: "Request received",
    content: "Thank you for submitting your service request. We've received it and will begin processing it shortly.",
    features: ["Service Request"],
    usage: 22
  },
  {
    id: "6",
    title: "Directions",
    content: "To get to the conference room, take the elevator to Floor 5. Exit the elevator and turn right. Walk down the hallway past the reception desk, and the conference room will be on your left, Room 520.",
    features: ["Service Request", "Resource Booking", "Visitor", "General"],
    usage: 5
  }
]

// Load quick replies from localStorage or use defaults
export const getQuickReplies = (): QuickReply[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('quickReplies')
    return saved ? JSON.parse(saved) : defaultQuickReplies
  }
  return defaultQuickReplies
}

// Save quick replies to localStorage
export const saveQuickReplies = (responses: QuickReply[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('quickReplies', JSON.stringify(responses))
  }
}

