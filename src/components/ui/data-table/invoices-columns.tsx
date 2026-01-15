"use client"

import { Badge, BadgeProps } from "@/components/Badge"
import { TenantInvoice } from "@/data/schema"
import { formatters } from "@/lib/utils"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { DataTableRowActions } from "./DataTableRowActions"

const columnHelper = createColumnHelper<TenantInvoice>()

export const invoicesColumns = [
    columnHelper.accessor("invoiceId", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Invoice ID" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Invoice ID",
        },
    }),
    columnHelper.accessor("invoiceDate", {
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
    columnHelper.accessor("amountDue", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Amount Due" />
        ),
        enableSorting: true,
        meta: {
            className: "text-right",
            displayName: "Amount Due",
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
    columnHelper.accessor("dueDate", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Due Date" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Due Date",
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

            if (status === "Paid") {
                variant = "success"
            } else if (status === "Pending") {
                variant = "warning"
            } else if (status === "Overdue") {
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
] as ColumnDef<TenantInvoice>[]
