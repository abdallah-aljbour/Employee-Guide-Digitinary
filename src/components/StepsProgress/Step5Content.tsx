// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './Step5Content.module.scss';
// import QuestionComponent from './QuestionComponent';
// import Button from '../Button';
// import Timer from '../Timer'; 

// interface Step5ContentProps {
//   onAnswerCorrect: (isCorrect: boolean) => void;
// }

// const Step5Content: React.FC<Step5ContentProps> = ({ onAnswerCorrect }) => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [incorrectAttempts, setIncorrectAttempts] = useState(0); // Track incorrect attempts
//   const [isStepCompleted, setIsStepCompleted] = useState(false); // Track if all steps are completed
//   const navigate = useNavigate(); // Hook for navigation

//   // List of questions with options and correct answers (based on Step 5 content)
//   const questions = [
//     {
//       question: 'What is the first step to create a custom module?',
//       options: [
//         { value: 'Run the CLI command', label: 'Run the CLI command' },
//         { value: 'Navigate to the project directory', label: 'Navigate to the project directory' },
//         { value: 'Add components and services', label: 'Add components and services' },
//       ],
//       correctAnswer: 'Navigate to the project directory',
//     },
//     {
//       question: 'What command is used to generate a new module?',
//       options: [
//         { value: 'npm start', label: 'npm start' },
//         { value: 'npm run generate-module', label: 'npm run generate-module' },
//         { value: 'npm build', label: 'npm build' },
//       ],
//       correctAnswer: 'npm run generate-module',
//     },
//     {
//       question: 'What should you do after generating a new module?',
//       options: [
//         { value: 'Run the project', label: 'Run the project' },
//         { value: 'Navigate to the new module directory', label: 'Navigate to the new module directory' },
//         { value: 'Delete the module', label: 'Delete the module' },
//       ],
//       correctAnswer: 'Navigate to the new module directory',
//     },
//   ];

//   const handleTryAgain = () => {
//     // Move to the next question (or loop back to the first question)
//     setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
//   };

//   const handleAnswerCorrect = (isCorrect: boolean) => {
//     if (!isCorrect) {
//       setIncorrectAttempts((prevAttempts) => prevAttempts + 1); // Increment incorrect attempts
//     } else {
//       setIncorrectAttempts(0); // Reset incorrect attempts if the answer is correct
//       // Check if all questions are answered correctly
//       if (currentQuestionIndex === questions.length - 1) {
//         setIsStepCompleted(true); // Mark step as completed
//       } else {
//         setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to the next question
//       }
//     }
//     onAnswerCorrect(isCorrect); // Notify parent component
//   };

//   const handleTimerEnd = () => {
//     setIncorrectAttempts(0); // Reset incorrect attempts
//     setCurrentQuestionIndex(0); // Reset to the first question
//   };

//   const handleStartExam = () => {
//     navigate('/exam'); // Navigate to the exam page
//   };

//   return (
//     <div className={styles.step5Content}>
//       <h2>Step 5: Creating a Custom Module</h2>

//       {/* Creating a Custom Module Section */}
//       <div className={styles.card}>
//         <h3>1. Creating a Custom Module</h3>
//         <div className={styles.overview}>
//           <h4>Overview:</h4>
//           <p>
//             A step-by-step guide on creating a new custom module using the project’s CLI.
//           </p>
//         </div>

//         {/* Steps to Create a Module */}
//         <div className={styles.section}>
//           <h4>Steps to Create a Module:</h4>
//           <ol>
//             <li>
//               <strong>Step 1:</strong> Open the terminal and navigate to the project directory.
//             </li>
//             <li>
//               <strong>Step 2:</strong> Run the CLI command to generate a new module:
//               <pre>npm run generate-module</pre>
//             </li>
//             <li>
//               <strong>Step 3:</strong> Follow the prompts to name your module and select its features.
//             </li>
//             <li>
//               <strong>Step 4:</strong> Once generated, navigate to the new module directory:
//               <pre>cd src/modules/your-module-name</pre>
//             </li>
//             <li>
//               <strong>Step 5:</strong> Start developing your module by adding components, services, and styles.
//             </li>
//           </ol>
//         </div>
//       </div>

//       {/* Question Section */}
//       <div className={styles.card}>
//         <Timer
//           initialTime={15} // Set the initial time to 59 seconds
//           incorrectAttempts={incorrectAttempts} // Pass the number of incorrect attempts
//           maxAttempts={3} // Show the timer after 3 incorrect attempts
//           onTimeout={handleTimerEnd} // Callback when the timer ends
//         />

//         {incorrectAttempts < 3 && (
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

//       {/* Exam Button */}
//       {isStepCompleted && (
//         <div className={styles.examButtonContainer}>
//           <Button
//             onClick={handleStartExam}
//             className={styles.examButton}
//           >
//             Start Exam
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Step5Content;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Step5Content.module.scss';
import QuestionComponent from './QuestionComponent';
import Button from '../Button';
import Timer from '../Timer';
import GuideQuestion from '../GuideQuestion'; 

interface Step5ContentProps {
  onAnswerCorrect: (isCorrect: boolean) => void;
}

const Step5Content: React.FC<Step5ContentProps> = ({ onAnswerCorrect }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0); // Track incorrect attempts
  const [isStepCompleted, setIsStepCompleted] = useState(false); // Track if all steps are completed
  const [showGuide, setShowGuide] = useState(false); // State to control the GuideQuestion popup
  const navigate = useNavigate(); // Hook for navigation

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

  const handleTryAgain = () => {
    // Move to the next question (or loop back to the first question)
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const handleAnswerCorrect = (isCorrect: boolean) => {
    if (!isCorrect) {
      setIncorrectAttempts((prevAttempts) => prevAttempts + 1); // Increment incorrect attempts
    } else {
      setIncorrectAttempts(0); // Reset incorrect attempts if the answer is correct
      // Check if all questions are answered correctly
      if (currentQuestionIndex === questions.length - 1) {
        setIsStepCompleted(true); // Mark step as completed
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to the next question
      }
    }
    onAnswerCorrect(isCorrect); // Notify parent component
  };

  const handleTimerEnd = () => {
    setIncorrectAttempts(0); // Reset incorrect attempts
    setCurrentQuestionIndex(0); // Reset to the first question
  };

  const handleStartExam = () => {
    setShowGuide(true); // Show the GuideQuestion popup
  };

  const handleCloseGuide = () => {
    setShowGuide(false); // Close the GuideQuestion popup
    navigate('/exam'); // Navigate to the exam page
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

      {/* Exam Button */}
      {isStepCompleted && (
        <div className={styles.examButtonContainer}>
          <Button
            onClick={handleStartExam}
            className={styles.examButton}
          >
            Start Exam
          </Button>
        </div>
      )}

      {/* GuideQuestion Popup */}
      {showGuide && <GuideQuestion onClose={handleCloseGuide} />}
    </div>
  );
};

export default Step5Content;