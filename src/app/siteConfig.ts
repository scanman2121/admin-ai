export const siteConfig = {
  name: "HqO",
  url: "https://dashboard.tremor.so",
  description: "HqO admin prototype",
  baseLinks: {
    home: "/",
    overview: "/my-hqo",
    resources: "/resources",
    transactions: "/transactions",
    credits: "/credits",
    discounts: "/discounts",
    inventory: "/inventory",
    invoices: "/invoices",
    analytics: "/analytics",
    fileRepository: "/file-repository",
    users: "/users",
    buildings: "/buildings",
    spaces: "/spaces",
    tenants: "/tenants",
    vendors: "/vendors",
    audiences: "/audiences",
    settings: {
      general: "/settings/general",
      billing: "/settings/billing",
    },
    // Portfolio section
    portfolio: {
      overview: "/portfolio/overview",
    },
    // Experience Manager section
    experienceManager: {
      overview: "/experience-manager/overview",
      content: "/experience-manager/content",
      amenityPosts: "/experience-manager/amenity-posts",
      events: "/experience-manager/events",
      surveys: "/experience-manager/surveys",
      communityForum: "/experience-manager/community-forum",
      communications: "/experience-manager/communications",
    },
    // Operations section
    operations: {
      accessControl: "/operations/access-control",
      mobileAccess: "/operations/mobile-access",
      visitorManagement: "/operations/visitor-management",
      capacityManager: "/operations/capacity-manager",
      resourceBooking: "/operations/resource-booking",
      serviceRequests: "/operations/service-requests",
      parking: "/operations/parking",
      energyConsumption: "/operations/energy-consumption",
    },
    // Settings and setup section
    settingsAndSetup: {
      features: "/settings-and-setup/features",
      ssoApps: "/settings-and-setup/sso-apps",
      connectedApps: "/settings-and-setup/connected-apps",
      settings: "/settings-and-setup/settings",
      theme: "/settings-and-setup/theme",
    },
    // Intelligence section
    intelligence: {
      dashboard: "/intelligence/dashboard",
      assessments: "/intelligence/assessments",
      aboutIntelligence: "/intelligence/about",
      portfolioBenchmarks: "/intelligence/portfolio-benchmarks",
    },
    // Tenant view section
    tenant: {
      home: "/tenant/home",
      buildings: "/tenant/buildings",
      employees: "/tenant/employees",
      accessControl: "/tenant/access-control",
      vendors: "/tenant/vendors",
      visitors: "/tenant/visitors",
      resourceBooking: "/tenant/resource-booking",
      serviceRequests: "/tenant/service-requests",
      credits: "/tenant/credits",
      settings: "/tenant/settings",
    },
  },
}

export type siteConfig = typeof siteConfig
