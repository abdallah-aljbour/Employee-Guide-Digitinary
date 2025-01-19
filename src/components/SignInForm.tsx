// import { useState } from "react";
// import styles from "../scssStyle/signin.module.scss";

// type Department = "Front end" | "Backend" | "DevOps" | "HR" | "QA";

// const SignInForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [department, setDepartment] = useState<Department>("Front end");

//   const departments: Department[] = ["Front end", "Backend", "DevOps", "HR", "QA"];

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Only proceed if Front end is selected
//     if (department === "Front end") {
//       // Save to localStorage
//       localStorage.setItem("userInfo", JSON.stringify({
//         username,
//         department
//       }));
      
//       console.log("Username:", username);
//       console.log("Department:", department);
//       alert("Sign In Successful!");
      
//       // Clear form
//       setUsername("");
//       setPassword("");
//       setDepartment("Front end");
//     } else {
//       alert("Only Front end department is currently active");
//     }
//   };

//   return (
//     <div className={styles["signin-page"]}>
//       <div className={styles["animated-balls"]} />
//       <div className={styles["top-container"]}>
//         <form onSubmit={handleSubmit} className={styles.form}>
//           <h1 className={styles.h1}>Sign In</h1>
//           <div className={styles["input-wrapper"]}>
//             <input
//               className={styles.input}
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder=" "
//               required
//             />
//             <label className={styles.label}>Username</label>
//           </div>
//           <div className={styles["input-wrapper"]}>
//             <input
//               className={styles.input}
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder=" "
//               required
//             />
//             <label className={styles.label}>Password</label>
//           </div>
//           <div className={styles["input-wrapper"]}>
//             <select
//               className={`${styles.input} ${styles.select}`}
//               value={department}
//               onChange={(e) => setDepartment(e.target.value as Department)}
//               required
//             >
//               {departments.map((dept) => (
//                 <option 
//                   key={dept} 
//                   value={dept}
//                   disabled={dept !== "Front end"}
//                 >
//                   {dept}
//                 </option>
//               ))}
//             </select>
//             <label className={styles.label}>Department</label>
//           </div>
//           <button type="submit" className={styles.button}>
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignInForm;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../scssStyle/signin.module.scss";

type Department = "Front end" | "Backend" | "DevOps" | "HR" | "QA";

const SignInForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState<Department>("Front end");

  const departments: Department[] = ["Front end", "Backend", "DevOps", "HR", "QA"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    localStorage.setItem("userInfo", JSON.stringify({
      username,
      department
    }));
    
    console.log("Username:", username);
    console.log("Department:", department);
    
    // Clear form
    setUsername("");
    setPassword("");
    setDepartment("Front end");

    // Navigate to home page
    navigate("/");
  };

  return (
    <div className={styles["signin-page"]}>
      <div className={styles["animated-balls"]} />
      <div className={styles["top-container"]}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.h1}>Sign In</h1>
          <div className={styles["input-wrapper"]}>
            <input
              className={styles.input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              required
            />
            <label className={styles.label}>Username</label>
          </div>
          <div className={styles["input-wrapper"]}>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label className={styles.label}>Password</label>
          </div>
          <div className={styles["input-wrapper"]}>
            <select
              className={`${styles.input} ${styles.select}`}
              value={department}
              onChange={(e) => setDepartment(e.target.value as Department)}
              required
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <label className={styles.label}>Department</label>
          </div>
          <button type="submit" className={styles.button}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;