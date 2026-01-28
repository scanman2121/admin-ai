"use client"

import { Button } from "@/components/Button"
import { cn } from "@/lib/utils"
import { findMatchingAnswer } from "@/data/buildingQALibrary"
import {
    RiArrowDownSLine,
    RiBarChartBoxLine,
    RiBuildingLine,
    RiCalendarCheckLine,
    RiCalendarEventLine,
    RiCloseLine,
    RiCoinLine,
    RiContactsLine,
    RiDragMoveLine,
    RiFileChartLine,
    RiFullscreenLine,
    RiHeartPulseLine,
    RiLightbulbLine,
    RiMagicLine,
    RiSendPlaneFill,
    RiTaskLine,
    RiUserAddLine,
    RiVipCrownLine
} from "@remixicon/react"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

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
    category: 'insights' | 'tenant-health' | 'tasks' | 'generate'
}

interface ChatSession {
    id: string
    title: string
    date: string
    messages: { role: 'user' | 'assistant', content: string }[]
}

interface Position {
    x: number
    y: number
}

interface Size {
    width: number
    height: number
}

// Minimum and maximum sizes for the drawer
const MIN_WIDTH = 400
const MIN_HEIGHT = 400
const MAX_WIDTH = 800
const MAX_HEIGHT = 900

