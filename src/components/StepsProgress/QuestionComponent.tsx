import React, { useState, useEffect } from 'react';
import CustomButton from './CustomButton'; 

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
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerChange = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer === correctAnswer) {
      setIsCorrect(true);
      onAnswerCorrect(true); // Notify parent that the answer is correct
    } else {
      setIsCorrect(false);
      onAnswerCorrect(false); // Notify parent that the answer is wrong
    }
    setIsSubmitted(true); // Hide the Submit button after submission
  };

  // Reset the state when the question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setIsCorrect(false);
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
        <CustomButton
          label="Submit"
          onClick={handleSubmit}
          disabled={!selectedAnswer}
        />
      )}

      {/* Try Again Button */}
      {isSubmitted && !isCorrect && (
        <CustomButton
          label="Try Again"
          onClick={onTryAgain}
        />
      )}

      {/* Feedback Message */}
      {isSubmitted && (
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