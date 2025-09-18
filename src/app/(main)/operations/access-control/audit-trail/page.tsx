"use client"

import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { TabNavigation, TabNavigationLink } from "@/components/ui/tab-navigation"
import { centralizedUsers } from "@/data/centralizedUsers"
import { RiSettings3Line } from "@remixicon/react"
import { Clock, Download, Eye, FileText, Settings, Shield, User, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Define tabs for the Access Control Audit Trail page
const tabs = [
  { name: "Overview", href: "/operations/access-control" },
  { name: "Access requests", href: "/operations/access-control/access-requests" },
  { name: "Active access", href: "/operations/access-control/active-access" },
  { name: "Revoked access", href: "/operations/access-control/revoked-access" },
  { name: "Activity", href: "/operations/access-control/activity" },
  { name: "Access groups", href: "/operations/access-control/access-groups" },
  { name: "Audit trail", href: "/operations/access-control/audit-trail" },
]

// Generate realistic audit trail data showing admin actions
const generateAuditTrailData = () => {
  const admins = centralizedUsers.filter(user => user.role === "admin")
  const auditActions = [
    {
      id: "1",
      timestamp: new Date(2025, 8, 18, 14, 30, 0),
      adminUser: admins[0],
      action: "User Access Granted",
      target: "Jennifer Martinez",
      targetType: "User",
      details: "Granted building access for new employee - TechCorp Solutions",
      ipAddress: "192.168.1.45",
      category: "Access Management",
      severity: "Info"
    },
    {
      id: "2", 
      timestamp: new Date(2025, 8, 18, 14, 15, 0),
      adminUser: admins[0],
      action: "Bulk Access Creation",
      target: "5 Users",
      targetType: "Bulk Operation",
      details: "Created access for new employee batch: Kevin Chen, Rachel Thompson, Marcus Rodriguez, Amanda Kim, Brian Wilson",
      ipAddress: "192.168.1.45",
      category: "Bulk Operations",
      severity: "Warning"
    },
    {
      id: "3",
      timestamp: new Date(2025, 8, 18, 13, 45, 0),
      adminUser: admins[1] || admins[0],
      action: "Access Group Modified",
      target: "Finance Team Access",
      targetType: "Access Group",
      details: "Added trading floor access permissions for Global Finance Corp employees",
      ipAddress: "192.168.1.78",
      category: "Group Management",
      severity: "Info"
    },
    {
      id: "4",
      timestamp: new Date(2025, 8, 18, 11, 20, 0),
      adminUser: admins[0],
      action: "Security Settings Updated",
      target: "Multi-Factor Authentication",
      targetType: "Security Policy",
      details: "Enabled mandatory MFA for all contractor access requests",
      ipAddress: "192.168.1.45",
      category: "Security Configuration",
      severity: "High"
    },
    {
      id: "5",
      timestamp: new Date(2025, 8, 18, 10, 30, 0),
      adminUser: admins[1] || admins[0],
      action: "Access Revoked",
      target: "John Smith",
      targetType: "User",
      details: "Revoked access due to employment termination - Former Company Inc",
      ipAddress: "192.168.1.78",
      category: "Access Management",
      severity: "Warning"
    },
    {
      id: "6",
      timestamp: new Date(2025, 8, 18, 9, 15, 0),
      adminUser: admins[0],
      action: "Device Configuration",
      target: "Card Reader - Main Lobby",
      targetType: "Device",
      details: "Updated firmware and security protocols for lobby access point",
      ipAddress: "192.168.1.45",
      category: "Device Management",
      severity: "Info"
    },
    {
      id: "7",
      timestamp: new Date(2025, 8, 17, 16, 45, 0),
      adminUser: admins[0],
      action: "Audit Report Generated",
      target: "Monthly Access Report",
      targetType: "Report",
      details: "Generated comprehensive access control audit report for September 2025",
      ipAddress: "192.168.1.45",
      category: "Reporting",
      severity: "Info"
    },
    {
      id: "8",
      timestamp: new Date(2025, 8, 17, 15, 30, 0),
      adminUser: admins[1] || admins[0],
      action: "Emergency Access Override",
      target: "Dr. Emma Davis",
      targetType: "User",
      details: "Granted temporary emergency access to medical facility during after-hours emergency",
      ipAddress: "192.168.1.78",
      category: "Emergency Response",
      severity: "High"
    },
    {
      id: "9",
      timestamp: new Date(2025, 8, 17, 14, 20, 0),
      adminUser: admins[0],
      action: "Access Permissions Review",
      target: "HealthTech Innovations",
      targetType: "Company",
      details: "Completed quarterly access permissions review for all HealthTech employees",
      ipAddress: "192.168.1.45",
      category: "Compliance",
      severity: "Info"
    },
    {
      id: "10",
      timestamp: new Date(2025, 8, 17, 11, 10, 0),
      adminUser: admins[0],
      action: "Card Art Updated",
      target: "Employee Badge Template",
      targetType: "Template",
      details: "Updated employee badge design template with new company branding",
      ipAddress: "192.168.1.45",
      category: "Template Management", 
      severity: "Info"
    }
  ]

  return auditActions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

const auditTrailData = generateAuditTrailData()

// Define columns for the audit trail table
const auditTrailColumns = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }: { row: any }) => {
      const timestamp = row.getValue("timestamp") as Date
      return (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-50">
              {timestamp.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {timestamp.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "adminUser",
    header: "Admin User",
    cell: ({ row }: { row: any }) => {
      const adminUser = row.getValue("adminUser") as any
      return (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-50">
              {adminUser.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {adminUser.email}
            </div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }: { row: any }) => {
      const action = row.getValue("action") as string
      const category = row.original.category as string
      const severity = row.original.severity as string
      
      const getCategoryIcon = (category: string) => {
        switch (category) {
          case "Access Management":
            return <Shield className="h-4 w-4" />
          case "Bulk Operations":
            return <Users className="h-4 w-4" />
          case "Security Configuration":
          case "Emergency Response":
            return <Shield className="h-4 w-4" />
          case "Group Management":
            return <Users className="h-4 w-4" />
          case "Device Management":
            return <Settings className="h-4 w-4" />
          case "Reporting":
          case "Compliance":
            return <FileText className="h-4 w-4" />
          default:
            return <Eye className="h-4 w-4" />
        }
      }

      const getSeverityVariant = (severity: string) => {
        switch (severity) {
          case "High":
            return "error"
          case "Warning": 
            return "warning"
          case "Info":
          default:
            return "neutral"
        }
      }

      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {getCategoryIcon(category)}
            <span className="font-medium text-gray-900 dark:text-gray-50">
              {action}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getSeverityVariant(severity)} className="text-xs">
              {severity}
            </Badge>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {category}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "target",
    header: "Target",
    cell: ({ row }: { row: any }) => {
      const target = row.getValue("target") as string
      const targetType = row.original.targetType as string
      const details = row.original.details as string
      
      return (
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-50">
            {target}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {targetType}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 max-w-md">
            {details}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "ipAddress",
    header: "IP Address",
    cell: ({ row }: { row: any }) => {
      const ipAddress = row.getValue("ipAddress") as string
      return (
        <div className="text-sm font-mono text-gray-600 dark:text-gray-300">
          {ipAddress}
        </div>
      )
    },
  },
]

export default function AccessControlAuditTrail() {
  const pathname = usePathname()
  const [data] = useState(auditTrailData)

  // Calculate access requests count for the badge
  const accessRequestsCount = centralizedUsers.filter(user => 
    user.acsStatus === "pending" || user.acsStatus === "suspended" || user.acsStatus === "inactive"
  ).length

  const handleExportAuditTrail = () => {
    // In a real app, this would generate and download an audit report
    console.log('Exporting audit trail data:', data)
    
    // Create CSV content
    const headers = ['Timestamp', 'Admin User', 'Action', 'Target', 'Category', 'Severity', 'IP Address', 'Details']
    const csvContent = [
      headers.join(','),
      ...data.map(item => [
        item.timestamp.toISOString(),
        `"${item.adminUser.name}"`,
        `"${item.action}"`,
        `"${item.target}"`,
        `"${item.category}"`,
        item.severity,
        item.ipAddress,
        `"${item.details}"`
      ].join(','))
    ].join('\n')
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `access-control-audit-trail-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-[24px] font-medium text-gray-900 dark:text-gray-50">
            Access Control
          </h1>
          <Link href="/operations/access-control/settings">
            <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
              <RiSettings3Line className="size-4" />
            </Button>
          </Link>
        </div>
        <Button 
          variant="primary" 
          onClick={handleExportAuditTrail}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export audit trail
        </Button>
      </div>

      {/* Tab Navigation */}
      <TabNavigation>
        {tabs.map((tab) => (
          <TabNavigationLink
            key={tab.name}
            asChild
            active={pathname === tab.href}
          >
            <Link href={tab.href}>
              {tab.name}
              {tab.name === "Access requests" && (
                <Badge variant="error" className="ml-2 text-xs">
                  {accessRequestsCount}
                </Badge>
              )}
            </Link>
          </TabNavigationLink>
        ))}
      </TabNavigation>

      {/* Data Table */}
      <DataTable
        columns={auditTrailColumns}
        data={data}
        searchKey="action"
        initialSorting={[
          {
            id: "timestamp",
            desc: true // Most recent actions first
          }
        ]}
      />
    </div>
  )
}
