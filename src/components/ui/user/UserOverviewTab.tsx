"use client"

import { Button } from "@/components/Button"
import { Badge } from "@/components/ui/badge"

interface UserOverviewTabProps {
    user: {
        name: string
        email: string
        company: string
        floorSuite?: string
        serviceRequest?: string
        serviceRequestType?: string | null
        serviceRequestStatus?: string | null
        acsStatus: string
        hasNotes?: boolean
        badgeId?: string
    }
    containerClassName?: string
    isModal?: boolean
}

const getAppUserStatusBadge = (acsStatus: string) => {
    const isActiveAppUser = acsStatus !== "revoked";
    
    if (isActiveAppUser) {
        return (
            <Badge 
                variant="default" 
                className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30"
            >
                Active app user
            </Badge>
        );
    } else {
        return (
            <Badge 
                variant="secondary" 
                className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
            >
                Inactive app user
            </Badge>
        );
    }
}

const getACSStatusBadge = (status: string) => {
    switch (status) {
        case "active":
            return (
                <Badge 
                    variant="default" 
                    className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30"
                >
                    Active ACS
                </Badge>
            );
        case "not-in-acs":
            return (
                <Badge 
                    variant="secondary" 
                    className="bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800/30"
                >
                    • Not in ACS
                </Badge>
            );
        case "revoked":
            return (
                <Badge 
                    variant="secondary" 
                    className="bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800/30"
                >
                    • Revoked ACS
                </Badge>
            );
        default:
            return <Badge variant="secondary">Unknown ACS</Badge>;
    }
}

export function UserOverviewTab({ user, containerClassName, isModal = false }: UserOverviewTabProps) {
    if (isModal) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                {/* General Information Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            General information
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Full name
                                </label>
                                <div className="mt-1 text-sm text-gray-900 dark:text-gray-50">
                                    {user.name}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email address
                                </label>
                                <div className="mt-1 text-sm text-gray-900 dark:text-gray-50">
                                    {user.email}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Company
                                </label>
                                <div className="mt-1 text-sm text-gray-900 dark:text-gray-50">
                                    {user.company}
                                </div>
                            </div>
                            {user.floorSuite && (
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Location
                                    </label>
                                    <div className="mt-1 text-sm text-gray-900 dark:text-gray-50">
                                        {user.floorSuite}
                                    </div>
                                </div>
                            )}
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    User status
                                </label>
                                <div className="mt-1 flex items-center gap-2">
                                    {getAppUserStatusBadge(user.acsStatus)}
                                    {getACSStatusBadge(user.acsStatus)}
                                </div>
                            </div>
                            {user.badgeId && (
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Badge ID
                                    </label>
                                    <div className="mt-1 text-sm text-gray-900 dark:text-gray-50">
                                        {user.badgeId}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Open Requests Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                            Open requests
                        </h3>
                        {user.serviceRequest && user.serviceRequest !== "No open requests" ? (
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Current service request
                                        </div>
                                        <div className="text-blue-600 dark:text-blue-400 font-semibold mb-1">
                                            SR-2024-001
                                        </div>
                                        <div className="text-gray-900 dark:text-gray-50 font-medium mb-1">
                                            {user.serviceRequestType || user.serviceRequest}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {user.serviceRequestType ? `${user.serviceRequestType} - New Employee Access` : user.serviceRequest}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button 
                                        variant="secondary"
                                        size="sm"
                                        className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                                    >
                                        Mark as completed
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-gray-400 dark:text-gray-500 mb-2">
                                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-1">
                                    No open requests
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    All service requests have been completed
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Full page layout for user details page
    return (
        <div className={containerClassName || "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full"}>
            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* General Information Card */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                                General information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Full name
                                    </label>
                                    <div className="mt-1 text-sm text-gray-900 dark:text-gray-50">
                                        {user.name}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email address
                                    </label>
                                    <div className="mt-1 text-sm text-gray-900 dark:text-gray-50">
                                        {user.email}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Company
                                    </label>
                                    <div className="mt-1 text-sm text-gray-900 dark:text-gray-50">
                                        {user.company}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        User status
                                    </label>
                                    <div className="mt-1 flex items-center gap-2">
                                        {getAppUserStatusBadge(user.acsStatus)}
                                        {getACSStatusBadge(user.acsStatus)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Access Information Card */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-6">
                                Access information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Access status
                                    </label>
                                    <div className="mt-1 flex items-center gap-2">
                                        {getACSStatusBadge(user.acsStatus)}
                                    </div>
                                </div>
                                {user.badgeId && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Badge ID
                                        </label>
                                        <div className="mt-1 text-sm text-gray-900 dark:text-gray-50">
                                            {user.badgeId}
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Mobile access
                                    </label>
                                    <div className="mt-1 text-sm text-gray-900 dark:text-gray-50">
                                        {user.acsStatus === "active" ? "Enabled" : "Disabled"}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Last access
                                    </label>
                                    <div className="mt-1 text-sm text-gray-900 dark:text-gray-50">
                                        Dec 10, 2024 9:15 AM
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
