import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../scssStyle/signin.module.scss";
import Button from "./Button";
import InputField from "./InputField";
import RegexValidation from "./RegexValidation"; 

type Department = "Front end" | "Backend" | "DevOps" | "HR" | "QA";

const SignInForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState<Department>("Front end");

  const departments: Department[] = ["Front end", "Backend", "DevOps", "HR", "QA"];

  // Regex patterns
  const usernamePattern = /^[a-zA-Z0-9_]{4,16}$/; // Alphanumeric, 4-16 characters
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 chars, 1 letter, 1 number

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if inputs are valid
    const isUsernameValid = usernamePattern.test(username);
    const isPasswordValid = passwordPattern.test(password);

    if (!isUsernameValid || !isPasswordValid) {
      alert("Please fix the errors in the form before submitting.");
      return;
    }

    // Save to localStorage
    localStorage.setItem("userInfo", JSON.stringify({ username, department }));

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

          {/* Username Input */}
          <div className={styles["input-wrapper"]}>
            <InputField
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              required
              label="Username"
              className={styles["input-wrapper"]}
              inputClassName={styles.input}
              labelClassName={styles.label}
            />
            {/* Place RegexValidation inside the same wrapper as the InputField */}
            <RegexValidation
              pattern={usernamePattern}
              value={username}
              errorMessage="Username must be 4-16 characters and alphanumeric."
            />
          </div>

          {/* Password Input */}
          <div className={styles["input-wrapper"]}>
            <InputField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
              label="Password"
              className={styles["input-wrapper"]}
              inputClassName={styles.input}
              labelClassName={styles.label}
            />
            {/* Place RegexValidation inside the same wrapper as the InputField */}
            <RegexValidation
              pattern={passwordPattern}
              value={password}
              errorMessage="Password must be at least 8 characters, with 1 letter and 1 number."
            />
          </div>

          {/* Department Select Input */}
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

          {/* Submit Button */}
          <Button type="submit" className={styles.button}>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;