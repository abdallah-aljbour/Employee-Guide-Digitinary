import React, { useState } from 'react';
import styles from './Step2Content.module.scss';
import QuestionComponent from './QuestionComponent';
import Timer from '../Timer'; 

interface Step2ContentProps {
  onAnswerCorrect: (isCorrect: boolean) => void;
}

const Step2Content: React.FC<Step2ContentProps> = ({ onAnswerCorrect }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0); // Track incorrect attempts

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

export default Step2Content;