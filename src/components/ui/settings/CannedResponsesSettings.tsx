"use client"

import { Button } from "@/components/Button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Textarea } from "@/components/ui/textarea"
import { CannedResponse, getCannedResponses, saveCannedResponses } from "@/data/cannedResponses"
import { RiAddLine, RiDeleteBin6Line, RiPencilLine } from "@remixicon/react"
import { useState, useEffect } from "react"

export function CannedResponsesSettings() {
  const [responses, setResponses] = useState<CannedResponse[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingResponse, setEditingResponse] = useState<CannedResponse | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: ""
  })

  useEffect(() => {
    setResponses(getCannedResponses())
  }, [])

  const handleOpenModal = (response?: CannedResponse) => {
    if (response) {
      setEditingResponse(response)
      setFormData({
        title: response.title,
        content: response.content,
        category: response.category || ""
      })
    } else {
      setEditingResponse(null)
      setFormData({
        title: "",
        content: "",
        category: ""
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
      category: ""
    })
  }

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) return

    let updatedResponses: CannedResponse[]
    if (editingResponse) {
      updatedResponses = responses.map(r =>
        r.id === editingResponse.id
          ? { ...r, ...formData }
          : r
      )
    } else {
      const newResponse: CannedResponse = {
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        category: formData.category || undefined
      }
      updatedResponses = [...responses, newResponse]
    }

    setResponses(updatedResponses)
    saveCannedResponses(updatedResponses)
    handleCloseModal()
  }

  const handleDelete = (id: string) => {
    const updatedResponses = responses.filter(r => r.id !== id)
    setResponses(updatedResponses)
    saveCannedResponses(updatedResponses)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">Canned responses</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Create and manage preset messages for quick communication with tenants
          </p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <RiAddLine className="size-4 mr-1.5" />
          Add response
        </Button>
      </div>

      <div className="space-y-4">
        {responses.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">No canned responses yet</p>
            <Button variant="secondary" onClick={() => handleOpenModal()}>
              <RiAddLine className="size-4 mr-1.5" />
              Create your first response
            </Button>
          </div>
        ) : (
          responses.map((response) => (
            <div
              key={response.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {response.title}
                    </h3>
                    {response.category && (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                        {response.category}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {response.content}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
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
              </div>
            </div>
          ))
        )}
      </div>

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
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Completion, Status Update"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="content">Message content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter the message content..."
                className="mt-1 min-h-[120px]"
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

