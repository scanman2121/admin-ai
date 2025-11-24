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
    title: "Additional information needed",
    content: "To better assist you, we need some additional information about your request. Could you please provide more details?",
    features: ["General"],
    usage: 8
  },
  {
    id: "2",
    title: "Request received",
    content: "Thank you for submitting your service request. We've received it and will begin processing it shortly.",
    features: ["Service Request"],
    usage: 22
  },
  {
    id: "3",
    title: "Directions",
    content: "<p><strong>Directions to Conference Room 520</strong></p><p>To get to the conference room, please follow these steps:</p><ul><li><strong>Take the elevator</strong> to <u>Floor 5</u></li><li>Exit the elevator and <em>turn right</em></li><li>Walk down the hallway past the reception desk</li><li>The conference room will be on your <strong>left</strong>, Room 520</li></ul><p><strong>Important notes:</strong></p><ul><li>The elevator is located in the main lobby</li><li>If you need assistance, please check in at the reception desk on Floor 5</li><li>Room 520 is equipped with a projector, whiteboard, and video conferencing capabilities</li><li>Restrooms are located down the hall, past Room 520 on the right</li></ul><p>If you have any questions or need further assistance, please don't hesitate to reach out!</p>",
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

