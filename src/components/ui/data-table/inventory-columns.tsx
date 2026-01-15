"use client"

import { Badge, BadgeProps } from "@/components/Badge"
import { ServiceInventory } from "@/data/schema"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { DataTableRowActions } from "./DataTableRowActions"

const columnHelper = createColumnHelper<ServiceInventory>()

export const inventoryColumns = [
    columnHelper.accessor("inventoryId", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Service ID" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Service ID",
        },
    }),
    columnHelper.accessor("dateCreated", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Date",
        },
    }),
    columnHelper.accessor("propertyName", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Property" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Property",
        },
    }),
    columnHelper.accessor("serviceType", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Service Type" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Service Type",
        },
    }),
    columnHelper.accessor("description", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Description" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Description",
        },
    }),
    columnHelper.accessor("requestedBy", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Requested By" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Requested By",
        },
    }),
    columnHelper.accessor("quantity", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Quantity" />
        ),
        enableSorting: true,
        meta: {
            className: "text-right",
            displayName: "Quantity",
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
            const status = row.getValue("status")
            let variant: BadgeProps["variant"] = "default"

            if (status === "Completed") {
                variant = "success"
            } else if (status === "In Progress") {
                variant = "warning"
            } else if (status === "Pending") {
                variant = "default"
            }

            return (
                <Badge variant={variant}>
                    {status as React.ReactNode}
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
