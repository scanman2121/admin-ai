import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RiArrowLeftLine, RiArrowRightLine, RiCheckLine, RiCloseLine, RiMapPinLine, RiTeamLine, RiTimeLine, RiWalletLine } from "@remixicon/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

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
  amenities: {
    name: string
    icon: string
  }[]
  accessControl: {
    accessGroups: string[]
    schedule: {
      [key: string]: {
        start: string
        end: string
      }
    }
    accessMethod: string
  }
}

interface MobilePreviewProps {
  spaceData: SpaceData
  onClose: () => void
}

// QR code placeholder as data URL
const qrCodePlaceholder = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath d='M0 0h200v200H0z' fill='%23fff'/%3E%3Cpath d='M30 30h20v20H30zm20 0h20v20H50zm20 0h20v20H70zm20 0h20v20H90zm40 0h20v20h-20zM30 50h20v20H30zm60 0h20v20H90zm20 0h20v20h-20zm20 0h20v20h-20zM30 70h20v20H30zm20 0h20v20H50zm20 0h20v20H70zm40 0h20v20h-20zm40 0h20v20h-20zM30 90h20v20H30zm20 0h20v20H50zm40 0h20v20H90zm40 0h20v20h-20zM30 110h20v20H30zm40 0h20v20H70zm20 0h20v20H90zm20 0h20v20h-20zm20 0h20v20h-20zM30 130h20v20H30zm20 0h20v20H50zm20 0h20v20H70zm20 0h20v20H90zm40 0h20v20h-20zM30 150h20v20H30zm40 0h20v20H70zm60 0h20v20h-20zM70 170h20v20H70zm20 0h20v20H90zm20 0h20v20h-20z' fill='%23000'/%3E%3C/svg%3E"

// Format time to AM/PM
const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const formattedHour = hour % 12 || 12 // Convert 0 to 12
  return `${formattedHour}:${minutes} ${ampm}`
}

export function MobilePreview({ spaceData, onClose }: MobilePreviewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDrawerMinimized, setIsDrawerMinimized] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [isAccessActivated, setIsAccessActivated] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === spaceData.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? spaceData.images.length - 1 : prev - 1
    )
  }

  // Get today's schedule
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
  const todaySchedule = spaceData.accessControl.schedule[today]
  const formattedSchedule = todaySchedule.start
    ? `${formatTime(todaySchedule.start)} - ${formatTime(todaySchedule.end)}`
    : 'Closed'

  const handleActivateAccess = () => {
    setIsDrawerOpen(true)
    setIsAccessActivated(true)
    // Show QR code after the success message animation
    setTimeout(() => {
      setShowQRCode(true)
    }, 1500)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        if (isDrawerOpen && !isDrawerMinimized) {
          setIsDrawerMinimized(true)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isDrawerOpen, isDrawerMinimized])

  const handleDrawerClick = () => {
    if (isDrawerMinimized) {
      setIsDrawerMinimized(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Close Button - Moved outside the iPhone frame */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
      >
        <RiCloseLine className="size-6" />
      </button>

      <div className="relative w-full max-w-[375px] h-[812px] bg-white dark:bg-gray-900 rounded-[44px] overflow-hidden shadow-2xl">
        {/* iPhone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-black rounded-b-2xl z-10" />

        {/* Content Container */}
        <div className="h-full overflow-y-auto">
          {/* Image Carousel */}
          <div className="relative h-[300px] bg-gray-100 dark:bg-gray-800">
            <Image
              src={spaceData.images[currentImageIndex].url}
              alt={spaceData.name}
              fill
              className="object-cover"
            />

            {/* Carousel Controls */}
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
              {spaceData.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex
                    ? "bg-white"
                    : "bg-white/50"
                    }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white"
            >
              <RiArrowLeftLine className="size-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white"
            >
              <RiArrowRightLine className="size-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {spaceData.name}
              </h1>
              <div className="mt-2 flex items-center text-gray-500 dark:text-gray-400">
                <RiMapPinLine className="size-4 mr-2" />
                {spaceData.building}
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <RiTeamLine className="size-4 mr-2" />
                  Capacity
                </div>
                <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                  {spaceData.capacity} people
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <RiTimeLine className="size-4 mr-2" />
                  Hours Today
                </div>
                <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                  {formattedSchedule}
                </div>
              </Card>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                About this space
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {spaceData.description}
              </p>
            </div>

            {/* CTA Button - Only show if access is not activated */}
            {!isAccessActivated && (
              <div className="pt-4">
                <Button
                  className="w-full py-6 text-lg"
                  size="lg"
                  onClick={handleActivateAccess}
                >
                  Activate Access
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Access Drawer - with minimized state */}
        <div
          ref={drawerRef}
          onClick={handleDrawerClick}
          className={`absolute inset-x-0 bottom-0 bg-white dark:bg-gray-900 rounded-t-3xl transform transition-all duration-500 ease-out-expo cursor-pointer
            ${isDrawerOpen ? 'translate-y-0' : 'translate-y-full'}
            ${isDrawerMinimized ? 'h-24 shadow-[0_-8px_30px_rgb(0,0,0,0.12)]' : 'h-3/4 shadow-2xl'}
          `}
        >
          {/* Minimized View */}
          <div className={`absolute inset-0 px-5 flex items-center justify-between transition-opacity duration-300 ${isDrawerMinimized ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center ring-4 ring-green-50 dark:ring-green-900/10">
                <RiCheckLine className="size-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-900 dark:text-white">Access activated</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Tap to expand</span>
              </div>
            </div>
            <div className="size-12 bg-white dark:bg-gray-800 rounded-xl p-1.5 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
              <img
                src={qrCodePlaceholder}
                alt="QR Code"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Full Drawer Content */}
          <div className={`p-6 space-y-6 transition-opacity duration-300 ${isDrawerMinimized ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {/* Drawer Handle */}
            <div className="flex justify-center">
              <div className="w-12 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Success Message */}
            <div className={`flex flex-col items-center transition-opacity duration-500 ${showQRCode ? 'opacity-0 h-0' : 'opacity-100'}`}>
              <div className="size-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <RiCheckLine className="size-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                Access Granted
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your access has been activated
              </p>
            </div>

            {/* QR Code Section */}
            <div className={`space-y-6 transition-opacity duration-500 ${showQRCode ? 'opacity-100' : 'opacity-0 h-0'}`}>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  {spaceData.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Scan to access
                </p>
              </div>

              {/* QR Code */}
              <div className="flex justify-center">
                <div className="size-48 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                  <img
                    src={qrCodePlaceholder}
                    alt="QR Code"
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Add to Wallet Button */}
              <Button
                variant="ghost"
                className="w-full flex items-center justify-center gap-2 py-6"
                size="lg"
              >
                <RiWalletLine className="size-5" />
                Add to Wallet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 