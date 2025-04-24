import React, { useState,useRef} from 'react';
import './Login.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import toast, { Toaster } from 'react-hot-toast';
import { execeuteToast } from '../ToasterFunction/ToasterFunction';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if(email === "" || password === "")
        {
       execeuteToast("error","Please fill in all required fields before proceeding.");
          return;
        }
    const userRegister = {
      emailId: email,
      password: password,
    };

    let data = "";
    try {
      const response = await fetch('http://localhost:8080/user/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userRegister),
      });

     
       data = await response.json(); 

      if (response.ok) {
        execeuteToast("success",data.message);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
        setEmail('');
        setPassword('');
        navigate('/login-home');
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
        execeuteToast("error",data.message);
      }
    } catch (err) {
      console.error(err);
      execeuteToast("error",data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-section">
        <div className="login-content">
          <h1 className="login-title">Login</h1>
          
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input 
                type={passwordVisible ? 'text' : 'password'} 
                id="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <span onClick={togglePasswordVisibility} className="password-toggle">
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button className="login-btn" onClick={handleLogin}>Login</button>

          <div className="register-link">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </div>
      </div>
      <Toaster  />
    </div>
  );
};

export default Login;
