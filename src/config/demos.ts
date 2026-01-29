import { DemoType } from "@/contexts/DemoContext"

export type DemoConfig = {
  id: DemoType
  name: string
  logo: {
    type: "svg" | "image"
    component?: React.ComponentType<{ className?: string }>
    imageUrl?: string
    alt: string
  }
  theme: {
    primaryColor: string
    primaryColorDark?: string
  }
  homepage: {
    welcomeMessage: string
    userName: string
    content: {
      events?: Array<{
        title: string
        date: string
        time: string
        status: string
        registered?: number
        capacity?: string
      }>
      communications?: Array<{
        title: string
        scheduledDate: string
        scheduledTime: string
        channels: string[]
        daysUntil: number
        status: string
      }>
      discover?: {
        title: string
        description: string
        items: Array<{
          title: string
          description: string
          imageUrl?: string
        }>
      }
    }
  }
  buildings: Array<{
    id: string
    name: string
    address: string
    imageUrl: string
    location: string
    type: string
    floors: number
    tenants: number
    population: number
    ths?: number
    status: string
    lastUpdated: string
  }>
  mapLocation: {
    city: string
    state: string
    address?: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
}

export const demoConfigs: Record<DemoType, DemoConfig> = {
  generic: {
    id: "generic",
    name: "Generic Demo",
    logo: {
      type: "svg",
      alt: "HqO Logo",
    },
    theme: {
      primaryColor: "#044AEF",
      primaryColorDark: "#0336B3",
    },
    homepage: {
      welcomeMessage: "Welcome back",
      userName: "Drake",
      content: {
        events: [
          {
            title: "Tenant Appreciation Party",
            date: "JUN 12",
            time: "4–7 PM",
            status: "Scheduled",
            registered: 687,
            capacity: "Unlimited capacity",
          },
        ],
        communications: [
          {
            title: "Drag Me Downtown ICA San Francisco",
            scheduledDate: "06/16/2025",
            scheduledTime: "12:00 PM",
            channels: ["Push", "In app"],
            daysUntil: 4,
            status: "Scheduled",
          },
        ],
        discover: {
          title: "Discover",
          description: "Explore new features and content",
          items: [],
        },
      },
    },
    buildings: [
      // Boston Class A Buildings
      {
        id: "1",
        name: "200 Clarendon",
        address: "200 Clarendon Street",
        imageUrl: "https://images.unsplash.com/photo-1562516155-e0c1ee44059b?q=80&w=2574&auto=format&fit=crop",
        location: "Boston, MA",
        type: "Office",
        floors: 62,
        tenants: 45,
        population: 4500,
        ths: 94,
        status: "Active",
        lastUpdated: "2024-01-15",
      },
      {
        id: "2",
        name: "Prudential Tower",
        address: "800 Boylston Street",
        imageUrl: "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=2550&auto=format&fit=crop",
        location: "Boston, MA",
        type: "Office",
        floors: 52,
        tenants: 38,
        population: 3800,
        ths: 89,
        status: "Active",
        lastUpdated: "2024-01-10",
      },
      {
        id: "3",
        name: "One Congress",
        address: "1 Congress Street",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
        location: "Boston, MA",
        type: "Office",
        floors: 43,
        tenants: 28,
        population: 2800,
        ths: 91,
        status: "Active",
        lastUpdated: "2024-01-08",
      },
      {
        id: "4",
        name: "100 Federal Street",
        address: "100 Federal Street",
        imageUrl: "https://images.unsplash.com/photo-1478860409698-8707f313ee8b?q=80&w=2670&auto=format&fit=crop",
        location: "Boston, MA",
        type: "Office",
        floors: 37,
        tenants: 24,
        population: 2400,
        ths: 86,
        status: "Active",
        lastUpdated: "2024-01-05",
      },
      {
        id: "5",
        name: "One Financial Center",
        address: "1 Financial Center",
        imageUrl: "https://images.unsplash.com/photo-1554435493-93422e8220c8?q=80&w=2636&auto=format&fit=crop",
        location: "Boston, MA",
        type: "Office",
        floors: 46,
        tenants: 32,
        population: 3200,
        ths: 88,
        status: "Active",
        lastUpdated: "2024-01-03",
      },
      {
        id: "6",
        name: "125 High Street",
        address: "125 High Street",
        imageUrl: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=2674&auto=format&fit=crop",
        location: "Boston, MA",
        type: "Office",
        floors: 31,
        tenants: 22,
        population: 2200,
        ths: 82,
        status: "Active",
        lastUpdated: "2024-01-02",
      },
      {
        id: "7",
        name: "One Beacon Street",
        address: "1 Beacon Street",
        imageUrl: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?q=80&w=2670&auto=format&fit=crop",
        location: "Boston, MA",
        type: "Office",
        floors: 33,
        tenants: 26,
        population: 2600,
        ths: 79,
        status: "Active",
        lastUpdated: "2023-12-28",
      },
      {
        id: "8",
        name: "100 Summer Street",
        address: "100 Summer Street",
        imageUrl: "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2667&auto=format&fit=crop",
        location: "Boston, MA",
        type: "Office",
        floors: 32,
        tenants: 20,
        population: 2000,
        ths: 84,
        status: "Active",
        lastUpdated: "2023-12-20",
      },
      {
        id: "9",
        name: "Exchange Place",
        address: "53 State Street",
        imageUrl: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80&w=2574&auto=format&fit=crop",
        location: "Boston, MA",
        type: "Office",
        floors: 40,
        tenants: 30,
        population: 3000,
        ths: 87,
        status: "Active",
        lastUpdated: "2023-12-15",
      },
      {
        id: "10",
        name: "State Street Financial Center",
        address: "1 Lincoln Street",
        imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2644&auto=format&fit=crop",
        location: "Boston, MA",
        type: "Office",
        floors: 34,
        tenants: 18,
        population: 1800,
        ths: 85,
        status: "Active",
        lastUpdated: "2023-12-10",
      },
      // Seattle Class A Buildings
      {
        id: "11",
        name: "Columbia Center",
        address: "701 Fifth Avenue",
        imageUrl: "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?q=80&w=2626&auto=format&fit=crop",
        location: "Seattle, WA",
        type: "Office",
        floors: 76,
        tenants: 52,
        population: 5200,
        ths: 92,
        status: "Active",
        lastUpdated: "2024-01-14",
      },
      {
        id: "12",
        name: "1201 Third Avenue",
        address: "1201 Third Avenue",
        imageUrl: "https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=2670&auto=format&fit=crop",
        location: "Seattle, WA",
        type: "Office",
        floors: 55,
        tenants: 40,
        population: 4000,
        ths: 90,
        status: "Active",
        lastUpdated: "2024-01-12",
      },
      {
        id: "13",
        name: "Rainier Square Tower",
        address: "1301 Fifth Avenue",
        imageUrl: "https://images.unsplash.com/photo-1605637636266-bd7a392f94df?q=80&w=2574&auto=format&fit=crop",
        location: "Seattle, WA",
        type: "Office",
        floors: 58,
        tenants: 35,
        population: 3500,
        ths: 95,
        status: "Active",
        lastUpdated: "2024-01-11",
      },
      {
        id: "14",
        name: "Two Union Square",
        address: "601 Union Street",
        imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2670&auto=format&fit=crop",
        location: "Seattle, WA",
        type: "Office",
        floors: 56,
        tenants: 38,
        population: 3800,
        ths: 88,
        status: "Active",
        lastUpdated: "2024-01-09",
      },
      {
        id: "15",
        name: "Seattle Municipal Tower",
        address: "700 Fifth Avenue",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671&auto=format&fit=crop",
        location: "Seattle, WA",
        type: "Office",
        floors: 62,
        tenants: 28,
        population: 2800,
        ths: 78,
        status: "Active",
        lastUpdated: "2024-01-07",
      },
      {
        id: "16",
        name: "Madison Centre",
        address: "505 Madison Street",
        imageUrl: "https://images.unsplash.com/photo-1577017040065-650ee4d43339?q=80&w=2670&auto=format&fit=crop",
        location: "Seattle, WA",
        type: "Office",
        floors: 37,
        tenants: 24,
        population: 2400,
        ths: 93,
        status: "Active",
        lastUpdated: "2024-01-06",
      },
      {
        id: "17",
        name: "Russell Investments Center",
        address: "1301 Second Avenue",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop",
        location: "Seattle, WA",
        type: "Office",
        floors: 42,
        tenants: 30,
        population: 3000,
        ths: 86,
        status: "Active",
        lastUpdated: "2024-01-04",
      },
      {
        id: "18",
        name: "Wells Fargo Center",
        address: "999 Third Avenue",
        imageUrl: "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2574&auto=format&fit=crop",
        location: "Seattle, WA",
        type: "Office",
        floors: 47,
        tenants: 32,
        population: 3200,
        ths: 81,
        status: "Active",
        lastUpdated: "2024-01-01",
      },
      {
        id: "19",
        name: "US Bank Centre",
        address: "1420 Fifth Avenue",
        imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
        location: "Seattle, WA",
        type: "Office",
        floors: 44,
        tenants: 26,
        population: 2600,
        ths: 84,
        status: "Active",
        lastUpdated: "2023-12-29",
      },
      {
        id: "20",
        name: "Safeco Plaza",
        address: "1001 Fourth Avenue",
        imageUrl: "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?q=80&w=2670&auto=format&fit=crop",
        location: "Seattle, WA",
        type: "Office",
        floors: 50,
        tenants: 34,
        population: 3400,
        ths: 82,
        status: "Active",
        lastUpdated: "2023-12-25",
      },
      // San Francisco Class A Buildings
      {
        id: "21",
        name: "Salesforce Tower",
        address: "415 Mission Street",
        imageUrl: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?q=80&w=2574&auto=format&fit=crop",
        location: "San Francisco, CA",
        type: "Office",
        floors: 61,
        tenants: 48,
        population: 4800,
        ths: 96,
        status: "Active",
        lastUpdated: "2024-01-15",
      },
      {
        id: "22",
        name: "555 California Street",
        address: "555 California Street",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
        location: "San Francisco, CA",
        type: "Office",
        floors: 52,
        tenants: 42,
        population: 4200,
        ths: 91,
        status: "Active",
        lastUpdated: "2024-01-13",
      },
      {
        id: "23",
        name: "Transamerica Pyramid",
        address: "600 Montgomery Street",
        imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2589&auto=format&fit=crop",
        location: "San Francisco, CA",
        type: "Office",
        floors: 48,
        tenants: 36,
        population: 3600,
        ths: 89,
        status: "Active",
        lastUpdated: "2024-01-11",
      },
      {
        id: "24",
        name: "181 Fremont",
        address: "181 Fremont Street",
        imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2670&auto=format&fit=crop",
        location: "San Francisco, CA",
        type: "Office",
        floors: 54,
        tenants: 28,
        population: 2800,
        ths: 94,
        status: "Active",
        lastUpdated: "2024-01-10",
      },
      {
        id: "25",
        name: "One Front Street",
        address: "1 Front Street",
        imageUrl: "https://images.unsplash.com/photo-1496950866446-3253e1470e8e?q=80&w=2670&auto=format&fit=crop",
        location: "San Francisco, CA",
        type: "Office",
        floors: 38,
        tenants: 30,
        population: 3000,
        ths: 87,
        status: "Active",
        lastUpdated: "2024-01-08",
      },
      {
        id: "26",
        name: "345 California Center",
        address: "345 California Street",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
        location: "San Francisco, CA",
        type: "Office",
        floors: 48,
        tenants: 34,
        population: 3400,
        ths: 85,
        status: "Active",
        lastUpdated: "2024-01-06",
      },
      {
        id: "27",
        name: "One California",
        address: "1 California Street",
        imageUrl: "https://images.unsplash.com/photo-1554435493-93422e8220c8?q=80&w=2636&auto=format&fit=crop",
        location: "San Francisco, CA",
        type: "Office",
        floors: 32,
        tenants: 22,
        population: 2200,
        ths: 83,
        status: "Active",
        lastUpdated: "2024-01-04",
      },
      {
        id: "28",
        name: "101 California Street",
        address: "101 California Street",
        imageUrl: "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=2670&auto=format&fit=crop",
        location: "San Francisco, CA",
        type: "Office",
        floors: 48,
        tenants: 38,
        population: 3800,
        ths: 88,
        status: "Active",
        lastUpdated: "2024-01-02",
      },
      {
        id: "29",
        name: "50 Fremont Center",
        address: "50 Fremont Street",
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
        location: "San Francisco, CA",
        type: "Office",
        floors: 43,
        tenants: 28,
        population: 2800,
        ths: 86,
        status: "Active",
        lastUpdated: "2023-12-30",
      },
      {
        id: "30",
        name: "One Market Plaza",
        address: "1 Market Street",
        imageUrl: "https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?q=80&w=2532&auto=format&fit=crop",
        location: "San Francisco, CA",
        type: "Office",
        floors: 43,
        tenants: 32,
        population: 3200,
        ths: 84,
        status: "Active",
        lastUpdated: "2023-12-28",
      },
    ],
    mapLocation: {
      city: "Oakbrook Terrace",
      state: "IL",
      address: "1 Tower Ln, Oakbrook Terrace, IL 60181",
      coordinates: {
        lat: 41.8486,
        lng: -87.9828,
      },
    },
  },
}

export const getDemoConfig = (demo: DemoType): DemoConfig => {
  return demoConfigs[demo]
}

