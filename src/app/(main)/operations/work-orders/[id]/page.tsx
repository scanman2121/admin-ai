"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { workOrders } from "@/data/data"
import { ChevronLeft, Paperclip, Send, Plus, FileText, Download, MapPin, User, ExternalLink, Clock, Upload } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useState } from "react"

// Mock additional work order data for detail page
const getWorkOrderDetailData = (workOrderId: string) => {
    const baseWorkOrder = workOrders.find(wo => wo.id === workOrderId)
    
    if (!baseWorkOrder) return null
    
    return {
        ...baseWorkOrder,
        location: {
            building: baseWorkOrder.building,
            floor: baseWorkOrder.floor,
            room: "Conference Room A",
            address: "125 Lincoln, Floor 12"
        },
        hqoRequestId: "9f7f8c9a-8c7f-4a6e-3e65-339b7d8a8d01",
        externalCaseId: null,
        assignedPersonnel: [
            {
                id: "1",
                name: "John Smith",
                role: "Technician",
                avatar: null,
                initials: "JS"
            },
            {
                id: "2", 
                name: "Alex Johnson",
                role: "Supervisor",
                avatar: null,
                initials: "AJ"
            }
        ],
        messages: [
            {
                id: "1",
                type: "file",
                filename: "temperature_reading.pdf",
                size: "2.4 MB",
                timestamp: "06:30 PM",
                downloadable: true
            },
            {
                id: "2",
                type: "message",
                author: "John Smith",
                content: "Perfect! The photos help a lot. I can see the issue clearly now. Here's the diagnostic report.",
                timestamp: "06:30 PM",
                avatar: null,
                initials: "JS"
            },
            {
                id: "3",
                type: "file", 
                filename: "hvac_diagnostic_report.pdf",
                size: "1.2 MB",
                timestamp: "06:30 PM",
                downloadable: true
            }
        ],
        internalNotes: [
            {
                id: "1",
                content: "Diagnosed issue with compressor. Ordering replacement part.",
                timestamp: "3/10/2024 2:23:00 PM",
                author: "System"
            }
        ],
        activityLog: [
            {
                id: "1",
                type: "External case created",
                description: "Case sent to external system - Case ID: EXT-2024-001234",
                timestamp: "3/10/2024 at 08:45 PM",
                icon: ExternalLink
            },
            {
                id: "2",
                type: "File uploaded",
                description: "Uploaded ac_unit_photo.jpg and temperature_reading.pdf", 
                timestamp: "3/10/2024 at 08:15 PM",
                icon: Upload
            },
            {
                id: "3",
                type: "Message sent",
                description: "Sent message about client meeting urgency",
                timestamp: "3/10/2024 at 07:30 PM",
                icon: Send
            }
        ],
        caseFiles: [
            {
                id: "1",
                filename: "diagnostic_report.pdf",
                size: "2.4 MB",
                description: "Additional ac view section",
                note: "This section displays files from the original case submission. Additional files can be shared through the Messages section below."
            }
        ]
    }
}

