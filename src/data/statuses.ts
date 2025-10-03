// Shared statuses data for service requests
export const serviceRequestStatuses = [
    {
        id: 1,
        name: "New",
        description: "Newly created service requests awaiting review",
        status: true,
        color: "purple",
        orderCount: 45
    },
    {
        id: 2,
        name: "In Progress",
        description: "Service requests currently being worked on",
        status: true,
        color: "orange",
        orderCount: 18
    },
    {
        id: 3,
        name: "Completed",
        description: "Service requests that have been successfully completed",
        status: true,
        color: "green",
        orderCount: 156
    },
    {
        id: 4,
        name: "Denied",
        description: "Service requests that have been denied",
        status: true,
        color: "pink",
        orderCount: 3
    },
    {
        id: 5,
        name: "Cancelled",
        description: "Service requests that have been cancelled",
        status: true,
        color: "gray",
        orderCount: 8
    },
    {
        id: 6,
        name: "Assigned to Building",
        description: "Service requests assigned to building management",
        status: true,
        color: "blue",
        orderCount: 12
    },
    {
        id: 7,
        name: "Failed",
        description: "Service requests that have failed to complete",
        status: true,
        color: "red",
        orderCount: 2
    }
]

export type ServiceRequestStatus = typeof serviceRequestStatuses[0]
