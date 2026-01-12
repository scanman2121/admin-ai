"use client"

import { Button } from "@/components/Button"
import { serviceRequestStatuses } from "@/data/statuses"
import { RiArrowLeftLine, RiArrowRightLine, RiCloseLine } from "@remixicon/react"
import { useEffect, useRef, useState } from "react"
import { Step1Teams } from "./steps/Step1Teams"
import { Step2Categories } from "./steps/Step2Categories"
import { Step3ServiceTypes } from "./steps/Step3ServiceTypes"
import { Step4Statuses } from "./steps/Step4Statuses"
import { Step5FormFields } from "./steps/Step5FormFields"
import { Step6Notifications } from "./steps/Step6Notifications"
import { WizardData } from "./types"

interface ServiceRequestSetupWizardProps {
  onComplete?: () => void
  onClose?: () => void
  title?: string
}

const TOTAL_STEPS = 6

// Load data from localStorage or use defaults
const loadWizardData = (): WizardData => {
  if (typeof window === 'undefined') {
    return getDefaultWizardData()
  }

  return {
    teams: JSON.parse(localStorage.getItem('serviceRequestTeams') || JSON.stringify(getDefaultWizardData().teams)),
    categories: JSON.parse(localStorage.getItem('serviceRequestCategories') || JSON.stringify(getDefaultWizardData().categories)),
    serviceTypes: JSON.parse(localStorage.getItem('serviceRequestServiceTypes') || JSON.stringify(getDefaultWizardData().serviceTypes)),
    statuses: JSON.parse(localStorage.getItem('serviceRequestStatuses') || JSON.stringify(serviceRequestStatuses)),
    formFields: JSON.parse(localStorage.getItem('serviceRequestFormFields') || JSON.stringify(getDefaultWizardData().formFields)),
    notifications: JSON.parse(localStorage.getItem('serviceRequestNotifications') || JSON.stringify(getDefaultWizardData().notifications))
  }
}

const getDefaultWizardData = (): WizardData => {
  return {
    teams: [
      {
        id: 'property-team',
        name: 'Property team',
        description: 'Default team for property management',
        members: []
      }
    ],
    categories: [
      {
        id: 1,
        name: "Cleaning & Waste",
        description: "Need something cleaned, picked up, or removed — like trash, recycling, or windows?",
        status: true,
        assignedTo: "Housekeeping Team",
        assignedToType: "team",
      },
      {
        id: 2,
        name: "Temperature & Air",
        description: "Too hot, too cold, or something off with the air? Let us know.",
        status: true,
        assignedTo: "Maintenance Team",
        assignedToType: "team",
      },
      {
        id: 3,
        name: "Repairs & Maintenance",
        description: "Something broken, leaking, or not working right? We'll take care of it.",
        status: true,
        assignedTo: "Maintenance Team",
        assignedToType: "team",
      },
      {
        id: 4,
        name: "Access & Security",
        description: "Need help with a key, badge, lock, or getting into a space?",
        status: true,
        assignedTo: "Security Team",
        assignedToType: "team",
      },
      {
        id: 5,
        name: "Hospitality & Concierge",
        description: "Need a hand around the building — deliveries, event setup, or general help?",
        status: true,
        assignedTo: "Concierge Team",
        assignedToType: "team",
      },
      {
        id: 6,
        name: "Signage & Facilities",
        description: "Need an update to signage, directories, or parking info?",
        status: true,
        assignedTo: "Facilities Team",
        assignedToType: "team",
      },
      {
        id: 7,
        name: "Other",
        description: "Miscellaneous service requests and general inquiries",
        status: true,
        assignedTo: "",
        assignedToType: "user",
      }
    ],
    serviceTypes: [],
    statuses: serviceRequestStatuses,
    formFields: [
      {
        id: "location",
        name: "Location",
        description: "Building, floor, room number",
        type: "text",
        enabled: true,
        required: true,
        serviceTypes: ["all"],
        isCore: true,
        options: []
      },
      {
        id: "description",
        name: "Description",
        description: "Detailed issue description",
        type: "textarea",
        enabled: true,
        required: true,
        serviceTypes: ["all"],
        isCore: true,
        options: []
      },
      {
        id: "attachments",
        name: "Attachments",
        description: "Photo/file uploads",
        type: "file",
        enabled: true,
        required: false,
        serviceTypes: ["all"],
        isCore: true,
        options: []
      }
    ],
    notifications: {
      notifyRequestor: true,
      notifyAssignedTeam: true,
      notifyOnStatusChanges: true
    }
  }
}

