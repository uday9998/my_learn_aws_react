import React from 'react';
import PropTypes from 'prop-types';

const ScriptGeneratorForm = ({
   videoTitle,
   targetAudience,
   targetDuration,
   toneOfVoice,
   contentType,
   briefOverview,
   handleInputChange,
   toggleAudienceSelection,
   addCustomAudience,
   setDuration,
   generateScript
}) => {
   return (
      <div className="generator-form">
         <h2>Script Generator</h2>
         
         <div className="form-group">
            <label>Video Title</label>
            <input 
               type="text" 
               placeholder="Enter your video title..."
               value={videoTitle}
               onChange={(e) => handleInputChange('videoTitle', e.target.value)}
            />
         </div>
         
         <div className="form-row">
            <div className="form-group">
               <label>Target Audience</label>
               <div className="audience-options">
                  <button 
                     className={`audience-option ${targetAudience.includes('Beginners') ? 'selected' : ''}`}
                     onClick={() => toggleAudienceSelection('Beginners')}
                  >
                     Beginners
                  </button>
                  <button 
                     className={`audience-option ${targetAudience.includes('Intermediates') ? 'selected' : ''}`}
                     onClick={() => toggleAudienceSelection('Intermediates')}
                  >
                     Intermediates
                  </button>
                  <button 
                     className={`audience-option ${targetAudience.includes('Experts') ? 'selected' : ''}`}
                     onClick={() => toggleAudienceSelection('Experts')}
                  >
                     Experts
                  </button>
                  <button 
                     className="audience-option add-custom"
                     onClick={addCustomAudience}
                  >
                     + Custom
                  </button>
               </div>
            </div>
            
            <div className="form-group">
               <label>Content Type</label>
               <div className="select-container">
                  <select 
                     value={contentType}
                     onChange={(e) => handleInputChange('contentType', e.target.value)}
                  >
                     <option>YouTube Video</option>
                     <option>Tutorial</option>
                     <option>Product Demo</option>
                     <option>Webinar</option>
                  </select>
               </div>
            </div>
         </div>
         
         <div className="form-group">
            <label>Target Duration</label>
            <div className="duration-options">
               <button 
                  className={`duration-option ${targetDuration === '3-5 min' ? 'selected' : ''}`}
                  onClick={() => setDuration('3-5 min')}
               >
                  3-5 min
               </button>
               <button 
                  className={`duration-option ${targetDuration === '5-10 min' ? 'selected' : ''}`}
                  onClick={() => setDuration('5-10 min')}
               >
                  5-10 min
               </button>
               <button 
                  className={`duration-option ${targetDuration === '10-15 min' ? 'selected' : ''}`}
                  onClick={() => setDuration('10-15 min')}
               >
                  10-15 min
               </button>
            </div>
         </div>
         
         <div className="form-group">
            <label>Tone of Voice</label>
            <div className="select-container">
               <select 
                  value={toneOfVoice}
                  onChange={(e) => handleInputChange('toneOfVoice', e.target.value)}
               >
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Enthusiastic</option>
                  <option>Educational</option>
               </select>
            </div>
         </div>
         
         <div className="form-group">
            <label>Brief Overview or Keywords</label>
            <textarea 
               placeholder="What's your video about? Key points you want to cover? You can also paste existing content to repurpose."
               value={briefOverview}
               onChange={(e) => handleInputChange('briefOverview', e.target.value)}
               rows={5}
            ></textarea>
         </div>
         
         <button className="generate-button" onClick={generateScript}>
            <span className="icon">✨</span> Generate Script
         </button>
      </div>
   );
};

ScriptGeneratorForm.propTypes = {
   videoTitle: PropTypes.string,
   targetAudience: PropTypes.array,
   targetDuration: PropTypes.string,
   toneOfVoice: PropTypes.string,
   contentType: PropTypes.string,
   briefOverview: PropTypes.string,
   handleInputChange: PropTypes.func.isRequired,
   toggleAudienceSelection: PropTypes.func.isRequired,
   addCustomAudience: PropTypes.func.isRequired,
   setDuration: PropTypes.func.isRequired,
   generateScript: PropTypes.func.isRequired
};

export default ScriptGeneratorForm;