import { Usage } from "./schema";
import { centralizedUsers, getUserById, getHostCapableUsers } from "./centralizedUsers";

export const roles: { value: string; label: string }[] = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "member",
    label: "Member",
  },
  {
    value: "viewer",
    label: "Tenant admin",
  },
  {
    value: "contributor",
    label: "Property admin",
  },
]

export const statuses: { value: string; label: string; variant: string }[] = [
  {
    value: "Approved",
    label: "Approved",
    variant: "success",
  },
  {
    value: "Pending",
    label: "Pending",
    variant: "warning",
  },
  {
    value: "Rejected",
    label: "Rejected",
    variant: "error",
  },
]

export const regions: { value: string; label: string }[] = [
  {
    value: "US-West 1",
    label: "US-West 1",
  },
  {
    value: "US-West 2",
    label: "US-West 2",
  },
  {
    value: "US-East 1",
    label: "US-East 1",
  },
  {
    value: "US-East 2",
    label: "US-East 2",
  },
  {
    value: "EU-West 1",
    label: "EU-West 1",
  },
  {
    value: "EU-North 1",
    label: "EU-North 1",
  },
  {
    value: "EU-Central 1",
    label: "EU-Central 1",
  },
]

export const conditions: { value: string; label: string }[] = [
  {
    value: "is-equal-to",
    label: "is equal to",
  },
  {
    value: "is-between",
    label: "is between",
  },
  {
    value: "is-greater-than",
    label: "is greater than",
  },
  {
    value: "is-less-than",
    label: "is less than",
  },
]

export const companies: { value: string; label: string }[] = [
  {
    value: "Acme Inc",
    label: "Acme Inc",
  },
  {
    value: "Global Tech",
    label: "Global Tech",
  },
  {
    value: "Innovate Solutions",
    label: "Innovate Solutions",
  },
  {
    value: "Tech Innovators",
    label: "Tech Innovators",
  },
]

export const userStatuses: { value: string; label: string }[] = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    label: "Inactive",
  },
]

// Export users from centralized database for backward compatibility
export const users = centralizedUsers.map(user => ({
  name: user.name,
  initials: user.initials,
  email: user.email,
  role: user.role,
  company: user.company,
  avatarUrl: user.avatarUrl,
  buildings: user.buildings,
  hasMobileAccess: user.hasMobileAccess,
  status: user.status,
}))

export const invitedUsers: {
  name: string
  initials: string
  email: string
  role: string
  company: string
  avatarUrl?: string
  buildings: string[]
  hasMobileAccess: boolean
  status: "invited"
  invitedDate: string
  expiresInDays: number
}[] = [
    {
      name: "Lydia Posh",
      initials: "LP",
      email: "lydia.posh@gmail.com",
      role: "viewer",
      company: "Global Tech",
      buildings: ["Main Tower"],
      hasMobileAccess: false,
      status: "invited" as const,
      invitedDate: "12/05/2024",
      expiresInDays: 12,
    },
    {
      name: "Anton Widburg",
      initials: "AW",
      email: "awidburg@bluewin.ch",
      role: "viewer",
      company: "Tech Innovators",
      buildings: ["East Wing"],
      hasMobileAccess: false,
      status: "invited" as const,
      invitedDate: "12/09/2024",
      expiresInDays: 8,
    },
  ]

