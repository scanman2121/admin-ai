"use client"

import { Button } from "@/components/Button"
import { getRelativeTime } from "@/lib/utils"
import { CalendarClock } from "lucide-react"

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
}

export function ApprovalCards({ requests, onApprove, onDeny }: ApprovalCardsProps) {
    if (requests.length === 0) {
        return null
    }
    
    const visibleRequests = requests
    
    return (
        <div className="relative">
            <div className="relative" style={{ minHeight: visibleRequests.length > 0 ? '70px' : '0' }}>
                {visibleRequests.map((request, index) => {
                    // Only show top 3 cards with full visibility, others fade out
                    const isVisible = index < 3
                    const stackOffset = index * 8
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
                            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                                <div className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        {/* Icon */}
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                                <CalendarClock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-900 dark:text-gray-50 leading-snug">
                                                A service request with <strong>{request.requestorName}</strong>
                                                {request.requestorCompany && (
                                                    <> from <strong>{request.requestorCompany}</strong></>
                                                )} is awaiting your approval.
                                            </p>
                                            <div className="mt-0.5 flex items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400">
                                                <span className="truncate">{request.request}</span>
                                                {request.building && (
                                                    <>
                                                        <span className="text-gray-300 dark:text-gray-600">•</span>
                                                        <span>{request.building}</span>
                                                    </>
                                                )}
                                                {request.floor && (
                                                    <>
                                                        <span className="text-gray-300 dark:text-gray-600">•</span>
                                                        <span>{request.floor}</span>
                                                    </>
                                                )}
                                                <span className="text-gray-300 dark:text-gray-600">•</span>
                                                <span>{getRelativeTime(request.created)}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Actions */}
                                        <div className="flex-shrink-0 flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onApprove(request.id)}
                                                className="h-8 px-4 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 border border-blue-600 dark:border-blue-400"
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onDeny(request.id)}
                                                className="h-8 px-4 text-sm font-medium text-pink-600 hover:text-pink-700 hover:bg-pink-50 dark:text-pink-400 dark:hover:bg-pink-900/20 border border-pink-600 dark:border-pink-400"
                                            >
                                                Deny
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

