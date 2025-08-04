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




## RESPONSE OF DASHBOARD API

[
  {
    "Activity_No": 1,
    "Activity_Name": "Loading Ledger  from BO",
    "Remarks": "Record Size : 3159606",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 4, 2025, 3:14:48 PM",
    "Activity_EndTime": "Aug 4, 2025, 3:15:54 PM"
  },
  {
    "Activity_No": 2,
    "Activity_Name": "Loading Cp Code and Segment activation",
    "Remarks": "Segement Active Record Size : 3429941, cp_code Record Size : 650",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 4, 2025, 3:15:55 PM",
    "Activity_EndTime": "Aug 4, 2025, 3:16:58 PM"
  },
  {
    "Activity_No": 3,
    "Activity_Name": "Loading margin & haircut master from BO",
    "Remarks": "NSE Exchange Margin Record Size : 0, CCHaircut Record Size : 0",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 4, 2025, 3:17:00 PM",
    "Activity_EndTime": "Aug 4, 2025, 3:17:01 PM"
  },
  {
    "Activity_No": 4,
    "Activity_Name": "Upload NF Span File",
    "Remarks": "Record Size : 243|243|225, File Name : file",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 4, 2025, 3:14:55 PM",
    "Activity_EndTime": "Aug 4, 2025, 3:16:37 PM"
  },
  {
    "Activity_No": 5,
    "Activity_Name": "Upload BF Span File",
    "Remarks": "Record Size : 225|225|225, File Name : file",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 4, 2025, 3:16:46 PM",
    "Activity_EndTime": "Aug 4, 2025, 3:18:29 PM"
  },
  {
    "Activity_No": 6,
    "Activity_Name": "Upload RN Span File",
    "Remarks": "Record Size : 8|8|7, File Name : file",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 4, 2025, 3:18:35 PM",
    "Activity_EndTime": "Aug 4, 2025, 3:18:36 PM"
  },
  {
    "Activity_No": 7,
    "Activity_Name": "Upload NF GE Margin",
    "Remarks": "Record Size : 34763, File Name : NA",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 4, 2025, 3:18:39 PM",
    "Activity_EndTime": "Aug 4, 2025, 3:18:39 PM"
  },
  {
    "Activity_No": 8,
    "Activity_Name": "Upload BF GE Margin",
    "Remarks": "Record Size : 34763, File Name : NA",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 4, 2025, 3:18:43 PM",
    "Activity_EndTime": "Aug 4, 2025, 3:18:43 PM"
  },
  {
    "Activity_No": 9,
    "Activity_Name": "Upload RN GE Margin",
    "Remarks": "Record Size : 34763, File Name : NA",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 4, 2025, 3:18:41 PM",
    "Activity_EndTime": "Aug 4, 2025, 3:18:41 PM"
  },
  {
    "Activity_No": 10,
    "Activity_Name": "NF GE Exposure Margin",
    "Remarks": "Record Size : 138, File Name : NA",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 4, 2025, 3:18:46 PM",
    "Activity_EndTime": "Aug 4, 2025, 3:18:46 PM"
  },
  {
    "Activity_No": 11,
    "Activity_Name": "BF GE Exposure Margin",
    "Remarks": "Record Size : 2216, File Name : NA",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 4, 2025, 3:18:48 PM",
    "Activity_EndTime": "Aug 4, 2025, 3:18:48 PM"
  },
  {
    "Activity_No": 12,
    "Activity_Name": "RN GE Exposure Margin",
    "Remarks": "Record Size : 14990, File Name : NA",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 4, 2025, 3:18:50 PM",
    "Activity_EndTime": "Aug 4, 2025, 3:18:50 PM"
  },
  {
    "Activity_No": 13,
    "Activity_Name": "FO Exposure Limit file",
    "Remarks": "Record Size : , File Name : ael_01082025.csv",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 1, 2025, 9:05:36 AM",
    "Activity_EndTime": "Aug 1, 2025, 9:05:36 AM"
  },
  {
    "Activity_No": 14,
    "Activity_Name": "Loading BO Ledger from Invest DB",
    "Remarks": "Record Size : 139, File Name : C_CC02_10733_01082025.CSV",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 1, 2025, 9:05:12 AM",
    "Activity_EndTime": "Aug 1, 2025, 9:05:12 AM"
  },
  {
    "Activity_No": 15,
    "Activity_Name": "Upload CM CCO2 file",
    "Remarks": "Record Size : 139, File Name : F_CC02_10733_01082025.CSV",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 1, 2025, 9:05:17 AM",
    "Activity_EndTime": "Aug 1, 2025, 9:05:17 AM"
  },
  {
    "Activity_No": 16,
    "Activity_Name": "Upload FO CCO2 file",
    "Remarks": "Record Size : 139, File Name : X_CC02_10733_01082025.CSV",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 1, 2025, 9:05:23 AM",
    "Activity_EndTime": "Aug 1, 2025, 9:05:23 AM"
  },
  {
    "Activity_No": 17,
    "Activity_Name": "Upload CD CCO2 file",
    "Remarks": "Record Size : 1354, File Name : X_CC02_10733_01022024.CSV",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Jul 12, 2025, 12:09:01 PM",
    "Activity_EndTime": "Jul 12, 2025, 12:09:45 PM"
  },
  {
    "Activity_No": 18,
    "Activity_Name": "Load previous day NF position",
    "Remarks": "Record Size : 53329, File Name : NA",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Jul 12, 2025, 12:09:01 PM",
    "Activity_EndTime": "Jul 12, 2025, 12:09:45 PM"
  },
  {
    "Activity_No": 19,
    "Activity_Name": "Load previous day BF position",
    "Activity_StartTime": "Jul 12, 2025, 12:09:01 PM",
    "Activity_EndTime": "Jul 12, 2025, 12:09:45 PM"
  },
  {
    "Activity_No": 20,
    "Activity_Name": "Load previous day RN position",
    "Remarks": "Record Size : 3, File Name : NA",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Jul 12, 2025, 12:09:01 PM",
    "Activity_EndTime": "Jul 12, 2025, 12:09:45 PM"
  },
  {
    "Activity_No": 21,
    "Activity_Name": "Start Kafak Listener - sk.orderAck.inv",
    "Remarks": "Record Size : 0, File Name : NA. Kafka Flag false offset : 0",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 1, 2025, 9:05:29 AM",
    "Activity_EndTime": "Aug 1, 2025, 9:05:29 AM"
  },
  {
    "Activity_No": 22,
    "Activity_Name": "Start Kafak Listener - sk.funds.all",
    "Remarks": "Record Size : 0, File Name : NA. Kafka Flagfalse",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Jan 25, 2024, 7:21:27 PM",
    "Activity_EndTime": "Jan 25, 2024, 7:21:27 PM"
  },
  {
    "Activity_No": 23,
    "Activity_Name": "Start Kafak Listener - sk.funds.inv",
    "Remarks": "Record Size : 0, File Name : NA. Kafka Flagfalse",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Jan 25, 2024, 7:20:37 PM",
    "Activity_EndTime": "Jan 25, 2024, 7:20:37 PM"
  },
  {
    "Activity_No": 24,
    "Activity_Name": "Start Kafak Listener - sk.orderAck.all",
    "Remarks": "Record Size : 0, File Name : NA. Kafka Flagfalse",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Jan 25, 2024, 7:21:45 PM",
    "Activity_EndTime": "Jan 25, 2024, 7:21:45 PM"
  },
  {
    "Activity_No": 25,
    "Activity_Name": "Start Kafak Listener - sk.tradeFiles.all",
    "Remarks": "Record Size : 0, File Name : NA. Kafka Flagfalse",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Sep 26, 2024, 12:13:11 PM",
    "Activity_EndTime": "Sep 26, 2024, 12:13:11 PM"
  },
  {
    "Activity_No": 26,
    "Activity_Name": "Loading COMM Ledger from BO",
    "Remarks": "Record Size : 134017",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 1, 2025, 9:05:31 AM",
    "Activity_EndTime": "Aug 1, 2025, 9:05:31 AM"
  },
  {
    "Activity_No": 27,
    "Activity_Name": "Loading COMM Ledger from LC DB",
    "Remarks": "Record Size : 3, File Name : NA",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 1, 2025, 9:05:37 AM",
    "Activity_EndTime": "Aug 1, 2025, 9:05:37 AM"
  },
  {
    "Activity_No": 28,
    "Activity_Name": "Upload CO CCO2 file",
    "Remarks": "Record Size : 13851, File Name : MCX_WebAllocationDeallocation56125_20250801.csv",
    "Activity_Status": "SUCCESS",
    "Activity_StartTime": "Aug 1, 2025, 9:05:42 AM",
    "Activity_EndTime": "Aug 1, 2025, 9:05:43 AM"
  }
]