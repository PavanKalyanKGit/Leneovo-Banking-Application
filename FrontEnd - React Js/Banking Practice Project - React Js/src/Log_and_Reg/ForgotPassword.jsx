import React, { useState,useRef} from 'react';
import { execeuteToast } from '../ToasterFunction/ToasterFunction';
import toast, { Toaster } from 'react-hot-toast';
import './Register.css';
const ForgotPassword = () =>
{

  const [resendOTP, setResendOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [OTP, SetOTP] = useState('');
  const [OTPsent, SetOTPSent] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setshowPassword] = useState('');


  const handleRequestingOTP = async (e) => {
    e.preventDefault();
    if (email === '') {
      execeuteToast("error","Please fill in all required fields before proceeding.");
      return;
    }
    let data = "";
    let ToastID = execeuteToast("loading","Please hold while we process your OTP request...");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/user/send-otp?OTPPurpose=forgot-password", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({emailId: email}),
      });

      data = await response.json();
      if (response.ok) {
        setLoading(false);
        SetOTPSent(true);
        setResendOTP(true);
        toast.dismiss(ToastID);
        execeuteToast("success",data.message);

      } else {
        setLoading(false);
        toast.dismiss(ToastID);
        execeuteToast("error",data.message);

      }
    } catch (error) {
      setLoading(false);
      toast.dismiss(ToastID);
        execeuteToast("error",data.message);

    }
  };

  const handleVerifyOTPandUpdatePassword = async (e) => {
    e.preventDefault();
    if (OTP === '') {
      execeuteToast('error',"Enter the OTP before proceeding.");
      return;
    }
    if(password !== confirmPassword)
    {
      execeuteToast('error', 'Both Pasword and Confrim Password should be same.');
        return;
    }
    setLoading(true);
    let data = "";
    try {
      const response = await fetch(`http://localhost:8080/user/validate-forgot-otp?OTPFromUser=${OTP}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({emailId:email,password:password}),
      });
       data = await response.json();
      if (response.ok) {
        setLoading(false);
        SetOTPSent(false);
        SetOTP('');
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        execeuteToast("success",data.message);
      } else {
        alert("success  warn");
        setResendOTP(true);
        setLoading(false);
        SetOTP('');
        execeuteToast("error",data.message);
      }
    } catch (error) {
      setLoading(false);
      setResendOTP(true);
      SetOTP('')
      execeuteToast("error",data.message);
    }
  };


    return(
        <div className='outerContainer'>
         <form onSubmit={handleVerifyOTPandUpdatePassword}>
         <h1>Forgot Password</h1>
                <div className='innerDualContainer'>
                <div className='innerContainer'>
                <label>Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Mail id' />
                </div>
            <div className='innerContainer' id ='emailBox'>
              <input type="button" value={resendOTP ? "Resend OTP" : "Send OTP"} onClick={handleRequestingOTP} disabled={loading} />
            </div>
            </div>
            {OTPsent  && (
            <>
              <div className='innerDualContainer'>
                <div className='innerContainer'>
                  <label>OTP</label>
                  <input type="text" value={OTP} onChange={(e) => SetOTP(e.target.value)} placeholder='Enter OTP' />
                </div>
              </div>
            <div className='innerDualContainer'>
                  <div className='innerContainer'>
                    <label>New Password</label>
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder=' * * * * * *' />
                  </div>
                </div>
                <div className='innerDualContainer'>
                <div className='innerContainer'>
                    <label>Confirm New Password</label>
                    <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder=' * * * * * *' />
                  </div>
                  {/* <div className='innerContainer'>
                    <input type="button" value="Show Password" />    
                    {/* onClick={togglePassword} 
                  </div>  */}

                  </div>
                  <div className='innerDualContainer'>
                  <div className='innerContainer'>
                    <input type="submit" value="Update Password" />
                  </div> 
                  </div>
                  </>  )}
                          <div className="register-link">
            <p>Do you remember the password? <a href="/login">Login</a></p>
          </div>

      </form>
         <Toaster  />
      </div>
    )
}

export default ForgotPassword;