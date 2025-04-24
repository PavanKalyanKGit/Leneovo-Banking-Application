import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Log_and_Reg/Home';
import Services from './Log_and_Reg/Services';
import Login from './Log_and_Reg/Login';
import Register from './Log_and_Reg/Register';
import ForgotPassword from './Log_and_Reg/ForgotPassword';
import LoginHomePage from './AfterLog/LoginHomePage';
import ToastNotification from './Log_and_Reg/ToastNotification';
import Dashboard from './AfterLog/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        <Route path="/login-home" element={<LoginHomePage />} /> 
        <Route path="/toast" element={<ToastNotification />} /> 
        {/* <Route path="/dashboard" element={<Dashboard />} />  */}


      </Routes>
    </Router>
  );
};

export default App;
