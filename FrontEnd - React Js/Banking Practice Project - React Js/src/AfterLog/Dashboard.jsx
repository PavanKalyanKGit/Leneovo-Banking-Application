import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { execeuteToast } from '../ToasterFunction/ToasterFunction';
import toast, { Toaster } from 'react-hot-toast';
import 'primeicons/primeicons.css';
import BankDetails from './BankDetails';
import useSession from './UseSession';
import './log.css';
import "primereact/resources/themes/mira/theme.css";
import bankingLogo from './BankingPoster.png';

const Dashboard = () => {
  
  const [addBalanceVisible, setAddBalanceVisible] = useState(false);
  const [transferMoneyVisible, setTransferMoneyVisible] = useState(false);
  const [loanDetailsVisible, setLoanDetailsVisible] = useState(false);
  const [showCurrentBalance, setShowCurrentBalance] = useState(false);
  const [selfTransactionAmount, setSelfTransactionAmount] = useState('');

  const [receiverAccountNumber, setReceiverAccountNumber] = useState('');
  const [senderAccountNumber, setSenderAccountNumber] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [transactionAmount, setTransactionAmount] = useState(0.0); 
  const [transactionDate, setTransactionDate] = useState('');
  const [senderName, setSenderName] = useState('');
  const [description, setDescription] = useState('');

  const { currentUserData, isTokenExpired, fetchBasicUserData } = useSession();
  
  useEffect(() => {
    if (isTokenExpired) {
      alert("Session Expired. Please Login.");
      window.location.href = '/login';
    }
  }, [isTokenExpired]);

  const handleAddMoney = async (e) => {
    e.preventDefault(); 
  
    let amount = parseFloat(selfTransactionAmount);
    if (isNaN(amount)) {
      execeuteToast("error", "Please enter a valid number.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/user/update-balance', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailId: currentUserData.emailId,
          accountNumber: currentUserData.accountNumber,
          currentBalance: amount
        }),
      });
  
      if (response.ok) {
        execeuteToast("success", `Your balance has been updated by ${amount}. Please refresh and check.`);
        setAddBalanceVisible(false); 
      } else {
        throw new Error('Failed to update user data');
      }
    } catch (error) {
      execeuteToast("error", "Unable to add the balance because, " + error);
    }
  };
  

  useEffect(() => {
    if (showCurrentBalance) {
      const timer = setTimeout(() => {
        setShowCurrentBalance(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showCurrentBalance]);

  const handleLoanDetails = () => {
    setLoanDetailsVisible((prev) => !prev);
  };

  const handleShowBalance = () => {
    setShowCurrentBalance((prev) => !prev);
  };


  useEffect(() => {
  const userSessionData = JSON.parse(sessionStorage.getItem('user'));
  if(!userSessionData)
  {
    alert("Sessio expired. please login");
    window.location.href = '/login';
  }
  setSenderName(`${userSessionData.firstName || null } ${userSessionData.lastName || null}`);
  setSenderAccountNumber(userSessionData.accountNumber || null);
  // setTransactionDate(new Date().toISOString());
},[])


  let UserName = currentUserData
  ? `${currentUserData.firstName} ${currentUserData.lastName}`
  : 'User';
  let accountNumber = currentUserData ? currentUserData.accountNumber : 'Fetching ....'
//####################################################################################################
   let ToastID;
  const handleTransferFunds = async (e) => {
    e.preventDefault(); 

    if (isTokenExpired) {
      alert("Session Expired. Please Login.");
      window.location.href = '/login';
    }
    if(!currentUserData)
    {
      execeuteToast("error", "session expired please login...");
      return;
    }
    ToastID = execeuteToast("loading", "Transferring... Please wait.");
    // setValuesToFormData();
    if(senderAccountNumber == "" || senderAccountNumber == null || senderName == "" || senderName == null)
      {
        toast.dismiss(ToastID);
        execeuteToast("error", "Something went wrong ........ Please logout and login.");
        console.log(senderAccountNumber + " " +senderName + " " +transactionDate);
        return;
      } 
   let data = "";
    try {
      const response = await fetch('http://localhost:8080/user/logged/transaction', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receiverAccountNumber,
          senderAccountNumber,
          receiverName,
          transactionAmount,
          transactionDate:new Date().toISOString(),
          senderName,
          description}),
      });
      data = await response.json(); 
  
      if (response.ok) {
        toast.dismiss(ToastID);
        execeuteToast("success", data.message);
        setTransferMoneyVisible(false);
        setReceiverAccountNumber('')
        setTransactionAmount(0);
        setDescription('');
        setReceiverName('');
        setTransactionDate('');

      } else {
        toast.dismiss(ToastID);
        execeuteToast("error", data.message);
      }
    } catch (error) {
      toast.dismiss(ToastID);
      execeuteToast("error", data.message );
    }
  };


  let accountBalance = currentUserData? currentUserData.currentBalance : 'Fetching Balance....'


  return (
    <div className="dashboard_Comp">
      <div className="greeting">
        <div className="BasicInfo">
          <p className="name">
            Account Id: <span>{accountNumber}</span>
          </p>
        </div>
        <div className="BasicInfo">
          <p className="Balance">
            <span onClick={handleShowBalance}>
              {showCurrentBalance
                ? "Rs. " +accountBalance 
                : 'View Balance'}
            </span>
          </p>
        </div>
        <div className='BasicInfo' > <i onClick={fetchBasicUserData} className="pi pi-refresh" style={{ fontSize: '1.3rem' }}> </i></div>
        <div className="BasicInfo">
          <p className="name" id="NameId">
            Hello <span>{UserName || 'User'}</span>
          </p>
        </div>

      </div>

      <div className="ButtonsCallsParent">
        <div className="ButtonsCalls">
          <button
            className={addBalanceVisible ? 'buttonTrue' : 'button'}
            onClick={() => {
              if (loanDetailsVisible) {
                execeuteToast("error", "Please hide the loan details before proceeding");
                return;
              }
              setAddBalanceVisible(true);
            }}
          >
            Add Money
          </button>
        </div>

        <div className="ButtonsCalls">
          <button
            className={transferMoneyVisible ? 'buttonTrue' : 'button'}
            onClick={() => {
              if (loanDetailsVisible) {
                execeuteToast("error", "Please hide the loan details before proceeding");
                return;
              }
              setTransferMoneyVisible(true);
            }}
          >
            Transfer Money
          </button>
        </div>
        <div className="ButtonsCalls">
          <button
            className={loanDetailsVisible ? 'buttonTrue' : 'button'}
            onClick={handleLoanDetails}
          >
            {`${loanDetailsVisible ? 'Hide' : 'Show'} Loan Details`}
          </button>
        </div>
      </div>

      {loanDetailsVisible && <div className="loanDetails"><BankDetails /></div>}
      <div className="security-warning">
        <h3>Important Security Notice</h3>
        <p>
          For your safety, please remember:
          <ul>
            <li>Never share your OTP (One-Time Password) with anyone.</li>
            <li>Do not share your ATM card details.</li>
            <li>Keep your account details confidential.</li>
          </ul>
          Sharing this information with anyone could lead to unauthorized access to your account.
        </p>
      </div>

      <Dialog
        header=""
        visible={addBalanceVisible}
        onHide={() => setAddBalanceVisible(false)}
        style={{ width: '30vw' }}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      >
        <div className="Dialog">
          <form onSubmit={handleAddMoney}> 
          {/* handleAddMoney */}
            <div className="DialogBox">
              <h2>Add Balance to your Account</h2>
            </div>
            <div className="DialogBox">
              <input
                type="number"
                name="selfTransactionAmount"
                value={selfTransactionAmount}
                onChange={(e) => setSelfTransactionAmount(e.target.value)}
                required
                placeholder="Enter the amount"
              />
            </div>
            <div className="DialogBox">
              <input type="submit" value="Add"  />
            </div>
          </form>
        </div>
      </Dialog>

      <Dialog
  header=""
  visible={transferMoneyVisible}
  onHide={() => setTransferMoneyVisible(false)}
  style={{ width: '30vw' }}
  breakpoints={{ '960px': '75vw', '641px': '100vw' }}
>
  <div className="Dialog">
    <form onSubmit={handleTransferFunds}>
      <div className="DialogBox">
        <h2>Transfer Money</h2>
      </div>
      <div className="DialogBox">
        <label>Receiver Account Id</label>
        <input
          type="text"
          value={receiverAccountNumber}
          onChange={(e) => setReceiverAccountNumber(e.target.value)}
          required
          placeholder="Enter the Account Id"
        />
      </div>
      <div className="DialogBox">
        <label>Receiver Name</label>
        <input
          type="text"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
          required
          placeholder="Enter Receiver Name"
        />
      </div>
      <div className="DialogBox">
        <label>Amount</label>
        <input
          type="number"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
          required
          placeholder="Enter Amount"
        />
      </div>
      <div className="DialogBox">
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
        />
      </div>
      <div className="DialogBox">
        <input type="submit" value="Send Money" />
      </div>
    </form>
  </div>
</Dialog>


      <Toaster />
      <br />
      <div>
        <img src={bankingLogo} alt="Banking Poster" />
      </div>
    </div>
  );
}

export default Dashboard;
