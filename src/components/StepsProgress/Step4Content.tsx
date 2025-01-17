import React, { useState, useEffect } from 'react';
import styles from './Step4Content.module.scss';
import QuestionComponent from './QuestionComponent'; // Import the reusable QuestionComponent

interface Step4ContentProps {
  onAnswerCorrect: (isCorrect: boolean) => void;
}

const Step4Content: React.FC<Step4ContentProps> = ({ onAnswerCorrect }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0); // Track incorrect attempts
  const [showTimer, setShowTimer] = useState(false); // Control timer visibility
  const [timer, setTimer] = useState(1); // Timer in seconds

  // List of questions with options and correct answers (based on Step 4 content)
  const questions = [
    {
      question: 'Which environment is used for ongoing development?',
      options: [
        { value: 'Develop', label: 'Develop' },
        { value: 'Test', label: 'Test' },
        { value: 'Staging (STG)', label: 'Staging (STG)' },
      ],
      correctAnswer: 'Develop',
    },
    {
      question: 'What is the purpose of the Test environment?',
      options: [
        { value: 'Ongoing development', label: 'Ongoing development' },
        { value: 'QA team verification', label: 'QA team verification' },
        { value: 'Client reviews', label: 'Client reviews' },
      ],
      correctAnswer: 'QA team verification',
    },
    {
      question: 'What should you do after verifying changes in the Develop environment?',
      options: [
        { value: 'Deploy to STG', label: 'Deploy to STG' },
        { value: 'Move changes to Test for QA validation', label: 'Move changes to Test for QA validation' },
        { value: 'Mark tickets as Ready for Test', label: 'Mark tickets as Ready for Test' },
      ],
      correctAnswer: 'Move changes to Test for QA validation',
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
    <div className={styles.step4Content}>
      <h2>Step 4: Deployment Process</h2>

      {/* Deployment Process Section */}
      <div className={styles.card}>
        <h3>1. Deployment Process</h3>
        <div className={styles.overview}>
          <h4>Overview:</h4>
          <p>
            The project has three deployment environments, each with specific purposes:
          </p>
          <ul>
            <li>
              <strong>Develop:</strong> Used for ongoing development.
            </li>
            <li>
              <strong>Test:</strong> For the QA team to verify changes.
            </li>
            <li>
              <strong>Staging (STG):</strong> Pre-production environment for client reviews.
            </li>
          </ul>
        </div>

        {/* Image Placeholder */}
        <div className={styles.imagePlaceholder}>
          {/* Placeholder for image */}
          <p>Image will be added here</p>
        </div>

        {/* Jira and Ticket Process Section */}
        <div className={styles.section}>
          <h4>Jira and Ticket Process:</h4>
          <ul>
            <li>Deploy changes to the Develop environment and verify functionality.</li>
            <li>Once verified, move the changes to the Test environment for QA validation.</li>
            <li>After successful testing, mark the tickets as <strong>Ready for Test</strong> and prepare for deployment to STG.</li>
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

export default Step4Content;