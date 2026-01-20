"use client"

import { Badge, BadgeProps } from "@/components/Badge"
import { ServiceInventory } from "@/data/schema"
import { formatters } from "@/lib/utils"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { DataTableRowActions } from "./DataTableRowActions"

const columnHelper = createColumnHelper<ServiceInventory>()

export const inventoryColumns = [
    columnHelper.accessor("serviceId", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Service ID" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Service ID",
        },
    }),
    columnHelper.accessor("serviceName", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Service Name" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Service Name",
        },
    }),
    columnHelper.accessor("category", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Category",
        },
    }),
    columnHelper.accessor("priceType", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price Type" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Price Type",
        },
        cell: ({ row }) => {
            const priceType = row.getValue("priceType") as string
            let variant: BadgeProps["variant"] = "default"
            let label = priceType

            if (priceType === "fixed") {
                variant = "default"
                label = "Fixed"
            } else if (priceType === "quote") {
                variant = "warning"
                label = "Quote Required"
            } else if (priceType === "free") {
                variant = "success"
                label = "Free"
            }

            return <Badge variant={variant}>{label}</Badge>
        },
    }),
    columnHelper.accessor("basePrice", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Base Price" />
        ),
        enableSorting: true,
        meta: {
            className: "text-right",
            displayName: "Base Price",
        },
        cell: ({ row }) => {
            const price = row.getValue("basePrice") as number | null
            const priceType = row.original.priceType

            if (priceType === "free") {
                return <span className="text-gray-500">-</span>
            }

            if (price === null) {
                return <span className="text-gray-500">Quote</span>
            }

            return (
                <span className="font-medium">
                    {formatters.currency(price)}
                </span>
            )
        },
    }),
    columnHelper.accessor("property", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Property" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Property",
        },
    }),
    columnHelper.accessor("status", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Status",
        },
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            let variant: BadgeProps["variant"] = "default"

            if (status === "active") {
                variant = "success"
            } else if (status === "inactive") {
                variant = "default"
            }

            return (
                <Badge variant={variant}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
            )
        },
    }),
    columnHelper.display({
        id: "actions",
        header: "",
        enableSorting: false,
        enableHiding: false,
        meta: {
            className: "text-right",
            displayName: "Actions",
        },
        cell: ({ row }) => <DataTableRowActions row={row} />,
    }),
] as ColumnDef<ServiceInventory>[]
