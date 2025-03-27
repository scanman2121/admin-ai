export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
    type: NotificationType;
    actionUrl?: string;
}

export const notifications: Notification[] = [
    {
        id: '1',
        title: 'New building added',
        description: 'Empire State Building has been added to your portfolio',
        time: '2 minutes ago',
        read: false,
        type: 'info',
        actionUrl: '/buildings'
    },
    {
        id: '2',
        title: 'Maintenance scheduled',
        description: 'Building maintenance scheduled for Rockefeller Center on June 15',
        time: '1 hour ago',
        read: false,
        type: 'warning',
        actionUrl: '/maintenance'
    },
    {
        id: '3',
        title: 'User access request',
        description: 'Sarah Johnson requested access to One World Trade Center',
        time: '3 hours ago',
        read: false,
        type: 'info',
        actionUrl: '/users'
    },
    {
        id: '4',
        title: 'System update completed',
        description: 'The system has been updated to version 2.4.0',
        time: 'Yesterday',
        read: true,
        type: 'success'
    },
    {
        id: '5',
        title: 'Payment processed',
        description: 'Monthly subscription payment processed successfully',
        time: '2 days ago',
        read: true,
        type: 'success'
    },
    {
        id: '6',
        title: 'Error in data sync',
        description: 'There was an error syncing data for Chrysler Building',
        time: '3 days ago',
        read: true,
        type: 'error',
        actionUrl: '/buildings/chrysler-building'
    }
]; 