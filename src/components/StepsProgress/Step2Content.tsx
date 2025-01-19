import React, { useState, useEffect } from 'react';
import styles from './Step2Content.module.scss';
import QuestionComponent from './QuestionComponent';

interface Step2ContentProps {
  onAnswerCorrect: (isCorrect: boolean) => void;
}

const Step2Content: React.FC<Step2ContentProps> = ({ onAnswerCorrect }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0); // Track incorrect attempts
  const [showTimer, setShowTimer] = useState(false); // Control timer visibility
  const [timer, setTimer] = useState(1); // Timer in seconds

  // List of questions with options and correct answers (based on Step 2 content)
  const questions = [
    {
      question: 'What is the primary focus of business requirements?',
      options: [
        { value: 'scalability', label: 'Scalability and modularity' },
        { value: 'objectives', label: 'Defining business objectives' },
        { value: 'debugging', label: 'Easier debugging' },
      ],
      correctAnswer: 'objectives',
    },
    {
      question: 'Which document outlines the key business requirements?',
      options: [
        { value: 'business-docs', label: 'Business Docs Link 1' },
        { value: 'technical-docs', label: 'Technical Docs Link 2' },
        { value: 'event-bus', label: 'Event Bus' },
      ],
      correctAnswer: 'business-docs',
    },
    {
      question: 'What is the purpose of business requirements?',
      options: [
        { value: 'consistency', label: 'Maintain consistency across modules' },
        { value: 'performance', label: 'Improve performance' },
        { value: 'objectives', label: 'Define project objectives' },
      ],
      correctAnswer: 'objectives',
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
    <div className={styles.step2Content}>
      <h2>Step 2: Business Requirements</h2>

      {/* Business Requirements Section */}
      <div className={styles.card}>
        <h3>1. Business Requirements</h3>
        <div className={styles.overview}>
          <h4>Overview:</h4>
          <p>
            A description of the key business requirements and objectives for the project.
          </p>
        </div>
        <div className={styles.resources}>
          <h4>Resources:</h4>
          <p>
            Refer to the following links for more details:
          </p>
          <ul>
            <li>
              <a href="https://asana.com/resources/business-requirements-document-template" target="_blank" rel="noopener noreferrer">
                Business Docs Link 1
              </a>
            </li>
            <li>
              <a href="https://asana.com/resources/business-requirements-document-template" target="_blank" rel="noopener noreferrer">
                Business Docs Link 2
              </a>
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

export default Step2Content;