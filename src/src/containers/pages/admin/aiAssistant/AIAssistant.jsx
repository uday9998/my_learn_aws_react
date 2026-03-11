import React from 'react';
import './AIAssistant.scss';

const VideoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 10.0001L7.5 14.3301V5.67008L15 10.0001Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12.5 10L8.75 12.0711L8.75 7.92893L12.5 10Z" fill="currentColor"/>
  </svg>
);

const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.7 7.05L12.95 8.3M4 16L7.5 15.5L14.8 8.2C15.3944 7.60569 15.3944 6.64432 14.8 6.05C14.2057 5.45569 13.2443 5.45569 12.65 6.05L5.35 13.35L4.85 16.15L4 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DocumentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 5.5H4C3.72386 5.5 3.5 5.72386 3.5 6V16C3.5 16.2761 3.72386 16.5 4 16.5H16C16.2761 16.5 16.5 16.2761 16.5 16V6C16.5 5.72386 16.2761 5.5 16 5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.5 3.5H6.5C6.22386 3.5 6 3.72386 6 4V6C6 6.27614 6.22386 6.5 6.5 6.5H13.5C13.7761 6.5 14 6.27614 14 6V4C14 3.72386 13.7761 3.5 13.5 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MessageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 8.33334H11.6667M5 11.6667H10M10 16.6667H16.6667C17.1269 16.6667 17.5 16.2936 17.5 15.8333V4.16668C17.5 3.70644 17.1269 3.33334 16.6667 3.33334H3.33333C2.8731 3.33334 2.5 3.70644 2.5 4.16668V15.8333C2.5 16.2936 2.8731 16.6667 3.33333 16.6667H10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6667 5L11.6667 10L8.33333 6.66667L3.33333 11.6667M16.6667 5H13.3333M16.6667 5V8.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.5 15H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ModerateIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.33333 10C3.33333 13.6819 6.31809 16.6667 10 16.6667C13.6819 16.6667 16.6667 13.6819 16.6667 10C16.6667 6.31814 13.6819 3.33337 10 3.33337C6.31809 3.33337 3.33333 6.31814 3.33333 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 7.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.5 7.5L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.33334 16.6667H16.6667M5.83334 10.8334V13.3334M10 7.50004V13.3334M14.1667 4.16671V13.3334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PeopleIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.3333 22.6667V20.6667C21.3333 19.6058 20.9119 18.5884 20.1618 17.8382C19.4116 17.0881 18.3942 16.6667 17.3333 16.6667H10.6667C9.60581 16.6667 8.58839 17.0881 7.83824 17.8382C7.0881 18.5884 6.66667 19.6058 6.66667 20.6667V22.6667" stroke="#6A36DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 12.6667C16.2091 12.6667 18 10.8758 18 8.66675C18 6.45761 16.2091 4.66675 14 4.66675C11.7909 4.66675 10 6.45761 10 8.66675C10 10.8758 11.7909 12.6667 14 12.6667Z" stroke="#6A36DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M25.3333 22.6667V20.6667C25.3329 19.7852 25.0372 18.9312 24.4918 18.2392C23.9464 17.5471 23.1818 17.0565 22.3333 16.84" stroke="#6A36DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 4.84C19.8503 5.05576 20.6167 5.54717 21.1629 6.2407C21.709 6.93424 22.0045 7.79008 22.0045 8.67333C22.0045 9.55659 21.709 10.4124 21.1629 11.106C20.6167 11.7995 19.8503 12.2909 19 12.5067" stroke="#6A36DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VideoPlayerIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25.3333 10.6667H6.66667C5.19391 10.6667 4 11.8607 4 13.3334V24C4 25.4728 5.19391 26.6667 6.66667 26.6667H25.3333C26.8061 26.6667 28 25.4728 28 24V13.3334C28 11.8607 26.8061 10.6667 25.3333 10.6667Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 5.33325L16 10.6666L8 5.33325" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.00001 1.33337L10.06 5.50698L14.6667 6.18037L11.3333 9.42631L12.12 14.0134L8.00001 11.8467L3.88001 14.0134L4.66668 9.42631L1.33334 6.18037L5.94001 5.50698L8.00001 1.33337Z" fill="#2563EB" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AIAssistant = ({ onContentAction, onCommunityAction }) => {
  return (
    <div className="assistant-page">
      <div className="assistant-page-header">
        <div className="ai-powered-label">
          <span className="sparkle-icon">✨</span>
          <span>AI-Powered Assistants</span>
        </div>
        <h1>Choose Your Assistant</h1>
        <p className="subheading">Get help with content creation and community management</p>
      </div>

      <div className="assistant-options-container">
        <div className="assistant-option">
          <div className="assistant-icon content-icon">
            <VideoPlayerIcon />
          </div>
          <div className="assistant-details">
            <h2>Content Assistant</h2>
            <p>Create better content, faster</p>
          </div>

          <div className="assistant-actions">
            <button 
              className="assistant-action-button"
              onClick={() => onContentAction && onContentAction('video-script')}
            >
              <PlayIcon />
              <span>Generate Video Script</span>
            </button>
            <button 
              className="assistant-action-button"
              onClick={() => onContentAction && onContentAction('content-ideas')}
            >
              <DocumentIcon />
              <span>Video Script Improvement Ideas</span>
            </button>
          </div>

          <div className="assistant-capabilities">
            <h3>What it can do:</h3>
            <ul>
              <li><StarIcon /> Generate video scripts and outlines</li>
              <li><StarIcon /> Suggest content improvements</li>
            </ul>
          </div>
          
          <button 
            className="get-started-button"
            onClick={() => onContentAction && onContentAction('video-script')}
          >
            Get Started
          </button>
        </div>

        <div className="assistant-option">
          <div className="coming-soon-label">Coming Soon</div>
          <div className="assistant-icon community-icon">
            <PeopleIcon />
          </div>
          <div className="assistant-details">
            <h2>Community Assistant</h2>
            <p>Grow and manage your community</p>
          </div>

          <div className="assistant-actions">
            <button 
              className="assistant-action-button"
              onClick={() => onCommunityAction && onCommunityAction('welcome-message')}
              disabled
            >
              <MessageIcon />
              <span>Generate Welcome Message</span>
            </button>
            <button 
              className="assistant-action-button"
              onClick={() => onCommunityAction && onCommunityAction('engagement-insights')}
              disabled
            >
              <TrendIcon />
              <span>View Engagement Insights</span>
            </button>
            <button 
              className="assistant-action-button"
              onClick={() => onCommunityAction && onCommunityAction('moderate-content')}
              disabled
            >
              <ModerateIcon />
              <span>Moderate Content</span>
            </button>
            <button 
              className="assistant-action-button"
              onClick={() => onCommunityAction && onCommunityAction('community-analytics')}
              disabled
            >
              <AnalyticsIcon />
              <span>Community Analytics</span>
            </button>
          </div>

          <div className="assistant-capabilities">
            <h3>What it can do:</h3>
            <ul>
              <li><StarIcon /> Identify trending topics</li>
              <li><StarIcon /> Suggest discussion prompts</li>
              <li><StarIcon /> Monitor engagement</li>
              <li><StarIcon /> Highlight active members</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;