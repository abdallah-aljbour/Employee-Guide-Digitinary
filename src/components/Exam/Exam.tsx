// // src/components/Exam/Exam.tsx
// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Exam.module.scss";

// const Exam: React.FC = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [examFinished, setExamFinished] = useState(false); // Track if the exam is finished
//   const navigate = useNavigate();

//   // Request camera and microphone access
//   useEffect(() => {
//     const enableCameraAndMicrophone = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//         setMediaStream(stream);
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (err) {
//         setError("Camera and microphone access is required to take the exam.");
//       }
//     };

//     enableCameraAndMicrophone();

//     // Cleanup
//     return () => {
//       if (mediaStream) {
//         mediaStream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   // Prevent tab navigation and handle tab switching
//   useEffect(() => {
//     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
//       event.preventDefault();
//       event.returnValue = ""; // Required for Chrome
//     };

//     const handleVisibilityChange = () => {
//       if (document.visibilityState !== "visible") {
//         // Terminate the exam if the user switches tabs
//         setExamFinished(true);
//         if (mediaStream) {
//           mediaStream.getTracks().forEach((track) => track.stop());
//         }
//         alert("Exam terminated because you switched tabs or minimized the window.");
//         navigate("/exam-finished", { state: { reason: "You switched tabs or minimized the window." } });
//       }
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     // Cleanup
//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, [mediaStream, navigate]);

//   // Monitor camera and microphone
//   useEffect(() => {
//     const checkMediaStream = () => {
//       if (mediaStream) {
//         const videoTracks = mediaStream.getVideoTracks();
//         const audioTracks = mediaStream.getAudioTracks();

//         if (videoTracks.length === 0 || !videoTracks[0].enabled) {
//           alert("Camera is required. Please turn it on.");
//         }
//         if (audioTracks.length === 0 || !audioTracks[0].enabled) {
//           alert("Microphone is required. Please turn it on.");
//         }
//       }
//     };

//     const interval = setInterval(checkMediaStream, 5000); // Check every 5 seconds

//     return () => clearInterval(interval);
//   }, [mediaStream]);

//   // Handle exam submission
//   const handleSubmitExam = () => {
//     if (mediaStream) {
//       mediaStream.getTracks().forEach((track) => track.stop()); // Stop camera and microphone
//     }
//     alert("Exam submitted successfully!");
//     navigate("/"); // Navigate back to the home page
//   };

//   return (
//     <div className={styles.examContainer}>
//       {error ? (
//         <p className={styles.error}>{error}</p>
//       ) : examFinished ? (
//         <p className={styles.error}>The exam was terminated because you switched tabs or minimized the window.</p>
//       ) : (
//         <>
//           <h2>Exam in Progress</h2>
//           <video ref={videoRef} autoPlay muted className={styles.video} />
//           <p>Please keep your camera and microphone on during the exam.</p>

//           {/* Exam Questions (Placeholder) */}
//           <div className={styles.questions}>
//             <h3>Question 1: What is 2 + 2?</h3>
//             <input type="text" placeholder="Your answer" />

//             <h3>Question 2: What is the capital of France?</h3>
//             <input type="text" placeholder="Your answer" />
//           </div>

//           {/* Submit Button */}
//           <button onClick={handleSubmitExam} className={styles.submitButton}>
//             Submit Exam
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Exam;
// src/components/Exam/Exam.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import styles from "./Exam.module.scss";

const Exam: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [examFinished, setExamFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 1 hour in seconds
  const navigate = useNavigate();

  // Exam questions (multiple-choice)
  const questions = [
    {
      id: "q1",
      question: "What is the primary advantage of using a micro-frontend architecture?",
      options: [
        "It reduces the need for testing.",
        "It allows independent teams to work on specific modules, ensuring scalability and modularity.",
        "It eliminates the need for version control.",
        "It increases the complexity of the project.",
      ],
      correctAnswer: "It allows independent teams to work on specific modules, ensuring scalability and modularity.",
    },
    {
      id: "q2",
      question: "What is the purpose of Digitinary-UI?",
      options: [
        "To manage backend APIs.",
        "To provide reusable UI components and maintain consistency across all modules.",
        "To handle database migrations.",
        "To automate deployment processes.",
      ],
      correctAnswer: "To provide reusable UI components and maintain consistency across all modules.",
    },
    {
      id: "q3",
      question: "Which repository is considered the core container repository for the project?",
      options: ["common-layout", "c360", "container", "User Management"],
      correctAnswer: "container",
    },
    {
      id: "q4",
      question: "What is the purpose of the Staging (STG) environment?",
      options: [
        "It is used for ongoing development.",
        "It is used for QA testing.",
        "It is a pre-production environment for client reviews.",
        "It is used for production deployment.",
      ],
      correctAnswer: "It is a pre-production environment for client reviews.",
    },
    {
      id: "q5",
      question: "What tool is used to create a new custom module in the project?",
      options: ["Redux", "Digitinary-UI", "The project’s CLI", "Context API"],
      correctAnswer: "The project’s CLI",
    },
  ];

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Stop media stream
  const stopMediaStream = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Request camera and microphone access
  useEffect(() => {
    const enableCameraAndMicrophone = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Error accessing camera and microphone:", err);
        if (err instanceof Error) {
          if (err.name === "NotAllowedError") {
            setError("Please allow camera and microphone access to proceed with the exam.");
          } else {
            setError("An error occurred while accessing your camera and microphone.");
          }
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };

    enableCameraAndMicrophone();

    return () => {
      stopMediaStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prevent tab navigation and handle tab switching
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        setExamFinished(true);
        stopMediaStream();
        alert("Exam terminated because you switched tabs or minimized the window.");
        navigate("/exam-finished", { state: { reason: "You switched tabs or minimized the window." } });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // Monitor camera and microphone
  useEffect(() => {
    const checkMediaStream = () => {
      if (mediaStream) {
        const videoTracks = mediaStream.getVideoTracks();
        const audioTracks = mediaStream.getAudioTracks();

        if (videoTracks.length === 0 || !videoTracks[0].enabled) {
          alert("Camera is required. Please turn it on.");
        }
        if (audioTracks.length === 0 || !audioTracks[0].enabled) {
          alert("Microphone is required. Please turn it on.");
        }
      }
    };

    const interval = setInterval(checkMediaStream, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [mediaStream]);

  // Handle user input changes
  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // Calculate score
  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  // Generate and download PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Exam Results", 10, 10);

    let yPosition = 20;
    questions.forEach((q) => {
      doc.setFontSize(12);
      doc.text(`Question: ${q.question}`, 10, yPosition);
      doc.text(`Your Answer: ${userAnswers[q.id] || "No answer provided"}`, 10, yPosition + 10);
      doc.text(`Correct Answer: ${q.correctAnswer}`, 10, yPosition + 20);
      yPosition += 30;
    });

    // Add score
    const score = calculateScore();
    doc.text(`Your Score: ${score}/${questions.length}`, 10, yPosition + 10);

    doc.save("exam-results.pdf");
  };

  // Handle exam submission
  const handleSubmitExam = () => {
    const isConfirmed = window.confirm("Are you sure you want to submit the exam?");
    if (isConfirmed) {
      stopMediaStream();
      generatePDF();
      alert("Exam submitted successfully! Your results have been downloaded.");
      navigate("/exam-completed");
    }
  };

  return (
    <div className={styles.examContainer}>
      {error ? (
        <div className={styles.card}>
          <p className={`${styles.error} ${styles.errorMessage}`}>{error}</p>
        </div>
      ) : examFinished ? (
        <div className={styles.card}>
          <p className={`${styles.error} ${styles.errorMessage}`}>
            The exam was terminated because you switched tabs or minimized the window.
          </p>
        </div>
      ) : (
        <>
          <h2>Exam in Progress</h2>
          <div className={styles.card}>
            <div className={styles.overview}>
              <div className={styles.videoContainer}>
                <video ref={videoRef} autoPlay muted className={styles.video} />
              </div>
              <p className={styles.instructions}>
                Please keep your camera and microphone on during the exam.
              </p>
              <p>Time Left: {`${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}</p>
            </div>

            <div className={styles.section}>
              <h3>Exam Questions</h3>
              <div className={styles.questions}>
                {questions.map((q) => (
                  <div key={q.id} className={styles.questionCard}>
                    <h4>{q.question}</h4>
                    {q.options.map((option, index) => (
                      <div key={index}>
                        <label>
                          <input
                            type="radio"
                            name={q.id}
                            value={option}
                            checked={userAnswers[q.id] === option}
                            onChange={() => handleAnswerChange(q.id, option)}
                          />
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.examButtonContainer}>
              <button onClick={handleSubmitExam} className={styles.examButton}>
                Submit Exam
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Exam;