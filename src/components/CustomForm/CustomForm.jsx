import React from "react";
import styles from "./CustomForm.module.scss";
import CustomDropdown from "../CustomDropdown/CustomDropdown";

const CustomForm = ({ config, onSubmit, onCancel }) => {
  const [formState, setFormState] = React.useState(
    config.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [errors, setErrors] = React.useState({});

  const handleChange = (name, value, isDropdown = false) => {
    const fieldConfig = config.find((field) => field.name === name);

    if (!isDropdown && fieldConfig?.name === "phoneNumber") {
      const numericValue = value.replace(/[^0-9]/g, "").slice(0, 10);
      setFormState((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formState);
    }
  };

  console.log("first", formState);

  const options = [
    { value: "db", label: "DB" },
    { value: "API", label: "API " },
    { value: "sftp", label: "SFTP" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      {config.map((field) => (
        <div key={field.name} className={styles.formWrap}>
          <div className={styles.lblFldWrap}>
            <label className={styles.lbl}>
              {field.label}
              {field.validation?.required && <span className={styles.astrick}>*</span>}
            </label>

            {field.type === "dropdown" ? (
              <CustomDropdown
                options={field.options || options}
                placeholder={field.placeholder || "Select option"}
                value={formState[field.name]}
                onSelect={(option) => handleChange(field.name, option.value, true)}
                className={styles.dropdown}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formState[field.name]}
                placeholder={field.placeholder}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className={styles.input}
              />
            )}

            {errors[field.name] && <div className={styles.errorLabel}>{errors[field.name]}</div>}
          </div>
        </div>
      ))}
      <div className={styles.btnWrap}>
        <button type="submit" className="commanBtn">
          Submit
        </button>
        <button type="button" onClick={onCancel} className="commanBtn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CustomForm;
