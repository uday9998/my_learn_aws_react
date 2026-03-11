import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import Text, { SIZES as textSize, TYPES as textType } from 'components/elements/TextNew';
import './ShareVideoModal.scss';
// import './ShareVideoModal.scss';

const ShareVideoModal = ({ isOpen, onClose, videoUrl }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(videoUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleSocialShare = (platform) => {
    let shareUrl;
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(videoUrl)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="share-modal-overlay">
      <div className="share-modal-container">
        <div className="share-modal-header">
          <Text 
            inner="Share Video" 
            type={textType.bold} 
            size={textSize.size_24}
          />
          <button className="share-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="share-modal-content">
          <div className="share-modal-section">
            <Text 
              inner="Video Link" 
              type={textType.medium} 
              size={textSize.size_16}
            />
            <div className="share-modal-link-container">
              <input 
                type="text" 
                className="share-modal-link-input" 
                value={videoUrl} 
                readOnly 
              />
              <Button
                text={copySuccess ? "Copied" : "Copy"}
                theme={themes.grey}
                size="small"
                iconName={copySuccess ? "CheckM" : "CopyM"}
                isIconRight={false}
                onClick={handleCopy}
              />
            </div>
          </div>
          
          <div className="share-modal-section">
            <Text 
              inner="Share on Social Media" 
              type={textType.medium} 
              size={textSize.size_16}
            />
            
            <div className="share-modal-social-buttons">
              <button 
                className="share-modal-social-button facebook"
                onClick={() => handleSocialShare('facebook')}
              >
                <span>Facebook</span>
              </button>
              
              <button 
                className="share-modal-social-button twitter"
                onClick={() => handleSocialShare('twitter')}
              >
                <span>Twitter</span>
              </button>
              
              <button 
                className="share-modal-social-button linkedin"
                onClick={() => handleSocialShare('linkedin')}
              >
                <span>LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ShareVideoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  videoUrl: PropTypes.string.isRequired
};

export default ShareVideoModal;