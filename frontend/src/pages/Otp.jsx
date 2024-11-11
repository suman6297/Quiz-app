import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtpLogin = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1); // Step 1 - Request OTP, Step 2 - Verify OTP
  const navigate=useNavigate()

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/send-otp', { email });
      setMessage(response.data.message);
      setStep(2);
      navigate("/dashbord")

    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      setMessage(response.data.message);
      // Proceed to login or dashboard after successful verification
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="otp-login">
      <h2 className='text-center text-5xl'>OTP Login</h2>

      {step === 1 && (
        <div>
            <div className='flex m-8 text-center justify-center text-1xl'>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className=' border-2 border-solid border-black'
          />
          </div>
          <button onClick={handleSendOtp} className='block m-auto bg-orange-500 py-2 px-6 text-2xl rounded-2xl hover:bg-yellow-400'>Send OTP</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}

      {message && <p className='text-red-600'>{message}</p>}
    </div>
  );
};

export default OtpLogin;
