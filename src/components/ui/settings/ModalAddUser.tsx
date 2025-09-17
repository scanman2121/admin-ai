"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Checkbox } from "@/components/Checkbox"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/Dialog"
import { Label } from "@/components/Label"
import { RadioCardGroup, RadioCardGroupIndicator, RadioCardItem } from "@/components/RadioCard"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/Select"
import { Switch } from "@/components/Switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { companies, roles } from "@/data/data"
import { showError, showSuccess } from "@/lib/toast"
import { RiArrowLeftLine, RiBuildingLine, RiCheckLine, RiShieldUserLine, RiSmartphoneLine, RiUserLine, RiCloseLine, RiGroup2Line, RiSuitcaseLine, RiContactsLine } from "@remixicon/react"
import { useState } from "react"

export type ModalAddUserProps = {
  children: React.ReactNode
}

interface InviteUser {
  id: string
  email: string
  role: string
  company: string
  mobileAccess: boolean
}

type UserType = "tenant" | "staff" | "broker" | "contact"

export function ModalAddUser({ children }: ModalAddUserProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Step 1 state
  const [userType, setUserType] = useState<UserType>("tenant")
  const [selectedBuilding, setSelectedBuilding] = useState("")
  const [emailInput, setEmailInput] = useState("")
  
  // Step 2 state
  const [inviteUsers, setInviteUsers] = useState<InviteUser[]>([])
  
  // Step 3 state
  const [sendInviteEmail, setSendInviteEmail] = useState(true)

  const userTypes = [
    {
      id: "tenant",
      title: "Tenant",
      description: "Employees, residents, and any other person who uses the building.",
      icon: RiUserLine,
    },
    {
      id: "staff", 
      title: "Staff",
      description: "Building staff members who manage operations and provide services.",
      icon: RiGroup2Line,
    },
    {
      id: "broker",
      title: "Broker", 
      description: "Real estate brokers who facilitate leasing and property transactions.",
      icon: RiSuitcaseLine,
    },
    {
      id: "contact",
      title: "Contact", 
      description: "External contacts and vendors who work with the building.",
      icon: RiContactsLine,
    },
  ]

  const buildings = [
    { value: "building-1", label: "One Beacon Street" },
    { value: "building-2", label: "Two North Riverside Plaza" },
    { value: "building-3", label: "Three World Trade Center" },
  ]

  const handleStep1Submit = () => {
    if (!userType) {
      showError("Please select a user type")
      return
    }
    
    if (!selectedBuilding) {
      showError("Please select a building")
      return
    }
    
    if (!emailInput.trim()) {
      showError("Please enter at least one email address")
      return
    }

    // Parse emails and create invite users
    const emails = emailInput
      .split(/[,\n]/)
      .map(email => email.trim())
      .filter(email => email && email.includes("@"))
    
    if (emails.length === 0) {
      showError("Please enter valid email addresses")
      return
    }

    const newInviteUsers: InviteUser[] = emails.map((email, index) => ({
      id: `user-${index}`,
      email,
      role: roles[0].value, // Default to first role
      company: companies[0].value, // Default to first company
      mobileAccess: false,
    }))

    setInviteUsers(newInviteUsers)
    setStep(2)
  }

  const handleUserUpdate = (userId: string, field: keyof InviteUser, value: string | boolean) => {
    setInviteUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, [field]: value } : user
    ))
  }

  const handleFinalSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log("Inviting users:", {
        userType,
        building: selectedBuilding,
        users: inviteUsers,
        sendEmail: sendInviteEmail,
      })

      showSuccess(`${inviteUsers.length} invitation${inviteUsers.length > 1 ? 's' : ''} sent successfully`)
      
      // Reset form and close modal
      resetForm()
      setOpen(false)
    } catch (error) {
      showError("Failed to send invitations")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setUserType("tenant")
    setSelectedBuilding("")
    setEmailInput("")
    setInviteUsers([])
    setSendInviteEmail(true)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      resetForm()
    }
  }

  const Stepper = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep
        
        return (
          <div key={stepNumber} className="flex items-center">
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                isCompleted
                  ? 'bg-blue-600 text-white'
                  : isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {stepNumber}
            </div>
            {stepNumber < totalSteps && (
              <div className={`w-8 h-px mx-2 ${isCompleted ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
            )}
          </div>
        )
      })}
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Add user</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Invite users to your workspace and assign their access permissions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Stepper currentStep={step} totalSteps={2} />
            <DialogClose asChild>
              <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <RiCloseLine className="size-5 text-gray-500 dark:text-gray-400" />
              </button>
            </DialogClose>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
        {step === 1 && (
          <>
            
            <div className="space-y-8">
              {/* User Type Selection */}
              <div>
                <Label className="text-base font-semibold mb-4 block">Type of user</Label>
                <RadioCardGroup value={userType} onValueChange={(value) => setUserType(value as UserType)}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {userTypes.map((type) => (
                      <RadioCardItem key={type.id} value={type.id} className="h-auto">
                        <div className="flex items-start gap-3">
                          <RadioCardGroupIndicator />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <type.icon className="size-5 text-gray-700 dark:text-gray-300" />
                              <h3 className="font-semibold text-gray-900 dark:text-gray-50">
                                {type.title}
                              </h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </RadioCardItem>
                    ))}
                  </div>
                </RadioCardGroup>
              </div>

              {/* Building Selection */}
              <div>
                <Label htmlFor="building-select" className="text-base font-semibold mb-2 block">
                  Building
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Select the building(s) the user will have access to
                </p>
                <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
                  <SelectTrigger id="building-select">
                    <SelectValue placeholder="Select building(s)" />
                  </SelectTrigger>
                  <SelectContent>
                    {buildings.map((building) => (
                      <SelectItem key={building.value} value={building.value}>
                        {building.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Users Input */}
              <div>
                <Label htmlFor="users-input" className="text-base font-semibold mb-2 block">
                  Users
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Add users by email
                </p>
                <div className="space-y-4">
                  <textarea
                    id="users-input"
                    placeholder="Enter email(s) separated by commas or upload CSV"
                    className="w-full h-32 px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-md bg-white dark:bg-gray-950 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Enter email(s) separated by commas or{" "}
                    <button type="button" className="text-blue-600 hover:text-blue-500 font-medium">
                      upload CSV
                    </button>
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="pt-6 border-t">
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button onClick={handleStep1Submit}>
                Next
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex items-center gap-2 mb-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setStep(1)}
                className="p-1"
              >
                <RiArrowLeftLine className="size-4" />
              </Button>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Review and finalize</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Review the users you're inviting and configure their settings
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Roles Review Table */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold">Roles</h3>
                  <p className="text-sm text-gray-500">
                    {inviteUsers.length} user{inviteUsers.length > 1 ? 's' : ''} - 1 of 1
                  </p>
                </div>
                
                <div className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <Checkbox />
                        </TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Roles</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inviteUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell className="font-medium">{user.email}</TableCell>
                          <TableCell>
                            <Select 
                              value={user.company} 
                              onValueChange={(value) => handleUserUpdate(user.id, 'company', value)}
                            >
                              <SelectTrigger className="w-auto min-w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {companies.map((company) => (
                                  <SelectItem key={company.value} value={company.value}>
                                    {company.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Select 
                              value={user.role} 
                              onValueChange={(value) => handleUserUpdate(user.id, 'role', value)}
                            >
                              <SelectTrigger className="w-auto min-w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {roles.map((role) => (
                                  <SelectItem key={role.value} value={role.value}>
                                    {role.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>

              {/* Mobile Access */}
              <Card className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <RiSmartphoneLine className="size-5 text-gray-700 dark:text-gray-300 mt-0.5" />
                  <div>
                    <h3 className="text-base font-semibold mb-1">Mobile access</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Grant mobile app access to these users for building entry and amenity booking
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {inviteUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium">{user.email}</span>
                      <Switch 
                        checked={user.mobileAccess}
                        onCheckedChange={(checked) => handleUserUpdate(user.id, 'mobileAccess', checked)}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Send Invite */}
              <Card className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <RiCheckLine className="size-5 text-gray-700 dark:text-gray-300 mt-0.5" />
                  <div>
                    <h3 className="text-base font-semibold mb-1">Send invite</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Send an invitation email to the users to onboard
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Switch 
                    checked={sendInviteEmail}
                    onCheckedChange={setSendInviteEmail}
                  />
                  <Label className="text-sm font-medium">Send invite email</Label>
                </div>
              </Card>
            </div>

            <DialogFooter className="pt-6 border-t">
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button onClick={handleFinalSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Sending invitations..." : `Send ${inviteUsers.length} invitation${inviteUsers.length > 1 ? 's' : ''}`}
              </Button>
            </DialogFooter>
          </>
        )}
        </div>
      </DialogContent>
    </Dialog>
  )
}