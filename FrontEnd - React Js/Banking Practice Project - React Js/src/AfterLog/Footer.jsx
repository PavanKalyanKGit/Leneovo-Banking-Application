import { fontWeight } from '@mui/system';
import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={contentStyle}>
        <p style={textStyle}>© 2025 All Rights Reserved</p>
        <div style={linksContainerStyle}>
          <a href="/privacy-policy" style={linkStyle}>Privacy Policy</a>
          <span style={separatorStyle}>|</span>
          <a href="/terms" style={linkStyle}>Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

const footerStyle = {
  background: 'linear-gradient(to left, #004d7a, #00b4d8)',
  color: 'white',
  padding: '10px 0',
  position: 'relative',
  bottom: '0',
  width: '100%',
  height: '100px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  fontWeight:'bold'
};

const contentStyle = {
  textAlign: 'center',
  width: '100%',
};

const textStyle = {
  margin: '5px 0',
  color: 'white', // Ensuring the text color is white
};

const linksContainerStyle = {
  margin: '10px 0',
};

const linkStyle = {
  color: 'white', // Ensuring the link color is white
  textDecoration: 'none',
  margin: '0 15px',
};

const separatorStyle = {
  color: 'white', // Ensuring separator color is white
  margin: '0 5px',
};

const mediaQueries = {
  '@media (max-width: 768px)': {
    footerStyle: {
      padding: '15px 0',
    },
    textStyle: {
      fontSize: '14px',
    },
    linkStyle: {
      margin: '0 10px',
    },
  },
  '@media (max-width: 480px)': {
    footerStyle: {
      padding: '20px 0',
    },
    textStyle: {
      fontSize: '12px',
    },
    linksContainerStyle: {
      flexDirection: 'column',
      margin: '10px 0',
    },
    linkStyle: {
      margin: '5px 0',
    },
    separatorStyle: {
      display: 'none',
    },
  },
};

const applyMediaQueries = (styles) => {
  const currentWidth = window.innerWidth;
  let updatedStyles = { ...styles };

  Object.keys(mediaQueries).forEach((query) => {
    const [key, value] = query.split(' ');
    if (key === '@media' && currentWidth <= parseInt(value.split('px')[0])) {
      updatedStyles = { ...updatedStyles, ...mediaQueries[query] };
    }
  });

  return updatedStyles;
};

export default Footer;
