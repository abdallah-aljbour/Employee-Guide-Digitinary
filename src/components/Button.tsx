import React from 'react';

interface ButtonProps {
  onClick?: () => void; // Make `onClick` optional
  type?: "button" | "submit" | "reset"; // Add the `type` prop
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, type = "button", disabled = false, className = '', children }) => {
  return (
    <button
      type={type} // Pass the `type` prop
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;