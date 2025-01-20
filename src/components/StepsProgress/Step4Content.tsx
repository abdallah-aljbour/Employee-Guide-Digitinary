import React, { useState } from 'react';
import styles from './Step4Content.module.scss';
import QuestionComponent from './QuestionComponent';
import Timer from '../Timer'; 
import deployment from '../../assets/image.png';

interface Step4ContentProps {
  onAnswerCorrect: (isCorrect: boolean) => void;
}

const Step4Content: React.FC<Step4ContentProps> = ({ onAnswerCorrect }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0); // Track incorrect attempts

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

        <div className={styles.imagePlaceholder}>
          {/* Display the imported image */}
          <img src={deployment} alt="Micro Front End" className="your-image-class" />
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

export default Step4Content;