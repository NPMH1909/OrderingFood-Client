import React, { useState } from "react";
import "./resetpassword.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mock API call simulation
    const emailExists = email === "example@example.com"; // Replace with actual check

    if (emailExists) {
      setMessage("Link has been sent to your email.");
      // Here you could add logic to send an actual email reset request
    } else {
      setMessage("Email not found. Redirecting to login...");
      setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
    }
  };

  return (
    <div className="addUser">
      <h3>Reset Password</h3>
      <form onSubmit={handleSubmit} className="resetPasswordForm">
        <div className="inputGroup">
          <label htmlFor="email">Enter your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            required
          />
          <p style={{ textAlign: "right" }}>You have Account?
          <Link to="/" type="submit">Login</Link> 
          </p>
          <button type="submit" className="btn btn-primary">
            Send to email
          </button>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ResetPassword;
