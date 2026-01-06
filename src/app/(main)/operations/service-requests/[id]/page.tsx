"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/Dropdown"
import { ApproverCard } from "@/components/ui/ApproverCard"
import { AssignedPersonnelCard } from "@/components/ui/AssignedPersonnelCard"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MessageInputActions } from "@/components/ui/messages/MessageInputActions"
import { RichTextEditor } from "@/components/ui/rich-text-editor/RichTextEditor"
import { Textarea } from "@/components/ui/textarea"
import { UserDetailsModal } from "@/components/ui/user-access/UserDetailsModal"
import { QuickReply } from "@/data/cannedResponses"
import { serviceRequests } from "@/data/data"
import { ChevronDown, ChevronLeft, Download, ExternalLink, FileText, MapPin, Paperclip, Send, Upload } from "lucide-react"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { useState } from "react"

// Mock additional service request data for detail page
const getServiceRequestDetailData = (serviceRequestId: string) => {
    const baseServiceRequest = serviceRequests.find(sr => sr.id === serviceRequestId)
    
    if (!baseServiceRequest) return null
    
    return {
        ...baseServiceRequest,
        requestorDetails: baseServiceRequest.requestorDetails, // Include the full requestor details
        location: {
            building: baseServiceRequest.building,
            floor: baseServiceRequest.floor,
            room: "Conference Room A",
            address: "125 Lincoln, Floor 12"
        },
        hqoRequestId: "9f7f8c9a-8c7f-4a6e-3e65-339b7d8a8d01",
        externalCaseId: null,
        assignedPersonnel: [
            // Auto-assigned team based on "HVAC Issue" category -> Maintenance Team
            {
                id: 'maintenance',
                name: 'Maintenance Team',
                description: 'Handles property-related requests and maintenance coordination',
                category: 'Maintenance',
                members: [
                    { id: '4', name: 'John Smith', role: 'Maintenance Manager', initials: 'JS', isLead: true },
                    { id: '5', name: 'Sarah Johnson', role: 'Technician', initials: 'SJ', isLead: false },
                    { id: '6', name: 'Mike Thompson', role: 'Technician', initials: 'MT', isLead: false }
                ],
                requestTypes: ['HVAC Issue', 'Plumbing Repair', 'Electrical Problem', 'General Repair'],
                isActive: true,
                type: 'team' as const
            }
        ],
        approver: {
            id: "approver-2",
            name: "Sarah Williams",
            email: "sarah.williams@company.com",
            avatar: "/avatars/sarah-williams.jpg",
            initials: "SW",
            role: "Facilities Director", 
            department: "Facilities"
        },
        messages: [
            {
                id: "1",
                type: "message",
                author: "John Smith",
                content: "Perfect! The photos help a lot. I can see the issue clearly now. Here's the diagnostic report.",
                timestamp: "06:30 PM",
                avatar: null,
                initials: "JS"
            },
            {
                id: "2",
                type: "file", 
                filename: "hvac_diagnostic_report.pdf",
                size: "1.2 MB",
                timestamp: "06:30 PM",
                downloadable: true,
                author: "John Smith",
                initials: "JS"
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

export default function ServiceRequestDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [newMessage, setNewMessage] = useState("")
    const [newNote, setNewNote] = useState("")
    const [selectedUser, setSelectedUser] = useState<{
        id: string
        name: string
        email: string
        company: string
        floorSuite: string
        serviceRequest: string
        serviceRequestType: string | null
        serviceRequestStatus: string | null
        acsStatus: string
        hasNotes: boolean
        badgeId?: string
    } | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isCloseModalOpen, setIsCloseModalOpen] = useState(false)
    const [tenantMessage, setTenantMessage] = useState("")
    const [pendingStatus, setPendingStatus] = useState<string | null>(null)
    
    const serviceRequestDetail = getServiceRequestDetailData(params.id)
    
    // Get approval from base service request data
    const baseServiceRequest = serviceRequests.find(sr => sr.id === params.id)
    
    // Messages state - initialize with existing messages from service request detail
    const [messages, setMessages] = useState(serviceRequestDetail?.messages || [])
    
    const [assignedPersonnel, setAssignedPersonnel] = useState(
        serviceRequestDetail?.assignedPersonnel || []
    )
    
    const [approver, setApprover] = useState(serviceRequestDetail?.approver || null)
    const [approval, setApproval] = useState<string | undefined>(baseServiceRequest?.approval)
    const [approvalDate, setApprovalDate] = useState<string | undefined>(baseServiceRequest?.approvalDate)
    
    const [ownerId, setOwnerId] = useState<string | null>(null)
    const [showDescription, setShowDescription] = useState(false)
    
    // Status management
    const [currentStatus, setCurrentStatus] = useState(serviceRequestDetail?.status || 'New')
    
    // Available status options
    const statusOptions = [
        { label: 'New', variant: 'default' as const },
        { label: 'In Progress', variant: 'warning' as const },
        { label: 'Completed', variant: 'success' as const },
        { label: 'Denied', variant: 'error' as const },
        { label: 'Cancelled', variant: 'error' as const },
        { label: 'Assigned to Building', variant: 'default' as const },
        { label: 'Failed', variant: 'error' as const }
    ]
    
    const getCurrentStatusVariant = (status: string) => {
        const option = statusOptions.find(opt => opt.label === status)
        return option?.variant || 'warning'
    }
    
    if (!serviceRequestDetail) {
        notFound()
    }

    const handleRequestorClick = () => {
        if (serviceRequestDetail.requestorDetails) {
            setSelectedUser(serviceRequestDetail.requestorDetails)
            setIsModalOpen(true)
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedUser(null)
    }

    const handleAssignPersonnel = (assignment: any) => {
        setAssignedPersonnel(prev => [...prev, assignment])
    }

    const handleRemovePersonnel = (assignmentId: string) => {
        setAssignedPersonnel(prev => prev.filter(assignment => assignment.id !== assignmentId))
    }

    const handleAssignApprover = (selectedApprover: any) => {
        setApprover(selectedApprover)
    }

    const handleRemoveApprover = () => {
        setApprover(null)
        setApproval(undefined)
        setApprovalDate(undefined)
    }

    const handleApprove = () => {
        setApproval("Approved")
        setApprovalDate(new Date().toISOString())
    }

    const handleDeny = () => {
        setApproval("Denied")
        setApprovalDate(new Date().toISOString())
    }

    const handleStatusChange = (newStatus: string) => {
        // If changing to Completed, show modal to add message to tenant
        if (newStatus === 'Completed') {
            setPendingStatus(newStatus)
            setIsCloseModalOpen(true)
        } else {
            setCurrentStatus(newStatus)
            // Here you would typically make an API call to update the status
            console.log(`Status updated to: ${newStatus}`)
        }
    }

    const handleConfirmClose = () => {
        if (pendingStatus) {
            setCurrentStatus(pendingStatus)
            console.log(`Status updated to: ${pendingStatus}`)
            console.log(`Message to tenant: ${tenantMessage}`)
            // Here you would typically make an API call to update the status and send the message
        }
        setIsCloseModalOpen(false)
        setTenantMessage("")
        setPendingStatus(null)
        // Navigate back to service requests list
        router.push('/operations/service-requests')
    }

    const handleCancelClose = () => {
        setIsCloseModalOpen(false)
        setTenantMessage("")
        setPendingStatus(null)
    }

    const handleSelectQuickReply = (response: QuickReply, isTenantMessage: boolean = false) => {
        if (isTenantMessage) {
            // For tenant message modal, use HTML content directly for rich text editor
            setTenantMessage(response.content)
        } else {
            // For regular message input, use HTML content directly for rich text editor
            setNewMessage(response.content)
        }
    }

    const handleMakeProfessional = (isTenantMessage: boolean = false) => {
        // Simulate AI rewrite - in production this would call an API
        const currentMessage = isTenantMessage ? tenantMessage : newMessage
        if (!currentMessage.trim()) return

        // Extract text content, make professional, then wrap back in HTML if needed
        const textContent = currentMessage.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').trim()
        if (!textContent) return
        
        // Simple professional rewrite simulation
        let professionalText = textContent
            .replace(/\bi\b/gi, 'I')
            .replace(/\bu\b/gi, 'you')
            .replace(/\bur\b/gi, 'your')
            .replace(/\bthx\b/gi, 'thank you')
            .replace(/\bthnx\b/gi, 'thank you')
            .replace(/\bpls\b/gi, 'please')
            .replace(/\bplz\b/gi, 'please')
            .replace(/\bim\b/gi, "I'm")
            .replace(/\bwont\b/gi, "won't")
            .replace(/\bcant\b/gi, "can't")
            .replace(/\bdont\b/gi, "don't")
            + (textContent.endsWith('.') ? '' : '.')
        
        // Wrap in paragraph tag to maintain HTML structure
        const professionalMessage = `<p>${professionalText}</p>`
        
        if (isTenantMessage) {
            setTenantMessage(professionalMessage)
        } else {
            setNewMessage(professionalMessage)
        }
    }

    const handleSetOwner = (userId: string) => {
        setOwnerId(userId)
        console.log(`Owner set to: ${userId}`)
    }

    const handleUnsetOwner = () => {
        setOwnerId(null)
        console.log('Owner unset')
    }

    const handleSendMessage = () => {
        // Strip HTML tags to check if message has content
        const textContent = newMessage.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
        if (!textContent) return

        // Get current time
        const now = new Date()
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const ampm = hours >= 12 ? 'PM' : 'AM'
        const displayHours = hours % 12 || 12
        const displayMinutes = minutes < 10 ? `0${minutes}` : minutes
        const timestamp = `${displayHours}:${displayMinutes} ${ampm}`

        // Create new message object
        // Using current admin user - in production this would come from auth context
        const currentUser = {
            name: "You",
            initials: "AD" // Admin initials
        }

        const newMessageObj = {
            id: Date.now().toString(),
            type: "message" as const,
            author: currentUser.name,
            content: newMessage, // Keep HTML content for rich text
            timestamp: timestamp,
            avatar: null,
            initials: currentUser.initials
        }

        // Add message to the list
        setMessages(prev => [...prev, newMessageObj])
        
        // Clear the input
        setNewMessage("")
        
        // In production, you would also send this to the API here
        console.log('Message sent:', newMessageObj)
    }

    return (
        <div className="space-y-6">
            {/* Header with back navigation and actions */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link 
                        href="/operations/service-requests"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                    <h1 className="text-xl font-medium text-gray-900 dark:text-gray-50">
                        {serviceRequestDetail.request}
                    </h1>
                </div>
                
                <div className="flex items-center gap-3">
                    <Button variant="secondary">
                        Send to External System
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="relative">
                                <Badge 
                                    variant={getCurrentStatusVariant(currentStatus)} 
                                    className="h-9 px-3 py-1.5 cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1.5"
                                >
                                    • {currentStatus}
                                    <ChevronDown className="h-3 w-3" />
                                </Badge>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[150px]">
                            {statusOptions.map((option) => (
                                <DropdownMenuItem
                                    key={option.label}
                                    onClick={() => handleStatusChange(option.label)}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <Badge variant={option.variant} className="text-xs pointer-events-none">
                                        • {option.label}
                                    </Badge>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - 2/3 width */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Request Details */}
                    <Card>
                        <div className="p-3">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-3">Request Details</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="mb-1">
                                        <button
                                            onClick={handleRequestorClick}
                                            className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer underline hover:no-underline"
                                        >
                                            {serviceRequestDetail.requestorDetails?.name || serviceRequestDetail.requestor.split(' - ')[0]}
                                        </button>
                                        <span className="text-gray-500 mx-1">·</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {serviceRequestDetail.requestorDetails?.company || serviceRequestDetail.requestor.split(' - ')[1]}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500">Requested By</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                        {serviceRequestDetail.dateTime}
                                    </h3>
                                    <p className="text-xs text-gray-500">Requested Date</p>
                                </div>

                                <div className="md:col-span-2">
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1 break-all">
                                        {serviceRequestDetail.hqoRequestId}
                                    </h3>
                                    <p className="text-xs text-gray-500">HqO Request ID</p>
                                </div>

                                <div className="md:col-span-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-xs text-gray-500">Description</p>
                                        <button
                                            onClick={() => setShowDescription(!showDescription)}
                                            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            {showDescription ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                    {showDescription && (
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                        {serviceRequestDetail.description || "The air conditioning unit in Conference Room A has stopped working. The room temperature is rising and affecting meeting comfort. Please investigate and repair as soon as possible."}
                                    </h3>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                        {serviceRequestDetail.location.address}
                                    </h3>
                                    <h4 className="text-sm text-gray-600 dark:text-gray-400">
                                        {serviceRequestDetail.location.room}
                                    </h4>
                                    <p className="text-xs text-gray-500">Location</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                        {serviceRequestDetail.externalCaseId || "-"}
                                    </h3>
                                    <p className="text-xs text-gray-500">External Case ID</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Messages */}
                    <Card>
                        <div className="p-3">
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Messages</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Communication between you and the tenant
                                </p>
                            </div>
                            
                            {/* Message thread */}
                            <div className="space-y-4 mb-4">
                                {messages.map((item) => {
                                    if (item.type === 'message') {
                                        return (
                                            <div key={item.id} className="flex items-start gap-3">
                                                <Avatar className="size-8 shrink-0">
                                                    <AvatarFallback className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs">
                                                        {item.initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">{item.author}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.timestamp}</p>
                                                    </div>
                                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                                                        <div 
                                                            className="text-sm text-gray-900 dark:text-gray-100 [&_strong]:font-semibold [&_em]:italic [&_u]:underline [&_ul]:ml-4 [&_ol]:ml-4 [&_li]:mb-1 [&_p]:mb-2 [&_p:last-child]:mb-0"
                                                            dangerouslySetInnerHTML={{ __html: item.content || '' }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else if (item.type === 'file') {
                                        const fileExtension = item.filename?.split('.').pop()?.toUpperCase() || 'FILE'
                                        const getFileTypeColor = (ext: string) => {
                                            const extLower = ext.toLowerCase()
                                            if (['pdf'].includes(extLower)) return 'bg-red-500'
                                            if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(extLower)) return 'bg-blue-500'
                                            if (['doc', 'docx'].includes(extLower)) return 'bg-blue-600'
                                            if (['xls', 'xlsx'].includes(extLower)) return 'bg-green-600'
                                            return 'bg-gray-500'
                                        }
                                        
                                        return (
                                            <div key={item.id} className="flex items-start gap-3">
                                                <Avatar className="size-8 shrink-0">
                                                    <AvatarFallback className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs">
                                                        {(item as any).initials || 'JS'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">{(item as any).author || 'John Smith'}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.timestamp}</p>
                                                    </div>
                                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`${getFileTypeColor(fileExtension)} text-white text-xs font-medium px-2 py-1 rounded shrink-0`}>
                                                                {fileExtension}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{item.filename}</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">{item.size}</p>
                                                            </div>
                                                            <button className="shrink-0 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
                                                                <Download className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return null
                                })}
                            </div>

                            {/* Message input */}
                            <div className="space-y-2">
                                <RichTextEditor
                                    value={newMessage}
                                    onChange={(value) => setNewMessage(value)}
                                    placeholder="Add a message"
                                    className="mt-1"
                                    minHeight="150px"
                                />
                                <div className="flex items-center justify-between">
                                    <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                                        <Paperclip className="h-4 w-4" />
                                        Attach file
                                    </Button>
                                    <div className="flex items-center gap-2">
                                        <MessageInputActions
                                            onSelectResponse={(response) => handleSelectQuickReply(response, false)}
                                            onMakeProfessional={() => handleMakeProfessional(false)}
                                            message={newMessage.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()}
                                        />
                                        <Button 
                                            variant="primary" 
                                            size="sm"
                                            onClick={handleSendMessage}
                                            disabled={!newMessage.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()}
                                        >
                                            Send
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Internal Notes */}
                    <Card>
                        <div className="p-3">
                            <div className="mb-3">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Internal Notes</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Private notes — tenants do not see these
                                </p>
                            </div>
                            
                            {/* Existing notes */}
                            <div className="space-y-3 mb-3">
                                {serviceRequestDetail.internalNotes.map((note) => (
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
                        <div className="p-3">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-3">Activity Log</h2>
                            
                            <div className="space-y-3">
                                {serviceRequestDetail.activityLog.map((activity) => (
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
                    {/* Approver */}
                    <ApproverCard
                        approver={approver}
                        onAssignApprover={handleAssignApprover}
                        onRemoveApprover={handleRemoveApprover}
                        approval={approval}
                        approvalDate={approvalDate}
                        onApprove={handleApprove}
                        onDeny={handleDeny}
                    />

                    {/* Assigned Personnel */}
                    <AssignedPersonnelCard
                        assignedPersonnel={assignedPersonnel}
                        onAssignPersonnel={handleAssignPersonnel}
                        onRemovePersonnel={handleRemovePersonnel}
                        ownerId={ownerId}
                        onSetOwner={handleSetOwner}
                        onUnsetOwner={handleUnsetOwner}
                    />

                    {/* Case Files */}
                    <Card>
                        <div className="p-3">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-3">Case Files</h3>
                            
                            <div className="space-y-4">
                                {serviceRequestDetail.caseFiles.map((file) => (
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
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">Location Details</h3>
                            
                            <div className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{serviceRequestDetail.location.address}</p>
                                    <p className="text-xs text-gray-500">Floor 12, {serviceRequestDetail.location.room}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Close Service Request Modal */}
            <Dialog open={isCloseModalOpen} onOpenChange={setIsCloseModalOpen}>
                <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Close service request</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4 px-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Add a message to the tenant about the completion of this service request.
                        </p>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                Message to tenant <span className="text-gray-500 font-normal">(Optional)</span>
                            </label>
                            <RichTextEditor
                                value={tenantMessage}
                                onChange={(value) => setTenantMessage(value)}
                                placeholder="Enter your message to the tenant..."
                                className="mt-1"
                                minHeight="300px"
                            />
                            <div className="mt-2">
                                <MessageInputActions
                                    onSelectResponse={(response) => handleSelectQuickReply(response, true)}
                                    onMakeProfessional={() => handleMakeProfessional(true)}
                                    message={tenantMessage.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <DialogFooter>
                        <Button variant="ghost" onClick={handleCancelClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleConfirmClose}>
                            Close request
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* User Details Modal */}
            <UserDetailsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                user={selectedUser}
                defaultTab="requests"
            />
        </div>
    )
}
