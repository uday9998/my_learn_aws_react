import React, { useState, useEffect } from 'react';

const ErrorNotification = ({ message, onClose, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    if (message) {
      setVisible(true);
      
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300); // Allow time for exit animation
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);
  
  if (!message) return null;
  
  return (
    <div className={`error-notification ${visible ? 'visible' : 'hiding'}`}>
      <div className="error-notification__content">
        <div className="error-notification__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <div className="error-notification__message">{message}</div>
        <button className="error-notification__close" onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ErrorNotification;