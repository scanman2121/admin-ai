"use client"

import { Button } from "@/components/Button"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/Table"
import { Tooltip } from "@/components/Tooltip"
import { RiDeleteBinLine, RiMailLine, RiStarFill } from "@remixicon/react"

export interface FeedbackItem {
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

export function FeedbackTable({ feedback, onDelete }: { feedback: FeedbackItem[], onDelete: (id: string) => void }) {
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
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
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 whitespace-nowrap">
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
                                    <div className="flex items-center justify-end gap-2">
                                        <Tooltip content="Email user">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    // In a real app, this would open an email client or modal
                                                    window.location.href = `mailto:${item.submittedBy.toLowerCase().replace(' ', '.')}@example.com`
                                                }}
                                                className="h-8 w-8 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
                                            >
                                                <RiMailLine className="size-4" />
                                            </Button>
                                        </Tooltip>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onDelete(item.id)}
                                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                            <RiDeleteBinLine className="size-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

const staffMembers = [
    { name: "John Smith", role: "Maintenance Technician" },
    { name: "Maria Garcia", role: "Facilities Coordinator" },
    { name: "James Wilson", role: "Building Manager" },
    { name: "Patricia Lee", role: "Cleaning Staff" },
    { name: "Sarah Johnson", role: "Events Coordinator" },
    { name: "Robert Miller", role: "Wellness Coordinator" },
]

export function ByStaffTable({ feedback, onDelete }: { feedback: FeedbackItem[], onDelete: (id: string) => void }) {
    return (
        <div className="space-y-8">
            {staffMembers.map((staff) => {
                const staffFeedback = feedback.filter(f => f.staffMember === staff.name)
                if (staffFeedback.length === 0) return null

                // Calculate average rating
                const totalRatings = staffFeedback.length
                const averageRating = staffFeedback.reduce((sum, item) => sum + item.rating, 0) / totalRatings
                const roundedAverage = Math.round(averageRating * 10) / 10 // Round to 1 decimal place

                return (
                    <div key={staff.name} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
                        <div className="bg-white dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{staff.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{staff.role}</p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 justify-end">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <RiStarFill
                                            key={star}
                                            className={`size-4 ${star <= Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                        />
                                    ))}
                                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-50">{roundedAverage.toFixed(1)}</span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'}</p>
                            </div>
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
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 whitespace-nowrap">
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
                                            <div className="flex items-center justify-end gap-2">
                                                <Tooltip content="Email user">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            // In a real app, this would open an email client or modal
                                                            window.location.href = `mailto:${item.submittedBy.toLowerCase().replace(' ', '.')}@example.com`
                                                        }}
                                                        className="h-8 w-8 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
                                                    >
                                                        <RiMailLine className="size-4" />
                                                    </Button>
                                                </Tooltip>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => onDelete(item.id)}
                                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                >
                                                    <RiDeleteBinLine className="size-4" />
                                                </Button>
                                            </div>
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
