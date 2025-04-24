import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Services.css'; // Assuming you will create this file

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/services');
        if (!response.ok) {
        //   throw new Error('Failed to fetch services');
        alert("Failed to fetch services");

        }
        const data = await response.json();

        setServices(data.serviceData || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="services-container">
        <div className="services-heading-div">
      <h2 className="services-heading">Our Services</h2>
      </div>
      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-title">
              <h3>{service.title}</h3>
            </div>
            <div className="service-description">
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="home-button-container">
        <Link to="/" className="home-button">Back to Home</Link>
      </div>
    </div>
  );
};

export default Services;
