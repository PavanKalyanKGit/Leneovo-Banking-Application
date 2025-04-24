import React, { useState,useEffect } from 'react';
import { execeuteToast } from '../ToasterFunction/ToasterFunction';
import toast, { Toaster } from 'react-hot-toast';
import useSession from './UseSession';
import './log.css';

const Contact = () => {
    
  const [accountNumber, setAccountNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const [responseMessage, setResponseMessage] = useState('');
  const { currentUserData, isTokenExpired, fetchBasicUserData } = useSession();

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  let UserName = currentUserData
  ? `${currentUserData.firstName} ${currentUserData.lastName}`
  : 'User';
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

   useEffect(() => {
      const userSessionData = JSON.parse(sessionStorage.getItem('user'));
      if (userSessionData && userSessionData.accountNumber) {
        setAccountNumber(userSessionData.accountNumber);
      } else {
        execeuteToast("error", "Session expired. Please login.");
        window.location.href = '/login';
      }
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const complaintData = { 
        userEmailID:subject, configParam:content ,userAccountNumber:accountNumber
    };

    if (!subject || !content ||!accountNumber) {
        execeuteToast("error", "Please fill in all fields before submitting your complaint.");
      setResponseMessage('Please fill in all fields before submitting your complaint.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/user/logged/contact', {
        method: 'POST',
        headers: {
           'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaintData),
      });

      if (response.ok) {
        execeuteToast("success","Complaint submitted successfully. Thank you for reaching out!");
        setResponseMessage('Complaint submitted successfully. Thank you for reaching out!');
        setSubject('');
        setContent('');
      } else {
        execeuteToast("error","There was an error submitting your complaint. Please try again later.");
        setResponseMessage('There was an error submitting your complaint. Please try again later.');
      }
    } catch (error) {
        execeuteToast("error","Network error. Please try again later.");
      setResponseMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="contact-container">
      <div className="banking-details">
      <h2>Hi, {UserName}</h2>
     <span> <strong>What issue are you facing? </strong></span>
        <p>We’re here to assist you with any banking queries or complaints you may have. Here are our contact details:</p>
        <ul>
          <li><strong>Bank Name:</strong> Lenovo Bank</li>
          <li><strong>Phone:</strong> +123 456 7890</li>
          <li><strong>Email:</strong> support@lenoevobank.com</li>
          <li><strong>Address:</strong> 1234 Bank St, Cityville</li>
        </ul>
        <p>If you prefer a quicker resolution, feel free to call or email us directly!</p>
      </div>

      <div className="complaint-form">
        <h3>Submit a Complaint</h3>
        <p>For any issues you have with our services, please fill out the form below. We strive to resolve issues as quickly as possible!</p>
        <form onSubmit={handleSubmit}   >
          <div className="form-field">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
              required
              placeholder="Enter the subject of your complaint"
            />
          </div>

          <div className="form-field">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              required
              placeholder="Describe your issue in detail"
            ></textarea>
          </div>

          <button className="submitButton" type="submit">
            Submit Complaint
          </button>
        </form>

        {responseMessage && <p className="response-message">{responseMessage}</p>}
      </div>
      <Toaster/>
    </div>
  );
};

export default Contact;
