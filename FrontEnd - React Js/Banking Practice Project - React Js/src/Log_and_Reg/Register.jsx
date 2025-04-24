import React, { useState,useRef} from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { execeuteToast } from '../ToasterFunction/ToasterFunction';
import toast, { Toaster } from 'react-hot-toast';
import './Register.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('preferNotToSay');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [resendOTP, setResendOTP] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toastsd = useRef(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 16);
  const eligibleDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
  const maxDate = new Date().toISOString().split('T')[0];

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (otp === '') {
    execeuteToast("error","Enter the OTP before proceeding.");
      return;
    }
    setLoading(true);
    let data = "";
    let ToastID = execeuteToast("loading","Validating OTP...");
    try {
      const response = await fetch(`http://localhost:8080/user/validate-otp?OTPFromUser=${otp}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({emailId:email}),
      });
       data = await response.json();
      if (response.ok) {
        setLoading(false);
        toast.dismiss(ToastID);
        setOtpVerified(true);
        execeuteToast("success",data.message);
        setOtp('');
      } else {
        toast.dismiss(ToastID);
        execeuteToast("error",data.message);
        setResendOTP(true);
        setLoading(false);
        setOtp('');
      }
    } catch (error) {
      toast.dismiss(ToastID);
      execeuteToast("error",data.message);
      setLoading(false);
      setResendOTP(true);
      setOtp('');
    }
  };

  const handleRegisterData = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      execeuteToast("error","Both Pasword and Confrim Password should be same.");
      return;
    }
    let data = "";
    let ToastID = execeuteToast("loading","Registering wait ...");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/user/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, emailId: email, gender, dateOfBirth: dob, mobileNumber, password, address, fatherName }),
      });

        data = await response.json();
      if (response.ok) {
        setLoading(false);
        toast.dismiss(ToastID);
        execeuteToast("success",data.message);
        setRegistered(true);
        setOtpVerified(false);
        clearFields(); 
      } else {
        toast.dismiss(ToastID);
        setLoading(false);
        execeuteToast("error",data.message);
      }
    } catch (error) {
      toast.dismiss(ToastID);
      setLoading(false);
      execeuteToast("error",data.message);

    }
  };

  const handleRequestingOTP = async (e) => {
    e.preventDefault();
    if (firstName === '' || lastName === '' || email === '') {
       execeuteToast("error","Please fill in all required fields before proceeding.");
     return;
    }
    setLoading(true);
    let data = "";
    let ToastID = execeuteToast("loading","Please hold while we process your OTP request...");
    try {
      const response = await fetch("http://localhost:8080/user/send-otp?OTPPurpose=register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName:firstName, lastName:lastName, emailId: email }),
      });

      data = await response.json();
      if (response.ok) {
        setLoading(false);
        setOtpSent(true);
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

  const clearFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFatherName('');
    setMobileNumber('');
    setAddress('');
    setOtp('');
    setGender('');
    setDob('');
    setOtpSent(false);
    setResendOTP(false);
    setOtpVerified(false);
    setRegistered(false);
  };
  

  return (
    <div className='outerContainer'>
      <form onSubmit={handleRegisterData}>
      <h1>Register</h1>
        <div className='innerDualContainer'>
          <div className='innerContainer'>
            <label>First Name</label>
            <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='Enter the First Name' />
          </div> 
          <div className='innerContainer'>
            <label>Last Name</label>
            <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Enter the Last Name' />
          </div>
        </div>

        <div className='innerDualContainer'>
          <div className='innerContainer'>
            <label>Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Mail id' />
          </div>
        {!otpVerified && (
            <div className='innerContainer' id ='emailBox'>
              <input type="button" value={resendOTP ? "Resend OTP" : "Send OTP"} onClick={handleRequestingOTP} disabled={loading} />
            </div>
          )}
        </div>

       

        {!registered && (
          <>
            {otpSent && !otpVerified && (
              <div className='innerDualContainer'>
                <div className='innerContainer'>
                  <label>OTP</label>
                  <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='Enter OTP' />
                </div>
                <div className='innerContainer'>
                  <input type="button" value="Verify OTP" onClick={handleVerifyOTP} disabled={loading} />
                </div>
              </div>
            )}

            {otpVerified && (
              <>
                <div className='innerDualContainer'>
                  <div className='innerContainer'>
                    <label>Gender</label>
                  </div>
                  <div className='innerContainer'>
                    <label>Male</label>
                    <input type="radio" value='Male' checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
                  </div>
                  <div className='innerContainer'>
                    <label>Female</label>
                    <input type="radio" value='Female' checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
                  </div>
                </div>

                <div className='innerDualContainer'>
                  <div className='innerContainer'>
                    <label>Date of Birth</label>
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} max={eligibleDate} required />
                  </div>
                  <div className='innerContainer'>
                    <label>Mobile Number</label>
                    <input type="text" required value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder='Enter mobile number' pattern='[0-9]{10}' />
                  </div>
                </div>

                <div className='innerDualContainer'>
                  <div className='innerContainer'>
                    <label>Password</label>
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder=' * * * * * *' />
                    {/* <span onClick={togglePasswordVisibility} className="password-toggle">
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </span> */}
                  </div>
                  <div className='innerContainer'>
                    <label>Confirm Password</label>
                    <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder=' * * * * * *' />
                    {/* <span onClick={toggleConfirmPasswordVisibility} className="password-toggle">
                      {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </span> */}
                  </div>
                </div>

                <div className='innerDualContainer'>
                  <div className='innerContainer'>
                    <label>Address</label>
                    <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Enter your current address' />
                  </div>
                  <div className='innerContainer'>
                    <label>Father Name</label>
                    <input type="text" required value={fatherName} onChange={(e) => setFatherName(e.target.value)} placeholder='Enter Your Father Name' />
                  </div>
                </div>

                <div className='innerDualContainer'>
                  <div className='innerContainer'>
                    <input type="submit" value="Register" />
                  </div>
                </div>
              </>
            )}
          </>

        )}
        <div className="register-link">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
      </form>
                       <Toaster  />
      
    </div>
  );
};

export default Register;
