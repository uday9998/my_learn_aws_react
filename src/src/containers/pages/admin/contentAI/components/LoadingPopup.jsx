import React, { useState, useEffect } from 'react';

const LoadingPopup = ({ isVisible, onCancel, scriptType }) => {
  const [stage, setStage] = useState('Analyzing inputs');
  
  useEffect(() => {
    if (isVisible) {
      const stages = [
        'Analyzing inputs',
        'Crafting script structure',
        'Generating introduction',
        'Writing main content',
        'Finalizing conclusion',
        'Optimizing for your audience'
      ];
      
      let currentStage = 0;
      
      const intervalId = setInterval(() => {
        currentStage = (currentStage + 1) % stages.length;
        setStage(stages[currentStage]);
      }, 3000);
      
      return () => clearInterval(intervalId);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="loading-popup">
      <div className="loading-popup__content">
        <div className="loading-popup__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
        </div>
        <h3 className="loading-popup__title">Creating Your Script</h3>
        <p className="loading-popup__message">
          Our AI is working on your {scriptType || 'content'} script. This might take up to 30 seconds 
          as we craft a quality script tailored to your specifications.
        </p>
        <div className="loading-popup__progress">
          <div className="loading-popup__progress-bar"></div>
        </div>
        <div className="loading-popup__stage">{stage}</div>
        <button 
          className="loading-popup__cancel" 
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoadingPopup;