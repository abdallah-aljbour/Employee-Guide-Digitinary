// import React from 'react';
// import styles from './Step1Content.module.scss';

// const Step1Content: React.FC = () => {
//   return (
//     <div className={styles.step1Content}>
//       <h2>Step 1: Architecture</h2>

//       {/* Micro Frontend Section */}
//       <div className={styles.card}>
//         <h3>1. Micro Frontend</h3>
//         <div className={styles.overview}>
//           <h4>Overview:</h4>
//           <p>
//             A brief introduction to the micro-frontend architecture and its advantages. It allows independent teams to work on specific modules, ensuring scalability and modularity.
//           </p>
//         </div>
//         <div className={styles.resources}>
//           <h4>Resources:</h4>
//           <p>
//             Read the following documentation to understand our micro-frontend setup:
//           </p>
//           <ul>
//             <li>
//               <a href="#" target="_blank" rel="noopener noreferrer">
//                 Micro Frontend Overview
//               </a>
//             </li>
//             <li>
//               <a href="#" target="_blank" rel="noopener noreferrer">
//                 Detailed Architecture
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div className={styles.structure}>
//           <h4>Structure:</h4>
//           <div className={styles.imagePlaceholder}>
//             {/* Placeholder for image */}
//             <p>Image will be added here</p>
//           </div>
//         </div>
//       </div>

//       {/* Digitinary-UI Section */}
//       <div className={styles.card}>
//         <h3>2. Digitinary-UI</h3>
//         <div className={styles.overview}>
//           <h4>Overview:</h4>
//           <p>
//             A UI library designed to maintain consistency across all modules with reusable components and styling.
//           </p>
//         </div>
//         <div className={styles.resources}>
//           <h4>Resources:</h4>
//           <p>
//             Learn more about Digitinary-UI at the following link:
//           </p>
//           <ul>
//             <li>
//               <a href="#" target="_blank" rel="noopener noreferrer">
//                 Digitinary-UI Documentation
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Step1Content;

// import React, { useState } from 'react';
// import styles from './Step1Content.module.scss';
// import QuestionComponent from './QuestionComponent'; // Import the reusable component

// interface Step1ContentProps {
//   onAnswerCorrect: (isCorrect: boolean) => void;
// }

// const Step1Content: React.FC<Step1ContentProps> = ({ onAnswerCorrect }) => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   // List of questions with options and correct answers
//   const questions = [
//     {
//       question: 'What is the main advantage of using Micro Frontend architecture?',
//       options: [
//         { value: 'scalability', label: 'Scalability and modularity' },
//         { value: 'development', label: 'Faster development' },
//         { value: 'debugging', label: 'Easier debugging' },
//       ],
//       correctAnswer: 'scalability',
//     },
//     {
//       question: 'Which tool is commonly used for Micro Frontend communication?',
//       options: [
//         { value: 'redux', label: 'Redux' },
//         { value: 'axios', label: 'Axios' },
//         { value: 'event-bus', label: 'Event Bus' },
//       ],
//       correctAnswer: 'event-bus',
//     },
//     {
//       question: 'What is the purpose of Digitinary-UI?',
//       options: [
//         { value: 'consistency', label: 'Maintain consistency across modules' },
//         { value: 'performance', label: 'Improve performance' },
//         { value: 'security', label: 'Enhance security' },
//       ],
//       correctAnswer: 'consistency',
//     },
//   ];

//   const handleTryAgain = () => {
//     // Move to the next question (or loop back to the first question)
//     setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
//   };

//   return (
//     <div className={styles.step1Content}>
//       <h2>Step 1: Architecture</h2>

//       {/* Micro Frontend Section */}
//       <div className={styles.card}>
//         <h3>1. Micro Frontend</h3>
//         <div className={styles.overview}>
//           <h4>Overview:</h4>
//           <p>
//             A brief introduction to the micro-frontend architecture and its advantages. It allows independent teams to work on specific modules, ensuring scalability and modularity.
//           </p>
//         </div>
//         <div className={styles.resources}>
//           <h4>Resources:</h4>
//           <p>
//             Read the following documentation to understand our micro-frontend setup:
//           </p>
//           <ul>
//             <li>
//               <a href="#" target="_blank" rel="noopener noreferrer">
//                 Micro Frontend Overview
//               </a>
//             </li>
//             <li>
//               <a href="#" target="_blank" rel="noopener noreferrer">
//                 Detailed Architecture
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div className={styles.structure}>
//           <h4>Structure:</h4>
//           <div className={styles.imagePlaceholder}>
//             {/* Placeholder for image */}
//             <p>Image will be added here</p>
//           </div>
//         </div>
//       </div>

//       {/* Digitinary-UI Section */}
//       <div className={styles.card}>
//         <h3>2. Digitinary-UI</h3>
//         <div className={styles.overview}>
//           <h4>Overview:</h4>
//           <p>
//             A UI library designed to maintain consistency across all modules with reusable components and styling.
//           </p>
//         </div>
//         <div className={styles.resources}>
//           <h4>Resources:</h4>
//           <p>
//             Learn more about Digitinary-UI at the following link:
//           </p>
//           <ul>
//             <li>
//               <a href="#" target="_blank" rel="noopener noreferrer">
//                 Digitinary-UI Documentation
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Question Section */}
//       <div className={styles.card}>
//         <QuestionComponent
//           key={currentQuestionIndex} // Force reset when the question changes
//           question={questions[currentQuestionIndex].question}
//           options={questions[currentQuestionIndex].options}
//           correctAnswer={questions[currentQuestionIndex].correctAnswer}
//           onAnswerCorrect={onAnswerCorrect}
//           onTryAgain={handleTryAgain}
//         />
//       </div>
//     </div>
//   );
// };

// export default Step1Content;

// import React, { useState, useEffect } from 'react';
// import styles from './Step1Content.module.scss';
// import QuestionComponent from './QuestionComponent'; 

// interface Step1ContentProps {
//   onAnswerCorrect: (isCorrect: boolean) => void;
// }

// const Step1Content: React.FC<Step1ContentProps> = ({ onAnswerCorrect }) => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [incorrectAttempts, setIncorrectAttempts] = useState(0); // Track incorrect attempts
//   const [showTimer, setShowTimer] = useState(false); // Control timer visibility
//   const [timer, setTimer] = useState(59); // Timer in seconds

//   // List of questions with options and correct answers
//   const questions = [
//     {
//       question: 'What is the main advantage of using Micro Frontend architecture?',
//       options: [
//         { value: 'scalability', label: 'Scalability and modularity' },
//         { value: 'development', label: 'Faster development' },
//         { value: 'debugging', label: 'Easier debugging' },
//       ],
//       correctAnswer: 'scalability',
//     },
//     {
//       question: 'Which tool is commonly used for Micro Frontend communication?',
//       options: [
//         { value: 'redux', label: 'Redux' },
//         { value: 'axios', label: 'Axios' },
//         { value: 'event-bus', label: 'Event Bus' },
//       ],
//       correctAnswer: 'event-bus',
//     },
//     {
//       question: 'What is the purpose of Digitinary-UI?',
//       options: [
//         { value: 'consistency', label: 'Maintain consistency across modules' },
//         { value: 'performance', label: 'Improve performance' },
//         { value: 'security', label: 'Enhance security' },
//       ],
//       correctAnswer: 'consistency',
//     },
//   ];

//   // Handle the timer countdown
//   useEffect(() => {
//     if (showTimer && timer > 0) {
//       const interval = setInterval(() => {
//         setTimer((prevTimer) => prevTimer - 1);
//       }, 1000);
//       return () => clearInterval(interval);
//     } else if (showTimer && timer === 0) {
//       setShowTimer(false); // Hide the timer
//       setIncorrectAttempts(0); // Reset incorrect attempts
//       setTimer(1); // Reset the timer
//     }
//   }, [showTimer, timer]);

//   const handleTryAgain = () => {
//     // Move to the next question (or loop back to the first question)
//     setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
//   };

