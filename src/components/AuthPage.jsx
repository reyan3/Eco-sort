import { useState } from "react";
import "./auth.css";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [Showpass, setShowpass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const name = isLogin ? null : e.target.name?.value.trim();
    const avatar = `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${name}`;

    // GET stored users
    let users = JSON.parse(localStorage.getItem("ecosort_users")) || [];

    if (isLogin) {
      // LOGIN
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        return setMessage("Incorrect email or password.");
      }

      // Save session
      localStorage.setItem("ecosort_loggedin", JSON.stringify(user));
      alert("Login successful!");
      onLogin && onLogin(user);
    } else {
      // REGISTER
      const exists = users.find((u) => u.email === email);
      if (exists) return setMessage("Email already registered.");

      const newUser = { avatar, name, email, password };
      users.push(newUser);

      // Save updated list
      localStorage.setItem("ecosort_users", JSON.stringify(users));
      alert("Registration successful! You can now login.");
      setIsLogin(true);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-circle">
          <div className="eco-leaf"></div>
        </div>

        <h2 className="headline-txt">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="subtitle">
          {isLogin
            ? "Login to Eco-Sort"
            : "Join Eco-Sort and start contributing"}
        </p>

        {message && <p className="msg-box">{message}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="auth-input"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="auth-input"
            required
          />

          <div className="pass-div">
            <input
              type={`${Showpass ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className="auth-input"
              required
            />
            <button className="eye-btn" type="button" onClick={() => {setShowpass(!Showpass)}}>
              {Showpass ? <IoMdEyeOff /> :<FaEye />}
            </button>
          </div>

          <button className="auth-btn">{isLogin ? "Login" : "Register"}</button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
