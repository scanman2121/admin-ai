"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { equipment, type Equipment } from "@/data/equipment"
import { getRelativeTime } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { QrCode, Clock, Calendar, AlertTriangle } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

const getHealthStatusBadge = (status: Equipment["healthStatus"]) => {
    switch (status) {
        case "excellent":
            return <Badge variant="success">• Excellent</Badge>
        case "good":
            return <Badge variant="default">• Good</Badge>
        case "fair":
            return <Badge variant="warning">• Fair</Badge>
        case "poor":
            return <Badge variant="warning">• Poor</Badge>
        case "critical":
            return <Badge variant="error">• Critical</Badge>
        default:
            return <Badge variant="default">• Unknown</Badge>
    }
}

const getStatusBadge = (status: Equipment["status"]) => {
    switch (status) {
        case "active":
            return <Badge variant="success">• Active</Badge>
        case "inactive":
            return <Badge variant="default">• Inactive</Badge>
        case "maintenance":
            return <Badge variant="warning">• Maintenance</Badge>
        case "retired":
            return <Badge variant="error">• Retired</Badge>
        default:
            return <Badge variant="default">• Unknown</Badge>
    }
}

const createEquipmentColumns = (onRowClick: (equipment: Equipment) => void): ColumnDef<Equipment>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
                onClick={(e) => e.stopPropagation()}
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Equipment" />
        ),
        cell: ({ row }) => {
            const equipment = row.original
            return (
                <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-50 mb-1">
                        {equipment.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <span>{equipment.type}</span>
                        {equipment.qrCode && (
                            <span className="flex items-center gap-1">
                                <QrCode className="h-3 w-3" />
                                {equipment.qrCode}
                            </span>
                        )}
                    </div>
                </div>
            )
        },
        meta: {
            displayName: "Equipment",
            className: "w-72 min-w-72",
        },
        enableSorting: true,
    },
    {
        accessorKey: "location",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Location" />
        ),
        cell: ({ row }) => {
            const equipment = row.original
            return (
                <div>
                    <div className="font-medium text-gray-900 dark:text-gray-50">
                        {equipment.building}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Floor {equipment.floor} • {equipment.room}
                    </div>
                </div>
            )
        },
        meta: {
            displayName: "Location",
        },
        enableSorting: true,
    },
    {
        accessorKey: "healthStatus",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Health" />
        ),
        cell: ({ row }) => {
            const equipment = row.original
            return (
                <div className="space-y-1">
                    {getHealthStatusBadge(equipment.healthStatus)}
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        Score: {equipment.healthScore}/100
                    </div>
                </div>
            )
        },
        meta: {
            displayName: "Health",
        },
        enableSorting: true,
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = row.getValue("status") as Equipment["status"]
            return getStatusBadge(status)
        },
        meta: {
            displayName: "Status",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
        enableSorting: true,
    },
    {
        accessorKey: "nextMaintenanceDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Next Maintenance" />
        ),
        cell: ({ row }) => {
            const date = row.getValue("nextMaintenanceDate") as string | undefined
            if (!date) return <span className="text-gray-400">-</span>
            
            const maintenanceDate = new Date(date)
            const today = new Date()
            const daysUntil = Math.ceil((maintenanceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
            
            let icon = null
            let colorClass = "text-gray-600 dark:text-gray-400"
            
            if (daysUntil < 0) {
                icon = <AlertTriangle className="h-3 w-3 text-red-500" />
                colorClass = "text-red-600 dark:text-red-400"
            } else if (daysUntil <= 7) {
                icon = <Clock className="h-3 w-3 text-orange-500" />
                colorClass = "text-orange-600 dark:text-orange-400"
            } else if (daysUntil <= 30) {
                icon = <Clock className="h-3 w-3 text-yellow-500" />
                colorClass = "text-yellow-600 dark:text-yellow-400"
            }
            
            return (
                <div className={`flex items-center gap-1 ${colorClass}`}>
                    {icon}
                    <span>{new Date(date).toLocaleDateString()}</span>
                    {daysUntil >= 0 && (
                        <span className="text-xs">({daysUntil} days)</span>
                    )}
                </div>
            )
        },
        meta: {
            displayName: "Next Maintenance",
        },
        enableSorting: true,
    },
    {
        accessorKey: "serviceHistoryCount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Service History" />
        ),
        cell: ({ row }) => {
            const count = row.getValue("serviceHistoryCount") as number
            const openRequests = row.original.openServiceRequestsCount
            return (
                <div>
                    <div className="text-sm text-gray-900 dark:text-gray-50">
                        {count} completed
                    </div>
                    {openRequests > 0 && (
                        <div className="text-xs text-orange-600 dark:text-orange-400">
                            {openRequests} open request{openRequests !== 1 ? "s" : ""}
                        </div>
                    )}
                </div>
            )
        },
        meta: {
            displayName: "Service History",
        },
        enableSorting: true,
    },
    {
        accessorKey: "assignedTeam",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Assigned Team" />
        ),
        cell: ({ row }) => {
            const team = row.getValue("assignedTeam") as string | undefined
            return <span className="text-gray-600 dark:text-gray-400">{team || "-"}</span>
        },
        meta: {
            displayName: "Assigned Team",
        },
        enableSorting: true,
    },
    {
        accessorKey: "lastUpdated",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Last updated" />
        ),
        cell: ({ row }) => {
            const lastUpdated = row.getValue("lastUpdated") as string
            return <span className="text-gray-600 dark:text-gray-400">{getRelativeTime(lastUpdated)}</span>
        },
        meta: {
            displayName: "Last updated",
        },
        enableSorting: true,
    },
    // Hidden columns for filtering
    {
        accessorKey: "type",
        header: "Type",
        cell: () => null,
        meta: {
            displayName: "Type",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
    {
        accessorKey: "building",
        header: "Building",
        cell: () => null,
        meta: {
            displayName: "Building",
        },
        filterFn: "equals" as const,
        enableColumnFilter: true,
    },
]

export default function EquipmentPage() {
    const [data] = useState(equipment)
    const router = useRouter()

    const handleRowClick = (equipment: Equipment) => {
        router.push(`/operations/service-requests/equipment/${equipment.id}`)
    }

    const equipmentColumns = createEquipmentColumns(handleRowClick)

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                        Equipment & Assets
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Manage building equipment, track maintenance, and monitor health status
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button 
                        variant="secondary"
                        onClick={() => router.push('/operations/service-requests/equipment/schedule')}
                    >
                        <Calendar className="h-4 w-4 mr-2" />
                        Maintenance schedules
                    </Button>
                    <Button onClick={() => router.push('/operations/service-requests/equipment/new')}>
                        Add equipment
                    </Button>
                </div>
            </div>

            <DataTable
                columns={equipmentColumns}
                data={data}
                onRowClick={handleRowClick}
                searchKey="name"
            />
        </div>
    )
}