export const usage: Usage[] = [
  // Transactions
  {
    transactionId: "TRX-2023-001",
    transactionDate: "04/15/2023",
    propertyName: "Riverside Apartments",
    unitNumber: "301",
    tenantName: "Michael Johnson",
    paymentMethod: "Credit Card",
    paymentType: "Rent",
    amount: 1850.00,
    dueDate: "04/01/2023",
    paymentStatus: "Completed",
    status: "Approved",
  },
  {
    transactionId: "TRX-2023-002",
    transactionDate: "04/10/2023",
    propertyName: "Oakwood Heights",
    unitNumber: "205",
    tenantName: "Sarah Williams",
    paymentMethod: "Bank Transfer",
    paymentType: "Rent",
    amount: 2100.00,
    dueDate: "04/01/2023",
    paymentStatus: "Completed",
    status: "Approved",
  },
  {
    transactionId: "TRX-2023-003",
    transactionDate: "04/03/2023",
    propertyName: "Parkview Condos",
    unitNumber: "512",
    tenantName: "David Chen",
    paymentMethod: "Check",
    paymentType: "Rent + Utilities",
    amount: 2350.00,
    dueDate: "04/01/2023",
    paymentStatus: "Completed",
    status: "Approved",
  },
  {
    transactionId: "TRX-2023-004",
    transactionDate: "04/05/2023",
    propertyName: "Riverside Apartments",
    unitNumber: "107",
    tenantName: "Emily Rodriguez",
    paymentMethod: "Credit Card",
    paymentType: "Rent",
    amount: 1650.00,
    dueDate: "04/01/2023",
    paymentStatus: "Pending",
    status: "Pending",
  },
  {
    transactionId: "TRX-2023-005",
    transactionDate: "04/02/2023",
    propertyName: "Oakwood Heights",
    unitNumber: "310",
    tenantName: "James Wilson",
    paymentMethod: "Bank Transfer",
    paymentType: "Rent + Parking",
    amount: 2250.00,
    dueDate: "04/01/2023",
    paymentStatus: "Completed",
    status: "Approved",
  },
  // Credits
  {
    creditId: "CRD-2023-001",
    transactionDate: "04/12/2023",
    propertyName: "Riverside Apartments",
    unitNumber: "301",
    tenantName: "Michael Johnson",
    creditAmount: 150.00,
    creditReason: "Maintenance Inconvenience",
    creditAppliedTo: "May Rent",
    status: "Approved",
  },
  {
    creditId: "CRD-2023-002",
    transactionDate: "04/08/2023",
    propertyName: "Parkview Condos",
    unitNumber: "512",
    tenantName: "David Chen",
    creditAmount: 75.00,
    creditReason: "Referral Bonus",
    creditAppliedTo: "May Rent",
    status: "Approved",
  },
  {
    creditId: "CRD-2023-003",
    transactionDate: "04/15/2023",
    propertyName: "Oakwood Heights",
    unitNumber: "205",
    tenantName: "Sarah Williams",
    creditAmount: 200.00,
    creditReason: "Overpayment Refund",
    creditAppliedTo: "Account Balance",
    status: "Pending",
  },
  // Discounts
  {
    discountId: "DSC-2023-001",
    transactionDate: "04/01/2023",
    propertyName: "Riverside Apartments",
    unitNumber: "107",
    tenantName: "Emily Rodriguez",
    discountType: "Early Payment",
    discountAmount: 50.00,
    discountPercentage: 3,
    discountPeriod: "April 2023",
    discountAppliedTo: "April Rent",
    status: "Approved",
  },
  {
    discountId: "DSC-2023-002",
    transactionDate: "04/01/2023",
    propertyName: "Oakwood Heights",
    unitNumber: "310",
    tenantName: "James Wilson",
    discountType: "Loyalty",
    discountAmount: 100.00,
    discountPercentage: 5,
    discountPeriod: "April 2023",
    discountAppliedTo: "April Rent",
    status: "Approved",
  },
  {
    discountId: "DSC-2023-003",
    transactionDate: "04/01/2023",
    propertyName: "Parkview Condos",
    unitNumber: "512",
    tenantName: "David Chen",
    discountType: "Renewal Incentive",
    discountAmount: 150.00,
    discountPercentage: 7,
    discountPeriod: "April-June 2023",
    discountAppliedTo: "Quarterly Rent",
    status: "Pending",
  },
  // Keep some of the original data
  {
    requestSubmitted: "03/06/2025",
    requestedResource: "The Longboard Room",
    requestedDate: "03/19/2025",
    requestedTime: "10:45 AM - 12:30 PM",
    requesterName: "Lucy Mitchell",
    email: "lucy.mitchell@example.com",
    bookingInfo: "-",
    status: "Approved",
    totalPrice: 0.00,
  },
  {
    requestSubmitted: "03/05/2025",
    requestedResource: "Conference Room A",
    requestedDate: "03/20/2025",
    requestedTime: "2:00 PM - 4:00 PM",
    requesterName: "John Smith",
    email: "john.smith@example.com",
    bookingInfo: "Team meeting",
    status: "Pending",
    totalPrice: 150.00,
  },
  {
    requestSubmitted: "03/04/2025",
    requestedResource: "Training Room",
    requestedDate: "03/18/2025",
    requestedTime: "9:00 AM - 5:00 PM",
    requesterName: "Sarah Johnson",
    email: "sarah.j@example.com",
    bookingInfo: "Annual training",
    status: "Approved",
    totalPrice: 500.00,
  },
  {
    owner: "Jane Smith",
    status: "live",
    costs: 6087.11,
    region: "US-East 2",
    stability: 91,
    lastEdited: "22/09/2023 10:45",
  },
  {
    owner: "Alejandro Garcia",
    status: "live",
    costs: 7234.56,
    region: "EU-West 1",
    stability: 12,
    lastEdited: "17/05/2021 08:32",
  },
  {
    owner: "Wei Zhang",
    status: "inactive",
    costs: 0,
    region: "US-West 2",
    stability: 0,
    lastEdited: "10/11/2022 15:24",
  },
  {
    owner: "Maria Rossi",
    status: "live",
    costs: 8190.77,
    region: "US-East 1",
    stability: 8,
    lastEdited: "05/06/2023 12:16",
  },
  {
    owner: "Nina Müller",
    status: "archived",
    costs: 7609.32,
    region: "EU-North 1",
    stability: 20,
    lastEdited: "23/01/2022 11:11",
  },
  {
    owner: "Liam O'Sullivan",
    status: "live",
    costs: 5204.98,
    region: "US-West 1",
    stability: 18,
    lastEdited: "14/03/2023 14:45",
  },
  {
    owner: "Amir Fleischlin",
    status: "inactive",
    costs: 0,
    region: "EU-Central 1",
    stability: 0,
    lastEdited: "12/02/2023 09:12",
  },
  {
    owner: "Yuki Tanaka",
    status: "live",
    costs: 9874.56,
    region: "US-East 1",
    stability: 6,
    lastEdited: "19/08/2022 16:03",
  },
  {
    owner: "Fatima Al-Farsi",
    status: "live",
    costs: 5486.99,
    region: "EU-West 1",
    stability: 12,
    lastEdited: "29/11/2021 17:25",
  },
  {
    owner: "Olga Ivanova",
    status: "live",
    costs: 6120.45,
    region: "US-West 2",
    stability: 9,
    lastEdited: "07/12/2023 07:14",
  },
  {
    owner: "Pierre Dubois",
    status: "live",
    costs: 4834.11,
    region: "EU-Central 1",
    stability: 15,
    lastEdited: "28/04/2023 10:45",
  },
  {
    owner: "Sara Johansson",
    status: "live",
    costs: 5302.22,
    region: "US-East 2",
    stability: 97,
    lastEdited: "03/10/2022 08:33",
  },
  {
    owner: "Ahmed Hassan",
    status: "live",
    costs: 6221.54,
    region: "US-West 1",
    stability: 11,
    lastEdited: "22/07/2022 14:16",
  },
  {
    owner: "Emily Brown",
    status: "archived",
    costs: 6129.99,
    region: "EU-North 1",
    stability: 22,
    lastEdited: "18/01/2022 12:45",
  },
  {
    owner: "Carlos Sanchez",
    status: "live",
    costs: 4850.33,
    region: "US-East 1",
    stability: 13,
    lastEdited: "05/06/2021 18:33",
  },
  {
    owner: "Hannah Kim",
    status: "live",
    costs: 7902.11,
    region: "EU-West 1",
    stability: 91,
    lastEdited: "11/05/2023 11:00",
  },
  {
    owner: "David Johnson",
    status: "live",
    costs: 6789.77,
    region: "US-West 2",
    stability: 10,
    lastEdited: "19/09/2023 17:17",
  },
  {
    owner: "Linda Anderson",
    status: "live",
    costs: 7434.22,
    region: "US-East 2",
    stability: 9,
    lastEdited: "27/03/2023 14:28",
  },
  {
    owner: "Michael Lee",
    status: "archived",
    costs: 7290.01,
    region: "EU-Central 1",
    stability: 12,
    lastEdited: "23/11/2022 15:13",
  },
  {
    owner: "Sophia Lopez",
    status: "live",
    costs: 8921.34,
    region: "EU-North 1",
    stability: 16,
    lastEdited: "08/05/2023 08:56",
  },
  {
    owner: "Robert White",
    status: "live",
    costs: 6834.23,
    region: "US-West 1",
    stability: 8,
    lastEdited: "29/04/2022 19:27",
  },
  {
    owner: "Mia Wang",
    status: "inactive",
    costs: 0,
    region: "US-West 2",
    stability: 14,
    lastEdited: "30/12/2023 13:01",
  },
  {
    owner: "James Taylor",
    status: "live",
    costs: 4321.56,
    region: "EU-West 1",
    stability: 5,
    lastEdited: "18/06/2021 10:49",
  },
  {
    owner: "Victoria Martinez",
    status: "archived",
    costs: 5120.33,
    region: "US-East 1",
    stability: 19,
    lastEdited: "24/02/2022 14:02",
  },
  {
    owner: "William Harris",
    status: "live",
    costs: 9211.42,
    region: "EU-North 1",
    stability: 11,
    lastEdited: "22/07/2021 12:33",
  },
  {
    owner: "Isabella Clark",
    status: "inactive",
    costs: 0,
    region: "US-East 2",
    stability: 6,
    lastEdited: "13/09/2022 16:22",
  },
  {
    owner: "Alexander Young",
    status: "live",
    costs: 4534.88,
    region: "US-West 1",
    stability: 17,
    lastEdited: "09/10/2023 17:44",
  },
  {
    owner: "Grace Patel",
    status: "live",
    costs: 8245.99,
    region: "EU-Central 1",
    stability: 9,
    lastEdited: "29/07/2022 11:56",
  },
  {
    owner: "Daniel Wilson",
    status: "archived",
    costs: 7890.77,
    region: "EU-West 1",
    stability: 14,
    lastEdited: "10/11/2021 15:08",
  },
  {
    owner: "Charlotte Thompson",
    status: "live",
    costs: 8911.44,
    region: "US-East 1",
    stability: 10,
    lastEdited: "06/08/2021 09:17",
  },
  {
    owner: "Olivia Anderson",
    status: "inactive",
    costs: 0,
    region: "EU-West 1",
    stability: 12,
    lastEdited: "25/05/2022 10:05",
  },
  {
    owner: "Henry Brown",
    status: "live",
    costs: 5500.12,
    region: "US-West 2",
    stability: 15,
    lastEdited: "07/01/2023 08:33",
  },
  {
    owner: "Ethan Davis",
    status: "live",
    costs: 7200.98,
    region: "EU-Central 1",
    stability: 8,
    lastEdited: "21/09/2023 13:00",
  },
  {
    owner: "Amelia Wilson",
    status: "live",
    costs: 8321.56,
    region: "US-East 2",
    stability: 18,
    lastEdited: "12/06/2021 11:45",
  },
  {
    owner: "Lucas Martin",
    status: "live",
    costs: 4534.99,
    region: "US-West 1",
    stability: 11,
    lastEdited: "30/03/2022 14:14",
  },
  {
    owner: "Mason Clark",
    status: "live",
    costs: 6890.11,
    region: "EU-North 1",
    stability: 7,
    lastEdited: "14/05/2023 12:36",
  },
  {
    owner: "Emma Robinson",
    status: "live",
    costs: 7990.01,
    region: "US-East 1",
    stability: 13,
    lastEdited: "18/10/2022 09:25",
  },
  {
    owner: "Benjamin Lewis",
    status: "archived",
    costs: 5412.23,
    region: "EU-Central 1",
    stability: 20,
    lastEdited: "22/02/2022 15:55",
  },
  {
    owner: "Ava Walker",
    status: "live",
    costs: 7123.98,
    region: "US-West 2",
    stability: 9,
    lastEdited: "27/08/2023 18:33",
  },
  {
    owner: "Elijah Young",
    status: "live",
    costs: 6445.33,
    region: "EU-West 1",
    stability: 8,
    lastEdited: "02/07/2021 17:14",
  },
  {
    owner: "Sophia Hall",
    status: "inactive",
    costs: 0,
    region: "US-East 1",
    stability: 10,
    lastEdited: "15/04/2023 10:45",
  },
  {
    owner: "Matthew Harris",
    status: "live",
    costs: 7634.67,
    region: "EU-North 1",
    stability: 11,
    lastEdited: "06/09/2023 11:23",
  },
  {
    owner: "Aiden Thompson",
    status: "archived",
    costs: 4900.88,
    region: "US-West 1",
    stability: 14,
    lastEdited: "20/10/2021 16:05",
  },
  {
    owner: "Chloe Martinez",
    status: "live",
    costs: 5234.44,
    region: "US-East 2",
    stability: 17,
    lastEdited: "11/11/2023 08:55",
  },
  {
    owner: "Oliver Davis",
    status: "inactive",
    costs: 0,
    region: "EU-West 1",
    stability: 12,
    lastEdited: "18/08/2022 14:34",
  },
  {
    owner: "Emily Clark",
    status: "live",
    costs: 7688.55,
    region: "EU-Central 1",
    stability: 9,
    lastEdited: "22/04/2023 12:11",
  },
  {
    owner: "Jack Lewis",
    status: "archived",
    costs: 6344.89,
    region: "US-West 2",
    stability: 19,
    lastEdited: "10/02/2021 11:45",
  },
  {
    owner: "Lily Walker",
    status: "live",
    costs: 5003.78,
    region: "EU-West 1",
    stability: 8,
    lastEdited: "23/07/2022 14:33",
  },
  {
    owner: "Jackson Martinez",
    status: "inactive",
    costs: 0,
    region: "US-East 1",
    stability: 7,
    lastEdited: "07/05/2023 09:27",
  },
  {
    owner: "Avery Hall",
    status: "live",
    costs: 8432.45,
    region: "EU-Central 1",
    stability: 11,
    lastEdited: "16/03/2022 15:44",
  },
  {
    owner: "Logan Harris",
    status: "archived",
    costs: 7120.39,
    region: "EU-North 1",
    stability: 21,
    lastEdited: "01/01/2022 16:18",
  },
]

