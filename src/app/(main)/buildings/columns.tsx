"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
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
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Building Assessment</DialogTitle>
                <DialogDescription>
                  Complete the assessment for 75 State Street to reactivate the building.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-4">
                  <Label>1. What is the current condition of the building?</Label>
                  <RadioGroup defaultValue="good">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="excellent" id="condition-excellent" />
                      <Label htmlFor="condition-excellent">Excellent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="good" id="condition-good" />
                      <Label htmlFor="condition-good">Good</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fair" id="condition-fair" />
                      <Label htmlFor="condition-fair">Fair</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="poor" id="condition-poor" />
                      <Label htmlFor="condition-poor">Poor</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-4">
                  <Label>2. Are all safety systems operational?</Label>
                  <RadioGroup defaultValue="yes">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="safety-yes" />
                      <Label htmlFor="safety-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="safety-no" />
                      <Label htmlFor="safety-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-4">
                  <Label>3. What maintenance is required before reactivation?</Label>
                  <Textarea placeholder="List required maintenance tasks..." />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit assessment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      }
      return null;
    },
  },
]; 