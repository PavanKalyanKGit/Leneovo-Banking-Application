import { useState, useEffect } from 'react';

const useSession = () => {
  const [currentUserData, setCurrentUserData] = useState(null);
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const bearerToken = sessionStorage.getItem('token');
 
  const currentUserEmailID = JSON.parse(sessionStorage.getItem('user')).emailId

  useEffect(() => {
    if (!bearerToken || !currentUserEmailID) {
      alert("Session Expired. Please Login.");
      window.location.href = '/login';
    } else {
      fetchBasicUserData();
    }
  }, [bearerToken, currentUserEmailID]);

  const isTokenExpiredFunction = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/tokenexpiry', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Origin': 'http://localhost:8080',
        },
      });

      if (response.ok) {
        setIsTokenExpired(false);
        return false;
      } else if (response.status === 401) {
        setIsTokenExpired(true);
        return true;
      } else {
        console.error("Error checking token expiration:", response.status);
        setIsTokenExpired(true);
        return true;
      }
    } catch (error) {
      console.error("Error occurred while checking token expiry:", error);
      setIsTokenExpired(true);
      return true;
    }
  };

  const fetchBasicUserData = async () => {
    try {
      const tokenExpired = await isTokenExpiredFunction();
      if (tokenExpired) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        alert("Session Expired. Please Login.");
        window.location.href = '/login';
        return;
      } else {
        console.log("Token Not expired");
      }

      const response = await fetch('http://localhost:8080/user/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:8080',
        },
        body: JSON.stringify({ userEmailID: currentUserEmailID }),
      });

      const data = await response.json();
      if (response.ok) {
        setCurrentUserData(data);
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { currentUserData, isTokenExpired ,fetchBasicUserData};
};

export default useSession;
