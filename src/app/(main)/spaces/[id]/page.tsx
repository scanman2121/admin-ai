"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MultiSelect, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MobilePreview } from "@/components/ui/space/MobilePreview"
import { Textarea } from "@/components/ui/textarea"
import { RiDeleteBinLine, RiImageAddLine } from "@remixicon/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface SpaceData {
  name: string
  description: string
  building: string
  floor: string
  type: string
  amenities: string[]
  images: string[]
}

export default function SpacePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [spaceData, setSpaceData] = useState<SpaceData>({
    name: "",
    description: "",
    building: "",
    floor: "",
    type: "",
    amenities: [],
    images: []
  })

  const buildings = ["Building A", "Building B", "Building C"]
  const floors = ["1st Floor", "2nd Floor", "3rd Floor"]
  const spaceTypes = ["Meeting Room", "Office", "Desk"]
  const amenityOptions = [
    "Whiteboard",
    "TV Screen",
    "Video Conference",
    "Phone Booth",
    "Coffee Machine"
  ]

  const handleInputChange = (field: keyof SpaceData, value: string | string[]) => {
    setSpaceData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setSpaceData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }))
    }
  }

  const handleImageRemove = (index: number) => {
    setSpaceData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {params.id === "new" ? "Create New Space" : "Edit Space"}
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Name
                </label>
                <Input
                  placeholder="Enter space name"
                  value={spaceData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Description
                </label>
                <Textarea
                  placeholder="Enter space description"
                  value={spaceData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Building
                </label>
                <Select
                  value={spaceData.building}
                  onValueChange={(value) => handleInputChange("building", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select building" />
                  </SelectTrigger>
                  <SelectContent>
                    {buildings.map((building) => (
                      <SelectItem key={building} value={building}>
                        {building}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Floor
                </label>
                <Select
                  value={spaceData.floor}
                  onValueChange={(value) => handleInputChange("floor", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select floor" />
                  </SelectTrigger>
                  <SelectContent>
                    {floors.map((floor) => (
                      <SelectItem key={floor} value={floor}>
                        {floor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Space Type
                </label>
                <Select
                  value={spaceData.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select space type" />
                  </SelectTrigger>
                  <SelectContent>
                    {spaceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Amenities
                </label>
                <MultiSelect
                  value={spaceData.amenities}
                  onChange={(value) => handleInputChange("amenities", value)}
                  options={amenityOptions}
                  placeholder="Select amenities"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Images
                </label>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {spaceData.images.map((image, index) => (
                      <div
                        key={index}
                        className="group relative aspect-square overflow-hidden rounded-lg border"
                      >
                        <img
                          src={image}
                          alt={`Space image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <button
                          className="absolute right-2 top-2 rounded-full bg-white/80 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={() => handleImageRemove(index)}
                        >
                          <RiDeleteBinLine className="size-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                    <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border border-dashed">
                      <div className="text-center">
                        <RiImageAddLine className="mx-auto size-8 text-gray-400" />
                        <span className="mt-2 block text-sm text-gray-400">
                          Add Image
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        multiple
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button>Save Space</Button>
          </div>
        </div>

        <div className="lg:sticky lg:top-6">
          <MobilePreview spaceData={spaceData} />
        </div>
      </div>
    </div>
  )
} 