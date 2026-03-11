import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Tabs,
  Tab,
  Box,
  Typography,
  Slider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import {
  Save as SaveIcon,
  Plus as AddIcon,
  Trash2 as DeleteIcon,
  Bot as BotIcon,
  Settings as SettingsIcon,
  Brain as PsychologyIcon,
  Sparkles as AutoAwesomeIcon,
  Info as InfoIcon,
} from 'lucide-react';
import './AIChatbotSettings.scss';

/**
 * AI Chatbot Settings Panel
 *
 * Allows admin to configure:
 * - Enable/disable bot per community/course
 * - Customize appearance and behavior
 * - Set trigger rules
 * - Configure automation integrations
 * - Manage knowledge base
 */

const AIChatbotSettings = ({ onSave }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState({
    // General settings
    isEnabled: true,
    botName: 'Miestro Assistant',
    botAvatar: null,
    primaryColor: '#4caf50',

    // Behavior settings
    greeting: "Hi! I'm your AI assistant. How can I help you today?",
    tone: 'friendly', // friendly, professional, casual, formal
    language: 'en',

    // Trigger settings
    triggerType: 'auto', // auto, manual, both
    triggerDelay: 3000, // ms
    triggerOnScroll: 50, // percentage
    triggerOnInactivity: 30, // seconds
    showOnPages: ['course', 'community', 'membership'], // pages where bot appears

    // Context awareness
    useUserProgress: true,
    useCommunityContext: true,
    accessUserProfile: true,
    trackConversations: true,

    // Automation integration
    canTriggerAutomations: true,
    automationTriggers: [
      { keyword: 'upgrade', automationId: 1, automationName: 'Upgrade Flow' },
      { keyword: 'help', automationId: 2, automationName: 'Support Ticket' },
    ],

    // Knowledge base
    knowledgeBase: [
      { id: 1, title: 'Course FAQs', content: 'Frequently asked questions...', type: 'text' },
      { id: 2, title: 'Community Guidelines', content: 'Rules and guidelines...', type: 'text' },
    ],

    // Advanced
    maxTokens: 150,
    temperature: 0.7,
    contextWindow: 10, // number of messages to remember
  });

  const [newKnowledge, setNewKnowledge] = useState({ title: '', content: '', type: 'text' });
  const [newAutomationTrigger, setNewAutomationTrigger] = useState({ keyword: '', automationId: '' });

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(settings);
    }
    // Show success message
    alert('Settings saved successfully!');
  };

  const handleAddKnowledge = () => {
    if (!newKnowledge.title || !newKnowledge.content) return;

    setSettings((prev) => ({
      ...prev,
      knowledgeBase: [
        ...prev.knowledgeBase,
        { ...newKnowledge, id: Date.now() },
      ],
    }));
    setNewKnowledge({ title: '', content: '', type: 'text' });
  };

  const handleDeleteKnowledge = (id) => {
    setSettings((prev) => ({
      ...prev,
      knowledgeBase: prev.knowledgeBase.filter((kb) => kb.id !== id),
    }));
  };

  const handleAddAutomationTrigger = () => {
    if (!newAutomationTrigger.keyword || !newAutomationTrigger.automationId) return;

    setSettings((prev) => ({
      ...prev,
      automationTriggers: [
        ...prev.automationTriggers,
        { ...newAutomationTrigger, automationName: `Automation ${newAutomationTrigger.automationId}` },
      ],
    }));
    setNewAutomationTrigger({ keyword: '', automationId: '' });
  };

  const handleDeleteAutomationTrigger = (keyword) => {
    setSettings((prev) => ({
      ...prev,
      automationTriggers: prev.automationTriggers.filter((at) => at.keyword !== keyword),
    }));
  };

  return (
    <div className="ai-chatbot-settings">
      {/* Header */}
      <div className="settings-header">
        <div className="header-content">
          <Avatar style={{ backgroundColor: settings.primaryColor, width: 56, height: 56 }}>
            <BotIcon style={{ fontSize: 32 }} />
          </Avatar>
          <div className="header-text">
            <h1>AI Chatbot Settings</h1>
            <p>Configure your intelligent assistant to help users navigate courses, communities, and memberships</p>
          </div>
        </div>
        <div className="header-actions">
          <FormControlLabel
            control={
              <Switch
                checked={settings.isEnabled}
                onChange={(e) => handleChange('isEnabled', e.target.checked)}
                color="primary"
              />
            }
            label={settings.isEnabled ? 'Enabled' : 'Disabled'}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            size="large"
          >
            Save Settings
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Card className="settings-card">
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<SettingsIcon />} label="General" />
          <Tab icon={<PsychologyIcon />} label="Behavior" />
          <Tab icon={<AutoAwesomeIcon />} label="Triggers" />
          <Tab icon={<BotIcon />} label="Automations" />
          <Tab icon={<InfoIcon />} label="Knowledge Base" />
        </Tabs>

        <CardContent>
          {/* Tab 0: General Settings */}
          {activeTab === 0 && (
            <div className="tab-content">
              <Typography variant="h6" gutterBottom>
                General Settings
              </Typography>

              <TextField
                fullWidth
                label="Bot Name"
                value={settings.botName}
                onChange={(e) => handleChange('botName', e.target.value)}
                margin="normal"
                helperText="The name displayed in chat header"
              />

              <div className="form-row">
                <TextField
                  label="Primary Color"
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  margin="normal"
                  style={{ width: 200 }}
                />

                <FormControl margin="normal" style={{ width: 200 }}>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={settings.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                    <MenuItem value="pt">Portuguese</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Typography variant="subtitle2" gutterBottom style={{ marginTop: 24 }}>
                Show Bot On Pages
              </Typography>
              <div className="chip-group">
                {['course', 'community', 'membership', 'checkout', 'dashboard'].map((page) => (
                  <Chip
                    key={page}
                    label={page.charAt(0).toUpperCase() + page.slice(1)}
                    color={settings.showOnPages.includes(page) ? 'primary' : 'default'}
                    onClick={() => {
                      const newPages = settings.showOnPages.includes(page)
                        ? settings.showOnPages.filter((p) => p !== page)
                        : [...settings.showOnPages, page];
                      handleChange('showOnPages', newPages);
                    }}
                    style={{ margin: 4 }}
                  />
                ))}
              </div>

              <div className="context-switches">
                <Typography variant="subtitle2" gutterBottom style={{ marginTop: 24 }}>
                  Context Awareness
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.useUserProgress}
                      onChange={(e) => handleChange('useUserProgress', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Use User Progress Data"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.useCommunityContext}
                      onChange={(e) => handleChange('useCommunityContext', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Use Community Context"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.accessUserProfile}
                      onChange={(e) => handleChange('accessUserProfile', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Access User Profile Data"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.trackConversations}
                      onChange={(e) => handleChange('trackConversations', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Track Conversation History"
                />
              </div>
            </div>
          )}

          {/* Tab 1: Behavior Settings */}
          {activeTab === 1 && (
            <div className="tab-content">
              <Typography variant="h6" gutterBottom>
                Behavior & Personality
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Greeting Message"
                value={settings.greeting}
                onChange={(e) => handleChange('greeting', e.target.value)}
                margin="normal"
                helperText="First message users see when opening the chat"
              />

              <FormControl fullWidth margin="normal">
                <InputLabel>Bot Tone</InputLabel>
                <Select
                  value={settings.tone}
                  onChange={(e) => handleChange('tone', e.target.value)}
                >
                  <MenuItem value="friendly">Friendly & Helpful</MenuItem>
                  <MenuItem value="professional">Professional</MenuItem>
                  <MenuItem value="casual">Casual & Fun</MenuItem>
                  <MenuItem value="formal">Formal</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="subtitle2" gutterBottom style={{ marginTop: 24 }}>
                Response Style
              </Typography>
              <Typography variant="caption" color="textSecondary" gutterBottom>
                Temperature: {settings.temperature} (Higher = More creative)
              </Typography>
              <Slider
                value={settings.temperature}
                onChange={(e, value) => handleChange('temperature', value)}
                min={0}
                max={1}
                step={0.1}
                marks
                valueLabelDisplay="auto"
              />

              <TextField
                fullWidth
                type="number"
                label="Max Response Length (tokens)"
                value={settings.maxTokens}
                onChange={(e) => handleChange('maxTokens', parseInt(e.target.value))}
                margin="normal"
                helperText="Maximum length of bot responses (1 token ≈ 4 characters)"
              />

              <TextField
                fullWidth
                type="number"
                label="Context Window (messages)"
                value={settings.contextWindow}
                onChange={(e) => handleChange('contextWindow', parseInt(e.target.value))}
                margin="normal"
                helperText="Number of previous messages the bot remembers"
              />
            </div>
          )}

          {/* Tab 2: Trigger Settings */}
          {activeTab === 2 && (
            <div className="tab-content">
              <Typography variant="h6" gutterBottom>
                Trigger Rules
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Configure when and how the chatbot appears to users
              </Typography>

              <FormControl fullWidth margin="normal">
                <InputLabel>Trigger Type</InputLabel>
                <Select
                  value={settings.triggerType}
                  onChange={(e) => handleChange('triggerType', e.target.value)}
                >
                  <MenuItem value="auto">Automatic (popup after delay)</MenuItem>
                  <MenuItem value="manual">Manual (user clicks bubble)</MenuItem>
                  <MenuItem value="both">Both (auto popup + manual access)</MenuItem>
                </Select>
              </FormControl>

              {(settings.triggerType === 'auto' || settings.triggerType === 'both') && (
                <>
                  <TextField
                    fullWidth
                    type="number"
                    label="Auto-Open Delay (milliseconds)"
                    value={settings.triggerDelay}
                    onChange={(e) => handleChange('triggerDelay', parseInt(e.target.value))}
                    margin="normal"
                    helperText="Time before bot automatically opens on first visit"
                  />

                  <Typography variant="subtitle2" gutterBottom style={{ marginTop: 24 }}>
                    Trigger on Scroll: {settings.triggerOnScroll}%
                  </Typography>
                  <Slider
                    value={settings.triggerOnScroll}
                    onChange={(e, value) => handleChange('triggerOnScroll', value)}
                    min={0}
                    max={100}
                    step={5}
                    marks={[
                      { value: 0, label: '0%' },
                      { value: 50, label: '50%' },
                      { value: 100, label: '100%' },
                    ]}
                    valueLabelDisplay="auto"
                  />
                  <Typography variant="caption" color="textSecondary">
                    Bot opens when user scrolls to this percentage of the page
                  </Typography>

                  <TextField
                    fullWidth
                    type="number"
                    label="Trigger on Inactivity (seconds)"
                    value={settings.triggerOnInactivity}
                    onChange={(e) => handleChange('triggerOnInactivity', parseInt(e.target.value))}
                    margin="normal"
                    helperText="Show bot after user is inactive for this duration"
                  />
                </>
              )}
            </div>
          )}

          {/* Tab 3: Automation Integration */}
          {activeTab === 3 && (
            <div className="tab-content">
              <Typography variant="h6" gutterBottom>
                Automation Integration
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Connect chatbot responses to trigger your existing automations
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.canTriggerAutomations}
                    onChange={(e) => handleChange('canTriggerAutomations', e.target.checked)}
                    color="primary"
                  />
                }
                label="Allow Bot to Trigger Automations"
              />

              {settings.canTriggerAutomations && (
                <>
                  <Typography variant="subtitle2" gutterBottom style={{ marginTop: 24 }}>
                    Keyword-Based Automation Triggers
                  </Typography>
                  <Typography variant="caption" color="textSecondary" paragraph>
                    When users mention these keywords, the bot can trigger specific automations
                  </Typography>

                  <List>
                    {settings.automationTriggers.map((trigger, idx) => (
                      <ListItem key={idx} divider>
                        <ListItemText
                          primary={`Keyword: "${trigger.keyword}"`}
                          secondary={`Triggers: ${trigger.automationName} (ID: ${trigger.automationId})`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => handleDeleteAutomationTrigger(trigger.keyword)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>

                  <div className="add-trigger-form">
                    <TextField
                      label="Keyword"
                      value={newAutomationTrigger.keyword}
                      onChange={(e) =>
                        setNewAutomationTrigger({ ...newAutomationTrigger, keyword: e.target.value })
                      }
                      style={{ marginRight: 8, flex: 1 }}
                    />
                    <TextField
                      label="Automation ID"
                      type="number"
                      value={newAutomationTrigger.automationId}
                      onChange={(e) =>
                        setNewAutomationTrigger({
                          ...newAutomationTrigger,
                          automationId: e.target.value,
                        })
                      }
                      style={{ marginRight: 8, width: 150 }}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={handleAddAutomationTrigger}
                    >
                      Add Trigger
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Tab 4: Knowledge Base */}
          {activeTab === 4 && (
            <div className="tab-content">
              <Typography variant="h6" gutterBottom>
                Knowledge Base
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Add custom knowledge for the bot to reference when answering questions
              </Typography>

              <List>
                {settings.knowledgeBase.map((kb) => (
                  <ListItem key={kb.id} divider>
                    <ListItemText
                      primary={kb.title}
                      secondary={`${kb.content.substring(0, 100)}...`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleDeleteKnowledge(kb.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>

              <div className="add-knowledge-form">
                <TextField
                  fullWidth
                  label="Knowledge Title"
                  value={newKnowledge.title}
                  onChange={(e) => setNewKnowledge({ ...newKnowledge, title: e.target.value })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Knowledge Content"
                  value={newKnowledge.content}
                  onChange={(e) => setNewKnowledge({ ...newKnowledge, content: e.target.value })}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={newKnowledge.type}
                    onChange={(e) => setNewKnowledge({ ...newKnowledge, type: e.target.value })}
                  >
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="faq">FAQ</MenuItem>
                    <MenuItem value="guide">Guide</MenuItem>
                    <MenuItem value="policy">Policy</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleAddKnowledge}
                  style={{ marginTop: 16 }}
                >
                  Add Knowledge
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card className="preview-card" style={{ marginTop: 24 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Preview
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            This is how your chatbot will appear to users
          </Typography>
          <div className="preview-content">
            <div
              className="preview-bubble"
              style={{ background: `linear-gradient(135deg, ${settings.primaryColor} 0%, #45a049 100%)` }}
            >
              <BotIcon style={{ fontSize: 24, color: 'white' }} />
            </div>
            <div className="preview-message">
              <strong>{settings.botName}:</strong> {settings.greeting}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChatbotSettings;
