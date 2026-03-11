import React, { useState } from 'react';
import PropTypes from 'prop-types';

const GeneratedScript = ({
   scriptSections,
   estimatedDuration,
   editScript,
   copyScript,
   exportScript,
   regenerateSection,
   deleteSection,
   addVisuals
}) => {
   const [expandedSections, setExpandedSections] = useState({
      introduction: true,
      mainContent: false,
      conclusion: false
   });
   
   const [activeSection, setActiveSection] = useState('introduction');

   const toggleSection = (section) => {
      setExpandedSections(prev => ({
         ...prev,
         [section]: !prev[section]
      }));
      setActiveSection(section);
   };
   
   const handleRegenerateSection = () => {
      regenerateSection(activeSection);
   };
   
   const handleDeleteSection = () => {
      deleteSection(activeSection);
   };

   return (
      <div className="generated-script">
         <div className="script-header">
            <div>
               <h2>Generated Script</h2>
               <p className="duration-estimate">Estimated duration: {estimatedDuration}</p>
            </div>
            <div className="script-actions">
               <button className="action-button" onClick={editScript}>
                  <span className="icon">✏️</span> Edit
               </button>
               <button className="action-button" onClick={copyScript}>
                  <span className="icon">📋</span> Copy
               </button>
               <button className="action-button" onClick={exportScript}>
                  <span className="icon">📤</span> Export
               </button>
            </div>
         </div>
         
         {/* Introduction Section */}
         <div className={`script-section ${!expandedSections.introduction ? 'collapsed' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('introduction')}>
               <h3>Introduction <span className="duration-badge">{scriptSections.introduction.duration}</span></h3>
               <button className="expand-button">
                  <span className="icon">{expandedSections.introduction ? '📝' : '→'}</span>
               </button>
            </div>
            
            {expandedSections.introduction && (
               <div className="section-content">
                  <div className="content-row">
                     <div className="label">HOOK</div>
                     <div className="text">{scriptSections.introduction.content}</div>
                  </div>
                  
                  <div className="content-row">
                     <div className="label">CONTEXT</div>
                     <div className="text">{scriptSections.introduction.context}</div>
                  </div>
                  
                  <div className="content-row">
                     <div className="label">OVERVIEW</div>
                     <div className="text">{scriptSections.introduction.overview}</div>
                  </div>
                  
                  <div className="section-actions">
                     <button className="action-button" onClick={handleRegenerateSection}>
                        <span className="icon">🔄</span> Regenerate
                     </button>
                     <button className="action-button delete" onClick={handleDeleteSection}>
                        <span className="icon">🗑️</span> Delete
                     </button>
                     
                  </div>
               </div>
            )}
         </div>
         
         {/* Main Content Section */}
         <div className={`script-section ${!expandedSections.mainContent ? 'collapsed' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('mainContent')}>
               <h3>Main Content <span className="duration-badge">{scriptSections.mainContent.duration}</span></h3>
               <button className="expand-button">
                  <span className="icon">{expandedSections.mainContent ? '📝' : '→'}</span>
               </button>
            </div>
            
            {expandedSections.mainContent && (
               <div className="section-content">
                  <div className="content-row">
                     <div className="text whitespace-preserve">
                        {scriptSections.mainContent.content || "Main content would be displayed here when available."}
                     </div>
                  </div>
                  
                  <div className="section-actions">
                     <button className="action-button" onClick={handleRegenerateSection}>
                        <span className="icon">🔄</span> Regenerate
                     </button>
                     <button className="action-button delete" onClick={handleDeleteSection}>
                        <span className="icon">🗑️</span> Delete
                     </button>
                    
                  </div>
               </div>
            )}
         </div>
         
         {/* Conclusion Section */}
         <div className={`script-section ${!expandedSections.conclusion ? 'collapsed' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('conclusion')}>
               <h3>Conclusion <span className="duration-badge">{scriptSections.conclusion.duration}</span></h3>
               <button className="expand-button">
                  <span className="icon">{expandedSections.conclusion ? '📝' : '→'}</span>
               </button>
            </div>
            
            {expandedSections.conclusion && (
               <div className="section-content">
                  <div className="content-row">
                     <div className="text whitespace-preserve">
                        {scriptSections.conclusion.content || "Conclusion content would be displayed here when available."}
                     </div>
                  </div>
                  
                  <div className="section-actions">
                     <button className="action-button" onClick={handleRegenerateSection}>
                        <span className="icon">🔄</span> Regenerate
                     </button>
                     <button className="action-button delete" onClick={handleDeleteSection}>
                        <span className="icon">🗑️</span> Delete
                     </button>
                     
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

GeneratedScript.propTypes = {
   scriptSections: PropTypes.object.isRequired,
   estimatedDuration: PropTypes.string.isRequired,
   editScript: PropTypes.func.isRequired,
   copyScript: PropTypes.func.isRequired,
   exportScript: PropTypes.func.isRequired,
   regenerateSection: PropTypes.func.isRequired,
   deleteSection: PropTypes.func.isRequired,
   addVisuals: PropTypes.func.isRequired
};

export default GeneratedScript;