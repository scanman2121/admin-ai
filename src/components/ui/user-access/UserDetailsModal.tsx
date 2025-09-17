"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/Button"
import { Badge } from "@/components/ui/badge"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { X, Calendar, Shield, User, Activity, FileText } from "lucide-react"

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

export function UserDetailsModal({ isOpen, onClose, user }: UserDetailsModalProps) {
    const [activeTab, setActiveTab] = useState("overview")

    if (!user) return null

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return (
                    <Badge 
                        variant="default" 
                        className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30"
                    >
                        Active
                    </Badge>
                );
            case "not-in-acs":
                return <Badge variant="destructive">Not in ACS</Badge>;
            case "revoked":
                return <Badge variant="destructive">Revoked</Badge>;
            default:
                return <Badge variant="secondary">Unknown</Badge>;
        }
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case "access":
                return (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full">
                        <div className="p-6">
                            <DataTable
                                columns={accessColumns}
                                data={accessData}
                                searchKey="userId"
                            />
                        </div>
                    </div>
                )
            case "activity":
                return (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full">
                        <div className="p-6">
                            <DataTable
                                columns={activityColumns}
                                data={activityData}
                                searchKey="action"
                            />
                        </div>
                    </div>
                )
            case "requests":
                return (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full">
                        <div className="p-6">
                            <DataTable
                                columns={serviceRequestColumns}
                                data={serviceRequestsData}
                                searchKey="requestType"
                            />
                        </div>
                    </div>
                )
            case "visitors":
                return (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full">
                        <div className="p-6">
                            {upcomingVisitsData.length > 0 ? (
                                <DataTable
                                    columns={visitsColumns}
                                    data={upcomingVisitsData}
                                    searchKey="visitor"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <X className="h-12 w-12 text-gray-400 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                                        No visitors
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
                                        No visitors were found. Visitors will appear here after they're registered
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )
            case "overview":
                return (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full">
                        <div className="p-6">
                            {/* Service Request Banner */}
                            {user.serviceRequest !== "No open requests" && (
                                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                                Current Service Request
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
                                        <Button 
                                            variant="secondary"
                                            className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                                        >
                                            Mark as Completed
                                        </Button>
                                    </div>
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Full Name
                                        </label>
                                        <div className="mt-1 text-sm text-gray-900 dark:text-gray-50">
                                            {user.name}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Email Address
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
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Location
                                        </label>
                                        <div className="mt-1 text-sm text-gray-900 dark:text-gray-50">
                                            {user.floorSuite}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Access Status
                                        </label>
                                        <div className="mt-1">
                                            {getStatusBadge(user.acsStatus)}
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
                    </div>
                )
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
                                    {getStatusBadge(user.acsStatus)}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {user.company} • {user.email}
                                </p>
                            </div>
                        </div>
                        <div className="mr-8">
                            <Button variant="secondary" size="sm">
                                View Full Profile
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
