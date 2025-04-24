import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'primeicons/primeicons.css';
import './LoginHome.css';
import Dashboard from './Dashboard'; 
import Transactions from './Transactions'; 
import toast, { Toaster } from 'react-hot-toast';
import Footer from './Footer';
import Contact from './Contact'; 
import Profile from './Profile'; 

const LoginHomePage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('dashboard'); 

  const toggleNav = () => {
    setIsNavOpen((prevState) => !prevState);
  };

  const navMenu = document.querySelector('.nav-menu')

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    if (isConfirmed) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      window.location.href = '/';
    }
  };


  const renderComponent = () => {
    switch (currentComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      case 'contact':
        return <Contact />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <div className="header_Comp">
        <div className="hamburger-menu" onClick={toggleNav}>
          <i className="pi pi-bars" style={{ fontSize: '2rem' }}></i>
        </div>
        <div className="webName">
          <h3 className="BankName">
            Lenovo Banking
          </h3>
        </div>
        <div className={`NavBar ${isNavOpen ? 'open' : ''}`}>
          <div className="HeaderLinks">
            <button
              className={`ComponetButtons ${currentComponent === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentComponent('dashboard')}
            >
              <i className="pi pi-home" style={{ fontSize: '1rem' }}></i> Dashboard
            </button>
            <button
              className={`ComponetButtons ${currentComponent === 'transactions' ? 'active' : ''}`}
              onClick={() => setCurrentComponent('transactions')}
            >
              <i className="pi pi-chart-line" style={{ fontSize: '1rem' }}></i> Transactions
            </button>
            <button
              className={`ComponetButtons ${currentComponent === 'contact' ? 'active' : ''}`}
              onClick={() => setCurrentComponent('contact')}
            >
              <i className="pi pi-inbox" style={{ fontSize: '1rem' }}></i> Contact
            </button>
            <button
              className={`ComponetButtons ${currentComponent === 'profile' ? 'active' : ''}`}
              onClick={() => setCurrentComponent('profile')} 
            >
              <i className="pi pi-user" style={{ fontSize: '1rem' }}></i> Profile
            </button>
          </div>
          <div className="logoutBuuton">
            <button
              className="ComponetButtons" id="signout"
              onClick={handleLogout} 
            >
              <i className="pi pi-sign-out" style={{ fontSize: '1rem' }}></i> Logout
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '100px' }}>
        {renderComponent()}
      </div>
      <Toaster />
      <Footer/>
    </div>
  );
};

export default LoginHomePage;
