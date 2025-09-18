"use client"

import { Button } from "@/components/Button"
import { Badge } from "@/components/ui/badge"
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

// Mock data for upcoming visits
const upcomingVisitsData = [
    {
        id: "1",
        visitor: "John Smith",
        dateTime: "Dec 15, 2024 2:00 PM",
        purpose: "Client Meeting"
    },
    {
        id: "2", 
        visitor: "Sarah Johnson",
        dateTime: "Dec 16, 2024 10:30 AM",
        purpose: "Project Review"
    }
]

// Mock data for service requests
const serviceRequestsData = [
    {
        id: "1",
        requestId: "REQ-2024-001",
        dateSubmitted: "Dec 8, 2024 9:30 AM",
        requestType: "New Employee Access",
        description: "Badge access for new hire Sarah Chen",
        status: "In Progress",
        assignee: "IT Security Team",
        priority: "High"
    },
    {
        id: "2",
        requestId: "REQ-2024-002", 
        dateSubmitted: "Nov 25, 2024 2:15 PM",
        requestType: "Access Modification",
        description: "Update access permissions for conference rooms",
        status: "Completed",
        assignee: "Facilities Team",
        priority: "Medium"
    },
    {
        id: "3",
        requestId: "REQ-2024-003",
        dateSubmitted: "Nov 20, 2024 11:45 AM",
        requestType: "Badge Replacement",
        description: "Replace lost access badge",
        status: "Completed",
        assignee: "Security Office",
        priority: "Low"
    },
    {
        id: "4",
        requestId: "REQ-2024-004",
        dateSubmitted: "Nov 15, 2024 4:20 PM",
        requestType: "Temporary Access",
        description: "Weekend access for project deadline",
        status: "Completed",
        assignee: "Building Manager",
        priority: "Medium"
    }
]

// Mock data for activity log
const activityData = [
    {
        id: "1",
        dateTime: "Dec 10, 2024 9:15 AM",
        action: "Access granted",
        accessPoint: "Main Entrance",
        details: "Badge scan successful"
    },
    {
        id: "2",
        dateTime: "Dec 10, 2024 9:14 AM",
        action: "Access granted", 
        accessPoint: "Parking Garage",
        details: "Mobile app access"
    },
    {
        id: "3",
        dateTime: "Dec 9, 2024 5:30 PM",
        action: "Access granted",
        accessPoint: "Main Entrance",
        details: "Badge scan successful"
    },
    {
        id: "4",
        dateTime: "Dec 9, 2024 8:45 AM",
        action: "Access granted",
        accessPoint: "Main Entrance", 
        details: "Badge scan successful"
    },
    {
        id: "5",
        dateTime: "Dec 8, 2024 6:15 PM",
        action: "Access denied",
        accessPoint: "Conference Room A",
        details: "Insufficient permissions"
    }
]

// Mock data for access information
const accessData = [
    {
        id: "1",
        userId: "376828",
        credential: "Awaiting user",
        device: "-",
        credStatus: "Awaiting user"
    },
    {
        id: "2",
        userId: "419902",
        credential: "324",
        device: "iOS - iPhone14.3",
        credStatus: "Issued"
    },
    {
        id: "3", 
        userId: "419903",
        credential: "525",
        device: "Android - Samsung Galaxy",
        credStatus: "Issued"
    }
]

// Define columns for activity table
const activityColumns = [
    {
        accessorKey: "dateTime",
        header: "Date and Time",
        cell: ({ row }: { row: any }) => {
            const dateTime = row.getValue("dateTime") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50 font-medium">
                    {dateTime}
                </span>
            );
        },
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }: { row: any }) => {
            const action = row.getValue("action") as string;
            const isGranted = action === "Access granted";
            return (
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isGranted ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-gray-900 dark:text-gray-50">
                        {action}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "accessPoint",
        header: "Access Point",
        cell: ({ row }: { row: any }) => {
            const accessPoint = row.getValue("accessPoint") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50">
                    {accessPoint}
                </span>
            );
        },
    },
    {
        accessorKey: "details",
        header: "Details",
        cell: ({ row }: { row: any }) => {
            const details = row.getValue("details") as string;
            return (
                <span className="text-gray-600 dark:text-gray-400">
                    {details}
                </span>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: any }) => {
            const rowId = row.original.id as string;
            
            // Third row (id: "3") gets "Remove access" button in red
            if (rowId === "3") {
                return (
                    <Button 
                        variant="destructive" 
                        size="sm"
                    >
                        Remove access
                    </Button>
                );
            }
            
            // Other rows get standard action buttons
            return (
                <Button 
                    variant="secondary" 
                    size="sm"
                >
                    View details
                </Button>
            );
        },
        enableSorting: false,
    },
]

