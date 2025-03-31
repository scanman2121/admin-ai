"use client";

import { Button } from "@/components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/Dropdown";
import { cn } from "@/lib/utils";
import { RiDownloadLine, RiMoreLine } from "@remixicon/react";
import { ColumnDef } from "@tanstack/react-table";

interface Document {
  id: string;
  name: string;
  type: string;
  documentType:
  | "Lease"
  | "Certificate of Insurance (COI)"
  | "Asset Valuation Report"
  | "Capital Expenditure (CapEx) Request"
  | "Financial Statements"
  | "Work Order"
  | "Maintenance Schedule"
  | "Inspection Report"
  | "Incident Report"
  | "Tenant Communication"
  | "Daily Activity Report (DAR)"
  | "Visitor Log"
  | "Access Control Records"
  | "Security Alert Notice";
  size: string;
  uploadedBy: string;
  uploadDate: string;
  status: string;
  building?: string;
  tenant?: string;
}

export const documentsColumns: ColumnDef<Document>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "documentType",
    header: "Document type",
    cell: ({ row }) => {
      const type = row.getValue("documentType") as string
      return (
        <span className="whitespace-nowrap">{type}</span>
      )
    },
  },
  {
    accessorKey: "building",
    header: "Building",
    cell: ({ row }) => {
      const building = row.getValue("building") as string | undefined
      return (
        <span className="text-gray-600 dark:text-gray-400">
          {building || "N/A"}
        </span>
      )
    },
  },
  {
    accessorKey: "tenant",
    header: "Tenant",
    cell: ({ row }) => {
      const tenant = row.getValue("tenant") as string | undefined
      return (
        <span className="text-gray-600 dark:text-gray-400">
          {tenant || "N/A"}
        </span>
      )
    },
  },
  {
    accessorKey: "type",
    header: "File type",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "uploadedBy",
    header: "Uploaded by",
  },
  {
    accessorKey: "uploadDate",
    header: "Upload date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <span className={cn(
          "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
          status.toLowerCase() === "active" && "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400",
          status.toLowerCase() === "pending" && "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
          status.toLowerCase() === "inactive" && "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
        )}>
          • {status}
        </span>
      )
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <RiDownloadLine className="size-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <RiMoreLine className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
]; 