export function AIAssistantDrawer({ isOpen, onClose, onFullScreen }: AIAssistantDrawerProps) {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
    const [input, setInput] = useState('')
    const [showPreviousChats, setShowPreviousChats] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const popoverRef = useRef<HTMLDivElement>(null)

    // Dragging state
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 })
    const [hasBeenDragged, setHasBeenDragged] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Resize state
    const [size, setSize] = useState<Size>({ width: MIN_WIDTH, height: 600 })
    const [isResizing, setIsResizing] = useState(false)
    const [resizeStart, setResizeStart] = useState<{ x: number; y: number; width: number; height: number } | null>(null)

    // Mount effect for portal (SSR safety)
    useEffect(() => {
        setMounted(true)
    }, [])

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
        // Tenant Health
        {
            id: 'tenant-health-report',
            title: 'Run tenant health report',
            description: 'Analyze tenant engagement and satisfaction',
            icon: <RiHeartPulseLine className="size-5" />,
            category: 'tenant-health'
        },
        {
            id: 'deploy-credits',
            title: 'Deploy credits to unhealthy tenants',
            description: 'Incentivize engagement with credit rewards',
            icon: <RiCoinLine className="size-5" />,
            category: 'tenant-health'
        },
        {
            id: 'touch-base-contacts',
            title: 'Touch base with key contacts',
            description: 'Reach out to important tenant contacts',
            icon: <RiContactsLine className="size-5" />,
            category: 'tenant-health'
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

    // Initialize position when popover opens
    useEffect(() => {
        if (isOpen && !hasBeenDragged) {
            // Position in bottom right corner with some padding
            const padding = 24
            setPosition({
                x: window.innerWidth - size.width - padding,
                y: window.innerHeight - size.height - padding
            })
        }
    }, [isOpen, hasBeenDragged, size.width, size.height])

    // Scroll to bottom of messages when new messages are added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Handle escape key to close popover
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

    // Handle drag
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (popoverRef.current) {
            const rect = popoverRef.current.getBoundingClientRect()
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            })
            setIsDragging(true)
            setHasBeenDragged(true)
        }
    }, [])

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging) {
            const newX = e.clientX - dragOffset.x
            const newY = e.clientY - dragOffset.y

            // Keep popover within viewport bounds
            const maxX = window.innerWidth - size.width
            const maxY = window.innerHeight - 100 // minimum visible height

            setPosition({
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY))
            })
        }
    }, [isDragging, dragOffset, size.width])

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
    }, [])

    // Add global mouse listeners for dragging
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
            return () => {
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
            }
        }
    }, [isDragging, handleMouseMove, handleMouseUp])

    // Handle resize
    const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsResizing(true)
        setResizeStart({
            x: e.clientX,
            y: e.clientY,
            width: size.width,
            height: size.height
        })
    }, [size])

    const handleResizeMouseMove = useCallback((e: MouseEvent) => {
        if (isResizing && resizeStart) {
            const deltaX = e.clientX - resizeStart.x
            const deltaY = e.clientY - resizeStart.y

            const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, resizeStart.width + deltaX))
            const newHeight = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, resizeStart.height + deltaY))

            setSize({ width: newWidth, height: newHeight })
        }
    }, [isResizing, resizeStart])

    const handleResizeMouseUp = useCallback(() => {
        setIsResizing(false)
        setResizeStart(null)
    }, [])

    // Add global mouse listeners for resizing
    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleResizeMouseMove)
            document.addEventListener('mouseup', handleResizeMouseUp)
            return () => {
                document.removeEventListener('mousemove', handleResizeMouseMove)
                document.removeEventListener('mouseup', handleResizeMouseUp)
            }
        }
    }, [isResizing, handleResizeMouseMove, handleResizeMouseUp])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userQuestion = input.trim()

        // Add user message
        const userMessage = { role: 'user' as const, content: userQuestion }
        setMessages(prev => [...prev, userMessage])
        setInput('')

        // Find matching answer from Q&A library
        setTimeout(() => {
            const answer = findMatchingAnswer(userQuestion)
            const aiResponse = {
                role: 'assistant' as const,
                content: answer || "I'm here to help with building-related questions! Try asking about building hours, amenities, parking, events, work orders, or wayfinding."
            }
            setMessages(prev => [...prev, aiResponse])
        }, 800)
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

    if (!isOpen || !mounted) return null

    return createPortal(
        <div
            ref={popoverRef}
            style={{
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
            }}
            className={cn(
                "fixed z-[100] bg-white dark:bg-gray-950 rounded-xl shadow-2xl",
                "border border-gray-200 dark:border-gray-800",
                "flex flex-col",
                (isDragging || isResizing) ? "select-none" : "",
                isDragging ? "cursor-grabbing" : ""
            )}
        >
            {/* Header - Draggable */}
            <div
                className={cn(
                    "flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4 py-3 rounded-t-xl",
                    "cursor-grab active:cursor-grabbing"
                )}
                onMouseDown={handleMouseDown}
            >
                <div className="flex items-center gap-2">
                    <RiDragMoveLine className="size-4 text-gray-400" />
                    <h2 className="text-base font-medium text-gray-900 dark:text-gray-50">AI Assistant</h2>
                </div>
                <div className="flex items-center gap-x-1" onMouseDown={(e) => e.stopPropagation()}>
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
            <div className="flex-1 flex flex-col overflow-y-auto p-4">
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
                    // Show categorized suggestion cards if no messages yet
                    <div className="space-y-6">
                        {/* Insights Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <RiBarChartBoxLine className="size-5 text-gray-500 dark:text-gray-400" />
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
                                                "rounded-lg border border-gray-200 dark:border-gray-800 p-3 text-left transition-colors",
                                                "hover:bg-gray-50 dark:hover:bg-gray-900"
                                            )}
                                        >
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-50">{card.title}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{card.description}</div>
                                        </button>
                                    ))}
                            </div>
                        </div>

                        {/* Tenant Health Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <RiHeartPulseLine className="size-5 text-gray-500 dark:text-gray-400" />
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">Tenant Health</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                {suggestionCards
                                    .filter(card => card.category === 'tenant-health')
                                    .map((card) => (
                                        <button
                                            key={card.id}
                                            onClick={() => handleSuggestionClick(card)}
                                            className={cn(
                                                "rounded-lg border border-gray-200 dark:border-gray-800 p-3 text-left transition-colors",
                                                "hover:bg-gray-50 dark:hover:bg-gray-900"
                                            )}
                                        >
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-50">{card.title}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{card.description}</div>
                                        </button>
                                    ))}
                            </div>
                        </div>

                        {/* Tasks Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <RiTaskLine className="size-5 text-gray-500 dark:text-gray-400" />
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
                                                "rounded-lg border border-gray-200 dark:border-gray-800 p-3 text-left transition-colors",
                                                "hover:bg-gray-50 dark:hover:bg-gray-900"
                                            )}
                                        >
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-50">{card.title}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{card.description}</div>
                                        </button>
                                    ))}
                            </div>
                        </div>

                        {/* Generate Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <RiMagicLine className="size-5 text-gray-500 dark:text-gray-400" />
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
                                                "rounded-lg border border-gray-200 dark:border-gray-800 p-3 text-left transition-colors",
                                                "hover:bg-gray-50 dark:hover:bg-gray-900"
                                            )}
                                        >
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-50">{card.title}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{card.description}</div>
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 dark:border-gray-800 p-4 rounded-b-xl">
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

            {/* Resize Handle - Bottom Right */}
            <div
                onMouseDown={handleResizeMouseDown}
                className={cn(
                    "absolute bottom-0 right-0 w-4 h-4 cursor-se-resize",
                    "flex items-center justify-center",
                    "hover:bg-gray-100 dark:hover:bg-gray-800 rounded-br-xl"
                )}
            >
                <svg
                    className="w-3 h-3 text-gray-400 dark:text-gray-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M22 22H20V20H22V22ZM22 18H20V16H22V18ZM18 22H16V20H18V22ZM22 14H20V12H22V14ZM18 18H16V16H18V18ZM14 22H12V20H14V22Z" />
                </svg>
            </div>
        </div>,
        document.body
    )
}
