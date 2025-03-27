"use client"

import { Badge, BadgeProps } from "@/components/Badge"
import { Visitor } from "@/data/schema"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { DataTableRowActions } from "./DataTableRowActions"

const columnHelper = createColumnHelper<Visitor>()

export const visitorColumns = [
    columnHelper.accessor("checkInTime", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Check-in time" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Check-in time",
        },
    }),
    columnHelper.accessor("visitorName", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Visitor name" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Visitor name",
        },
    }),
    columnHelper.accessor("company", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Company" />
        ),
        enableSorting: false,
        meta: {
            className: "text-left",
            displayName: "Company",
        },
    }),
    columnHelper.accessor("hostName", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Host" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Host",
        },
    }),
    columnHelper.accessor("purpose", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Purpose" />
        ),
        enableSorting: false,
        meta: {
            className: "text-left",
            displayName: "Purpose",
        },
    }),
    columnHelper.accessor("status", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        enableSorting: false,
        meta: {
            className: "text-left",
            displayName: "Status",
        },
        cell: ({ row }) => {
            const status = row.getValue("status")
            let variant: BadgeProps["variant"] = "default"

            if (status === "Checked In") {
                variant = "success"
            } else if (status === "Expected") {
                variant = "warning"
            }

            return (
                <Badge variant={variant}>
                    {status as React.ReactNode}
                </Badge>
            )
        },
    }),
    columnHelper.accessor("checkOutTime", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Check-out time" />
        ),
        enableSorting: true,
        meta: {
            className: "text-left",
            displayName: "Check-out time",
        },
    }),
    columnHelper.accessor("badgeNumber", {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Badge #" />
        ),
        enableSorting: false,
        meta: {
            className: "text-left",
            displayName: "Badge #",
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
] as ColumnDef<Visitor>[] 