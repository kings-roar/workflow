import { FaCogs } from "react-icons/fa";
import {
  HiOutlineChartBar,
  HiOutlineGlobeAlt,
  HiOutlineKey
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-52 h-screen bg-white border-r border-gray-200 flex flex-col pt-8 z-50">
      <nav className="flex flex-col space-y-2 flex-1 px-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
            }`
          }
        >
          <HiOutlineChartBar className="text-2xl" />
          <span className="text-sm font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to="/creds"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
            }`
          }
        >
          <HiOutlineKey className="text-2xl" />
          <span className="text-sm font-medium">Credentials</span>
        </NavLink>

        <NavLink
          to="/source-destination"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
            }`
          }
        >
          <HiOutlineGlobeAlt className="text-2xl" />
          <span className="text-sm font-medium">Destinations</span>
        </NavLink>

        <NavLink
          to="/workflow"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
            }`
          }
        >
          <FaCogs className="text-2xl" />
          <span className="text-sm font-medium">Workflows</span>
        </NavLink>
      </nav>

      {/* <div className="px-4 mb-8">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
            }`
          }
        >
          <HiOutlineCog6Tooth className="text-2xl" />
          <span className="text-sm font-medium">Settings</span>
        </NavLink>
      </div> */}
    </div>
  );
};

export default Sidebar;
