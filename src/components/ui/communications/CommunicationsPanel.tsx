"use client"

import { cn } from "@/lib/utils"
import {
    RiAddLine,
    RiAttachmentLine,
    RiCalendarEventLine,
    RiCloseLine,
    RiEmotionLine,
    RiFullscreenLine,
    RiGroup2Line,
    RiMessage2Line,
    RiSearchLine,
    RiSendPlaneFill,
    RiToolsLine,
    RiUserAddLine
} from "@remixicon/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { FullScreenTenantContacts } from "./FullScreenTenantContacts"

interface CommunicationsPanelProps {
    onMinimize: () => void
    onClose: () => void
    onExpand?: () => void
    isExpanded?: boolean
}

interface TenantContact {
    id: string
    name: string
    role: string
    avatar?: string
    initials: string
    email: string
    companyName: string
    building: string
}

interface Conversation {
    id: string
    type: "group" | "individual"
    name: string
    companyName: string
    building: string
    participants: TenantContact[]
    unread: number
    lastMessage?: {
        text: string
        time: string
        senderId: string
    }
}

interface Message {
    id: string
    text: string
    time: string
    sender: string
    senderId: string
    read: boolean
}

interface ServiceRequestCard {
    id: string
    srNumber: string
    type: string
    description: string
    location: string
    timestamp: string
}

