import React from 'react';
import miestrouniversity from "assets/images/dashboard/miestrouni.jpeg";

const styles = {
  cardContainer: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '24px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    maxWidth: '100%',
  },
  leftContentSection: {
    display: 'flex',
    width: '45%',
    paddingRight: '24px',
  },
  iconSection: {
    marginRight: '16px',
  },
  contentSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  rightSection: {
    width: '55%',
    height: 'auto',
  },
  rightImage: {
    width: '85%',
    // height: '320px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  iconContainer: {
    backgroundColor: '#f0f7f5',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#24554e',
    fontSize: '28px',
  },
  titleContainer: {
    marginBottom: '16px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
    color: '#333',
  },
  recommendedBadge: {
    backgroundColor: '#edf5f3',
    color: '#24554e',
    fontSize: '12px',
    padding: '4px 12px',
    borderRadius: '4px',
    display: 'inline-block',
    marginBottom: '16px',
  },
  description: {
    margin: '0',
    fontSize: '15px',
    color: '#555',
    lineHeight: '1.5',
    marginBottom: '24px',
  },
  button: {
    backgroundColor: '#24554e',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 28px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    transition: 'background-color 0.2s',
  },
  buttonHover: {
    backgroundColor: '#1a3e39',
  }
};

const MiestroUniversityCard = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const isMobile = windowWidth < 768;

  const cardStyle = {
    ...styles.cardContainer,
    flexDirection: isMobile ? 'column' : 'row',
  };

  const leftContentStyle = {
    ...styles.leftContentSection,
    width: isMobile ? '100%' : '40%',
    paddingRight: isMobile ? '0' : '24px',
    marginBottom: isMobile ? '24px' : '0',
  };

  const rightSectionStyle = {
    ...styles.rightSection,
    width: isMobile ? '100%' : '60%',
  };

  const imageStyle = {
    ...styles.rightImage,
    height: isMobile ? '220px' : '320px',
  };

  const handleStartLearning = () => {
    window.open("https://miestrouniversity.miestro.com/portal/membership", "_blank");
  };

  return (
    <div style={cardStyle}>
      <div style={leftContentStyle}>
        <div style={styles.iconSection}>
          <div style={styles.iconContainer}>
            <div style={styles.icon}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 6C7 4.34315 8.34315 3 10 3H26C27.6569 3 29 4.34315 29 6V26C29 27.6569 27.6569 29 26 29H10C8.34315 29 7 27.6569 7 26V6Z" stroke="#24554e" strokeWidth="2" />
                <path d="M7 6H5C3.89543 6 3 6.89543 3 8V24C3 25.1046 3.89543 26 5 26H7" stroke="#24554e" strokeWidth="2" />
                <line x1="18" y1="5" x2="18" y2="27" stroke="#24554e" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
        <div style={styles.contentSection}>
          <h2 style={styles.title}>
            Miestro University
          </h2>
          <span style={styles.recommendedBadge}>Recommended</span>
          <p style={styles.description}>
            Learn the ins and outs of creating a successful membership with our comprehensive training resources.
          </p>
          <button
            style={{
              ...styles.button,
              ...(isHovered ? styles.buttonHover : {})
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleStartLearning}
          >
            Start Learning
          </button>
        </div>
      </div>
      <div style={rightSectionStyle}>
        <img
          src={miestrouniversity}
          alt="Miestro University"
          style={imageStyle}
          className='miestroUni'
        />
      </div>
    </div>
  );
};

export default MiestroUniversityCard;