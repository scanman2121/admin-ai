"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { RiAddLine, RiArrowLeftLine, RiArrowRightLine, RiDeleteBinLine, RiTeamLine } from "@remixicon/react"
import { useEffect, useRef, useState } from "react"

interface Team {
  id: string
  name: string
  description: string
  members: string[]
}

interface ServiceRequestSetupWizardProps {
  onComplete?: () => void
  onClose?: () => void
}

export function ServiceRequestSetupWizard({ onComplete, onClose }: ServiceRequestSetupWizardProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [teams, setTeams] = useState<Team[]>([
    {
      id: 'property-team',
      name: 'Property team',
      description: 'Default team for property management',
      members: []
    }
  ])
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: ''
  })

  const totalSteps = 1 // Currently just teams step, can be extended

  const handleAddTeam = () => {
    if (!newTeam.name.trim()) return

    const team: Team = {
      id: newTeam.name.toLowerCase().replace(/\s+/g, '-'),
      name: newTeam.name,
      description: newTeam.description || '',
      members: []
    }

    setTeams([...teams, team])
    setNewTeam({ name: '', description: '' })
  }

  const handleRemoveTeam = (teamId: string) => {
    // Don't allow removing the default Property team
    if (teamId === 'property-team') return
    setTeams(teams.filter(team => team.id !== teamId))
  }

  // Scroll to top when step changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [currentStep])

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save teams and complete
      // In a real app, this would save to the backend
      console.log('Teams configured:', teams)
      onComplete?.()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Progress Bar */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round((currentStep / totalSteps) * 100)}% complete
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto px-6 py-6">
        {currentStep === 1 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
                Create teams
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Set up teams to handle different types of service requests. You can add team members and assign them to specific request types later.
              </p>
            </div>

            {/* Existing Teams */}
            <div className="space-y-4">
              {teams.map((team) => (
                <Card key={team.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                          <RiTeamLine className="size-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                            {team.name}
                          </h3>
                          {team.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {team.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    {team.id !== 'property-team' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveTeam(team.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <RiDeleteBinLine className="size-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Add New Team Form */}
            <Card className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">
                Add team
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="team-name">Team name</Label>
                  <Input
                    id="team-name"
                    placeholder="Enter team name"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newTeam.name.trim()) {
                        handleAddTeam()
                      }
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="team-description">Description (optional)</Label>
                  <Input
                    id="team-description"
                    placeholder="Enter team description"
                    value={newTeam.description}
                    onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newTeam.name.trim()) {
                        handleAddTeam()
                      }
                    }}
                  />
                </div>
                <Button
                  onClick={handleAddTeam}
                  disabled={!newTeam.name.trim()}
                  className="w-full"
                >
                  <RiAddLine className="size-4 mr-2" />
                  Add team
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {currentStep > 1 && (
            <Button variant="ghost" onClick={handleBack}>
              <RiArrowLeftLine className="size-4 mr-2" />
              Back
            </Button>
          )}
        </div>
        <div className="flex items-center gap-3">
          {onClose && (
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button variant="primary" onClick={handleNext}>
            {currentStep === totalSteps ? 'Complete setup' : 'Next'}
            {currentStep < totalSteps && <RiArrowRightLine className="size-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  )
}

