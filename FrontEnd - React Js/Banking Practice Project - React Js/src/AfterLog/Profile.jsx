import React, { useState, useEffect } from 'react';
import useSession from './UseSession';
import { execeuteToast } from '../ToasterFunction/ToasterFunction';
import toast, { Toaster } from 'react-hot-toast';
import './log.css';

const Profile = () => {
  const { currentUserData, isTokenExpired, fetchBasicUserData } = useSession();
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(currentUserData || {});

  useEffect(() => {
    if (currentUserData) {
      setEditedUser(currentUserData);
    }
  }, [currentUserData]);

  useEffect(() => {
    if (isTokenExpired) {
      alert("Session Expired. Please Login.");
      window.location.href = '/login';
    }
  }, [isTokenExpired]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setEditedUser(currentUserData);
  };

  const handleSaveClick = async () => {
    const confirmed = window.confirm("Are you sure you want to save the changes?");
    if (confirmed) {
      const updatedData = await saveUserChanges(editedUser);
      if (updatedData) {
        execeuteToast("success", "Your details have been updated successfully.");
        setEditing(false);
      } else {
        execeuteToast("error", "There was an issue updating your details. Please try again.");
    }
    }
  };

  const saveUserChanges = async (userData) => {
    try {
      const response = await fetch('http://localhost:8080/user/update-user-data', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        return true;
      } else {
        throw new Error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  };

  // If currentUserData is not available, display a loading message
  if (!currentUserData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className='refreshButton' onClick={fetchBasicUserData}> 
        <i className="pi pi-refresh" style={{ fontSize: '1.5rem' }}></i>
      </div>

      <div className='outer-Container'>
        <div className="profile-container">
          <div className="profile-header">
            <h1>{`${editedUser.firstName} ${editedUser.lastName}'s Profile`}</h1>
          </div>
          <div className="profile-content">
            <div className="profile-details">
              <div className="profile-field">
                <strong>First Name:</strong>
                <div className='profileInnerFiled'>
                  {editing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={editedUser.firstName || ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{editedUser.firstName}</span>
                  )}
                </div>
              </div>

              <div className="profile-field">
                <strong>Last Name: </strong>
                <div className='profileInnerFiled'>
                  {editing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={editedUser.lastName || ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{editedUser.lastName}</span>
                  )}
                </div>
              </div>

              <div className="profile-field">
                <strong>Gender: </strong>
                <div className='profileInnerFiled'>
                  {editing ? (
                    <select
                      name="gender"
                      value={editedUser.gender || ''}
                      onChange={handleInputChange}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  ) : (
                    <span>{editedUser.gender}</span>
                  )}
                </div>
              </div>

              <div className="profile-field">
                <strong>Date of Birth: </strong>
                <div className='profileInnerFiled'>
                  {editing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={editedUser.dateOfBirth || ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{editedUser.dateOfBirth}</span>
                  )}
                </div>
              </div>

              <div className="profile-field">
                <strong>Email: </strong>
                <div className='profileInnerFiled'>
                  <span>{editedUser.emailId}</span>
                </div>
              </div>

              <div className="profile-field">
                <strong>Mobile Number: </strong>
                <div className='profileInnerFiled'>
                  {editing ? (
                    <input
                      type="number"
                      name="mobileNumber"
                      value={editedUser.mobileNumber || ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{editedUser.mobileNumber}</span>
                  )}
                </div>
              </div>

              <div className="profile-field">
                <strong>Account Number: </strong>
                <div className='profileInnerFiled'>
                  <span>{editedUser.accountNumber}</span>
                </div>
              </div>

              <div className="profile-field">
                <strong>Address: </strong>
                <div className='profileInnerFiled'>
                  {editing ? (
                    <textarea
                      name="address"
                      value={editedUser.address || ''}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{editedUser.address}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-actions">
              {editing ? (
                <>
                  <button className="save-btn" onClick={handleSaveClick}>Save</button>
                  <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
                </>
              ) : (
                <button className="edit-btn" onClick={handleEditClick}>Edit Details</button>
              )}
            </div>
          </div>
        </div>

      </div>
      <Toaster />
    </>
  );
};

export default Profile;
