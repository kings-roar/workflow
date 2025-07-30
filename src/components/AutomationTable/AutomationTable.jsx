import React from "react";
import { FaEye, FaPlus, FaSearch, FaTrash } from "react-icons/fa";

const UserTable = ({ data, handleToggle, onSearch }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Search workflows..."
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <button
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg flex items-center space-x-2 transition-all duration-200 hover:from-blue-700 hover:to-blue-800 shadow-sm hover:shadow-md"
            onClick={handleToggle}
          >
            <FaPlus className="text-sm" />
            <span>Add Automation</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Dag Name</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Schedule Cron</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Source Creds</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Destination Creds</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Source Table</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Schedule Type</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Created At</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Modified At</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.length > 0 ? (
              data.map((w, idx) => (
                <tr key={idx} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors duration-200">{w.dag_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{w.schedule}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${w.role === 'editor' ? 'bg-green-100 text-green-800 ring-1 ring-green-200' :
                      w.role === 'author' ? 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200' :
                        w.role === 'maintainer' ? 'bg-red-100 text-red-800 ring-1 ring-red-200' :
                          'bg-gray-100 text-gray-800 ring-1 ring-gray-200'
                      }`}>
                      {w.source_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 max-w-xs truncate" title={w.destination_type}>{w.destination_type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${w.status === 'active' ? 'bg-green-100 text-green-800 ring-1 ring-green-200' :
                      w.status === 'pending' ? 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200' :
                        'bg-red-100 text-red-800 ring-1 ring-red-200'
                      }`}>
                      {w.source_table_name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${w.status === 'active' ? 'bg-green-100 text-green-800 ring-1 ring-green-200' :
                      w.status === 'pending' ? 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200' :
                        'bg-red-100 text-red-800 ring-1 ring-red-200'
                      }`}>
                      {w.destination_table_name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{w.createdAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{w.modifiedAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        title="View"
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group/btn"
                      >
                        <FaEye className="text-sm group-hover/btn:scale-110 transition-transform duration-200" />
                      </button>
                      <button
                        title="Delete"
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 group/btn"
                      >
                        <FaTrash className="text-sm group-hover/btn:scale-110 transition-transform duration-200" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-16 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaSearch className="text-gray-400 text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No workflows found</h3>
                  <p className="text-gray-500 text-sm">Create your first workflow to get started</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
