"use client"

import { Card } from "@/components/Card";
import { getDemoConfig } from "@/config/demos";
import { useDemo } from "@/contexts/DemoContext";
import { cn } from "@/lib/utils";
import { RiCalendarEventLine, RiDoorOpenLine, RiFilterLine, RiInformationLine, RiMegaphoneLine, RiShoppingBag3Line } from "@remixicon/react";
import { Badge, Button, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { Briefcase, ChevronDown, LayoutGrid, Megaphone, Settings2, TrendingUp } from "lucide-react";
import { useState } from "react";

type ViewType = "experience" | "leasing" | "operations" | "executive";

const views: { id: ViewType; label: string; icon: React.ElementType }[] = [
  { id: "experience", label: "Experience", icon: Megaphone },
  { id: "leasing", label: "Leasing", icon: Briefcase },
  { id: "operations", label: "Operations", icon: Settings2 },
  { id: "executive", label: "Executive", icon: TrendingUp },
];

export default function MyHqO() {
  const { demo } = useDemo();
  const demoConfig = getDemoConfig(demo);
  const { homepage } = demoConfig;
  const [activeView, setActiveView] = useState<ViewType>("experience");

  return (
    <div className="space-y-6">
      {/* Header with Welcome and Views */}
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
          {homepage.welcomeMessage}, {homepage.userName}
        </h1>

        {/* Views Selector - Linear Style */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {views.map((view) => {
            const Icon = view.icon;
            const isActive = activeView === view.id;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                  isActive
                    ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                )}
              >
                <Icon className="size-4" />
                <span>{view.label}</span>
              </button>
            );
          })}
        </div>
      </div>



      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-medium text-gray-900 dark:text-gray-50">Users</h2>
              <RiInformationLine className="size-4 text-gray-400" />
            </div>
            <Button variant="light" size="xs" className="text-primary hover:text-primary/90">
              View
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50">44,116</p>
              <p className="text-sm text-gray-500">Total users</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-primary">982</p>
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
            <Button variant="light" size="xs" className="text-primary hover:text-primary/90">
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
              <p className="text-2xl font-semibold text-primary">3%</p>
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
            <Button variant="light" size="xs" className="text-primary hover:text-primary/90">
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
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
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
            <Button variant="light" size="xs" className="text-primary hover:text-primary/90">
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
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
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
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
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
            <Button variant="light" size="xs" className="text-primary hover:text-primary/90">
              View all
            </Button>
          </div>

          <div className="space-y-4">
            {homepage.content.events && homepage.content.events.length > 0 ? (
              homepage.content.events.map((event, index) => {
                const [month, day] = event.date.split(" ");
                return (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col items-center">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{month}</div>
                      <div className="text-xl font-semibold text-gray-900 dark:text-gray-50">{day}</div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900 dark:text-gray-50">{event.title}</h3>
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                          {event.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{event.time}</p>
                      {event.registered !== undefined && (
                        <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                          <span className="font-medium">{event.registered} registered</span>
                          {event.capacity && <span>{event.capacity}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
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
            )}

          </div>
        </Card>

        {/* Outreach Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-medium text-gray-900 dark:text-gray-50">Outreach</h2>
            <Button variant="light" size="xs" className="text-primary hover:text-primary/90">
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
                  {homepage.content.communications && homepage.content.communications.length > 0 ? (
                    homepage.content.communications.map((comm, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                        <div className="size-8 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <RiInformationLine className="size-4 text-primary dark:text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900 dark:text-gray-50">
                              {comm.title}
                            </h4>
                            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                              {comm.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <span>Scheduled for {comm.scheduledDate}, {comm.scheduledTime}</span>
                            <span>•</span>
                            <span>{comm.channels.join(", ")}</span>
                            <span className="flex items-center gap-1 ml-2">
                              <RiCalendarEventLine className="size-3" />
                              {comm.daysUntil} {comm.daysUntil === 1 ? "day" : "days"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
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
                  )}

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
                {homepage.content.discover && homepage.content.discover.items && homepage.content.discover.items.length > 0 ? (
                  <div className="space-y-4">
                    {homepage.content.discover.items.map((item, index) => (
                      <div key={index} className="p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                        <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="size-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <RiShoppingBag3Line className="size-4 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      {homepage.content.discover?.description || "Trending content will appear here"}
                    </p>
                    <Button variant="light" className="text-gray-600 hover:text-gray-900">
                      View content
                    </Button>
                  </div>
                )}
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>
      </div>

    </div>
  )
}
