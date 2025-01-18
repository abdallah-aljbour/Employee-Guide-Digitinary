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

import React, { useState, useEffect, useRef } from 'react';
import styles from '../scssStyle/ArenaPage.module.scss';
import StepsProgress from '../components/StepsProgress/StepsProgress';
import Step1Content from '../components/StepsProgress/Step1Content';
import Step2Content from '../components/StepsProgress/Step2Content';
import Step3Content from './StepsProgress/Step3Content';
import Step4Content from './StepsProgress/Step4Content';
import Step5Content from './StepsProgress/Step5Content';

const ArenaPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const pageRef = useRef<HTMLDivElement>(null);
  const [stepCorrectness, setStepCorrectness] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  // Improved scroll handling
  useEffect(() => {
    if (pageRef.current) {
      const yOffset = -80; // Adjust this value to account for any fixed headers
      const y = pageRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }, [currentStep]);

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
      [step]: isCorrect,
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1Content onAnswerCorrect={(isCorrect) => handleAnswerCorrect(1, isCorrect)} />;
      case 2:
        return <Step2Content onAnswerCorrect={(isCorrect) => handleAnswerCorrect(2, isCorrect)} />;
      case 3:
        return <Step3Content onAnswerCorrect={(isCorrect) => handleAnswerCorrect(3, isCorrect)} />;
      case 4:
        return <Step4Content onAnswerCorrect={(isCorrect) => handleAnswerCorrect(4, isCorrect)} />;
      case 5:
        return <Step5Content onAnswerCorrect={(isCorrect) => handleAnswerCorrect(5, isCorrect)} />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <div ref={pageRef} className={styles.arenaPage}>
        <h1>Welcome to the Arena Project</h1>
        <StepsProgress currentStep={currentStep} />
        {renderStepContent()}
        <div className={styles.navigationButtons}>
          <button 
            onClick={handlePrevious} 
            disabled={currentStep === 1}
            className="px-4 py-2 mr-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === 5 || !stepCorrectness[currentStep]}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArenaPage;