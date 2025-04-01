"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Space } from "./data";

export const spacesColumns: ColumnDef<Space>[] = [
    {
        accessorKey: "name",
        header: "Space Name",
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
        accessorKey: "building",
        header: "Building",
    },
    {
        accessorKey: "floor",
        header: "Floor",
        cell: ({ row }) => {
            const floor = row.getValue("floor") as number;
            return <span>{floor}{floor === 1 ? "st" : floor === 2 ? "nd" : floor === 3 ? "rd" : "th"} Floor</span>;
        },
    },
    {
        accessorKey: "squareFeet",
        header: "Square Feet",
        cell: ({ row }) => {
            const squareFeet = row.getValue("squareFeet") as number;
            return <span>{squareFeet.toLocaleString()} sq ft</span>;
        },
    },
    {
        accessorKey: "occupancyStatus",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("occupancyStatus") as "Occupied" | "Vacant";
            return (
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === "Occupied"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    }`}>
                    {status}
                </span>
            );
        },
    },
    {
        accessorKey: "tenant",
        header: "Tenant",
        cell: ({ row }) => {
            const tenant = row.getValue("tenant") as string | undefined;
            return tenant || "-";
        },
    },
    {
        accessorKey: "monthlyRate",
        header: "Monthly Rate",
        cell: ({ row }) => {
            const monthlyRate = row.getValue("monthlyRate") as number;
            return <span>${monthlyRate.toLocaleString()}</span>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const router = useRouter();
            const space = row.original;

            if (space.occupancyStatus === "Vacant") {
                return (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/asset-manager/overview/prospects?space=${space.id}`)}
                    >
                        View prospects
                    </Button>
                );
            }
            return null;
        },
    },
]; 