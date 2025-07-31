import { Activity, AlertCircle, CheckCircle, Clock, Database, RefreshCw, Upload, XCircle, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const ActivityDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [apiUrl, setApiUrl] = useState('/skliquiditycalc/api/v1/lcActivity'); // Set your default API URL here
  const [apiUrl, setApiUrl] = useState('/skliquiditycalc/api/v1/lcActivity'); // Set your default API URL here

  const [lastUpdated, setLastUpdated] = useState(null);
  const [uploadMode, setUploadMode] = useState(false);


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        const processedData = Array.isArray(jsonData) ? jsonData : [jsonData];
        setData(processedData);
        setLastUpdated(new Date());
        setError(null);
      } catch (err) {
        setError('Invalid JSON file. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const fetchData = async () => {
    if (!apiUrl.trim()) {
      setError('Please provide an API URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors', // explicitly set CORS mode
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const jsonData = await response.json();

      // Handle both single object and array responses
      const processedData = Array.isArray(jsonData) ? jsonData : [jsonData];
      setData(processedData);
      setLastUpdated(new Date());
    } catch (err) {
      let errorMessage = err.message;

      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        errorMessage = 'Network Error: Cannot reach the API. This could be due to:\n• CORS restrictions\n• Network connectivity issues\n• API server is down\n• Incorrect URL';
      }

      setError(errorMessage);
      console.error('Error fetching data:', err);

      // Set empty data (0 values) when API fails
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const testApiDirectly = async () => {
    const testUrl = apiUrl.startsWith('http') ? apiUrl : `https://${apiUrl}`;

    try {
      // Test with a simple fetch to see what happens
      const response = await fetch(testUrl, { method: 'HEAD' });
      console.log('API Test Response:', response.status, response.statusText);
    } catch (err) {
      console.error('API Test Error:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate duration in minutes or seconds
  const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end - start;
    const durationMinutes = Math.round(durationMs / (1000 * 60));
    const durationSeconds = Math.round(durationMs / 1000);

    return {
      value: durationMinutes < 1 ? durationSeconds : durationMinutes,
      unit: durationMinutes < 1 ? 'sec' : 'min',
      display: durationMinutes < 1 ? `${durationSeconds} sec` : `${durationMinutes} min`
    };
  };

  // Process data for visualizations
  const processedData = data
    .filter(item => item && item.Activity_Status)
    .map(item => ({
      ...item,
      duration: calculateDuration(item.Activity_StartTime, item.Activity_EndTime)
    }));

  // Status distribution for pie chart
  const statusCounts = processedData.reduce((acc, item) => {
    acc[item.Activity_Status] = (acc[item.Activity_Status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count
  }));

  // Activity type counters - calculated from actual data only
  const getActivityTypeCounts = () => {
    const loadingCount = processedData.filter(item =>
      item.Activity_Name.toLowerCase().includes('loading') ||
      item.Activity_Name.toLowerCase().includes('load')
    ).length;

    const uploadCount = processedData.filter(item =>
      item.Activity_Name.toLowerCase().includes('upload') ||
      item.Activity_Name.toLowerCase().includes('backup') ||
      item.Activity_Name.toLowerCase().includes('export')
    ).length;

    const kafkaCount = processedData.filter(item =>
      item.Activity_Name.toLowerCase().includes('kafka') ||
      item.Activity_Name.toLowerCase().includes('kafak') ||
      item.Activity_Name.toLowerCase().includes('stream') ||
      item.Activity_Name.toLowerCase().includes('queue')
    ).length;

    // Return actual counts only - no fallback values
    return {
      total: processedData.length,
      loading: loadingCount,
      upload: uploadCount,
      kafka: kafkaCount
    };
  };

  const activityTypeCounts = getActivityTypeCounts();

  // Duration data for bar chart
  const durationData = processedData.map(item => ({
    name: item.Activity_Name.length > 20 ? item.Activity_Name.substring(0, 20) + '...' : item.Activity_Name,
    duration: item.duration.value,
    status: item.Activity_Status
  }));

  // Colors for different statuses
  const statusColors = {
    SUCCESS: '#10B981',
    FAILED: '#EF4444',
    IN_PROGRESS: '#F59E0B',
    PENDING: '#6B7280'
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'SUCCESS': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'FAILED': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'IN_PROGRESS': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    return statusColors[status] || '#6B7280';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">


      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Activity Monitoring Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              {lastUpdated && (
                <span className="text-sm text-gray-500">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={fetchData}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Hidden mode selection for now */}
          {/* <div className="flex gap-4 items-center mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setUploadMode(false)}
                className={`px-4 py-2 rounded-lg ${!uploadMode ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                API Mode
              </button>
              <button
                onClick={() => setUploadMode(true)}
                className={`px-4 py-2 rounded-lg ${uploadMode ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                File Upload Mode
              </button>
            </div>
          </div> */}

          {/* API calls are automatic - no manual controls needed */}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">Error: {error}</p>
            {/* {!uploadMode && (
              <div className="mt-3 text-sm text-red-700">
                <p className="font-medium">API Issue Detected:</p>
                <p>Your API requires authentication (redirecting to login page) and has CORS restrictions.</p>

                <p className="font-medium mt-3">Solutions:</p>
                <ol className="mt-1 list-decimal list-inside space-y-1">
                  <li><strong>Use File Upload Mode:</strong> Export your data as JSON and upload it using the "File Upload Mode" above</li>
                  <li><strong>Backend Fix:</strong> Ask your backend team to add CORS headers and provide API authentication</li>
                  <li><strong>Server-side Solution:</strong> Create a backend proxy that handles authentication and CORS</li>
                </ol>

                <div className="mt-3 p-2 bg-yellow-100 rounded">
                  <p className="font-medium text-yellow-800">💡 Quick Solution:</p>
                  <p className="text-yellow-700">Switch to "File Upload Mode" and upload your JSON data directly!</p>
                </div>
              </div>
            )} */}
          </div>
        )}
        <br></br>
      </div>

      {/* Activity Type Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Activities</p>
              <p className="text-3xl font-bold text-blue-600">{activityTypeCounts.total}</p>
            </div>
            <Activity className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Loading Operations</p>
              <p className="text-3xl font-bold text-green-600">{activityTypeCounts.loading}</p>
            </div>
            <Database className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upload Operations</p>
              <p className="text-3xl font-bold text-purple-600">{activityTypeCounts.upload}</p>
            </div>
            <Upload className="w-10 h-10 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Kafka Operations</p>
              <p className="text-3xl font-bold text-orange-600">{activityTypeCounts.kafka}</p>
            </div>
            <Zap className="w-10 h-10 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Status Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Activities</p>
                <p className="text-2xl font-bold text-gray-900">{data.length}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </div> */}

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Successful</p>
              <p className="text-2xl font-bold text-green-600">{statusCounts.SUCCESS || 0}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">{statusCounts.FAILED || 0}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600">{statusCounts.IN_PROGRESS || 0}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Status Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getStatusColor(entry.name)} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Duration by Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Duration by Activity (minutes/seconds)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={durationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="duration"
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Details Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {processedData.map((activity, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {activity.Activity_Name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(activity.Activity_Status)}
                      <span className="text-sm text-gray-900">{activity.Activity_Status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.Activity_StartTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.Activity_EndTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.duration.display}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {activity.Remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
};

export default ActivityDashboard;