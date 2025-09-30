// Shared statuses data for work orders
export const workOrderStatuses = [
    {
        id: 1,
        name: "New",
        description: "Newly created work orders awaiting review",
        status: true,
        color: "yellow",
        orderCount: 45
    },
    {
        id: 2,
        name: "Open",
        description: "Work orders that have been reviewed and are ready to be worked on",
        status: true,
        color: "blue",
        orderCount: 23
    },
    {
        id: 3,
        name: "In Progress",
        description: "Work orders currently being worked on",
        status: true,
        color: "purple",
        orderCount: 18
    },
    {
        id: 4,
        name: "Pending",
        description: "Work orders waiting for additional information or resources",
        status: true,
        color: "orange",
        orderCount: 12
    },
    {
        id: 5,
        name: "Completed",
        description: "Successfully completed work orders",
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

export type WorkOrderStatus = typeof workOrderStatuses[0]
