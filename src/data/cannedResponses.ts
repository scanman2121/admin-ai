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
  },
  {
    id: "4",
    title: "Directions to main campus office",
    content: "<p><strong>Directions to Main Campus Office</strong></p><p>Welcome! Here's how to reach our main campus office:</p><p><strong>Address:</strong><br/>125 Lincoln Street<br/>Boston, MA 02111</p><p><strong>Getting here:</strong></p><ul><li><strong>By Public Transit:</strong> Take the <u>Red Line</u> to South Station, then walk 5 minutes north on Lincoln Street</li><li><strong>By Car:</strong> Enter from Lincoln Street. Visitor parking is available in the garage on the right side of the building</li><li><strong>By Foot:</strong> We're located on the corner of Lincoln Street and Summer Street</li></ul><p><strong>Once you arrive:</strong></p><ul><li>Enter through the <strong>main entrance</strong> on Lincoln Street</li><li>Check in at the <em>reception desk</em> on the ground floor</li><li>Take the elevator to <u>Floor 12</u> for the main office</li><li>The office is located in Suite 1200, directly across from the elevator</li></ul><p><strong>Parking information:</strong></p><ul><li>Visitor parking is available in the attached garage</li><li>Parking rates: $15 for the first 2 hours, $5 per additional hour</li><li>Validation available at the reception desk</li></ul><p>If you need any assistance finding us, please call our main line at (617) 555-0100.</p>",
    features: ["Service Request", "Resource Booking", "Visitor", "General"],
    usage: 0
  },
  {
    id: "5",
    title: "Directions to east campus office",
    content: "<p><strong>Directions to East Campus Office</strong></p><p>Here's how to reach our east campus location:</p><p><strong>Address:</strong><br/>38 Chauncy Street<br/>Boston, MA 02111</p><p><strong>Getting here:</strong></p><ul><li><strong>By Public Transit:</strong> Take the <u>Orange Line</u> to Downtown Crossing, then walk 3 minutes east on Chauncy Street</li><li><strong>By Car:</strong> Enter from Chauncy Street. Limited street parking available, or use the public garage on Washington Street</li><li><strong>By Foot:</strong> We're located between Washington Street and Summer Street</li></ul><p><strong>Once you arrive:</strong></p><ul><li>Enter through the <strong>glass entrance</strong> on Chauncy Street</li><li>Check in at the <em>security desk</em> on the first floor</li><li>Take the elevator to <u>Floor 8</u> for the east campus office</li><li>The office is located in Suite 800, turn left after exiting the elevator</li></ul><p><strong>Parking information:</strong></p><ul><li>Street parking is available with metered parking (2-hour limit)</li><li>Public garage located at 50 Washington Street (5-minute walk)</li><li>Garage rates: $12 for the first 2 hours, $4 per additional hour</li></ul><p><strong>Building amenities:</strong></p><ul><li>Café on the ground floor</li><li>Restrooms on every floor</li><li>Accessible entrance and elevators</li></ul><p>If you need any assistance finding us, please call our east campus line at (617) 555-0200.</p>",
    features: ["Service Request", "Resource Booking", "Visitor", "General"],
    usage: 0
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

