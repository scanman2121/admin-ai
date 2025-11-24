"use client"

import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RichTextEditor } from "@/components/ui/rich-text-editor/RichTextEditor"
import { RiArrowDownSLine, RiSearchLine } from "@remixicon/react"
import { 
  QuickReply, 
  getQuickReplies, 
  saveQuickReplies,
  FEATURES,
  SERVICE_REQUEST_TYPES,
  RESOURCE_TYPES
} from "@/data/cannedResponses"
import { RiAddLine, RiDeleteBin6Line, RiPencilLine } from "@remixicon/react"
import { useState, useEffect, useMemo } from "react"

// Feature color mapping
const FEATURE_COLORS: Record<string, { border: string; bg: string }> = {
  "Service Request": { border: "border-orange-300", bg: "bg-orange-50 dark:bg-orange-950/20" },
  "Resource Booking": { border: "border-purple-300", bg: "bg-purple-50 dark:bg-purple-950/20" },
  "Visitor": { border: "border-blue-300", bg: "bg-blue-50 dark:bg-blue-950/20" },
  "General": { border: "border-green-300", bg: "bg-green-50 dark:bg-green-950/20" }
}

export function QuickReplyTemplatesSettings() {
  const [responses, setResponses] = useState<QuickReply[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingResponse, setEditingResponse] = useState<QuickReply | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    features: [] as string[],
    serviceRequestTypes: [] as string[],
    resourceTypes: [] as string[]
  })

  useEffect(() => {
    setResponses(getQuickReplies())
  }, [])

  // Filter responses based on search query
  const filteredResponses = useMemo(() => {
    if (!searchQuery.trim()) return responses
    const query = searchQuery.toLowerCase()
    return responses.filter(response => 
      response.title.toLowerCase().includes(query) ||
      response.content.toLowerCase().replace(/<[^>]*>/g, '').includes(query) ||
      response.features.some(f => f.toLowerCase().includes(query))
    )
  }, [responses, searchQuery])

  const handleOpenModal = (response?: QuickReply) => {
    if (response) {
      setEditingResponse(response)
      setFormData({
        title: response.title,
        content: response.content,
        features: response.features || [],
        serviceRequestTypes: response.serviceRequestTypes || [],
        resourceTypes: response.resourceTypes || []
      })
    } else {
      setEditingResponse(null)
      setFormData({
        title: "",
        content: "",
        features: [],
        serviceRequestTypes: [],
        resourceTypes: []
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingResponse(null)
    setFormData({
      title: "",
      content: "",
      features: [],
      serviceRequestTypes: [],
      resourceTypes: []
    })
  }

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature],
      // Clear dependent fields when feature is removed
      serviceRequestTypes: prev.features.includes(feature) && feature === "Service Request"
        ? []
        : prev.serviceRequestTypes,
      resourceTypes: prev.features.includes(feature) && feature === "Resource Booking"
        ? []
        : prev.resourceTypes
    }))
  }

  const toggleServiceRequestType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      serviceRequestTypes: prev.serviceRequestTypes.includes(type)
        ? prev.serviceRequestTypes.filter(t => t !== type)
        : [...prev.serviceRequestTypes, type]
    }))
  }

  const toggleResourceType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      resourceTypes: prev.resourceTypes.includes(type)
        ? prev.resourceTypes.filter(t => t !== type)
        : [...prev.resourceTypes, type]
    }))
  }

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim() || formData.features.length === 0) return

    let updatedResponses: QuickReply[]
    if (editingResponse) {
      updatedResponses = responses.map(r =>
        r.id === editingResponse.id
          ? {
              ...r,
              title: formData.title,
              content: formData.content,
              features: formData.features,
              serviceRequestTypes: formData.serviceRequestTypes.length > 0 ? formData.serviceRequestTypes : undefined,
              resourceTypes: formData.resourceTypes.length > 0 ? formData.resourceTypes : undefined
            }
          : r
      )
    } else {
      const newResponse: QuickReply = {
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        features: formData.features,
        serviceRequestTypes: formData.serviceRequestTypes.length > 0 ? formData.serviceRequestTypes : undefined,
        resourceTypes: formData.resourceTypes.length > 0 ? formData.resourceTypes : undefined,
        usage: 0
      }
      updatedResponses = [...responses, newResponse]
    }

    setResponses(updatedResponses)
    saveQuickReplies(updatedResponses)
    handleCloseModal()
  }

  const handleDelete = (id: string) => {
    const updatedResponses = responses.filter(r => r.id !== id)
    setResponses(updatedResponses)
    saveQuickReplies(updatedResponses)
  }

  // Strip HTML tags for description display
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">Quick reply templates</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Create and manage preset messages for quick communication with tenants
          </p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <RiAddLine className="size-4 mr-1.5" />
          Create response
        </Button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative w-full sm:w-80">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search responses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      {filteredResponses.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {searchQuery ? "No responses found" : "No quick reply templates yet"}
          </p>
          {!searchQuery && (
            <Button variant="secondary" onClick={() => handleOpenModal()}>
              <RiAddLine className="size-4 mr-1.5" />
              Create your first response
            </Button>
          )}
        </div>
      ) : (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Features
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredResponses.map((response) => (
                <tr key={response.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {response.title}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 max-w-md line-clamp-2">
                      {stripHtml(response.content)}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {response.features.map((feature) => {
                        const colors = FEATURE_COLORS[feature] || { border: "border-gray-300", bg: "bg-gray-50 dark:bg-gray-800" }
                        return (
                          <span
                            key={feature}
                            className={`text-xs px-2 py-0.5 rounded border ${colors.border} ${colors.bg} text-gray-700 dark:text-gray-300`}
                          >
                            {feature}
                          </span>
                        )
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-50">
                      {response.usage || 0}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(response)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <RiPencilLine className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(response.id)}
                        className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <RiDeleteBin6Line className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingResponse ? 'Edit response' : 'Add response'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4 px-6">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Request completed"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label>Features *</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 mt-1">
                Select one or more features where this response can be used
              </p>
              <div className="space-y-2 mt-2">
                {FEATURES.map((feature) => (
                  <label key={feature} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={formData.features.includes(feature)}
                      onCheckedChange={() => toggleFeature(feature)}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Service Request Types */}
            {formData.features.includes("Service Request") && (
              <div>
                <Label>Service request types</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 mt-1">
                  Select types (optional)
                </p>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="w-full mt-1 flex items-center justify-between px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <span className={formData.serviceRequestTypes.length === 0 ? "text-gray-500 dark:text-gray-400" : ""}>
                        {formData.serviceRequestTypes.length === 0
                          ? "Select service request types"
                          : `${formData.serviceRequestTypes.length} selected`}
                      </span>
                      <RiArrowDownSLine className="h-4 w-4 text-gray-400" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2" align="start">
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {SERVICE_REQUEST_TYPES.map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                        >
                          <Checkbox
                            checked={formData.serviceRequestTypes.includes(type)}
                            onCheckedChange={() => toggleServiceRequestType(type)}
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
                        </label>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                {formData.serviceRequestTypes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.serviceRequestTypes.map((type) => (
                      <span
                        key={type}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded flex items-center gap-1"
                      >
                        {type}
                        <button
                          type="button"
                          onClick={() => toggleServiceRequestType(type)}
                          className="ml-1 hover:text-red-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Resource Types */}
            {formData.features.includes("Resource Booking") && (
              <div>
                <Label>Resource types</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 mt-1">
                  Select resource types (optional)
                </p>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="w-full mt-1 flex items-center justify-between px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <span className={formData.resourceTypes.length === 0 ? "text-gray-500 dark:text-gray-400" : ""}>
                        {formData.resourceTypes.length === 0
                          ? "Select resource types"
                          : `${formData.resourceTypes.length} selected`}
                      </span>
                      <RiArrowDownSLine className="h-4 w-4 text-gray-400" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2" align="start">
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {RESOURCE_TYPES.map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                        >
                          <Checkbox
                            checked={formData.resourceTypes.includes(type)}
                            onCheckedChange={() => toggleResourceType(type)}
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
                        </label>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                {formData.resourceTypes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.resourceTypes.map((type) => (
                      <span
                        key={type}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded flex items-center gap-1"
                      >
                        {type}
                        <button
                          type="button"
                          onClick={() => toggleResourceType(type)}
                          className="ml-1 hover:text-red-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <div>
              <Label htmlFor="content">Message content *</Label>
              <RichTextEditor
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                placeholder="Enter the message content..."
                className="mt-1"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="ghost" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {editingResponse ? 'Update' : 'Add'} response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

