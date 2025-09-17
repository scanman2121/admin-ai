"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Checkbox } from "@/components/Checkbox"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
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
import { RiArrowLeftLine, RiBuildingLine, RiCheckLine, RiShieldUserLine, RiSmartphoneLine, RiUserLine } from "@remixicon/react"
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

type UserType = "tenant_user" | "tenant_admin" | "building_admin"

export function ModalAddUser({ children }: ModalAddUserProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Step 1 state
  const [userType, setUserType] = useState<UserType>("tenant_user")
  const [selectedBuilding, setSelectedBuilding] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [defaultRole, setDefaultRole] = useState("")
  
  // Step 2 state
  const [inviteUsers, setInviteUsers] = useState<InviteUser[]>([])
  
  // Step 3 state
  const [sendInviteEmail, setSendInviteEmail] = useState(true)

  const userTypes = [
    {
      id: "tenant_user",
      title: "Tenant User",
      description: "Employees, residents, and any other person who uses the building.",
      icon: RiUserLine,
    },
    {
      id: "tenant_admin", 
      title: "Tenant Admin",
      description: "A tenant administrator on the HqO platform can manage their employees, register visitors, control access, and more.",
      icon: RiShieldUserLine,
    },
    {
      id: "building_admin",
      title: "Building Admin", 
      description: "Invite a HqO teammate to the HqO platform.",
      icon: RiBuildingLine,
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
    
    if (userType !== "building_admin" && !selectedBuilding) {
      showError("Please select a building")
      return
    }
    
    if (!emailInput.trim()) {
      showError("Please enter at least one email address")
      return
    }
    
    if (!defaultRole) {
      showError("Please select a role")
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
      role: defaultRole,
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
    setUserType("tenant_user")
    setSelectedBuilding("")
    setEmailInput("")
    setDefaultRole("")
    setInviteUsers([])
    setSendInviteEmail(true)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      resetForm()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        {step === 1 && (
          <>
            <DialogHeader className="pb-6">
              <DialogTitle>Add user</DialogTitle>
              <DialogDescription>
                Invite users to your workspace and assign their access permissions
              </DialogDescription>
            </DialogHeader>
            
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
              {userType !== "building_admin" && (
                <div>
                  <Label htmlFor="building-select" className="text-base font-semibold mb-2 block">
                    Building
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Select the building(s) the tenant occupies
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
              )}

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

              {/* Role Selection */}
              <div>
                <Label htmlFor="role-select" className="text-base font-semibold mb-2 block">
                  Select role(s) to apply to all users, or you can select roles individually in the next step
                </Label>
                <Select value={defaultRole} onValueChange={setDefaultRole}>
                  <SelectTrigger id="role-select">
                    <SelectValue placeholder="Select role(s)" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="pt-6 border-t">
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button onClick={handleStep1Submit}>
                Continue
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader className="pb-6">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setStep(1)}
                  className="p-1"
                >
                  <RiArrowLeftLine className="size-4" />
                </Button>
                <div>
                  <DialogTitle>Review and finalize</DialogTitle>
                  <DialogDescription>
                    Review the users you're inviting and configure their settings
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

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
      </DialogContent>
    </Dialog>
  )
}