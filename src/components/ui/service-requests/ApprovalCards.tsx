"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { getRelativeTime } from "@/lib/utils"
import { CalendarClock, ChevronDown, X } from "lucide-react"
import { useState } from "react"

interface ApprovalRequest {
    id: string
    request: string
    requestorName: string
    requestorCompany?: string
    created: string
    building?: string
    floor?: string
}

interface ApprovalCardsProps {
    requests: ApprovalRequest[]
    onApprove: (id: string) => void
    onDeny: (id: string) => void
    onDismiss?: (id: string) => void
}

export function ApprovalCards({ requests, onApprove, onDeny, onDismiss }: ApprovalCardsProps) {
    const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())
    
    // Filter out dismissed requests
    const visibleRequests = requests.filter(req => !dismissedIds.has(req.id))
    
    if (visibleRequests.length === 0) {
        return null
    }
    
    const handleDismiss = (id: string) => {
        setDismissedIds(prev => new Set(prev).add(id))
        if (onDismiss) {
            onDismiss(id)
        }
    }
    
    return (
        <div className="relative mb-6">
            <div className="relative" style={{ minHeight: visibleRequests.length > 0 ? '80px' : '0' }}>
                {visibleRequests.map((request, index) => {
                    // Only show top 3 cards with full visibility, others fade out
                    const isVisible = index < 3
                    const stackOffset = index * 6
                    const scale = index === 0 ? 1 : 1 - index * 0.02
                    
                    return (
                        <div
                            key={request.id}
                            className="absolute top-0 left-0 right-0 transition-all duration-300 ease-out"
                            style={{
                                transform: `translateY(${stackOffset}px) scale(${scale})`,
                                zIndex: visibleRequests.length - index,
                                opacity: isVisible ? Math.max(0.3, 1 - index * 0.2) : 0,
                                pointerEvents: index === 0 ? 'auto' : 'none',
                            }}
                        >
                            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="px-3 py-2">
                                    <div className="flex items-center gap-3">
                                        {/* Icon */}
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20">
                                                <CalendarClock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                            </div>
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-900 dark:text-gray-50 leading-tight">
                                                A service request with <strong>{request.requestorName}</strong>
                                                {request.requestorCompany && (
                                                    <> from <strong>{request.requestorCompany}</strong></>
                                                )} is awaiting your approval.
                                            </p>
                                            <div className="mt-1 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
                                                <span className="truncate">{request.request}</span>
                                                {request.building && (
                                                    <span>• {request.building}</span>
                                                )}
                                                {request.floor && (
                                                    <span>• {request.floor}</span>
                                                )}
                                                <span>• {getRelativeTime(request.created)}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Actions */}
                                        <div className="flex-shrink-0 flex items-center gap-1.5">
                                            <Button
                                                variant="default"
                                                size="sm"
                                                onClick={() => onDeny(request.id)}
                                                className="bg-pink-600 hover:bg-pink-700 text-white h-7 px-3 text-xs"
                                            >
                                                Deny
                                            </Button>
                                            <div className="relative">
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    onClick={() => onApprove(request.id)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white h-7 px-3 text-xs"
                                                >
                                                    Approve
                                                </Button>
                                                <button
                                                    className="absolute -right-1 -top-1 flex items-center justify-center w-3.5 h-3.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                                    aria-label="More options"
                                                >
                                                    <ChevronDown className="w-2.5 h-2.5 text-gray-600 dark:text-gray-400" />
                                                </button>
                                            </div>
                                            {onDismiss && (
                                                <button
                                                    onClick={() => handleDismiss(request.id)}
                                                    className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                                    aria-label="Dismiss"
                                                >
                                                    <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

