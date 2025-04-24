import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

const ToastNotification = ({ type, message}) => {
  const [showToast, setShowToast] = useState(true);

  let BGcolor = "";
  let Heading = "";
  
  if (type === "success") {
    BGcolor = "#1cc85d";
    Heading = "Success:";
  } else if (type === "warn") {
    BGcolor = "#dd9e0e";
    Heading = "Warning:";
  } else if (type === "error") {
    BGcolor = "#dc2d0a";
    Heading = "Error:";
  } else if (type === "info") {
    BGcolor = "#27aeee";
    Heading = "Info:";
  } else {
    BGcolor = "#95bcf5";
    Heading = "Info:";
  }

  // setShowToast(true);
    useEffect(() => {
      const toastElement = document.querySelector('.toast');
      const toast = new bootstrap.Toast(toastElement); 
      toast.show(); 
    }, []);;

  return (
    <>
    {showToast && ( 
    <>
       <div
        aria-live="polite"
        aria-atomic="true"
        
        className="position-fixed top-0 end-0 p-3" 
      >
        <div
          className="toast align-items-center border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ backgroundColor:BGcolor, color: '#ffffff' }}
        >
          <div className="d-flex">
            <div className="toast-body">
             <strong>{Heading} </strong>{message}
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </>
    )}
    </>
  );
};

export default ToastNotification;
