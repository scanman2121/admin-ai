"use client"

import { useDemo } from "@/contexts/DemoContext"
import { getDemoConfig } from "@/config/demos"

export function useBuildingsData() {
  const { demo } = useDemo()
  const demoConfig = getDemoConfig(demo)
  return demoConfig.buildings
}

// Export default data for backwards compatibility (generic demo)
export const data = [
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
]; 