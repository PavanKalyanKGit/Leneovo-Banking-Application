import React from "react";
import './Home.css';
import { Link } from 'react-router-dom'; 
import logo from './BankLogo.jpg'; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="content">
        {/* <img src={logo} alt="Lenovo Bank Logo" className="logo" />  */}
          <h1 className="welcome-text">Welcome to <b>Lenovo </b> Bank</h1>
          <p className="intro-text">
            Secure and reliable banking at your fingertips. Manage your finances with ease and convenience.
          </p>
          <Link to="/services" className="buttonexplore">
          <button className="explore-button">Explore Services</button>
          </Link>
        </div>
      </div>

      <div className="cta-section">
        <h2 className="cta-title">Start Banking with Us Today</h2>
        <p className="cta-text">Join <strong>Lenovo </strong>Bank now to experience the best in banking services.</p>
        <Link to="/register" className="registerButton">
        <button className="cta-button">Open an Account</button>
        </Link>
        <Link to="/login" className="loginButton">
        <button className="cta-button">Login to Account</button>
        </Link>

      </div>
     
      <div className="features-section">
        <h2 className="section-title">Our Key Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <div>
            <h3>Secure Transactions</h3>
            <p>Make safe and secure payments with cutting-edge encryption technology.</p></div>
          </div>
          <div className="feature-card"><div>
            <h3>24/7 Support</h3>
            <p>Get assistance whenever you need it with our round-the-clock support.</p></div>
          </div>
          <div className="feature-card"><div>
            <h3>Easy Account Management</h3>
            <p>Access your accounts and track transactions effortlessly through our mobile app.</p></div>
          </div>
          <div className="feature-card"><div>
                <h3>Fast Processing</h3>
             <p>Experience lightning-fast transaction processing, ensuring a smooth and efficient service.</p></div>
            </div>
        </div>
      </div>
    
    </div>
  );
};

export default Home;
