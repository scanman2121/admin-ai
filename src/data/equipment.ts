// Equipment and asset data structure with Visitt-inspired features

export interface Equipment {
    id: string
    name: string
    type: EquipmentType
    category: string
    building: string
    floor: string
    room: string
    location: string
    manufacturer?: string
    model?: string
    serialNumber?: string
    installationDate?: string
    warrantyExpiration?: string
    qrCode?: string
    healthStatus: "excellent" | "good" | "fair" | "poor" | "critical"
    healthScore: number // 0-100
    lastMaintenanceDate?: string
    nextMaintenanceDate?: string
    maintenanceFrequency?: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annually" | "annually" | "as-needed"
    status: "active" | "inactive" | "maintenance" | "retired"
    assignedTeam?: string
    serviceHistoryCount: number
    openServiceRequestsCount: number
    totalCost: number
    lastUpdated: string
    tags?: string[]
    certifications?: Certification[]
    documents?: Document[]
    readings?: EquipmentReading[]
}

export interface Certification {
    id: string
    type: string
    issuer: string
    issueDate: string
    expirationDate: string
    status: "active" | "expired" | "expiring-soon"
    documentUrl?: string
}

export interface Document {
    id: string
    name: string
    type: "manual" | "warranty" | "coi" | "inspection" | "service-log" | "other"
    url: string
    uploadedDate: string
    uploadedBy: string
    tags?: string[]
}

export interface EquipmentReading {
    id: string
    type: string // e.g., "temperature", "pressure", "voltage"
    value: number
    unit: string
    recordedDate: string
    recordedBy: string
    notes?: string
}

export type EquipmentType = 
    | "HVAC"
    | "Elevator"
    | "Plumbing"
    | "Electrical"
    | "Fire Safety"
    | "Security"
    | "Generator"
    | "Boiler"
    | "Pump"
    | "Lighting"
    | "Other"

