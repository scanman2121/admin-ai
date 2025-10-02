// Centralized user database for demo consistency
// This data is used across service requests, visitors, access control, and user management

export interface CentralizedUser {
  id: string
  name: string
  initials: string
  email: string
  role: "admin" | "member" | "viewer" | "contributor"
  company: string
  department: string
  title: string
  phone: string
  avatarUrl?: string
  buildings: string[]
  floorSuite: string
  hasMobileAccess: boolean
  status: "active" | "inactive"
  badgeId: string
  startDate: string
  manager?: string
  // Additional fields for access control and service requests
  acsStatus: "active" | "inactive" | "pending" | "suspended"
  // For visitor management
  canHostVisitors: boolean
  // For service requests
  preferredContactMethod: "email" | "phone" | "both"
}

export const centralizedUsers: CentralizedUser[] = [
  // TechCorp Solutions - Technology Company
  {
    id: "sarah-johnson-tech",
    name: "Sarah Johnson",
    initials: "SJ",
    email: "sarah.johnson@techcorp.com",
    role: "admin",
    company: "TechCorp Solutions",
    department: "IT Administration",
    title: "Senior IT Manager",
    phone: "(555) 123-4567",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buildings: ["Main Tower", "East Wing"],
    floorSuite: "Floor 12, Suite 1205",
    hasMobileAccess: true,
    status: "active",
    badgeId: "TC-SJ-001",
    startDate: "2022-03-15",
    acsStatus: "active",
    canHostVisitors: true,
    preferredContactMethod: "both"
  },
  {
    id: "michael-chen-tech",
    name: "Michael Chen",
    initials: "MC",
    email: "michael.chen@techcorp.com",
    role: "contributor",
    company: "TechCorp Solutions",
    department: "Software Development",
    title: "Lead Developer",
    phone: "(555) 234-5678",
    buildings: ["Main Tower"],
    floorSuite: "Floor 8, Suite 825",
    hasMobileAccess: true,
    status: "active",
    badgeId: "TC-MC-002",
    startDate: "2021-08-20",
    manager: "sarah-johnson-tech",
    acsStatus: "active",
    canHostVisitors: true,
    preferredContactMethod: "email"
  },
  {
    id: "emily-brown-tech",
    name: "Emily Brown",
    initials: "EB",
    email: "emily.brown@techcorp.com",
    role: "member",
    company: "TechCorp Solutions",
    department: "UX Design",
    title: "Senior UX Designer",
    phone: "(555) 345-6789",
    buildings: ["Main Tower"],
    floorSuite: "Floor 7, Suite 715",
    hasMobileAccess: true,
    status: "active",
    badgeId: "TC-EB-003",
    startDate: "2023-01-10",
    manager: "sarah-johnson-tech",
    acsStatus: "active",
    canHostVisitors: true,
    preferredContactMethod: "email"
  },

  // HealthTech Innovations - Healthcare Technology
  {
    id: "dr-emma-davis",
    name: "Dr. Emma Davis",
    initials: "ED",
    email: "emma.davis@healthtech.com",
    role: "admin",
    company: "HealthTech Innovations",
    department: "Medical Research",
    title: "Chief Medical Officer",
    phone: "(555) 456-7890",
    buildings: ["East Wing"],
    floorSuite: "Floor 15, Suite 1501",
    hasMobileAccess: true,
    status: "active",
    badgeId: "HT-ED-004",
    startDate: "2020-05-12",
    acsStatus: "active",
    canHostVisitors: true,
    preferredContactMethod: "both"
  },
  {
    id: "james-wilson-health",
    name: "James Wilson",
    initials: "JW",
    email: "james.wilson@healthtech.com",
    role: "contributor",
    company: "HealthTech Innovations",
    department: "Clinical Development",
    title: "Clinical Research Manager",
    phone: "(555) 567-8901",
    buildings: ["East Wing"],
    floorSuite: "Floor 14, Suite 1420",
    hasMobileAccess: true,
    status: "active",
    badgeId: "HT-JW-005",
    startDate: "2022-09-08",
    manager: "dr-emma-davis",
    acsStatus: "active",
    canHostVisitors: true,
    preferredContactMethod: "phone"
  },

  // Global Finance Corp - Financial Services  
  {
    id: "david-rodriguez-finance",
    name: "David Rodriguez",
    initials: "DR",
    email: "david.rodriguez@globalfinance.com",
    role: "admin",
    company: "Global Finance Corp",
    department: "Investment Banking",
    title: "VP of Investment Banking",
    phone: "(555) 678-9012",
    buildings: ["West Building"],
    floorSuite: "Floor 22, Suite 2205",
    hasMobileAccess: true,
    status: "active",
    badgeId: "GF-DR-006",
    startDate: "2019-11-03",
    acsStatus: "active",
    canHostVisitors: true,
    preferredContactMethod: "both"
  },
  {
    id: "maria-garcia-finance",
    name: "Maria Garcia",
    initials: "MG",
    email: "maria.garcia@globalfinance.com",
    role: "contributor",
    company: "Global Finance Corp",
    department: "Risk Management",
    title: "Senior Risk Analyst",
    phone: "(555) 789-0123",
    buildings: ["West Building"],
    floorSuite: "Floor 21, Suite 2115",
    hasMobileAccess: true,
    status: "active",
    badgeId: "GF-MG-007",
    startDate: "2021-06-15",
    manager: "david-rodriguez-finance",
    acsStatus: "active",
    canHostVisitors: false,
    preferredContactMethod: "email"
  },

  // Creative Design Studio - Marketing & Advertising
  {
    id: "alexandra-kim-creative",
    name: "Alexandra Kim",
    initials: "AK",
    email: "alexandra.kim@creativedesign.com",
    role: "contributor",
    company: "Creative Design Studio",
    department: "Creative Direction",
    title: "Creative Director",
    phone: "(555) 890-1234",
    buildings: ["South Plaza"],
    floorSuite: "Floor 4, Suite 410",
    hasMobileAccess: true,
    status: "active",
    badgeId: "CD-AK-008",
    startDate: "2023-02-20",
    acsStatus: "active",
    canHostVisitors: true,
    preferredContactMethod: "email"
  },
  {
    id: "robert-thompson-creative",
    name: "Robert Thompson",
    initials: "RT",
    email: "robert.thompson@creativedesign.com",
    role: "member",
    company: "Creative Design Studio",
    department: "Graphic Design",
    title: "Senior Graphic Designer",
    phone: "(555) 901-2345",
    buildings: ["South Plaza"],
    floorSuite: "Floor 3, Suite 320",
    hasMobileAccess: false,
    status: "active",
    badgeId: "CD-RT-009",
    startDate: "2022-11-12",
    manager: "alexandra-kim-creative",
    acsStatus: "active",
    canHostVisitors: false,
    preferredContactMethod: "email"
  },

  // Legal Partners LLC - Law Firm
  {
    id: "catherine-wright-legal",
    name: "Catherine Wright",
    initials: "CW",
    email: "catherine.wright@legalpartners.com",
    role: "admin",
    company: "Legal Partners LLC",
    department: "Corporate Law",
    title: "Managing Partner",
    phone: "(555) 012-3456",
    buildings: ["Main Tower"],
    floorSuite: "Floor 18, Suite 1801",
    hasMobileAccess: true,
    status: "active",
    badgeId: "LP-CW-010",
    startDate: "2018-01-08",
    acsStatus: "active",
    canHostVisitors: true,
    preferredContactMethod: "both"
  },
  {
    id: "thomas-anderson-legal",
    name: "Thomas Anderson",
    initials: "TA",
    email: "thomas.anderson@legalpartners.com",
    role: "contributor",
    company: "Legal Partners LLC",
    department: "Litigation",
    title: "Senior Associate",
    phone: "(555) 123-4567",
    buildings: ["Main Tower"],
    floorSuite: "Floor 17, Suite 1720",
    hasMobileAccess: true,
    status: "active",
    badgeId: "LP-TA-011",
    startDate: "2020-09-14",
    manager: "catherine-wright-legal",
    acsStatus: "active",
    canHostVisitors: true,
    preferredContactMethod: "email"
  },

  // Consulting Group International
  {
    id: "evgeny-mahnovets",
    name: "Evgeny Mahnovets",
    initials: "EM",
    email: "evgeny.mahnovets@hqo.com",
    role: "viewer",
    company: "HqO",
    department: "Operations",
    title: "Operations Specialist",
    phone: "(555) 234-5678",
    buildings: ["Access Bridge Playground"],
    floorSuite: "Floor 12, Suite 1203",
    hasMobileAccess: true,
    status: "active",
    badgeId: "HQ-EM-012",
    startDate: "2023-05-15",
    acsStatus: "active",
    canHostVisitors: false,
    preferredContactMethod: "email"
  },
  {
    id: "lisa-chang-consulting",
    name: "Lisa Chang",
    initials: "LC",
    email: "lisa.chang@consultinggroup.com",
    role: "contributor",
    company: "Consulting Group International",
    department: "Strategy",
    title: "Senior Strategy Consultant",
    phone: "(555) 345-6789",
    buildings: ["East Wing"],
    floorSuite: "Floor 9, Suite 925",
    hasMobileAccess: true,
    status: "active",
    badgeId: "CG-LC-013",
    startDate: "2021-12-01",
    acsStatus: "active",
    canHostVisitors: true,
    preferredContactMethod: "both"
  },

  // Building Management & Maintenance Staff
  {
    id: "building-admin",
    name: "Building Administrator",
    initials: "BA",
    email: "admin@building.com",
    role: "admin",
    company: "Building Management",
    department: "Administration",
    title: "Building Administrator",
    phone: "(555) 000-0000",
    buildings: ["Main Tower", "East Wing", "West Building", "South Plaza", "Access Bridge Playground"],
    floorSuite: "Ground Floor, Management Office",
    hasMobileAccess: true,
    status: "active",
    badgeId: "BM-ADMIN",
    startDate: "2018-01-01",
    acsStatus: "active",
    canHostVisitors: true,
    preferredContactMethod: "both"
  },

  // New Employees Awaiting Access
  {
    id: "jennifer-martinez-new",
    name: "Jennifer Martinez",
    initials: "JM",
    email: "jennifer.martinez@techcorp.com",
    role: "member",
    company: "TechCorp Solutions",
    department: "Software Development",
    title: "Junior Developer",
    phone: "(555) 111-2222",
    buildings: ["Main Tower"],
    floorSuite: "Floor 8, Suite 830",
    hasMobileAccess: false,
    status: "active",
    badgeId: "TC-JM-PENDING",
    startDate: "2025-01-15",
    manager: "sarah-johnson-tech",
    acsStatus: "pending",
    canHostVisitors: false,
    preferredContactMethod: "email"
  },
  {
    id: "kevin-chen-new",
    name: "Kevin Chen", 
    initials: "KC",
    email: "kevin.chen@healthtech.com",
    role: "contributor",
    company: "HealthTech Innovations",
    department: "Clinical Research",
    title: "Research Scientist",
    phone: "(555) 222-3333",
    buildings: ["East Wing"],
    floorSuite: "Floor 14, Suite 1425",
    hasMobileAccess: false,
    status: "active",
    badgeId: "HT-KC-PENDING",
    startDate: "2025-01-10",
    manager: "dr-emma-davis",
    acsStatus: "pending",
    canHostVisitors: false,
    preferredContactMethod: "email"
  },
  {
    id: "rachel-thompson-new",
    name: "Rachel Thompson",
    initials: "RT",
    email: "rachel.thompson@legalpartners.com",
    role: "member",
    company: "Legal Partners LLC",
    department: "Paralegal Services",
    title: "Senior Paralegal",
    phone: "(555) 333-4444",
    buildings: ["Main Tower"],
    floorSuite: "Floor 17, Suite 1715",
    hasMobileAccess: false,
    status: "active",
    badgeId: "LP-RT-PENDING",
    startDate: "2025-01-08",
    manager: "catherine-wright-legal",
    acsStatus: "pending",
    canHostVisitors: false,
    preferredContactMethod: "both"
  },
  {
    id: "marcus-rodriguez-new",
    name: "Marcus Rodriguez",
    initials: "MR",
    email: "marcus.rodriguez@globalfinance.com",
    role: "contributor",
    company: "Global Finance Corp",
    department: "Investment Analysis",
    title: "Investment Analyst",
    phone: "(555) 444-5555",
    buildings: ["West Building"],
    floorSuite: "Floor 21, Suite 2120",
    hasMobileAccess: false,
    status: "active",
    badgeId: "GF-MR-PENDING",
    startDate: "2025-01-12",
    manager: "david-rodriguez-finance",
    acsStatus: "pending",
    canHostVisitors: false,
    preferredContactMethod: "email"
  },
  {
    id: "amanda-kim-contractor",
    name: "Amanda Kim",
    initials: "AK",
    email: "amanda.kim@contractor.com",
    role: "viewer",
    company: "External Contractor LLC",
    department: "IT Consulting",
    title: "IT Consultant",
    phone: "(555) 555-6666",
    buildings: ["Main Tower"],
    floorSuite: "Floor 12, Suite 1210",
    hasMobileAccess: false,
    status: "active",
    badgeId: "EXT-AK-TEMP",
    startDate: "2025-01-20",
    acsStatus: "pending",
    canHostVisitors: false,
    preferredContactMethod: "phone"
  },
  
  // Lost Access / Restoration Needed
  {
    id: "brian-wilson-suspended",
    name: "Brian Wilson",
    initials: "BW",
    email: "brian.wilson@techcorp.com",
    role: "member",
    company: "TechCorp Solutions",
    department: "Quality Assurance",
    title: "QA Engineer",
    phone: "(555) 666-7777",
    buildings: ["Main Tower"],
    floorSuite: "Floor 9, Suite 920",
    hasMobileAccess: false,
    status: "active",
    badgeId: "TC-BW-SUSPENDED",
    startDate: "2023-06-15",
    manager: "sarah-johnson-tech",
    acsStatus: "suspended",
    canHostVisitors: false,
    preferredContactMethod: "email"
  },

  // Inactive/Former Users
  {
    id: "john-inactive",
    name: "John Smith",
    initials: "JS",
    email: "john.smith@former-company.com",
    role: "viewer",
    company: "Former Company Inc",
    department: "Sales",
    title: "Former Sales Manager",
    phone: "(555) 999-9999",
    buildings: [],
    floorSuite: "N/A",
    hasMobileAccess: false,
    status: "inactive",
    badgeId: "FC-JS-INACTIVE",
    startDate: "2020-01-01",
    acsStatus: "inactive",
    canHostVisitors: false,
    preferredContactMethod: "email"
  }
]

// Helper functions to find users by various criteria
export const getUserById = (id: string): CentralizedUser | undefined => {
  return centralizedUsers.find(user => user.id === id)
}

export const getUsersByCompany = (company: string): CentralizedUser[] => {
  return centralizedUsers.filter(user => user.company === company)
}

export const getActiveUsers = (): CentralizedUser[] => {
  return centralizedUsers.filter(user => user.status === "active")
}

export const getHostCapableUsers = (): CentralizedUser[] => {
  return centralizedUsers.filter(user => user.canHostVisitors && user.status === "active")
}

export const getUsersInBuilding = (building: string): CentralizedUser[] => {
  return centralizedUsers.filter(user => user.buildings.includes(building) && user.status === "active")
}
