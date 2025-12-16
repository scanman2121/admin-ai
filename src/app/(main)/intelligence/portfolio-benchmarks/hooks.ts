"use client"

import { useState } from "react"
import { FeedbackItem } from "./components"

// Demo feedback data
export const allFeedbackData: FeedbackItem[] = [
    // Resource Bookings
    {
        id: "1",
        type: "Resource Booking",
        itemName: "Conference Room A - 3rd Floor",
        building: "Main Tower",
        rating: 5,
        comment: "Perfect space for our team meeting. Clean, well-equipped, and quiet.",
        submittedBy: "Sarah Johnson",
        submittedDate: "3/15/2025",
    },
    {
        id: "2",
        type: "Resource Booking",
        itemName: "Parking Spot #42",
        building: "East Wing",
        rating: 4,
        comment: "Convenient location, though the spot was a bit tight.",
        submittedBy: "Michael Chen",
        submittedDate: "3/14/2025",
    },
    {
        id: "3",
        type: "Resource Booking",
        itemName: "Gym - Morning Session",
        building: "Main Tower",
        rating: 5,
        comment: "Great facilities! Equipment was clean and well-maintained.",
        submittedBy: "Emily Rodriguez",
        submittedDate: "3/13/2025",
    },
    {
        id: "4",
        type: "Resource Booking",
        itemName: "Conference Room B - 2nd Floor",
        building: "West Building",
        rating: 3,
        comment: "Room was okay but the projector wasn't working properly.",
        submittedBy: "David Kim",
        submittedDate: "3/12/2025",
    },
    // Service Requests
    {
        id: "5",
        type: "Service Request",
        itemName: "HVAC Repair - Office Too Cold",
        building: "Main Tower",
        rating: 5,
        comment: "Fixed quickly and efficiently. Staff was very professional.",
        submittedBy: "Jennifer Martinez",
        submittedDate: "3/15/2025",
        staffMember: "John Smith",
    },
    {
        id: "6",
        type: "Service Request",
        itemName: "Light Bulb Replacement - Hallway",
        building: "East Wing",
        rating: 4,
        comment: "Quick response time. Thank you!",
        submittedBy: "Robert Taylor",
        submittedDate: "3/14/2025",
        staffMember: "Maria Garcia",
    },
    {
        id: "7",
        type: "Service Request",
        itemName: "Plumbing Issue - Restroom",
        building: "South Plaza",
        rating: 2,
        comment: "Took longer than expected to resolve. Had to follow up multiple times.",
        submittedBy: "Lisa Anderson",
        submittedDate: "3/13/2025",
        staffMember: "James Wilson",
    },
    {
        id: "8",
        type: "Service Request",
        itemName: "Cleaning Request - Spill in Break Room",
        building: "Main Tower",
        rating: 5,
        comment: "Cleaned up immediately. Excellent service!",
        submittedBy: "Thomas Brown",
        submittedDate: "3/12/2025",
        staffMember: "Patricia Lee",
    },
    {
        id: "9",
        type: "Service Request",
        itemName: "Elevator Maintenance Request",
        building: "West Building",
        rating: 3,
        comment: "Issue was resolved but took a while.",
        submittedBy: "Amanda White",
        submittedDate: "3/11/2025",
        staffMember: "John Smith",
    },
    // Events
    {
        id: "10",
        type: "Event",
        itemName: "Building Networking Happy Hour",
        building: "Main Tower",
        rating: 5,
        comment: "Amazing event! Great networking opportunity and the food was fantastic.",
        submittedBy: "Christopher Davis",
        submittedDate: "3/15/2025",
        staffMember: "Sarah Johnson",
    },
    {
        id: "11",
        type: "Event",
        itemName: "Wellness Workshop - Yoga Session",
        building: "East Wing",
        rating: 4,
        comment: "Really enjoyed the session. Instructor was great!",
        submittedBy: "Michelle Harris",
        submittedDate: "3/14/2025",
        staffMember: "Robert Miller",
    },
    {
        id: "12",
        type: "Event",
        itemName: "Lunch & Learn - Financial Planning",
        building: "South Plaza",
        rating: 5,
        comment: "Very informative and well-organized. Looking forward to more!",
        submittedBy: "Daniel Moore",
        submittedDate: "3/13/2025",
        staffMember: "Sarah Johnson",
    },
    {
        id: "13",
        type: "Event",
        itemName: "Coffee & Donuts Morning Social",
        building: "Main Tower",
        rating: 4,
        comment: "Nice way to start the day. Good variety of options.",
        submittedBy: "Jessica Thompson",
        submittedDate: "3/12/2025",
        staffMember: "Maria Garcia",
    },
    {
        id: "14",
        type: "Event",
        itemName: "Building Tour for New Tenants",
        building: "West Building",
        rating: 3,
        comment: "Tour was okay but felt rushed. Could have been more detailed.",
        submittedBy: "Kevin Martinez",
        submittedDate: "3/11/2025",
        staffMember: "James Wilson",
    },
]

export function useFeedbackData() {
    const [feedback, setFeedback] = useState<FeedbackItem[]>(allFeedbackData)

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this feedback?")) {
            setFeedback(prev => prev.filter(item => item.id !== id))
        }
    }

    return { feedback, handleDelete }
}