// Mock equipment data
export const equipment: Equipment[] = [
    {
        id: "eq-001",
        name: "Main HVAC Unit - Floor 12",
        type: "HVAC",
        category: "HVAC Systems",
        building: "125 Highland Ave",
        floor: "12",
        room: "Mechanical Room A",
        location: "125 Highland Ave, Floor 12, Mechanical Room A",
        manufacturer: "Carrier",
        model: "38YCA060-300",
        serialNumber: "CARR-2023-001234",
        installationDate: "2020-03-15",
        warrantyExpiration: "2025-03-15",
        qrCode: "EQ-001-HVAC-12",
        healthStatus: "good",
        healthScore: 78,
        lastMaintenanceDate: "2024-01-15",
        nextMaintenanceDate: "2024-04-15",
        maintenanceFrequency: "quarterly",
        status: "active",
        assignedTeam: "Maintenance Team",
        serviceHistoryCount: 12,
        openServiceRequestsCount: 1,
        totalCost: 45000,
        lastUpdated: "2024-03-10T10:30:00Z",
        tags: ["critical", "hvac", "floor-12"],
        certifications: [
            {
                id: "cert-001",
                type: "EPA Refrigerant Certification",
                issuer: "EPA",
                issueDate: "2020-03-15",
                expirationDate: "2025-03-15",
                status: "active"
            }
        ],
        documents: [
            {
                id: "doc-001",
                name: "Carrier Installation Manual",
                type: "manual",
                url: "/documents/equipment/carrier-manual.pdf",
                uploadedDate: "2020-03-15",
                uploadedBy: "John Smith",
                tags: ["manual", "installation"]
            }
        ],
        readings: [
            {
                id: "read-001",
                type: "temperature",
                value: 72,
                unit: "°F",
                recordedDate: "2024-03-10T10:30:00Z",
                recordedBy: "Sarah Johnson",
                notes: "Normal operating temperature"
            }
        ]
    },
    {
        id: "eq-002",
        name: "Elevator 1 - Main Lobby",
        type: "Elevator",
        category: "Vertical Transportation",
        building: "125 Highland Ave",
        floor: "1",
        room: "Main Lobby",
        location: "125 Highland Ave, Floor 1, Main Lobby",
        manufacturer: "Otis",
        model: "Gen2",
        serialNumber: "OTIS-2019-567890",
        installationDate: "2019-06-10",
        warrantyExpiration: "2024-06-10",
        qrCode: "EQ-002-ELEV-1",
        healthStatus: "excellent",
        healthScore: 92,
        lastMaintenanceDate: "2024-02-28",
        nextMaintenanceDate: "2024-05-28",
        maintenanceFrequency: "monthly",
        status: "active",
        assignedTeam: "Maintenance Team",
        serviceHistoryCount: 48,
        openServiceRequestsCount: 0,
        totalCost: 125000,
        lastUpdated: "2024-03-08T14:20:00Z",
        tags: ["elevator", "lobby", "critical"],
        certifications: [
            {
                id: "cert-002",
                type: "Elevator Inspection Certificate",
                issuer: "State Building Authority",
                issueDate: "2024-01-15",
                expirationDate: "2025-01-15",
                status: "active"
            }
        ],
        documents: [],
        readings: []
    },
    {
        id: "eq-003",
        name: "Boiler System - Basement",
        type: "Boiler",
        category: "Heating Systems",
        building: "125 Highland Ave",
        floor: "Basement",
        room: "Boiler Room",
        location: "125 Highland Ave, Basement, Boiler Room",
        manufacturer: "Burnham",
        model: "V8H",
        serialNumber: "BURN-2018-112233",
        installationDate: "2018-11-20",
        warrantyExpiration: "2023-11-20",
        qrCode: "EQ-003-BOIL-BAS",
        healthStatus: "fair",
        healthScore: 65,
        lastMaintenanceDate: "2023-12-10",
        nextMaintenanceDate: "2024-06-10",
        maintenanceFrequency: "annually",
        status: "active",
        assignedTeam: "Maintenance Team",
        serviceHistoryCount: 6,
        openServiceRequestsCount: 0,
        totalCost: 85000,
        lastUpdated: "2024-02-15T09:00:00Z",
        tags: ["boiler", "heating", "basement"],
        certifications: [
            {
                id: "cert-003",
                type: "Boiler Inspection Certificate",
                issuer: "State Building Authority",
                issueDate: "2023-12-10",
                expirationDate: "2024-12-10",
                status: "active"
            }
        ],
        documents: [],
        readings: [
            {
                id: "read-002",
                type: "pressure",
                value: 12,
                unit: "PSI",
                recordedDate: "2024-02-15T09:00:00Z",
                recordedBy: "Mike Thompson",
                notes: "Within normal range"
            }
        ]
    },
    {
        id: "eq-004",
        name: "Fire Sprinkler System - Building Wide",
        type: "Fire Safety",
        category: "Life Safety Systems",
        building: "125 Highland Ave",
        floor: "All Floors",
        room: "Building Wide",
        location: "125 Highland Ave, All Floors",
        manufacturer: "Tyco",
        model: "F960",
        serialNumber: "TYCO-2020-445566",
        installationDate: "2020-08-05",
        warrantyExpiration: "2025-08-05",
        qrCode: "EQ-004-FIRE-BLDG",
        healthStatus: "excellent",
        healthScore: 95,
        lastMaintenanceDate: "2024-01-05",
        nextMaintenanceDate: "2024-07-05",
        maintenanceFrequency: "semi-annually",
        status: "active",
        assignedTeam: "Security Team",
        serviceHistoryCount: 8,
        openServiceRequestsCount: 0,
        totalCost: 150000,
        lastUpdated: "2024-03-01T11:15:00Z",
        tags: ["fire-safety", "critical", "compliance"],
        certifications: [
            {
                id: "cert-004",
                type: "Fire Safety Inspection",
                issuer: "Fire Department",
                issueDate: "2024-01-05",
                expirationDate: "2025-01-05",
                status: "active"
            }
        ],
        documents: [],
        readings: []
    },
    {
        id: "eq-005",
        name: "Generator - Emergency Power",
        type: "Generator",
        category: "Power Systems",
        building: "125 Highland Ave",
        floor: "Basement",
        room: "Generator Room",
        location: "125 Highland Ave, Basement, Generator Room",
        manufacturer: "Cummins",
        model: "QSK60",
        serialNumber: "CUMM-2019-778899",
        installationDate: "2019-04-12",
        warrantyExpiration: "2024-04-12",
        qrCode: "EQ-005-GEN-BAS",
        healthStatus: "good",
        healthScore: 80,
        lastMaintenanceDate: "2024-02-20",
        nextMaintenanceDate: "2024-05-20",
        maintenanceFrequency: "quarterly",
        status: "active",
        assignedTeam: "Maintenance Team",
        serviceHistoryCount: 20,
        openServiceRequestsCount: 0,
        totalCost: 200000,
        lastUpdated: "2024-03-05T16:45:00Z",
        tags: ["generator", "emergency", "critical"],
        certifications: [
            {
                id: "cert-005",
                type: "Generator Load Test",
                issuer: "Cummins Service",
                issueDate: "2024-02-20",
                expirationDate: "2024-05-20",
                status: "active"
            }
        ],
        documents: [],
        readings: []
    },
    {
        id: "eq-006",
        name: "Water Pump - Basement",
        type: "Pump",
        category: "Plumbing Systems",
        building: "125 Highland Ave",
        floor: "Basement",
        room: "Pump Room",
        location: "125 Highland Ave, Basement, Pump Room",
        manufacturer: "Grundfos",
        model: "CR64-4",
        serialNumber: "GRUN-2021-334455",
        installationDate: "2021-02-18",
        warrantyExpiration: "2026-02-18",
        qrCode: "EQ-006-PUMP-BAS",
        healthStatus: "poor",
        healthScore: 45,
        lastMaintenanceDate: "2023-11-15",
        nextMaintenanceDate: "2024-04-15",
        maintenanceFrequency: "quarterly",
        status: "active",
        assignedTeam: "Maintenance Team",
        serviceHistoryCount: 9,
        openServiceRequestsCount: 2,
        totalCost: 12000,
        lastUpdated: "2024-03-12T08:30:00Z",
        tags: ["pump", "plumbing", "needs-attention"],
        certifications: [],
        documents: [],
        readings: [
            {
                id: "read-003",
                type: "pressure",
                value: 8,
                unit: "PSI",
                recordedDate: "2024-03-12T08:30:00Z",
                recordedBy: "Sarah Johnson",
                notes: "Below normal - requires attention"
            }
        ]
    }
]

