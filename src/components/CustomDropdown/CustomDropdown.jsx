import React, { useEffect, useRef, useState } from "react";
import { FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa";

const CustomDropdown = ({ options, placeholder, onSelect, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onSelect?.(option);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-500'}>
          {selected ? selected.label : placeholder}
        </span>
        <div className="text-gray-400 transition-transform duration-200">
          {isOpen ? <FaChevronUp className="text-sm" /> : <FaChevronDown className="text-sm" />}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
          <div className="max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center justify-between ${selected?.value === option.value ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  } ${index === 0 ? 'rounded-t-lg' : ''} ${index === options.length - 1 ? 'rounded-b-lg' : ''}`}
              >
                <span className={`${selected?.value === option.value ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                  {option.label}
                </span>
                {selected?.value === option.value && (
                  <FaCheck className="text-blue-500 text-sm" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
