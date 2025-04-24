import React from 'react';
import './log.css';

const BankCard = () => {
  return (
    <div className="debit-card">
      <div className="card-front">
        <div className="card-number">1234 5678 9876 5432</div>
        <div className="card-details">
          <div className="card-name">John Doe</div>
          <div className="card-expiry">12/25</div>
        </div>
        <div className="card-chip">
          <img src="https://via.placeholder.com/50x50?text=Chip" alt="Chip" />
        </div>
      </div>
      <div className="card-back">
        <div className="mag-stripe"></div>
        <div className="signature-area">
          <span>John Doe</span>
        </div>
      </div>
    </div>
  );
};

export default BankCard;
