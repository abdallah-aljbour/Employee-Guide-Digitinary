import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import styles from '../scssStyle/GuideQuestion.module.scss';
import Button from './Button'; 

interface GuideQuestionProps {
  onClose: () => void;
}

const GuideQuestion: React.FC<GuideQuestionProps> = ({ onClose }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleReturnToSteps = () => {
    navigate('/'); // Navigate to the home path
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Gorilla Exam Instructions</h2>
        <p>This is the Gorilla Exam. Please read the following instructions carefully:</p>
        <ul>
          <li>You can switch tabs, but if you do, the exam will finish automatically.</li>
          <li>You must allow access to your camera and microphone. If you don't, the exam will finish.</li>
          <li>You must take the exam in full-screen mode. If you minimize the screen, the exam will finish.</li>
          <li>The exam contains 5 multiple-choice questions, each worth 1 mark.</li>
          <li>You will receive your result immediately after completing the exam.</li>
        </ul>
        {/* Use the reusable Button component for "Start Exam" */}
        <Button
          onClick={onClose}
          className={styles.closeButton}
        >
          I Understand, Start Exam
        </Button>
        {/* Add a new Button for "Return to Steps" */}
        <Button
          onClick={handleReturnToSteps}
          className={styles.returnButton}
        >
          Return to Home Page
        </Button>
      </div>
    </div>
  );
};

export default GuideQuestion;