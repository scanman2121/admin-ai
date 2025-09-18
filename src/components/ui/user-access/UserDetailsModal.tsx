"use client"

import { Button } from "@/components/Button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { UserAccessTab } from "@/components/ui/user/UserAccessTab"
import { UserActivityTab } from "@/components/ui/user/UserActivityTab"
import { UserOverviewTab } from "@/components/ui/user/UserOverviewTab"
import { UserRequestsTab } from "@/components/ui/user/UserRequestsTab"
import { UserVisitorsTab } from "@/components/ui/user/UserVisitorsTab"
import { Activity, Calendar, FileText, Shield, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface UserDetailsModalProps {
    isOpen: boolean
    onClose: () => void
    user: {
        id: string
        name: string
        email: string
        company: string
        floorSuite: string
        serviceRequest: string
        serviceRequestType: string | null
        serviceRequestStatus: string | null
        acsStatus: string
        hasNotes: boolean
        badgeId?: string
    } | null
    defaultTab?: string
}



export function UserDetailsModal({ isOpen, onClose, user, defaultTab = "overview" }: UserDetailsModalProps) {
    const [activeTab, setActiveTab] = useState(defaultTab)
    const router = useRouter()

    // Reset to default tab when modal opens or defaultTab changes
    useEffect(() => {
        if (isOpen) {
            setActiveTab(defaultTab)
        }
    }, [isOpen, defaultTab])

    if (!user) return null

    const handleViewFullProfile = () => {
        // Generate user ID from email (same logic as in users page)
        const userId = user.email.split('@')[0].replace('.', '')
        onClose()
        router.push(`/users/${userId}`)
    }

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }


    const renderTabContent = () => {
        switch (activeTab) {
            case "access":
                return <UserAccessTab userId={user.id} />
            case "activity":
                return <UserActivityTab userId={user.id} />
            case "requests":
                return <UserRequestsTab userId={user.id} />
            case "visitors":
                return <UserVisitorsTab userId={user.id} />
            case "overview":
                return <UserOverviewTab user={user} isModal={true} />
            default:
                return null
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-7xl w-full h-[85vh] overflow-hidden p-0 flex flex-col">
                <DialogHeader className="px-6 py-4 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                                    {getInitials(user.name)}
                                </span>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                                        {user.name}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <span className="text-blue-600 dark:text-blue-400">Active user</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {user.company} • {user.email}
                                </p>
                            </div>
                        </div>
                        <div className="mr-8">
                            <Button variant="secondary" size="sm" onClick={handleViewFullProfile}>
                                View full profile
                            </Button>
                        </div>
                    </div>
                </DialogHeader>

                <div className="px-6 pt-4 pb-4 bg-white dark:bg-gray-800 flex-shrink-0">
                    <TabNavigation>
                        <TabNavigationLink
                            asChild
                            active={activeTab === "overview"}
                            onClick={() => setActiveTab("overview")}
                        >
                            <button className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Overview
                            </button>
                        </TabNavigationLink>
                        <TabNavigationLink
                            asChild
                            active={activeTab === "access"}
                            onClick={() => setActiveTab("access")}
                        >
                            <button className="flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Access
                            </button>
                        </TabNavigationLink>
                        <TabNavigationLink
                            asChild
                            active={activeTab === "activity"}
                            onClick={() => setActiveTab("activity")}
                        >
                            <button className="flex items-center gap-2">
                                <Activity className="h-4 w-4" />
                                Activity
                            </button>
                        </TabNavigationLink>
                        <TabNavigationLink
                            asChild
                            active={activeTab === "requests"}
                            onClick={() => setActiveTab("requests")}
                        >
                            <button className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Requests
                            </button>
                        </TabNavigationLink>
                        <TabNavigationLink
                            asChild
                            active={activeTab === "visitors"}
                            onClick={() => setActiveTab("visitors")}
                        >
                            <button className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Visitors
                            </button>
                        </TabNavigationLink>
                    </TabNavigation>
                </div>
                
                <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                    {renderTabContent()}
                </div>
            </DialogContent>
        </Dialog>
    )
}
