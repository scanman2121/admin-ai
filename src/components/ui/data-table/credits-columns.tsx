"use client"

import { Badge, BadgeProps } from "@/components/Badge"
import { Usage } from "@/data/schema"
import { formatters } from "@/lib/utils"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { DataTableRowActions } from "./DataTableRowActions"

const columnHelper = createColumnHelper<Usage>()

export const creditsColumns = [
    columnHelper.accessor("creditId", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Credit ID" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Credit ID",
        },
    }),
    columnHelper.accessor("transactionDate", {
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
    columnHelper.accessor("unitNumber", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Unit" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Unit",
        },
    }),
    columnHelper.accessor("tenantName", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tenant" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Tenant",
        },
    }),
    columnHelper.accessor("creditReason", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Reason" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Reason",
        },
    }),
    columnHelper.accessor("creditAmount", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Amount" />
        ),
        enableSorting: true,
        meta: {
            className: "text-right",
            displayName: "Amount",
        },
        cell: ({ getValue }) => {
            const value = getValue()
            return (
                <span className="font-medium">
                    {typeof value === 'number' ? formatters.currency(value) : '-'}
                </span>
            )
        },
    }),
    columnHelper.accessor("creditAppliedTo", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Applied to" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Applied to",
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

            if (status === "Approved") {
                variant = "success"
            } else if (status === "Pending") {
                variant = "warning"
            } else if (status === "Rejected") {
                variant = "error"
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
] as ColumnDef<Usage>[] 