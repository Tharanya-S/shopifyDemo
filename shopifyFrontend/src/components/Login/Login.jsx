import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (email.trim()) {
      try {
        const res = await fetch("http://localhost:7777/api/auth/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        if (res.ok) {
          alert("OTP sent to your email.");
        } else {
          alert(data.message || "Failed to send OTP.");
        }
      } catch (err) {
        console.error("Send OTP Error:", err);
        alert("Error sending OTP.");
      }
    }
  };
  
  const handleLogin = async () => {
    if (otp.trim() && email.trim()) {
      try {
        const res = await fetch("http://localhost:7777/api/auth/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        });

        const data = await res.json();
        if (res.ok) {
          onLogin(email); // updates App state
          navigate("/home"); // go to home
        } else {
          alert(data.message || "Invalid OTP.");
        }
      } catch (err) {
        console.error("Verify OTP Error:", err);
        alert("Error verifying OTP.");
      }
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="input-row">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </div>

        <div className="input-row">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
