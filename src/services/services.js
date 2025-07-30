export const createCreds = async (data) => {
    try {
        const response = await fetch('http://localhost:9459/creds', {
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
        const response = await fetch('http://localhost:9459/creds', {
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