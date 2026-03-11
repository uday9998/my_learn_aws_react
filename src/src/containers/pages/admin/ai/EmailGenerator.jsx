import React, { useState } from 'react';
import axios from 'axios';
import './EmailGenerator.css';

const EmailGenerator = () => {
  const [formData, setFormData] = useState({
    purpose: '',
    tone: 'friendly',
    target_audience: '',
    key_points: [''],
    call_to_action: ''
  });

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleKeyPointChange = (index, value) => {
    const newKeyPoints = [...formData.key_points];
    newKeyPoints[index] = value;
    setFormData(prev => ({ ...prev, key_points: newKeyPoints }));
  };

  const addKeyPoint = () => {
    setFormData(prev => ({
      ...prev,
      key_points: [...prev.key_points, '']
    }));
  };

  const removeKeyPoint = (index) => {
    if (formData.key_points.length > 1) {
      const newKeyPoints = formData.key_points.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, key_points: newKeyPoints }));
    }
  };

  const handleGenerate = async () => {
    if (!formData.purpose.trim()) {
      setError('Please enter the email purpose');
      return;
    }

    setLoading(true);
    setError(null);
    setEmail(null);

    try {
      const response = await axios.post('/api/ai/content/email', {
        ...formData,
        key_points: formData.key_points.filter(kp => kp.trim())
      });

      if (response.data.success) {
        setEmail(response.data.email);
      } else {
        setError(response.data.error || 'Failed to generate email');
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.response?.data?.error || 'Failed to generate email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyEmail = () => {
    const subject = email.subject_lines[selectedSubject];
    const fullEmail = `Subject: ${subject}\n\n${email.body}`;
    navigator.clipboard.writeText(fullEmail);
    alert('Email copied to clipboard!');
  };

  const handleUseEmail = () => {
    localStorage.setItem('ai_generated_email', JSON.stringify({
      subject: email.subject_lines[selectedSubject],
      body: email.body
    }));
    alert('Email saved! You can now use it in your email campaign.');
  };

  const emailTemplates = [
    { value: 'welcome new students', label: 'Welcome Email', icon: '👋' },
    { value: 'course launch announcement', label: 'Course Launch', icon: '🚀' },
    { value: 'student engagement', label: 'Re-engagement', icon: '💪' },
    { value: 'course completion congratulations', label: 'Completion', icon: '🎉' },
    { value: 'upcoming live session', label: 'Live Session', icon: '📹' },
    { value: 'new content notification', label: 'New Content', icon: '✨' }
  ];

  return (
    <div className="email-generator">
      <div className="page-header">
        <h1>✉️ AI Email Campaign Generator</h1>
        <p className="subtitle">Create professional, high-converting emails in seconds</p>
      </div>

      <div className="generator-container">
        {/* Form Section */}
        <div className="form-section">
          <div className="form-card">
            <h2>Email Details</h2>

            {/* Email Templates */}
            <div className="form-group">
              <label>Quick Templates</label>
              <div className="template-grid">
                {emailTemplates.map((template) => (
                  <button
                    key={template.value}
                    className={`template-button ${formData.purpose === template.value ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, purpose: template.value })}
                  >
                    <span className="template-icon">{template.icon}</span>
                    <span className="template-label">{template.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="purpose">
                Email Purpose <span className="required">*</span>
              </label>
              <input
                type="text"
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                placeholder="e.g., Welcome new students to the course"
                className="form-input"
              />
              <small>What is the main goal of this email?</small>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tone">Email Tone</label>
                <select
                  id="tone"
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="friendly">Friendly</option>
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                  <option value="urgent">Urgent</option>
                  <option value="motivational">Motivational</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="target_audience">Target Audience</label>
                <input
                  type="text"
                  id="target_audience"
                  name="target_audience"
                  value={formData.target_audience}
                  onChange={handleInputChange}
                  placeholder="e.g., New enrollees, Active students"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Key Points to Cover</label>
              {formData.key_points.map((point, index) => (
                <div key={index} className="key-point-row">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => handleKeyPointChange(index, e.target.value)}
                    placeholder={`Key point ${index + 1}`}
                    className="form-input"
                  />
                  {formData.key_points.length > 1 && (
                    <button
                      onClick={() => removeKeyPoint(index)}
                      className="remove-button"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button onClick={addKeyPoint} className="add-button">
                + Add Key Point
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="call_to_action">Call to Action</label>
              <input
                type="text"
                id="call_to_action"
                name="call_to_action"
                value={formData.call_to_action}
                onChange={handleInputChange}
                placeholder="e.g., Start Learning Now, Join the Live Session"
                className="form-input"
              />
              <small>What action should readers take?</small>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !formData.purpose.trim()}
              className="generate-button"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Crafting Your Email...
                </>
              ) : (
                <>
                  <span className="icon">✨</span>
                  Generate Email Campaign
                </>
              )}
            </button>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
          </div>

          {/* Tips Card */}
          <div className="tips-card">
            <h3>💡 Email Best Practices</h3>
            <ul>
              <li>Keep subject lines under 50 characters</li>
              <li>Personalize with recipient's name</li>
              <li>Include clear call-to-action</li>
              <li>Mobile-friendly formatting</li>
              <li>Test different subject lines (A/B test)</li>
            </ul>
          </div>
        </div>

        {/* Results Section */}
        {email && (
          <div className="results-section">
            <div className="results-header">
              <h2>Generated Email Campaign</h2>
              <div className="results-actions">
                <button onClick={handleCopyEmail} className="btn-secondary">
                  📋 Copy Email
                </button>
                <button onClick={handleUseEmail} className="btn-primary">
                  ✅ Use This Email
                </button>
              </div>
            </div>

            <div className="email-content">
              {/* Subject Lines */}
              <div className="subject-section">
                <h3>📧 Subject Line Options</h3>
                <p className="section-description">Choose the one that resonates best with your audience</p>

                <div className="subject-options">
                  {email.subject_lines?.map((subject, index) => (
                    <div
                      key={index}
                      className={`subject-option ${selectedSubject === index ? 'selected' : ''}`}
                      onClick={() => setSelectedSubject(index)}
                    >
                      <div className="subject-radio">
                        {selectedSubject === index && <span className="radio-dot"></span>}
                      </div>
                      <div className="subject-text">{subject}</div>
                      <div className="subject-length">
                        {subject.length} chars
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Body */}
              <div className="body-section">
                <h3>📝 Email Body</h3>
                <div className="email-preview">
                  <div className="preview-header">
                    <strong>Subject:</strong> {email.subject_lines[selectedSubject]}
                  </div>
                  <div className="preview-body">
                    {email.body?.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                  {email.cta && (
                    <div className="preview-cta">
                      <button className="cta-button">{email.cta}</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Personalization Tags */}
              <div className="personalization-section">
                <h4>🏷️ Personalization Tags Available:</h4>
                <div className="tags-list">
                  <span className="tag">{'{{NAME}}'}</span>
                  <span className="tag">{'{{FIRST_NAME}}'}</span>
                  <span className="tag">{'{{EMAIL}}'}</span>
                  <span className="tag">{'{{COURSE_NAME}}'}</span>
                </div>
                <small>Replace these in your email automation platform</small>
              </div>

              {/* Stats */}
              <div className="email-stats">
                <div className="stat-item">
                  <div className="stat-label">Word Count</div>
                  <div className="stat-value">{email.body?.split(' ').length || 0}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Read Time</div>
                  <div className="stat-value">
                    {Math.ceil((email.body?.split(' ').length || 0) / 200)} min
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Subject Options</div>
                  <div className="stat-value">{email.subject_lines?.length || 0}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !email && (
          <div className="loading-state">
            <div className="loading-animation">
              <div className="loading-spinner"></div>
              <h3>AI is crafting your email...</h3>
              <p>Writing engaging copy that converts</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!email && !loading && (
          <div className="empty-state">
            <div className="empty-icon">✉️</div>
            <h3>Ready to Write Your Email?</h3>
            <p>Choose a template or describe your email purpose</p>
            <div className="example-box">
              <h4>What You'll Get:</h4>
              <ul>
                <li>✅ 3 tested subject line options</li>
                <li>✅ Professional email body</li>
                <li>✅ Clear call-to-action</li>
                <li>✅ Personalization placeholders</li>
                <li>✅ Mobile-optimized format</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailGenerator;
