import React, { useState } from 'react';
import styles from './Step1Content.module.scss';
import QuestionComponent from './QuestionComponent';
import microFrontEnd from '../../assets/Micro Front End.png';
import Timer from '../Timer'; 

interface Step1ContentProps {
  onAnswerCorrect: (isCorrect: boolean) => void;
}

const Step1Content: React.FC<Step1ContentProps> = ({ onAnswerCorrect }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0); // Track incorrect attempts

  // List of questions with options and correct answers
  const questions = [
    {
      question: 'What is the main advantage of using Micro Frontend architecture?',
      options: [
        { value: 'scalability', label: 'Scalability and modularity' },
        { value: 'development', label: 'Faster development' },
        { value: 'debugging', label: 'Easier debugging' },
      ],
      correctAnswer: 'scalability',
    },
    {
      question: 'Which tool is commonly used for Micro Frontend communication?',
      options: [
        { value: 'redux', label: 'Redux' },
        { value: 'axios', label: 'Axios' },
        { value: 'event-bus', label: 'Event Bus' },
      ],
      correctAnswer: 'event-bus',
    },
    {
      question: 'What is the purpose of Digitinary-UI?',
      options: [
        { value: 'consistency', label: 'Maintain consistency across modules' },
        { value: 'performance', label: 'Improve performance' },
        { value: 'security', label: 'Enhance security' },
      ],
      correctAnswer: 'consistency',
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
    <div className={styles.step1Content}>
      <h2>Step 1: Architecture</h2>

      {/* Micro Frontend Section */}
      <div className={styles.card}>
        <h3>1. Micro Frontend</h3>
        <div className={styles.overview}>
          <h4>Overview:</h4>
          <p>
            A brief introduction to the micro-frontend architecture and its advantages. It allows independent teams to work on specific modules, ensuring scalability and modularity.
          </p>
        </div>
        <div className={styles.resources}>
          <h4>Resources:</h4>
          <p>
            Read the following documentation to understand our micro-frontend setup:
          </p>
          <ul>
            <li>
              <a href="https://www.aplyca.com/en/blog/micro-frontends-what-are-they-and-when-to-use-them" target="_blank" rel="noopener noreferrer">
                Micro Frontend Overview
              </a>
            </li>
            <li>
              <a href="https://medium.com/appfoster/a-comprehensive-guide-to-micro-frontend-architecture-cc0e31e0c053" target="_blank" rel="noopener noreferrer">
                Detailed Architecture
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.structure}>
          <h4>Structure:</h4>
          <div className={styles.imagePlaceholder}>
            {/* Display the imported image */}
            <img src={microFrontEnd} alt="Micro Front End" className="your-image-class" />
          </div>
        </div>
      </div>

      {/* Digitinary-UI Section */}
      <div className={styles.card}>
        <h3>2. Digitinary-UI</h3>
        <div className={styles.overview}>
          <h4>Overview:</h4>
          <p>
            A UI library designed to maintain consistency across all modules with reusable components and styling.
          </p>
        </div>
        <div className={styles.resources}>
          <h4>Resources:</h4>
          <p>
            Learn more about Digitinary-UI at the following link:
          </p>
          <ul>
            <li>
              <a href="https://ui.shared.digitinary.net/overview" target="_blank" rel="noopener noreferrer">
                Digitinary-UI Documentation
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Question Section */}
      <div className={styles.card}>
        <Timer
          initialTime={15} // Set the initial time to 15 seconds
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

export default Step1Content;