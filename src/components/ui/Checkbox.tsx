import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`w-5 h-5 border rounded ${
            checked ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
          }`}
        >
          {checked && (
            <svg
              className="w-5 h-5 text-white fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          )}
        </div>
      </div>
      {label && <span className="ml-2">{label}</span>}
    </label>
  );
};

export default Checkbox;
