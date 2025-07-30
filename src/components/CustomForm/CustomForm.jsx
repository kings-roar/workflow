import React from "react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import CustomDropdown from "../CustomDropdown/CustomDropdown";

const CustomForm = ({ config, onSubmit, onCancel }) => {
  const [formState, setFormState] = React.useState(
    config.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (name, value, isDropdown = false) => {
    const fieldConfig = config.find((field) => field.name === name);

    if (!isDropdown && fieldConfig?.name === "phoneNumber") {
      const numericValue = value.replace(/[^0-9]/g, "").slice(0, 10);
      setFormState((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    config.forEach((field) => {
      const value = formState[field.name];
      const { required, maxLength, pattern } = field.validation || {};

      if (required && !value) {
        newErrors[field.name] = `${field.label} is required.`;
      } else if (maxLength && value?.length > maxLength) {
        newErrors[field.name] = `${field.label} must be less than ${maxLength} characters.`;
      } else if (pattern && !pattern.test(value)) {
        newErrors[field.name] = `${field.label} is invalid.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        await onSubmit(formState);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const options = [
    { value: "db", label: "DB" },
    { value: "API", label: "API " },
    { value: "sftp", label: "SFTP" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {config.map((field) => (
        <div key={field.name} className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            {field.label}
            {field.validation?.required && <span className="ml-1 text-red-500">*</span>}
          </label>

          {field.type === "dropdown" ? (
            <CustomDropdown
              options={field.options || options}
              placeholder={field.placeholder || "Select option"}
              value={formState[field.name]}
              onSelect={(option) => handleChange(field.name, option.value, true)}
              className="w-full"
            />
          ) : (
            <div className="relative">
              <input
                type={field.type}
                name={field.name}
                value={formState[field.name]}
                placeholder={field.placeholder}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${errors[field.name]
                  ? 'border-red-300 bg-red-50 focus:ring-red-200 focus:border-red-500'
                  : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
              />
              {formState[field.name] && !errors[field.name] && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <FaCheckCircle className="text-green-500 text-sm" />
                </div>
              )}
            </div>
          )}

          {errors[field.name] && (
            <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200">
              <FaExclamationTriangle className="text-red-500 text-xs flex-shrink-0" />
              <span>{errors[field.name]}</span>
            </div>
          )}
        </div>
      ))}

      <div className="flex items-center justify-end space-x-4 pt-8 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg font-medium transition-all duration-200 hover:shadow-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating...</span>
            </>
          ) : (
            <span>Create</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default CustomForm;
