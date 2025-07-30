import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import styles from "./CustomSelect.module.scss";

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  isSearchable = true,
  isClearable = true,
}) => {
  return (
    <div className={styles.selectContainer}>
      {label && <span className={styles.label}>{label}</span>}
      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isSearchable={isSearchable}
        className={styles.select}
        classNamePrefix="react-select"
        isClearable={isClearable}
      />
    </div>
  );
};

CustomSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isSearchable: PropTypes.bool,
  isClearable: PropTypes.bool,
};

export default CustomSelect;
