import React, { useState, useEffect } from 'react';

interface TimerProps {
  initialTime: number; // Initial time in seconds
  incorrectAttempts: number; // Number of incorrect attempts
  maxAttempts: number; // Maximum allowed incorrect attempts before showing the timer
  onTimeout: () => void; // Callback when the timer reaches 0
}

const Timer: React.FC<TimerProps> = ({ initialTime, incorrectAttempts, maxAttempts, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [showTimer, setShowTimer] = useState(false);

  // Show the timer when incorrect attempts reach the maxAttempts threshold
  useEffect(() => {
    if (incorrectAttempts >= maxAttempts) {
      setShowTimer(true);
      setTimeLeft(initialTime); // Reset the timer when it's shown
    }
  }, [incorrectAttempts, maxAttempts, initialTime]);

  // Handle the timer countdown
  useEffect(() => {
    if (showTimer && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); // Decrement every second

      return () => clearInterval(interval); // Cleanup interval on unmount
    } else if (showTimer && timeLeft === 0) {
      setShowTimer(false); // Hide the timer
      onTimeout(); // Trigger the timeout callback
    }
  }, [showTimer, timeLeft, onTimeout]);

  if (!showTimer) {
    return null; // Don't render anything if the timer shouldn't be shown
  }

  return (
    <div style={{ color: 'red', fontWeight: 'bold' }}>
      You have answered incorrectly {incorrectAttempts} times. Please review the content carefully.
      <br />
      The test will restart in {timeLeft} second(s).
    </div>
  );
};

export default Timer;