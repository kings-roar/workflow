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
        // // Simulate API delay
        // await new Promise(resolve => setTimeout(resolve, 1000));

        // // Mock data - replace this with actual API call
        // const mockAlerts = [
        //     {
        //         id: 1,
        //         title: 'Workflow "Data Sync" failed',
        //         description: 'Failed to sync data from external API due to authentication error',
        //         type: 'failed',
        //         timestamp: '2024-01-15T10:30:00Z',
        //         workflow: 'Data Sync',
        //         severity: 'high'
        //     }
        // ];

        // return {
        //     success: true,
        //     data: mockAlerts,
        //     message: 'Alerts fetched successfully'
        // };

        // Uncomment below when backend is ready
        
        const response = await fetch('/skliquiditycalc/api/v1/getLCErrorLogs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const result = await response.json();
        console.log('Alerts response:', result);
        return {
            success: true,
            data: result,
            message: 'Failed to fetch alerts'
        };;
        
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

export const findSolution = async (error) => {
  try {
    const response = await fetch(`/skliquiditycalc/api/v1/findSolution/${error}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const result = await response.text(); // Use text() instead of json()
    console.log('Retry response:', result);

    return {
      success: true,
      message: result
    };

  } catch (err) {
    console.error('Error while fetching solution:', err);

    return {
      success: false,
      message: 'We encountered an issue while attempting to retrieve the solution. Please try again shortly or contact support if the problem persists.'
    };
  }
};