export default function WorkOrderDetailPage({ params }: { params: { id: string } }) {
    const [newMessage, setNewMessage] = useState("")
    const [newNote, setNewNote] = useState("")
    
    const workOrderDetail = getWorkOrderDetailData(params.id)
    
    if (!workOrderDetail) {
        notFound()
    }

    return (
        <div className="space-y-6">
            {/* Header with back navigation and actions */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link 
                        href="/operations/work-orders"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                    <h1 className="text-xl font-medium text-gray-900 dark:text-gray-50">
                        {workOrderDetail.request}
                    </h1>
                </div>
                
                <div className="flex items-center gap-3">
                    <Button variant="primary">
                        Send to External System
                    </Button>
                    <Badge variant="warning">
                        • {workOrderDetail.status}
                    </Badge>
                </div>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - 2/3 width */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Request Details */}
                    <Card>
                        <div className="p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-6">Request Details</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                        {workOrderDetail.requestor}
                                    </h3>
                                    <p className="text-xs text-gray-500">Requested By</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                        {workOrderDetail.dateTime}
                                    </h3>
                                    <p className="text-xs text-gray-500">Requested Date</p>
                                </div>

                                <div className="md:col-span-2">
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1 break-all">
                                        {workOrderDetail.hqoRequestId}
                                    </h3>
                                    <p className="text-xs text-gray-500">HqO Request ID</p>
                                </div>

                                <div className="md:col-span-2">
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                        {workOrderDetail.description || "The air conditioning unit in Conference Room A has stopped working. The room temperature is rising and affecting meeting comfort. Please investigate and repair as soon as possible."}
                                    </h3>
                                    <p className="text-xs text-gray-500">Description</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                        {workOrderDetail.location.address}
                                    </h3>
                                    <h4 className="text-sm text-gray-600 dark:text-gray-400">
                                        {workOrderDetail.location.room}
                                    </h4>
                                    <p className="text-xs text-gray-500">Location</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                        {workOrderDetail.externalCaseId || "-"}
                                    </h3>
                                    <p className="text-xs text-gray-500">External Case ID</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Messages */}
                    <Card>
                        <div className="p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-6">Messages</h2>
                            
                            {/* Message thread */}
                            <div className="space-y-4 mb-6">
                                {/* Image attachment */}
                                <div className="flex items-start gap-3">
                                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <FileText className="h-8 w-8 text-gray-400" />
                                    </div>
                                </div>

                                {/* File attachments */}
                                {workOrderDetail.messages.filter(m => m.type === 'file').map((file) => (
                                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Paperclip className="h-4 w-4 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{file.filename}</p>
                                                <p className="text-xs text-gray-500">{file.size}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            Download
                                        </Button>
                                    </div>
                                ))}

                                {/* Message from user */}
                                {workOrderDetail.messages.filter(m => m.type === 'message').map((message) => (
                                    <div key={message.id} className="flex items-start gap-3">
                                        <Avatar className="size-8">
                                            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                                {message.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="text-sm font-medium text-gray-900">{message.author}</p>
                                                <p className="text-xs text-gray-500">{message.timestamp}</p>
                                            </div>
                                            <p className="text-sm text-gray-700">{message.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Message input */}
                            <div className="space-y-3">
                                <Textarea
                                    placeholder="Type your message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="min-h-[80px]"
                                />
                                <div className="flex items-center justify-between">
                                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                        <Paperclip className="h-4 w-4" />
                                        Attach File
                                    </Button>
                                    <Button variant="primary" size="sm">
                                        Send Message
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Internal Notes */}
                    <Card>
                        <div className="p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-6">Internal Notes</h2>
                            
                            {/* Existing notes */}
                            <div className="space-y-4 mb-6">
                                {workOrderDetail.internalNotes.map((note) => (
                                    <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-900 mb-1">{note.content}</p>
                                        <p className="text-xs text-gray-500">{note.timestamp}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Add note input */}
                            <div className="space-y-3">
                                <Textarea
                                    placeholder="Add internal note..."
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    className="min-h-[80px]"
                                />
                                <div className="flex justify-end">
                                    <Button variant="primary" size="sm">
                                        Add Note
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Activity Log */}
                    <Card>
                        <div className="p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-6">Activity Log</h2>
                            
                            <div className="space-y-4">
                                {workOrderDetail.activityLog.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-3">
                                        <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1">
                                            <activity.icon className="size-4 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-sm text-blue-600">{activity.type}</span>
                                                <span className="text-xs text-gray-500">{activity.timestamp}</span>
                                            </div>
                                            <p className="text-sm text-gray-900">{activity.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column - 1/3 width */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Assigned Personnel */}
                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">Assigned Personnel</h3>
                            
                            <div className="space-y-4 mb-4">
                                {workOrderDetail.assignedPersonnel.map((person) => (
                                    <div key={person.id} className="flex items-center gap-3">
                                        <Avatar className="size-10">
                                            <AvatarFallback className="bg-blue-100 text-blue-600">
                                                {person.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{person.name}</p>
                                            <p className="text-xs text-gray-500">{person.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <Button variant="ghost" size="sm" className="flex items-center gap-2 w-full">
                                <Plus className="h-4 w-4" />
                                Assign More
                            </Button>
                        </div>
                    </Card>

                    {/* Case Files */}
                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">Case Files</h3>
                            
                            <div className="space-y-4">
                                {workOrderDetail.caseFiles.map((file) => (
                                    <div key={file.id} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-blue-600" />
                                                <div>
                                                    <p className="text-sm font-medium text-blue-600">{file.filename}</p>
                                                    <p className="text-xs text-gray-500">{file.size} • {file.description}</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <p className="text-xs text-gray-500">{file.note}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Location Details */}
                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">Location Details</h3>
                            
                            <div className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{workOrderDetail.location.address}</p>
                                    <p className="text-xs text-gray-500">Floor 12, {workOrderDetail.location.room}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
