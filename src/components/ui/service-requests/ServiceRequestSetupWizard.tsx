"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { RiAddLine, RiArrowLeftLine, RiArrowRightLine, RiDeleteBinLine, RiSearchLine, RiTeamLine, RiUserAddLine, RiCloseLine } from "@remixicon/react"
import { useEffect, useRef, useState } from "react"

interface TeamMember {
  id: string
  name: string
  role: string
  initials: string
  email: string
}

interface Team {
  id: string
  name: string
  description: string
  members: TeamMember[]
}

// Sample users data for search
const sampleUsers: TeamMember[] = [
  { id: '1', name: 'David Wilson', role: 'Security Lead', initials: 'DW', email: 'david.wilson@company.com' },
  { id: '2', name: 'Alex Chen', role: 'Security Officer', initials: 'AC', email: 'alex.chen@company.com' },
  { id: '3', name: 'Maria Rodriguez', role: 'Security Officer', initials: 'MR', email: 'maria.rodriguez@company.com' },
  { id: '4', name: 'John Smith', role: 'Maintenance Manager', initials: 'JS', email: 'john.smith@company.com' },
  { id: '5', name: 'Sarah Johnson', role: 'Technician', initials: 'SJ', email: 'sarah.johnson@company.com' },
  { id: '6', name: 'Mike Thompson', role: 'Technician', initials: 'MT', email: 'mike.thompson@company.com' },
  { id: '7', name: 'Emma Davis', role: 'Housekeeping Lead', initials: 'ED', email: 'emma.davis@company.com' },
  { id: '8', name: 'Carlos Martinez', role: 'Cleaner', initials: 'CM', email: 'carlos.martinez@company.com' },
  { id: '9', name: 'Lisa Wang', role: 'Concierge Manager', initials: 'LW', email: 'lisa.wang@company.com' },
  { id: '10', name: 'Robert Brown', role: 'Facility Manager', initials: 'RB', email: 'robert.brown@company.com' },
  { id: '11', name: 'Jennifer Lee', role: 'Operations Coordinator', initials: 'JL', email: 'jennifer.lee@company.com' },
  { id: '12', name: 'Michael Chang', role: 'Maintenance Technician', initials: 'MC', email: 'michael.chang@company.com' }
]

interface ServiceRequestSetupWizardProps {
  onComplete?: () => void
  onClose?: () => void
  iframeUrl?: string
}

