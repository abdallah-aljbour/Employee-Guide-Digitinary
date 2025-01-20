import React, { useState } from 'react';
import styles from './Step3Content.module.scss';
import QuestionComponent from './QuestionComponent';
import Timer from '../Timer'; 

interface Step3ContentProps {
  onAnswerCorrect: (isCorrect: boolean) => void;
}

const Step3Content: React.FC<Step3ContentProps> = ({ onAnswerCorrect }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0); // Track incorrect attempts

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

  const handleTryAgain = () => {
    // Move to the next question (or loop back to the first question)
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const handleAnswerCorrect = (isCorrect: boolean) => {
    if (!isCorrect) {
      setIncorrectAttempts((prevAttempts) => prevAttempts + 1); // Increment incorrect attempts
    } else {
      setIncorrectAttempts(0); // Reset incorrect attempts if the answer is correct
    }
    onAnswerCorrect(isCorrect); // Notify parent component
  };

  const handleTimerEnd = () => {
    setIncorrectAttempts(0); // Reset incorrect attempts
    setCurrentQuestionIndex(0); // Reset to the first question
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
        <Timer
          initialTime={59} // Set the initial time to 59 seconds
          incorrectAttempts={incorrectAttempts} // Pass the number of incorrect attempts
          maxAttempts={3} // Show the timer after 3 incorrect attempts
          onTimeout={handleTimerEnd} // Callback when the timer ends
        />

        {incorrectAttempts < 3 && (
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