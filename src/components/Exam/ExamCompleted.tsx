import React from "react";
import styles from "./ExamCompleted.module.scss";

const ExamCompleted: React.FC = () => {
  return (
    <div className={styles.examCompleted}>
      <h2>Thank You!</h2>
      <div className={styles.card}>
        <div className={styles.overview}>
          <h3>Exam Submission Complete</h3>
          <p>Your exam has been submitted successfully.</p>
        </div>
        <div className={styles.section}>
          <h4>Next Steps</h4>
          <ol>
            <li>
              <strong>Results:</strong> Your exam results will be processed and available soon.
            </li>
            <li>
              <strong>Notification:</strong> You will receive an email when your results are ready.
            </li>
          </ol>
        </div>
        <div className={styles.examButtonContainer}>
          <button className={styles.examButton} onClick={() => window.location.href = '/'}>
            Return to Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamCompleted;