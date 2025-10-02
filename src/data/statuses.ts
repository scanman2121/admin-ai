// Shared statuses data for service requests
export const serviceRequestStatuses = [
    {
        id: 1,
        name: "New",
        description: "Newly created service requests awaiting review",
        status: true,
        color: "yellow",
        orderCount: 45
    },
    {
        id: 2,
        name: "Open",
        description: "Service requests that have been reviewed and are ready to be worked on",
        status: true,
        color: "blue",
        orderCount: 23
    },
    {
        id: 3,
        name: "In Progress",
        description: "Service requests currently being worked on",
        status: true,
        color: "purple",
        orderCount: 18
    },
    {
        id: 4,
        name: "Pending",
        description: "Service requests waiting for additional information or resources",
        status: true,
        color: "orange",
        orderCount: 12
    },
    {
        id: 5,
        name: "Completed",
        description: "Successfully completed service requests",
        status: true,
        color: "green",
        orderCount: 156
    },
    {
        id: 6,
        name: "Cancelled",
        description: "Work orders that have been cancelled",
        status: true,
        color: "red",
        orderCount: 8
    },
    {
        id: 7,
        name: "On Hold",
        description: "Work orders temporarily paused or suspended",
        status: true,
        color: "gray",
        orderCount: 5
    }
]

export type ServiceRequestStatus = typeof serviceRequestStatuses[0]
