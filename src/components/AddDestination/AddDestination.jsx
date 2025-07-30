import React from "react";
import { FaGlobe, FaTimes } from "react-icons/fa";
import { sourceDestConfig } from "../../utils/constants/globalConstant";
import CustomForm from "../CustomForm/CustomForm";

const AddDestination = ({ showSideBar, handleClose, handleToggle }) => {
  const handleFormSubmit = (data) => {
    console.log("Form Submitted", data);
    // Handle form submission logic
  };

  const handleFormCancel = () => {
    console.log("Form Cancelled");
    handleToggle();
  };

  return (
    <>
      {showSideBar && (
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-all duration-300"
        ></div>
      )}
      <div className={`fixed top-0 right-0 w-[450px] h-screen transition-all duration-500 ease-in-out transform ${showSideBar ? 'translate-x-0' : 'translate-x-full'} z-50`}>
        <div className="w-full h-full bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <FaGlobe className="text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Add New Destination</h2>
                <p className="text-blue-100 text-sm">Configure your source and destination</p>
              </div>
            </div>
            <button
              onClick={handleToggle}
              className="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg flex items-center justify-center transition-all duration-200 group"
            >
              <FaTimes className="text-white group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <CustomForm
                config={sourceDestConfig}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDestination;
