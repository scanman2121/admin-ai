import { Card } from "@/components/ui/card"

interface SpaceData {
  name: string
  description: string
  building: string
  floor: string
  type: string
  amenities: string[]
  images: string[]
}

interface MobilePreviewProps {
  spaceData: SpaceData
}

export function MobilePreview({ spaceData }: MobilePreviewProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[9/16] w-full">
        <div className="h-full w-full bg-gray-100">
          {spaceData.images[0] && (
            <img
              src={spaceData.images[0]}
              alt={spaceData.name}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{spaceData.name}</h3>
        <p className="mb-4 text-sm text-gray-500">{spaceData.description}</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Building</span>
            <span>{spaceData.building}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Floor</span>
            <span>{spaceData.floor}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Type</span>
            <span>{spaceData.type}</span>
          </div>
          {spaceData.amenities.length > 0 && (
            <div className="pt-2">
              <span className="mb-2 block text-sm text-gray-500">Amenities</span>
              <div className="flex flex-wrap gap-2">
                {spaceData.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-2 py-1 text-xs"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
} 