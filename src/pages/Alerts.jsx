import { useEffect, useState } from 'react';
import { HiOutlineCheckCircle, HiOutlineClock, HiOutlineExclamationTriangle, HiOutlineXCircle } from 'react-icons/hi2';
import { fetchAlerts, retryWorkflow } from '../services/services';

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, failed

    // Fetch alerts from API
    useEffect(() => {
        const loadAlerts = async () => {
            try {
                const response = await fetchAlerts();
                if (response.success) {
                    setAlerts(response.data);
                } else {
                    console.error('Failed to fetch alerts:', response.message);
                    // You can add toast notification here
                }
            } catch (error) {
                console.error('Error loading alerts:', error);
                // You can add toast notification here
            } finally {
                setLoading(false);
            }
        };

        loadAlerts();
    }, []);

    const getAlertIcon = (type) => {
        switch (type) {
            case 'failed':
                return <HiOutlineXCircle className="h-5 w-5 text-red-500" />;
            default:
                return <HiOutlineExclamationTriangle className="h-5 w-5 text-blue-500" />;
        }
    };


    const filteredAlerts = alerts.filter(alert => {
        if (filter === 'all') return true;
        return alert.type === filter;
    });

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    const handleRetry = async (alertId) => {
        try {
            const response = await retryWorkflow(alertId);
            if (response.success) {
                console.log('Workflow retry initiated:', response.message);
                // You can add toast notification here
                // Optionally refresh the alerts list
                // loadAlerts();
            } else {
                console.error('Failed to retry workflow:', response.message);
                // You can add toast notification here
            }
        } catch (error) {
            console.error('Error retrying workflow:', error);
            // You can add toast notification here
        }
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
                        { key: 'all', label: 'All Alerts', count: alerts.length },
                        { key: 'failed', label: 'Failed', count: alerts.filter(a => a.type === 'failed').length }
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
                                        {getAlertIcon(alert.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {alert.title}
                                            </h3>
                                        </div>
                                        <p className="text-gray-600 mb-3">{alert.description}</p>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <span className="flex items-center">
                                                <HiOutlineClock className="h-4 w-4 mr-1" />
                                                {formatTimestamp(alert.timestamp)}
                                            </span>
                                            <span className="font-medium text-gray-700">
                                                Workflow: {alert.workflow}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleRetry(alert.id)}
                                        className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors duration-200"
                                    >
                                        Retry
                                    </button>
                                    <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Alerts; 