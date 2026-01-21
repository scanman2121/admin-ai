"use client"

import { Badge } from "@/components/Badge"
import { InvoiceSource } from "@/data/schema"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

interface SourceCardProps {
  source: InvoiceSource
}

const sourceTypeLabels: Record<string, string> = {
  service_request: "Service Request",
  resource_booking: "Resource Booking",
  event_registration: "Event Registration",
}

const sourceLinks: Record<string, string> = {
  service_request: "/operations/service-requests",
  resource_booking: "/operations/resource-booking",
  event_registration: "/engage/events",
}

export function SourceCard({ source }: SourceCardProps) {
  const linkBase = sourceLinks[source.type] || "#"
  const linkHref = source.sourceId ? `${linkBase}/${source.sourceId}` : linkBase

  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            {sourceTypeLabels[source.type] || source.type}
          </p>
          <Link
            href={linkHref}
            className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
          >
            {source.sourceName || source.sourceId}
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
        {source.sourceStatus && (
          <Badge
            variant={
              source.sourceStatus === "Completed"
                ? "success"
                : source.sourceStatus === "Cancelled"
                ? "error"
                : source.sourceStatus === "Confirmed"
                ? "success"
                : "default"
            }
          >
            {source.sourceStatus}
          </Badge>
        )}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
        {source.sourceDate && (
          <div>
            <span className="text-gray-500">Date:</span>{" "}
            <span className="text-gray-900">{source.sourceDate}</span>
          </div>
        )}
        {source.sourceRequestor && (
          <div>
            <span className="text-gray-500">Requestor:</span>{" "}
            <span className="text-gray-900">{source.sourceRequestor}</span>
          </div>
        )}
      </div>
    </div>
  )
}
