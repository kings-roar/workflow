import { useState } from "react";
import { FaCogs } from "react-icons/fa";
import {
    HiOutlineArrowRightOnRectangle,
    HiOutlineBars3,
    HiOutlineBell,
    HiOutlineChartBar,
    HiOutlineKey,
    HiOutlineXMark
} from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/services";
import LogoutConfirm from "../LogoutConfirm/LogoutConfirm";

const TopBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-300 shadow-md flex items-center justify-between px-4 sm:px-6 z-50">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center">
                {/* App Logo */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                        <svg className="h-4 w-4 sm:h-6 sm:w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-sm sm:text-lg font-bold text-gray-900">Workflow</h1>
                        <p className="text-xs text-gray-500 hidden sm:block">Automation Platform</p>
                    </div>
                </div>

                {/* Divider - Hidden on mobile */}
                <div className="h-8 w-px bg-gray-300 mx-3 sm:mx-6 hidden sm:block"></div>

                {/* Desktop Navigation - Hidden on mobile */}
                <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                            }`
                        }
                    >
                        <HiOutlineChartBar className="text-lg xl:text-xl" />
                        <span className="text-sm font-medium">Dashboard</span>
                    </NavLink>

                    {/* Show Credentials tab only for admin users */}
                    {user && user.role === 'admin' && (
                        <NavLink
                            to="/creds"
                            className={({ isActive }) =>
                                `flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                                }`
                            }
                        >
                            <HiOutlineKey className="text-lg xl:text-xl" />
                            <span className="text-sm font-medium">Connectors</span>
                        </NavLink>
                    )}

                    {/* Show Workflows tab only for admin users */}
                    {user && user.role === 'admin' && (
                        <NavLink
                            to="/workflow"
                            className={({ isActive }) =>
                                `flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                                }`
                            }
                        >
                            <FaCogs className="text-lg xl:text-xl" />
                            <span className="text-sm font-medium">Workflows</span>
                        </NavLink>
                    )}
                </nav>
            </div>

            {/* Right side - Alert Button, Logout, and Mobile Menu Button */}
            <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Alert Button */}
                <NavLink
                    to="/alerts"
                    className="hidden sm:flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-105 border border-red-200 hover:border-red-300"
                >
                    <div className="relative">
                        <HiOutlineBell className="h-4 w-4" />
                        <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">Alerts</span>
                </NavLink>

                {/* Desktop Logout Button */}
                <button
                    onClick={handleLogoutClick}
                    className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-105"
                >
                    <HiOutlineArrowRightOnRectangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Logout</span>
                </button>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                    {isMobileMenuOpen ? (
                        <HiOutlineXMark className="h-6 w-6" />
                    ) : (
                        <HiOutlineBars3 className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMobileMenu}></div>
            )}

            {/* Mobile Menu */}
            <div className={`lg:hidden fixed top-16 left-0 right-0 bg-white border-b border-gray-300 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="px-4 py-4 space-y-3">
                    {/* Mobile Navigation */}
                    <nav className="space-y-2">
                        <NavLink
                            to="/dashboard"
                            onClick={closeMobileMenu}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
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
                                onClick={closeMobileMenu}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <HiOutlineKey className="text-xl" />
                                <span className="text-sm font-medium">Connectors</span>
                            </NavLink>
                        )}

                        {/* Show Workflows tab only for admin users */}
                        {user && user.role === 'admin' && (
                            <NavLink
                                to="/workflow"
                                onClick={closeMobileMenu}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <FaCogs className="text-xl" />
                                <span className="text-sm font-medium">Workflows</span>
                            </NavLink>
                        )}

                        {/* Mobile Alert Button */}
                        <NavLink
                            to="/alerts"
                            onClick={closeMobileMenu}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-red-600 text-white shadow-sm'
                                    : 'text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200'
                                }`
                            }
                        >
                            <div className="relative">
                                <HiOutlineBell className="text-xl" />
                                <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">Alerts</span>
                        </NavLink>

                        {/* Mobile Logout Button */}
                        <button
                            onClick={() => {
                                closeMobileMenu();
                                handleLogoutClick();
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                        >
                            <HiOutlineArrowRightOnRectangle className="h-5 w-5" />
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    </nav>
                </div>
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