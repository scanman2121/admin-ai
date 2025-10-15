"use client"

import { cn } from "@/lib/utils"
import {
    RiAddLine,
    RiArrowLeftLine,
    RiAttachmentLine,
    RiCloseLine,
    RiEmotionLine,
    RiGroup2Line,
    RiSearchLine,
    RiSendPlaneFill
} from "@remixicon/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

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

interface FullScreenTenantContactsProps {
    onClose: () => void
    conversations: Conversation[]
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
    allMessages: Record<string, Message[]>
    setMessages: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>
    selectedConversation: string | null
    setSelectedConversation: (id: string | null) => void
}

export function FullScreenTenantContacts({
    onClose,
    conversations,
    setConversations,
    allMessages,
    setMessages,
    selectedConversation,
    setSelectedConversation
}: FullScreenTenantContactsProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [messageInput, setMessageInput] = useState("")
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
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const currentConversation = conversations.find(c => c.id === selectedConversation)
    
    // Get the display name (either custom SR name or original name)
    const getConversationDisplayName = (convId: string | null) => {
        if (!convId) return null
        return conversationNames[convId] || conversations.find(c => c.id === convId)?.name
    }
    
    // Get messages for the selected conversation
    const messages = selectedConversation && allMessages[selectedConversation]
        ? allMessages[selectedConversation]
        : []
    
    // Get submitted service requests for this conversation
    const conversationServiceRequests = selectedConversation && submittedServiceRequests[selectedConversation]
        ? submittedServiceRequests[selectedConversation]
        : []

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [allMessages, selectedConversation])

    // Handle escape key to close
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [onClose])

    // Handle message submission
    const handleSendMessage = () => {
        if (!messageInput.trim() || !selectedConversation) return

        const now = new Date()
        const timestamp = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

        // Create new message
        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            text: messageInput.trim(),
            time: timestamp,
            sender: "You",
            senderId: "you",
            read: true
        }

        // Add message to the conversation
        setMessages(prev => ({
            ...prev,
            [selectedConversation]: [...(prev[selectedConversation] || []), newMessage]
        }))

        // Update the conversation's last message
        setConversations(prev => prev.map(conv => 
            conv.id === selectedConversation
                ? {
                    ...conv,
                    lastMessage: {
                        text: messageInput.trim(),
                        time: timestamp,
                        senderId: "you"
                    }
                }
                : conv
        ))

        setMessageInput("")

        // Scroll to bottom
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    }

    const handleCreateServiceRequest = () => {
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

        // Get the selected contact objects
        const selectedParticipants = allAvailableContacts.filter(contact => 
            selectedContacts.includes(contact.id)
        )

        if (selectedParticipants.length === 0) return

        // Generate a unique ID for the new conversation
        const newConversationId = `new-${Date.now()}`

        // Determine conversation type and name
        const isGroup = selectedParticipants.length > 1
        const conversationName = isGroup
            ? selectedParticipants.length === 2
                ? `${selectedParticipants[0].name} & ${selectedParticipants[1].name}`
                : `${selectedParticipants[0].companyName} - Group`
            : selectedParticipants[0].name

        // Create the new conversation
        const newConversation: Conversation = {
            id: newConversationId,
            type: isGroup ? "group" : "individual",
            name: conversationName,
            companyName: selectedParticipants[0].companyName,
            building: selectedParticipants[0].building,
            unread: 0,
            participants: selectedParticipants
        }

        // Add the conversation to state
        setConversations(prev => [newConversation, ...prev])

        // Initialize empty messages for this conversation
        setMessages(prev => ({
            ...prev,
            [newConversationId]: []
        }))

        // Select the new conversation
        setSelectedConversation(newConversationId)

        // Close the modal
        handleCloseNewMessage()
        
        console.log('New conversation created:', newConversation)
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

    return (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-950 flex flex-col">
            {/* Header */}
            <div className="border-b border-gray-200 dark:border-gray-800 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                    <button
                        onClick={onClose}
                        className="p-1.5 sm:p-2 -m-1.5 sm:-m-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <RiArrowLeftLine className="size-5" />
                    </button>
                    <h2 className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-50 truncate max-w-[200px] sm:max-w-none">
                        {currentConversation ? (getConversationDisplayName(selectedConversation) || currentConversation.name) : 'Tenant communications'}
                    </h2>
                    <div className="w-8"></div> {/* Spacer for alignment */}
                </div>
            </div>

            {/* Conversation selection if no conversation is selected */}
            {!selectedConversation && (
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 pb-24 relative">
                    <div className="mb-3 sm:mb-4">
                        <div className="relative">
                            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:focus:border-primary dark:focus:ring-primary"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        {conversations
                            .filter(conversation =>
                                conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                conversation.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                conversation.building.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map(conversation => (
                                <button
                                    key={conversation.id}
                                    onClick={() => setSelectedConversation(conversation.id)}
                                    className="w-full flex items-center gap-2 sm:gap-3 rounded-md p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                                >
                                    {/* Avatar(s) */}
                                    <div className="relative flex-shrink-0">
                                        {conversation.type === "individual" && conversation.participants[0] ? (
                                            conversation.participants[0].avatar ? (
                                                <div className="relative size-10 sm:size-12 overflow-hidden rounded-full">
                                                    <Image
                                                        src={conversation.participants[0].avatar}
                                                        alt={conversation.participants[0].name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                                                    <span className="text-xs sm:text-sm font-medium">{conversation.participants[0].initials}</span>
                                                </div>
                                            )
                                        ) : (
                                            <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                                <RiGroup2Line className="size-5 sm:size-6" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-1.5 min-w-0">
                                                <h3 className="font-medium text-sm text-gray-900 dark:text-gray-50 truncate">
                                                    {getConversationDisplayName(conversation.id) || conversation.name}
                                                </h3>
                                                {conversation.type === "group" && !conversationNames[conversation.id] && (
                                                    <RiGroup2Line className="size-3.5 text-gray-400 flex-shrink-0" />
                                                )}
                                            </div>
                                            {conversation.unread > 0 && (
                                                <span className="ml-2 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white flex-shrink-0">
                                                    {conversation.unread}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {conversation.companyName} • {conversation.building}
                                        </p>
                                        {conversation.lastMessage && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                                                {conversation.lastMessage.text}
                                            </p>
                                        )}
                                    </div>
                                </button>
                            ))}
                    </div>
                    
                    {/* Sticky New Message Button */}
                    <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                        <button
                            onClick={handleStartNewMessage}
                            className={cn(
                                "w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium",
                                "bg-primary text-white hover:bg-primary-dark",
                                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                                "transition-colors"
                            )}
                        >
                            <RiAddLine className="size-4" />
                            New message
                        </button>
                    </div>
                </div>
            )}

            {/* Conversation view if conversation is selected */}
            {selectedConversation && currentConversation && (
                <>
                    {/* Conversation header with participants */}
                    <div className="border-b border-gray-200 dark:border-gray-800 p-3 sm:p-4 bg-white dark:bg-gray-950">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-50">
                                    {currentConversation.name}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {currentConversation.companyName} • {currentConversation.building}
                                </p>
                            </div>
                            {currentConversation.type === "group" && (
                                <button
                                    onClick={() => setShowParticipants(!showParticipants)}
                                    className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                    <RiGroup2Line className="size-4" />
                                    <span>{currentConversation.participants.length} participants</span>
                                </button>
                            )}
                        </div>
                        
                        {/* Collapsible Participants - Only for Groups */}
                        {currentConversation.type === "group" && showParticipants && (
                            <div className="overflow-x-auto pb-2 -mx-2 px-2 mt-3">
                                <div className="flex space-x-2 sm:space-x-3 min-w-min">
                                    {currentConversation.participants.map(participant => (
                                        <div
                                            key={participant.id}
                                            className="flex flex-col items-center flex-shrink-0"
                                        >
                                            <div className="relative rounded-full mb-1">
                                                {participant.avatar ? (
                                                    <div className="relative size-10 sm:size-12 overflow-hidden rounded-full">
                                                        <Image
                                                            src={participant.avatar}
                                                            alt={participant.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                                        <span className="text-xs sm:text-sm font-medium">{participant.initials}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-xs font-medium text-gray-900 dark:text-gray-50 truncate max-w-[70px] sm:max-w-[80px]">
                                                {participant.name}
                                            </span>
                                            <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate max-w-[70px] sm:max-w-[80px]">
                                                {participant.role}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                        {messages.length > 0 ? (
                            messages.map(message => {
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
                                            "max-w-[85%] sm:max-w-[80%] rounded-lg p-2 sm:p-3 text-sm",
                                            isFromYou
                                                ? "bg-primary text-white"
                                                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50"
                                        )}>
                                            <div className="flex justify-between items-center gap-2 sm:gap-4 mb-1">
                                                <span className="font-medium text-xs truncate max-w-[120px] sm:max-w-none">
                                                    {message.sender}
                                                </span>
                                                <span className="text-[10px] sm:text-xs opacity-70 whitespace-nowrap">
                                                    {message.time}
                                                </span>
                                            </div>
                                            <p className="text-xs sm:text-sm break-words">{message.text}</p>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    No messages yet. Start the conversation!
                                </p>
                            </div>
                        )}

                        {/* Service Request Card */}
                        {showServiceRequestCard && currentConversation && (
                            <div className="flex justify-end">
                                <div className="max-w-[90%] bg-gray-100 dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700">
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
                                <div className="max-w-[90%] bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 sm:p-4">
                                    <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                                        <div className="flex size-8 sm:size-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex-shrink-0">
                                            <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <h4 className="font-semibold text-xs sm:text-sm text-green-900 dark:text-green-100">
                                                    Service Request Created
                                                </h4>
                                                <span className="text-[10px] sm:text-xs text-green-600 dark:text-green-400">
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
                                            <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-100 capitalize">{srCard.type}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Location</p>
                                            <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-100 capitalize">{srCard.location.replace('-', ' ')}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">Description</p>
                                            <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-100">{srCard.description}</p>
                                        </div>
                                    </div>
                                    
                                    <button
                                        className="w-full px-3 py-2 text-xs sm:text-sm font-medium text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/40 hover:bg-green-200 dark:hover:bg-green-900/60 rounded-md transition-colors"
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
                    <div className="border-t border-gray-200 dark:border-gray-800 p-3 sm:p-4 bg-white dark:bg-gray-950">
                        <div className="flex items-center gap-1 sm:gap-2">
                            <button 
                                onClick={handleCreateServiceRequest}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 sm:p-0"
                                title="Create service request"
                            >
                                <RiAttachmentLine className="size-5" />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 sm:p-0">
                                <RiEmotionLine className="size-5" />
                            </button>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault()
                                            handleSendMessage()
                                        }
                                    }}
                                    className="w-full rounded-full border border-gray-300 py-1.5 sm:py-2 px-3 sm:px-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:focus:border-primary dark:focus:ring-primary"
                                />
                            </div>
                            <button
                                onClick={handleSendMessage}
                                disabled={!messageInput.trim()}
                                className={cn(
                                    "rounded-full p-1.5 sm:p-2",
                                    messageInput.trim()
                                        ? "bg-primary text-white hover:bg-primary-dark"
                                        : "bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                                )}
                            >
                                <RiSendPlaneFill className="size-5" />
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* New Message Modal */}
            {showNewMessageModal && (
                <div className="fixed inset-0 bg-white dark:bg-gray-950 z-[60] flex flex-col">
                    {/* Modal Header */}
                    <div className="border-b border-gray-200 dark:border-gray-800 p-3 sm:p-4">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={handleCloseNewMessage}
                                className="p-1.5 sm:p-2 -m-1.5 sm:-m-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <RiArrowLeftLine className="size-5" />
                            </button>
                            <h2 className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-50">
                                New message
                            </h2>
                            <div className="w-8"></div>
                        </div>
                    </div>

                    {/* Search Contacts */}
                    <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-800">
                        <div className="relative mb-3">
                            <input
                                type="text"
                                placeholder="Search by name, company, or role..."
                                value={newMessageSearch}
                                onChange={(e) => setNewMessageSearch(e.target.value)}
                                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50"
                            />
                            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                        </div>

                        {/* Selected Contacts */}
                        {selectedContacts.length > 0 && (
                            <div className="flex flex-wrap gap-2">
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
                    <div className="flex-1 overflow-y-auto">
                        {filteredAvailableContacts.length > 0 ? (
                            filteredAvailableContacts.map(contact => (
                                <button
                                    key={contact.id}
                                    onClick={() => toggleContactSelection(contact.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-900 border-b border-gray-100 dark:border-gray-800",
                                        selectedContacts.includes(contact.id) && "bg-primary/5 dark:bg-primary/10"
                                    )}
                                >
                                    {contact.avatar ? (
                                        <div className="relative size-10 sm:size-12 overflow-hidden rounded-full flex-shrink-0">
                                            <Image
                                                src={contact.avatar}
                                                alt={contact.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 flex-shrink-0">
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

                    {/* Action Button */}
                    {selectedContacts.length > 0 && (
                        <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-800">
                            <button
                                onClick={handleStartConversation}
                                className={cn(
                                    "w-full px-4 py-2.5 text-sm font-medium rounded-md",
                                    "bg-primary text-white hover:bg-primary-dark",
                                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                )}
                            >
                                {selectedContacts.length > 1 
                                    ? `Start group (${selectedContacts.length})` 
                                    : 'Start conversation'}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
} 