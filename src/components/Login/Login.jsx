import { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlineKey, HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../services/services';

const Login = () => {
    const [formData, setFormData] = useState({
        loginId: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(''); // Clear error when user starts typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await loginUser(formData.loginId, formData.password);

            if (response && response.success) {
                const userData = {
                    loginId: response.user.loginId,
                    role: response.user.role,
                    name: response.user.name
                };

                // Use auth context to login
                login(userData, response.token);

                // Redirect to dashboard
                navigate('/dashboard');
            } else {
                setError(response?.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 animate-fade-in">
                {/* Logo and Title */}
                <div className="text-center animate-slide-down">
                    <div className="mx-auto h-20 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                        <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in-up">
                        Welcome Back
                    </h2>
                    <p className="text-gray-600 animate-fade-in-up-delay">
                        Sign in to your Workflow account
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 animate-slide-up">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Login ID Field */}
                        <div>
                            <label htmlFor="loginId" className="block text-sm font-medium text-gray-700 mb-2">
                                Login ID
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <HiOutlineUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="loginId"
                                    name="loginId"
                                    type="text"
                                    required
                                    value={formData.loginId}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your login ID"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <HiOutlineKey className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <HiOutlineEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <HiOutlineEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Signing in...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-sm text-gray-500">
                        Workflow Automation Platform
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login; 