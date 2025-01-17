import React from 'react';
import styles from './StepsProgress.module.scss';

interface StepsProgressProps {
  currentStep: number; 
}

const StepsProgress: React.FC<StepsProgressProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, name: 'Architecture' },
    { number: 2, name: 'Business Requirements' },
    { number: 3, name: 'Technical Setup' },
    { number: 4, name: 'Deployment Process' },
    { number: 5, name: 'Creating a Custom Module' },
  ];

  return (
    <div className={styles.progressWrapper}>
      {steps.map((step) => (
        <div
          key={step.number}
          className={`${styles.progressItem} ${
            step.number <= currentStep ? styles.completed : ''
          } ${step.number === currentStep ? styles.active : ''}`}
        >
          <div className={styles.progressCounter}>{step.number}</div>
          <div className={styles.progressName}>{step.name}</div>
        </div>
      ))}
    </div>
  );
};

export default StepsProgress;