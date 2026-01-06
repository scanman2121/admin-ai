"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Switch } from "@/components/Switch"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import { Tooltip } from "@/components/Tooltip"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FullPageModal } from "@/components/ui/FullPageModal"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { RadioCardGroup, RadioCardGroupIndicator, RadioCardItem } from "@/components/RadioCard"
import { serviceRequestStatuses } from "@/data/statuses"
import { RiAddLine, RiArrowDownSLine, RiArrowLeftLine, RiArrowRightSLine, RiDeleteBin6Line, RiMore2Line } from "@remixicon/react"
import { Pencil, User, Users, DollarSign, CircleDollarSign, Lock } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Service Requests Settings page
const tabs = [
    { name: "Settings", href: "/operations/service-requests/settings/general" },
    { name: "Statuses", href: "/operations/service-requests/settings/statuses" },
    { name: "Service types", href: "/operations/service-requests/settings/service-types-categories" },
    { name: "Teams", href: "/operations/service-requests/settings/teams" },
    { name: "Tenant users", href: "/operations/service-requests/settings/users" },
    { name: "Email templates", href: "/operations/service-requests/settings/email-template" },
    { name: "Connected accounts", href: "/operations/service-requests/settings/connected-accounts" },
]

// Categories data
const categoriesData = [
    {
        id: 1,
        name: "Cleaning & Waste",
        description: "Need something cleaned, picked up, or removed — like trash, recycling, or windows?",
        status: true,
        assignedTo: "Housekeeping Team",
        assignedToType: "team" as "user" | "team",
    },
    {
        id: 2,
        name: "Temperature & Air",
        description: "Too hot, too cold, or something off with the air? Let us know.",
        status: true,
        assignedTo: "Maintenance Team",
        assignedToType: "team" as "user" | "team",
    },
    {
        id: 3,
        name: "Repairs & Maintenance",
        description: "Something broken, leaking, or not working right? We'll take care of it.",
        status: true,
        assignedTo: "Maintenance Team",
        assignedToType: "team" as "user" | "team",
    },
    {
        id: 4,
        name: "Access & Security",
        description: "Need help with a key, badge, lock, or getting into a space?",
        status: true,
        assignedTo: "Security Team",
        assignedToType: "team" as "user" | "team",
    },
    {
        id: 5,
        name: "Hospitality & Concierge",
        description: "Need a hand around the building — deliveries, event setup, or general help?",
        status: true,
        assignedTo: "Concierge Team",
        assignedToType: "team" as "user" | "team",
    },
    {
        id: 6,
        name: "Signage & Facilities",
        description: "Need an update to signage, directories, or parking info?",
        status: true,
        assignedTo: "Facilities Team",
        assignedToType: "team" as "user" | "team",
    },
    {
        id: 7,
        name: "Other",
        description: "Miscellaneous service requests and general inquiries",
        status: true,
        assignedTo: "",
        assignedToType: "user" as "user" | "team",
    }
]

