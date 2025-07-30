import React, { useState, useRef, useEffect } from "react";
import styles from "./CustomFilter.module.scss";

const CustomFilter = ({ data, placeholder, displayKey }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = data.filter((item) =>
    item[displayKey].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionSelect = (value) => {
    setSelectedValue(value);
    setShowDropdown(false);
    setSearchTerm("");
  };

  return (
    <div className={styles.selectDropdownBox} onClick={(e) => e.preventDefault()} ref={dropdownRef}>
      <div className={styles.selectedValueText} onClick={() => setShowDropdown(!showDropdown)}>
        {selectedValue ? selectedValue : placeholder}
      </div>
      {showDropdown && (
        <div className={styles.dropdownOptionsUlistBox}>
          <div className={styles.searchInputFldBox}>
            <input
              type="text"
              className={styles.inptFilterTabsSearch}
              placeholder="Search..."
              aria-label="search"
              autoComplete="off"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <ul className={`${styles.dropdownOptionsUlist} custVScrollGlobal`}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item, index) => (
                <li key={index} onClick={() => handleOptionSelect(item[displayKey])}>
                  {item[displayKey]}
                </li>
              ))
            ) : (
              <li>No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomFilter;
