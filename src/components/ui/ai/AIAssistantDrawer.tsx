"use client"

import { Button } from "@/components/Button"
import { cn } from "@/lib/utils"
import {
    RiArrowDownSLine,
    RiBarChartBoxLine,
    RiBuildingLine,
    RiCalendarCheckLine,
    RiCalendarEventLine,
    RiCloseLine,
    RiFileChartLine,
    RiFullscreenLine,
    RiLightbulbLine,
    RiMagicLine,
    RiSendPlaneFill,
    RiTaskLine,
    RiUserAddLine,
    RiVipCrownLine
} from "@remixicon/react"
import React, { useEffect, useRef, useState } from 'react'

interface AIAssistantDrawerProps {
    isOpen: boolean
    onClose: () => void
    onFullScreen: () => void
}

interface SuggestionCard {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    category: 'insights' | 'tasks' | 'generate'
}

interface ChatSession {
    id: string
    title: string
    date: string
    messages: { role: 'user' | 'assistant', content: string }[]
}

export function AIAssistantDrawer({ isOpen, onClose, onFullScreen }: AIAssistantDrawerProps) {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
    const [input, setInput] = useState('')
    const [showPreviousChats, setShowPreviousChats] = useState(false)
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
        // Insights
        {
            id: 'occupancy-trends',
            title: 'Find occupancy trends',
            description: 'Analyze building occupancy trends',
            icon: <RiBarChartBoxLine className="size-5" />,
            category: 'insights'
        },
        {
            id: 'revenue-analysis',
            title: 'Revenue insights',
            description: 'View revenue patterns and forecasts',
            icon: <RiFileChartLine className="size-5" />,
            category: 'insights'
        },
        {
            id: 'building-performance',
            title: 'Building performance',
            description: 'Get insights on building efficiency',
            icon: <RiBuildingLine className="size-5" />,
            category: 'insights'
        },
        // Tasks
        {
            id: 'add-user',
            title: 'Add a user',
            description: 'Add new user account',
            icon: <RiUserAddLine className="size-5" />,
            category: 'tasks'
        },
        {
            id: 'schedule-maintenance',
            title: 'Schedule maintenance',
            description: 'Plan building maintenance tasks',
            icon: <RiCalendarCheckLine className="size-5" />,
            category: 'tasks'
        },
        {
            id: 'view-vips',
            title: 'View VIPs',
            description: 'See important visitors expected today',
            icon: <RiVipCrownLine className="size-5" />,
            category: 'tasks'
        },
        // Generate
        {
            id: 'event-ideas',
            title: 'Event ideas',
            description: 'Generate creative event suggestions',
            icon: <RiLightbulbLine className="size-5" />,
            category: 'generate'
        },
        {
            id: 'email-template',
            title: 'Email template',
            description: 'Create professional email templates',
            icon: <RiMagicLine className="size-5" />,
            category: 'generate'
        },
        {
            id: 'schedule-event',
            title: 'Schedule an event',
            description: 'Create events that tenants will love',
            icon: <RiCalendarEventLine className="size-5" />,
            category: 'generate'
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

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            document.documentElement.classList.add('ai-drawer-open')
        } else {
            document.body.style.overflow = ''
            document.documentElement.classList.remove('ai-drawer-open')
        }

        return () => {
            document.body.style.overflow = ''
            document.documentElement.classList.remove('ai-drawer-open')
        }
    }, [isOpen])

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

    return (
        <>
            <div
                className={cn(
                    "fixed inset-y-0 right-0 z-40 w-96 bg-white dark:bg-gray-950 transform transition-transform duration-300 ease-in-out",
                    "border-l border-gray-200 dark:border-gray-800",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4 py-3">
                    <h2 className="text-base font-medium text-gray-900 dark:text-gray-50">AI Assistant</h2>
                    <div className="flex items-center gap-x-1">
                        {/* New chat button group */}
                        <div className="relative inline-flex shadow-sm rounded-md mr-1">
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
                                <div
                                    className="absolute top-full right-0 mt-1 w-56 rounded-md shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden z-10"
                                >
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
                            onClick={onFullScreen}
                            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                        >
                            <RiFullscreenLine className="size-5" aria-hidden="true" />
                            <span className="sr-only">Full screen</span>
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                        >
                            <RiCloseLine className="size-5" aria-hidden="true" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>
                </div>

                {/* Messages or Suggestions */}
                <div className="flex flex-col h-[calc(100%-8rem)] overflow-y-auto p-4">
                    {messages.length > 0 ? (
                        // Show message history if there are messages
                        <>
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "mb-4 max-w-[85%] rounded-lg p-3 text-sm",
                                        message.role === 'user'
                                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-100 self-end rounded-br-none"
                                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 self-start rounded-bl-none"
                                    )}
                                >
                                    {message.content}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </>
                    ) : (
                        // Show categorized suggestion cards if no messages yet
                        <div className="space-y-6">
                            {/* Insights Section */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <RiBarChartBoxLine className="size-5 text-blue-500" />
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">Insights</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    {suggestionCards
                                        .filter(card => card.category === 'insights')
                                        .map((card) => (
                                            <button
                                                key={card.id}
                                                onClick={() => handleSuggestionClick(card)}
                                                className={cn(
                                                    "flex items-start gap-3 rounded-lg border border-gray-200 dark:border-gray-800 p-3 text-left transition-colors",
                                                    "hover:bg-gray-50 dark:hover:bg-gray-900"
                                                )}
                                            >
                                                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                                    {card.icon}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-gray-50">{card.title}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{card.description}</div>
                                                </div>
                                            </button>
                                        ))}
                                </div>
                            </div>

                            {/* Tasks Section */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <RiTaskLine className="size-5 text-purple-500" />
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">Tasks</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    {suggestionCards
                                        .filter(card => card.category === 'tasks')
                                        .map((card) => (
                                            <button
                                                key={card.id}
                                                onClick={() => handleSuggestionClick(card)}
                                                className={cn(
                                                    "flex items-start gap-3 rounded-lg border border-gray-200 dark:border-gray-800 p-3 text-left transition-colors",
                                                    "hover:bg-gray-50 dark:hover:bg-gray-900"
                                                )}
                                            >
                                                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                                    {card.icon}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-gray-50">{card.title}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{card.description}</div>
                                                </div>
                                            </button>
                                        ))}
                                </div>
                            </div>

                            {/* Generate Section */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <RiMagicLine className="size-5 text-green-500" />
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">Generate</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    {suggestionCards
                                        .filter(card => card.category === 'generate')
                                        .map((card) => (
                                            <button
                                                key={card.id}
                                                onClick={() => handleSuggestionClick(card)}
                                                className={cn(
                                                    "flex items-start gap-3 rounded-lg border border-gray-200 dark:border-gray-800 p-3 text-left transition-colors",
                                                    "hover:bg-gray-50 dark:hover:bg-gray-900"
                                                )}
                                            >
                                                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                                    {card.icon}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-gray-50">{card.title}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{card.description}</div>
                                                </div>
                                            </button>
                                        ))}
                                </div>
                            </div>
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
                                "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
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
        </>
    )
} 