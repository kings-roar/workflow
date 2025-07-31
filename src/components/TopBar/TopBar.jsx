import { FaCogs } from "react-icons/fa";
import {
    HiOutlineChartBar,
    HiOutlineGlobeAlt,
    HiOutlineKey
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";

const TopBar = () => {
    return (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-6 z-[60]">
            {/* Navigation centered */}
            <nav className="flex items-center space-x-6 mx-auto">
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

                <NavLink
                    to="/source-destination"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                        }`
                    }
                >
                    <HiOutlineGlobeAlt className="text-xl" />
                    <span className="text-sm font-medium">Destinations</span>
                </NavLink>

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
            </nav>
        </div>
    );
};

export default TopBar; 