"use client"

import { ServiceForm } from "@/components/ui/inventory/ServiceForm"
import { serviceInventory } from "@/data/data"
import { notFound } from "next/navigation"
import { use } from "react"

interface EditServicePageProps {
  params: Promise<{ id: string }>
}

export default function EditServicePage({ params }: EditServicePageProps) {
  const { id } = use(params)

  // Find the service by ID
  const service = serviceInventory.find((s) => s.serviceId === id)

  if (!service) {
    notFound()
  }

  return (
    <div className="p-6">
      <ServiceForm initialData={service} isEditing />
    </div>
  )
}
