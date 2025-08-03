import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

const LogoutConfirm = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-xl max-w-sm w-full animate-scale-in">
                {/* Icon and Title */}
                <div className="text-center p-6">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4 animate-bounce-in">
                        <HiOutlineArrowRightOnRectangle className="h-8 w-8 text-white animate-pulse" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Sign Out
                    </h3>
                    <p className="text-gray-600 text-sm">
                        Are you sure you want to sign out?
                    </p>
                </div>

                {/* Actions */}
                <div className="flex border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutConfirm; 