export function ServiceRequestSetupWizard({
  onComplete,
  onClose,
  title = "Service Request Setup"
}: ServiceRequestSetupWizardProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(1)

  // Load initial data from localStorage
  const [wizardData, setWizardData] = useState<WizardData>(() => loadWizardData())

  // Step-specific state
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null)
  const [memberSearchQuery, setMemberSearchQuery] = useState<Record<string, string>>({})

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('serviceRequestTeams', JSON.stringify(wizardData.teams))
      localStorage.setItem('serviceRequestCategories', JSON.stringify(wizardData.categories))
      localStorage.setItem('serviceRequestServiceTypes', JSON.stringify(wizardData.serviceTypes))
      localStorage.setItem('serviceRequestStatuses', JSON.stringify(wizardData.statuses))
      localStorage.setItem('serviceRequestFormFields', JSON.stringify(wizardData.formFields))
      localStorage.setItem('serviceRequestNotifications', JSON.stringify(wizardData.notifications))
    }
  }, [wizardData])

  // Scroll to top when step changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [currentStep])

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Save final data and complete
      onComplete?.()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    } else {
      onClose?.()
    }
  }

  const updateWizardData = (updates: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...updates }))
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header with Progress Bar - Single Line */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            {title}
          </h2>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <RiCloseLine className="size-4" />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
            Step {currentStep} of {TOTAL_STEPS}
          </span>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {Math.round((currentStep / TOTAL_STEPS) * 100)}% complete
          </span>
        </div>
      </div>

      {/* Step Content */}
      <div ref={contentRef} className="flex-1 min-h-0 overflow-y-auto">
        <div className="px-6 py-6">
          {currentStep === 1 && (
            <Step1Teams
              teams={wizardData.teams}
              onTeamsChange={(teams) => updateWizardData({ teams })}
              memberSearchQuery={memberSearchQuery}
              onMemberSearchQueryChange={setMemberSearchQuery}
              editingTeamId={editingTeamId}
              onEditingTeamIdChange={setEditingTeamId}
            />
          )}
          {currentStep === 2 && (
            <Step2Categories
              categories={wizardData.categories}
              onCategoriesChange={(categories) => updateWizardData({ categories })}
              onAddCustomCategory={() => {
                // TODO: Open modal to add custom category
                console.log('Add custom category')
              }}
            />
          )}
          {currentStep === 3 && (
            <Step3ServiceTypes
              categories={wizardData.categories}
              serviceTypes={wizardData.serviceTypes}
              onServiceTypesChange={(serviceTypes) => updateWizardData({ serviceTypes })}
              onAddServiceType={() => {
                // TODO: Open modal to add service type
                console.log('Add service type')
              }}
            />
          )}
          {currentStep === 4 && (
            <Step4Statuses
              statuses={wizardData.statuses}
              onStatusesChange={(statuses) => updateWizardData({ statuses })}
              onAddCustomStatus={() => {
                // TODO: Open modal to add custom status
                console.log('Add custom status')
              }}
            />
          )}
          {currentStep === 5 && (
            <Step5FormFields
              formFields={wizardData.formFields}
              onFormFieldsChange={(formFields) => updateWizardData({ formFields })}
              onAddCustomField={() => {
                // TODO: Open modal to add custom field
                console.log('Add custom field')
              }}
            />
          )}
          {currentStep === 6 && (
            <Step6Notifications
              notifications={wizardData.notifications}
              onNotificationsChange={(notifications) => updateWizardData({ notifications })}
            />
          )}
        </div>
      </div>

      {/* Sticky Footer Actions */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={handleBack}>
            <RiArrowLeftLine className="size-4 mr-2" />
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </Button>
        </div>
        <div className="flex items-center gap-3">
          {onClose && currentStep > 1 && (
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button variant="primary" onClick={handleNext}>
            {currentStep === TOTAL_STEPS ? 'Complete setup' : 'Next'}
            {currentStep < TOTAL_STEPS && <RiArrowRightLine className="size-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
