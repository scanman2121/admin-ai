"use client"

import { Button } from "@/components/Button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { QuickReply, getQuickReplies } from "@/data/cannedResponses"
import { Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

interface MessageInputActionsProps {
  onSelectResponse: (response: QuickReply) => void
  onMakeProfessional: () => void
  message: string
}

export function MessageInputActions({ onSelectResponse, onMakeProfessional, message }: MessageInputActionsProps) {
  const [responses, setResponses] = useState<QuickReply[]>([])
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  useEffect(() => {
    setResponses(getQuickReplies())
  }, [])

  const handleSelectResponse = (response: QuickReply) => {
    onSelectResponse(response)
    setIsPopoverOpen(false)
  }

  return (
    <div className="flex items-center gap-2">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm" type="button">
            Quick reply
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="max-h-96 overflow-y-auto">
            {responses.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                No quick reply templates available. Create some in Settings.
              </div>
            ) : (
              <div className="py-2">
                {responses.map((response) => (
                  <button
                    key={response.id}
                    onClick={() => handleSelectResponse(response)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-1 truncate">
                          {response.title}
                        </p>
                        <div 
                          className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 [&_strong]:font-semibold [&_em]:italic [&_u]:underline"
                          dangerouslySetInnerHTML={{ __html: response.content }}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <Button
        variant="secondary"
        size="sm"
        type="button"
        onClick={onMakeProfessional}
        disabled={!message.trim()}
        className="flex items-center gap-1.5"
      >
        <Sparkles className="size-3.5" />
        Make professional
      </Button>
    </div>
  )
}

