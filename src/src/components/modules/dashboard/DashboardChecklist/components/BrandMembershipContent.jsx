import React from 'react'

const BrandMembershipContent = () => {
   return (
      <div className="brand-membership-content">
         <div className="site-information-section">
            <div className="section-header">
               <Icon name="Globe" className="section-icon" />
               <span className="section-title">Site Information</span>
            </div>
            
            
            
            <div className="form-group">
               <label className="form-label">Domain</label>
               <div className="domain-input-group">
                  <input 
                     type="text" 
                     className="form-input domain-input" 
                     placeholder="yourname"
                  />
                  <div className="domain-suffix">.miestro.com</div>
               </div>
               <div className="form-hint">Choose a unique domain for your membership site</div>
            </div>
         </div>
         
         <div className="branding-section">
            <div className="section-header">
               <Icon name="PaintBrush" className="section-icon" />
               <span className="section-title">Branding</span>
            </div>
            
            <div className="form-group">
               <label className="form-label">Logo</label>
               <div className="logo-upload-area">
                  <div className="logo-placeholder">
                     <Icon name="Image" className="image-icon" />
                  </div>
                  <button className="upload-logo-button">
                     <Icon name="Upload" className="upload-icon" />
                     Upload Logo
                  </button>
                  <div className="upload-hint">Recommended size: 200×200px</div>
               </div>
            </div>
            
            <div className="form-group">
               <label className="form-label">Primary Color</label>
               <div className="color-picker-container">
                  <div className="color-preview" style={{ backgroundColor: "#379552" }}></div>
                  <input 
                     type="text" 
                     className="form-input color-input" 
                     value="#379552"
                     onChange={() => {}}
                  />
               </div>
            </div>
         </div>
         
         <div className="form-actions">
            <button className="save-continue-button">
               Save & Continue
               <Icon name="ChevronRight" className="button-icon" />
            </button>
            <button className="save-draft-button">Save as Draft</button>
         </div>
      </div>
   );
};

export default BrandMembershipContent