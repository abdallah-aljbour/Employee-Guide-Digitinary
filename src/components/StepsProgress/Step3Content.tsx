import React, { useState, useEffect } from 'react';
import styles from './Step3Content.module.scss';
import QuestionComponent from './QuestionComponent';

interface Step3ContentProps {
  onAnswerCorrect: (isCorrect: boolean) => void;
}

const Step3Content: React.FC<Step3ContentProps> = ({ onAnswerCorrect }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0); // Track incorrect attempts
  const [showTimer, setShowTimer] = useState(false); // Control timer visibility
  const [timer, setTimer] = useState(1); // Timer in seconds

  // List of questions with options and correct answers (based on Step 3 content)
  const questions = [
    {
      question: 'Which repository is required for the core container of the project?',
      options: [
        { value: 'c360', label: 'c360' },
        { value: 'container', label: 'container' },
        { value: 'common-layout', label: 'common-layout' },
      ],
      correctAnswer: 'container',
    },
    {
      question: 'Which library is used for state management in the project?',
      options: [
        { value: 'Redux', label: 'Redux' },
        { value: 'Context API', label: 'Context API' },
        { value: 'Digitinary-UI', label: 'Digitinary-UI' },
      ],
      correctAnswer: 'Redux',
    },
    {
      question: 'What is the purpose of the common-layout repository?',
      options: [
        { value: 'Core business logic', label: 'Core business logic' },
        { value: 'Shared layout for consistent design', label: 'Shared layout for consistent design' },
        { value: 'User management features', label: 'User management features' },
      ],
      correctAnswer: 'Shared layout for consistent design',
    },
  ];

  // Handle the timer countdown
  useEffect(() => {
    if (showTimer && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (showTimer && timer === 0) {
      setShowTimer(false); // Hide the timer
      setIncorrectAttempts(0); // Reset incorrect attempts
      setTimer(59); // Reset the timer
    }
  }, [showTimer, timer]);

  const handleTryAgain = () => {
    // Move to the next question (or loop back to the first question)
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const handleAnswerCorrect = (isCorrect: boolean) => {
    if (!isCorrect) {
      setIncorrectAttempts((prevAttempts) => prevAttempts + 1); // Increment incorrect attempts
      if (incorrectAttempts + 1 >= 3) {
        setShowTimer(true); // Show the timer after 3 incorrect attempts
      }
    } else {
      setIncorrectAttempts(0); // Reset incorrect attempts if the answer is correct
    }
    onAnswerCorrect(isCorrect); // Notify parent component
  };

  return (
    <div className={styles.step3Content}>
      <h2>Step 3: Technical Setup</h2>

      {/* Technical Setup Section */}
      <div className={styles.card}>
        <h3>1. Technical Setup</h3>
        <div className={styles.overview}>
          <h4>Overview:</h4>
          <p>
            This section outlines the technical requirements and setup process for the project.
          </p>
        </div>

        {/* Required Repositories Section */}
        <div className={styles.section}>
          <h4>Required Repositories:</h4>
          <p>
            Clone and set up the following repositories:
          </p>
          <ul>
            <li>
              <strong>container:</strong> Core container repository for the project.
            </li>
            <li>
              <strong>common-layout:</strong> Shared layout repository for consistent design.
            </li>
          </ul>
        </div>

        {/* Optional Repositories Section */}
        <div className={styles.section}>
          <h4>Optional Repositories (Install based on the module you need):</h4>
          <ul>
            <li>
              <strong>c360:</strong> Core business logic and components.
            </li>
            <li>
              <strong>User Management:</strong> User-related features and services.
            </li>
          </ul>
        </div>

        {/* Libraries and Tools Section */}
        <div className={styles.section}>
          <h4>Libraries and Tools Used in the Project:</h4>
          <ul>
            <li>
              <strong>Redux:</strong> For state management.
            </li>
            <li>
              <strong>Digitinary-UI:</strong> Reusable UI components.
            </li>
            <li>
              <strong>Context API:</strong> Additional state management for isolated components.
            </li>
          </ul>
        </div>
      </div>

      {/* Question Section */}
      <div className={styles.card}>
        {showTimer ? (
          <div style={{ color: 'red', fontWeight: 'bold' }}>
            You have answered incorrectly 3 times. Please review the content carefully, and if you have any questions, ask the leader for help.
            <br />
            The test will restart in {timer} second(s).
          </div>
        ) : incorrectAttempts >= 3 ? (
          <div style={{ color: 'red', fontWeight: 'bold' }}>
            You have answered incorrectly 3 times. Please review the content carefully, and if you have any questions, ask the leader for help.
          </div>
        ) : (
          <QuestionComponent
            key={currentQuestionIndex} // Force reset when the question changes
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            correctAnswer={questions[currentQuestionIndex].correctAnswer}
            onAnswerCorrect={handleAnswerCorrect}
            onTryAgain={handleTryAgain}
          />
        )}
      </div>
    </div>
  );
};

export default Step3Content;