import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CreatePost.scss';

const PostTypeOption = ({ icon, title, description, selected, onClick }) => (
  <div 
    className={`post-type-option ${selected ? 'selected' : ''}`}
    onClick={onClick}
  >
    <div className="option-icon">{icon}</div>
    <div className="option-title">{title}</div>
    <div className="option-description">{description}</div>
  </div>
);

PostTypeOption.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const ToneOption = ({ title, selected, onClick }) => (
  <div 
    className={`tone-option ${selected ? 'selected' : ''}`}
    onClick={onClick}
  >
    {title}
  </div>
);

ToneOption.propTypes = {
  title: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const GeneratedContent = ({ content, onEdit, onCopy, onSaveTemplate }) => (
  <div className="generated-content">
    <div className="generated-header">
      <h3>Generated Post</h3>
      <div className="generated-actions">
        <button className="action-button" onClick={onEdit}>
          <span className="action-icon">✏️</span> Edit
        </button>
        <button className="action-button" onClick={onCopy}>
          <span className="action-icon">📋</span> Copy
        </button>
        <button className="action-button" onClick={onSaveTemplate}>
          <span className="action-icon">💾</span> Save Template
        </button>
      </div>
    </div>
    <div className="content-display">{content}</div>
  </div>
);

GeneratedContent.propTypes = {
  content: PropTypes.node.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onSaveTemplate: PropTypes.func.isRequired
};

const AlternativeVersion = ({ type, onSelect }) => (
  <div className="alternative-version" onClick={onSelect}>
    <span className="star-icon">⭐</span>
    <span>{type} Style</span>
  </div>
);

AlternativeVersion.propTypes = {
  type: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

const CreatePost = ({ goBack }) => {
  const [postType, setPostType] = useState('welcome');
  const [postGoal, setPostGoal] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [selectedTone, setSelectedTone] = useState('friendly');
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedPost, setGeneratedPost] = useState(null);

  const handleGenerate = () => {
    // In a real app, this would call an API to generate content
    const welcomePost = (
      <div>
        <p className="generated-title">✨ Welcome to Our Community!</p>
        <p>Hey everyone! We're excited to welcome our newest members! 🌟</p>
        <p>We're thrilled to have you join us on this journey of learning and growth. This is a space where we all come together to share knowledge, experiences, and support each other.</p>
        <p>Quick intro to get started: • Feel free to introduce yourself below • Share what you're hoping to learn • Ask any questions you have</p>
        <p>Looking forward to connecting with you all! ✨</p>
      </div>
    );
    
    setGeneratedPost(welcomePost);
    setIsGenerated(true);
  };

  const handleEdit = () => {
    // In a real app, this would allow editing the generated content
  };

  const handleCopy = () => {
    // In a real app, this would copy the content to clipboard
  };

  const handleSaveTemplate = () => {
    // In a real app, this would save the content as a template
  };

  const suggestedQuestions = [
    'What inspired you to join our community?',
    'What\'s your biggest goal for this year?',
    'What topics interest you most?'
  ];

  const generateMoreQuestions = () => {
    // In a real app, this would generate more questions
  };

  return (
    <div className="create-post-page">
      <div className="page-header">
        <button className="back-button" onClick={goBack}>
          ← Back to Dashboard
        </button>
        <h1>Create Post</h1>
      </div>
      <div className="page-content">
        <div className="creation-panel">
          <h2>What type of post are you creating?</h2>
          
          <div className="post-type-options">
            <PostTypeOption
              icon="👋"
              title="Welcome Post"
              description="Greet new members"
              selected={postType === 'welcome'}
              onClick={() => setPostType('welcome')}
            />
            <PostTypeOption
              icon="🔔"
              title="Announcement"
              description="Share updates"
              selected={postType === 'announcement'}
              onClick={() => setPostType('announcement')}
            />
            <PostTypeOption
              icon="💬"
              title="Discussion"
              description="Start conversation"
              selected={postType === 'discussion'}
              onClick={() => setPostType('discussion')}
            />
          </div>
          
          <div className="form-group">
            <label>Post Goal</label>
            <input
              type="text"
              placeholder="What do you want to achieve with this post?"
              value={postGoal}
              onChange={(e) => setPostGoal(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Key Points</label>
            <textarea
              placeholder="What are the main points you want to cover?"
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              rows={4}
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Tone</label>
            <div className="tone-options">
              <ToneOption
                title="Professional"
                selected={selectedTone === 'professional'}
                onClick={() => setSelectedTone('professional')}
              />
              <ToneOption
                title="Friendly"
                selected={selectedTone === 'friendly'}
                onClick={() => setSelectedTone('friendly')}
              />
              <ToneOption
                title="Motivational"
                selected={selectedTone === 'motivational'}
                onClick={() => setSelectedTone('motivational')}
              />
            </div>
          </div>
          
          <button className="generate-button" onClick={handleGenerate}>
            <span className="generate-icon">⚡</span> Generate Post
          </button>
        </div>
        
        {isGenerated && (
          <div className="results-panel">
            <GeneratedContent
              content={generatedPost}
              onEdit={handleEdit}
              onCopy={handleCopy}
              onSaveTemplate={handleSaveTemplate}
            />
            
            <div className="alternatives-section">
              <h4>Alternative Versions</h4>
              <div className="alternatives-options">
                <AlternativeVersion
                  type="Professional"
                  onSelect={() => {}}
                />
                <AlternativeVersion
                  type="Casual"
                  onSelect={() => {}}
                />
              </div>
            </div>
            
            <div className="questions-section">
              <h4>Suggested Questions</h4>
              <ul className="questions-list">
                {suggestedQuestions.map((question, index) => (
                  <li key={index}>• {question}</li>
                ))}
              </ul>
              <button className="questions-button" onClick={generateMoreQuestions}>
                <span className="sparkle-icon">✨</span> Generate More Questions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

CreatePost.propTypes = {
  goBack: PropTypes.func.isRequired
};

export default CreatePost;