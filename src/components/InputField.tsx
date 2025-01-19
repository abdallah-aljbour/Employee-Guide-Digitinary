import React from "react";

interface InputFieldProps {
  type: string; // Input type (e.g., "text", "password", "email", etc.)
  value: string; // Input value
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
  placeholder?: string; // Optional placeholder
  required?: boolean; // Optional required attribute
  label?: string; // Optional label
  className?: string; // Optional custom class for styling
  inputClassName?: string; // Optional custom class for the input element
  labelClassName?: string; // Optional custom class for the label
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  onChange,
  placeholder = " ",
  required = false,
  label,
  className = "",
  inputClassName = "",
  labelClassName = "",
}) => {
  return (
    <div className={`input-wrapper ${className}`}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`input ${inputClassName}`}
      />
      {label && (
        <label className={`label ${labelClassName}`}>
          {label}
        </label>
      )}
    </div>
  );
};

export default InputField;