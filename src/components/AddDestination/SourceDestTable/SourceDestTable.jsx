import React from "react";
import { FaEye, FaPlus, FaSearch, FaTrash } from "react-icons/fa";

const SourceDestTable = ({ data, handleToggle, onSearch }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex justify-between items-center">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              className="pl-10 pr-4 py-2.5 w-80 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              placeholder="Search destinations..."
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <button
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-none rounded-lg font-medium cursor-pointer transition-all duration-200 hover:from-blue-700 hover:to-blue-800 shadow-sm hover:shadow-md flex items-center gap-2"
            onClick={handleToggle}
          >
            <FaPlus className="text-sm" />
            Add Source/Destination
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Cred Name</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Cred Type</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Cred Purpose</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Api Url</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Api Username</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Api Password</th>
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
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${w.role === 'editor' ? 'bg-cyan-100 text-cyan-800 ring-1 ring-cyan-200' :
                      w.role === 'author' ? 'bg-pink-100 text-pink-800 ring-1 ring-pink-200' :
                        w.role === 'maintainer' ? 'bg-orange-100 text-orange-800 ring-1 ring-orange-200' :
                          'bg-green-100 text-green-800 ring-1 ring-green-200'
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
                    <div className="flex items-center gap-2">
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
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No destinations found</h3>
                  <p className="text-gray-500 text-sm">Create your first destination to get started</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SourceDestTable;
