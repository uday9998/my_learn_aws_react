import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AISuggestionsPanel = ({
   aiSuggestions,
   useAISuggestion,
   createMiestroLesson,
   createVideoMembership,
   scrollToGeneratedScript
}) => {
   const [improvementInput, setImprovementInput] = useState('');

   const handleUseAISuggestion = (option) => {
      useAISuggestion(option);
      setTimeout(scrollToGeneratedScript, 100);
   };

   return (
      <div className="ai-suggestions-panel">
         {/* AI Suggestions Section */}
         <div className="suggestions-section">
            <h3 className="suggestions-title">
               <span className="icon">🔍</span> AI Suggestions
            </h3>
            
            <div className="suggestion-block">
               <h4>{aiSuggestions.improvements[0].title}</h4>
               <p>{aiSuggestions.improvements[0].description}</p>
               
               <div className="suggestion-options">
                  {aiSuggestions.improvements[0].options.map((option, index) => (
                     <div className="suggestion-option" key={index}>
                        <p>{option}</p>
                        <button 
                           className="use-button"
                           onClick={() => handleUseAISuggestion(option)}
                        >
                           Use
                        </button>
                     </div>
                  ))}
               </div>
            </div>
            
            <div className="improvement-input">
               <p>What would you like to improve?</p>
               <textarea 
                  placeholder="Enter specific aspects you want to improve..."
                  value={improvementInput}
                  onChange={(e) => setImprovementInput(e.target.value)}
               ></textarea>
               
               <div className="improvement-options">
                  {aiSuggestions.improvementOptions.map((option, index) => (
                     <button 
                        className="improvement-option" 
                        key={index}
                        onClick={() => setImprovementInput(prev => 
                           prev ? `${prev}, ${option.toLowerCase()}` : option
                        )}
                     >
                        {option}
                     </button>
                  ))}
               </div>
            </div>
         </div>
         
         {/* Smart Suggestions Section */}
         <div className="suggestions-section">
            <h3 className="suggestions-title">Smart Suggestions</h3>
            
            {aiSuggestions.smartSuggestions.map((suggestion, index) => (
               <div className="smart-suggestion" key={index}>
                  <div className="suggestion-icon">
                     {index === 0 ? '🎯' : index === 1 ? '🔄' : '⏱️'}
                  </div>
                  <div className="suggestion-content">
                     <h4>{suggestion.title}</h4>
                     <p>{suggestion.description}</p>
                     {index === 2 && (
                        <button className="optimize-button">Optimize Script Length</button>
                     )}
                  </div>
               </div>
            ))}
         </div>
         
         {/* Create with Script Section */}
         <div className="suggestions-section">
            <h3 className="suggestions-title">Create with this Script</h3>
            
            <div className="create-options">
               <button 
                  className="create-option"
                  onClick={createMiestroLesson}
               >
                  <span className="icon">📚</span>
                  <span>New Miestro Lesson</span>
                  <span className="arrow">→</span>
               </button>
               
               <button 
                  className="create-option"
                  onClick={createVideoMembership}
               >
                  <span className="icon">🎥</span>
                  <span>New Video Membership</span>
                  <span className="arrow">→</span>
               </button>
            </div>
            
            <p className="create-note">
               These options will use your script to create structured content in Miestro platform.
            </p>
         </div>
      </div>
   );
};

AISuggestionsPanel.propTypes = {
   aiSuggestions: PropTypes.object.isRequired,
   useAISuggestion: PropTypes.func.isRequired,
   createMiestroLesson: PropTypes.func.isRequired,
   createVideoMembership: PropTypes.func.isRequired,
   scrollToGeneratedScript: PropTypes.func.isRequired
};

export default AISuggestionsPanel;