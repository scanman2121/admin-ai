import { FileText, Zap, MessageSquare, Users, Calendar, UserCheck, Shield } from "lucide-react"

export interface FeatureGateConfig {
  id: string
  suite: string
  title: string
  subtitle: string
  features: {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
  }[]
  pricing: {
    price: string
    ctaText: string
    buttonText: string
    status?: "included" | "contact-team" | "upgrade-required"
  }
  includedFeatures: string[]
}

export const featureGates: Record<string, FeatureGateConfig> = {
  "service-requests": {
    id: "service-requests",
    suite: "Operations Suite",
    title: "Service Requests",
    subtitle: "Create configurable, AI-powered workflows that simplify operations across your property.",
    features: [
      {
        icon: FileText,
        title: "Flexible enough for any workflow",
        description: "Avoid rigid templates and system limitations. Build workflows for maintenance, IT, amenities, security, vendor requests — or create your own from scratch without engineering."
      },
      {
        icon: Zap,
        title: "AI that accelerates every request",
        description: "Speed up intake and processing with AI-powered summaries, smart categorization, and suggested routing. Reduce manual sorting and get requests into the right hands faster."
      },
      {
        icon: MessageSquare,
        title: "Clear communication that reduces back-and-forth",
        description: "Keep tenants and staff aligned with two-way messaging, shared updates, and transparent status changes. Everything lives in one thread for complete clarity."
      },
      {
        icon: Users,
        title: "Built for complex teams and portfolios",
        description: "Create teams by property, role, or vendor group — and automatically route requests using flexible assignment rules that scale effortlessly across buildings."
      }
    ],
    pricing: {
      price: "$0",
      ctaText: "Get started today",
      buttonText: "Configure Service Requests",
      status: "included"
    },
    includedFeatures: [
      "Custom request types, statuses, forms, and logic",
      "Team creation with rule-based auto-assignment",
      "Real-time tenant + staff communication",
      "Automated notifications and status updates",
      "Reporting and insights across all request types"
    ]
  },
  "resource-booking": {
    id: "resource-booking",
    suite: "Operations Suite",
    title: "Resource Booking",
    subtitle: "Streamline space and resource reservations with intelligent scheduling and capacity management.",
    features: [
      {
        icon: Calendar,
        title: "Flexible booking system",
        description: "Book meeting rooms, equipment, parking spaces, and more with customizable booking rules and availability windows."
      },
      {
        icon: Zap,
        title: "Smart scheduling recommendations",
        description: "AI-powered suggestions help users find the best available times and resources based on their preferences and historical usage patterns."
      },
      {
        icon: MessageSquare,
        title: "Automated confirmations and reminders",
        description: "Keep everyone informed with automatic booking confirmations, reminders, and cancellation notifications sent via email and in-app."
      },
      {
        icon: Users,
        title: "Capacity and access management",
        description: "Manage room capacities, access permissions, and resource availability across multiple buildings and tenant organizations."
      }
    ],
    pricing: {
      price: "$0",
      ctaText: "Get started today",
      buttonText: "Configure Resource Booking",
      status: "included"
    },
    includedFeatures: [
      "Custom resource types and categories",
      "Recurring booking support",
      "Waitlist and cancellation management",
      "Real-time availability calendar",
      "Usage analytics and reporting"
    ]
  },
  "visitor-management": {
    id: "visitor-management",
    suite: "Operations Suite",
    title: "Visitor Management",
    subtitle: "Simplify guest registration, check-in, and building access with automated visitor workflows.",
    features: [
      {
        icon: UserCheck,
        title: "Streamlined visitor registration",
        description: "Hosts can pre-register visitors or guests can self-register on arrival. Capture all necessary information with customizable forms."
      },
      {
        icon: Zap,
        title: "Automated check-in workflows",
        description: "QR code check-in, digital badges, and automated notifications ensure smooth visitor experiences without manual intervention."
      },
      {
        icon: MessageSquare,
        title: "Real-time visitor tracking",
        description: "Know who's in your building at any time with real-time visitor status, location tracking, and automatic check-out reminders."
      },
      {
        icon: Shield,
        title: "Security and compliance",
        description: "Maintain visitor logs, manage access permissions, and ensure compliance with security protocols across your portfolio."
      }
    ],
    pricing: {
      price: "$0",
      ctaText: "Get started today",
      buttonText: "Configure Visitor Management",
      status: "included"
    },
    includedFeatures: [
      "Pre-registration and walk-in support",
      "QR code and digital badge generation",
      "Automated host notifications",
      "Visitor history and reporting",
      "Integration with access control systems"
    ]
  },
  "access-control-included": {
    id: "access-control-included",
    suite: "Operations Suite",
    title: "Access Control Command Center",
    subtitle: "Centralize and manage access control across your entire portfolio from a single, unified dashboard.",
    features: [
      {
        icon: Shield,
        title: "Unified access management",
        description: "Manage card access, mobile credentials, and visitor permissions across all buildings and tenants from one centralized platform."
      },
      {
        icon: Zap,
        title: "Real-time access monitoring",
        description: "Monitor access events in real-time, track entry and exit patterns, and receive instant alerts for security incidents or anomalies."
      },
      {
        icon: Users,
        title: "Automated provisioning and deprovisioning",
        description: "Automatically grant or revoke access based on employee status, lease dates, or custom rules. Reduce manual work and security risks."
      },
      {
        icon: MessageSquare,
        title: "Comprehensive audit trails",
        description: "Maintain detailed logs of all access events for compliance, security investigations, and operational insights across your portfolio."
      }
    ],
    pricing: {
      price: "$0",
      ctaText: "Contact your account team to configure",
      buttonText: "Contact Account Team",
      status: "contact-team"
    },
    includedFeatures: [
      "Multi-building access control management",
      "Card and mobile credential support",
      "Real-time access monitoring and alerts",
      "Automated provisioning workflows",
      "Comprehensive audit logs and reporting"
    ]
  },
  "access-control-upgrade": {
    id: "access-control-upgrade",
    suite: "Operations Suite",
    title: "Access Control Command Center",
    subtitle: "Centralize and manage access control across your entire portfolio from a single, unified dashboard.",
    features: [
      {
        icon: Shield,
        title: "Unified access management",
        description: "Manage card access, mobile credentials, and visitor permissions across all buildings and tenants from one centralized platform."
      },
      {
        icon: Zap,
        title: "Real-time access monitoring",
        description: "Monitor access events in real-time, track entry and exit patterns, and receive instant alerts for security incidents or anomalies."
      },
      {
        icon: Users,
        title: "Automated provisioning and deprovisioning",
        description: "Automatically grant or revoke access based on employee status, lease dates, or custom rules. Reduce manual work and security risks."
      },
      {
        icon: MessageSquare,
        title: "Comprehensive audit trails",
        description: "Maintain detailed logs of all access events for compliance, security investigations, and operational insights across your portfolio."
      }
    ],
    pricing: {
      price: "Upgrade required",
      ctaText: "Upgrade your plan to access this feature",
      buttonText: "Talk to Sales",
      status: "upgrade-required"
    },
    includedFeatures: [
      "Multi-building access control management",
      "Card and mobile credential support",
      "Real-time access monitoring and alerts",
      "Automated provisioning workflows",
      "Comprehensive audit logs and reporting"
    ]
  }
}

export const featureGateIds = Object.keys(featureGates)