// Define columns for service requests table
const serviceRequestColumns = [
    {
        accessorKey: "requestId",
        header: "Request ID",
        cell: ({ row }: { row: any }) => {
            const requestId = row.getValue("requestId") as string;
            return (
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {requestId}
                </span>
            );
        },
    },
    {
        accessorKey: "dateSubmitted",
        header: "Date Submitted",
        cell: ({ row }: { row: any }) => {
            const dateSubmitted = row.getValue("dateSubmitted") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50">
                    {dateSubmitted}
                </span>
            );
        },
    },
    {
        accessorKey: "requestType",
        header: "Request Type",
        cell: ({ row }: { row: any }) => {
            const requestType = row.getValue("requestType") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50 font-medium">
                    {requestType}
                </span>
            );
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }: { row: any }) => {
            const description = row.getValue("description") as string;
            return (
                <span className="text-gray-600 dark:text-gray-400">
                    {description}
                </span>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: any }) => {
            const status = row.getValue("status") as string;
            const getStatusBadge = (status: string) => {
                switch (status) {
                    case "In Progress":
                        return (
                            <Badge 
                                variant="default" 
                                className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30"
                            >
                                • {status}
                            </Badge>
                        );
                    case "Completed":
                        return (
                            <Badge 
                                variant="default" 
                                className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30"
                            >
                                • {status}
                            </Badge>
                        );
                    case "Pending":
                        return (
                            <Badge 
                                variant="default" 
                                className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800/30"
                            >
                                • {status}
                            </Badge>
                        );
                    default:
                        return <Badge variant="secondary">• {status}</Badge>;
                }
            };
            return getStatusBadge(status);
        },
    },
    {
        accessorKey: "assignee",
        header: "Assignee",
        cell: ({ row }: { row: any }) => {
            const assignee = row.getValue("assignee") as string;
            return (
                <span className="text-gray-600 dark:text-gray-400">
                    {assignee}
                </span>
            );
        },
    },
    {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }: { row: any }) => {
            const priority = row.getValue("priority") as string;
            const getPriorityBadge = (priority: string) => {
                switch (priority) {
                    case "High":
                        return (
                            <Badge 
                                variant="default" 
                                className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30"
                            >
                                {priority}
                            </Badge>
                        );
                    case "Medium":
                        return (
                            <Badge 
                                variant="default" 
                                className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800/30"
                            >
                                {priority}
                            </Badge>
                        );
                    case "Low":
                        return (
                            <Badge 
                                variant="default" 
                                className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800/30"
                            >
                                {priority}
                            </Badge>
                        );
                    default:
                        return <Badge variant="secondary">{priority}</Badge>;
                }
            };
            return getPriorityBadge(priority);
        },
    },
]

// Define columns for upcoming visits table
const visitsColumns = [
    {
        accessorKey: "visitor",
        header: "Visitor",
        cell: ({ row }: { row: any }) => {
            const visitor = row.getValue("visitor") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50 font-medium">
                    {visitor}
                </span>
            );
        },
    },
    {
        accessorKey: "dateTime",
        header: "Date and Time",
        cell: ({ row }: { row: any }) => {
            const dateTime = row.getValue("dateTime") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50">
                    {dateTime}
                </span>
            );
        },
    },
    {
        accessorKey: "purpose",
        header: "Purpose",
        cell: ({ row }: { row: any }) => {
            const purpose = row.getValue("purpose") as string;
            return (
                <span className="text-gray-600 dark:text-gray-400">
                    {purpose}
                </span>
            );
        },
    },
]

// Define columns for access table
const accessColumns = [
    {
        accessorKey: "userId",
        header: "User ID",
        cell: ({ row }: { row: any }) => {
            const userId = row.getValue("userId") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50 font-medium">
                    {userId}
                </span>
            );
        },
    },
    {
        accessorKey: "credential",
        header: "Credential",
        cell: ({ row }: { row: any }) => {
            const credential = row.getValue("credential") as string;
            return (
                <span className="text-gray-600 dark:text-gray-400">
                    {credential}
                </span>
            );
        },
    },
    {
        accessorKey: "device",
        header: "Device",
        cell: ({ row }: { row: any }) => {
            const device = row.getValue("device") as string;
            return (
                <span className="text-gray-900 dark:text-gray-50">
                    {device}
                </span>
            );
        },
    },
    {
        accessorKey: "credStatus",
        header: "Cred status",
        cell: ({ row }: { row: any }) => {
            const credStatus = row.getValue("credStatus") as string;
            const getCredStatusBadge = (status: string) => {
                switch (status) {
                    case "Issued":
                        return (
                            <Badge 
                                variant="default" 
                                className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30"
                            >
                                {status}
                            </Badge>
                        );
                    case "Awaiting user":
                        return (
                            <Badge 
                                variant="default" 
                                className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800/30"
                            >
                                {status}
                            </Badge>
                        );
                    default:
                        return <Badge variant="secondary">{status}</Badge>;
                }
            };
            return getCredStatusBadge(credStatus);
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: any }) => {
            const credStatus = row.original.credStatus as string;
            
            if (credStatus === "Awaiting user") {
                return (
                    <Button 
                        variant="secondary" 
                        size="sm"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                    >
                        View user in Origo
                    </Button>
                );
            }
            
            return (
                <Button 
                    variant="primary" 
                    size="sm"
                >
                    Activate access
                </Button>
            );
        },
        enableSorting: false,
    },
]

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

    const getAppUserStatusBadge = (acsStatus: string) => {
        // Determine app user status based on ACS status and other factors
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
                                        {getAppUserStatusBadge(user.acsStatus)}
                                        {getACSStatusBadge(user.acsStatus)}
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
