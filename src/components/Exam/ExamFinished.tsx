import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ExamFinished.module.scss";

const ExamFinished: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reason = location.state?.reason || "Unknown reason";

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.examFinished}>
      <h2>Exam Terminated</h2>
      <div className={styles.card}>
        <div className={styles.alertSection}>
          <div className={styles.iconContainer}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 9v5M12 17.01l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3>Termination Reason</h3>
          <p className={styles.reason}>{reason}</p>
        </div>

        <div className={styles.infoSection}>
          <h4>Next Steps</h4>
          <p>Please contact your administrator for further instructions.</p>
          <ul>
            <li>Take a screenshot of this page for reference</li>
            <li>Contact technical support with the termination reason</li>
            <li>Wait for further instructions before retaking the exam</li>
          </ul>
        </div>

        <div className={styles.buttonContainer}>
          <button onClick={handleReturnHome} className={styles.returnButton}>
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamFinished;