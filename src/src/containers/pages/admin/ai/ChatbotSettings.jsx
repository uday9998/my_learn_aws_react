import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatbotSettings.css';

const ChatbotSettings = () => {
  const [settings, setSettings] = useState({
    bot_name: 'AI Assistant',
    welcome_message: 'Hi! How can I help you today?',
    primary_color: '#6366f1',
    tone: 'friendly',
    temperature: 0.7,
    max_tokens: 500,
    model: 'gpt-4o-mini',
    is_enabled: true,
    auto_open: false,
    auto_open_delay: 5000,
    scroll_trigger: false,
    scroll_percentage: 50,
    position: 'bottom-right'
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/ai/chatbot/settings', {
        params: { scope: 'global' }
      });

      if (response.data.success) {
        setSettings({ ...settings, ...response.data.settings });
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await axios.post('/api/ai/admin/chatbot/settings', {
        scope: 'global',
        ...settings
      });

      if (response.data.success) {
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) {
    return (
      <div className="chatbot-settings">
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chatbot-settings">
      <div className="page-header">
        <div>
          <h1>🤖 AI Chatbot Settings</h1>
          <p className="subtitle">Configure your intelligent assistant</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="save-button">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`message-banner ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="settings-container">
        {/* General Settings */}
        <div className="settings-section">
          <div className="section-header">
            <h2>⚙️ General Settings</h2>
            <p>Basic configuration for your AI assistant</p>
          </div>

          <div className="settings-card">
            <div className="form-group">
              <label htmlFor="bot_name">Bot Name</label>
              <input
                type="text"
                id="bot_name"
                name="bot_name"
                value={settings.bot_name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="AI Assistant"
              />
              <small>The name shown in the chat widget</small>
            </div>

            <div className="form-group">
              <label htmlFor="welcome_message">Welcome Message</label>
              <textarea
                id="welcome_message"
                name="welcome_message"
                value={settings.welcome_message}
                onChange={handleInputChange}
                className="form-textarea"
                rows={3}
                placeholder="Hi! How can I help you today?"
              />
              <small>First message users see when opening the chatbot</small>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="primary_color">Brand Color</label>
                <div className="color-picker">
                  <input
                    type="color"
                    id="primary_color"
                    name="primary_color"
                    value={settings.primary_color}
                    onChange={handleInputChange}
                    className="color-input"
                  />
                  <input
                    type="text"
                    value={settings.primary_color}
                    onChange={handleInputChange}
                    name="primary_color"
                    className="color-text"
                    placeholder="#6366f1"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="position">Widget Position</label>
                <select
                  id="position"
                  name="position"
                  value={settings.position}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-left">Bottom Left</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="is_enabled"
                  checked={settings.is_enabled}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span>Enable Chatbot</span>
              </label>
              <small>Turn the chatbot on or off globally</small>
            </div>
          </div>
        </div>

        {/* AI Behavior */}
        <div className="settings-section">
          <div className="section-header">
            <h2>🧠 AI Behavior</h2>
            <p>Fine-tune how the AI responds</p>
          </div>

          <div className="settings-card">
            <div className="form-group">
              <label htmlFor="tone">Conversation Tone</label>
              <select
                id="tone"
                name="tone"
                value={settings.tone}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
              </select>
              <small>How the AI communicates with users</small>
            </div>

            <div className="form-group">
              <label htmlFor="model">AI Model</label>
              <select
                id="model"
                name="model"
                value={settings.model}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="gpt-4o-mini">GPT-4o Mini (Fastest, Cheapest)</option>
                <option value="gpt-4o">GPT-4o (Best Quality)</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Fast)</option>
              </select>
              <small>Balance between cost and quality</small>
            </div>

            <div className="form-group">
              <label htmlFor="temperature">
                Creativity Level: {settings.temperature}
              </label>
              <input
                type="range"
                id="temperature"
                name="temperature"
                min="0"
                max="1"
                step="0.1"
                value={settings.temperature}
                onChange={handleInputChange}
                className="range-slider"
              />
              <div className="range-labels">
                <span>Precise (0.0)</span>
                <span>Balanced (0.7)</span>
                <span>Creative (1.0)</span>
              </div>
              <small>Lower = more focused, Higher = more creative</small>
            </div>

            <div className="form-group">
              <label htmlFor="max_tokens">Max Response Length: {settings.max_tokens} tokens</label>
              <input
                type="range"
                id="max_tokens"
                name="max_tokens"
                min="100"
                max="1000"
                step="50"
                value={settings.max_tokens}
                onChange={handleInputChange}
                className="range-slider"
              />
              <small>Longer responses cost more but provide detail</small>
            </div>
          </div>
        </div>

        {/* Triggers */}
        <div className="settings-section">
          <div className="section-header">
            <h2>🎯 Auto-Triggers</h2>
            <p>When should the chatbot automatically appear?</p>
          </div>

          <div className="settings-card">
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="auto_open"
                  checked={settings.auto_open}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span>Auto-open after delay</span>
              </label>
            </div>

            {settings.auto_open && (
              <div className="form-group indented">
                <label htmlFor="auto_open_delay">
                  Delay: {settings.auto_open_delay / 1000} seconds
                </label>
                <input
                  type="range"
                  id="auto_open_delay"
                  name="auto_open_delay"
                  min="1000"
                  max="30000"
                  step="1000"
                  value={settings.auto_open_delay}
                  onChange={handleInputChange}
                  className="range-slider"
                />
              </div>
            )}

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="scroll_trigger"
                  checked={settings.scroll_trigger}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span>Trigger on scroll</span>
              </label>
            </div>

            {settings.scroll_trigger && (
              <div className="form-group indented">
                <label htmlFor="scroll_percentage">
                  At {settings.scroll_percentage}% scroll
                </label>
                <input
                  type="range"
                  id="scroll_percentage"
                  name="scroll_percentage"
                  min="10"
                  max="90"
                  step="10"
                  value={settings.scroll_percentage}
                  onChange={handleInputChange}
                  className="range-slider"
                />
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="settings-section">
          <div className="section-header">
            <h2>👁️ Live Preview</h2>
            <p>See how your chatbot will look</p>
          </div>

          <div className="preview-card">
            <div className="chatbot-preview" style={{ '--primary-color': settings.primary_color }}>
              <div className="preview-bubble" style={{ backgroundColor: settings.primary_color }}>
                💬
              </div>
              <div className="preview-window">
                <div className="preview-header" style={{ backgroundColor: settings.primary_color }}>
                  <strong>{settings.bot_name}</strong>
                </div>
                <div className="preview-message">
                  {settings.welcome_message}
                </div>
                <div className="preview-input">
                  <input type="text" placeholder="Type a message..." disabled />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Estimation */}
        <div className="settings-section">
          <div className="section-header">
            <h2>💰 Cost Estimation</h2>
            <p>Approximate costs based on your settings</p>
          </div>

          <div className="cost-card">
            <div className="cost-grid">
              <div className="cost-item">
                <div className="cost-label">Per Conversation</div>
                <div className="cost-value">
                  {settings.model === 'gpt-4o-mini' && '$0.001 - $0.005'}
                  {settings.model === 'gpt-4o' && '$0.01 - $0.05'}
                  {settings.model === 'gpt-3.5-turbo' && '$0.002 - $0.01'}
                </div>
              </div>
              <div className="cost-item">
                <div className="cost-label">1000 Conversations/mo</div>
                <div className="cost-value">
                  {settings.model === 'gpt-4o-mini' && '$5 - $10'}
                  {settings.model === 'gpt-4o' && '$50 - $100'}
                  {settings.model === 'gpt-3.5-turbo' && '$10 - $20'}
                </div>
              </div>
            </div>
            <p className="cost-note">
              Actual costs vary based on conversation length and complexity
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Save Button */}
      <div className="sticky-save">
        <button onClick={handleSave} disabled={saving} className="save-button-large">
          {saving ? (
            <>
              <span className="spinner-small"></span>
              Saving...
            </>
          ) : (
            <>💾 Save All Settings</>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatbotSettings;
