import { Button } from "@/components/Button"
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
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { roles } from "@/data/data"
import { showError, showSuccess } from "@/lib/toast"
import { useState } from "react"

export type ModalAddUserProps = {
  children: React.ReactNode
}

export function ModalAddUser({ children }: ModalAddUserProps) {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!email) {
      showError("Please enter an email address")
      return
    }

    if (!role) {
      showError("Please select a role")
      return
    }

    // Show loading state
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      try {
        // In a real application, you would send this data to your backend
        console.log("Inviting user:", { email, role })

        // Show success message
        showSuccess(`Invitation sent to ${email}`)

        // Close the dialog after submission
        setOpen(false)

        // Reset form
        setEmail("")
        setRole("")
      } catch (error) {
        // Show error message
        showError("Failed to send invitation. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Invite people to your workspace</DialogTitle>
            <DialogDescription className="mt-1 text-sm leading-6">
              With free plan, you can add up to 10 users to each workspace.
            </DialogDescription>
            <div className="mt-4">
              <Label htmlFor="email-new-user" className="font-medium">
                Email
              </Label>
              <Input
                id="email-new-user"
                name="email-new-user"
                type="email"
                placeholder="Insert email..."
                className="mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="role-new-user" className="font-medium">
                Select role
              </Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger
                  id="role-new-user"
                  name="role-new-user"
                  className="mt-2"
                >
                  <SelectValue placeholder="Select role..." />
                </SelectTrigger>
                <SelectContent align="end">
                  {roles.map((role) => (
                    <SelectItem
                      key={role.value}
                      value={role.value}
                      disabled={role.value === "admin"}
                    >
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button
                type="button"
                className="mt-2 w-full sm:mt-0 sm:w-fit"
                variant="secondary"
                onClick={() => {
                  setEmail("")
                  setRole("")
                }}
                disabled={isSubmitting}
              >
                Go back
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="w-full sm:w-fit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Add user"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
