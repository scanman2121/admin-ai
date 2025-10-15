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

interface FullScreenTenantContactsProps {
    onClose: () => void
    conversations: Conversation[]
    messages: Message[]
    selectedConversation: string | null
    setSelectedConversation: (id: string | null) => void
}

export function FullScreenTenantContacts({
    onClose,
    conversations,
    messages,
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
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const currentConversation = conversations.find(c => c.id === selectedConversation)

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

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
        if (!messageInput.trim()) return

        // In a real app, you would send the message to the API
        // For now, we'll just clear the input
        setMessageInput("")
    }

    const handleCreateServiceRequest = () => {
        setShowServiceRequestCard(true)
    }

    const handleSubmitServiceRequest = () => {
        // In a real app, you would submit the service request to an API
        console.log('Service request submitted:', {
            conversation: selectedConversation,
            type: serviceRequestType,
            description: serviceRequestDescription,
            location: serviceRequestLocation
        })
        
        // Reset the form
        setShowServiceRequestCard(false)
        setServiceRequestType("")
        setServiceRequestDescription("")
        setServiceRequestLocation("")
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
                        {currentConversation ? currentConversation.name : 'Tenant communications'}
                    </h2>
                    <div className="w-8"></div> {/* Spacer for alignment */}
                </div>
            </div>

            {/* Conversation selection if no conversation is selected */}
            {!selectedConversation && (
                <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                    <div className="mb-3 sm:mb-4 space-y-2 sm:space-y-3">
                        <button
                            onClick={handleStartNewMessage}
                            className={cn(
                                "w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium",
                                "bg-primary text-white hover:bg-primary-dark",
                                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            )}
                        >
                            <RiAddLine className="size-4" />
                            New message
                        </button>
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
                                                    {conversation.name}
                                                </h3>
                                                {conversation.type === "group" && (
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
                </div>
            )}

            {/* Conversation view if conversation is selected */}
            {selectedConversation && currentConversation && (
                <>
                    {/* Conversation header with participants */}
                    <div className="border-b border-gray-200 dark:border-gray-800 p-3 sm:p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h3 className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-50">
                                    {currentConversation.name}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {currentConversation.companyName} • {currentConversation.building}
                                </p>
                            </div>
                            {currentConversation.type === "group" && (
                                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                    <RiGroup2Line className="size-4" />
                                    <span>{currentConversation.participants.length} participants</span>
                                </div>
                            )}
                        </div>
                        
                        {/* Participants */}
                        <div className="overflow-x-auto pb-2 -mx-2 px-2">
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

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="border-t border-gray-200 dark:border-gray-800 p-2 sm:p-4">
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