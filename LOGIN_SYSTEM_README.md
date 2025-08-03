# Workflow Login System

## Overview
A beautiful and secure login system has been implemented for the Workflow automation platform with role-based access control.

## Features

### 🔐 Authentication
- **Beautiful Login UI**: Modern, responsive design with gradient backgrounds and smooth animations
- **Form Validation**: Real-time validation with error handling
- **Password Visibility Toggle**: Show/hide password functionality
- **Loading States**: Visual feedback during authentication
- **Persistent Sessions**: Automatic login state management

### 👥 Role-Based Access Control
- **Admin Users**: Full access to all features (Dashboard, Credentials, Workflows)
- **Regular Users**: Access only to Dashboard
- **Dynamic Navigation**: Navigation tabs show/hide based on user role
- **Protected Routes**: Automatic redirection for unauthorized access

### 🎨 UI/UX Features
- **Modern Design**: Clean, professional interface with Tailwind CSS
- **Responsive Layout**: Works perfectly on all device sizes
- **Smooth Animations**: Hover effects and transitions
- **User Feedback**: Clear error messages and loading indicators
- **User Profile Display**: Shows user name and role in the top bar

## Technical Implementation

### Components Created
1. **Login Component** (`src/components/Login/Login.jsx`)
   - Beautiful login form with validation
   - Password visibility toggle
   - Error handling and loading states

2. **ProtectedRoute Component** (`src/components/ProtectedRoute/ProtectedRoute.jsx`)
   - Authentication guard for protected routes
   - Role-based access control
   - Automatic redirection

3. **AuthContext** (`src/context/AuthContext.jsx`)
   - Global authentication state management
   - User session persistence
   - Login/logout functionality

### Services
1. **Authentication Services** (`src/services/services.js`)
   - Login and logout API calls
   - Token management
   - Error handling

2. **Mock Authentication** (`src/services/mockAuth.js`)
   - Test users for development
   - Simulated API delays
   - Easy to replace with real backend

### Updated Components
1. **TopBar** - Added user info display and logout functionality
2. **App.jsx** - Integrated protected routes and login flow
3. **main.jsx** - Wrapped with AuthProvider

## Test Users

### Admin User
- **Login ID**: `admin`
- **Password**: `admin123`
- **Role**: `admin`
- **Access**: Dashboard, Credentials, Workflows

### Regular User
- **Login ID**: `user`
- **Password**: `user123`
- **Role**: `user`
- **Access**: Dashboard only

## Database Schema

The system expects the following user structure in the database:

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    loginId VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## API Endpoints

### Login
```
POST /workflow/v1/auth/login
Content-Type: application/json

{
    "loginId": "string",
    "password": "string"
}

Response:
{
    "success": true,
    "token": "jwt-token",
    "user": {
        "loginId": "string",
        "role": "admin|user",
        "name": "string"
    },
    "message": "Login successful"
}
```

### Logout
```
POST /workflow/v1/auth/logout
Authorization: Bearer <token>

Response:
{
    "success": true,
    "message": "Logout successful"
}
```

## Security Features

1. **JWT Tokens**: Secure token-based authentication
2. **Role Validation**: Server-side role verification
3. **Protected Routes**: Client-side route protection
4. **Session Management**: Automatic token validation
5. **Secure Logout**: Token invalidation on logout

## Getting Started

1. **Start the application**:
   ```bash
   npm run dev
   ```

2. **Access the login page**:
   - Navigate to `/login`
   - Or the app will automatically redirect if not authenticated

3. **Test with mock users**:
   - Admin: `admin` / `admin123`
   - User: `user` / `user123`

## Backend Integration

To integrate with your backend:

1. **Replace mock services** in `src/services/services.js`
2. **Uncomment the real API calls** and remove mock imports
3. **Update API endpoints** to match your backend URLs
4. **Implement JWT token validation** on your backend
5. **Set up user database** with the provided schema

## Customization

### Styling
- Colors and themes can be customized in the Login component
- Tailwind CSS classes can be modified for different designs
- Icons can be changed using React Icons

### Roles
- Additional roles can be added by updating the role enum
- Role-based logic can be extended in ProtectedRoute component
- Navigation visibility can be customized in TopBar component

### Features
- Password reset functionality can be added
- Remember me functionality can be implemented
- Two-factor authentication can be integrated
- User registration can be added if needed

## File Structure

```
src/
├── components/
│   ├── Login/
│   │   └── Login.jsx
│   └── ProtectedRoute/
│       └── ProtectedRoute.jsx
├── context/
│   └── AuthContext.jsx
├── services/
│   ├── services.js
│   └── mockAuth.js
├── App.jsx
└── main.jsx
```

This login system provides a solid foundation for your AutoFlow application with beautiful UI, secure authentication, and flexible role-based access control. 