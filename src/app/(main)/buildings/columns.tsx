"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

interface Building {
  id: string;
  name: string;
  imageUrl: string;
  location: string;
  type: string;
  floors: number;
  tenants: number;
  ths?: number;
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
    accessorKey: "ths",
    header: "THS",
    cell: ({ row }) => {
      const ths = row.getValue("ths") as number | undefined;
      if (ths === undefined) return <span className="text-gray-400">—</span>;

      let colorClass = "";
      if (ths >= 80) {
        colorClass = "text-green-600 dark:text-green-400";
      } else if (ths >= 60) {
        colorClass = "text-yellow-600 dark:text-yellow-400";
      } else {
        colorClass = "text-red-600 dark:text-red-400";
      }

      return (
        <span className={`font-medium ${colorClass}`}>
          {ths}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === "Active"
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
  {
    id: "actions",
    cell: ({ row }) => {
      const building = row.original;

      if (building.name === "75 State Street" && building.status === "Inactive") {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Complete assessment</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1000px] sm:h-[800px] p-4">
              <DialogHeader className="pb-2 mb-0">
                <DialogTitle>Building Assessment</DialogTitle>
                <DialogDescription className="mt-1">
                  Complete the assessment for 75 State Street to reactivate the building.
                </DialogDescription>
              </DialogHeader>
              <div className="h-[calc(100%-80px)] w-full mt-2">
                <iframe
                  src="https://hqo.leesmananalytics.com/assessment"
                  style={{ border: "none" }}
                  width="100%"
                  height="100%"
                  title="Building Assessment Form"
                  allow="camera; microphone; geolocation"
                />
              </div>
            </DialogContent>
          </Dialog>
        );
      }
      return null;
    },
  },
]; 