export function CommunicationsPanel({
    onMinimize,
    onClose,
    onExpand,
    isExpanded = false
}: CommunicationsPanelProps) {
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [messageInput, setMessageInput] = useState("")
    const [showActionMenu, setShowActionMenu] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [showMobileView, setShowMobileView] = useState(false)
    const [showServiceRequestCard, setShowServiceRequestCard] = useState(false)
    const [serviceRequestType, setServiceRequestType] = useState("")
    const [serviceRequestDescription, setServiceRequestDescription] = useState("")
    const [serviceRequestLocation, setServiceRequestLocation] = useState("")
    const [showNewMessageModal, setShowNewMessageModal] = useState(false)
    const [newMessageSearch, setNewMessageSearch] = useState("")
    const [selectedContacts, setSelectedContacts] = useState<string[]>([])
    const [showParticipants, setShowParticipants] = useState(false)
    const [submittedServiceRequests, setSubmittedServiceRequests] = useState<Record<string, ServiceRequestCard[]>>({})
    const [conversationNames, setConversationNames] = useState<Record<string, string>>({})
    const actionMenuRef = useRef<HTMLDivElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Check for mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => {
            window.removeEventListener('resize', checkMobile)
        }
    }, [])

    // Close the action menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
                setShowActionMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Show mobile view when a conversation is selected on mobile
    useEffect(() => {
        if (isMobile && selectedConversation) {
            setShowMobileView(true)
        }
    }, [isMobile, selectedConversation])

    // Handle closing mobile view
    const handleCloseMobileView = () => {
        setShowMobileView(false)
        // Optionally reset selected conversation if you want to go back to the conversation list
        // setSelectedConversation(null)
    }

    // Sample conversation data - mix of group and individual conversations
    const conversations: Conversation[] = [
        // Group conversation with Acme Inc
        {
            id: "1",
            type: "group",
            name: "Acme Inc - Team",
            companyName: "Acme Inc",
            building: "Empire State Building",
            unread: 3,
            participants: [
                {
                    id: "1-1",
                    name: "John Smith",
                    role: "Office Manager",
                    initials: "JS",
                    email: "john.smith@acme.com",
                    companyName: "Acme Inc",
                    building: "Empire State Building"
                },
                {
                    id: "1-2",
                    name: "Sarah Johnson",
                    role: "Facilities Director",
                    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    initials: "SJ",
                    email: "sarah.johnson@acme.com",
                    companyName: "Acme Inc",
                    building: "Empire State Building"
                },
                {
                    id: "1-3",
                    name: "Robert Chen",
                    role: "CEO",
                    initials: "RC",
                    email: "robert.chen@acme.com",
                    companyName: "Acme Inc",
                    building: "Empire State Building"
                }
            ],
            lastMessage: {
                text: "When will the elevator maintenance be completed?",
                time: "10:30 AM",
                senderId: "1-1"
            }
        },
        // Individual conversation with Emily Davis from Global Tech
        {
            id: "2",
            type: "individual",
            name: "Emily Davis",
            companyName: "Global Tech",
            building: "Rockefeller Center",
            unread: 0,
            participants: [
                {
                    id: "2-1",
                    name: "Emily Davis",
                    role: "Office Administrator",
                    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    initials: "ED",
                    email: "emily.davis@globaltech.com",
                    companyName: "Global Tech",
                    building: "Rockefeller Center"
                }
            ],
            lastMessage: {
                text: "Thanks for addressing our concerns about the HVAC system.",
                time: "Yesterday",
                senderId: "2-1"
            }
        },
        // Group conversation with Innovate Solutions
        {
            id: "3",
            type: "group",
            name: "Innovate Solutions - Management",
            companyName: "Innovate Solutions",
            building: "One World Trade Center",
            unread: 1,
            participants: [
                {
                    id: "3-1",
                    name: "Jessica Martinez",
                    role: "Office Manager",
                    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2522&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    initials: "JM",
                    email: "jessica.martinez@innovate.com",
                    companyName: "Innovate Solutions",
                    building: "One World Trade Center"
                },
                {
                    id: "3-2",
                    name: "David Wilson",
                    role: "Facilities Coordinator",
                    initials: "DW",
                    email: "david.wilson@innovate.com",
                    companyName: "Innovate Solutions",
                    building: "One World Trade Center"
                }
            ],
            lastMessage: {
                text: "We've scheduled the tenant event for next Friday at 3 PM.",
                time: "Yesterday",
                senderId: "you"
            }
        },
        // Individual conversation with Alex Thompson
        {
            id: "4",
            type: "individual",
            name: "Alex Thompson",
            companyName: "Creative Studios",
            building: "Chrysler Building",
            unread: 0,
            participants: [
                {
                    id: "4-1",
                    name: "Alex Thompson",
                    role: "Studio Manager",
                    initials: "AT",
                    email: "alex.thompson@creative.com",
                    companyName: "Creative Studios",
                    building: "Chrysler Building"
                }
            ],
            lastMessage: {
                text: "Our team would like to discuss the upcoming renovations.",
                time: "Jun 10",
                senderId: "4-1"
            }
        },
        // Individual conversation with Michael Wong from Global Tech
        {
            id: "5",
            type: "individual",
            name: "Michael Wong",
            companyName: "Global Tech",
            building: "Rockefeller Center",
            unread: 2,
            participants: [
                {
                    id: "2-2",
                    name: "Michael Wong",
                    role: "IT Director",
                    initials: "MW",
                    email: "michael.wong@globaltech.com",
                    companyName: "Global Tech",
                    building: "Rockefeller Center"
                }
            ],
            lastMessage: {
                text: "The access card system needs immediate attention.",
                time: "9:15 AM",
                senderId: "2-2"
            }
        }
    ]

    // Sample messages for the selected conversation
    const messages: Record<string, Message[]> = {
        "1": [
            {
                id: "1-1",
                text: "Hello, we've noticed that the elevator in the north wing has been out of service for two days now.",
                time: "Yesterday, 4:30 PM",
                sender: "John Smith",
                senderId: "1-1",
                read: true
            },
            {
                id: "1-2",
                text: "Hi John, thank you for bringing this to our attention. Our maintenance team is aware of the issue and working on it.",
                time: "Yesterday, 5:15 PM",
                sender: "You",
                senderId: "you",
                read: true
            },
            {
                id: "1-3",
                text: "I also wanted to follow up on the heating in our conference room.",
                time: "Today, 9:30 AM",
                sender: "Sarah Johnson",
                senderId: "1-2",
                read: true
            },
            {
                id: "1-4",
                text: "Do you have an estimated time for when it will be fixed? It's causing significant inconvenience for our staff.",
                time: "Today, 9:45 AM",
                sender: "John Smith",
                senderId: "1-1",
                read: true
            },
            {
                id: "1-5",
                text: "When will the elevator maintenance be completed?",
                time: "Today, 10:30 AM",
                sender: "John Smith",
                senderId: "1-1",
                read: false
            }
        ],
        "2": [
            {
                id: "2-1",
                text: "We've been experiencing temperature fluctuations in our office space on the 15th floor.",
                time: "Monday, 11:20 AM",
                sender: "Emily Davis",
                senderId: "2-1",
                read: true
            },
            {
                id: "2-2",
                text: "I'll have our facilities team look into this right away. Can you provide more details about when you notice the fluctuations?",
                time: "Monday, 1:05 PM",
                sender: "You",
                senderId: "you",
                read: true
            },
            {
                id: "2-3",
                text: "It seems to happen mostly in the afternoon, between 2-4 PM. The temperature rises significantly making it uncomfortable to work.",
                time: "Monday, 2:30 PM",
                sender: "Emily Davis",
                senderId: "2-1",
                read: true
            },
            {
                id: "2-4",
                text: "Our technicians have identified the issue with the HVAC system and made the necessary adjustments. Please let us know if you continue to experience problems.",
                time: "Tuesday, 9:15 AM",
                sender: "You",
                senderId: "you",
                read: true
            },
            {
                id: "2-5",
                text: "Thanks for addressing our concerns about the HVAC system.",
                time: "Yesterday, 3:45 PM",
                sender: "Emily Davis",
                senderId: "2-1",
                read: true
            }
        ],
        "3": [
            {
                id: "3-1",
                text: "We're interested in hosting a company event in the building's common area next week. Is that possible?",
                time: "Tuesday, 10:00 AM",
                sender: "Jessica Martinez",
                senderId: "3-1",
                read: true
            },
            {
                id: "3-2",
                text: "Absolutely! We'd be happy to accommodate your event. Could you provide details on the date, time, and expected number of attendees?",
                time: "Tuesday, 11:30 AM",
                sender: "You",
                senderId: "you",
                read: true
            },
            {
                id: "3-3",
                text: "We're looking at next Friday, around 3-5 PM. We'll have approximately 50 attendees.",
                time: "Tuesday, 2:15 PM",
                sender: "Jessica Martinez",
                senderId: "3-1",
                read: true
            },
            {
                id: "3-4",
                text: "I can help with the setup and catering arrangements if needed.",
                time: "Tuesday, 3:00 PM",
                sender: "David Wilson",
                senderId: "3-2",
                read: true
            },
            {
                id: "3-5",
                text: "We've scheduled the tenant event for next Friday at 3 PM.",
                time: "Yesterday, 4:00 PM",
                sender: "You",
                senderId: "you",
                read: false
            }
        ],
        "4": [
            {
                id: "4-1",
                text: "Our team would like to discuss the upcoming renovations.",
                time: "Jun 10",
                sender: "Alex Thompson",
                senderId: "4-1",
                read: true
            }
        ],
        "5": [
            {
                id: "5-1",
                text: "The access card system has been malfunctioning since this morning.",
                time: "Today, 8:45 AM",
                sender: "Michael Wong",
                senderId: "2-2",
                read: true
            },
            {
                id: "5-2",
                text: "Several of our employees are unable to access the parking garage.",
                time: "Today, 9:00 AM",
                sender: "Michael Wong",
                senderId: "2-2",
                read: false
            },
            {
                id: "5-3",
                text: "The access card system needs immediate attention.",
                time: "Today, 9:15 AM",
                sender: "Michael Wong",
                senderId: "2-2",
                read: false
            }
        ]
    }

    const filteredConversations = conversations.filter(conversation =>
        conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conversation.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conversation.building.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!messageInput.trim() || !selectedConversation) return

        // In a real app, you would send the message to an API
        console.log(`Sending message to conversation ${selectedConversation}: ${messageInput}`)
        setMessageInput("")
    }

    // Get the current conversation
    const currentConversation = conversations.find(c => c.id === selectedConversation)
    
    // Get the display name (either custom SR name or original name)
    const getConversationDisplayName = (convId: string | null) => {
        if (!convId) return null
        return conversationNames[convId] || conversations.find(c => c.id === convId)?.name
    }

    // Get messages for selected conversation
    const conversationMessages = selectedConversation && messages[selectedConversation]
        ? messages[selectedConversation]
        : []
    
    // Get submitted service requests for this conversation
    const conversationServiceRequests = selectedConversation && submittedServiceRequests[selectedConversation]
        ? submittedServiceRequests[selectedConversation]
        : []

    const handleCreateVisitor = () => {
        setShowActionMenu(false)
        // In a real app, you would open a visitor creation form
        console.log(`Creating visitor for conversation ${selectedConversation}`)
    }

    const handleCreateServiceRequest = () => {
        setShowActionMenu(false)
        setShowServiceRequestCard(true)
        // Scroll to bottom to show the service request card
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    }

    const handleSubmitServiceRequest = () => {
        if (!selectedConversation) return
        
        // Generate a service request number
        const srNumber = `SR-${Math.floor(10000 + Math.random() * 90000)}`
        const now = new Date()
        const timestamp = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        
        // Create service request card data
        const srCard: ServiceRequestCard = {
            id: `sr-${Date.now()}`,
            srNumber,
            type: serviceRequestType,
            description: serviceRequestDescription,
            location: serviceRequestLocation,
            timestamp
        }
        
        // Add the service request card to the conversation
        setSubmittedServiceRequests(prev => ({
            ...prev,
            [selectedConversation]: [...(prev[selectedConversation] || []), srCard]
        }))
        
        // Update the conversation name to the SR number
        setConversationNames(prev => ({
            ...prev,
            [selectedConversation]: srNumber
        }))
        
        // In a real app, you would submit the service request to an API
        console.log('Service request submitted:', {
            conversation: selectedConversation,
            serviceRequestNumber: srNumber,
            type: serviceRequestType,
            description: serviceRequestDescription,
            location: serviceRequestLocation
        })
        
        // Reset the form
        setShowServiceRequestCard(false)
        setServiceRequestType("")
        setServiceRequestDescription("")
        setServiceRequestLocation("")
        
        // Scroll to show the new card
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    }

    const handleCancelServiceRequest = () => {
        setShowServiceRequestCard(false)
        setServiceRequestType("")
        setServiceRequestDescription("")
        setServiceRequestLocation("")
    }

    const handleBookResource = () => {
        setShowActionMenu(false)
        // In a real app, you would open a resource booking form
        console.log(`Booking resource for conversation ${selectedConversation}`)
    }

    const handleStartNewMessage = () => {
        setShowNewMessageModal(true)
    }

    const handleCloseNewMessage = () => {
        setShowNewMessageModal(false)
        setNewMessageSearch("")
        setSelectedContacts([])
    }

    const toggleContactSelection = (contactId: string) => {
        setSelectedContacts(prev => 
            prev.includes(contactId) 
                ? prev.filter(id => id !== contactId)
                : [...prev, contactId]
        )
    }

    const handleStartConversation = () => {
        if (selectedContacts.length === 0) return

        // In a real app, you would create a new conversation with the selected contacts
        console.log('Starting new conversation with:', selectedContacts)
        
        // For demo purposes, just close the modal
        handleCloseNewMessage()
    }

    // Get all available contacts from all conversations
    const allAvailableContacts = Array.from(
        new Map(
            conversations.flatMap(conv => 
                conv.participants.map(p => [p.id, p])
            )
        ).values()
    )

    const filteredAvailableContacts = allAvailableContacts.filter(contact =>
        contact.name.toLowerCase().includes(newMessageSearch.toLowerCase()) ||
        contact.companyName.toLowerCase().includes(newMessageSearch.toLowerCase()) ||
        contact.role.toLowerCase().includes(newMessageSearch.toLowerCase())
    )

    // Render mobile view if on mobile device and showMobileView is true
    if (isMobile && showMobileView) {
        // Get the messages for the selected conversation
        const conversationMessagesForMobile = selectedConversation ? messages[selectedConversation] || [] : [];

        return (
            <FullScreenTenantContacts
                onClose={handleCloseMobileView}
                conversations={conversations}
                messages={conversationMessagesForMobile}
                selectedConversation={selectedConversation}
                setSelectedConversation={setSelectedConversation}
            />
        )
    }

    // Otherwise render the desktop view
    return (
        <div className={cn(
            "bg-white dark:bg-gray-950 rounded-t-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col",
            isExpanded ? "w-full h-full" : "mb-2 w-[800px] h-[500px]"
        )}>
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <RiMessage2Line className="size-4 text-primary" />
                    <span className="font-medium text-sm text-gray-900 dark:text-gray-50">Tenant contacts</span>
                </div>
                <div className="flex items-center gap-1">
                    {isMobile && (
                        <button
                            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                            onClick={() => setShowMobileView(true)}
                            aria-label="Open full screen"
                        >
                            <RiFullscreenLine className="size-4" />
                        </button>
                    )}
                    {!isExpanded && onExpand && !isMobile && (
                        <button
                            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                            onClick={onExpand}
                            aria-label="Expand"
                        >
                            <RiFullscreenLine className="size-4" />
                        </button>
                    )}
                    {isExpanded ? (
                        <button
                            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                            onClick={onMinimize}
                            aria-label="Minimize"
                        >
                            <RiFullscreenLine className="size-4 rotate-180" />
                        </button>
                    ) : (
                        <button
                            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                            onClick={onMinimize}
                            aria-label="Minimize"
                        >
                            <RiCloseLine className="size-4" />
                        </button>
                    )}
                    <button
                        className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <RiCloseLine className="size-4" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Conversation List */}
                <div className="w-1/3 border-r border-gray-200 dark:border-gray-800 flex flex-col">
                    {/* Search and New Message Button */}
                    <div className="p-3 border-b border-gray-200 dark:border-gray-800 space-y-2">
                        <button
                            onClick={handleStartNewMessage}
                            className={cn(
                                "w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium",
                                "bg-primary text-white hover:bg-primary-dark",
                                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            )}
                        >
                            <RiAddLine className="size-4" />
                            New message
                        </button>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={cn(
                                    "w-full rounded-md border border-gray-300 dark:border-gray-700 pl-9 pr-3 py-2 text-sm",
                                    "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50",
                                    "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                )}
                            />
                            <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Conversation List */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredConversations.length > 0 ? (
                            filteredConversations.map(conversation => (
                                <div
                                    key={conversation.id}
                                    className={cn(
                                        "p-3 cursor-pointer border-b border-gray-100 dark:border-gray-800",
                                        "hover:bg-gray-50 dark:hover:bg-gray-900",
                                        selectedConversation === conversation.id && "bg-gray-100 dark:bg-gray-800"
                                    )}
                                    onClick={() => setSelectedConversation(conversation.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex-shrink-0">
                                            {conversation.type === "individual" && conversation.participants[0] ? (
                                                conversation.participants[0].avatar ? (
                                                <div className="relative size-10 overflow-hidden rounded-full">
                                                    <Image
                                                            src={conversation.participants[0].avatar}
                                                            alt={conversation.participants[0].name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                                                        <span className="text-sm font-medium">{conversation.participants[0].initials}</span>
                                                    </div>
                                                )
                                            ) : (
                                                <div className="flex size-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                                    <RiGroup2Line className="size-5" />
                                                </div>
                                            )}
                                            {conversation.unread > 0 && (
                                                <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                                                    {conversation.unread}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-1.5 min-w-0">
                                                <h3 className="font-medium text-sm text-gray-900 dark:text-gray-50 truncate">
                                                        {conversation.name}
                                                </h3>
                                                    {conversation.type === "group" && (
                                                        <RiGroup2Line className="size-3.5 text-gray-400 flex-shrink-0" />
                                                    )}
                                                </div>
                                                {conversation.lastMessage && (
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {conversation.lastMessage.time}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                    {conversation.companyName} • {conversation.building}
                                                </p>
                                            </div>
                                            {conversation.lastMessage && (
                                                <p className={cn(
                                                    "text-xs mt-1 truncate",
                                                    conversation.unread > 0 ? "font-medium text-gray-900 dark:text-gray-50" : "text-gray-500 dark:text-gray-400"
                                                )}>
                                                    {conversation.lastMessage.senderId === "you" ? "You: " : ""}
                                                    {conversation.lastMessage.text}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                No conversations found
                            </div>
                        )}
                    </div>
                </div>

                {/* Conversation */}
                <div className="w-2/3 flex flex-col">
                    {selectedConversation ? (
                        <>
                            {/* Conversation Header with Participants */}
                            <div className="p-3 border-b border-gray-200 dark:border-gray-800">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {currentConversation && (
                                            <>
                                                {currentConversation.type === "individual" && currentConversation.participants[0] ? (
                                                    currentConversation.participants[0].avatar ? (
                                                        <div className="relative size-8 overflow-hidden rounded-full">
                                                            <Image
                                                                src={currentConversation.participants[0].avatar}
                                                                alt={currentConversation.participants[0].name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                                                            <span className="text-xs font-medium">{currentConversation.participants[0].initials}</span>
                                                        </div>
                                                    )
                                                ) : (
                                                    <div className="flex size-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                                        <RiGroup2Line className="size-5" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="flex items-center gap-1.5">
                                                        <h3 className="font-medium text-sm text-gray-900 dark:text-gray-50">
                                                            {getConversationDisplayName(selectedConversation) || currentConversation.name}
                                                        </h3>
                                                        {currentConversation.type === "group" && !conversationNames[selectedConversation] && (
                                                            <RiGroup2Line className="size-3.5 text-gray-400" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {currentConversation.companyName} • {currentConversation.building}
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Participant Count for Groups - Clickable */}
                                    {currentConversation && currentConversation.type === "group" && (
                                        <button
                                            onClick={() => setShowParticipants(!showParticipants)}
                                            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                                        >
                                            {currentConversation.participants.length} participants
                                        </button>
                                    )}
                                </div>

                                {/* Collapsible Participants - Only for Groups */}
                                {currentConversation && currentConversation.type === "group" && showParticipants && (
                                    <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
                                        {currentConversation.participants.map(participant => (
                                            <div
                                                key={participant.id}
                                                className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-md px-2 py-1 flex-shrink-0"
                                                title={`${participant.name} - ${participant.role}`}
                                            >
                                                {participant.avatar ? (
                                                    <div className="relative size-6 overflow-hidden rounded-full">
                                                        <Image
                                                            src={participant.avatar}
                                                            alt={participant.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex size-6 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                                        <span className="text-[10px] font-medium">{participant.initials}</span>
                                                    </div>
                                                )}
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-medium text-gray-900 dark:text-gray-50">
                                                        {participant.name}
                                                    </span>
                                                    <span className="text-[10px] text-gray-500 dark:text-gray-400">
                                                        {participant.role}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {conversationMessages.length > 0 ? (
                                    conversationMessages.map(message => {
                                        const isFromYou = message.senderId === "you"
                                        return (
                                        <div
                                            key={message.id}
                                            className={cn(
                                                "flex",
                                                    isFromYou ? "justify-end" : "justify-start"
                                            )}
                                        >
                                            <div className={cn(
                                                "max-w-[70%] rounded-lg p-3 text-sm",
                                                    isFromYou
                                                        ? "bg-primary text-white"
                                                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50"
                                            )}>
                                                <div className="flex justify-between items-center gap-4 mb-1">
                                                    <span className="font-medium text-xs">
                                                        {message.sender}
                                                    </span>
                                                    <span className="text-xs opacity-70">
                                                        {message.time}
                                                    </span>
                                                </div>
                                                <p>{message.text}</p>
                                            </div>
                                        </div>
                                        )
                                    })
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 p-4">
                                        <p>No messages yet. Start the conversation!</p>
                                    </div>
                                )}

                                {/* Service Request Card */}
                                {showServiceRequestCard && currentConversation && (
                                    <div className="flex justify-end">
                                        <div className="max-w-[85%] bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                            <div className="mb-3">
                                                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-1">
                                                    Create service request
                                                </h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    For: {currentConversation.companyName} • {currentConversation.building}
                                                </p>
                                            </div>

                                            <div className="space-y-3">
                                                {/* Type Dropdown */}
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Type
                                                    </label>
                                                    <select
                                                        value={serviceRequestType}
                                                        onChange={(e) => setServiceRequestType(e.target.value)}
                                                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                    >
                                                        <option value="">Select type</option>
                                                        <option value="maintenance">Maintenance</option>
                                                        <option value="hvac">HVAC</option>
                                                        <option value="plumbing">Plumbing</option>
                                                        <option value="electrical">Electrical</option>
                                                        <option value="cleaning">Cleaning</option>
                                                        <option value="security">Security</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>

                                                {/* Description Field */}
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Description
                                                    </label>
                                                    <textarea
                                                        value={serviceRequestDescription}
                                                        onChange={(e) => setServiceRequestDescription(e.target.value)}
                                                        placeholder="Describe the issue..."
                                                        rows={3}
                                                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                                    />
                                                </div>

                                                {/* Location Dropdown */}
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Location
                                                    </label>
                                                    <select
                                                        value={serviceRequestLocation}
                                                        onChange={(e) => setServiceRequestLocation(e.target.value)}
                                                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                    >
                                                        <option value="">Select location</option>
                                                        <option value="lobby">Lobby</option>
                                                        <option value="office">Office space</option>
                                                        <option value="parking">Parking garage</option>
                                                        <option value="restroom">Restroom</option>
                                                        <option value="conference">Conference room</option>
                                                        <option value="elevator">Elevator</option>
                                                        <option value="stairwell">Stairwell</option>
                                                        <option value="rooftop">Rooftop</option>
                                                        <option value="common-area">Common area</option>
                                                    </select>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-2 pt-2">
                                                    <button
                                                        type="button"
                                                        onClick={handleSubmitServiceRequest}
                                                        disabled={!serviceRequestType || !serviceRequestDescription || !serviceRequestLocation}
                                                        className={cn(
                                                            "flex-1 px-3 py-2 text-sm font-medium rounded-md",
                                                            "bg-primary text-white hover:bg-primary-dark",
                                                            "disabled:opacity-50 disabled:cursor-not-allowed",
                                                            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                                        )}
                                                    >
                                                        Submit request
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={handleCancelServiceRequest}
                                                        className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Submitted Service Request Cards */}
                                {conversationServiceRequests.map(srCard => (
                                    <div key={srCard.id} className="flex justify-end">
                                        <div className="max-w-[85%] bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className="flex size-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex-shrink-0">
                                                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2 mb-1">
                                                        <h4 className="font-semibold text-sm text-green-900 dark:text-green-100">
                                                            Service Request Created
                                                        </h4>
                                                        <span className="text-xs text-green-600 dark:text-green-400">
                                                            {srCard.timestamp}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs font-medium text-green-800 dark:text-green-200 mb-2">
                                                        {srCard.srNumber}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2 mb-3">
                                                <div>
                                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Type</p>
                                                    <p className="text-sm text-gray-900 dark:text-gray-100 capitalize">{srCard.type}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Location</p>
                                                    <p className="text-sm text-gray-900 dark:text-gray-100 capitalize">{srCard.location.replace('-', ' ')}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Description</p>
                                                    <p className="text-sm text-gray-900 dark:text-gray-100">{srCard.description}</p>
                                                </div>
                                            </div>
                                            
                                            <button
                                                className="w-full px-3 py-2 text-sm font-medium text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/40 hover:bg-green-200 dark:hover:bg-green-900/60 rounded-md transition-colors"
                                                onClick={() => {
                                                    // In a real app, this would navigate to the service request
                                                    console.log(`View service request: ${srCard.srNumber}`)
                                                }}
                                            >
                                                View Service Request →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Message Input */}
                            <div className="p-3 border-t border-gray-200 dark:border-gray-800">
                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            placeholder="Type a message..."
                                            value={messageInput}
                                            onChange={(e) => setMessageInput(e.target.value)}
                                            className={cn(
                                                "w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm",
                                                "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50",
                                                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            )}
                                        />
                                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                                            <div className="relative" ref={actionMenuRef}>
                                                <button
                                                    type="button"
                                                    className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                    onClick={() => setShowActionMenu(!showActionMenu)}
                                                    title="Add actions"
                                                >
                                                    <RiAddLine className="size-4" />
                                                </button>

                                                {showActionMenu && (
                                                    <div className="absolute bottom-full right-0 mb-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-10">
                                                        <div className="py-1">
                                                            <button
                                                                type="button"
                                                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                                onClick={handleCreateVisitor}
                                                            >
                                                                <RiUserAddLine className="size-4 text-gray-500 dark:text-gray-400" />
                                                                <span>Create visitor</span>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                                onClick={handleCreateServiceRequest}
                                                            >
                                                                <RiToolsLine className="size-4 text-gray-500 dark:text-gray-400" />
                                                                <span>Create service request</span>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                                onClick={handleBookResource}
                                                            >
                                                                <RiCalendarEventLine className="size-4 text-gray-500 dark:text-gray-400" />
                                                                <span>Book resource</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                            >
                                                <RiEmotionLine className="size-4" />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                            >
                                                <RiAttachmentLine className="size-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={!messageInput.trim()}
                                        className={cn(
                                            "p-2 rounded-md bg-primary text-white",
                                            "disabled:opacity-50 disabled:cursor-not-allowed",
                                            "hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                        )}
                                    >
                                        <RiSendPlaneFill className="size-5" />
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                            <RiMessage2Line className="size-12 text-gray-300 dark:text-gray-700 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                                Select a conversation to start messaging
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                                Choose a conversation from the list to view messages and communicate with tenants.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* New Message Modal */}
            {showNewMessageModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
                    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 w-full max-w-md m-4">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                                New message
                            </h3>
                            <button
                                onClick={handleCloseNewMessage}
                                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
                            >
                                <RiCloseLine className="size-5" />
                            </button>
                        </div>

                        {/* Search Contacts */}
                        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by name, company, or role..."
                                    value={newMessageSearch}
                                    onChange={(e) => setNewMessageSearch(e.target.value)}
                                    className={cn(
                                        "w-full rounded-md border border-gray-300 dark:border-gray-700 pl-9 pr-3 py-2 text-sm",
                                        "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50",
                                        "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    )}
                                />
                                <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                            </div>

                            {/* Selected Contacts */}
                            {selectedContacts.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {selectedContacts.map(contactId => {
                                        const contact = allAvailableContacts.find(c => c.id === contactId)
                                        if (!contact) return null
                                        return (
                                            <div
                                                key={contactId}
                                                className="flex items-center gap-1 bg-primary/10 text-primary dark:bg-primary/20 rounded-md px-2 py-1"
                                            >
                                                <span className="text-xs font-medium">{contact.name}</span>
                                                <button
                                                    onClick={() => toggleContactSelection(contactId)}
                                                    className="hover:bg-primary/20 dark:hover:bg-primary/30 rounded"
                                                >
                                                    <RiCloseLine className="size-3" />
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Contact List */}
                        <div className="max-h-96 overflow-y-auto">
                            {filteredAvailableContacts.length > 0 ? (
                                filteredAvailableContacts.map(contact => (
                                    <button
                                        key={contact.id}
                                        onClick={() => toggleContactSelection(contact.id)}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-900 border-b border-gray-100 dark:border-gray-800",
                                            selectedContacts.includes(contact.id) && "bg-primary/5 dark:bg-primary/10"
                                        )}
                                    >
                                        {contact.avatar ? (
                                            <div className="relative size-10 overflow-hidden rounded-full flex-shrink-0">
                                                <Image
                                                    src={contact.avatar}
                                                    alt={contact.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 flex-shrink-0">
                                                <span className="text-sm font-medium">{contact.initials}</span>
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0 text-left">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-medium text-sm text-gray-900 dark:text-gray-50 truncate">
                                                    {contact.name}
                                                </h4>
                                                {selectedContacts.includes(contact.id) && (
                                                    <div className="flex-shrink-0 size-5 rounded-full bg-primary flex items-center justify-center">
                                                        <svg className="size-3 text-white" viewBox="0 0 16 16" fill="currentColor">
                                                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {contact.role}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {contact.companyName} • {contact.building}
                                            </p>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                                    <p className="text-sm">No contacts found</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-2">
                            <button
                                onClick={handleCloseNewMessage}
                                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleStartConversation}
                                disabled={selectedContacts.length === 0}
                                className={cn(
                                    "flex-1 px-4 py-2 text-sm font-medium rounded-md",
                                    "bg-primary text-white hover:bg-primary-dark",
                                    "disabled:opacity-50 disabled:cursor-not-allowed",
                                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                )}
                            >
                                {selectedContacts.length > 1 
                                    ? `Start group (${selectedContacts.length})` 
                                    : 'Start conversation'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
} 