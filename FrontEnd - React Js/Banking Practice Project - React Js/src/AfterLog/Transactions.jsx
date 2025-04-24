import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { execeuteToast } from '../ToasterFunction/ToasterFunction';
import toast, { Toaster } from 'react-hot-toast';
import "primereact/resources/themes/mira/theme.css";
import './log.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const userSessionData = JSON.parse(sessionStorage.getItem('user'));
    if (userSessionData && userSessionData.accountNumber) {
      fetchTransactions(userSessionData.accountNumber);
    } else {
      execeuteToast("error", "Session expired. Please login.");
      window.location.href = '/login';
    }
  }, []);

  const fetchTransactions = async (accountNumber) => {
    if (!accountNumber) {
      setLoading(false);
      execeuteToast("error", "Something went wrong. Please logout and login.");
      return;
    }

    let data = "";
    try {
      const response = await fetch('http://localhost:8080/user/logged/transactions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userAccountNumber: accountNumber })
      });

      data = await response.json();

      if (response.ok) {
        setTransactions(data);
      } else {
        execeuteToast("error", data.message);
        setTransactions([]);
      }
    } catch (error) {
      execeuteToast("error", "Error fetching transactions.");
      console.error('Error fetching transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  let debitAmount = 0;
  let creditAmount = 0;
  if (transactions.length !== 0) {
    transactions.forEach((transaction) => {
      if (transaction.transactionType === 'CREDIT') {
        creditAmount += transaction.transactionAmount;
      } else {
        debitAmount += transaction.transactionAmount;
      }
    });
  }

  const getCardClass = (transaction) => {
    let cardClass = 'transaction-card';

    if (transaction.transactionType === 'CREDIT') {
      cardClass += ' credit-card';
    } else if (transaction.transactionType === 'DEBIT') {
      cardClass += ' debit-card';
    }

    if (transaction.transactionStatus === 'SUCCESS') {
      cardClass += ' success-status';
    } else if (transaction.transactionStatus === 'FAIL') {
      cardClass += ' failed-status';
    }

    return cardClass;
  };

  return (
    <>
      <div className='refreshButton' onClick={() => fetchTransactions(senderAccountNumber)}>
        <i className="pi pi-refresh" style={{ fontSize: '1.5rem' }}></i>
      </div>
      <div className="transactions-container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : transactions.length === 0 ? (
          <div className="no-transactions">No Transactions Found Yet.</div>
        ) : (
          <div className="transactions-list">
            {transactions.map((transaction) => (
              <div key={transaction.uniqueId} className={getCardClass(transaction)}>
                <div className="transaction-header">
                  <h3>Transaction ID: {transaction.transactionId}</h3>
                </div>
                <div className="transaction-body">
                  <p><strong>Sender Account:</strong> {transaction.senderAccountNumber}</p>
                  <p><strong>Receiver Account:</strong> {transaction.receiverAccountNumber}</p>
                  <p><strong>Sender Name:</strong> {transaction.senderName}</p>
                  <p><strong>Receiver Name:</strong> {transaction.receiverName}</p>
                  <p><strong>Amount:</strong> ${transaction.transactionAmount}</p>
                  <p><strong>Date:</strong> {transaction.transactionDate}</p>
                  <p><strong>Type:</strong> {transaction.transactionType || 'Pending'}</p>
                  <p><strong>Status:</strong> {transaction.transactionStatus || 'Pending'}</p>
                  <p><strong>Description:</strong> {transaction.description || 'No Description'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default Transactions;