export const visitorStatuses: { value: string; label: string; variant: string }[] = [
  {
    value: "Checked In",
    label: "Checked In",
    variant: "success",
  },
  {
    value: "Checked Out",
    label: "Checked Out",
    variant: "default",
  },
  {
    value: "Expected",
    label: "Expected",
    variant: "warning",
  },
]

// Generate realistic visitor data using centralized users as hosts
const hostUsers = getHostCapableUsers();
export const visitors = [
  {
    checkInTime: "09:30 AM",
    visitorName: "Amanda Chen",
    company: "Digital Marketing Solutions",
    hostName: hostUsers.find(u => u.id === "sarah-johnson-tech")?.name || "Sarah Johnson",
    hostId: "sarah-johnson-tech",
    purpose: "Product Demo",
    status: "Checked In",
    checkOutTime: null,
    badgeNumber: "V1001",
  },
  {
    checkInTime: "10:15 AM",
    visitorName: "Marcus Rodriguez",
    company: "Venture Capital Partners",
    hostName: hostUsers.find(u => u.id === "david-rodriguez-finance")?.name || "David Rodriguez",
    hostId: "david-rodriguez-finance",
    purpose: "Investment Meeting",
    status: "Checked Out",
    checkOutTime: "11:45 AM",
    badgeNumber: "V1002",
  },
  {
    checkInTime: "02:00 PM",
    visitorName: "Dr. Jennifer Walsh",
    company: "Medical Research Institute",
    hostName: hostUsers.find(u => u.id === "dr-emma-davis")?.name || "Dr. Emma Davis",
    hostId: "dr-emma-davis",
    purpose: "Research Collaboration",
    status: "Expected",
    checkOutTime: null,
    badgeNumber: "V1003",
  },
  {
    checkInTime: "11:00 AM",
    visitorName: "Kevin Park",
    company: "Software Consultants Inc",
    hostName: hostUsers.find(u => u.id === "michael-chen-tech")?.name || "Michael Chen",
    hostId: "michael-chen-tech",
    purpose: "Technical Consultation",
    status: "Checked In",
    checkOutTime: null,
    badgeNumber: "V1004",
  },
  {
    checkInTime: "03:30 PM",
    visitorName: "Rachel Thompson",
    company: "Legal Advisory Group",
    hostName: hostUsers.find(u => u.id === "catherine-wright-legal")?.name || "Catherine Wright",
    hostId: "catherine-wright-legal",
    purpose: "Legal Review",
    status: "Expected",
    checkOutTime: null,
    badgeNumber: "V1005",
  },
]

