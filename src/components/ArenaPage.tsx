// import React, { useState } from 'react';
// import styles from '../scssStyle/ArenaPage.module.scss';
// import StepsProgress from '../components/StepsProgress/StepsProgress';
// import Step1Content from '../components/StepsProgress/Step1Content';
// import Step2Content from '../components/StepsProgress/Step2Content';
// import Step3Content from './StepsProgress/Step3Content';
// import Step4Content from './StepsProgress/Step4Content';
// import Step5Content from './StepsProgress/Step5Content';

// const ArenaPage: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState(1); // Track the current step

//   const handleNext = () => {
//     if (currentStep < 5) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   // Render the content for the current step
//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return <Step1Content />;
//       case 2:
//         return <Step2Content />;
//       case 3:
//         return <Step3Content />;
//       case 4:
//         return <Step4Content />;
//       case 5:
//         return <Step5Content />; // Add Step 5
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="app">
//       <div className={styles.arenaPage}>
//         <h1>Welcome to the Arena Project</h1>
//         <StepsProgress currentStep={currentStep} /> {/* Pass currentStep */}
//         {renderStepContent()} {/* Render the content for the current step */}

//         {/* Navigation Buttons */}
//         <div className={styles.navigationButtons}>
//           <button onClick={handlePrevious} disabled={currentStep === 1}>
//             Previous
//           </button>
//           <button onClick={handleNext} disabled={currentStep === 5}>
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArenaPage;

import React, { useState } from 'react';
import styles from '../scssStyle/ArenaPage.module.scss';
import StepsProgress from '../components/StepsProgress/StepsProgress';
import Step1Content from '../components/StepsProgress/Step1Content';
import Step2Content from '../components/StepsProgress/Step2Content';
import Step3Content from './StepsProgress/Step3Content';
import Step4Content from './StepsProgress/Step4Content';
import Step5Content from './StepsProgress/Step5Content';

const ArenaPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const [stepCorrectness, setStepCorrectness] = useState<{ [key: number]: boolean }>({
    1: false, // Step 1 starts as incorrect
    2: false, // Step 2 starts as incorrect
    3: false, // Step 3 starts as incorrect
    4: false, // Step 4 starts as incorrect
    5: false, // Step 5 starts as incorrect
  });

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswerCorrect = (step: number, isCorrect: boolean) => {
    setStepCorrectness((prev) => ({
      ...prev,
      [step]: isCorrect, // Update the correctness for the specific step
    }));
  };

  // Render the content for the current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1Content onAnswerCorrect={(isCorrect) => handleAnswerCorrect(1, isCorrect)} />;
      case 2:
        return <Step2Content onAnswerCorrect={(isCorrect) => handleAnswerCorrect(2, isCorrect)} />;
      case 3:
        return <Step3Content onAnswerCorrect={(isCorrect) => handleAnswerCorrect(3 , isCorrect)} />;
      case 4:
        return <Step4Content onAnswerCorrect={(isCorrect) => handleAnswerCorrect(4,isCorrect)} />;
      case 5:
        return <Step5Content onAnswerCorrect={(isCorrect) => handleAnswerCorrect(5 , isCorrect)} />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <div className={styles.arenaPage}>
        <h1>Welcome to the Arena Project</h1>
        <StepsProgress currentStep={currentStep} /> {/* Pass currentStep */}
        {renderStepContent()} {/* Render the content for the current step */}

        {/* Navigation Buttons */}
        <div className={styles.navigationButtons}>
          <button onClick={handlePrevious} disabled={currentStep === 1}>
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === 5 || !stepCorrectness[currentStep]} // Disable Next if the current step is not answered correctly
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArenaPage;