import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Mail, ArrowLeft } from "lucide-react";
import "./Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);
    
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setSuccess(true);
      setEmail(""); // Clear the input after success
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header with-back">
          <Link to="/" className="back-button">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="auth-title">Reset Password</h1>
            <p className="auth-subtitle">
              Enter your email to receive a password reset link
            </p>
          </div>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {success && (
          <div className="auth-success">
            Reset link sent! Check your email inbox.
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={18} />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`auth-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="auth-divider">
            <span>Remember your password?</span>
          </div>

          <Link to="/" className="auth-secondary-button">
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;