"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/Badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Check } from "lucide-react"
import { useState } from "react"
import { featureGates, featureGateIds, type FeatureGateConfig } from "@/data/featureGates"

export default function FeatureGatePage() {
  const [selectedFeature, setSelectedFeature] = useState<string>("service-requests")
  
  const feature = featureGates[selectedFeature] as FeatureGateConfig

  return (
    <div className="max-w-7xl mx-auto">
      {/* Feature selector dropdown - positioned in top right corner */}
      <div className="fixed top-20 right-4 z-50">
        <Select value={selectedFeature} onValueChange={setSelectedFeature}>
          <SelectTrigger className="w-48 bg-white dark:bg-gray-900 shadow-sm border-gray-200 dark:border-gray-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {featureGateIds.map((id) => (
              <SelectItem key={id} value={id}>
                {featureGates[id].title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="p-6 pb-10">
        {/* Header Section */}
        <div className="mb-12">
          <Badge variant="default" className="mb-2">
            {feature.suite}
          </Badge>
          <h1 className="text-[28px] font-medium text-[#2D3338] dark:text-[#2D3338] mb-2">
            {feature.title}
          </h1>
          <p className="text-lg text-[#2D3338] dark:text-[#2D3338] max-w-3xl mb-8">
            {feature.subtitle}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Features */}
          <div className="lg:col-span-2 space-y-8">
            {feature.features.map((featureItem, index) => {
              const Icon = featureItem.icon
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="size-12 rounded-lg bg-white dark:bg-white border border-gray-200 dark:border-gray-200 shadow-sm flex items-center justify-center">
                      <Icon className="size-6 text-[#2D3338] dark:text-[#2D3338] stroke-[1.5]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[18px] font-medium text-[#2D3338] dark:text-[#2D3338] mb-2">
                      {featureItem.title}
                    </h3>
                    <p className="text-base text-[#696E72] dark:text-[#696E72] leading-relaxed">
                      {featureItem.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column - Pricing Card (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow overflow-hidden">
                <div className="p-6 space-y-6">
                  {/* Header */}
                  <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                      {feature.pricing.status === "upgrade-required" 
                        ? "Upgrade your plan" 
                        : "Included in your plan!"}
                    </p>
                    <p className={`${feature.pricing.status === "upgrade-required" ? "text-2xl" : "text-5xl"} font-bold text-gray-900 dark:text-gray-50 mb-2`}>
                      {feature.pricing.price}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.pricing.ctaText}
                    </p>
                  </div>

                  {/* Included Features List */}
                  <div className="space-y-3">
                    {feature.includedFeatures.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <Check className="size-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button Section */}
                <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 p-6">
                  <Button className="w-full" size="lg">
                    {feature.pricing.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

