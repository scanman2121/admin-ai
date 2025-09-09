"use client"

import { Button } from "@/components/Button"
import { cn } from "@/lib/utils"
import {
    RiArrowDownSLine,
    RiArrowLeftLine,
    RiArrowRightLine,
    RiCalendarEventLine,
    RiCloseLine,
    RiLineChartLine,
    RiSendPlaneFill,
    RiUserAddLine,
    RiVipCrownLine
} from "@remixicon/react"
import { useEffect, useRef, useState } from "react"

interface FullScreenAIAssistantProps {
    isOpen: boolean
    onClose: () => void
}

interface SuggestionCard {
    id: string
    title: string
    description: string
    icon: React.ReactNode
}

interface ChatSession {
    id: string
    title: string
    date: string
    messages: { role: 'user' | 'assistant', content: string }[]
}

export function FullScreenAIAssistant({ isOpen, onClose }: FullScreenAIAssistantProps) {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
    const [input, setInput] = useState('')
    const [showPreviousChats, setShowPreviousChats] = useState(false)
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Sample previous chat sessions
    const previousChats: ChatSession[] = [
        {
            id: '1',
            title: 'Adding new tenant users',
            date: 'Today',
            messages: [
                { role: 'user', content: 'Help me add a user' },
                { role: 'assistant', content: 'I\'d be happy to help you add a user. Here\'s how we can get started...' }
            ]
        },
        {
            id: '2',
            title: 'Building occupancy analysis',
            date: 'Yesterday',
            messages: [
                { role: 'user', content: 'Help me find occupancy trends' },
                { role: 'assistant', content: 'I\'d be happy to help you find occupancy trends. Here\'s how we can get started...' }
            ]
        },
        {
            id: '3',
            title: 'Summer event planning',
            date: 'Jun 10',
            messages: [
                { role: 'user', content: 'Help me schedule an event' },
                { role: 'assistant', content: 'I\'d be happy to help you schedule an event. Here\'s how we can get started...' }
            ]
        }
    ]

    const suggestionCards: SuggestionCard[] = [
        {
            id: 'add-user',
            title: 'Add a user',
            description: 'Add new user account',
            icon: <RiUserAddLine className="size-5" />
        },
        {
            id: 'occupancy-trends',
            title: 'Find occupancy trends',
            description: 'Analyze building occupancy trends',
            icon: <RiLineChartLine className="size-5" />
        },
        {
            id: 'schedule-event',
            title: 'Schedule an event',
            description: 'Create events that tenants will love',
            icon: <RiCalendarEventLine className="size-5" />
        },
        {
            id: 'view-vips',
            title: 'View VIPs',
            description: 'See important visitors expected today',
            icon: <RiVipCrownLine className="size-5" />
        }
    ]

    // Scroll to bottom of messages when new messages are added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Handle escape key to close drawer
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        // Add user message
        const userMessage = { role: 'user' as const, content: input.trim() }
        setMessages(prev => [...prev, userMessage])
        setInput('')

        // Simulate AI response after a short delay
        setTimeout(() => {
            const aiResponse = {
                role: 'assistant' as const,
                content: `I received your message: "${input.trim()}". This is a simulated response as this is just a UI demo.`
            }
            setMessages(prev => [...prev, aiResponse])
        }, 1000)
    }

    const handleSuggestionClick = (suggestion: SuggestionCard) => {
        // Add user message based on suggestion
        const userMessage = {
            role: 'user' as const,
            content: `Help me ${suggestion.title.toLowerCase()}`
        }
        setMessages(prev => [...prev, userMessage])

        // Simulate AI response after a short delay
        setTimeout(() => {
            const aiResponse = {
                role: 'assistant' as const,
                content: `I'd be happy to help you ${suggestion.title.toLowerCase()}. Here's how we can get started...`
            }
            setMessages(prev => [...prev, aiResponse])
        }, 1000)
    }

    const handleNewChat = () => {
        setMessages([])
        setInput('')
        setShowPreviousChats(false)
    }

    const handleLoadPreviousChat = (chat: ChatSession) => {
        setMessages(chat.messages)
        setShowPreviousChats(false)
    }

    const togglePreviousChats = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowPreviousChats(prev => !prev)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-y-0 right-0 z-[100] flex bg-white dark:bg-gray-950" style={{ width: 'calc(100% - 64px)' }}>
            {/* Left Menu */}
            <div className={cn(
                "border-l border-gray-200 dark:border-gray-800 transition-all duration-300",
                isMenuCollapsed ? "w-16" : "w-64"
            )}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                    {!isMenuCollapsed && (
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">Suggestions</h3>
                    )}
                    <Button
                        variant="ghost"
                        className="p-1.5 h-8 w-8 ml-auto"
                        onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
                    >
                        {isMenuCollapsed ? (
                            <RiArrowRightLine className="size-4" />
                        ) : (
                            <RiArrowLeftLine className="size-4" />
                        )}
                        <span className="sr-only">
                            {isMenuCollapsed ? "Expand menu" : "Collapse menu"}
                        </span>
                    </Button>
                </div>
                <div className="p-4">
                    <div className="space-y-2">
                        {suggestionCards.map((card) => (
                            <button
                                key={card.id}
                                onClick={() => handleSuggestionClick(card)}
                                className={cn(
                                    "w-full flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-800 p-3 text-left transition-colors",
                                    "hover:bg-gray-50 dark:hover:bg-gray-900"
                                )}
                            >
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary">
                                    {card.icon}
                                </div>
                                {!isMenuCollapsed && (
                                    <div>
                                        <div className="font-medium text-gray-900 dark:text-gray-50">{card.title}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{card.description}</div>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">AI Assistant</h2>
                    <div className="flex items-center gap-2">
                        {/* New chat button group */}
                        <div className="relative inline-flex shadow-sm rounded-md">
                            <Button
                                variant="secondary"
                                className="py-1 px-3 h-8 text-xs rounded-r-none border-r border-gray-300 dark:border-gray-700"
                                onClick={handleNewChat}
                            >
                                New chat
                            </Button>
                            <Button
                                variant="secondary"
                                className="p-0 w-8 h-8 flex items-center justify-center rounded-l-none"
                                onClick={togglePreviousChats}
                            >
                                <RiArrowDownSLine className="size-4" />
                                <span className="sr-only">Show previous chats</span>
                            </Button>

                            {/* Previous chats dropdown */}
                            {showPreviousChats && (
                                <div className="absolute top-full right-0 mt-1 w-56 rounded-md shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden z-10">
                                    <div className="py-1">
                                        <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                                            Previous chats
                                        </div>
                                        {previousChats.map(chat => (
                                            <button
                                                key={chat.id}
                                                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                onClick={() => handleLoadPreviousChat(chat)}
                                            >
                                                <div className="font-medium truncate">{chat.title}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{chat.date}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            className="p-1.5 h-8 w-8"
                            onClick={onClose}
                        >
                            <RiCloseLine className="size-5" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4">
                    {messages.length > 0 ? (
                        // Show message history if there are messages
                        <>
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "mb-4 max-w-[85%] rounded-lg p-3 text-sm",
                                        message.role === 'user'
                                            ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary self-end rounded-br-none"
                                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 self-start rounded-bl-none"
                                    )}
                                >
                                    {message.content}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </>
                    ) : (
                        // Show welcome message if no messages yet
                        <div className="text-center mt-8">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                                Welcome to AI Assistant
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Choose a suggestion from the menu or type your question below to get started.
                            </p>
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="border-t border-gray-200 dark:border-gray-800 p-4">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className={cn(
                                "flex-1 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent px-3 py-2 text-sm",
                                "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                                "focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary"
                            )}
                        />
                        <Button
                            type="submit"
                            variant="primary"
                            className="h-9 w-9 shrink-0 p-0"
                            disabled={!input.trim()}
                        >
                            <RiSendPlaneFill className="size-4" />
                            <span className="sr-only">Send message</span>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
} 