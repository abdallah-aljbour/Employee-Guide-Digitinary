// src/components/ExamFinished/ExamFinished.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./ExamFinished.module.scss";
import { useNavigate } from "react-router-dom";

const ExamFinished: React.FC = () => {
  const location = useLocation();
  const reason = location.state?.reason || "Unknown reason";
  const navigate = useNavigate();
  navigate("/")

  return (
    <div className={styles.examFinished}>
      <h2>Exam Terminated</h2>
      <p>{reason}</p>
      <p>Please contact your administrator for further instructions.</p>
    </div>
  );
};

export default ExamFinished;