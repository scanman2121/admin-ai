"use client"

import { InteriorDetailsLayout } from "@/components/layouts/InteriorDetailsLayout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MultiSelect, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RiAddLine, RiDeleteBinLine, RiDragMoveLine, RiImageAddLine } from "@remixicon/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"

// Available buildings
const buildings = [
  { value: "125-highland", label: "125 Highland Ave" },
  { value: "200-broadway", label: "200 Broadway" },
  { value: "500-tech-square", label: "500 Tech Square" },
]

// Available space types
const spaceTypes = [
  { value: "conference-room", label: "Conference Room" },
  { value: "office", label: "Office" },
  { value: "desk", label: "Desk" },
  { value: "common-area", label: "Common Area" },
]

// Available access groups
const accessGroups = [
  "All Employees",
  "Executive Team",
  "Board Members",
  "Sales Team",
  "Engineering Team",
  "HR Team",
]

// Available amenity icons
const amenityIcons = [
  { value: "tv", label: "TV/Display" },
  { value: "video-camera", label: "Video Camera" },
  { value: "wireless", label: "Wireless" },
  { value: "lightbulb", label: "Lighting" },
  { value: "temperature", label: "Temperature" },
  { value: "coffee", label: "Coffee Machine" },
  { value: "printer", label: "Printer" },
  { value: "whiteboard", label: "Whiteboard" },
  { value: "phone", label: "Phone" },
  { value: "wifi", label: "WiFi" },
]

// Days of the week
const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const

interface Amenity {
  name: string
  icon: string
}

interface SpaceData {
  id: string
  name: string
  images: {
    url: string
    isPrimary: boolean
  }[]
  building: string
  type: string
  capacity: number
  description: string
  amenities: Amenity[]
  accessControl: {
    accessGroups: string[]
    schedule: {
      [key in typeof daysOfWeek[number]]: {
        start: string
        end: string
      }
    }
    accessMethod: string
  }
}

// Empty initial state for a new space
const emptySpaceData: SpaceData = {
  id: "",
  name: "",
  images: [],
  building: "",
  type: "",
  capacity: 0,
  description: "",
  amenities: [],
  accessControl: {
    accessGroups: [],
    schedule: {
      monday: { start: "09:00", end: "17:00" },
      tuesday: { start: "09:00", end: "17:00" },
      wednesday: { start: "09:00", end: "17:00" },
      thursday: { start: "09:00", end: "17:00" },
      friday: { start: "09:00", end: "17:00" },
      saturday: { start: "", end: "" },
      sunday: { start: "", end: "" },
    },
    accessMethod: "Mobile App, Key Card",
  }
}

