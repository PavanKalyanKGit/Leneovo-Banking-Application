import React from 'react';

const LoanAndFinancialDetails = () => {
  const containerStyle = {
    width: '90%',
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#0065a0',
    fontSize: '2rem',
    fontWeight: 'bold',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    marginBottom: '20px',
  };

  const cardHeadingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#00b4d8',
    fontSize: '1.5rem',
    fontWeight: '600',
  };

  const cardParagraphStyle = {
    marginBottom: '15px',
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#333',
  };

  const cardStrongStyle = {
    fontWeight: 'bold',
    color: '#0065a0',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Loan and Financial Details</h1>

      {/* Responsive CSS */}
      <style>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 1200px) {
          .grid-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .grid-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="grid-container">
        {/* Gold Loan Section */}
        <div style={cardStyle}>
          <h2 style={cardHeadingStyle}>Gold Loan</h2>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Interest Rate:</strong> 9% - 18% per annum</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Loan Amount:</strong> ₹10,000 - ₹10,00,000</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Loan Tenure:</strong> 6 months to 36 months</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Processing Fee:</strong> 0.5% to 1.5% of loan amount</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Eligibility:</strong> No minimum income requirement, based on the value of the gold pledged</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Loan-to-Value Ratio:</strong> 60% - 90% of the gold value</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Prepayment Charges:</strong> 0.5% - 2% of the loan amount</p>
        </div>

        {/* Interest Rates Section */}
        <div style={cardStyle}>
          <h2 style={cardHeadingStyle}>Interest Rates (Across Various Loans)</h2>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Personal Loan:</strong> 10% - 24% per annum</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Home Loan:</strong> 6.5% - 9% per annum</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Vehicle Loan:</strong> 7% - 13% per annum</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Education Loan:</strong> 8% - 14% per annum</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Gold Loan:</strong> 9% - 18% per annum</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Business Loan:</strong> 10% - 20% per annum</p>
        </div>

        {/* House Loan Section */}
        <div style={cardStyle}>
          <h2 style={cardHeadingStyle}>House Loan</h2>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Loan Amount:</strong> ₹1,00,000 - ₹10,00,00,000 (depends on property value)</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Interest Rate:</strong> 6.5% - 9% per annum</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Loan Tenure:</strong> 10 years - 30 years</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Eligibility:</strong> Minimum income of ₹20,000 per month</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Processing Fee:</strong> ₹5,000 - ₹15,000</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Prepayment Penalty:</strong> Generally none (if on floating rate)</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>EMI Calculation Example:</strong> ₹10 lakh loan at 8% interest for 20 years: Approx. ₹8,300/month</p>
        </div>

        {/* Vehicle Loan Section */}
        <div style={cardStyle}>
          <h2 style={cardHeadingStyle}>Vehicle Loan</h2>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Loan Amount:</strong> ₹50,000 - ₹2,000,000</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Interest Rate:</strong> 7% - 13% per annum</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Loan Tenure:</strong> 1 year - 7 years</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Eligibility:</strong> Minimum income of ₹15,000 per month</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Processing Fee:</strong> ₹1,000 - ₹5,000</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Down Payment:</strong> 10% - 20% of the vehicle’s value</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Prepayment Charges:</strong> 1% - 2% of the loan amount</p>
        </div>

        {/* Fixed Deposits Section */}
        <div style={cardStyle}>
          <h2 style={cardHeadingStyle}>Fixed Deposits (FD)</h2>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Interest Rate:</strong> 5% - 8% per annum (varies by tenure)</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Tenure:</strong> 1 month - 10 years</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Minimum Deposit:</strong> ₹1,000 - ₹10,000</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Maturity Amount Calculation:</strong> ₹1,00,000 invested at 7% p.a. for 5 years: Approx. ₹1,40,710 at maturity</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>TDS:</strong> Tax Deducted at Source on interest earned if above ₹40,000 (for individuals below 60)</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Senior Citizens:</strong> 0.5% higher interest rate</p>
        </div>

        {/* Credit Card Section */}
        <div style={cardStyle}>
          <h2 style={cardHeadingStyle}>Credit Card</h2>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Interest Rate:</strong> 1.5% - 3.5% per month (18% - 42% annual rate)</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Annual Fee:</strong> ₹500 - ₹5,000 (depends on card type and benefits)</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Cashback:</strong> 0.5% - 5% on selected categories</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Late Payment Fee:</strong> ₹500 - ₹1,500</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Credit Limit:</strong> ₹10,000 - ₹10,00,000</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Rewards Points:</strong> Earn 1 - 10 points per ₹100 spent</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Foreign Transaction Fee:</strong> 2% - 3% on international purchases</p>
        </div>

        {/* Debit Card Section */}
        <div style={cardStyle}>
          <h2 style={cardHeadingStyle}>Debit Card</h2>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Annual Fee:</strong> ₹0 - ₹500</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>ATM Withdrawal Limit (Domestic):</strong> ₹10,000 - ₹50,000 per day</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>ATM Withdrawal Limit (International):</strong> ₹10,000 - ₹20,000 per day</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Cashback/Offers:</strong> Occasionally offers on selected transactions or spending</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Foreign Transaction Fee:</strong> 1% - 3% on international withdrawals</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>Overdraft Facility:</strong> Available on select premium debit cards</p>
          <p style={cardParagraphStyle}><strong style={cardStrongStyle}>EMI Facility:</strong> Available on high-value purchases</p>
        </div>
      </div>
    </div>
  );
};

export default LoanAndFinancialDetails;