export function ServiceRequestSetupWizard({ onComplete, onClose, iframeUrl = "https://v0-workflow-system-design-sage.vercel.app/" }: ServiceRequestSetupWizardProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [showIframe, setShowIframe] = useState(false)
  const [iframeStep, setIframeStep] = useState(1)
  const [iframeTotalSteps, setIframeTotalSteps] = useState(5) // Default to 5, will be updated from iframe
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
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null)
  const [memberSearchQuery, setMemberSearchQuery] = useState<Record<string, string>>({})

  // Calculate total steps: 1 for teams + iframe steps
  const totalSteps = 1 + iframeTotalSteps
  // Calculate current step: 1 for teams, then 2+ for iframe steps
  const overallStep = showIframe ? 1 + iframeStep : 1

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

  const handleAddMember = (teamId: string, member: TeamMember) => {
    setTeams(prev => prev.map(team => {
      if (team.id === teamId && !team.members.find(m => m.id === member.id)) {
        return { ...team, members: [...team.members, member] }
      }
      return team
    }))
    setMemberSearchQuery(prev => ({ ...prev, [teamId]: '' }))
  }

  const handleRemoveMember = (teamId: string, memberId: string) => {
    setTeams(prev => prev.map(team => {
      if (team.id === teamId) {
        return { ...team, members: team.members.filter(m => m.id !== memberId) }
      }
      return team
    }))
  }

  const getFilteredUsers = (teamId: string) => {
    const team = teams.find(t => t.id === teamId)
    const existingMemberIds = team?.members.map(m => m.id) || []
    const query = memberSearchQuery[teamId] || ''
    
    return sampleUsers.filter(user =>
      !existingMemberIds.includes(user.id) &&
      (user.name.toLowerCase().includes(query.toLowerCase()) ||
       user.email.toLowerCase().includes(query.toLowerCase()) ||
       user.role.toLowerCase().includes(query.toLowerCase()))
    )
  }

  // Scroll to top when step changes
  useEffect(() => {
    if (contentRef.current && !showIframe) {
      contentRef.current.scrollTop = 0
    }
    if (iframeRef.current?.contentWindow && showIframe) {
      try {
        iframeRef.current.contentWindow.scrollTo({ top: 0, behavior: 'instant' })
      } catch (e) {
        // Cross-origin restrictions may prevent this
      }
    }
  }, [currentStep, showIframe])

  // Listen for messages from iframe to track step progress and completion
  useEffect(() => {
    if (!showIframe) return

    const handleMessage = (event: MessageEvent) => {
      try {
        const iframeOrigin = new URL(iframeUrl).origin
        if (event.origin !== iframeOrigin) return
        
        const data = event.data
        
        // Track iframe step changes
        if (data?.step !== undefined) {
          setIframeStep(data.step)
        }
        if (data?.currentStep !== undefined) {
          setIframeStep(data.currentStep)
        }
        if (data?.totalSteps !== undefined) {
          setIframeTotalSteps(data.totalSteps)
        }
        if (data?.stepChange) {
          setIframeStep(data.stepChange.current || iframeStep + 1)
          if (data.stepChange.total) {
            setIframeTotalSteps(data.stepChange.total)
          }
        }
        
        // If the iframe sends a completion message
        if (data?.type === 'complete' || data?.completed || data?.finished) {
          onComplete?.()
        }
      } catch (e) {
        // Ignore errors
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [showIframe, iframeUrl, onComplete, iframeStep])

  const handleNext = () => {
    if (currentStep === 1) {
      // Save teams and move to iframe wizard
      // In a real app, this would save to the backend
      console.log('Teams configured:', teams)
      setShowIframe(true)
      setIframeStep(1)
    } else {
      onComplete?.()
    }
  }

  const handleBack = () => {
    if (showIframe) {
      // If on first iframe step, go back to teams
      if (iframeStep === 1) {
        setShowIframe(false)
        setCurrentStep(1)
      } else {
        // Otherwise, let iframe handle back navigation
        // Send message to iframe to go back
        if (iframeRef.current?.contentWindow) {
          try {
            iframeRef.current.contentWindow.postMessage(
              { type: 'navigate', action: 'back' },
              new URL(iframeUrl).origin
            )
          } catch (e) {
            // If that doesn't work, just decrement step
            setIframeStep(prev => Math.max(1, prev - 1))
          }
        }
      }
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Progress Bar */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            {showIframe && (
              <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2 -ml-2">
                <RiArrowLeftLine className="size-4" />
                {iframeStep === 1 ? 'Back to teams' : 'Back'}
              </Button>
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Step {overallStep} of {totalSteps}
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round((overallStep / totalSteps) * 100)}% complete
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(overallStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div ref={contentRef} className="flex-1 min-h-0">
        {showIframe ? (
          <iframe
            ref={iframeRef}
            src={iframeUrl}
            className="w-full h-full border-0"
            title="Service Request Setup Wizard"
            allow="fullscreen"
            onLoad={() => {
              if (iframeRef.current?.contentWindow) {
                try {
                  iframeRef.current.contentWindow.scrollTo({ top: 0, behavior: 'instant' })
                } catch (e) {
                  // Cross-origin restrictions may prevent this
                }
              }
            }}
          />
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-6">
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
              {teams.map((team) => {
                const isEditing = editingTeamId === team.id
                const filteredUsers = getFilteredUsers(team.id)
                const showSearchResults = isEditing && (memberSearchQuery[team.id] || '').length > 0

                return (
                  <Card key={team.id} className="p-4">
                    <div className="space-y-4">
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
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingTeamId(isEditing ? null : team.id)}
                            className="flex items-center gap-1"
                          >
                            {isEditing ? 'Done' : 'Edit members'}
                          </Button>
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
                      </div>

                      {/* Team Members */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Team members ({team.members.length})
                          </Label>
                        </div>

                        {/* Existing Members */}
                        {team.members.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {team.members.map((member) => (
                              <div
                                key={member.id}
                                className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-md text-sm"
                              >
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-xs font-medium">
                                  {member.initials}
                                </div>
                                <span>{member.name}</span>
                                {isEditing && (
                                  <button
                                    onClick={() => handleRemoveMember(team.id, member.id)}
                                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200 ml-1"
                                  >
                                    <RiCloseLine className="size-3" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add Members Section */}
                        {isEditing && (
                          <div className="space-y-2">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <RiSearchLine className="size-4 text-gray-400" />
                              </div>
                              <Input
                                placeholder="Search by name, email, or role..."
                                value={memberSearchQuery[team.id] || ''}
                                onChange={(e) => setMemberSearchQuery(prev => ({
                                  ...prev,
                                  [team.id]: e.target.value
                                }))}
                                className="w-full pl-10"
                              />
                            </div>

                            {/* Search Results */}
                            {showSearchResults && (
                              <div className="max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-md">
                                {filteredUsers.length > 0 ? (
                                  filteredUsers.slice(0, 10).map((user) => (
                                    <button
                                      key={user.id}
                                      onClick={() => handleAddMember(team.id, user)}
                                      className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                                    >
                                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-sm font-medium">
                                        {user.initials}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                          {user.name}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                          {user.role} • {user.email}
                                        </div>
                                      </div>
                                      <RiUserAddLine className="size-4 text-gray-400" />
                                    </button>
                                  ))
                                ) : (
                                  <div className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                                    No users found
                                  </div>
                                )}
                              </div>
                            )}

                            {!showSearchResults && team.members.length === 0 && (
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Search for users to add to this team
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })}
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
        )}
      </div>

      {/* Footer Actions - Only show for teams step, iframe handles its own navigation */}
      {!showIframe && (
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
              Next
              <RiArrowRightLine className="size-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

