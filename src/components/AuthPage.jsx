import { useState } from "react";
import "./auth.css";
import { FaEye } from "react-icons/fa";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase.js";
import { IoMdEyeOff } from "react-icons/io";

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [Showpass, setShowpass] = useState(false);

  // Login and Registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    // Use optional chaining (?.) to avoid the crash
    const email = e.target.email?.value?.trim();
    const password = e.target.password?.value?.trim();
    const name = !isLogin ? e.target.name?.value?.trim() : null;

    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;

        const loggedInUser = {
          uid: user.uid,
          email: user.email,
          name: user.displayName || "User",
          avatar:
            user.photoURL ||
            `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${user.email}`,
        };

        alert("Login successful!");
        onLogin && onLogin(loggedInUser);
      } else {
        // --- REGISTER LOGIC ---
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        // Add Name and Avatar to the Firebase profile
        await updateProfile(userCredential.user, {
          displayName: name,
          photoURL: `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${name}`,
        });

        // Fix: Create a clean object with the NEW data to pass to App.js
        const updatedUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: name, // use the 'name' variable from your form
          avatar: `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${name}`,
        };

        alert("Registration successful!");
        // Firebase automatically logs them in after registration
        onLogin && onLogin(updatedUser);
      }
    } catch (error) {
      // Map Firebase error codes to user-friendly messages
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setMessage("Invalid email or password.");
      } else if (error.code === "auth/email-already-in-use") {
        setMessage("This email is already registered.");
      } else {
        setMessage(error.message);
      }
    }
  };

  //Forgot Password
  const handleForgotPassword = async () => {
    const email = prompt("Please enter your email address:");

    if (!email) return; // User cancelled the prompt

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent to your email!");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setMessage("No account found with this email.");
      } else {
        setMessage("Error sending reset email. Try again later.");
      }
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
            <button
              className="eye-btn"
              type="button"
              onClick={() => {
                setShowpass(!Showpass);
              }}
            >
              {Showpass ? <IoMdEyeOff /> : <FaEye />}
            </button>
          </div>

          {/* Forgot Password Link (Only show during Login mode) */}
          {isLogin && (
            <p className="forgot-link" onClick={handleForgotPassword}>
              Forgot Password?
            </p>
          )}

          <button className="auth-btn">{isLogin ? "Login" : "Register"}</button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage(""); // Clear errors when switching modes}
            }}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
