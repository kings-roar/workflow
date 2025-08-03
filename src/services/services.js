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