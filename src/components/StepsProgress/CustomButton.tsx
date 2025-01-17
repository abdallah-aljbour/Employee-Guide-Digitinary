import React from 'react';
import styles from './CustomButton.module.scss'; // Import the SCSS file for the button

interface CustomButtonProps {
  label: string; // Text to display on the button
  onClick: () => void; // Function to call when the button is clicked
  disabled?: boolean; // Whether the button is disabled
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button
      className={styles.button} // Apply the button style
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default CustomButton;