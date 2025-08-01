import React, { useEffect, useState } from "react";
import { FaCogs, FaTimes } from "react-icons/fa";
import { AddAutomationWorkflow } from "../../utils/constants/globalConstant";
import CustomForm from "../CustomForm/CustomForm";
import { createDag } from "../../services/services";

const AddWorkflow = ({ showSideBar, handleClose, handleToggle, onCredCreated }) => {
  const [formKey, setFormKey] = useState(Date.now());

  const fetchCreds = async () => {
    try {
      const response = await fetch("/autoflow/v1/api-creds");
      if (!response.ok) {
        throw new Error("Failed to fetch creds");
      }
      const data = await response.json();
      let tempSource = [];
      let tempDestination = [];
      data.forEach(element => {
        if (element.cred_purpose === "destination") {
          tempDestination.push({ value: element.cred_id, label: element.cred_name });
        } else if (element.cred_purpose === "source") {
          tempSource.push({ value: element.cred_id, label: element.cred_name });
        }
      });
      AddAutomationWorkflow.forEach(item => {
        if (item.name === "source_creds_id") item.options = [...tempSource];
        if (item.name === "destination_creds_id") item.options = [...tempDestination];
      });
    } catch (error) {
      console.error("Error fetching creds:", error);
    }
  };

  useEffect(() => {
    fetchCreds();
  }, []);

  const handleFormSubmit = async (data) => {
    console.log("Form Submitted", data);

    const payload = {
      ...data,
      parent_id: data.parent_id === "" ? null : data.parent_id,
    };

    try {
      const response = await createDag(payload);
      if (response && response.id) {
        console.log("Creds created successfully!");
        setFormKey(Date.now()); // Reset form

        handleToggle(); // Close sidebar

        if (onCredCreated) {
          onCredCreated(); // Refresh credentials table
        }
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

  return (
    <>
      {showSideBar && (
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-all duration-300"
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 w-[450px] h-screen transition-all duration-500 ease-in-out transform ${
          showSideBar ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="w-full h-full bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <FaCogs className="text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Add New Workflow</h2>
                <p className="text-blue-100 text-sm">Configure your automation workflow</p>
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
                config={AddAutomationWorkflow}
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

export default AddWorkflow;