export default function NewSpace() {
  const [spaceData, setSpaceData] = useState<SpaceData>(emptySpaceData)
  const [isDragging, setIsDragging] = useState(false)
  const router = useRouter()

  // Breadcrumbs for the new space page
  const breadcrumbs = [
    { name: "Spaces", href: "/spaces" },
    { name: "New Space", href: "/spaces/new" },
  ]

  const handleInputChange = (field: string, value: string | number | string[]) => {
    setSpaceData(prev => {
      const fields = field.split('.')
      if (fields.length === 1) {
        return {
          ...prev,
          [field]: value
        }
      }

      let current = prev as any
      for (let i = 0; i < fields.length - 1; i++) {
        current = current[fields[i]]
      }
      current[fields[fields.length - 1]] = value
      return { ...prev }
    })
  }

  const handleScheduleChange = (day: typeof daysOfWeek[number], field: 'start' | 'end', value: string) => {
    setSpaceData(prev => ({
      ...prev,
      accessControl: {
        ...prev.accessControl,
        schedule: {
          ...prev.accessControl.schedule,
          [day]: {
            ...prev.accessControl.schedule[day],
            [field]: value
          }
        }
      }
    }))
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    if (spaceData.images.length + files.length > 5) {
      alert("You can only upload up to 5 images")
      return
    }

    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSpaceData(prev => ({
          ...prev,
          images: [
            ...prev.images,
            {
              url: reader.result as string,
              isPrimary: prev.images.length === 0 // First image is primary
            }
          ]
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length === 0) return
    if (spaceData.images.length + files.length > 5) {
      alert("You can only upload up to 5 images")
      return
    }

    files.forEach(file => {
      if (!file.type.startsWith('image/')) return

      const reader = new FileReader()
      reader.onloadend = () => {
        setSpaceData(prev => ({
          ...prev,
          images: [
            ...prev.images,
            {
              url: reader.result as string,
              isPrimary: prev.images.length === 0
            }
          ]
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setSpaceData(prev => {
      const newImages = prev.images.filter((_, i) => i !== index)
      // If we removed the primary image, make the first image primary
      if (prev.images[index].isPrimary && newImages.length > 0) {
        newImages[0].isPrimary = true
      }
      return {
        ...prev,
        images: newImages
      }
    })
  }

  const setPrimaryImage = (index: number) => {
    setSpaceData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isPrimary: i === index
      }))
    }))
  }

  const handleAmenityChange = (index: number, field: 'name' | 'icon', value: string) => {
    setSpaceData(prev => {
      const newAmenities = [...prev.amenities]
      newAmenities[index] = {
        ...newAmenities[index],
        [field]: value
      }
      return { ...prev, amenities: newAmenities }
    })
  }

  const addAmenity = () => {
    setSpaceData(prev => ({
      ...prev,
      amenities: [...prev.amenities, { name: "", icon: "tv" }]
    }))
  }

  const handleCreate = async () => {
    // TODO: Implement space creation API call
    console.log("Creating space:", spaceData)
    // After successful creation, redirect to the spaces list
    router.push('/spaces')
  }

  return (
    <InteriorDetailsLayout
      title="New Space"
      breadcrumbs={breadcrumbs}
      ctaLabel="Create"
      onCtaClick={handleCreate}
      status={{
        label: "Draft",
        variant: 'inactive'
      }}
    >
      {/* Overview Section */}
      <Card id="overview">
        <div className="p-6">
          <h2 className="mb-6 text-lg font-medium text-gray-900 dark:text-white">Overview</h2>
          <div className="grid gap-6">
            {/* Space Name and Description */}
            <div className="grid gap-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">Space name</label>
                <Input
                  name="name"
                  value={spaceData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                  placeholder="Enter space name"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">Description</label>
                <Textarea
                  name="description"
                  value={spaceData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
                  placeholder="Enter space description"
                />
              </div>
            </div>

            {/* Building, Type, and Capacity */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">Building</label>
                <Select
                  value={spaceData.building}
                  onValueChange={(value) => handleInputChange('building', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select building" />
                  </SelectTrigger>
                  <SelectContent>
                    {buildings.map((building) => (
                      <SelectItem key={building.value} value={building.value}>
                        {building.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">Space type</label>
                <Select
                  value={spaceData.type}
                  onValueChange={(value) => handleInputChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select space type" />
                  </SelectTrigger>
                  <SelectContent>
                    {spaceTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">Capacity</label>
                <Input
                  type="number"
                  value={spaceData.capacity}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('capacity', parseInt(e.target.value))}
                  placeholder="Enter capacity"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-500">Space Images</label>
                <span className="text-xs text-gray-400">{spaceData.images.length}/5 images</span>
              </div>

              <div className="grid grid-cols-5 gap-4">
                {/* Image Upload Slots */}
                {Array.from({ length: 5 }).map((_, index) => {
                  const image = spaceData.images[index]

                  if (image) {
                    return (
                      <div
                        key={index}
                        className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
                      >
                        <Image
                          src={image.url}
                          alt={`Space image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                          <div className="flex flex-col items-center gap-2">
                            {!image.isPrimary && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setPrimaryImage(index)}
                                className="text-white hover:bg-white/20"
                              >
                                <RiDragMoveLine className="size-4" />
                                <span className="ml-2">Set as Primary</span>
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeImage(index)}
                              className="text-red-400 hover:bg-red-500/20 hover:text-red-300"
                            >
                              <RiDeleteBinLine className="size-4" />
                              <span className="ml-2">Remove</span>
                            </Button>
                          </div>
                        </div>
                        {image.isPrimary && (
                          <div className="absolute left-2 top-2 rounded-full bg-white px-2 py-1 text-xs font-medium text-gray-900">
                            Primary
                          </div>
                        )}
                      </div>
                    )
                  }

                  return (
                    <div
                      key={index}
                      className={`relative aspect-square overflow-hidden rounded-lg border-2 border-dashed transition-colors ${isDragging
                        ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950"
                        : "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
                        }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2">
                        <RiImageAddLine className="size-8 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {index === 0 ? "Add primary image" : "Add image"}
                        </span>
                        <span className="text-xs text-gray-400">
                          Drag & drop or click to upload
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Access Control Section */}
      <Card id="access-control">
        <div className="p-6">
          <h2 className="mb-6 text-lg font-medium text-gray-900 dark:text-white">Access Control</h2>
          <div className="grid gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-500">Access groups</label>
              <MultiSelect
                value={spaceData.accessControl.accessGroups}
                onValueChange={(value) => handleInputChange('accessControl.accessGroups', value)}
                options={accessGroups}
                placeholder="Select access groups"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-500">Hours of Operation</label>
              <div className="space-y-4">
                {daysOfWeek.map((day) => (
                  <div key={day} className="grid grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium capitalize">{day}</span>
                    </div>
                    <div>
                      <Input
                        type="time"
                        value={spaceData.accessControl.schedule[day].start}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleScheduleChange(day, 'start', e.target.value)}
                      />
                    </div>
                    <div>
                      <Input
                        type="time"
                        value={spaceData.accessControl.schedule[day].end}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleScheduleChange(day, 'end', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-500">Access method</label>
              <Select
                value={spaceData.accessControl.accessMethod}
                onValueChange={(value) => handleInputChange('accessControl.accessMethod', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select access method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="keycard">Keycard</SelectItem>
                  <SelectItem value="code">Access Code</SelectItem>
                  <SelectItem value="biometric">Biometric</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Amenities Section */}
      <Card id="amenities">
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Amenities</h2>
            <Button variant="default" size="sm" onClick={addAmenity}>
              <RiAddLine className="mr-2 size-4" />
              Add Amenity
            </Button>
          </div>
          <div className="space-y-4">
            {spaceData.amenities.map((amenity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-1">
                  <Input
                    value={amenity.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleAmenityChange(index, 'name', e.target.value)}
                    placeholder="Amenity name"
                  />
                </div>
                <div className="w-48">
                  <Select
                    value={amenity.icon}
                    onValueChange={(value) => handleAmenityChange(index, 'icon', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {amenityIcons.map((icon) => (
                        <SelectItem key={icon.value} value={icon.value}>
                          {icon.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeImage(index)}
                  className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                >
                  <RiDeleteBinLine className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </InteriorDetailsLayout>
  )
} 