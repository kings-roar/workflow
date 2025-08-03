import { useState } from "react";
import { FaCogs } from "react-icons/fa";
import {
    HiOutlineArrowRightOnRectangle,
    HiOutlineChartBar,
    HiOutlineKey,
    HiOutlineUser
} from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/services";
import LogoutConfirm from "../LogoutConfirm/LogoutConfirm";

const TopBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    const handleLogoutCancel = () => {
        setShowLogoutConfirm(false);
    };

    const handleLogoutConfirm = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            logout();
            navigate('/login');
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-300 shadow-md flex items-center justify-between px-6 z-50">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center">
                {/* App Logo */}
                <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold text-gray-900">Workflow</h1>
                        <p className="text-xs text-gray-500">Automation Platform</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-8 w-px bg-gray-300 mx-6"></div>

                {/* Navigation left-aligned */}
                <nav className="flex items-center space-x-6">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                            }`
                        }
                    >
                        <HiOutlineChartBar className="text-xl" />
                        <span className="text-sm font-medium">Dashboard</span>
                    </NavLink>

                    {/* Show Credentials tab only for admin users */}
                    {user && user.role === 'admin' && (
                        <NavLink
                            to="/creds"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                                }`
                            }
                        >
                            <HiOutlineKey className="text-xl" />
                            <span className="text-sm font-medium">Credentials</span>
                        </NavLink>
                    )}

                    {/* Show Workflows tab only for admin users */}
                    {user && user.role === 'admin' && (
                        <NavLink
                            to="/workflow"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                                }`
                            }
                        >
                            <FaCogs className="text-xl" />
                            <span className="text-sm font-medium">Workflows</span>
                        </NavLink>
                    )}
                </nav>
            </div>

            {/* User Info and Logout */}
            <div className="flex items-center space-x-4">
                {user && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <HiOutlineUser className="h-4 w-4" />
                        <span className="font-medium">{user.name || user.loginId}</span>

                    </div>
                )}
                <button
                    onClick={handleLogoutClick}
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-105"
                >
                    <HiOutlineArrowRightOnRectangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>

            {/* Logout Confirmation Dialog */}
            <LogoutConfirm
                isOpen={showLogoutConfirm}
                onClose={handleLogoutCancel}
                onConfirm={handleLogoutConfirm}
            />
        </div>
    );
};

export default TopBar; 