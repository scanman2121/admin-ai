"use client";

import * as React from "react";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

interface Building {
  id: string;
  name: string;
  imageUrl: string;
  location: string;
  type: string;
  floors: number;
  tenants: number;
  status: string;
  lastUpdated: string;
}

export const buildingsColumns: ColumnDef<Building>[] = [
  {
    accessorKey: "name",
    header: "Building Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const imageUrl = row.original.imageUrl as string;

      return (
        <div className="flex items-center gap-3">
          <div className="relative size-8 overflow-hidden rounded-md">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <span>{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "floors",
    header: "Floors",
  },
  {
    accessorKey: "tenants",
    header: "Tenants",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            status === "Active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
  },
]; 