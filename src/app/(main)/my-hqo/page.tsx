"use client"

import { cn } from "@/lib/utils";
import { RiArrowLeftSLine, RiArrowRightLine, RiArrowRightSLine, RiBuilding4Line, RiCalendarEventLine, RiDoorOpenLine, RiFilterLine, RiInformationLine, RiMapPinLine, RiMegaphoneLine, RiSearchLine, RiShoppingBag3Line, RiUserAddLine } from "@remixicon/react";
import { AreaChart, Badge, Button, Card, DonutChart, Grid, Icon, Select, SelectItem, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, TextInput, Title } from "@tremor/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Type definitions
export type PeriodValue = "previous-period" | "last-year" | "no-comparison";

// Type definition for KpiEntry
export type KpiEntry = {
  title: string;
  value: number | string;
  target: number;
  percentage: number;
  current: number | string;
  allowed: number | string;
  unit: string;
};

// Type definition for KpiEntryExtended
export type KpiEntryExtended = {
  title: string;
  color: string;
  percentage: number;
  value: number | string;
};

// Type definitions for metrics
type UserMetrics = {
  total: number;
  lastThirtyDays: number;
  active: number;
  pending: number;
};

type CommunicationMetrics = {
  totalSent: number;
  openRate: number;
  openChange: number;
  emailCTR: number;
};

type TrafficMetrics = {
  totalBadgeIns: number;
  hourlyData: { hour: number; count: number }[];
};

type SummaryMetrics = {
  totalVisits: number;
  expected: number;
  checkedIn: number;
  checkedOut: number;
};

// Mock data for charts and metrics
const performanceData = [
  {
    date: "Jan 2025",
    "Tenant Satisfaction": 85,
    "Tenant Engagement": 75,
  },
  {
    date: "Feb 2025",
    "Tenant Satisfaction": 83,
    "Tenant Engagement": 76,
  },
  {
    date: "Mar 2025",
    "Tenant Satisfaction": 86,
    "Tenant Engagement": 78,
  },
  {
    date: "Apr 2025",
    "Tenant Satisfaction": 87,
    "Tenant Engagement": 80,
  },
  {
    date: "May 2025",
    "Tenant Satisfaction": 89,
    "Tenant Engagement": 82,
  },
  {
    date: "Jun 2025",
    "Tenant Satisfaction": 90,
    "Tenant Engagement": 85,
  },
  {
    date: "Jul 2025",
    "Tenant Satisfaction": 91,
    "Tenant Engagement": 87,
  },
  {
    date: "Aug 2025",
    "Tenant Satisfaction": 92,
    "Tenant Engagement": 88,
  },
  {
    date: "Sep 2025",
    "Tenant Satisfaction": 93,
    "Tenant Engagement": 89,
  },
  {
    date: "Oct 2025",
    "Tenant Satisfaction": 94,
    "Tenant Engagement": 90,
  },
  {
    date: "Nov 2025",
    "Tenant Satisfaction": 95,
    "Tenant Engagement": 91,
  },
  {
    date: "Dec 2025",
    "Tenant Satisfaction": 96,
    "Tenant Engagement": 92,
  },
]

const usageData = [
  {
    date: "Jan 2025",
    "Mobile App": 65,
    "Web Portal": 40,
    "Kiosk": 20,
  },
  {
    date: "Feb 2025",
    "Mobile App": 68,
    "Web Portal": 42,
    "Kiosk": 22,
  },
  {
    date: "Mar 2025",
    "Mobile App": 70,
    "Web Portal": 45,
    "Kiosk": 25,
  },
  {
    date: "Apr 2025",
    "Mobile App": 72,
    "Web Portal": 48,
    "Kiosk": 28,
  },
  {
    date: "May 2025",
    "Mobile App": 75,
    "Web Portal": 50,
    "Kiosk": 30,
  },
  {
    date: "Jun 2025",
    "Mobile App": 78,
    "Web Portal": 52,
    "Kiosk": 32,
  },
  {
    date: "Jul 2025",
    "Mobile App": 80,
    "Web Portal": 55,
    "Kiosk": 35,
  },
  {
    date: "Aug 2025",
    "Mobile App": 82,
    "Web Portal": 58,
    "Kiosk": 38,
  },
  {
    date: "Sep 2025",
    "Mobile App": 85,
    "Web Portal": 60,
    "Kiosk": 40,
  },
  {
    date: "Oct 2025",
    "Mobile App": 88,
    "Web Portal": 62,
    "Kiosk": 42,
  },
  {
    date: "Nov 2025",
    "Mobile App": 90,
    "Web Portal": 65,
    "Kiosk": 45,
  },
  {
    date: "Dec 2025",
    "Mobile App": 92,
    "Web Portal": 68,
    "Kiosk": 48,
  },
]

