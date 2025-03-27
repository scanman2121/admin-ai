"use client"

import { Badge, BadgeProps } from "@/components/Badge"
import { Usage } from "@/data/schema"
import { formatters } from "@/lib/utils"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { DataTableRowActions } from "./DataTableRowActions"

const columnHelper = createColumnHelper<Usage>()

export const transactionsColumns = [
    columnHelper.accessor("transactionId", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Transaction ID" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Transaction ID",
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
    columnHelper.accessor("paymentType", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Payment type" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Payment type",
        },
    }),
    columnHelper.accessor("paymentMethod", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Method" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Method",
        },
    }),
    columnHelper.accessor("amount", {
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
    columnHelper.accessor("paymentStatus", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Status",
        },
        cell: ({ row }) => {
            const status = row.getValue("paymentStatus")
            let variant: BadgeProps["variant"] = "default"

            if (status === "Completed") {
                variant = "success"
            } else if (status === "Pending") {
                variant = "warning"
            } else if (status === "Failed") {
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