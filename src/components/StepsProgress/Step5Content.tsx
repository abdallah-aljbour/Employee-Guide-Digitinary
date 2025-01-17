import React, { useState, useEffect } from 'react';
import styles from './Step5Content.module.scss';
import QuestionComponent from './QuestionComponent'; // Import the reusable QuestionComponent

interface Step5ContentProps {
  onAnswerCorrect: (isCorrect: boolean) => void;
}

const Step5Content: React.FC<Step5ContentProps> = ({ onAnswerCorrect }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0); // Track incorrect attempts
  const [showTimer, setShowTimer] = useState(false); // Control timer visibility
  const [timer, setTimer] = useState(59); // Timer in seconds

  // List of questions with options and correct answers (based on Step 5 content)
  const questions = [
    {
      question: 'What is the first step to create a custom module?',
      options: [
        { value: 'Run the CLI command', label: 'Run the CLI command' },
        { value: 'Navigate to the project directory', label: 'Navigate to the project directory' },
        { value: 'Add components and services', label: 'Add components and services' },
      ],
      correctAnswer: 'Navigate to the project directory',
    },
    {
      question: 'What command is used to generate a new module?',
      options: [
        { value: 'npm start', label: 'npm start' },
        { value: 'npm run generate-module', label: 'npm run generate-module' },
        { value: 'npm build', label: 'npm build' },
      ],
      correctAnswer: 'npm run generate-module',
    },
    {
      question: 'What should you do after generating a new module?',
      options: [
        { value: 'Run the project', label: 'Run the project' },
        { value: 'Navigate to the new module directory', label: 'Navigate to the new module directory' },
        { value: 'Delete the module', label: 'Delete the module' },
      ],
      correctAnswer: 'Navigate to the new module directory',
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
    <div className={styles.step5Content}>
      <h2>Step 5: Creating a Custom Module</h2>

      {/* Creating a Custom Module Section */}
      <div className={styles.card}>
        <h3>1. Creating a Custom Module</h3>
        <div className={styles.overview}>
          <h4>Overview:</h4>
          <p>
            A step-by-step guide on creating a new custom module using the project’s CLI.
          </p>
        </div>

        {/* Steps to Create a Module */}
        <div className={styles.section}>
          <h4>Steps to Create a Module:</h4>
          <ol>
            <li>
              <strong>Step 1:</strong> Open the terminal and navigate to the project directory.
            </li>
            <li>
              <strong>Step 2:</strong> Run the CLI command to generate a new module:
              <pre>npm run generate-module</pre>
            </li>
            <li>
              <strong>Step 3:</strong> Follow the prompts to name your module and select its features.
            </li>
            <li>
              <strong>Step 4:</strong> Once generated, navigate to the new module directory:
              <pre>cd src/modules/your-module-name</pre>
            </li>
            <li>
              <strong>Step 5:</strong> Start developing your module by adding components, services, and styles.
            </li>
          </ol>
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

export default Step5Content;