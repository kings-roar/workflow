// Mock user database
const mockUsers = [
    {
        loginId: 'admin',
        password: 'admin123',
        role: 'admin',
        name: 'Administrator'
    },
    {
        loginId: 'user',
        password: 'user123',
        role: 'user',
        name: 'Regular User'
    }
];

// Mock authentication service
export const mockLoginUser = async (loginId, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.loginId === loginId && u.password === password);

    if (user) {
        return {
            success: true,
            token: `mock-jwt-token-${user.loginId}-${Date.now()}`,
            user: {
                loginId: user.loginId,
                role: user.role,
                name: user.name
            },
            message: 'Login successful'
        };
    } else {
        return {
            success: false,
            message: 'Invalid login ID or password'
        };
    }
};

export const mockLogoutUser = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        success: true,
        message: 'Logout successful'
    };
}; 