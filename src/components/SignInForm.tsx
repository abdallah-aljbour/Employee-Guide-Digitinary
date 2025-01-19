import { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../firebase";
import style from "../scssStyle/signIn.module.scss";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    set(ref(db, "data/" + Date.now()), {
      username,
      password,
    })
      .then(() => {
        alert("Data saved successfully!");
        setUsername("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  return (
    <div className={style.topContainer}>
      <form onSubmit={handleSubmit}>
        <h1 className={style.heading}>Sign In</h1>
        <div className={style.inputWrapper}>
          <input
            className={style.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder=" "
            required
          />
          <label className={style.label}>Username</label>
        </div>
        <div className={style.inputWrapper}>
          <input
            className={style.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            required
          />
          <label className={style.label}>Password</label>
        </div>
        <button type="submit" className={style.button}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
