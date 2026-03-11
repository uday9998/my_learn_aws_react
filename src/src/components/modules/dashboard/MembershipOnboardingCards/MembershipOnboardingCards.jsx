import React, { useState, useEffect } from 'react';
import ModalNew from 'components/elements/ModalNew';

const MembershipOnboardingCards = () => {
  const [openVideoModal, setIsOpenVideoModal] = useState(false);
  const [openBookCallModal, setIsOpenBookCallModal] = useState(false);
  
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: '16px',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      padding: '24px',
      flex: '1',
      display: 'flex',
    },
    iconContainer: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '16px',
      flexShrink: 0,
    },
    blueIconBg: {
      backgroundColor: '#e6f0ff',
    },
    greenIconBg: {
      backgroundColor: '#e6fff0',
    },
    icon: {
      width: '24px',
      height: '24px',
    },
    blueIcon: {
      color: '#2563eb',
    },
    greenIcon: {
      color: '#10b981',
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
    },
    heading: {
      fontSize: '20px',
      fontWeight: 'bold',
      margin: '0 0 8px 0',
      textAlign: 'left',
      color: '#111827',
    },
    description: {
      color: '#6b7280',
      margin: '0 0 24px 0',
      textAlign: 'left',
      fontSize: '16px',
      lineHeight: '1.5',
    },
    button: {
      fontWeight: '500',
      padding: '10px 16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      fontSize: '16px',
      display: 'inline-block',
      textAlign: 'center',
      alignSelf: 'flex-start',
    },
    blueButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
    },
    blueButtonHover: {
      backgroundColor: '#2563eb',
    },
    greenButton: {
      backgroundColor: '#10b981',
      color: 'white',
    },
    greenButtonHover: {
      backgroundColor: '#059669',
    },
    cancelButton: {
      backgroundColor: '#f3f4f6',
      color: '#4b5563',
      marginTop: '12px',
    },
    cancelButtonHover: {
      backgroundColor: '#e5e7eb',
    },
    modalButtonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '10px',
    },
    videoContainer: {
      padding: '56.25% 0 0 0',
      position: 'relative',
      width: '100%'
    },
    videoIframe: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 0
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    const handleScreenChange = (e) => {
      const container = document.getElementById('membership-cards-container');
      if (container) {
        container.style.flexDirection = e.matches ? 'column' : 'row';
      }
    };
    
    handleScreenChange(mediaQuery);
    
    mediaQuery.addEventListener('change', handleScreenChange);
    
    return () => mediaQuery.removeEventListener('change', handleScreenChange);
  }, []);

  useEffect(() => {
    if (openVideoModal) {
      // Load Vimeo player script
      const script = document.createElement('script');
      script.src = "https://player.vimeo.com/api/player.js";
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [openVideoModal]);
  
  useEffect(() => {
    if (openBookCallModal) {
      const script = document.createElement('script');
      script.src = "https://ghl.lc.miestro.com/js/form_embed.js";
      script.type = "text/javascript";
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [openBookCallModal]);

  const handleWatchVideo = () => {
    setIsOpenVideoModal(true);
  };

  const handleBookCall = () => {
    setIsOpenBookCallModal(true);
  };

  const handleCancelBooking = () => {
    setIsOpenBookCallModal(false);
  };

  return (
    <div id="membership-cards-container" style={styles.container}>
      <div style={styles.card}>
        <div style={{...styles.iconContainer, ...styles.blueIconBg}}>
          <div style={{...styles.icon, ...styles.blueIcon}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </div>
        
        <div style={styles.contentContainer}>
          <h2 style={styles.heading}>Watch Getting Started</h2>
          <p style={styles.description}>
            Learn how to set up your membership in 5 minutes with our step-by-step video guide.
          </p>
          <button 
            style={{...styles.button, ...styles.blueButton}}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = styles.blueButtonHover.backgroundColor;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = styles.blueButton.backgroundColor;
            }}
            onClick={handleWatchVideo}
          >
            Watch Video
          </button>
        </div>
      </div>

      <div style={styles.card}>
        <div style={{...styles.iconContainer, ...styles.greenIconBg}}>
          <div style={{...styles.icon, ...styles.greenIcon}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
        </div>
        
        <div style={styles.contentContainer}>
          <h2 style={styles.heading}>Schedule A Call With A Miestro Specialist</h2>
          <p style={styles.description}>
            Get personalized guidance to launch your membership faster.
          </p>
          <button 
            style={{...styles.button, ...styles.greenButton}}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = styles.greenButtonHover.backgroundColor;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = styles.greenButton.backgroundColor;
            }}
            onClick={handleBookCall}
          >
            Book a Call
          </button>
        </div>
      </div>

      {openVideoModal && (
        <ModalNew onCloseModal={() => setIsOpenVideoModal(false)} className="tour_video">
          <div style={styles.videoContainer}>
            <iframe 
              src="https://player.vimeo.com/video/1076185046?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
              style={styles.videoIframe}
              title="Welcome To Miestro"
            />
          </div>
        </ModalNew>
      )}

      {openBookCallModal && (
        <ModalNew onCloseModal={() => setIsOpenBookCallModal(false)} className="book_call_modal">
          <div style={{ width: '100%', padding: '20px' }}>
            <iframe 
              src="https://ghl.lc.miestro.com/widget/booking/kIkw8gkdBJxxzAjN5Xub" 
              style={{ width: '100%', border: 'none', overflow: 'hidden', height: '600px' }} 
              scrolling="no" 
              id="kIkw8gkdBJxxzAjN5Xub_1743695326129"
            />
            <div style={styles.modalButtonContainer}>
              <button 
                style={{...styles.button, ...styles.cancelButton}}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = styles.cancelButtonHover.backgroundColor;
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = styles.cancelButton.backgroundColor;
                }}
                onClick={handleCancelBooking}
              >
                Cancel
              </button>
            </div>
          </div>
        </ModalNew>
      )}
    </div>
  );
};

export default MembershipOnboardingCards;