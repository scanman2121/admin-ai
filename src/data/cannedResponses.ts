export interface CannedResponse {
  id: string
  title: string
  content: string
  category?: string
}

// Default canned responses
export const defaultCannedResponses: CannedResponse[] = [
  {
    id: "1",
    title: "Request completed",
    content: "Your service request has been completed. Please let us know if you need any additional assistance.",
    category: "Completion"
  },
  {
    id: "2",
    title: "Request in progress",
    content: "We're currently working on your service request and will update you as soon as we have more information.",
    category: "Status Update"
  },
  {
    id: "3",
    title: "Scheduling follow-up",
    content: "We'll be following up with you shortly to schedule a convenient time to address your request.",
    category: "Scheduling"
  },
  {
    id: "4",
    title: "Additional information needed",
    content: "To better assist you, we need some additional information about your request. Could you please provide more details?",
    category: "Information Request"
  },
  {
    id: "5",
    title: "Request received",
    content: "Thank you for submitting your service request. We've received it and will begin processing it shortly.",
    category: "Acknowledgement"
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

