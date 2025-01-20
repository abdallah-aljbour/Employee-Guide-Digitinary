import React from "react";
import styles from "./ExamCompleted.module.scss";
import Button from "../Button"; 

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
              <strong>Results:</strong> Your exam results you see it in the pdf.
            </li>
            <li>
              <strong>Notification:</strong> You will receive an email if the leader want any thing from you.
            </li>
          </ol>
        </div>
        <div className={styles.examButtonContainer}>
          <Button
            onClick={() => (window.location.href = "/")}
            className={styles.examButton}
          >
            Return to Home Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamCompleted;