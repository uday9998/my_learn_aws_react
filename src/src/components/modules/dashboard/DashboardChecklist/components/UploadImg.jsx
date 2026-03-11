import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import './UploadImg.scss';

const UploadImg = ({ 
  title, 
  height, 
  size, 
  labelFont, 
  img, 
  isSchoolLogo, 
  onChange, 
  style, 
  removLogo 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0]);
    }
  };

  const handleRemoveLogo = (e) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div className="upload-img-container">
      {title && (
        <div className="upload-img-title">
          <span className={`title-text ${labelFont}`}>{title}</span>
          {size && <span className="size-text">({size})</span>}
        </div>
      )}
      
      <div 
        className="upload-img-area"
        style={{ height: height, ...style }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <input 
          type="file" 
          id={`upload-${title?.replace(/\s+/g, '-').toLowerCase()}`}
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />
        
        {img ? (
          <div className="img-preview">
            <img src={img} alt={title || 'Uploaded image'} />
            
            {isHovered && removLogo && (
              <button className="remove-button" onClick={handleRemoveLogo}>
                <Icon name="Trash" />
              </button>
            )}
          </div>
        ) : (
          <label htmlFor={`upload-${title?.replace(/\s+/g, '-').toLowerCase()}`} className="upload-placeholder">
            <Icon name="Upload" className="upload-icon" />
            <span>Upload Image</span>
          </label>
        )}
      </div>
    </div>
  );
};

UploadImg.propTypes = {
  title: PropTypes.string,
  height: PropTypes.string,
  size: PropTypes.string,
  labelFont: PropTypes.string,
  img: PropTypes.string,
  isSchoolLogo: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  removLogo: PropTypes.bool
};

export default UploadImg;