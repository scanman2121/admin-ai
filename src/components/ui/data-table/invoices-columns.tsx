"use client"

import { Badge, BadgeProps } from "@/components/Badge"
import { InvoiceType, TenantInvoice } from "@/data/schema"
import { formatters } from "@/lib/utils"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { DataTableRowActions } from "./DataTableRowActions"

const columnHelper = createColumnHelper<TenantInvoice>()

const invoiceTypeLabels: Record<InvoiceType, string> = {
    service_request: "Service Request",
    resource_booking: "Resource Booking",
    event_registration: "Event Registration",
    manual: "Manual",
    recurring: "Recurring",
}

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
    columnHelper.accessor("invoiceType", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Type" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Type",
        },
        cell: ({ getValue }) => {
            const type = getValue() as InvoiceType
            return <span>{invoiceTypeLabels[type] || type}</span>
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
    columnHelper.accessor("total", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Total" />
        ),
        enableSorting: true,
        meta: {
            className: "text-right",
            displayName: "Total",
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
            let label = status

            if (status === "paid") {
                variant = "success"
                label = "Paid"
            } else if (status === "pending") {
                variant = "warning"
                label = "Pending"
            } else if (status === "overdue") {
                variant = "error"
                label = "Overdue"
            } else if (status === "draft") {
                variant = "default"
                label = "Draft"
            } else if (status === "void") {
                variant = "default"
                label = "Void"
            }

            return (
                <Badge variant={variant}>
                    {label}
                </Badge>
            )
        },
    }),
    columnHelper.accessor("paymentMethod", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Payment Method" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Payment Method",
        },
        cell: ({ getValue }) => {
            const method = getValue()
            if (!method) {
                return <span className="text-gray-400">-</span>
            }

            const labels: Record<string, string> = {
                stripe: "Stripe",
                manual: "Manual",
                external: "External",
            }

            return <span>{labels[method] || method}</span>
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
