"use client"

import { cn } from "@/lib/utils";
import { RiArrowLeftSLine, RiArrowRightSLine, RiCalendarEventLine, RiDoorOpenLine, RiFilterLine, RiInformationLine, RiMapPinLine, RiSearchLine, RiShoppingBag3Line, RiUserAddLine, RiUserLine } from "@remixicon/react";
import { AreaChart, Badge, Button, Card, DonutChart, Grid, Icon, Select, SelectItem, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, TextInput, Title } from "@tremor/react";
import Image from "next/image";
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

export default function MyHqO() {
  const [selectedTenant, setSelectedTenant] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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

      <Grid numItemsMd={2} numItemsLg={2} className="gap-6">
        {/* Users Overview Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <RiUserLine className="size-5 text-gray-500" />
              <h2 className="text-lg font-medium">Users</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-3xl font-semibold">{userMetrics.total}</p>
              <p className="text-sm text-gray-500">Total users</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-semibold">{userMetrics.lastThirtyDays}</p>
              <p className="text-sm text-gray-500">In last 30 days</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-semibold text-green-600">{userMetrics.active}</p>
              <p className="text-sm text-gray-500">Active</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-semibold text-amber-600">{userMetrics.pending}</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
          </div>
        </Card>

        {/* 30-day Communication Performance Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">30-day communication performance</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-3xl font-semibold">{communicationMetrics.totalSent}</p>
              <p className="text-sm text-gray-500">Total sent</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-semibold">{communicationMetrics.openRate}%</p>
              <p className="text-sm text-gray-500">Open rate</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  +{communicationMetrics.openChange}%
                </Badge>
              </div>
              <p className="text-sm text-gray-500">Opens</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-semibold">{communicationMetrics.emailCTR}%</p>
              <p className="text-sm text-gray-500">Email CTR</p>
            </div>
          </div>
        </Card>
      </Grid>

      <Grid numItemsMd={2} numItemsLg={2} className="gap-6">
        {/* Today's Traffic Report Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Today's traffic report</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-3xl font-semibold">{trafficMetrics.totalBadgeIns}</p>
              <p className="text-sm text-gray-500">Total badge-ins</p>
            </div>
            <div className="h-40">
              <AreaChart
                data={trafficMetrics.hourlyData}
                index="hour"
                categories={["count"]}
                colors={["#3B82F6"]}
                showLegend={false}
                showGridLines={false}
                showAnimation={true}
                valueFormatter={(value) => `${value}`}
                className="h-full"
              />
            </div>
          </div>
        </Card>

        {/* Today's Summary Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Today's summary</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-3xl font-semibold">{summaryMetrics.totalVisits}</p>
                <p className="text-sm text-gray-500">Total visits</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-semibold text-purple-600">{summaryMetrics.expected}</p>
                <p className="text-sm text-gray-500">Expected</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-semibold text-green-600">{summaryMetrics.checkedIn}</p>
                <p className="text-sm text-gray-500">Checked-in</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-semibold text-red-600">{summaryMetrics.checkedOut}</p>
                <p className="text-sm text-gray-500">Checked-out</p>
              </div>
            </div>
            <div className="pt-2">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                +11% higher activity than previous Mondays
              </Badge>
            </div>
          </div>
        </Card>
      </Grid>

      {/* Area Charts Section */}
      <section>
        <Grid numItemsMd={1} numItemsLg={2} className="gap-6">
          {/* Area Chart 1 */}
          <Card>
            <Title className="text-text-primary mb-2">Tenant Engagement</Title>
            <Text className="text-text-secondary mb-4">Monthly trends over time</Text>
            <AreaChart
              className="h-72"
              data={performanceData}
              index="date"
              categories={["Tenant Satisfaction", "Tenant Engagement"]}
              colors={["#2563EB", "#8B5CF6"]}
              valueFormatter={(value) => `${value}%`}
              showLegend={true}
              showGridLines={false}
              showAnimation={true}
            />
          </Card>

          {/* Area Chart 2 */}
          <Card>
            <Title className="text-text-primary mb-2">Platform Usage</Title>
            <Text className="text-text-secondary mb-4">Distribution by channel</Text>
            <AreaChart
              className="h-72"
              data={usageData}
              index="date"
              categories={["Mobile App", "Web Portal", "Kiosk"]}
              colors={["#2563EB", "#8B5CF6", "#06B6D4"]}
              valueFormatter={(value) => `${value}%`}
              showLegend={true}
              showGridLines={false}
              showAnimation={true}
            />
          </Card>
        </Grid>
      </section>

      {/* Performance Insights Section */}
      <section>
        <Card>
          <Title className="text-text-primary mb-4">Performance Insights</Title>
          <TabGroup>
            <TabList>
              <Tab>Tenant Satisfaction</Tab>
              <Tab>Platform Usage</Tab>
              <Tab>Feature Breakdown</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AreaChart
                  className="mt-4 h-72"
                  data={performanceData}
                  index="date"
                  categories={["Tenant Satisfaction", "Tenant Engagement"]}
                  colors={["#2563EB", "#8B5CF6"]}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={true}
                  showGridLines={false}
                  showAnimation={true}
                />
              </TabPanel>
              <TabPanel>
                <AreaChart
                  className="mt-4 h-72"
                  data={usageData}
                  index="date"
                  categories={["Mobile App", "Web Portal", "Kiosk"]}
                  colors={["#2563EB", "#8B5CF6", "#06B6D4"]}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={true}
                  showGridLines={false}
                  showAnimation={true}
                />
              </TabPanel>
              <TabPanel>
                <Grid numItemsMd={2} className="gap-6 mt-4">
                  <Card>
                    <Title className="text-text-primary">Feature Usage</Title>
                    <DonutChart
                      className="mt-4 h-60"
                      data={featureUsageData}
                      category="value"
                      index="name"
                      colors={["#2563EB", "#8B5CF6", "#06B6D4", "#7C3AED", "#64748B"]}
                      valueFormatter={(value) => `${value}%`}
                      showLabel={true}
                      showAnimation={true}
                    />
                  </Card>
                  <Card>
                    <Title className="text-text-primary">Tenant Breakdown</Title>
                    <DonutChart
                      className="mt-4 h-60"
                      data={tenantBreakdownData}
                      category="value"
                      index="name"
                      colors={["#2563EB", "#F59E0B", "#64748B"]}
                      valueFormatter={(value) => `${value}%`}
                      showLabel={true}
                      showAnimation={true}
                    />
                  </Card>
                </Grid>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>
      </section>

      {/* Recent Activity Section */}
      <section>
        <Grid numItemsMd={1} numItemsLg={2} className="gap-6">
          {/* Activity Stream - Left Column */}
          <Card>
            <Title className="text-text-primary mb-4">Tenant Activity Stream</Title>

            {/* Filters and Search */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="w-full sm:w-64">
                <Select
                  value={selectedTenant}
                  onValueChange={setSelectedTenant}
                  icon={RiFilterLine}
                  placeholder="Filter by tenant"
                >
                  {tenants.map((tenant) => (
                    <SelectItem key={tenant.value} value={tenant.value}>
                      {tenant.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="w-full sm:w-72">
                <TextInput
                  icon={RiSearchLine}
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Activity Stream */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {filteredActivities.length === 0 ? (
                <div className="py-12 text-center">
                  <Text className="text-text-secondary">No activities found matching your criteria.</Text>
                </div>
              ) : (
                filteredActivities.map((activity) => {
                  const ActivityIcon = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex gap-4 p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                      {/* User Avatar with Activity Icon - Redesigned */}
                      <div className="flex-shrink-0">
                        <div className="relative flex items-center justify-center">
                          {/* Activity type indicator ring */}
                          <div className={cn(
                            "absolute inset-0 rounded-full border-2",
                            activity.type === "Event" ? "border-blue-400 dark:border-blue-500" :
                              activity.type === "Booking" ? "border-green-400 dark:border-green-500" :
                                activity.type === "Marketplace" ? "border-amber-400 dark:border-amber-500" :
                                  activity.type === "Access" ? "border-violet-400 dark:border-violet-500" :
                                    "border-rose-400 dark:border-rose-500"
                          )}></div>

                          {/* User avatar */}
                          <Image
                            src={activity.user.avatar}
                            alt={activity.user.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-900 z-10"
                          />

                          {/* Activity icon badge */}
                          <div className={cn(
                            "absolute -top-1 -right-1 rounded-full p-1.5 shadow-md z-20",
                            activity.type === "Event" ? "bg-blue-500 text-white" :
                              activity.type === "Booking" ? "bg-green-500 text-white" :
                                activity.type === "Marketplace" ? "bg-amber-500 text-white" :
                                  activity.type === "Access" ? "bg-violet-500 text-white" :
                                    "bg-rose-500 text-white"
                          )}>
                            <Icon
                              icon={ActivityIcon}
                              size="xs"
                              className="text-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Activity Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <p className="font-medium text-text-primary truncate">
                              {activity.user.name}
                              <span className="font-normal text-text-secondary"> · {activity.tenant}</span>
                            </p>
                            <p className="text-sm text-text-secondary">{activity.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge color={
                              activity.status === "Active" || activity.status === "Approved" ? "green" :
                                activity.status === "Completed" || activity.status === "Delivered" ? "blue" :
                                  activity.status === "Scheduled" ? "amber" : "gray"
                            }>
                              {activity.status}
                            </Badge>
                            <Text className="text-xs text-text-secondary whitespace-nowrap">{activity.date}</Text>
                          </div>
                        </div>

                        {/* Activity Details - Simplified badges */}
                        <div className="mt-2">
                          <Text className="text-sm text-text-primary font-medium">
                            {activity.title}
                            {activity.registrations && (
                              <span className="ml-2 text-blue-500 font-normal">
                                {activity.registrations}/{activity.capacity} registered
                              </span>
                            )}
                            {activity.orders && (
                              <span className="ml-2 text-amber-500 font-normal">
                                {activity.orders} orders
                              </span>
                            )}
                          </Text>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Load More Button */}
            {filteredActivities.length > 0 && (
              <div className="mt-6 text-center">
                <Button variant="light" className="text-text-primary">
                  Load more activities
                </Button>
              </div>
            )}
          </Card>

          {/* Day View Calendar - Right Column */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <Title className="text-text-primary">Today's Schedule</Title>
              <div className="flex items-center gap-2">
                <Button variant="light" size="xs" icon={RiArrowLeftSLine} />
                <Text className="text-text-primary font-medium">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
                <Button variant="light" size="xs" icon={RiArrowRightSLine} />
              </div>
            </div>

            {/* Time slots */}
            <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1">
              {Array.from({ length: 12 }).map((_, index) => {
                const hour = index + 8; // Start from 8 AM
                const isPast = new Date().getHours() > hour;
                const isCurrent = new Date().getHours() === hour;
                const hasEvent = [9, 11, 14, 16].includes(hour);

                return (
                  <div key={hour} className={cn(
                    "flex gap-3 py-3 border-l-2 pl-3 pr-2 rounded-r-md transition-colors",
                    isPast ? "border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600" :
                      isCurrent ? "border-primary bg-primary/5 dark:bg-primary/10" :
                        "border-gray-300 dark:border-gray-700"
                  )}>
                    {/* Time */}
                    <div className="w-16 flex-shrink-0">
                      <Text className={cn(
                        "font-medium",
                        isPast ? "text-gray-400 dark:text-gray-600" :
                          isCurrent ? "text-primary dark:text-primary-400" :
                            "text-gray-700 dark:text-gray-300"
                      )}>
                        {hour > 12 ? `${hour - 12}:00 PM` : hour === 12 ? `12:00 PM` : `${hour}:00 AM`}
                      </Text>
                    </div>

                    {/* Event */}
                    {hasEvent && (
                      <div className={cn(
                        "flex-1 rounded-md p-2 border",
                        hour === 9 ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800" :
                          hour === 11 ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" :
                            hour === 14 ? "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800" :
                              "bg-violet-50 border-violet-200 dark:bg-violet-900/20 dark:border-violet-800"
                      )}>
                        <div className="flex justify-between items-start">
                          <div>
                            <Text className={cn(
                              "font-medium",
                              hour === 9 ? "text-blue-700 dark:text-blue-400" :
                                hour === 11 ? "text-green-700 dark:text-green-400" :
                                  hour === 14 ? "text-amber-700 dark:text-amber-400" :
                                    "text-violet-700 dark:text-violet-400"
                            )}>
                              {hour === 9 ? "Team Standup" :
                                hour === 11 ? "Client Meeting" :
                                  hour === 14 ? "Wellness Workshop" :
                                    "Product Demo"}
                            </Text>
                            <Text className="text-xs text-gray-600 dark:text-gray-400">
                              {hour === 9 ? "Conference Room B • 30 min" :
                                hour === 11 ? "Zoom Call • 1 hour" :
                                  hour === 14 ? "Yoga Studio • 45 min" :
                                    "Main Auditorium • 1 hour"}
                            </Text>
                          </div>
                          <div className="flex -space-x-2">
                            <Image
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              alt="Attendee"
                              width={24}
                              height={24}
                              className="w-6 h-6 rounded-full border border-white dark:border-gray-900"
                            />
                            <Image
                              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              alt="Attendee"
                              width={24}
                              height={24}
                              className="w-6 h-6 rounded-full border border-white dark:border-gray-900"
                            />
                            {hour !== 9 && (
                              <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300 border border-white dark:border-gray-900">
                                +{hour === 11 ? 3 : hour === 14 ? 8 : 5}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="light" className="text-text-primary">
                <RiCalendarEventLine className="size-4 mr-1" />
                Add event
              </Button>
              <Button variant="light" className="text-text-primary">
                View full calendar
              </Button>
            </div>
          </Card>
        </Grid>
      </section>
    </div>
  )
}

{/* Add extra spacing at the bottom of the page */ }
<div className="h-24"></div>
