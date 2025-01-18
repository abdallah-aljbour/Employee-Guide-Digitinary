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
import { jsPDF } from "jspdf"; // Import jsPDF
import styles from "./Exam.module.scss";

const Exam: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [examFinished, setExamFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({}); // Track user answers
  const navigate = useNavigate();

  // Exam questions (replace with your actual questions)
  const questions = [
    {
      id: "q1",
      question: "What is 2 + 2?",
    },
    {
      id: "q2",
      question: "What is the capital of France?",
    },
  ];

  // Function to stop the camera and microphone
  const stopMediaStream = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop(); // Stop each track
      });
      setMediaStream(null); // Clear the mediaStream state
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null; // Clear the video source
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
          videoRef.current.play(); // Ensure the video plays
        }
      } catch (err) {
        console.error("Error accessing camera and microphone:", err);
        setError("Camera and microphone access is required to take the exam.");
      }
    };

    enableCameraAndMicrophone();

    // Cleanup
    return () => {
      stopMediaStream(); // Stop camera and microphone when the component unmounts
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
        // Terminate the exam if the user switches tabs
        setExamFinished(true);
        stopMediaStream(); // Stop camera and microphone
        alert("Exam terminated because you switched tabs or minimized the window.");
        navigate("/exam-finished", { state: { reason: "You switched tabs or minimized the window." } });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
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

  // Generate and download PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(18);
    doc.text("Exam Results", 10, 10);

    // Add questions and answers
    let yPosition = 20; // Starting Y position for content
    questions.forEach((q) => {
      doc.setFontSize(12);
      doc.text(`Question: ${q.question}`, 10, yPosition);
      doc.text(`Answer: ${userAnswers[q.id] || "No answer provided"}`, 10, yPosition + 10);
      yPosition += 20; // Move down for the next question
    });

    // Save the PDF
    doc.save("exam-results.pdf");
  };

  // Handle exam submission
  const handleSubmitExam = () => {
    stopMediaStream(); // Stop camera and microphone
    generatePDF(); // Generate and download the PDF
    alert("Exam submitted successfully! Your results have been downloaded.");
    navigate("/exam-completed"); // Navigate to a "Thank You" page or home page
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
          </div>

          <div className={styles.section}>
            <h3>Exam Questions</h3>
            <div className={styles.questions}>
              {questions.map((q) => (
                <div key={q.id} className={styles.questionCard}>
                  <h4>{q.question}</h4>
                  <input
                    type="text"
                    placeholder="Your answer"
                    value={userAnswers[q.id] || ""}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  />
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