"use client"

import { Button } from "@/components/Button"
import { Checkbox } from "@/components/Checkbox"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Textarea } from "@/components/ui/textarea"
import { RiAddLine, RiDeleteBin6Line, RiPencilLine, RiSearchLine } from "@remixicon/react"
import { useState, useEffect, useMemo } from "react"

export interface Tag {
  id: string
  name: string
  description: string
  objects: string[] // People, Tenants, Buildings, etc.
  usage: number
  isSystemTag?: boolean // System tags cannot be edited or deleted
  color?: string // Color for the tag badge
}

// Available object types
export const OBJECT_TYPES = [
  "People",
  "Tenants",
  "Buildings",
  "Spaces",
  "Vendors"
] as const

// Tag color options
const TAG_COLORS = [
  { name: "Orange", value: "orange", border: "border-orange-300", bg: "bg-orange-50 dark:bg-orange-950/20", text: "text-orange-700 dark:text-orange-300" },
  { name: "Purple", value: "purple", border: "border-purple-300", bg: "bg-purple-50 dark:bg-purple-950/20", text: "text-purple-700 dark:text-purple-300" },
  { name: "Blue", value: "blue", border: "border-blue-300", bg: "bg-blue-50 dark:bg-blue-950/20", text: "text-blue-700 dark:text-blue-300" },
  { name: "Green", value: "green", border: "border-green-300", bg: "bg-green-50 dark:bg-green-950/20", text: "text-green-700 dark:text-green-300" },
  { name: "Red", value: "red", border: "border-red-300", bg: "bg-red-50 dark:bg-red-950/20", text: "text-red-700 dark:text-red-300" },
  { name: "Yellow", value: "yellow", border: "border-yellow-300", bg: "bg-yellow-50 dark:bg-yellow-950/20", text: "text-yellow-700 dark:text-yellow-300" },
  { name: "Teal", value: "teal", border: "border-teal-300", bg: "bg-teal-50 dark:bg-teal-950/20", text: "text-teal-700 dark:text-teal-300" }
]

// Default tags
const defaultTags: Tag[] = [
  {
    id: "1",
    name: "Primary Contact",
    description: "Primary contact for tenant organization - automatically prioritized in contact lists and overview displays",
    objects: ["People"],
    usage: 28,
    isSystemTag: true,
    color: "orange"
  },
  {
    id: "2",
    name: "VIP",
    description: "Very important person requiring premium service and attention",
    objects: ["People", "Tenants"],
    usage: 12,
    color: "purple"
  },
  {
    id: "3",
    name: "Decision maker",
    description: "Has authority to make key decisions for their organization",
    objects: ["People"],
    usage: 18,
    color: "blue"
  },
  {
    id: "4",
    name: "Point of contact",
    description: "Primary point of contact for day-to-day operations",
    objects: ["People"],
    usage: 9,
    color: "green"
  },
  {
    id: "5",
    name: "Executive",
    description: "Executive-level contact (C-suite, VP, Director)",
    objects: ["People"],
    usage: 15,
    color: "red"
  },
  {
    id: "6",
    name: "Key stakeholder",
    description: "Important stakeholder in tenant relationship",
    objects: ["People"],
    usage: 7,
    color: "blue"
  }
]

// Load tags from localStorage or use defaults
const getTags = (): Tag[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('tags')
    return saved ? JSON.parse(saved) : defaultTags
  }
  return defaultTags
}

// Save tags to localStorage
const saveTags = (tags: Tag[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tags', JSON.stringify(tags))
  }
}