//   const handleAnswerCorrect = (isCorrect: boolean) => {
//     if (!isCorrect) {
//       setIncorrectAttempts((prevAttempts) => prevAttempts + 1); // Increment incorrect attempts
//       if (incorrectAttempts + 1 >= 3) {
//         setShowTimer(true); // Show the timer after 3 incorrect attempts
//       }
//     } else {
//       setIncorrectAttempts(0); // Reset incorrect attempts if the answer is correct
//     }
//     onAnswerCorrect(isCorrect); // Notify parent component
//   };

//   return (
//     <div className={styles.step1Content}>
//       <h2>Step 1: Architecture</h2>

//       {/* Micro Frontend Section */}
//       <div className={styles.card}>
//         <h3>1. Micro Frontend</h3>
//         <div className={styles.overview}>
//           <h4>Overview:</h4>
//           <p>
//             A brief introduction to the micro-frontend architecture and its advantages. It allows independent teams to work on specific modules, ensuring scalability and modularity.
//           </p>
//         </div>
//         <div className={styles.resources}>
//           <h4>Resources:</h4>
//           <p>
//             Read the following documentation to understand our micro-frontend setup:
//           </p>
//           <ul>
//             <li>
//               <a href="#" target="_blank" rel="noopener noreferrer">
//                 Micro Frontend Overview
//               </a>
//             </li>
//             <li>
//               <a href="#" target="_blank" rel="noopener noreferrer">
//                 Detailed Architecture
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div className={styles.structure}>
//           <h4>Structure:</h4>
//           <div className={styles.imagePlaceholder}>
//             {/* Placeholder for image */}
//             <p>Image will be added here</p>
//           </div>
//         </div>
//       </div>

//       {/* Digitinary-UI Section */}
//       <div className={styles.card}>
//         <h3>2. Digitinary-UI</h3>
//         <div className={styles.overview}>
//           <h4>Overview:</h4>
//           <p>
//             A UI library designed to maintain consistency across all modules with reusable components and styling.
//           </p>
//         </div>
//         <div className={styles.resources}>
//           <h4>Resources:</h4>
//           <p>
//             Learn more about Digitinary-UI at the following link:
//           </p>
//           <ul>
//             <li>
//               <a href="#" target="_blank" rel="noopener noreferrer">
//                 Digitinary-UI Documentation
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Question Section */}
//       <div className={styles.card}>
//         {showTimer ? (
//           <div style={{ color: 'red', fontWeight: 'bold' }}>
//             You have answered incorrectly 3 times. Please review the content carefully, and if you have any questions, ask the leader for help.
//             <br />
//             The test will restart in {timer} second(s).
//           </div>
//         ) : incorrectAttempts >= 3 ? (
//           <div style={{ color: 'red', fontWeight: 'bold' }}>
//             You have answered incorrectly 3 times. Please review the content carefully, and if you have any questions, ask the leader for help.
//           </div>
//         ) : (
//           <QuestionComponent
//             key={currentQuestionIndex} // Force reset when the question changes
//             question={questions[currentQuestionIndex].question}
//             options={questions[currentQuestionIndex].options}
//             correctAnswer={questions[currentQuestionIndex].correctAnswer}
//             onAnswerCorrect={handleAnswerCorrect}
//             onTryAgain={handleTryAgain}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Step1Content;

import React, { useState, useEffect } from 'react';
import styles from './Step1Content.module.scss';
import QuestionComponent from './QuestionComponent'; 
import microFrontEnd from '../../assets/image.png'


interface Step1ContentProps {
  onAnswerCorrect: (isCorrect: boolean) => void;
}

const Step1Content: React.FC<Step1ContentProps> = ({ onAnswerCorrect }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0); // Track incorrect attempts
  const [showTimer, setShowTimer] = useState(false); // Control timer visibility
  const [timer, setTimer] = useState(1); // Timer in seconds

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
              <a href="#" target="_blank" rel="noopener noreferrer">
                Micro Frontend Overview
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
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
              <a href="#" target="_blank" rel="noopener noreferrer">
                Digitinary-UI Documentation
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

export default Step1Content;