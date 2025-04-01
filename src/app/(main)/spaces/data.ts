export interface Space {
    id: string;
    name: string;
    imageUrl: string;
    building: string;
    floor: number;
    type: string;
    squareFeet: number;
    occupancyStatus: "Occupied" | "Vacant";
    tenant?: string;
    leaseEnd?: string;
    monthlyRate?: number;
    lastUpdated: string;
    isBookable: boolean;
    isPublic: boolean;
}

export const data: Space[] = [
    {
        id: "1",
        name: "North Wing Office Suite",
        imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
        building: "125 Highland Ave",
        floor: 3,
        type: "Office",
        squareFeet: 2500,
        occupancyStatus: "Occupied",
        tenant: "Tech Innovators Inc",
        leaseEnd: "2025-06-30",
        monthlyRate: 12500,
        lastUpdated: "2024-03-01",
        isBookable: false,
        isPublic: false
    },
    {
        id: "2",
        name: "South Wing Executive Suite",
        imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
        building: "125 Highland Ave",
        floor: 3,
        type: "Office",
        squareFeet: 3000,
        occupancyStatus: "Vacant",
        monthlyRate: 15000,
        lastUpdated: "2024-03-10",
        isBookable: true,
        isPublic: false
    },
    {
        id: "3",
        name: "Tech Hub",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        building: "75 State Street",
        floor: 2,
        type: "Office",
        squareFeet: 5000,
        occupancyStatus: "Vacant",
        monthlyRate: 25000,
        lastUpdated: "2024-01-15",
        isBookable: true,
        isPublic: true
    },
    {
        id: "4",
        name: "Innovation Center",
        imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
        building: "75 State Street",
        floor: 2,
        type: "Office",
        squareFeet: 4000,
        occupancyStatus: "Occupied",
        tenant: "Future Labs Co",
        leaseEnd: "2024-12-31",
        monthlyRate: 20000,
        lastUpdated: "2024-02-20",
        isBookable: false,
        isPublic: true
    },
    {
        id: "5",
        name: "Executive Suite A",
        imageUrl: "https://images.unsplash.com/photo-1568667256549-094345857637",
        building: "400 Market Street",
        floor: 5,
        type: "Office",
        squareFeet: 2000,
        occupancyStatus: "Occupied",
        tenant: "Global Finance Group",
        leaseEnd: "2025-03-31",
        monthlyRate: 10000,
        lastUpdated: "2024-03-05",
        isBookable: false,
        isPublic: false
    },
    {
        id: "6",
        name: "Creative Studio",
        imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
        building: "400 Market Street",
        floor: 4,
        type: "Office",
        squareFeet: 1800,
        occupancyStatus: "Vacant",
        monthlyRate: 9000,
        lastUpdated: "2024-03-15",
        isBookable: true,
        isPublic: true
    },
    {
        id: "7",
        name: "West Wing Office",
        imageUrl: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890",
        building: "200 Congress Ave",
        floor: 18,
        type: "Office",
        squareFeet: 3500,
        occupancyStatus: "Occupied",
        tenant: "Digital Solutions Ltd",
        leaseEnd: "2025-08-31",
        monthlyRate: 17500,
        lastUpdated: "2024-03-12",
        isBookable: false,
        isPublic: false
    },
    {
        id: "8",
        name: "East Wing Office",
        imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
        building: "200 Congress Ave",
        floor: 18,
        type: "Office",
        squareFeet: 3200,
        occupancyStatus: "Vacant",
        monthlyRate: 16000,
        lastUpdated: "2024-03-08",
        isBookable: true,
        isPublic: false
    },
]; 