export const workOrderStatuses: { value: string; label: string; variant: string }[] = [
  {
    value: "New",
    label: "New",
    variant: "blue",
  },
  {
    value: "In Progress",
    label: "In Progress",
    variant: "warning",
  },
  {
    value: "Completed",
    label: "Completed",
    variant: "success",
  },
  {
    value: "On Hold",
    label: "On Hold",
    variant: "default",
  },
]

export const issueTypes: { value: string; label: string }[] = [
  {
    value: "Electrical",
    label: "Electrical",
  },
  {
    value: "Plumbing",
    label: "Plumbing",
  },
  {
    value: "HVAC",
    label: "HVAC",
  },
  {
    value: "Maintenance",
    label: "Maintenance",
  },
  {
    value: "Security",
    label: "Security",
  },
  {
    value: "Cleaning",
    label: "Cleaning",
  },
  {
    value: "Other",
    label: "Other",
  },
]

export const buildings: { value: string; label: string }[] = [
  {
    value: "Access Bridge Playground",
    label: "Access Bridge Playground",
  },
  {
    value: "Main Tower",
    label: "Main Tower",
  },
  {
    value: "East Wing",
    label: "East Wing",
  },
  {
    value: "West Building",
    label: "West Building",
  },
  {
    value: "South Plaza",
    label: "South Plaza",
  },
]

