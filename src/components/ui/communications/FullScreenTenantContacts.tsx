"use client"

import { cn } from "@/lib/utils"
import {
    RiArrowLeftLine,
    RiAttachmentLine,
    RiEmotionLine,
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
}

interface Tenant {
    id: string
    name: string
    building: string
    avatar?: string
    initials: string
    unread: number
    contacts: TenantContact[]
    lastMessage?: {
        text: string
        time: string
        isFromTenant: boolean
    }
}

interface Message {
    id: string
    text: string
    time: string
    isFromTenant: boolean
    sender: string
    senderId: string
    read: boolean
}

interface FullScreenTenantContactsProps {
    onClose: () => void
    tenants: Tenant[]
    messages: Message[]
    selectedTenant: string | null
    setSelectedTenant: (id: string | null) => void
}

export function FullScreenTenantContacts({
    onClose,
    tenants,
    messages,
    selectedTenant,
    setSelectedTenant
}: FullScreenTenantContactsProps) {
    const [selectedContact, setSelectedContact] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [messageInput, setMessageInput] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const currentTenant = tenants.find(t => t.id === selectedTenant)

    // Filter messages based on selected contact
    const filteredMessages = selectedContact
        ? messages.filter(message => message.senderId === selectedContact || !message.isFromTenant)
        : messages;

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [filteredMessages])

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
                        {currentTenant ? currentTenant.name : 'Tenant communications'}
                    </h2>
                    <div className="w-8"></div> {/* Spacer for alignment */}
                </div>
            </div>

            {/* Tenant selection if no tenant is selected */}
            {!selectedTenant && (
                <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                    <div className="mb-3 sm:mb-4">
                        <div className="relative">
                            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search tenants..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:focus:border-primary-400 dark:focus:ring-primary-400"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        {tenants
                            .filter(tenant =>
                                tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                tenant.building.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map(tenant => (
                                <button
                                    key={tenant.id}
                                    onClick={() => setSelectedTenant(tenant.id)}
                                    className="w-full flex items-center gap-2 sm:gap-3 rounded-md p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                                >
                                    {tenant.avatar ? (
                                        <div className="relative size-8 sm:size-10 overflow-hidden rounded-full flex-shrink-0">
                                            <Image
                                                src={tenant.avatar}
                                                alt={tenant.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex size-8 sm:size-10 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 flex-shrink-0">
                                            <span className="text-xs sm:text-sm font-medium">{tenant.initials}</span>
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0 text-left">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-medium text-sm text-gray-900 dark:text-gray-50 truncate">
                                                {tenant.name}
                                            </h3>
                                            {tenant.unread > 0 && (
                                                <span className="ml-2 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white flex-shrink-0">
                                                    {tenant.unread}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {tenant.building}
                                        </p>
                                        {tenant.lastMessage && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                                                {tenant.lastMessage.text}
                                            </p>
                                        )}
                                    </div>
                                </button>
                            ))}
                    </div>
                </div>
            )}

            {/* Conversation view if tenant is selected */}
            {selectedTenant && currentTenant && (
                <>
                    {/* Horizontally scrolling tenant contacts */}
                    <div className="border-b border-gray-200 dark:border-gray-800 p-2 sm:p-4">
                        <div className="overflow-x-auto pb-2 -mx-2 px-2">
                            <div className="flex space-x-2 sm:space-x-3 min-w-min">
                                {currentTenant.contacts.map(contact => (
                                    <button
                                        key={contact.id}
                                        onClick={() => setSelectedContact(selectedContact === contact.id ? null : contact.id)}
                                        className="flex flex-col items-center flex-shrink-0"
                                    >
                                        <div className={cn(
                                            "relative rounded-full border-2 mb-1",
                                            selectedContact === contact.id
                                                ? "border-primary"
                                                : "border-white dark:border-gray-900 hover:border-gray-200 dark:hover:border-gray-700",
                                            "transition-all"
                                        )}>
                                            {contact.avatar ? (
                                                <div className="relative size-10 sm:size-12 overflow-hidden rounded-full">
                                                    <Image
                                                        src={contact.avatar}
                                                        alt={contact.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex size-10 sm:size-12 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                                    <span className="text-xs sm:text-sm font-medium">{contact.initials}</span>
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-xs font-medium text-gray-900 dark:text-gray-50 truncate max-w-[70px] sm:max-w-[80px]">
                                            {contact.name}
                                        </span>
                                        <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate max-w-[70px] sm:max-w-[80px]">
                                            {contact.role}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selected Contact Info */}
                        {selectedContact && (
                            <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                                <div className="flex items-center justify-between">
                                    {(() => {
                                        const contact = currentTenant.contacts.find(c => c.id === selectedContact)
                                        if (!contact) return null

                                        return (
                                            <>
                                                <p className="text-xs text-gray-700 dark:text-gray-300">
                                                    Filtered to <span className="font-medium">{contact.name}</span>
                                                </p>
                                                <button
                                                    onClick={() => setSelectedContact(null)}
                                                    className="text-xs text-primary hover:text-primary-dark"
                                                >
                                                    Show all
                                                </button>
                                            </>
                                        )
                                    })()}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                        {filteredMessages.length > 0 ? (
                            filteredMessages.map(message => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex",
                                        message.isFromTenant ? "justify-start" : "justify-end"
                                    )}
                                >
                                    <div className={cn(
                                        "max-w-[85%] sm:max-w-[80%] rounded-lg p-2 sm:p-3 text-sm",
                                        message.isFromTenant
                                            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50"
                                            : "bg-primary text-white"
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
                            ))
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    No messages yet. Start the conversation!
                                </p>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="border-t border-gray-200 dark:border-gray-800 p-2 sm:p-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 sm:p-0">
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
                                    className="w-full rounded-full border border-gray-300 py-1.5 sm:py-2 px-3 sm:px-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:focus:border-primary-400 dark:focus:ring-primary-400"
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
        </div>
    )
} 