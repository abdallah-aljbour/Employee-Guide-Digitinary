import React, { useState, useEffect } from 'react';
import Button from '../Button'; 
import styles from '../../scssStyle/QuestionComponent.module.scss'; 
interface QuestionComponentProps {
  question: string;
  options: { value: string; label: string }[];
  correctAnswer: string;
  onAnswerCorrect: (isCorrect: boolean) => void;
  onTryAgain: () => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  options,
  correctAnswer,
  onAnswerCorrect,
  onTryAgain,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswerChange = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    const isAnswerCorrect = selectedAnswer === correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setIsSubmitted(true);
    onAnswerCorrect(isAnswerCorrect); // Notify parent component
  };

  // Reset the state when the question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setIsCorrect(null);
  }, [question]);

  return (
    <div>
      <h3>{question}</h3>
      {options.map((option) => (
        <div key={option.value}>
          <label>
            <input
              type="radio"
              name="answer"
              value={option.value}
              checked={selectedAnswer === option.value}
              onChange={() => handleAnswerChange(option.value)}
            />
            {option.label}
          </label>
        </div>
      ))}

      {/* Submit Button */}
      {!isSubmitted && (
        <Button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className={styles.button} // Apply the scoped class
        >
          Submit
        </Button>
      )}

      {/* Try Again Button */}
      {isSubmitted && !isCorrect && (
        <Button
          onClick={onTryAgain}
          className={styles.button} // Apply the scoped class
        >
          Try Again
        </Button>
      )}

      {/* Feedback Message */}
      {isSubmitted && isCorrect !== null && (
        <div style={{ color: isCorrect ? 'green' : 'red', fontWeight: 'bold', marginTop: '10px' }}>
          {isCorrect
            ? 'Correct answer! You can proceed to the next step.'
            : 'Wrong answer. Please try again.'}
        </div>
      )}
    </div>
  );
};

export default QuestionComponent;