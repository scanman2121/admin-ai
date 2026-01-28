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
    imageUrl: string
    location: string
    type: string
    floors: number
    tenants: number
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
      {
        id: "1",
        name: "125 Highland Ave",
        imageUrl: "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "Boston, MA",
        type: "Office",
        floors: 12,
        tenants: 8,
        status: "Active",
        lastUpdated: "2023-12-15",
      },
      {
        id: "2",
        name: "400 Market Street",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "San Francisco, CA",
        type: "Mixed Use",
        floors: 24,
        tenants: 15,
        status: "Active",
        lastUpdated: "2023-11-20",
      },
      {
        id: "3",
        name: "75 State Street",
        imageUrl: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "New York, NY",
        type: "Retail",
        floors: 3,
        tenants: 5,
        status: "Inactive",
        lastUpdated: "2023-10-05",
      },
      {
        id: "4",
        name: "200 Congress Ave",
        imageUrl: "https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "Austin, TX",
        type: "Office",
        floors: 18,
        tenants: 12,
        status: "Active",
        lastUpdated: "2024-01-10",
      },
      {
        id: "5",
        name: "500 Boylston Street",
        imageUrl: "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "Boston, MA",
        type: "Office",
        floors: 15,
        tenants: 10,
        status: "Active",
        lastUpdated: "2024-02-01",
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