export function TagsSettings() {
  const [tags, setTags] = useState<Tag[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<Tag | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    objects: [] as string[],
    color: "blue"
  })

  useEffect(() => {
    setTags(getTags())
  }, [])

  // Filter tags based on search query
  const filteredTags = useMemo(() => {
    if (!searchQuery.trim()) return tags
    const query = searchQuery.toLowerCase()
    return tags.filter(tag => 
      tag.name.toLowerCase().includes(query) ||
      tag.description.toLowerCase().includes(query) ||
      tag.objects.some(obj => obj.toLowerCase().includes(query))
    )
  }, [tags, searchQuery])

  const handleOpenModal = (tag?: Tag) => {
    if (tag) {
      setEditingTag(tag)
      setFormData({
        name: tag.name,
        description: tag.description,
        objects: tag.objects || [],
        color: tag.color || "blue"
      })
    } else {
      setEditingTag(null)
      setFormData({
        name: "",
        description: "",
        objects: [],
        color: "blue"
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTag(null)
    setFormData({
      name: "",
      description: "",
      objects: [],
      color: "blue"
    })
  }

  const toggleObject = (object: string) => {
    setFormData(prev => ({
      ...prev,
      objects: prev.objects.includes(object)
        ? prev.objects.filter(o => o !== object)
        : [...prev.objects, object]
    }))
  }

  const handleSave = () => {
    if (!formData.name.trim() || !formData.description.trim() || formData.objects.length === 0) return

    let updatedTags: Tag[]
    if (editingTag) {
      updatedTags = tags.map(t =>
        t.id === editingTag.id
          ? {
              ...t,
              name: formData.name,
              description: formData.description,
              objects: formData.objects,
              color: formData.color
            }
          : t
      )
    } else {
      const newTag: Tag = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        objects: formData.objects,
        usage: 0,
        color: formData.color
      }
      updatedTags = [...tags, newTag]
    }

    setTags(updatedTags)
    saveTags(updatedTags)
    handleCloseModal()
  }

  const handleDelete = (id: string) => {
    const updatedTags = tags.filter(t => t.id !== id)
    setTags(updatedTags)
    saveTags(updatedTags)
  }

  const getTagColorClasses = (color?: string) => {
    const colorConfig = TAG_COLORS.find(c => c.value === color) || TAG_COLORS[2] // Default to blue
    return {
      border: colorConfig.border,
      bg: colorConfig.bg,
      text: colorConfig.text
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">Manage tags</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Create and manage tags for organizing people, buildings, tenants, and other objects
          </p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <RiAddLine className="size-4 mr-1.5" />
          Create tag
        </Button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative w-full sm:w-80">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      {filteredTags.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {searchQuery ? "No tags found" : "No tags yet"}
          </p>
          {!searchQuery && (
            <Button variant="secondary" onClick={() => handleOpenModal()}>
              <RiAddLine className="size-4 mr-1.5" />
              Create your first tag
            </Button>
          )}
        </div>
      ) : (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tag
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Objects
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
              {filteredTags.map((tag) => {
                const colorClasses = getTagColorClasses(tag.color)
                return (
                  <tr key={tag.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`text-xs px-2 py-0.5 rounded border ${colorClasses.border} ${colorClasses.bg} ${colorClasses.text}`}>
                        {tag.name}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                        {tag.description}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        {tag.objects.map((object) => (
                          <span
                            key={object}
                            className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                          >
                            {object}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-50">
                        {tag.usage}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      {tag.isSystemTag ? (
                        <span className="text-sm text-gray-500 dark:text-gray-400">System tag</span>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(tag)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <RiPencilLine className="size-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(tag.id)}
                            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <RiDeleteBin6Line className="size-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingTag ? 'Edit tag' : 'Create tag'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4 px-6">
            <div>
              <Label htmlFor="tag-name">Tag name *</Label>
              <Input
                id="tag-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., VIP, Decision maker"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="tag-description">Description *</Label>
              <Textarea
                id="tag-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what this tag is used for..."
                className="mt-1 min-h-[80px]"
              />
            </div>

            <div>
              <Label>Objects *</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 mt-1">
                Select which object types this tag applies to
              </p>
              <div className="space-y-2 mt-2">
                {OBJECT_TYPES.map((object) => (
                  <label key={object} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={formData.objects.includes(object)}
                      onCheckedChange={() => toggleObject(object)}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{object}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label>Color</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 mt-1">
                Choose a color for the tag badge
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {TAG_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: color.value })}
                    className={`px-3 py-2 rounded-md border-2 transition-all ${
                      formData.color === color.value
                        ? `${color.border} ${color.bg} ${color.text} border-2`
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <span className={`text-xs font-medium ${formData.color === color.value ? color.text : "text-gray-700 dark:text-gray-300"}`}>
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="ghost" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {editingTag ? 'Update' : 'Create'} tag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

