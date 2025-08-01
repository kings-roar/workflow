import React, { useState } from "react";
import { FaKey, FaTimes } from "react-icons/fa";
import { createCreds } from "../../services/services";
import { getCredentialFormConfig } from "../../utils/constants/globalConstant";
import CustomForm from "../CustomForm/CustomForm";

const AddCreds = ({ showSideBar, handleClose, handleToggle }) => {
  const [formKey, setFormKey] = useState(Date.now());

  const handleFormSubmit = async (data) => {
    console.log("Form Submitted", data);
    try {
      const response = await createCreds(data);
      if (response?.success) {
        console.log("Creds created successfully!");
        setFormKey(Date.now());
      } else {
        console.error("API call did not return success.");
      }
    } catch (error) {
      console.error("Error sending creds:", error);
    }
  };

  const handleFormCancel = () => {
    console.log("Form Cancelled");
    handleToggle();
  };

  // Get the combined form configuration that includes both credential and API fields
  const combinedFormConfig = [
    ...getCredentialFormConfig("api"),
    { label: "File Type", name: "file_type", type: "text", placeholder: "Enter file type", validation: { required: false } }
  ];

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
                <FaKey className="text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Add New Credentials & Destination</h2>
                <p className="text-blue-100 text-sm">Configure your API credentials and destination settings</p>
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
                key={formKey}
                config={combinedFormConfig}
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

export default AddCreds;
