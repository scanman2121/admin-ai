"use client"

import { InteriorDetailsLayout } from "@/components/layouts/InteriorDetailsLayout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MultiSelect, Select } from "@/components/ui/select"
import { MobilePreview } from "@/components/ui/space/MobilePreview"
import { Textarea } from "@/components/ui/textarea"
import { RiAddLine, RiDeleteBinLine, RiImageAddLine } from "@remixicon/react"
import Image from "next/image"
import { useState } from "react"

// Mock data for a single space
const initialSpaceData = {
  id: "1",
  name: "Executive Conference Room",
  images: [
    {
      url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2669&auto=format&fit=crop",
      isPrimary: true
    }
  ],
  building: "125 Highland Ave",
  type: "Conference Room",
  capacity: 20,
  description: "A premium conference room equipped with state-of-the-art video conferencing facilities.",
  amenities: [
    { name: "75\" 4K Display", icon: "tv" },
    { name: "Video Conferencing System", icon: "video-camera" },
    { name: "Wireless Presentation", icon: "wireless" },
    { name: "Adjustable Lighting", icon: "lightbulb" },
    { name: "Climate Control", icon: "temperature" },
  ],
  accessControl: {
    accessGroups: ["Executive Team", "Board Members"],
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

// Mock data for 75 Varick Roof Deck
const roofDeckData = {
  id: "2",
  name: "75 Varick Roof Deck",
  images: [
    {
      url: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isPrimary: true
    },
    {
      url: "https://images.unsplash.com/photo-1493246318656-5bfd4cfb29b8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isPrimary: false
    },
    {
      url: "https://images.unsplash.com/photo-1586124288291-936b6673884a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isPrimary: false
    }
  ],
  building: "75 Varick",
  type: "Outdoor Space",
  capacity: 200,
  description: "Join us atop 75 Varick, an expansive indoor outdoor rooftop amenity space, offering panoramic views of the city and Hudson River.",
  amenities: [
    { name: "Lounge Seating", icon: "lightbulb" },
    { name: "Outdoor Bar", icon: "coffee" },
    { name: "Wi-Fi Access", icon: "wifi" },
    { name: "Shade Umbrellas", icon: "lightbulb" },
    { name: "Outdoor Heating", icon: "temperature" },
  ],
  accessControl: {
    accessGroups: ["All Tenants", "Executive Team"],
    schedule: {
      monday: { start: "08:00", end: "22:00" },
      tuesday: { start: "08:00", end: "22:00" },
      wednesday: { start: "08:00", end: "22:00" },
      thursday: { start: "08:00", end: "22:00" },
      friday: { start: "08:00", end: "23:00" },
      saturday: { start: "10:00", end: "23:00" },
      sunday: { start: "10:00", end: "20:00" },
    },
    accessMethod: "Mobile App, Key Card",
  }
}

// Function to get the correct space data based on ID
const getSpaceDataById = (id: string) => {
  if (id === "2") return roofDeckData
  return initialSpaceData
}

// Available buildings
const buildings = [
  { value: "125-highland", label: "125 Highland Ave" },
  { value: "75-varick", label: "75 Varick" },
  { value: "200-broadway", label: "200 Broadway" },
  { value: "500-tech-square", label: "500 Tech Square" },
]

// Available space types
const spaceTypes = [
  { value: "conference-room", label: "Conference Room" },
  { value: "office", label: "Office" },
  { value: "desk", label: "Desk" },
  { value: "outdoor-space", label: "Outdoor Space" },
  { value: "rooftop", label: "Rooftop" },
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

export default function SpaceDetails({ params }: { params: { id: string } }) {
  const [spaceData, setSpaceData] = useState(getSpaceDataById(params.id))

  // Breadcrumbs for the space details page
  const breadcrumbs = [
    { name: "Spaces", href: "/spaces" },
    { name: spaceData.name, href: `/spaces/${spaceData.id}` },
  ]

  const handleInputChange = (field: string, value: string | number) => {
    setSpaceData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAccessControlChange = (field: string, value: any) => {
    setSpaceData(prev => ({
      ...prev,
      accessControl: {
        ...prev.accessControl,
        [field]: value
      }
    }))
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const removeImage = (index: number) => {
    setSpaceData(prev => {
      const newImages = prev.images.filter((_, i) => i !== index)
      // If we removed the primary image, make the first remaining image primary
      if (prev.images[index].isPrimary && newImages.length > 0) {
        newImages[0].isPrimary = true
      }
      return { ...prev, images: newImages }
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

  const removeAmenity = (index: number) => {
    setSpaceData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }))
  }

  return (
    <InteriorDetailsLayout
      title={spaceData.name}
      breadcrumbs={breadcrumbs}
      ctaLabel="Update"
      onCtaClick={() => console.log("Updating space:", spaceData)}
      status={{
        label: "Active",
        variant: 'active'
      }}
      previewContent={
        <MobilePreview
          spaceData={spaceData}
          onClose={() => { }}
        />
      }
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
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter space name"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">Description</label>
                <Textarea
                  name="description"
                  value={spaceData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter space description"
                />
              </div>
            </div>

            {/* Building, Type, and Capacity */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">Building</label>
                <Select
                  name="building"
                  value={spaceData.building}
                  onChange={(e) => handleInputChange('building', e.target.value)}
                >
                  <option value="">Select building</option>
                  {buildings.map((building) => (
                    <option key={building.value} value={building.value}>
                      {building.label}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">Type</label>
                <Select
                  name="type"
                  value={spaceData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                >
                  <option value="">Select type</option>
                  {spaceTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">Capacity</label>
                <Input
                  name="capacity"
                  type="number"
                  value={spaceData.capacity}
                  onChange={(e) => handleInputChange('capacity', parseInt(e.target.value))}
                  placeholder="Enter capacity"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="grid gap-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">Space images</label>
                <div className="grid grid-cols-5 gap-4">
                  {/* Existing Images */}
                  {spaceData.images.map((image, index) => (
                    <div key={index} className="relative group aspect-video">
                      <Image
                        src={image.url}
                        alt={`Space image ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:text-white hover:bg-white/20"
                          onClick={() => setPrimaryImage(index)}
                        >
                          {image.isPrimary ? "Primary" : "Set Primary"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:text-white hover:bg-white/20"
                          onClick={() => removeImage(index)}
                        >
                          <RiDeleteBinLine className="h-4 w-4" />
                        </Button>
                      </div>
                      {image.isPrimary && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded">
                          Primary
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Empty Slots */}
                  {Array.from({ length: 5 - spaceData.images.length }).map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center"
                    >
                      <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                        <RiImageAddLine className="h-6 w-6 text-gray-400" />
                        <span className="text-xs text-gray-500 mt-2">Add Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  ))}
                </div>
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
              <label className="mb-2 block text-sm font-medium text-gray-500">Access Groups</label>
              <MultiSelect
                value={spaceData.accessControl.accessGroups}
                onChange={(value) => handleAccessControlChange('accessGroups', value)}
                options={accessGroups}
                className="w-full"
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
                        onChange={(e) => handleScheduleChange(day, 'start', e.target.value)}
                      />
                    </div>
                    <div>
                      <Input
                        type="time"
                        value={spaceData.accessControl.schedule[day].end}
                        onChange={(e) => handleScheduleChange(day, 'end', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
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
                    onChange={(e) => handleAmenityChange(index, 'name', e.target.value)}
                    placeholder="Amenity name"
                  />
                </div>
                <div className="w-48">
                  <Select
                    value={amenity.icon}
                    onChange={(e) => handleAmenityChange(index, 'icon', e.target.value)}
                  >
                    {amenityIcons.map((icon) => (
                      <option key={icon.value} value={icon.value}>
                        {icon.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAmenity(index)}
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