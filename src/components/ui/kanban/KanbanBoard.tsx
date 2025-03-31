"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { RiBuilding4Line } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"

// Define the stages for the tenant lifecycle
export const TENANT_LIFECYCLE_STAGES = {
    NEW_PROSPECT: "New prospect",
    TOUR: "Tour",
    NEGOTIATION: "Negotiation",
    SIGN_OFF: "Sign off",
    FIT_OUT: "Fit out",
    ONBOARD: "Onboard",
    ACTIVE_TENANT: "Active tenant"
} as const

// Type for a tenant in the Kanban board
interface KanbanTenant {
    id: string
    name: string
    logo: string
    space: string
    floor: string
    stage: keyof typeof TENANT_LIFECYCLE_STAGES
    updatedAt: string
    assignedTo?: {
        name: string
        avatar: string
    }
}

// Mock data for the Kanban board
const mockTenants: KanbanTenant[] = [
    {
        id: "1",
        name: "Acme Corporation",
        logo: "https://ui-avatars.com/api/?name=Acme+Corporation&background=0D9488&color=fff",
        space: "5,000 sqft",
        floor: "15th Floor",
        stage: "NEW_PROSPECT",
        updatedAt: "2024-03-26",
        assignedTo: {
            name: "Chris Scanlon",
            avatar: "https://ui-avatars.com/api/?name=Chris+Scanlon&background=6366F1&color=fff"
        }
    },
    {
        id: "2",
        name: "Global Enterprises",
        logo: "https://ui-avatars.com/api/?name=Global+Enterprises&background=6366F1&color=fff",
        space: "8,000 sqft",
        floor: "20th Floor",
        stage: "TOUR",
        updatedAt: "2024-03-25"
    },
    {
        id: "3",
        name: "Tech Innovators",
        logo: "https://ui-avatars.com/api/?name=Tech+Innovators&background=8B5CF6&color=fff",
        space: "12,000 sqft",
        floor: "10th Floor",
        stage: "NEGOTIATION",
        updatedAt: "2024-03-24",
        assignedTo: {
            name: "Lis T",
            avatar: "https://ui-avatars.com/api/?name=Lis+T&background=8B5CF6&color=fff"
        }
    }
]

// Get tenants for a specific stage
const getTenantsByStage = (tenants: KanbanTenant[], stage: keyof typeof TENANT_LIFECYCLE_STAGES) => {
    return tenants.filter(tenant => tenant.stage === stage)
}

// Get background color for stage
const getStageColor = (stage: keyof typeof TENANT_LIFECYCLE_STAGES) => {
    switch (stage) {
        case "NEW_PROSPECT":
            return "bg-blue-50 dark:bg-blue-950"
        case "TOUR":
            return "bg-purple-50 dark:bg-purple-950"
        case "NEGOTIATION":
            return "bg-indigo-50 dark:bg-indigo-950"
        case "SIGN_OFF":
            return "bg-green-50 dark:bg-green-950"
        case "FIT_OUT":
            return "bg-amber-50 dark:bg-amber-950"
        case "ONBOARD":
            return "bg-teal-50 dark:bg-teal-950"
        case "ACTIVE_TENANT":
            return "bg-emerald-50 dark:bg-emerald-950"
        default:
            return "bg-gray-50 dark:bg-gray-950"
    }
}

export function KanbanBoard() {
    return (
        <div className="flex gap-6 overflow-x-auto pb-6">
            {Object.entries(TENANT_LIFECYCLE_STAGES).map(([key, title]) => (
                <div key={key} className="w-[350px] shrink-0">
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-gray-50">{title}</h3>
                        <Badge variant="outline" className="font-normal">
                            {getTenantsByStage(mockTenants, key as keyof typeof TENANT_LIFECYCLE_STAGES).length}
                        </Badge>
                    </div>
                    <div className={`rounded-lg p-4 ${getStageColor(key as keyof typeof TENANT_LIFECYCLE_STAGES)}`}>
                        <div className="space-y-3">
                            {getTenantsByStage(mockTenants, key as keyof typeof TENANT_LIFECYCLE_STAGES).map(tenant => (
                                <Link key={tenant.id} href={`/tenants/${tenant.id}`}>
                                    <Card className="p-4 hover:bg-accent/5 transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="relative shrink-0">
                                                <div className="size-10 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center">
                                                    <Image
                                                        src={tenant.logo}
                                                        alt={tenant.name}
                                                        width={24}
                                                        height={24}
                                                        className="rounded object-contain"
                                                    />
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 size-4 bg-green-500 rounded-full flex items-center justify-center">
                                                    <RiBuilding4Line className="size-2.5 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 dark:text-gray-50 truncate">
                                                    {tenant.name}
                                                </p>
                                                <div className="mt-1 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                                    <span>{tenant.space}</span>
                                                    <span>{tenant.floor}</span>
                                                </div>
                                                <div className="mt-3 flex items-center justify-between">
                                                    <span className="text-xs text-gray-500">
                                                        Updated {tenant.updatedAt}
                                                    </span>
                                                    {tenant.assignedTo && (
                                                        <div className="flex items-center gap-1.5">
                                                            <Image
                                                                src={tenant.assignedTo.avatar}
                                                                alt={tenant.assignedTo.name}
                                                                width={20}
                                                                height={20}
                                                                className="rounded-full"
                                                            />
                                                            <span className="text-xs text-gray-500">{tenant.assignedTo.name}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
} 