// Generate realistic work orders using centralized user database
const createWorkOrderFromUser = (user: any, request: string, issueType: string, status: string, description: string = "", assignee: string = "Unassigned", priority: string = "Medium") => ({
  id: `WO-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
  request,
  dateTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString() + " " + 
            new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
  description,
  building: user.buildings[0] || "Main Tower",
  floor: user.floorSuite.split(',')[0] || "Floor 1",
  assignee,
  status,
  requestor: `${user.name} - ${user.company}`,
  requestorDetails: {
    id: user.id,
    name: user.name,
    email: user.email,
    company: user.company,
    floorSuite: user.floorSuite,
    serviceRequest: request,
    serviceRequestType: issueType,
    serviceRequestStatus: status,
    acsStatus: user.acsStatus,
    hasNotes: description.length > 0,
    badgeId: user.badgeId
  },
  company: user.company,
  issueType,
  priority,
});

const evgenyUser = getUserById("evgeny-mahnovets");
const sarahUser = getUserById("sarah-johnson-tech");
const emilyUser = getUserById("emily-brown-tech");
const davidUser = getUserById("david-rodriguez-finance");
const drEmmaUser = getUserById("dr-emma-davis");
const jamesUser = getUserById("james-wilson-health");

// New users awaiting access
const jenniferMartinezUser = getUserById("jennifer-martinez-new");
const kevinChenUser = getUserById("kevin-chen-new");
const rachelThompsonUser = getUserById("rachel-thompson-new");
const marcusRodriguezUser = getUserById("marcus-rodriguez-new");
const amandaKimUser = getUserById("amanda-kim-contractor");
const brianWilsonUser = getUserById("brian-wilson-suspended");

export const workOrders = [
  // ACCESS REQUEST WORK ORDERS (These show up in work orders AND create the service requests in access control)
  
  // Different types of access requests
  createWorkOrderFromUser(
    jenniferMartinezUser!,
    "New Employee MKA Request",
    "Security",
    "New",
    "New hire Jennifer Martinez requires mobile key access setup for TechCorp Solutions. Position: Junior Developer, Start Date: 01/15/2025. Setup smartphone access and badge credentials.",
    "Security Team",
    "High"
  ),
  createWorkOrderFromUser(
    kevinChenUser!,
    "Lost Device Replacement", 
    "Security",
    "In Progress",
    "Research scientist Kevin Chen reported lost smartphone with mobile access credentials. Requires device deactivation and new device setup for HealthTech facilities.",
    "Security Team",
    "High"
  ),
  createWorkOrderFromUser(
    rachelThompsonUser!,
    "New Phone Setup Request",
    "Security",
    "New",
    "Senior Paralegal Rachel Thompson received new company iPhone and requires mobile access transfer from old device. Legal Partners offices and client meeting rooms access needed.",
    "Unassigned",
    "Medium"
  ),
  createWorkOrderFromUser(
    marcusRodriguezUser!,
    "Access Level Update Request",
    "Security",
    "In Progress", 
    "Investment Analyst Marcus Rodriguez promoted to Senior Analyst. Requires elevated access to Global Finance Corp trading floor and executive areas.",
    "Security Team",
    "Medium"
  ),
  createWorkOrderFromUser(
    amandaKimUser!,
    "Tenant Departure Processing",
    "Security",
    "New",
    "External Contractor LLC contract ending. Process tenant departure for Amanda Kim - revoke building access and collect credentials.",
    "Unassigned",
    "High"
  ),
  
  // Termination of Employment
  createWorkOrderFromUser(
    brianWilsonUser!,
    "Termination of Employment",
    "Security", 
    "New",
    "QA Engineer Brian Wilson employment terminated. Immediate revocation of all access credentials, mobile access, and badge collection required.",
    "Unassigned",
    "High"
  ),

  // REGULAR FACILITY WORK ORDERS
  
  // Evgeny's requests
  createWorkOrderFromUser(
    evgenyUser!,
    "Office Cleaning Request",
    "Cleaning",
    "New",
    "Regular office cleaning needed for conference room",
    "Unassigned",
    "Low"
  ),
  createWorkOrderFromUser(
    evgenyUser!,
    "Network Connection Issue",
    "Electrical",
    "New",
    "Internet connection intermittent in office suite",
    "Unassigned",
    "High"
  ),
  
  // Sarah Johnson's requests
  createWorkOrderFromUser(
    sarahUser!,
    "HVAC Temperature Control",
    "HVAC",
    "In Progress",
    "Air conditioning not maintaining consistent temperature in server room",
    "Building Maintenance Team",
    "High"
  ),
  createWorkOrderFromUser(
    sarahUser!,
    "Lighting Replacement",
    "Electrical",
    "Completed",
    "LED bulbs need replacement in main office area",
    "Electrical Team",
    "Medium"
  ),
  
  // Emily Brown's requests
  createWorkOrderFromUser(
    emilyUser!,
    "Furniture Assembly",
    "Maintenance",
    "New",
    "New office furniture needs assembly and installation",
    "Unassigned",
    "Medium"
  ),
  
  // David Rodriguez's requests
  createWorkOrderFromUser(
    davidUser!,
    "Security System Update",
    "Security",
    "In Progress",
    "Access card reader needs firmware update",
    "Security Team",
    "High"
  ),
  
  // Dr. Emma's requests
  createWorkOrderFromUser(
    drEmmaUser!,
    "Medical Equipment Installation",
    "Electrical",
    "New",
    "New medical monitoring equipment requires electrical setup",
    "Unassigned",
    "High"
  ),
  
  // James Wilson's requests
  createWorkOrderFromUser(
    jamesUser!,
    "Water Leak Repair",
    "Plumbing",
    "Completed",
    "Minor water leak in break room sink",
    "Plumbing Team",
    "Medium"
  ),
]
