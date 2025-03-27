"use client"

import { Badge, BadgeProps } from "@/components/Badge"
import { Usage } from "@/data/schema"
import { formatters } from "@/lib/utils"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { DataTableRowActions } from "./DataTableRowActions"

const columnHelper = createColumnHelper<Usage>()

export const columns = [
  columnHelper.accessor("requestSubmitted", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request submitted" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Request submitted",
    },
  }),
  columnHelper.accessor("requestedResource", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested resource" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left",
      displayName: "Requested resource",
    },
    filterFn: "arrIncludesSome",
  }),
  columnHelper.accessor("requestedDate", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested date" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left",
      displayName: "Requested date",
    },
  }),
  columnHelper.accessor("requestedTime", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested time" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Requested time",
    },
  }),
  columnHelper.accessor("requesterName", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requester name" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left",
      displayName: "Requester name",
    },
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left",
      displayName: "Email",
    },
  }),
  columnHelper.accessor("bookingInfo", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Booking info" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left",
      displayName: "Booking info",
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

      if (status === "Approved") {
        variant = "success"
      }

      return (
        <Badge variant={variant}>
          {status as React.ReactNode}
        </Badge>
      )
    },
  }),
  columnHelper.accessor("totalPrice", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total price" />
    ),
    enableSorting: true,
    meta: {
      className: "text-right",
      displayName: "Total price",
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
