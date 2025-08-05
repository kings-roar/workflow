import { useEffect, useState } from 'react';
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineExclamationTriangle,
  HiOutlineXCircle
} from 'react-icons/hi2';
import { fetchAlerts, findSolution } from '../services/services';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');

  const loadAlerts = async () => {
    try {
      const response = await fetchAlerts();
      if (response.success) {
        setAlerts(response.data);
      } else {
        console.error('Failed to fetch alerts:', response.message);
      }
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const getSolution = async (errorMessage) => {
    try {
      const [errorCode] = errorMessage.split(':');
      const response = await findSolution(errorCode.trim());

      if (response.success) {
        setDialogContent(response.message);
      } else {
        setDialogContent('Unable to retry the workflow at this time.');
      }
    } catch (error) {
      setDialogContent('An unexpected error occurred.');
    } finally {
      setDialogOpen(true);
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    return alert.type === filter;
  });

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 h-24 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Alerts & Notifications</h1>
        <p className="text-gray-600">Monitor failed tasks and system alerts</p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Alerts', count: alerts.length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${filter === tab.key
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {tab.label}
              <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12">
            <HiOutlineCheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-600">All systems are running smoothly!</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    <HiOutlineXCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {alert.Activity_Name}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-3">{alert.Error}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <HiOutlineClock className="h-4 w-4 mr-1" />
                        {formatTimestamp(alert.Activity_Date)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => getSolution(alert.Error)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-none rounded-lg font-medium cursor-pointer transition-all duration-200 hover:from-blue-700 hover:to-blue-800 shadow-sm hover:shadow-md flex items-center gap-2"
                  >
                    Find Solution
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tailwind Modal */}
    {dialogOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 p-6 relative animate-fadeIn">
      {/* Close Button */}
      <button
        onClick={() => setDialogOpen(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors text-xl font-bold"
        aria-label="Close dialog"
      >
        &times;
      </button>

      {/* Dialog Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🛠 Solution</h2>

      {/* Dialog Content */}
      <div className="text-gray-700 whitespace-pre-line max-h-60 overflow-y-auto pr-1">
        {dialogContent}
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setDialogOpen(false)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm"
        >
          Okay
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Alerts;
