"use client"

import { Button } from "@/components/Button"
import { PageTemplate } from "@/components/PageTemplate"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/Table"
import { RiDeleteBinLine, RiStarFill } from "@remixicon/react"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Feedback page
const tabs = [
    { name: "All feedback", href: "/intelligence/portfolio-benchmarks" },
    { name: "Resources", href: "/intelligence/portfolio-benchmarks/resources" },
    { name: "Service Requests", href: "/intelligence/portfolio-benchmarks/service-requests" },
    { name: "Events", href: "/intelligence/portfolio-benchmarks/events" },
    { name: "By Staff", href: "/intelligence/portfolio-benchmarks/by-staff" },
]

// Demo feedback data
interface FeedbackItem {
    id: string
    type: "Resource Booking" | "Service Request" | "Event"
    itemName: string
    building: string
    rating: number
    comment?: string
    submittedBy: string
    submittedDate: string
    staffMember?: string
}

const allFeedbackData: FeedbackItem[] = [
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

// Staff members for By Staff tab
const staffMembers = [
    { name: "John Smith", role: "Maintenance Technician" },
    { name: "Maria Garcia", role: "Facilities Coordinator" },
    { name: "James Wilson", role: "Building Manager" },
    { name: "Patricia Lee", role: "Cleaning Staff" },
    { name: "Sarah Johnson", role: "Events Coordinator" },
    { name: "Robert Miller", role: "Wellness Coordinator" },
]

function FeedbackTable({ feedback, onDelete }: { feedback: FeedbackItem[], onDelete: (id: string) => void }) {
    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <RiStarFill
                        key={star}
                        className={`size-4 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                ))}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{rating}/5</span>
            </div>
        )
    }

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Type</TableHeaderCell>
                        <TableHeaderCell>Item</TableHeaderCell>
                        <TableHeaderCell>Building</TableHeaderCell>
                        <TableHeaderCell>Rating</TableHeaderCell>
                        <TableHeaderCell>Comment</TableHeaderCell>
                        <TableHeaderCell>Submitted By</TableHeaderCell>
                        <TableHeaderCell>Date</TableHeaderCell>
                        <TableHeaderCell className="text-right">Actions</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {feedback.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center text-gray-500 dark:text-gray-400 py-8">
                                No feedback found
                            </TableCell>
                        </TableRow>
                    ) : (
                        feedback.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        {item.type}
                                    </span>
                                </TableCell>
                                <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                                    {item.itemName}
                                </TableCell>
                                <TableCell className="text-gray-600 dark:text-gray-400">
                                    {item.building}
                                </TableCell>
                                <TableCell>
                                    {renderStars(item.rating)}
                                </TableCell>
                                <TableCell className="text-gray-600 dark:text-gray-400 max-w-md">
                                    {item.comment || "-"}
                                </TableCell>
                                <TableCell className="text-gray-600 dark:text-gray-400">
                                    {item.submittedBy}
                                </TableCell>
                                <TableCell className="text-gray-600 dark:text-gray-400">
                                    {item.submittedDate}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDelete(item.id)}
                                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <RiDeleteBinLine className="size-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

function ByStaffTable({ feedback, onDelete }: { feedback: FeedbackItem[], onDelete: (id: string) => void }) {
    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <RiStarFill
                        key={star}
                        className={`size-4 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                ))}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{rating}/5</span>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {staffMembers.map((staff) => {
                const staffFeedback = feedback.filter(f => f.staffMember === staff.name)
                if (staffFeedback.length === 0) return null

                return (
                    <div key={staff.name} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{staff.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{staff.role}</p>
                        </div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell>Type</TableHeaderCell>
                                    <TableHeaderCell>Item</TableHeaderCell>
                                    <TableHeaderCell>Building</TableHeaderCell>
                                    <TableHeaderCell>Rating</TableHeaderCell>
                                    <TableHeaderCell>Comment</TableHeaderCell>
                                    <TableHeaderCell>Submitted By</TableHeaderCell>
                                    <TableHeaderCell>Date</TableHeaderCell>
                                    <TableHeaderCell className="text-right">Actions</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {staffFeedback.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                {item.type}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                                            {item.itemName}
                                        </TableCell>
                                        <TableCell className="text-gray-600 dark:text-gray-400">
                                            {item.building}
                                        </TableCell>
                                        <TableCell>
                                            {renderStars(item.rating)}
                                        </TableCell>
                                        <TableCell className="text-gray-600 dark:text-gray-400 max-w-md">
                                            {item.comment || "-"}
                                        </TableCell>
                                        <TableCell className="text-gray-600 dark:text-gray-400">
                                            {item.submittedBy}
                                        </TableCell>
                                        <TableCell className="text-gray-600 dark:text-gray-400">
                                            {item.submittedDate}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onDelete(item.id)}
                                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            >
                                                <RiDeleteBinLine className="size-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )
            })}
        </div>
    )
}

export default function Feedback() {
    const [feedback, setFeedback] = useState<FeedbackItem[]>(allFeedbackData)
    const pathname = usePathname()

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this feedback?")) {
            setFeedback(prev => prev.filter(item => item.id !== id))
        }
    }

    // Filter feedback based on current tab
    let filteredFeedback = feedback
    if (pathname.includes("/resources")) {
        filteredFeedback = feedback.filter(f => f.type === "Resource Booking")
    } else if (pathname.includes("/service-requests")) {
        filteredFeedback = feedback.filter(f => f.type === "Service Request")
    } else if (pathname.includes("/events")) {
        filteredFeedback = feedback.filter(f => f.type === "Event")
    } else if (pathname.includes("/by-staff")) {
        filteredFeedback = feedback.filter(f => f.staffMember !== undefined)
    }
    // Base route "/intelligence/portfolio-benchmarks" shows all feedback (no filter)

    return (
        <PageTemplate
            title="Feedback"
            tabs={tabs}
        >
            {pathname.includes("/by-staff") ? (
                <ByStaffTable feedback={filteredFeedback} onDelete={handleDelete} />
            ) : (
                <FeedbackTable feedback={filteredFeedback} onDelete={handleDelete} />
            )}
        </PageTemplate>
    )
}
