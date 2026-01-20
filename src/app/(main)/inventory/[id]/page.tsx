"use client"

import { ServiceForm } from "@/components/ui/inventory/ServiceForm"
import { serviceInventory } from "@/data/data"
import { useParams } from "next/navigation"

export default function EditServicePage() {
  const params = useParams()
  const id = params.id as string

  // Find the service by ID
  const service = serviceInventory.find((s) => s.serviceId === id)

  if (!service) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-lg font-medium text-gray-900">Service not found</h2>
          <p className="text-sm text-gray-500 mt-1">
            The service with ID "{id}" could not be found.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <ServiceForm initialData={service} isEditing />
    </div>
  )
}
