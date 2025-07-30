import React from "react";

const SkeletonLoader = ({ rows = 5, showHeader = true, showActions = true }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            {showHeader && (
                <div className="flex items-center justify-between mb-6">
                    <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
                    <div className="h-10 bg-blue-600 rounded-lg w-32 animate-pulse"></div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-4 px-6">
                                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                            </th>
                            <th className="text-left py-4 px-6">
                                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                            </th>
                            <th className="text-left py-4 px-6">
                                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                            </th>
                            <th className="text-left py-4 px-6">
                                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                            </th>
                            <th className="text-left py-4 px-6">
                                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                            </th>
                            {showActions && (
                                <th className="text-left py-4 px-6">
                                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {Array.from({ length: rows }, (_, index) => (
                            <tr key={index}>
                                <td className="py-4 px-6">
                                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                                </td>
                                {showActions && (
                                    <td className="py-4 px-6">
                                        <div className="flex space-x-2">
                                            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SkeletonLoader; 