// Service types data organized by category
const serviceTypesData = [
    // Cleaning & Waste
    {
        id: 1,
        requestType: "More Cleaning",
        description: "Additional cleaning services",
        category: "Cleaning & Waste",
        approval: "None",
        assignedTo: "Housekeeping Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 2,
        requestType: "Bin Service",
        description: "General bin service and maintenance",
        category: "Cleaning & Waste",
        approval: "None",
        assignedTo: "Housekeeping Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 3,
        requestType: "Garbage Bin",
        description: "Garbage bin collection or replacement",
        category: "Cleaning & Waste",
        approval: "None",
        assignedTo: "Housekeeping Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 4,
        requestType: "Recycling Bin",
        description: "Recycling bin collection or replacement",
        category: "Cleaning & Waste",
        approval: "None",
        assignedTo: "Housekeeping Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 5,
        requestType: "Dumpster Service",
        description: "Dumpster pickup or service",
        category: "Cleaning & Waste",
        approval: "None",
        assignedTo: "Housekeeping Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 6,
        requestType: "Rubbish Removal",
        description: "Large rubbish or waste removal",
        category: "Cleaning & Waste",
        approval: "None",
        assignedTo: "Housekeeping Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 7,
        requestType: "E-Waste Removal",
        description: "Electronic waste disposal",
        category: "Cleaning & Waste",
        approval: "Building Manager",
        assignedTo: "Housekeeping Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 8,
        requestType: "Carpet Shampooing",
        description: "Professional carpet shampooing service",
        category: "Cleaning & Waste",
        approval: "Building Manager",
        assignedTo: "Housekeeping Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 9,
        requestType: "Interior Windows",
        description: "Interior window cleaning",
        category: "Cleaning & Waste",
        approval: "None",
        assignedTo: "Housekeeping Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 10,
        requestType: "Exterior Windows",
        description: "Exterior window cleaning",
        category: "Cleaning & Waste",
        approval: "Building Manager",
        assignedTo: "Housekeeping Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    // Temperature & Air
    {
        id: 11,
        requestType: "HVAC Maintenance",
        description: "Scheduled HVAC system maintenance",
        category: "Temperature & Air",
        approval: "Building Manager",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 12,
        requestType: "HVAC Overtime",
        description: "After-hours HVAC service request",
        category: "Temperature & Air",
        approval: "Building Manager",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 13,
        requestType: "Too Hot",
        description: "Temperature too high",
        category: "Temperature & Air",
        approval: "None",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 14,
        requestType: "Too Cold",
        description: "Temperature too low",
        category: "Temperature & Air",
        approval: "None",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 15,
        requestType: "Utility Billback",
        description: "Utility billing and charges",
        category: "Temperature & Air",
        approval: "Building Manager",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "Completed"],
    },
    // Repairs & Maintenance
    {
        id: 16,
        requestType: "Electrical",
        description: "Electrical repairs and maintenance",
        category: "Repairs & Maintenance",
        approval: "Building Manager",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 17,
        requestType: "Plumbing",
        description: "Plumbing repairs and fixtures",
        category: "Repairs & Maintenance",
        approval: "Building Manager",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 18,
        requestType: "Leaks",
        description: "Water leaks and moisture issues",
        category: "Repairs & Maintenance",
        approval: "None",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 19,
        requestType: "Lighting",
        description: "Lighting repairs and bulb replacement",
        category: "Repairs & Maintenance",
        approval: "None",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 20,
        requestType: "Door Service",
        description: "Door repairs and adjustments",
        category: "Repairs & Maintenance",
        approval: "None",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 21,
        requestType: "Handyman",
        description: "General handyman services",
        category: "Repairs & Maintenance",
        approval: "None",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 22,
        requestType: "Engineering",
        description: "Engineering and technical services",
        category: "Repairs & Maintenance",
        approval: "Building Manager",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 23,
        requestType: "Exterminating",
        description: "Pest control services",
        category: "Repairs & Maintenance",
        approval: "Building Manager",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 24,
        requestType: "Lift/Elevator",
        description: "Elevator maintenance and repairs",
        category: "Repairs & Maintenance",
        approval: "Building Manager",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 25,
        requestType: "Shutdown",
        description: "System shutdown requests",
        category: "Repairs & Maintenance",
        approval: "Building Manager",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "Completed"],
    },
    {
        id: 26,
        requestType: "Isolation",
        description: "System isolation for maintenance",
        category: "Repairs & Maintenance",
        approval: "Building Manager",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "Completed"],
    },
    {
        id: 27,
        requestType: "Woodwork",
        description: "Wood repairs and carpentry",
        category: "Repairs & Maintenance",
        approval: "None",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 28,
        requestType: "Metalwork",
        description: "Metal repairs and welding",
        category: "Repairs & Maintenance",
        approval: "Building Manager",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 29,
        requestType: "Marble Work",
        description: "Marble repairs and maintenance",
        category: "Repairs & Maintenance",
        approval: "Building Manager",
        assignedTo: "Maintenance Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    // Access & Security
    {
        id: 30,
        requestType: "Access Request",
        description: "Building or area access requests",
        category: "Access & Security",
        approval: "Tenant POC",
        assignedTo: "Security Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed", "Cancelled"],
    },
    {
        id: 31,
        requestType: "Security",
        description: "General security services",
        category: "Access & Security",
        approval: "Building Manager",
        assignedTo: "Security Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 32,
        requestType: "More Security",
        description: "Additional security services",
        category: "Access & Security",
        approval: "Building Manager",
        assignedTo: "Security Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 33,
        requestType: "Key & Lock",
        description: "Key and lock services",
        category: "Access & Security",
        approval: "Tenant POC",
        assignedTo: "Security Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 34,
        requestType: "Locksmith",
        description: "Professional locksmith services",
        category: "Access & Security",
        approval: "Building Manager",
        assignedTo: "Security Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 35,
        requestType: "New ID",
        description: "New identification badge request",
        category: "Access & Security",
        approval: "Tenant POC",
        assignedTo: "Security Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 36,
        requestType: "ID Replacement",
        description: "Replace lost or damaged ID badge",
        category: "Access & Security",
        approval: "Tenant POC",
        assignedTo: "Security Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 37,
        requestType: "ID Cancellation",
        description: "Cancel ID badge access",
        category: "Access & Security",
        approval: "Tenant POC",
        assignedTo: "Security Team",
        status: true,
        statuses: ["New", "Open", "Completed"],
    },
    // Hospitality & Concierge
    {
        id: 38,
        requestType: "Porter Service",
        description: "Porter and assistance services",
        category: "Hospitality & Concierge",
        approval: "None",
        assignedTo: "Concierge Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 39,
        requestType: "Day Services",
        description: "Daytime concierge services",
        category: "Hospitality & Concierge",
        approval: "None",
        assignedTo: "Concierge Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 40,
        requestType: "Night Services",
        description: "Evening and overnight services",
        category: "Hospitality & Concierge",
        approval: "None",
        assignedTo: "Concierge Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 41,
        requestType: "Supply Request",
        description: "Office supplies and materials",
        category: "Hospitality & Concierge",
        approval: "None",
        assignedTo: "Concierge Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 42,
        requestType: "Furniture",
        description: "Furniture delivery and setup",
        category: "Hospitality & Concierge",
        approval: "Tenant POC",
        assignedTo: "Concierge Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 43,
        requestType: "Engineering",
        description: "Engineering support services",
        category: "Hospitality & Concierge",
        approval: "Building Manager",
        assignedTo: "Concierge Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    // Signage & Facilities
    {
        id: 44,
        requestType: "Signage",
        description: "Building signage updates",
        category: "Signage & Facilities",
        approval: "Building Manager",
        assignedTo: "Facilities Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 45,
        requestType: "Directory Plates",
        description: "Directory and name plate updates",
        category: "Signage & Facilities",
        approval: "Building Manager",
        assignedTo: "Facilities Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 46,
        requestType: "Parking",
        description: "Parking requests and issues",
        category: "Signage & Facilities",
        approval: "Building Manager",
        assignedTo: "Facilities Team",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    // Other
    {
        id: 47,
        requestType: "Help Request",
        description: "General help and assistance",
        category: "Other",
        approval: "None",
        assignedTo: "",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 48,
        requestType: "Unlisted",
        description: "Request type not listed",
        category: "Other",
        approval: "None",
        assignedTo: "",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
    {
        id: 49,
        requestType: "Unspecified",
        description: "Unspecified service request",
        category: "Other",
        approval: "None",
        assignedTo: "",
        status: true,
        statuses: ["New", "Open", "In Progress", "Completed"],
    },
]

export default function ServiceRequestsServiceTypesCategories() {
    const pathname = usePathname()
    const [categories, setCategories] = useState(categoriesData)
    const [serviceTypes, setServiceTypes] = useState(serviceTypesData)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [categoryFilter, setCategoryFilter] = useState("All Categories")
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
    
    // Service Type Modal States
    const [isAddServiceTypeModalOpen, setIsAddServiceTypeModalOpen] = useState(false)
    const [isEditServiceTypeModalOpen, setIsEditServiceTypeModalOpen] = useState(false)
    const [editingServiceType, setEditingServiceType] = useState<typeof serviceTypesData[0] | null>(null)
    const [openServiceTypeDropdownId, setOpenServiceTypeDropdownId] = useState<number | null>(null)
    
    // Category Modal States
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false)
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<typeof categoriesData[0] | null>(null)
    const [openCategoryDropdownId, setOpenCategoryDropdownId] = useState<number | null>(null)
    
    const [isSetupModalOpen, setIsSetupModalOpen] = useState(false)
    
    const [newServiceType, setNewServiceType] = useState({
        requestType: "",
        description: "",
        category: "Cleaning & Waste",
        approval: "None",
        needsApproval: false,
        approvalType: "tenant-admin" as "tenant-admin" | "specific-member" | "team" | "role",
        assignedTo: "",
        assignedToType: "user" as "user" | "team",
        priceType: "none" as "none" | "fixed" | "range",
        priceFixed: "",
        priceMin: "",
        priceMax: "",
        statuses: [] as Array<{
            name: string;
            notifyRequestor: boolean;
            notifyAssignee: boolean;
        }>
    })
    
    const [assignedToSearchQuery, setAssignedToSearchQuery] = useState("")
    const [isAssignedToDropdownOpen, setIsAssignedToDropdownOpen] = useState(false)

    const [newCategory, setNewCategory] = useState({
        name: "",
        description: "",
        assignedTo: "",
        assignedToType: "user" as "user" | "team",
        priceType: "none" as "none" | "fixed" | "range",
        priceFixed: "",
        priceMin: "",
        priceMax: "",
    })

    // New status creation states
    const [isAddingNewStatus, setIsAddingNewStatus] = useState(false)
    const [newStatus, setNewStatus] = useState({
        name: "",
        color: "blue"
    })
    
    // Load statuses from localStorage or use default
    const [availableStatuses, setAvailableStatuses] = useState<typeof serviceRequestStatuses>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('serviceRequestStatuses')
            return saved ? JSON.parse(saved) : serviceRequestStatuses
        }
        return serviceRequestStatuses
    })

    // Color options for custom statuses
    const statusColors = [
        { name: "Blue", value: "blue", bgClass: "bg-blue-400", textClass: "text-blue-800", bgLight: "bg-blue-50" },
        { name: "Green", value: "green", bgClass: "bg-green-400", textClass: "text-green-800", bgLight: "bg-green-50" },
        { name: "Yellow", value: "yellow", bgClass: "bg-yellow-400", textClass: "text-yellow-800", bgLight: "bg-yellow-50" },
        { name: "Orange", value: "orange", bgClass: "bg-orange-400", textClass: "text-orange-800", bgLight: "bg-orange-50" },
        { name: "Red", value: "red", bgClass: "bg-red-400", textClass: "text-red-800", bgLight: "bg-red-50" },
        { name: "Purple", value: "purple", bgClass: "bg-purple-400", textClass: "text-purple-800", bgLight: "bg-purple-50" },
        { name: "Gray", value: "gray", bgClass: "bg-gray-400", textClass: "text-gray-800", bgLight: "bg-gray-50" },
        { name: "Pink", value: "pink", bgClass: "bg-pink-400", textClass: "text-pink-800", bgLight: "bg-pink-50" },
        { name: "Indigo", value: "indigo", bgClass: "bg-indigo-400", textClass: "text-indigo-800", bgLight: "bg-indigo-50" },
        { name: "Teal", value: "teal", bgClass: "bg-teal-400", textClass: "text-teal-800", bgLight: "bg-teal-50" },
    ]

    // Sample users and teams data
    const sampleUsers = [
        { id: '1', name: 'David Wilson', role: 'Security Lead', type: 'user' },
        { id: '2', name: 'Alex Chen', role: 'Security Officer', type: 'user' },
        { id: '3', name: 'Maria Rodriguez', role: 'Security Officer', type: 'user' },
        { id: '4', name: 'John Smith', role: 'Maintenance Manager', type: 'user' },
        { id: '5', name: 'Sarah Johnson', role: 'Technician', type: 'user' },
        { id: '6', name: 'Mike Thompson', role: 'Technician', type: 'user' },
        { id: '7', name: 'Emma Davis', role: 'Housekeeping Lead', type: 'user' },
        { id: '8', name: 'Carlos Martinez', role: 'Cleaner', type: 'user' },
        { id: '9', name: 'Lisa Wang', role: 'Concierge Manager', type: 'user' },
        { id: '10', name: 'Robert Brown', role: 'Facility Manager', type: 'user' }
    ]

    const sampleTeams = [
        { id: '1', name: 'Security Team', description: '24/7 security monitoring', type: 'team' },
        { id: '2', name: 'Maintenance Team', description: 'Property maintenance', type: 'team' },
        { id: '3', name: 'Housekeeping Team', description: 'Cleaning services', type: 'team' },
        { id: '4', name: 'Concierge Team', description: 'Guest services', type: 'team' },
        { id: '5', name: 'IT Support Team', description: 'Technology support', type: 'team' }
    ]

    const allAssignableItems = [...sampleUsers, ...sampleTeams]

    const getCategoryBadgeVariant = (category: string) => {
        switch (category) {
            case 'Cleaning & Waste':
                return 'success' as const
            case 'Temperature & Air':
                return 'warning' as const
            case 'Repairs & Maintenance':
                return 'warning' as const
            case 'Access & Security':
                return 'error' as const
            case 'Hospitality & Concierge':
                return 'default' as const
            case 'Signage & Facilities':
                return 'neutral' as const
            case 'Other':
                return 'neutral' as const
            default:
                return 'default' as const
        }
    }

    // Helper function to format price display
    const formatPrice = (
        serviceType: typeof serviceTypesData[0] & { priceType?: 'none' | 'fixed' | 'range'; priceFixed?: string; priceMin?: string; priceMax?: string },
        category?: typeof categoriesData[0] & { priceType?: 'none' | 'fixed' | 'range'; priceFixed?: string; priceMin?: string; priceMax?: string }
    ) => {
        // Check if service type has its own pricing
        if (serviceType.priceType && serviceType.priceType !== 'none') {
            if (serviceType.priceType === 'fixed' && serviceType.priceFixed) {
                return `$${parseFloat(serviceType.priceFixed).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            }
            
            if (serviceType.priceType === 'range') {
                const min = serviceType.priceMin ? parseFloat(serviceType.priceMin).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
                const max = serviceType.priceMax ? parseFloat(serviceType.priceMax).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
                if (min && max) {
                    return `$${min} - $${max}`
                } else if (min) {
                    return `$${min}+`
                } else if (max) {
                    return `Up to $${max}`
                }
            }
        }
        
        // Fall back to category pricing if service type doesn't have pricing
        if (category && category.priceType && category.priceType !== 'none') {
            if (category.priceType === 'fixed' && category.priceFixed) {
                return `$${parseFloat(category.priceFixed).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            }
            
            if (category.priceType === 'range') {
                const min = category.priceMin ? parseFloat(category.priceMin).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
                const max = category.priceMax ? parseFloat(category.priceMax).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
                if (min && max) {
                    return `$${min} - $${max}`
                } else if (min) {
                    return `$${min}+`
                } else if (max) {
                    return `Up to $${max}`
                }
            }
        }
        
        return '-'
    }

    const toggleCategoryExpansion = (categoryName: string) => {
        setExpandedCategories(prev => {
            const newSet = new Set(Array.from(prev))
            if (newSet.has(categoryName)) {
                newSet.delete(categoryName)
            } else {
                newSet.add(categoryName)
            }
            return newSet
        })
    }

    const handleCategoryStatusToggle = (id: number) => {
        setCategories(prev => 
            prev.map(category => 
                category.id === id ? { ...category, status: !category.status } : category
            )
        )
    }

    const handleServiceTypeStatusToggle = (id: number) => {
        setServiceTypes(prev => 
            prev.map(item => 
                item.id === id ? { ...item, status: !item.status } : item
            )
        )
    }

    const handleAddCategory = () => {
        if (!newCategory.name.trim() || !newCategory.description.trim()) {
            return
        }

        const newId = Math.max(...categories.map(item => item.id)) + 1
        const category = {
            id: newId,
            ...newCategory,
            status: true
        }

        setCategories(prev => [...prev, category])
        setNewCategory({
            name: "",
            description: "",
            assignedTo: "",
            assignedToType: "user",
            priceType: "none",
            priceFixed: "",
            priceMin: "",
            priceMax: "",
        })
        setIsAddCategoryModalOpen(false)
    }

    const handleEditCategory = (category: typeof categoriesData[0]) => {
        setEditingCategory(category)
        setNewCategory({
            name: category.name,
            description: category.description,
            assignedTo: category.assignedTo || "",
            assignedToType: category.assignedToType || "user",
            priceType: (category as any).priceType || "none",
            priceFixed: (category as any).priceFixed || "",
            priceMin: (category as any).priceMin || "",
            priceMax: (category as any).priceMax || "",
        })
        setIsEditCategoryModalOpen(true)
    }

    const handleUpdateCategory = () => {
        if (!editingCategory || !newCategory.name.trim() || !newCategory.description.trim()) {
            return
        }

        setCategories(prev => prev.map(item => 
            item.id === editingCategory.id 
                ? { ...item, ...newCategory }
                : item
        ))
        
        setEditingCategory(null)
        setNewCategory({
            name: "",
            description: "",
            assignedTo: "",
            assignedToType: "user",
            priceType: "none",
            priceFixed: "",
            priceMin: "",
            priceMax: "",
        })
        setIsEditCategoryModalOpen(false)
    }

    const handleDeleteCategory = (id: number) => {
        setCategories(prev => prev.filter(item => item.id !== id))
        setOpenCategoryDropdownId(null)
    }

    const handleAddServiceType = () => {
        if (!newServiceType.requestType.trim() || !newServiceType.description.trim()) {
            return
        }

        // Get the category's assigned to value if not set at service type level
        const selectedCategory = categories.find(cat => cat.name === newServiceType.category)
        const finalAssignedTo = newServiceType.assignedTo || selectedCategory?.assignedTo || ""
        const finalAssignedToType = newServiceType.assignedTo ? newServiceType.assignedToType : (selectedCategory?.assignedToType || "user")

        if (!finalAssignedTo.trim()) {
            return
        }

        const newId = Math.max(...serviceTypes.map(item => item.id)) + 1
        const serviceType = {
            id: newId,
            ...newServiceType,
            assignedTo: finalAssignedTo,
            assignedToType: finalAssignedToType,
            status: true,
            statuses: newServiceType.statuses.map(s => s.name) // Convert back to simple array for display
        }

        setServiceTypes(prev => [...prev, serviceType])
        setNewServiceType({
            requestType: "",
            description: "",
            category: "Cleaning & Waste",
            approval: "None",
            needsApproval: false,
            approvalType: "tenant-admin",
            assignedTo: "",
            assignedToType: "user",
            priceType: "none",
            priceFixed: "",
            priceMin: "",
            priceMax: "",
            statuses: []
        })
        setAssignedToSearchQuery("")
        setIsAssignedToDropdownOpen(false)
        setIsAddServiceTypeModalOpen(false)
    }

    const handleEditServiceType = (serviceType: typeof serviceTypesData[0]) => {
        setEditingServiceType(serviceType)
        const hasApproval = serviceType.approval && serviceType.approval !== "None"
        // Map old approval values to new structure
        let approvalType: "tenant-admin" | "specific-member" | "team" | "role" = "tenant-admin"
        if (serviceType.approval === "Tenant POC") {
            approvalType = "tenant-admin"
        } else if (serviceType.approval === "Building Manager" || serviceType.approval === "Property Manager") {
            approvalType = "specific-member"
        }
        
        setNewServiceType({
            requestType: serviceType.requestType,
            description: serviceType.description,
            category: serviceType.category,
            approval: serviceType.approval,
            needsApproval: hasApproval as boolean,
            approvalType: approvalType,
            assignedTo: serviceType.assignedTo,
            assignedToType: "user", // Default to user, could be enhanced to detect type
            priceType: (serviceType as any).priceType || "none",
            priceFixed: (serviceType as any).priceFixed || "",
            priceMin: (serviceType as any).priceMin || "",
            priceMax: (serviceType as any).priceMax || "",
            statuses: (serviceType.statuses || []).map(statusName => ({
                name: statusName,
                notifyRequestor: true,
                notifyAssignee: true
            }))
        })
        setAssignedToSearchQuery("")
        setIsAssignedToDropdownOpen(false)
        setIsEditServiceTypeModalOpen(true)
    }

    const handleUpdateServiceType = () => {
        if (!editingServiceType || !newServiceType.requestType.trim() || !newServiceType.description.trim()) {
            return
        }

        // Get the category's assigned to value if not set at service type level
        const selectedCategory = categories.find(cat => cat.name === newServiceType.category)
        const finalAssignedTo = newServiceType.assignedTo || selectedCategory?.assignedTo || ""
        const finalAssignedToType = newServiceType.assignedTo ? newServiceType.assignedToType : (selectedCategory?.assignedToType || "user")

        if (!finalAssignedTo.trim()) {
            return
        }

        setServiceTypes(prev => prev.map(item => 
            item.id === editingServiceType.id 
                ? { 
                    ...item, 
                    ...newServiceType,
                    assignedTo: finalAssignedTo,
                    assignedToType: finalAssignedToType,
                    statuses: newServiceType.statuses.map(s => s.name) // Convert back to simple array for display
                }
                : item
        ))
        
        setEditingServiceType(null)
        setNewServiceType({
            requestType: "",
            description: "",
            category: "Cleaning & Waste",
            approval: "None",
            needsApproval: false,
            approvalType: "tenant-admin",
            assignedTo: "",
            assignedToType: "user",
            priceType: "none",
            priceFixed: "",
            priceMin: "",
            priceMax: "",
            statuses: []
        })
        setAssignedToSearchQuery("")
        setIsAssignedToDropdownOpen(false)
        setIsEditServiceTypeModalOpen(false)
    }

    const handleDeleteServiceType = (id: number) => {
        setServiceTypes(prev => prev.filter(item => item.id !== id))
        setOpenServiceTypeDropdownId(null)
    }

    const handleStatusToggleInModal = (statusName: string) => {
        setNewServiceType(prev => {
            const existingStatus = prev.statuses.find(s => s.name === statusName)
            if (existingStatus) {
                // Remove status
                return {
                    ...prev,
                    statuses: prev.statuses.filter(s => s.name !== statusName)
                }
            } else {
                // Add status with default notification settings
                return {
                    ...prev,
                    statuses: [...prev.statuses, {
                        name: statusName,
                        notifyRequestor: true,
                        notifyAssignee: true
                    }]
                }
            }
        })
    }

    const handleNotificationToggle = (statusName: string, notificationType: 'requestor' | 'assignee') => {
        setNewServiceType(prev => ({
            ...prev,
            statuses: prev.statuses.map(status => 
                status.name === statusName 
                    ? {
                        ...status,
                        [notificationType === 'requestor' ? 'notifyRequestor' : 'notifyAssignee']: 
                            !status[notificationType === 'requestor' ? 'notifyRequestor' : 'notifyAssignee']
                    }
                    : status
            )
        }))
    }

    const handleAssignedToSelect = (item: typeof allAssignableItems[0]) => {
        setNewServiceType(prev => ({
            ...prev,
            assignedTo: item.name,
            assignedToType: item.type as "user" | "team"
        }))
        setAssignedToSearchQuery("")
        setIsAssignedToDropdownOpen(false)
    }

    const handleCategoryAssignedToSelect = (item: typeof allAssignableItems[0]) => {
        setNewCategory(prev => ({
            ...prev,
            assignedTo: item.name,
            assignedToType: item.type as "user" | "team"
        }))
        setAssignedToSearchQuery("")
        setIsAssignedToDropdownOpen(false)
    }

    const filteredAssignableItems = allAssignableItems.filter(item =>
        item.name.toLowerCase().includes(assignedToSearchQuery.toLowerCase()) ||
        (item as any).role?.toLowerCase().includes(assignedToSearchQuery.toLowerCase()) ||
        (item as any).description?.toLowerCase().includes(assignedToSearchQuery.toLowerCase())
    )

    // Helper function to get color classes
    const getColorClasses = (color: string) => {
        const colorOption = statusColors.find(c => c.value === color)
        return colorOption || statusColors[0] // Default to blue if not found
    }

    const handleAddNewStatus = () => {
        if (!newStatus.name.trim()) return

        const newId = Math.max(...availableStatuses.map(s => s.id)) + 1
        const newStatusItem = {
            id: newId,
            name: newStatus.name,
            description: `Custom status: ${newStatus.name}`,
            status: true,
            color: newStatus.color,
            orderCount: 0
        }

        const updatedStatuses = [...availableStatuses, newStatusItem]
        setAvailableStatuses(updatedStatuses)
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('serviceRequestStatuses', JSON.stringify(updatedStatuses))
        }
        
        // Also add to the service type's statuses
        setNewServiceType(prev => ({
            ...prev,
            statuses: [...prev.statuses, {
                name: newStatus.name,
                notifyRequestor: true,
                notifyAssignee: true
            }]
        }))

        setNewStatus({ name: "", color: "blue" })
        setIsAddingNewStatus(false)
    }

    const handleCancelNewStatus = () => {
        setNewStatus({ name: "", color: "blue" })
        setIsAddingNewStatus(false)
    }

    const filteredCategories = categories.filter(category => {
        const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            category.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "All" || 
                            (statusFilter === "Active" && category.status) ||
                            (statusFilter === "Inactive" && !category.status)
        return matchesSearch && matchesStatus
    })

    const getFilteredServiceTypes = (categoryName: string) => {
        const categoryServiceTypes = serviceTypes.filter(serviceType => serviceType.category === categoryName)
        return categoryServiceTypes.filter(serviceType => {
            const matchesSearch = serviceType.requestType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                serviceType.description.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesStatus = statusFilter === "All" || 
                                (statusFilter === "Active" && serviceType.status) ||
                                (statusFilter === "Inactive" && !serviceType.status)
            return matchesSearch && matchesStatus
        })
    }

    return (
        <div className="space-y-6 max-w-full overflow-hidden">
            {/* Header with back navigation */}
            <div className="flex items-center gap-3">
                <Link 
                    href="/operations/service-requests"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <RiArrowLeftLine className="mr-1 size-4" />
                    Service Requests
                </Link>
            </div>

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
                        Service request settings
                    </h1>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <Button 
                        variant="ghost" 
                        onClick={() => setIsSetupModalOpen(true)}
                        className="flex-shrink-0"
                    >
                        Setup wizard
                    </Button>
                    <Button variant="primary" className="flex-shrink-0">
                        Save
                    </Button>
                </div>
            </div>

            {/* Tab Navigation */}
            <TabNavigation>
                {tabs.map((tab) => (
                    <TabNavigationLink
                        key={tab.name}
                        asChild
                        active={pathname === tab.href}
                    >
                        <Link href={tab.href}>{tab.name}</Link>
                    </TabNavigationLink>
                ))}
            </TabNavigation>

            {/* Service Types and Categories Content */}
            <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                            Service types and categories
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Organize service requests by category and define specific service types with approval workflows
                        </p>
                    </div>
                <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
                        <Button 
                            variant="ghost" 
                            onClick={() => setIsAddCategoryModalOpen(true)}
                            className="flex-shrink-0"
                        >
                        <RiAddLine className="size-4 mr-1.5" />
                        Add category
                    </Button>
                        <Button 
                            variant="ghost" 
                            onClick={() => {
                                // Initialize with all statuses selected
                                const allStatuses = availableStatuses.map(status => ({
                                    name: status.name,
                                    notifyRequestor: true,
                                    notifyAssignee: true
                                }))
                                setNewServiceType({
                                    requestType: "",
                                    description: "",
                                    category: "Cleaning & Waste",
                                    approval: "None",
                                    needsApproval: false,
                                    approvalType: "tenant-admin",
                                    assignedTo: "",
                                    assignedToType: "user" as "user" | "team",
                                    priceType: "none" as "none" | "fixed" | "range",
                                    priceFixed: "",
                                    priceMin: "",
                                    priceMax: "",
                                    statuses: allStatuses
                                })
                                setIsAddServiceTypeModalOpen(true)
                            }}
                            className="flex-shrink-0"
                        >
                        <RiAddLine className="size-4 mr-1.5" />
                        Add service type
                    </Button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <input
                    type="text"
                    placeholder="Search categories and service types..."
                    className="w-full sm:w-80 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent whitespace-nowrap flex-shrink-0"
                    >
                        <option>All</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent whitespace-nowrap flex-shrink-0"
                    >
                        <option>All Categories</option>
                        <option>Cleaning & Waste</option>
                        <option>Temperature & Air</option>
                        <option>Repairs & Maintenance</option>
                        <option>Access & Security</option>
                        <option>Hospitality & Concierge</option>
                        <option>Signage & Facilities</option>
                        <option>Other</option>
                    </select>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th scope="col" className="w-40 px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Name / Request Type
                            </th>
                            <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                Category
                            </th>
                            <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                Approval
                            </th>
                            <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                Assigned To
                            </th>
                            <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                Price
                            </th>
                            <th scope="col" className="w-96 px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Statuses
                            </th>
                            <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                Enable
                            </th>
                            <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredCategories.map((category) => {
                            const isExpanded = expandedCategories.has(category.name)
                            const categoryServiceTypes = getFilteredServiceTypes(category.name)
                            
                            return (
                                <>
                                    {/* Category Row */}
                                    <tr key={`category-${category.id}`} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="w-40 px-4 lg:px-6 py-4">
                                            <button
                                                onClick={() => toggleCategoryExpansion(category.name)}
                                                className="flex items-center gap-2 text-left w-full"
                                            >
                                                {isExpanded ? (
                                                    <RiArrowDownSLine className="size-4 text-gray-500 flex-shrink-0" />
                                                ) : (
                                                    <RiArrowRightSLine className="size-4 text-gray-500 flex-shrink-0" />
                                                )}
                                                <div className="min-w-0">
                                                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-50 truncate">
                                                        {category.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                                        {category.description} ({categoryServiceTypes.length} service types)
                                                    </div>
                                                </div>
                                            </button>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                            <Badge variant={getCategoryBadgeVariant(category.name)}>
                                                Category
                                            </Badge>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            -
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                            {category.assignedTo ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-sm">
                                                        {category.assignedToType === 'user' ? (
                                                            <User className="size-3 text-gray-500" />
                                                        ) : (
                                                            <Users className="size-3 text-gray-500" />
                                                        )}
                                                        <span>{category.assignedTo}</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 dark:text-gray-500">-</span>
                                            )}
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {formatPrice({ priceType: (category as any).priceType || 'none' } as any, category)}
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            -
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                            <div className="flex justify-start">
                                                <Switch
                                                    checked={category.status}
                                                    onCheckedChange={() => handleCategoryStatusToggle(category.id)}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center gap-1 justify-start">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="p-2 h-8 w-8"
                                                    onClick={() => handleEditCategory(category)}
                                                >
                                                    <Pencil className="size-4" style={{ color: '#696E72' }} />
                                                </Button>
                                                
                                                <div className="relative">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="p-2 h-8 w-8"
                                                        onClick={() => setOpenCategoryDropdownId(openCategoryDropdownId === category.id ? null : category.id)}
                                                    >
                                                        <RiMore2Line className="size-4" />
                                                    </Button>
                                                    
                                                    {openCategoryDropdownId === category.id && (
                                                        <>
                                                            <div 
                                                                className="fixed inset-0 z-10" 
                                                                onClick={() => setOpenCategoryDropdownId(null)}
                                                            />
                                                            <div className="absolute right-0 top-full mt-1 z-20 min-w-[120px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                                                                <button
                                                                    onClick={() => handleDeleteCategory(category.id)}
                                                                    className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                                                >
                                                                    <RiDeleteBin6Line className="size-4" />
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                    {/* Service Type Rows (shown when expanded) */}
                                    {isExpanded && categoryServiceTypes.map((serviceType) => (
                                        <tr key={`service-${serviceType.id}`} className="hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                                            <td className="w-40 px-4 lg:px-6 py-4 pl-8 lg:pl-12">
                                                <div className="space-y-1">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-50 truncate">
                                                        {serviceType.requestType}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                                        {serviceType.description}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                                <Badge variant={getCategoryBadgeVariant(serviceType.category)}>
                                                    {serviceType.category}
                                                </Badge>
                                            </td>
                                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-50">
                                                {serviceType.approval}
                                            </td>
                                            <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 dark:text-gray-50">
                                                {(() => {
                                                    const categoryAssignedTo = category.assignedTo
                                                    const isUsingCategoryAssignedTo = categoryAssignedTo && serviceType.assignedTo === categoryAssignedTo
                                                    
                                                    if (isUsingCategoryAssignedTo) {
                                                        return (
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-sm">
                                                                    {category.assignedToType === 'user' ? (
                                                                        <User className="size-3 text-gray-500" />
                                                                    ) : (
                                                                        <Users className="size-3 text-gray-500" />
                                                                    )}
                                                                    <span>{serviceType.assignedTo}</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    
                                                    return serviceType.assignedTo
                                                })()}
                                            </td>
                                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-50">
                                                {formatPrice(serviceType, category)}
                                            </td>
                                            <td className="w-96 px-4 lg:px-6 py-4">
                                                <div className="flex flex-wrap gap-1 min-h-[32px]">
                                                    {serviceType.statuses?.slice(0, 4).map((status) => (
                                                        <span
                                                            key={status}
                                                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 whitespace-nowrap"
                                                        >
                                                            {status}
                                                        </span>
                                                    ))}
                                                    {(serviceType.statuses?.length || 0) > 4 && (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                            +{(serviceType.statuses?.length || 0) - 4} more
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                                <div className="flex justify-start">
                                                    <Switch
                                                        checked={serviceType.status}
                                                        onCheckedChange={() => handleServiceTypeStatusToggle(serviceType.id)}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center gap-1 justify-start">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="p-2 h-8 w-8"
                                                        onClick={() => handleEditServiceType(serviceType)}
                                                    >
                                                        <Pencil className="size-4" style={{ color: '#696E72' }} />
                                                    </Button>
                                                    
                                                    <div className="relative">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="p-2 h-8 w-8"
                                                            onClick={() => setOpenServiceTypeDropdownId(openServiceTypeDropdownId === serviceType.id ? null : serviceType.id)}
                                                        >
                                                            <RiMore2Line className="size-4" />
                                                        </Button>
                                                        
                                                        {openServiceTypeDropdownId === serviceType.id && (
                                                            <>
                                                                <div 
                                                                    className="fixed inset-0 z-10" 
                                                                    onClick={() => setOpenServiceTypeDropdownId(null)}
                                                                />
                                                                <div className="absolute right-0 top-full mt-1 z-20 min-w-[120px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                                                                    <button
                                                                        onClick={() => handleDeleteServiceType(serviceType.id)}
                                                                        className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                                                    >
                                                                        <RiDeleteBin6Line className="size-4" />
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )
                        })}
                    </tbody>
                </table>
                
                {filteredCategories.length === 0 && (
                    <div className="p-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            No categories or service types found matching your criteria.
                        </p>
                    </div>
                )}
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
                {filteredCategories.length === 0 ? (
                    <div className="p-8 text-center border border-gray-200 dark:border-gray-700 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">
                            No categories or service types found matching your criteria.
                        </p>
                    </div>
                ) : (
                    filteredCategories.map((category) => {
                        const isExpanded = expandedCategories.has(category.name)
                        const categoryServiceTypes = getFilteredServiceTypes(category.name)
                        
                        return (
                            <div key={`category-mobile-${category.id}`} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                {/* Category Card */}
                                <div className="bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-start justify-between gap-4">
                                        <button
                                            onClick={() => toggleCategoryExpansion(category.name)}
                                            className="flex-1 flex items-start gap-3 text-left"
                                        >
                                            {isExpanded ? (
                                                <RiArrowDownSLine className="size-5 text-gray-500 flex-shrink-0 mt-0.5" />
                                            ) : (
                                                <RiArrowRightSLine className="size-5 text-gray-500 flex-shrink-0 mt-0.5" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                                                        {category.name}
                                                    </h3>
                                                    <Badge variant={getCategoryBadgeVariant(category.name)}>
                                                        Category
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                                    {category.description}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {categoryServiceTypes.length} service types
                                                </p>
                                            </div>
                                        </button>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <Switch
                                                checked={category.status}
                                                onCheckedChange={() => handleCategoryStatusToggle(category.id)}
                                            />
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="p-2 h-8 w-8"
                                                onClick={() => handleEditCategory(category)}
                                            >
                                                <Pencil className="size-4" style={{ color: '#696E72' }} />
                                            </Button>
                                            <div className="relative">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="p-2 h-8 w-8"
                                                    onClick={() => setOpenCategoryDropdownId(openCategoryDropdownId === category.id ? null : category.id)}
                                                >
                                                    <RiMore2Line className="size-4" />
                                                </Button>
                                                {openCategoryDropdownId === category.id && (
                                                    <>
                                                        <div 
                                                            className="fixed inset-0 z-10" 
                                                            onClick={() => setOpenCategoryDropdownId(null)}
                                                        />
                                                        <div className="absolute right-0 top-full mt-1 z-20 min-w-[120px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                                                            <button
                                                                onClick={() => handleDeleteCategory(category.id)}
                                                                className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                                            >
                                                                <RiDeleteBin6Line className="size-4" />
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Category Assigned To */}
                                    {category.assignedTo && (
                                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Assigned to</div>
                                            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-sm w-fit">
                                                {category.assignedToType === 'user' ? (
                                                    <User className="size-3 text-gray-500" />
                                                ) : (
                                                    <Users className="size-3 text-gray-500" />
                                                )}
                                                <span>{category.assignedTo}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Category Pricing */}
                                    {(() => {
                                        const categoryPrice = formatPrice({ priceType: (category as any).priceType || 'none' } as any, category)
                                        if (categoryPrice !== '-') {
                                            return (
                                                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Default pricing</div>
                                                    <div className="text-sm text-gray-900 dark:text-gray-50 font-medium">
                                                        {categoryPrice}
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return null
                                    })()}
                                </div>
                                
                                {/* Service Types (shown when expanded) */}
                                {isExpanded && categoryServiceTypes.length > 0 && (
                                    <div className="bg-gray-50 dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {categoryServiceTypes.map((serviceType) => (
                                            <div key={`service-mobile-${serviceType.id}`} className="p-4">
                                                <div className="flex items-start justify-between gap-4 mb-3">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                                                                {serviceType.requestType}
                                                            </h4>
                                                            <Badge variant={getCategoryBadgeVariant(serviceType.category)}>
                                                                {serviceType.category}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                                            {serviceType.description}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 flex-shrink-0">
                                                        <Switch
                                                            checked={serviceType.status}
                                                            onCheckedChange={() => handleServiceTypeStatusToggle(serviceType.id)}
                                                        />
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="p-2 h-8 w-8"
                                                            onClick={() => handleEditServiceType(serviceType)}
                                                        >
                                                            <Pencil className="size-4" style={{ color: '#696E72' }} />
                                                        </Button>
                                                        <div className="relative">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="p-2 h-8 w-8"
                                                                onClick={() => setOpenServiceTypeDropdownId(openServiceTypeDropdownId === serviceType.id ? null : serviceType.id)}
                                                            >
                                                                <RiMore2Line className="size-4" />
                                                            </Button>
                                                            {openServiceTypeDropdownId === serviceType.id && (
                                                                <>
                                                                    <div 
                                                                        className="fixed inset-0 z-10" 
                                                                        onClick={() => setOpenServiceTypeDropdownId(null)}
                                                                    />
                                                                    <div className="absolute right-0 top-full mt-1 z-20 min-w-[120px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                                                                        <button
                                                                            onClick={() => handleDeleteServiceType(serviceType.id)}
                                                                            className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                                                        >
                                                                            <RiDeleteBin6Line className="size-4" />
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-4 text-xs">
                                                        <div>
                                                            <span className="text-gray-500 dark:text-gray-400">Approval:</span>
                                                            <span className="ml-1 text-gray-900 dark:text-gray-50">{serviceType.approval}</span>
                                                        </div>
                                                        {(() => {
                                                            const categoryAssignedTo = category.assignedTo
                                                            const isUsingCategoryAssignedTo = categoryAssignedTo && serviceType.assignedTo === categoryAssignedTo
                                                            
                                                            if (isUsingCategoryAssignedTo || serviceType.assignedTo) {
                                                                return (
                                                                    <div>
                                                                        <span className="text-gray-500 dark:text-gray-400">Assigned to:</span>
                                                                        <span className="ml-1 text-gray-900 dark:text-gray-50">
                                                                            {serviceType.assignedTo || '-'}
                                                                        </span>
                                                                    </div>
                                                                )
                                                            }
                                                            return null
                                                        })()}
                                                        <div>
                                                            <span className="text-gray-500 dark:text-gray-400">Price:</span>
                                                            <span className="ml-1 text-gray-900 dark:text-gray-50">{formatPrice(serviceType, category)}</span>
                                                        </div>
                                                    </div>
                                                    
                                                    {serviceType.statuses && serviceType.statuses.length > 0 && (
                                                        <div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Statuses</div>
                                                            <div className="flex flex-wrap gap-1">
                                                                {serviceType.statuses.slice(0, 6).map((status) => (
                                                                    <span
                                                                        key={status}
                                                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                                                    >
                                                                        {status}
                                                                    </span>
                                                                ))}
                                                                {(serviceType.statuses.length || 0) > 6 && (
                                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                                                                        +{(serviceType.statuses.length || 0) - 6} more
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })
                )}
            </div>
            </div>

            {/* Add Category Modal */}
            <Dialog open={isAddCategoryModalOpen} onOpenChange={setIsAddCategoryModalOpen}>
                <DialogContent className="max-w-2xl w-[calc(100vw-2rem)] sm:w-full">
                    <DialogHeader>
                        <DialogTitle>Add new category</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 px-4 sm:px-6 py-4 overflow-y-auto flex-1">
                        <div>
                            <Label htmlFor="category-name">Category name *</Label>
                            <input
                                id="category-name"
                                type="text"
                                placeholder="Enter category name"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="category-description">Description *</Label>
                            <textarea
                                id="category-description"
                                rows={3}
                                placeholder="Enter category description"
                                value={newCategory.description}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="category-assigned">Assigned to (optional)</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                If set, this will be the default assigned to value for all service types in this category
                            </p>
                            <div className="relative">
                                <Input
                                    id="category-assigned"
                                    placeholder="Search users and teams..."
                                    value={assignedToSearchQuery}
                                    onChange={(e) => {
                                        setAssignedToSearchQuery(e.target.value)
                                        setIsAssignedToDropdownOpen(true)
                                    }}
                                    onFocus={() => setIsAssignedToDropdownOpen(true)}
                                />
                                
                                {isAssignedToDropdownOpen && (
                                    <>
                                        <div 
                                            className="fixed inset-0 z-10" 
                                            onClick={() => setIsAssignedToDropdownOpen(false)}
                                        />
                                        <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                            {filteredAssignableItems.length > 0 ? (
                                                filteredAssignableItems.map((item) => (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => handleCategoryAssignedToSelect(item)}
                                                        className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3"
                                                    >
                                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700">
                                                            {item.type === 'user' ? (
                                                                <User className="size-4 text-gray-500" />
                                                            ) : (
                                                                <Users className="size-4 text-gray-500" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                {item.name}
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                {(item as any).role || (item as any).description} • {item.type === 'user' ? 'User' : 'Team'}
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                                                    No users or teams found
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                                
                                {newCategory.assignedTo && (
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-sm">
                                            {newCategory.assignedToType === 'user' ? (
                                                <User className="size-3 text-gray-500" />
                                            ) : (
                                                <Users className="size-3 text-gray-500" />
                                            )}
                                            <span>{newCategory.assignedTo}</span>
                                            <button
                                                onClick={() => setNewCategory(prev => ({ ...prev, assignedTo: "", assignedToType: "user" }))}
                                                className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-gradient-to-br from-gray-50/80 via-white to-gray-50/50 dark:from-gray-800/50 dark:via-gray-900/30 dark:to-gray-800/50 p-6 shadow-sm backdrop-blur-sm">
                            <div className="mb-5 flex items-start gap-3">
                                <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/10 p-2.5 border border-blue-200/50 dark:border-blue-800/30">
                                    <DollarSign className="size-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <Label className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-0.5 block">Pricing</Label>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                        If set, this will be the default pricing for all service types in this category
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-8">
                                <RadioGroup
                                    value={newCategory.priceType}
                                    onValueChange={(value) => setNewCategory(prev => ({ 
                                        ...prev, 
                                        priceType: value as "none" | "fixed" | "range",
                                        priceFixed: value !== "fixed" ? "" : prev.priceFixed,
                                        priceMin: value !== "range" ? "" : prev.priceMin,
                                        priceMax: value !== "range" ? "" : prev.priceMax,
                                    }))}
                                    className="flex flex-col gap-3 min-w-[160px]"
                                >
                                    <div className="flex items-center gap-3 group cursor-pointer p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                                        <RadioGroupItem value="none" id="category-price-none" className="mt-0.5" />
                                        <Label htmlFor="category-price-none" className="cursor-pointer font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                                            No price
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-3 group cursor-pointer p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                                        <RadioGroupItem value="fixed" id="category-price-fixed" className="mt-0.5" />
                                        <Label htmlFor="category-price-fixed" className="cursor-pointer font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                                            Fixed price
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-3 group cursor-pointer p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                                        <RadioGroupItem value="range" id="category-price-range" className="mt-0.5" />
                                        <Label htmlFor="category-price-range" className="cursor-pointer font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                                            Price range
                                        </Label>
                                    </div>
                                </RadioGroup>
                                
                                <div className="flex-1 border-l border-gray-200/60 dark:border-gray-700/60 pl-8">
                                    {newCategory.priceType === "fixed" && (
                                        <div className="space-y-3">
                                            <Label htmlFor="category-price-fixed-input" className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider block">Amount</Label>
                                            <div className="relative group">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-800">
                                                    <span className="text-base font-semibold text-gray-700 dark:text-gray-300">$</span>
                                                </div>
                                                <Input
                                                    id="category-price-fixed-input"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    placeholder="155.00"
                                                    value={newCategory.priceFixed}
                                                    onChange={(e) => setNewCategory(prev => ({ ...prev, priceFixed: e.target.value }))}
                                                    className="pl-12 h-12 text-lg font-semibold bg-white dark:bg-gray-900 border-0 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    
                                    {newCategory.priceType === "range" && (
                                        <div className="space-y-4">
                                            <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider block">Price range</Label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2.5">
                                                    <Label htmlFor="category-price-min" className="text-xs font-medium text-gray-600 dark:text-gray-400 block">Minimum</Label>
                                                    <div className="relative group">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-800">
                                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">$</span>
                                                        </div>
                                                        <Input
                                                            id="category-price-min"
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            placeholder="100.00"
                                                            value={newCategory.priceMin}
                                                            onChange={(e) => setNewCategory(prev => ({ ...prev, priceMin: e.target.value }))}
                                                            className="pl-12 h-11 text-base font-semibold bg-white dark:bg-gray-900 border-0 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2.5">
                                                    <Label htmlFor="category-price-max" className="text-xs font-medium text-gray-600 dark:text-gray-400 block">Maximum</Label>
                                                    <div className="relative group">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-800">
                                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">$</span>
                                                        </div>
                                                        <Input
                                                            id="category-price-max"
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            placeholder="200.00"
                                                            value={newCategory.priceMax}
                                                            onChange={(e) => setNewCategory(prev => ({ ...prev, priceMax: e.target.value }))}
                                                            className="pl-12 h-11 text-base font-semibold bg-white dark:bg-gray-900 border-0 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {newCategory.priceType === "none" && (
                                        <div className="flex items-center h-12 text-sm text-gray-500 dark:text-gray-400 italic bg-gray-50/50 dark:bg-gray-800/30 rounded-lg px-4 border border-dashed border-gray-200 dark:border-gray-700">
                                            No pricing configured
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setIsAddCategoryModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddCategory}>
                                Add category
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Category Modal */}
            <Dialog open={isEditCategoryModalOpen} onOpenChange={setIsEditCategoryModalOpen}>
                <DialogContent className="max-w-2xl w-[calc(100vw-2rem)] sm:w-full">
                    <DialogHeader>
                        <DialogTitle>Edit category</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 px-4 sm:px-6 py-4 overflow-y-auto flex-1">
                        <div>
                            <Label htmlFor="edit-category-name">Category name *</Label>
                            <input
                                id="edit-category-name"
                                type="text"
                                placeholder="Enter category name"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="edit-category-description">Description *</Label>
                            <textarea
                                id="edit-category-description"
                                rows={3}
                                placeholder="Enter category description"
                                value={newCategory.description}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="edit-category-assigned">Assigned to (optional)</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                If set, this will be the default assigned to value for all service types in this category
                            </p>
                            <div className="relative">
                                <Input
                                    id="edit-category-assigned"
                                    placeholder="Search users and teams..."
                                    value={assignedToSearchQuery}
                                    onChange={(e) => {
                                        setAssignedToSearchQuery(e.target.value)
                                        setIsAssignedToDropdownOpen(true)
                                    }}
                                    onFocus={() => setIsAssignedToDropdownOpen(true)}
                                />
                                
                                {isAssignedToDropdownOpen && (
                                    <>
                                        <div 
                                            className="fixed inset-0 z-10" 
                                            onClick={() => setIsAssignedToDropdownOpen(false)}
                                        />
                                        <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                            {filteredAssignableItems.length > 0 ? (
                                                filteredAssignableItems.map((item) => (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => handleCategoryAssignedToSelect(item)}
                                                        className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3"
                                                    >
                                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700">
                                                            {item.type === 'user' ? (
                                                                <User className="size-4 text-gray-500" />
                                                            ) : (
                                                                <Users className="size-4 text-gray-500" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                {item.name}
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                {(item as any).role || (item as any).description} • {item.type === 'user' ? 'User' : 'Team'}
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                                                    No users or teams found
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                                
                                {newCategory.assignedTo && (
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-sm">
                                            {newCategory.assignedToType === 'user' ? (
                                                <User className="size-3 text-gray-500" />
                                            ) : (
                                                <Users className="size-3 text-gray-500" />
                                            )}
                                            <span>{newCategory.assignedTo}</span>
                                            <button
                                                onClick={() => setNewCategory(prev => ({ ...prev, assignedTo: "", assignedToType: "user" }))}
                                                className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-gradient-to-br from-gray-50/80 via-white to-gray-50/50 dark:from-gray-800/50 dark:via-gray-900/30 dark:to-gray-800/50 p-6 shadow-sm backdrop-blur-sm">
                            <div className="mb-5 flex items-start gap-3">
                                <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/10 p-2.5 border border-blue-200/50 dark:border-blue-800/30">
                                    <DollarSign className="size-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <Label className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-0.5 block">Pricing</Label>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                        If set, this will be the default pricing for all service types in this category
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-8">
                                <RadioGroup
                                    value={newCategory.priceType}
                                    onValueChange={(value) => setNewCategory(prev => ({ 
                                        ...prev, 
                                        priceType: value as "none" | "fixed" | "range",
                                        priceFixed: value !== "fixed" ? "" : prev.priceFixed,
                                        priceMin: value !== "range" ? "" : prev.priceMin,
                                        priceMax: value !== "range" ? "" : prev.priceMax,
                                    }))}
                                    className="flex flex-col gap-3 min-w-[160px]"
                                >
                                    <div className="flex items-center gap-3 group cursor-pointer p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                                        <RadioGroupItem value="none" id="edit-category-price-none" className="mt-0.5" />
                                        <Label htmlFor="edit-category-price-none" className="cursor-pointer font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                                            No price
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-3 group cursor-pointer p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                                        <RadioGroupItem value="fixed" id="edit-category-price-fixed" className="mt-0.5" />
                                        <Label htmlFor="edit-category-price-fixed" className="cursor-pointer font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                                            Fixed price
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-3 group cursor-pointer p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                                        <RadioGroupItem value="range" id="edit-category-price-range" className="mt-0.5" />
                                        <Label htmlFor="edit-category-price-range" className="cursor-pointer font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                                            Price range
                                        </Label>
                                    </div>
                                </RadioGroup>
                                
                                <div className="flex-1 border-l border-gray-200/60 dark:border-gray-700/60 pl-8">
                                    {newCategory.priceType === "fixed" && (
                                        <div className="space-y-3">
                                            <Label htmlFor="edit-category-price-fixed-input" className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider block">Amount</Label>
                                            <div className="relative group">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-800">
                                                    <span className="text-base font-semibold text-gray-700 dark:text-gray-300">$</span>
                                                </div>
                                                <Input
                                                    id="edit-category-price-fixed-input"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    placeholder="155.00"
                                                    value={newCategory.priceFixed}
                                                    onChange={(e) => setNewCategory(prev => ({ ...prev, priceFixed: e.target.value }))}
                                                    className="pl-12 h-12 text-lg font-semibold bg-white dark:bg-gray-900 border-0 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    
                                    {newCategory.priceType === "range" && (
                                        <div className="space-y-4">
                                            <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider block">Price range</Label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2.5">
                                                    <Label htmlFor="edit-category-price-min" className="text-xs font-medium text-gray-600 dark:text-gray-400 block">Minimum</Label>
                                                    <div className="relative group">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-800">
                                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">$</span>
                                                        </div>
                                                        <Input
                                                            id="edit-category-price-min"
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            placeholder="100.00"
                                                            value={newCategory.priceMin}
                                                            onChange={(e) => setNewCategory(prev => ({ ...prev, priceMin: e.target.value }))}
                                                            className="pl-12 h-11 text-base font-semibold bg-white dark:bg-gray-900 border-0 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2.5">
                                                    <Label htmlFor="edit-category-price-max" className="text-xs font-medium text-gray-600 dark:text-gray-400 block">Maximum</Label>
                                                    <div className="relative group">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-800">
                                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">$</span>
                                                        </div>
                                                        <Input
                                                            id="edit-category-price-max"
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            placeholder="200.00"
                                                            value={newCategory.priceMax}
                                                            onChange={(e) => setNewCategory(prev => ({ ...prev, priceMax: e.target.value }))}
                                                            className="pl-12 h-11 text-base font-semibold bg-white dark:bg-gray-900 border-0 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {newCategory.priceType === "none" && (
                                        <div className="flex items-center h-12 text-sm text-gray-500 dark:text-gray-400 italic bg-gray-50/50 dark:bg-gray-800/30 rounded-lg px-4 border border-dashed border-gray-200 dark:border-gray-700">
                                            No pricing configured
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setIsEditCategoryModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleUpdateCategory}>
                                Update category
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Add Service Type Modal */}
            <Dialog open={isAddServiceTypeModalOpen} onOpenChange={setIsAddServiceTypeModalOpen}>
                <DialogContent className="max-w-4xl w-[calc(100vw-2rem)] sm:w-full max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add service type</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 px-4 sm:px-6 py-4 overflow-y-auto flex-1">
                        <div>
                            <Label htmlFor="service-type-name">Request type *</Label>
                            <Input
                                id="service-type-name"
                                placeholder="Enter request type"
                                value={newServiceType.requestType}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, requestType: e.target.value }))}
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="service-type-description">Description *</Label>
                            <textarea
                                id="service-type-description"
                                rows={3}
                                placeholder="Enter description"
                                value={newServiceType.description}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, description: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="service-type-category">Category *</Label>
                            <select
                                id="service-type-category"
                                value={newServiceType.category}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, category: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            >
                                <option>Cleaning & Waste</option>
                                <option>Temperature & Air</option>
                                <option>Repairs & Maintenance</option>
                                <option>Access & Security</option>
                                <option>Hospitality & Concierge</option>
                                <option>Signage & Facilities</option>
                                <option>Other</option>
                            </select>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="service-type-needs-approval">Needs approval</Label>
                                <Switch
                                    id="service-type-needs-approval"
                                    checked={newServiceType.needsApproval}
                                    onCheckedChange={(checked) => setNewServiceType(prev => ({ 
                                        ...prev, 
                                        needsApproval: checked,
                                        approval: checked ? (prev.approvalType === "tenant-admin" ? "Tenant POC" : "Building Manager") : "None"
                                    }))}
                                />
                            </div>
                            
                            {newServiceType.needsApproval && (
                                <div className="space-y-3">
                                    <RadioCardGroup
                                        value={newServiceType.approvalType}
                                        onValueChange={(value) => {
                                            const approvalMap: Record<string, string> = {
                                                "tenant-admin": "Tenant POC",
                                                "specific-member": "Building Manager",
                                                "team": "Building Manager",
                                                "role": "Building Manager"
                                            }
                                            setNewServiceType(prev => ({ 
                                                ...prev, 
                                                approvalType: value as typeof prev.approvalType,
                                                approval: approvalMap[value] || "Building Manager"
                                            }))
                                        }}
                                    >
                                        <RadioCardItem value="tenant-admin" className="h-auto">
                                            <div className="flex items-start gap-3">
                                                <RadioCardGroupIndicator className="mt-0.5" />
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900 dark:text-gray-50">
                                                        Tenant Admin
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        When this request type is submitted, it must first be approved by the Tenant admin of the Tenant company submitting the request.
                                                    </div>
                                                </div>
                                            </div>
                                        </RadioCardItem>
                                        
                                        <RadioCardItem value="specific-member" className="h-auto">
                                            <div className="flex items-start gap-3">
                                                <RadioCardGroupIndicator className="mt-0.5" />
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900 dark:text-gray-50">
                                                        Specific Member
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        Select a specific member who must approve requests of this type before they can proceed.
                                                    </div>
                                                </div>
                                            </div>
                                        </RadioCardItem>
                                        
                                        <RadioCardItem value="team" className="h-auto">
                                            <div className="flex items-start gap-3">
                                                <RadioCardGroupIndicator className="mt-0.5" />
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900 dark:text-gray-50">
                                                        Team
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        Select a team that must approve requests of this type before they can proceed.
                                                    </div>
                                                </div>
                                            </div>
                                        </RadioCardItem>
                                        
                                        <RadioCardItem value="role" className="h-auto">
                                            <div className="flex items-start gap-3">
                                                <RadioCardGroupIndicator className="mt-0.5" />
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900 dark:text-gray-50">
                                                        Role
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        Select a specific role that must approve requests of this type before they can proceed.
                                                    </div>
                                                </div>
                                            </div>
                                        </RadioCardItem>
                                    </RadioCardGroup>
                                </div>
                            )}
                        </div>
                        
                        <div>
                            <Label htmlFor="service-type-assigned">Assigned to *</Label>
                            {(() => {
                                const selectedCategory = categories.find(cat => cat.name === newServiceType.category)
                                const hasCategoryAssignedTo = selectedCategory?.assignedTo
                                
                                if (hasCategoryAssignedTo) {
                                    return (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-md text-sm">
                                                <span className="text-xs font-medium">
                                                    {selectedCategory?.assignedToType === 'user' ? 'U' : 'T'}
                                                </span>
                                                <span>{selectedCategory?.assignedTo}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Assigned to is set at the category level
                                            </p>
                                        </div>
                                    )
                                }
                                
                                return (
                                    <div className="relative">
                                        <Input
                                            id="service-type-assigned"
                                            placeholder="Search users and teams..."
                                            value={assignedToSearchQuery}
                                            onChange={(e) => {
                                                setAssignedToSearchQuery(e.target.value)
                                                setIsAssignedToDropdownOpen(true)
                                            }}
                                            onFocus={() => setIsAssignedToDropdownOpen(true)}
                                        />
                                
                                        {isAssignedToDropdownOpen && (
                                            <>
                                                <div 
                                                    className="fixed inset-0 z-10" 
                                                    onClick={() => setIsAssignedToDropdownOpen(false)}
                                                />
                                                <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                                    {filteredAssignableItems.length > 0 ? (
                                                        filteredAssignableItems.map((item) => (
                                                            <button
                                                                key={item.id}
                                                                onClick={() => handleAssignedToSelect(item)}
                                                                className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3"
                                                            >
                                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700">
                                                                    {item.type === 'user' ? (
                                                                        <User className="size-4 text-gray-500" />
                                                                    ) : (
                                                                        <Users className="size-4 text-gray-500" />
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                        {item.name}
                                                                    </div>
                                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                        {(item as any).role || (item as any).description} • {item.type === 'user' ? 'User' : 'Team'}
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        ))
                                                    ) : (
                                                        <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                                                            No users or teams found
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        
                                        {newServiceType.assignedTo && (
                                            <div className="mt-2 flex items-center gap-2">
                                                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-sm">
                                                    {newServiceType.assignedToType === 'user' ? (
                                                        <User className="size-3 text-gray-500" />
                                                    ) : (
                                                        <Users className="size-3 text-gray-500" />
                                                    )}
                                                    <span>{newServiceType.assignedTo}</span>
                                                    <button
                                                        onClick={() => setNewServiceType(prev => ({ ...prev, assignedTo: "", assignedToType: "user" }))}
                                                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })()}
                        </div>

                        <div className="rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-gradient-to-br from-gray-50/80 via-white to-gray-50/50 dark:from-gray-800/50 dark:via-gray-900/30 dark:to-gray-800/50 p-6 shadow-sm backdrop-blur-sm">
                            <div className="mb-5 flex items-start gap-3">
                                <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/10 p-2.5 border border-blue-200/50 dark:border-blue-800/30">
                                    <DollarSign className="size-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <Label className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-1.5 block">Pricing</Label>
                                </div>
                            </div>
                            {(() => {
                                const selectedCategory = categories.find(cat => cat.name === newServiceType.category)
                                const hasCategoryPricing = selectedCategory && (selectedCategory as any).priceType && (selectedCategory as any).priceType !== 'none'
                                
                                if (hasCategoryPricing && (!newServiceType.priceType || newServiceType.priceType === 'none')) {
                                    return (
                                        <div className="space-y-3">
                                            <div className="rounded-lg border-2 border-blue-200/60 dark:border-blue-800/60 bg-gradient-to-br from-blue-50/90 via-blue-50/70 to-blue-50/90 dark:from-blue-900/40 dark:via-blue-900/30 dark:to-blue-900/40 px-5 py-4 shadow-sm">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="rounded-md bg-blue-500/10 dark:bg-blue-500/20 p-1.5 border border-blue-300/30 dark:border-blue-700/30">
                                                                <CircleDollarSign className="size-3.5 text-blue-600 dark:text-blue-400" />
                                                            </div>
                                                            <div className="text-xs font-semibold text-blue-900 dark:text-blue-100 uppercase tracking-wider">Inherited from category</div>
                                                        </div>
                                                        <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 tracking-tight">
                                                            {(() => {
                                                                const catPriceType = (selectedCategory as any).priceType
                                                                if (catPriceType === 'fixed' && (selectedCategory as any).priceFixed) {
                                                                    return `$${parseFloat((selectedCategory as any).priceFixed).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                                                }
                                                                if (catPriceType === 'range') {
                                                                    const min = (selectedCategory as any).priceMin ? parseFloat((selectedCategory as any).priceMin).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
                                                                    const max = (selectedCategory as any).priceMax ? parseFloat((selectedCategory as any).priceMax).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
                                                                    if (min && max) return `$${min} - $${max}`
                                                                    if (min) return `$${min}+`
                                                                    if (max) return `Up to $${max}`
                                                                }
                                                                return 'Category pricing'
                                                            })()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed px-1">
                                                Pricing is inherited from the category. Select an option below to set custom pricing for this service type.
                                            </p>
                                            <div className="pt-3 border-t border-gray-200/60 dark:border-gray-700/60">
                                                <div className="flex items-start gap-8">
                                                    <RadioGroup
                                                        value={newServiceType.priceType}
                                                        onValueChange={(value) => setNewServiceType(prev => ({ 
                                                            ...prev, 
                                                            priceType: value as "none" | "fixed" | "range",
                                                            priceFixed: value !== "fixed" ? "" : prev.priceFixed,
                                                            priceMin: value !== "range" ? "" : prev.priceMin,
                                                            priceMax: value !== "range" ? "" : prev.priceMax,
                                                        }))}
                                                        className="flex flex-col gap-3 min-w-[160px]"
                                                    >
                                                        <div className="flex items-center gap-3 group cursor-pointer p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                                                            <RadioGroupItem value="none" id="price-none" className="mt-0.5" />
                                                            <Label htmlFor="price-none" className="cursor-pointer font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                                                                Use category pricing
                                                            </Label>
                                                        </div>
                                                        <div className="flex items-center gap-3 group cursor-pointer p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                                                            <RadioGroupItem value="fixed" id="price-fixed" className="mt-0.5" />
                                                            <Label htmlFor="price-fixed" className="cursor-pointer font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                                                                Fixed price
                                                            </Label>
                                                        </div>
                                                        <div className="flex items-center gap-3 group cursor-pointer p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                                                            <RadioGroupItem value="range" id="price-range" className="mt-0.5" />
                                                            <Label htmlFor="price-range" className="cursor-pointer font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                                                                Price range
                                                            </Label>
                                                        </div>
                                                    </RadioGroup>
                                                    
                                                    <div className="flex-1 border-l border-gray-200/60 dark:border-gray-700/60 pl-8">
                                                        {(newServiceType.priceType as string) === "fixed" ? (
                                                            <div className="space-y-3">
                                                                <Label htmlFor="service-type-price-fixed" className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider block">Amount</Label>
                                                                <div className="relative group">
                                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-800">
                                                                        <span className="text-base font-semibold text-gray-700 dark:text-gray-300">$</span>
                                                                    </div>
                                                                    <Input
                                                                        id="service-type-price-fixed"
                                                                        type="number"
                                                                        step="0.01"
                                                                        min="0"
                                                                        placeholder="155.00"
                                                                        value={newServiceType.priceFixed}
                                                                        onChange={(e) => setNewServiceType(prev => ({ ...prev, priceFixed: e.target.value }))}
                                                                        className="pl-12 h-12 text-lg font-semibold bg-white dark:bg-gray-900 border-0 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                                                                    />
                                                                </div>
                                                            </div>
                                                        ) : (newServiceType.priceType as string) === "range" ? (
                                                            <div className="space-y-4">
                                                                <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider block">Price range</Label>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="space-y-2.5">
                                                                        <Label htmlFor="service-type-price-min" className="text-xs font-medium text-gray-600 dark:text-gray-400 block">Minimum</Label>
                                                                        <div className="relative group">
                                                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-800">
                                                                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">$</span>
                                                                            </div>
                                                                            <Input
                                                                                id="service-type-price-min"
                                                                                type="number"
                                                                                step="0.01"
                                                                                min="0"
                                                                                placeholder="100.00"
                                                                                value={newServiceType.priceMin}
                                                                                onChange={(e) => setNewServiceType(prev => ({ ...prev, priceMin: e.target.value }))}
                                                                                className="pl-12 h-11 text-base font-semibold bg-white dark:bg-gray-900 border-0 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="space-y-2.5">
                                                                        <Label htmlFor="service-type-price-max" className="text-xs font-medium text-gray-600 dark:text-gray-400 block">Maximum</Label>
                                                                        <div className="relative group">
                                                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-800">
                                                                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">$</span>
                                                                            </div>
                                                                            <Input
                                                                                id="service-type-price-max"
                                                                                type="number"
                                                                                step="0.01"
                                                                                min="0"
                                                                                placeholder="200.00"
                                                                                value={newServiceType.priceMax}
                                                                                onChange={(e) => setNewServiceType(prev => ({ ...prev, priceMax: e.target.value }))}
                                                                                className="pl-12 h-11 text-base font-semibold bg-white dark:bg-gray-900 border-0 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                
                                return (
                                    <div className="flex items-start gap-8">
                                        <RadioGroup
                                            value={newServiceType.priceType}
                                            onValueChange={(value) => setNewServiceType(prev => ({ 
                                                ...prev, 
                                                priceType: value as "none" | "fixed" | "range",
                                                priceFixed: value !== "fixed" ? "" : prev.priceFixed,
                                                priceMin: value !== "range" ? "" : prev.priceMin,
                                                priceMax: value !== "range" ? "" : prev.priceMax,
                                            }))}
                                            className="flex flex-col gap-3 min-w-[160px]"
                                        >
                                            <div className="flex items-center gap-3 group cursor-pointer p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                                                <RadioGroupItem value="none" id="price-none" className="mt-0.5" />
                                                <Label htmlFor="price-none" className="cursor-pointer font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                                                    No price
                                                </Label>
                                            </div>
                                            <div className="flex items-center gap-3 group cursor-pointer p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                                                <RadioGroupItem value="fixed" id="price-fixed" className="mt-0.5" />
                                                <Label htmlFor="price-fixed" className="cursor-pointer font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                                                    Fixed price
                                                </Label>
                                            </div>
                                            <div className="flex items-center gap-3 group cursor-pointer p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                                                <RadioGroupItem value="range" id="price-range" className="mt-0.5" />
                                                <Label htmlFor="price-range" className="cursor-pointer font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                                                    Price range
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                        
                                        <div className="flex-1 border-l border-gray-200/60 dark:border-gray-700/60 pl-8">
                                            {newServiceType.priceType === "fixed" && (
                                                <div className="space-y-3">
                                                    <Label htmlFor="service-type-price-fixed" className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider block">Amount</Label>
                                                    <div className="relative group">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-800">
                                                            <span className="text-base font-semibold text-gray-700 dark:text-gray-300">$</span>
                                                        </div>
                                                        <Input
                                                            id="service-type-price-fixed"
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            placeholder="155.00"
                                                            value={newServiceType.priceFixed}
                                                            onChange={(e) => setNewServiceType(prev => ({ ...prev, priceFixed: e.target.value }))}
                                                            className="pl-12 h-12 text-lg font-semibold bg-white dark:bg-gray-900 border-0 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {newServiceType.priceType === "range" && (
                                                <div className="space-y-4">
                                                    <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider block">Price range</Label>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2.5">
                                                            <Label htmlFor="service-type-price-min" className="text-xs font-medium text-gray-600 dark:text-gray-400 block">Minimum</Label>
                                                            <div className="relative group">
                                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-800">
                                                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">$</span>
                                                                </div>
                                                                <Input
                                                                    id="service-type-price-min"
                                                                    type="number"
                                                                    step="0.01"
                                                                    min="0"
                                                                    placeholder="100.00"
                                                                    value={newServiceType.priceMin}
                                                                    onChange={(e) => setNewServiceType(prev => ({ ...prev, priceMin: e.target.value }))}
                                                                    className="pl-12 h-11 text-base font-semibold bg-white dark:bg-gray-900 border-0 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2.5">
                                                            <Label htmlFor="service-type-price-max" className="text-xs font-medium text-gray-600 dark:text-gray-400 block">Maximum</Label>
                                                            <div className="relative group">
                                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-800">
                                                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">$</span>
                                                                </div>
                                                                <Input
                                                                    id="service-type-price-max"
                                                                    type="number"
                                                                    step="0.01"
                                                                    min="0"
                                                                    placeholder="200.00"
                                                                    value={newServiceType.priceMax}
                                                                    onChange={(e) => setNewServiceType(prev => ({ ...prev, priceMax: e.target.value }))}
                                                                    className="pl-12 h-11 text-base font-semibold bg-white dark:bg-gray-900 border-0 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {newServiceType.priceType === "none" && (
                                                <div className="flex items-center h-12 text-sm text-gray-500 dark:text-gray-400 italic bg-gray-50/50 dark:bg-gray-800/30 rounded-lg px-4 border border-dashed border-gray-200 dark:border-gray-700">
                                                    No pricing configured
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })()}
                        </div>

                        <div>
                            <Label>Available statuses</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                Configure statuses for this service type
                            </p>
                            
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Notify requestor
                                            </th>
                                            <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Notify assignee
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                        {/* New Status - Always locked and selected */}
                                        <tr className="bg-blue-50 dark:bg-blue-900/20">
                                            <td className="px-3 py-2">
                                                <div className="flex items-center space-x-2">
                                                    <Tooltip content="New status is required and can't be disabled">
                                                        <div className="flex items-center">
                                                            <Lock className="size-4 text-gray-400" />
                                                        </div>
                                                    </Tooltip>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">New</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                <span className="text-gray-400 dark:text-gray-500">-</span>
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                <span className="text-gray-400 dark:text-gray-500">-</span>
                                            </td>
                                        </tr>
                                        
                                        {availableStatuses.filter(status => status.name !== "New").map((status) => {
                                            const isSelected = newServiceType.statuses.some(s => s.name === status.name)
                                            const selectedStatus = newServiceType.statuses.find(s => s.name === status.name)
                                            
                                            return (
                                                <tr key={status.name} className={isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''}>
                                                    <td className="px-3 py-2">
                                                        <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                                                checked={isSelected}
                                            onChange={() => handleStatusToggleInModal(status.name)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                                            <div className="flex items-center gap-2">
                                                                <div className={`w-3 h-3 rounded-full ${getColorClasses(status.color).bgClass}`}></div>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{status.name}</span>
                                                            </div>
                                    </label>
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        {isSelected ? (
                                                            <Switch
                                                                checked={selectedStatus?.notifyRequestor || false}
                                                                onCheckedChange={() => handleNotificationToggle(status.name, 'requestor')}
                                                            />
                                                        ) : (
                                                            <span className="text-gray-400 dark:text-gray-500">-</span>
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        {isSelected ? (
                                                            <Switch
                                                                checked={selectedStatus?.notifyAssignee || false}
                                                                onCheckedChange={() => handleNotificationToggle(status.name, 'assignee')}
                                                            />
                                                        ) : (
                                                            <span className="text-gray-400 dark:text-gray-500">-</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        
                                        {/* Add New Status Row */}
                                        {!isAddingNewStatus && (
                                            <tr className="border-t border-gray-200 dark:border-gray-700">
                                                <td colSpan={3} className="px-3 py-2">
                                                    <button
                                                        onClick={() => setIsAddingNewStatus(true)}
                                                        className="w-full text-left text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-2 py-2"
                                                    >
                                                        <RiAddLine className="size-4" />
                                                        Add new status
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
                                        
                                        {/* New Status Creation Card */}
                                        {isAddingNewStatus && (
                                            <tr className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                                <td colSpan={3} className="px-3 py-4">
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-3 h-3 rounded-full ${getColorClasses(newStatus.color).bgClass}`}></div>
                                                            <input
                                                                type="text"
                                                                placeholder="Enter status name"
                                                                value={newStatus.name}
                                                                onChange={(e) => setNewStatus(prev => ({ ...prev, name: e.target.value }))}
                                                                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            />
                                                        </div>
                                                        
                                                        <div>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Choose a color:</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {statusColors.map((colorOption) => (
                                                                    <button
                                                                        key={colorOption.value}
                                                                        type="button"
                                                                        onClick={() => setNewStatus(prev => ({ ...prev, color: colorOption.value }))}
                                                                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                                                                            newStatus.color === colorOption.value
                                                                                ? 'border-gray-900 dark:border-gray-100 ring-2 ring-offset-1 ring-gray-500'
                                                                                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                                                        } ${colorOption.bgClass}`}
                                                                        title={colorOption.name}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                size="sm"
                                                                onClick={handleAddNewStatus}
                                                                disabled={!newStatus.name.trim()}
                                                            >
                                                                Add status
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={handleCancelNewStatus}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setIsAddServiceTypeModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddServiceType}>
                                Add service type
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Service Type Modal */}
            <Dialog open={isEditServiceTypeModalOpen} onOpenChange={setIsEditServiceTypeModalOpen}>
                <DialogContent className="max-w-4xl w-[calc(100vw-2rem)] sm:w-full max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit service type</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 px-4 sm:px-6 py-4 overflow-y-auto flex-1">
                        <div>
                            <Label htmlFor="edit-service-type-name">Request type *</Label>
                            <Input
                                id="edit-service-type-name"
                                placeholder="Enter request type"
                                value={newServiceType.requestType}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, requestType: e.target.value }))}
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="edit-service-type-description">Description *</Label>
                            <textarea
                                id="edit-service-type-description"
                                rows={3}
                                placeholder="Enter description"
                                value={newServiceType.description}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, description: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="edit-service-type-category">Category *</Label>
                            <select
                                id="edit-service-type-category"
                                value={newServiceType.category}
                                onChange={(e) => setNewServiceType(prev => ({ ...prev, category: e.target.value }))}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            >
                                <option>Cleaning & Waste</option>
                                <option>Temperature & Air</option>
                                <option>Repairs & Maintenance</option>
                                <option>Access & Security</option>
                                <option>Hospitality & Concierge</option>
                                <option>Signage & Facilities</option>
                                <option>Other</option>
                            </select>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="edit-service-type-needs-approval">Needs approval</Label>
                                <Switch
                                    id="edit-service-type-needs-approval"
                                    checked={newServiceType.needsApproval}
                                    onCheckedChange={(checked) => setNewServiceType(prev => ({ 
                                        ...prev, 
                                        needsApproval: checked,
                                        approval: checked ? (prev.approvalType === "tenant-admin" ? "Tenant POC" : "Building Manager") : "None"
                                    }))}
                                />
                            </div>
                            
                            {newServiceType.needsApproval && (
                                <div className="space-y-3">
                                    <RadioCardGroup
                                        value={newServiceType.approvalType}
                                        onValueChange={(value) => {
                                            const approvalMap: Record<string, string> = {
                                                "tenant-admin": "Tenant POC",
                                                "specific-member": "Building Manager",
                                                "team": "Building Manager",
                                                "role": "Building Manager"
                                            }
                                            setNewServiceType(prev => ({ 
                                                ...prev, 
                                                approvalType: value as typeof prev.approvalType,
                                                approval: approvalMap[value] || "Building Manager"
                                            }))
                                        }}
                                    >
                                        <RadioCardItem value="tenant-admin" className="h-auto">
                                            <div className="flex items-start gap-3">
                                                <RadioCardGroupIndicator className="mt-0.5" />
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900 dark:text-gray-50">
                                                        Tenant Admin
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        When this request type is submitted, it must first be approved by the Tenant admin of the Tenant company submitting the request.
                                                    </div>
                                                </div>
                                            </div>
                                        </RadioCardItem>
                                        
                                        <RadioCardItem value="specific-member" className="h-auto">
                                            <div className="flex items-start gap-3">
                                                <RadioCardGroupIndicator className="mt-0.5" />
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900 dark:text-gray-50">
                                                        Specific Member
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        Select a specific member who must approve requests of this type before they can proceed.
                                                    </div>
                                                </div>
                                            </div>
                                        </RadioCardItem>
                                        
                                        <RadioCardItem value="team" className="h-auto">
                                            <div className="flex items-start gap-3">
                                                <RadioCardGroupIndicator className="mt-0.5" />
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900 dark:text-gray-50">
                                                        Team
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        Select a team that must approve requests of this type before they can proceed.
                                                    </div>
                                                </div>
                                            </div>
                                        </RadioCardItem>
                                        
                                        <RadioCardItem value="role" className="h-auto">
                                            <div className="flex items-start gap-3">
                                                <RadioCardGroupIndicator className="mt-0.5" />
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900 dark:text-gray-50">
                                                        Role
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        Select a specific role that must approve requests of this type before they can proceed.
                                                    </div>
                                                </div>
                                            </div>
                                        </RadioCardItem>
                                    </RadioCardGroup>
                                </div>
                            )}
                        </div>
                        
                        <div>
                            <Label htmlFor="edit-service-type-assigned">Assigned to *</Label>
                            {(() => {
                                const selectedCategory = categories.find(cat => cat.name === newServiceType.category)
                                const hasCategoryAssignedTo = selectedCategory?.assignedTo
                                
                                if (hasCategoryAssignedTo) {
                                    return (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-md text-sm">
                                                <span className="text-xs font-medium">
                                                    {selectedCategory?.assignedToType === 'user' ? 'U' : 'T'}
                                                </span>
                                                <span>{selectedCategory?.assignedTo}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Assigned to is set at the category level
                                            </p>
                                        </div>
                                    )
                                }
                                
                                return (
                                    <div className="relative">
                                        <Input
                                            id="edit-service-type-assigned"
                                            placeholder="Search users and teams..."
                                            value={assignedToSearchQuery}
                                            onChange={(e) => {
                                                setAssignedToSearchQuery(e.target.value)
                                                setIsAssignedToDropdownOpen(true)
                                            }}
                                            onFocus={() => setIsAssignedToDropdownOpen(true)}
                                        />
                                        
                                        {isAssignedToDropdownOpen && (
                                            <>
                                                <div 
                                                    className="fixed inset-0 z-10" 
                                                    onClick={() => setIsAssignedToDropdownOpen(false)}
                                                />
                                                <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                                    {filteredAssignableItems.length > 0 ? (
                                                        filteredAssignableItems.map((item) => (
                                                            <button
                                                                key={item.id}
                                                                onClick={() => handleAssignedToSelect(item)}
                                                                className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3"
                                                            >
                                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700">
                                                                    {item.type === 'user' ? (
                                                                        <User className="size-4 text-gray-500" />
                                                                    ) : (
                                                                        <Users className="size-4 text-gray-500" />
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                        {item.name}
                                                                    </div>
                                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                        {(item as any).role || (item as any).description} • {item.type === 'user' ? 'User' : 'Team'}
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        ))
                                                    ) : (
                                                        <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                                                            No users or teams found
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        
                                        {newServiceType.assignedTo && (
                                            <div className="mt-2 flex items-center gap-2">
                                                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-sm">
                                                    {newServiceType.assignedToType === 'user' ? (
                                                        <User className="size-3 text-gray-500" />
                                                    ) : (
                                                        <Users className="size-3 text-gray-500" />
                                                    )}
                                                    <span>{newServiceType.assignedTo}</span>
                                                    <button
                                                        onClick={() => setNewServiceType(prev => ({ ...prev, assignedTo: "", assignedToType: "user" }))}
                                                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })()}
                        </div>

                        <div className="rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-gradient-to-br from-gray-50/80 via-white to-gray-50/50 dark:from-gray-800/50 dark:via-gray-900/30 dark:to-gray-800/50 p-6 shadow-sm backdrop-blur-sm">
                            <div className="mb-5 flex items-start gap-3">
                                <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/10 p-2.5 border border-blue-200/50 dark:border-blue-800/30">
                                    <DollarSign className="size-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <Label className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-1.5 block">Pricing</Label>
                                </div>
                            </div>
                            <div className="flex items-start gap-8">
                                <RadioGroup
                                    value={newServiceType.priceType}
                                    onValueChange={(value) => setNewServiceType(prev => ({ 
                                        ...prev, 
                                        priceType: value as "none" | "fixed" | "range",
                                        priceFixed: value !== "fixed" ? "" : prev.priceFixed,
                                        priceMin: value !== "range" ? "" : prev.priceMin,
                                        priceMax: value !== "range" ? "" : prev.priceMax,
                                    }))}
                                    className="flex flex-col gap-3 min-w-[160px]"
                                >
                                    <div className="flex items-center gap-3 group cursor-pointer p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                                        <RadioGroupItem value="none" id="edit-price-none" className="mt-0.5" />
                                        <Label htmlFor="edit-price-none" className="cursor-pointer font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                                            No price
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-3 group cursor-pointer p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                                        <RadioGroupItem value="fixed" id="edit-price-fixed" className="mt-0.5" />
                                        <Label htmlFor="edit-price-fixed" className="cursor-pointer font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                                            Fixed price
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-3 group cursor-pointer p-2.5 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200">
                                        <RadioGroupItem value="range" id="edit-price-range" className="mt-0.5" />
                                        <Label htmlFor="edit-price-range" className="cursor-pointer font-medium text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                                            Price range
                                        </Label>
                                    </div>
                                </RadioGroup>
                                
                                <div className="flex-1 border-l border-gray-200/60 dark:border-gray-700/60 pl-8">
                                    {newServiceType.priceType === "fixed" && (
                                        <div className="space-y-3">
                                            <Label htmlFor="edit-service-type-price-fixed" className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider block">Amount</Label>
                                            <div className="relative group">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-800">
                                                    <span className="text-base font-semibold text-gray-700 dark:text-gray-300">$</span>
                                                </div>
                                                <Input
                                                    id="edit-service-type-price-fixed"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    placeholder="155.00"
                                                    value={newServiceType.priceFixed}
                                                    onChange={(e) => setNewServiceType(prev => ({ ...prev, priceFixed: e.target.value }))}
                                                    className="pl-12 h-12 text-lg font-semibold bg-white dark:bg-gray-900 border-0 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    
                                    {newServiceType.priceType === "range" && (
                                        <div className="space-y-4">
                                            <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider block">Price range</Label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2.5">
                                                    <Label htmlFor="edit-service-type-price-min" className="text-xs font-medium text-gray-600 dark:text-gray-400 block">Minimum</Label>
                                                    <div className="relative group">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-800">
                                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">$</span>
                                                        </div>
                                                        <Input
                                                            id="edit-service-type-price-min"
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            placeholder="100.00"
                                                            value={newServiceType.priceMin}
                                                            onChange={(e) => setNewServiceType(prev => ({ ...prev, priceMin: e.target.value }))}
                                                            className="pl-12 h-11 text-base font-semibold bg-white dark:bg-gray-900 border-0 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2.5">
                                                    <Label htmlFor="edit-service-type-price-max" className="text-xs font-medium text-gray-600 dark:text-gray-400 block">Maximum</Label>
                                                    <div className="relative group">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-800">
                                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">$</span>
                                                        </div>
                                                        <Input
                                                            id="edit-service-type-price-max"
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            placeholder="200.00"
                                                            value={newServiceType.priceMax}
                                                            onChange={(e) => setNewServiceType(prev => ({ ...prev, priceMax: e.target.value }))}
                                                            className="pl-12 h-11 text-base font-semibold bg-white dark:bg-gray-900 border-0 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {newServiceType.priceType === "none" && (
                                        <div className="flex items-center h-12 text-sm text-gray-500 dark:text-gray-400 italic bg-gray-50/50 dark:bg-gray-800/30 rounded-lg px-4 border border-dashed border-gray-200 dark:border-gray-700">
                                            No pricing configured
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label>Available statuses</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                Configure statuses for this service type
                            </p>
                            
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Notify requestor
                                            </th>
                                            <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Notify assignee
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                        {/* New Status - Always locked and selected */}
                                        <tr className="bg-blue-50 dark:bg-blue-900/20">
                                            <td className="px-3 py-2">
                                                <div className="flex items-center space-x-2">
                                                    <Tooltip content="New status is required and can't be disabled">
                                                        <div className="flex items-center">
                                                            <Lock className="size-4 text-gray-400" />
                                                        </div>
                                                    </Tooltip>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">New</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                <span className="text-gray-400 dark:text-gray-500">-</span>
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                <span className="text-gray-400 dark:text-gray-500">-</span>
                                            </td>
                                        </tr>
                                        
                                        {availableStatuses.filter(status => status.name !== "New").map((status) => {
                                            const isSelected = newServiceType.statuses.some(s => s.name === status.name)
                                            const selectedStatus = newServiceType.statuses.find(s => s.name === status.name)
                                            
                                            return (
                                                <tr key={status.name} className={isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''}>
                                                    <td className="px-3 py-2">
                                                        <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                                                checked={isSelected}
                                            onChange={() => handleStatusToggleInModal(status.name)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                                            <div className="flex items-center gap-2">
                                                                <div className={`w-3 h-3 rounded-full ${getColorClasses(status.color).bgClass}`}></div>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{status.name}</span>
                                                            </div>
                                    </label>
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        {isSelected ? (
                                                            <Switch
                                                                checked={selectedStatus?.notifyRequestor || false}
                                                                onCheckedChange={() => handleNotificationToggle(status.name, 'requestor')}
                                                            />
                                                        ) : (
                                                            <span className="text-gray-400 dark:text-gray-500">-</span>
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        {isSelected ? (
                                                            <Switch
                                                                checked={selectedStatus?.notifyAssignee || false}
                                                                onCheckedChange={() => handleNotificationToggle(status.name, 'assignee')}
                                                            />
                                                        ) : (
                                                            <span className="text-gray-400 dark:text-gray-500">-</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        
                                        {/* Add New Status Row */}
                                        {!isAddingNewStatus && (
                                            <tr className="border-t border-gray-200 dark:border-gray-700">
                                                <td colSpan={3} className="px-3 py-2">
                                                    <button
                                                        onClick={() => setIsAddingNewStatus(true)}
                                                        className="w-full text-left text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-2 py-2"
                                                    >
                                                        <RiAddLine className="size-4" />
                                                        Add new status
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
                                        
                                        {/* New Status Creation Card */}
                                        {isAddingNewStatus && (
                                            <tr className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                                <td colSpan={3} className="px-3 py-4">
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-3 h-3 rounded-full ${getColorClasses(newStatus.color).bgClass}`}></div>
                                                            <input
                                                                type="text"
                                                                placeholder="Enter status name"
                                                                value={newStatus.name}
                                                                onChange={(e) => setNewStatus(prev => ({ ...prev, name: e.target.value }))}
                                                                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            />
                                                        </div>
                                                        
                                                        <div>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Choose a color:</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {statusColors.map((colorOption) => (
                                                                    <button
                                                                        key={colorOption.value}
                                                                        type="button"
                                                                        onClick={() => setNewStatus(prev => ({ ...prev, color: colorOption.value }))}
                                                                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                                                                            newStatus.color === colorOption.value
                                                                                ? 'border-gray-900 dark:border-gray-100 ring-2 ring-offset-1 ring-gray-500'
                                                                                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                                                        } ${colorOption.bgClass}`}
                                                                        title={colorOption.name}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                size="sm"
                                                                onClick={handleAddNewStatus}
                                                                disabled={!newStatus.name.trim()}
                                                            >
                                                                Add status
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={handleCancelNewStatus}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setIsEditServiceTypeModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleUpdateServiceType}>
                                Update service type
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Setup Modal */}
            <FullPageModal
                isOpen={isSetupModalOpen}
                onClose={() => setIsSetupModalOpen(false)}
                title="Setup wizard"
                iframeUrl="https://v0-workflow-system-design-sage.vercel.app/"
            />
        </div>
    )
}
