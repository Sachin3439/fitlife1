import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Forgetpass.css';
import Navbar from './Navbar';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=reset
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(300);

  // Countdown for OTP expiry
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const sendOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/send-otp', { email });
      setMessage(res.data.message);
      setStep(2);
      setTimer(300);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/verify-otp', { email, otp });
      setMessage(res.data.message);
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Invalid OTP');
    }
  };

  const resetPassword = async () => {
    try {
      const res = await axios.post('http://localhost:5000/reset-password', { email, newPassword });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div>
      <Navbar />
      <div id='for'>
        <div className="forget-password-wrapper">
          <h2>🔐 Forget Password</h2>

          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={sendOtp}>Send OTP</button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={verifyOtp}>Verify OTP</button>
              <p className="otp-timer">⏳ OTP expires in: {timer}s</p>
            </>
          )}

          {step === 3 && (
            <>
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button onClick={resetPassword}>Reset Password</button>
              <p><a href='/login' id="log">🔙 Back to Login</a></p>
            </>
          )}

          {message && <p className="response-msg">{message}</p>}
        </div>
      </div>
    </div>
  );
}
