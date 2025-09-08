"use client"

import { RiArrowRightLine, RiBuilding4Line, RiCalendarEventLine, RiDoorOpenLine, RiFilterLine, RiInformationLine, RiMegaphoneLine, RiShoppingBag3Line } from "@remixicon/react";
import { Badge, Button, Card, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import Image from "next/image";
import Link from "next/link";


export default function MyHqO() {

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
                  src="/tenant-logos/acme.png"
                  alt="Acme Corporation"
                  width={48}
                  height={48}
                  className="rounded object-contain"
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
                Acme Corporation has signed a lease for 5,000 sqft on the 15th Floor. Move-in date is scheduled for April 15, 2024.
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
