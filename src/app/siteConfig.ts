export const siteConfig = {
  name: "Dashboard",
  url: "https://dashboard.tremor.so",
  description: "The only dashboard you will ever need.",
  baseLinks: {
    home: "/",
    overview: "/my-hqo",
    resources: "/resources",
    transactions: "/transactions",
    credits: "/credits",
    discounts: "/discounts",
    analytics: "/analytics",
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
    // Asset Manager section
    assetManager: {
      overview: "/asset-manager/overview",
    },
    // Experience Manager section
    experienceManager: {
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
      workOrders: "/operations/work-orders",
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
      documents: "/settings-and-setup/documents",
    },
    // Intelligence section
    intelligence: {
      dashboard: "/intelligence/dashboard",
      assessments: "/intelligence/assessments",
      aboutIntelligence: "/intelligence/about",
      portfolioBenchmarks: "/intelligence/portfolio-benchmarks",
    },
  },
}

export type siteConfig = typeof siteConfig