const featureUsageData = [
  { name: "Events", value: 35 },
  { name: "Marketplace", value: 25 },
  { name: "Bookings", value: 20 },
  { name: "Access", value: 15 },
  { name: "Other", value: 5 },
]

const tenantBreakdownData = [
  { name: "Active", value: 85 },
  { name: "Inactive", value: 10 },
  { name: "Pending", value: 5 },
]

// Enhanced recentActivityData with tenant information and avatars
const recentActivityData = [
  {
    id: 1,
    type: "Event",
    title: "Wellness Wednesday",
    date: "Today, 2:30 PM",
    status: "Active",
    registrations: 45,
    capacity: 50,
    tenant: "Acme Inc",
    user: {
      name: "Lucy Mitchell",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    description: "Registered for the weekly wellness session"
  },
  {
    id: 2,
    type: "Booking",
    title: "Conference Room A",
    date: "Today, 10:00 AM",
    status: "Completed",
    bookedBy: "John Smith",
    tenant: "Global Tech",
    user: {
      name: "John Smith",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    description: "Booked a meeting room for team standup"
  },
  {
    id: 3,
    type: "Marketplace",
    title: "Lunch Special Order",
    date: "Yesterday",
    status: "Delivered",
    orders: 12,
    tenant: "Innovate Solutions",
    user: {
      name: "Emily Bernacle",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    description: "Placed a group order for the design team lunch"
  },
  {
    id: 4,
    type: "Access",
    title: "After-hours Access",
    date: "Yesterday",
    status: "Approved",
    requestedBy: "Sarah Johnson",
    tenant: "Tech Innovators",
    user: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    description: "Requested weekend access to the office"
  },
  {
    id: 5,
    type: "Visitor",
    title: "Client Meeting",
    date: "Jun 15, 2025",
    status: "Scheduled",
    tenant: "Acme Inc",
    user: {
      name: "Thomas Palstein",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    description: "Invited 3 external visitors for a product demo"
  },
];

// List of tenants for the filter
const tenants = [
  { value: "all", label: "All Tenants" },
  { value: "Acme Inc", label: "Acme Inc" },
  { value: "Global Tech", label: "Global Tech" },
  { value: "Innovate Solutions", label: "Innovate Solutions" },
  { value: "Tech Innovators", label: "Tech Innovators" },
];

// Mock data
const userMetrics: UserMetrics = {
  total: 42,
  lastThirtyDays: 18,
  active: 36,
  pending: 6,
};

const communicationMetrics: CommunicationMetrics = {
  totalSent: 4,
  openRate: 86,
  openChange: 8,
  emailCTR: 42,
};

const trafficMetrics: TrafficMetrics = {
  totalBadgeIns: 3692,
  hourlyData: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    count: Math.floor(Math.random() * 300),
  })),
};

const summaryMetrics: SummaryMetrics = {
  totalVisits: 201,
  expected: 102,
  checkedIn: 87,
  checkedOut: 12,
};

// Mock data for new tenant
const newTenant = {
  name: "Acme Corporation",
  industry: "Technology",
  space: "5,000 sqft",
  floor: "15th Floor",
  moveInDate: "April 15, 2024",
  logo: "/tenant-logos/acme.png"
};

// Mock data for upcoming tours
const upcomingTours = [
  {
    id: "1",
    companyName: "TechStart Inc.",
    contactName: "Sarah Chen",
    date: "Today, 2:30 PM",
    space: "15th Floor, North Wing",
    broker: {
      name: "Michael Brown",
      avatar: "/avatars/default-avatar.png"
    },
    status: "Confirmed"
  },
  {
    id: "2",
    companyName: "Quantum Solutions",
    contactName: "James Wilson",
    date: "Tomorrow, 11:00 AM",
    space: "12th Floor, East Wing",
    broker: {
      name: "Lisa Anderson",
      avatar: "/avatars/default-avatar.png"
    },
    status: "Pending Confirmation"
  }
];

export default function MyHqO() {
  const [selectedTenant, setSelectedTenant] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Get initials from company name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Generate a consistent color based on company name
  const getBackgroundColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-orange-500',
      'bg-teal-500',
      'bg-cyan-500'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  // Filter activities based on tenant selection and search query
  const filteredActivities = recentActivityData.filter(activity => {
    const matchesTenant = selectedTenant === "all" || activity.tenant === selectedTenant;
    const matchesSearch = searchQuery === "" ||
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.user.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTenant && matchesSearch;
  });

  // Function to get the appropriate icon for each activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "Event":
        return RiCalendarEventLine;
      case "Booking":
        return RiMapPinLine;
      case "Marketplace":
        return RiShoppingBag3Line;
      case "Access":
        return RiDoorOpenLine;
      case "Visitor":
        return RiUserAddLine;
      default:
        return RiInformationLine;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
        Welcome back, Ellie
      </h1>

      {/* New Tenant Alert Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative shrink-0">
              <div className="size-16 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                <Image
                  src={newTenant.logo}
                  alt={newTenant.name}
                  width={48}
                  height={48}
                  className="rounded object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full flex items-center justify-center ${getBackgroundColor(newTenant.name)} text-white font-medium">${getInitials(newTenant.name)}</div>`;
                    }
                  }}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 size-6 bg-green-500 rounded-full flex items-center justify-center">
                <RiBuilding4Line className="size-3.5 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                  New tenant ready for onboarding
                </h2>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Just signed
                </Badge>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {newTenant.name} has signed a lease for {newTenant.space} on the {newTenant.floor}. Move-in date is scheduled for {newTenant.moveInDate}.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/tenants/onboarding"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              View lease details
            </Link>
            <Link
              href="/tenants/onboarding"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2"
            >
              Start onboarding
              <RiArrowRightLine className="size-4" />
            </Link>
          </div>
        </div>
      </Card>


      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-medium text-gray-900 dark:text-gray-50">Users</h2>
              <RiInformationLine className="size-4 text-gray-400" />
            </div>
            <Button variant="light" size="xs" className="text-blue-600 hover:text-blue-700">
              View
            </Button>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50">44,116</p>
              <p className="text-sm text-gray-500">Total users</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-blue-600">982</p>
              <p className="text-sm text-gray-500">New</p>
              <p className="text-xs text-gray-400">In last 30 days</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-green-600">42,579</p>
              <p className="text-sm text-gray-500">Active</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-orange-600">1,537</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
          </div>
        </Card>

        {/* 30-day Communication Performance Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-medium text-gray-900 dark:text-gray-50">30-day Communication Performance</h2>
              <RiInformationLine className="size-4 text-gray-400" />
            </div>
            <Button variant="light" size="xs" className="text-blue-600 hover:text-blue-700">
              View
            </Button>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50">11</p>
              <p className="text-sm text-gray-500">Total sent</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-purple-600">29%</p>
              <p className="text-sm text-gray-500">Reach rate</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-blue-600">3%</p>
              <p className="text-sm text-gray-500">Open rate</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-green-600">0.0%</p>
              <p className="text-sm text-gray-500">Email CTR</p>
            </div>
          </div>
        </Card>

        {/* Today's Traffic Report Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-medium text-gray-900 dark:text-gray-50">Today's Traffic Report</h2>
              <RiInformationLine className="size-4 text-gray-400" />
            </div>
            <Button variant="light" size="xs" className="text-blue-600 hover:text-blue-700">
              View activity
            </Button>
          </div>
          
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="size-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <RiDoorOpenLine className="size-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
              Unlock smarter building security
            </h3>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">
              Centralize your access control and say goodbye to key chaos
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Get started
            </Button>
          </div>
        </Card>

        {/* Today's Summary Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-medium text-gray-900 dark:text-gray-50">Today's Summary</h2>
              <RiInformationLine className="size-4 text-gray-400" />
            </div>
            <Button variant="light" size="xs" className="text-blue-600 hover:text-blue-700">
              Manage visitors
            </Button>
          </div>

          <TabGroup>
            <TabList className="mb-6">
              <Tab>Visitors</Tab>
              <Tab>Bookings</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className="text-center py-8">
                  <h3 className="text-base font-medium text-gray-900 dark:text-gray-50 mb-2">
                    Your visitor summary is ready for action
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Data will appear here once people start checking in
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Create visit
                  </Button>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="text-center py-8">
                  <h3 className="text-base font-medium text-gray-900 dark:text-gray-50 mb-2">
                    No bookings scheduled for today
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Check back later or create a new booking
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Create booking
                  </Button>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>
      </div>

      {/* Events and Outreach Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-medium text-gray-900 dark:text-gray-50">Events</h2>
            <Button variant="light" size="xs" className="text-blue-600 hover:text-blue-700">
              View all
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
              <div className="flex flex-col items-center">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">JUN</div>
                <div className="text-xl font-semibold text-gray-900 dark:text-gray-50">12</div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-50">Tenant Appreciation Party</h3>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                    Scheduled
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">4–7 PM</p>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                  <span className="font-medium">687 registered</span>
                  <span>Unlimited capacity</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center py-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-center">
                <div className="size-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <RiCalendarEventLine className="size-4 text-gray-400" />
                </div>
                <Button variant="light" className="text-gray-600 hover:text-gray-900">
                  Add event
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Outreach Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-medium text-gray-900 dark:text-gray-50">Outreach</h2>
            <Button variant="light" size="xs" className="text-blue-600 hover:text-blue-700">
              View all
            </Button>
          </div>

          <TabGroup>
            <TabList className="mb-6">
              <Tab>
                <span>Communications</span>
                <Badge className="ml-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">1</Badge>
              </Tab>
              <Tab>
                <span>Surveys</span>
                <Badge className="ml-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">0</Badge>
              </Tab>
              <Tab>
                <span>Trending content</span>
                <Badge className="ml-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">4</Badge>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                    <div className="size-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <RiInformationLine className="size-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-50">
                          Drag Me Downtown ICA San Francisco
                        </h4>
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                          Scheduled
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span>Scheduled for 06/16/2025, 12:00 PM</span>
                        <span>•</span>
                        <span>Push, In app</span>
                        <span className="flex items-center gap-1 ml-2">
                          <RiCalendarEventLine className="size-3" />
                          4 days
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center py-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="text-center">
                      <div className="size-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2">
                        <RiMegaphoneLine className="size-4 text-gray-400" />
                      </div>
                      <Button variant="light" className="text-gray-600 hover:text-gray-900">
                        Add communications
                      </Button>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="text-center py-8">
                  <div className="size-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RiFilterLine className="size-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mb-4">No surveys created yet</p>
                  <Button variant="light" className="text-gray-600 hover:text-gray-900">
                    Create survey
                  </Button>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="text-center py-8">
                  <div className="size-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RiShoppingBag3Line className="size-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Trending content will appear here</p>
                  <Button variant="light" className="text-gray-600 hover:text-gray-900">
                    View content
                  </Button>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>
      </div>

    </div>
  )
}

{/* Add extra spacing at the bottom of the page */ }
<div className="h-24"></div>
