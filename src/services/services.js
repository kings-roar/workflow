export const createCreds = async (data) => {
    try {
        const response = await fetch('/autoflow/v1/api-creds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('Server response:', result);
        return result;
    } catch (error) {
        console.error('Error sending creds:', error);
        return null;
    }
};

export const createSourceDest = async (data) => {
    try {
        const response = await fetch('http://localhost:9459/api-creds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('Server response:', result);
    } catch (error) {
        console.error('Error sending creds:', error);

    }
};

export const createDag = async (data) => {
    try {
        const response = await fetch('/autoflow/v1/dags', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('Server response:', result);
        return result;

    } catch (error) {
        console.error('Error sending creds:', error);
        return null;
    }
};

// Mock authentication imports
import { mockLoginUser, mockLogoutUser } from './mockAuth.js';

export const loginUser = async (loginId, password) => {
    try {
        // Use mock authentication for now
        const result = await mockLoginUser(loginId, password);
        console.log('Login response:', result);
        return result;

        // Uncomment below when backend is ready
        /*
        const response = await fetch('/autoflow/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ loginId, password })
        });

        const result = await response.json();
        console.log('Login response:', result);
        return result;
        */
    } catch (error) {
        console.error('Error during login:', error);
        return null;
    }
};

export const logoutUser = async () => {
    try {
        // Use mock authentication for now
        const result = await mockLogoutUser();
        console.log('Logout response:', result);
        return result;

        // Uncomment below when backend is ready
        /*
        const response = await fetch('/autoflow/v1/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const result = await response.json();
        console.log('Logout response:', result);
        return result;
        */
    } catch (error) {
        console.error('Error during logout:', error);
        return null;
    }
};

// Temporary API for alerts - replace with real API later
export const fetchAlerts = async () => {
    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data - replace this with actual API call
        const mockAlerts = [
            {
                id: 1,
                title: 'Workflow "Data Sync" failed',
                description: 'Failed to sync data from external API due to authentication error',
                type: 'failed',
                timestamp: '2024-01-15T10:30:00Z',
                workflow: 'Data Sync',
                severity: 'high'
            },
            {
                id: 2,
                title: 'Workflow "Backup Process" failed',
                description: 'Backup process failed due to insufficient disk space',
                type: 'failed',
                timestamp: '2024-01-15T08:45:00Z',
                workflow: 'Backup Process',
                severity: 'critical'
            },
            {
                id: 3,
                title: 'Workflow "Database Cleanup" failed',
                description: 'Database cleanup failed due to connection timeout',
                type: 'failed',
                timestamp: '2024-01-15T06:30:00Z',
                workflow: 'Database Cleanup',
                severity: 'high'
            },
            {
                id: 4,
                title: 'Workflow "Email Campaign" failed',
                description: 'Email campaign failed due to invalid recipient list',
                type: 'failed',
                timestamp: '2024-01-15T05:15:00Z',
                workflow: 'Email Campaign',
                severity: 'medium'
            },
            {
                id: 5,
                title: 'Workflow "File Processing" failed',
                description: 'File processing failed due to corrupted input file',
                type: 'failed',
                timestamp: '2024-01-15T04:45:00Z',
                workflow: 'File Processing',
                severity: 'medium'
            }
        ];

        return {
            success: true,
            data: mockAlerts,
            message: 'Alerts fetched successfully'
        };

        // Uncomment below when backend is ready
        /*
        const response = await fetch('/autoflow/v1/alerts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const result = await response.json();
        console.log('Alerts response:', result);
        return result;
        */
    } catch (error) {
        console.error('Error fetching alerts:', error);
        return {
            success: false,
            data: [],
            message: 'Failed to fetch alerts'
        };
    }
};

// Action API for alerts - replace with real API later
export const retryWorkflow = async (workflowId) => {
    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        console.log('Retrying workflow:', workflowId);

        return {
            success: true,
            message: 'Workflow retry initiated successfully'
        };

        // Uncomment below when backend is ready
        /*
        const response = await fetch(`/autoflow/v1/workflows/${workflowId}/retry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const result = await response.json();
        console.log('Retry response:', result);
        return result;
        */
    } catch (error) {
        console.error('Error retrying workflow:', error);
        return {
            success: false,
            message: 'Failed to retry workflow'
        };
    }
};

