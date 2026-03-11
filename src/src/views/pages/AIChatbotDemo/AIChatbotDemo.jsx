import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@material-ui/core';
import {
  Bot as BotIcon,
  GraduationCap as CourseIcon,
  MessageSquare as CommunityIcon,
  UserCircle as MembershipIcon,
  Code as CodeIcon,
  Eye as VisibilityIcon,
} from 'lucide-react';
import AIChatbotWidget from '../../../components/modules/aiChatbot/AIChatbotWidget';
import AIChatbotSettings from '../../../components/modules/aiChatbot/AIChatbotSettings';
import './AIChatbotDemo.scss';

/**
 * AI Chatbot Demo Page
 *
 * This page demonstrates the AI Chatbot feature prototype
 * Includes:
 * - Live widget demo with different contexts
 * - Settings configuration panel
 * - Example integrations
 * - Technical documentation
 */

const AIChatbotDemo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [widgetEnabled, setWidgetEnabled] = useState(true);
  const [demoContext, setDemoContext] = useState({
    type: 'course',
    id: 5,
    title: 'Marketing Mastery Course',
    userProgress: 45,
    completedLessons: 12,
    totalLessons: 27,
    nextLesson: 'Email Marketing Fundamentals',
    nextLessonId: 13,
  });

  const handleContextChange = (contextType) => {
    const contexts = {
      course: {
        type: 'course',
        id: 5,
        title: 'Marketing Mastery Course',
        userProgress: 45,
        completedLessons: 12,
        totalLessons: 27,
        nextLesson: 'Email Marketing Fundamentals',
        nextLessonId: 13,
      },
      community: {
        type: 'community',
        id: 2,
        title: 'Marketing Professionals Community',
        activeMemberCount: 124,
        trendingTopic: 'Email Marketing Automation',
      },
      membership: {
        type: 'membership',
        id: 1,
        planName: 'Pro',
        canUpgrade: true,
        courseCount: 15,
      },
    };
    setDemoContext(contexts[contextType]);
  };

  const handleSaveSettings = (settings) => {
    // In a real app, this would dispatch a Redux action
  };

  return (
    <div className="ai-chatbot-demo">
      {/* Hero Section */}
      <div className="demo-hero">
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <div className="hero-content">
                <Chip
                  label="PROTOTYPE DEMO"
                  color="primary"
                  icon={<BotIcon />}
                  style={{ marginBottom: 16 }}
                />
                <Typography variant="h3" gutterBottom style={{ fontWeight: 700 }}>
                  AI Chatbot Feature
                </Typography>
                <Typography variant="h6" color="textSecondary" paragraph>
                  Context-aware assistant for courses, communities, and memberships
                </Typography>
                <div className="hero-features">
                  <Chip icon={<CourseIcon />} label="Course Navigation" style={{ margin: 4 }} />
                  <Chip icon={<CommunityIcon />} label="Community Help" style={{ margin: 4 }} />
                  <Chip icon={<MembershipIcon />} label="Membership Support" style={{ margin: 4 }} />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper style={{ marginBottom: 16, padding: '12px 16px', backgroundColor: '#e3f2fd', borderLeft: '4px solid #2196f3' }}>
                <Typography variant="body2">
                  <strong>Interactive Demo:</strong> The chatbot widget appears in the bottom-right
                  corner. Try asking questions in different contexts!
                </Typography>
              </Paper>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Quick Demo Controls
                  </Typography>
                  <div className="demo-controls">
                    <Button
                      variant={demoContext.type === 'course' ? 'contained' : 'outlined'}
                      color="primary"
                      startIcon={<CourseIcon />}
                      onClick={() => handleContextChange('course')}
                      fullWidth
                      style={{ marginBottom: 8 }}
                    >
                      Course Context
                    </Button>
                    <Button
                      variant={demoContext.type === 'community' ? 'contained' : 'outlined'}
                      color="primary"
                      startIcon={<CommunityIcon />}
                      onClick={() => handleContextChange('community')}
                      fullWidth
                      style={{ marginBottom: 8 }}
                    >
                      Community Context
                    </Button>
                    <Button
                      variant={demoContext.type === 'membership' ? 'contained' : 'outlined'}
                      color="primary"
                      startIcon={<MembershipIcon />}
                      onClick={() => handleContextChange('membership')}
                      fullWidth
                      style={{ marginBottom: 8 }}
                    >
                      Membership Context
                    </Button>
                  </div>
                  <Typography variant="body2" color="textSecondary" style={{ marginTop: 16 }}>
                    Current Context: <strong>{demoContext.title}</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>

      {/* Main Content */}
      <Container style={{ marginTop: 48, marginBottom: 48 }}>
        <Paper elevation={0}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab icon={<VisibilityIcon />} label="Overview" />
            <Tab icon={<BotIcon />} label="Settings Demo" />
            <Tab icon={<CodeIcon />} label="Implementation" />
          </Tabs>
        </Paper>

        {/* Tab 0: Overview */}
        {activeTab === 0 && (
          <Box p={4}>
            <Typography variant="h4" gutterBottom>
              Feature Overview
            </Typography>
            <Typography variant="body1" paragraph>
              This AI Chatbot feature provides an intelligent, context-aware assistant that helps
              users navigate your platform. It can understand where users are, what they're doing,
              and provide personalized assistance.
            </Typography>

            <Grid container spacing={4} style={{ marginTop: 24 }}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Key Features
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText
                          primary="Context Awareness"
                          secondary="Knows if user is in a course, community, or membership area"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Smart Responses"
                          secondary="Provides relevant help based on user progress and location"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Automation Integration"
                          secondary="Can trigger your existing automations based on conversation"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Customizable"
                          secondary="Configure appearance, behavior, and triggers per community"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Knowledge Base"
                          secondary="Add custom knowledge for domain-specific responses"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Example Use Cases
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText
                          primary="Course Navigation"
                          secondary={`User asks "What's next?" - Bot shows next lesson and progress`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Community Engagement"
                          secondary="Bot suggests members to connect with based on interests"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Membership Upgrades"
                          secondary={`User asks "What features?" - Bot explains and offers upgrade`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Support Routing"
                          secondary="Bot can create support tickets or escalate to human"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Onboarding"
                          secondary="Guides new users through setup and first steps"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Paper style={{ marginTop: 32, padding: '12px 16px', backgroundColor: '#e8f5e9', borderLeft: '4px solid #4caf50' }}>
              <Typography variant="body2">
                <strong>Try it now!</strong> Look for the purple bot icon in the bottom-right corner.
                Click it and try asking questions like:
                <ul>
                  <li>"Show my progress"</li>
                  <li>"What's next?"</li>
                  <li>"Help me"</li>
                  <li>"I want to upgrade"</li>
                </ul>
              </Typography>
            </Paper>
          </Box>
        )}

        {/* Tab 1: Settings Demo */}
        {activeTab === 1 && (
          <Box p={4}>
            <Paper style={{ marginBottom: 24, padding: '12px 16px', backgroundColor: '#e3f2fd', borderLeft: '4px solid #2196f3' }}>
              <Typography variant="body2">
                This is a fully functional settings panel. Changes you make here will update the
                widget's appearance and behavior in real-time (in production, these would be saved to
                your database).
              </Typography>
            </Paper>
            <AIChatbotSettings onSave={handleSaveSettings} />
          </Box>
        )}

        {/* Tab 2: Implementation */}
        {activeTab === 2 && (
          <Box p={4}>
            <Typography variant="h4" gutterBottom>
              Implementation Details
            </Typography>

            <Card style={{ marginTop: 24 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Architecture
                </Typography>
                <Typography variant="body2" paragraph>
                  The AI Chatbot is built on your existing tech stack and integrates seamlessly:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Frontend Components"
                      secondary="React components using Material-UI, matching your design system"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="State Management"
                      secondary="Redux module following your existing patterns (actions, reducers, operations, selectors)"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Real-time Support"
                      secondary="Can integrate with your existing Socket.IO chat infrastructure"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Backend API"
                      secondary="Laravel controllers for settings, conversations, and analytics"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="AI Integration"
                      secondary="OpenAI API (already imported in CommunityChat.php)"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Card style={{ marginTop: 24 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Files Created
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Components"
                      secondary="/miestro-react/src/components/modules/aiChatbot/"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Redux Module"
                      secondary="/miestro-react/src/state/modules/aiChatbot/"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Demo Page"
                      secondary="/miestro-react/src/views/pages/AIChatbotDemo/"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Card style={{ marginTop: 24 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Next Steps for Production
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="1. OpenAI Integration"
                      secondary="Add OpenAI API key to .env and implement API calls in backend"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="2. Database Tables"
                      secondary="Create migrations for ai_chatbot_settings, ai_conversations, ai_messages"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="3. Laravel Controllers"
                      secondary="Add API endpoints for settings CRUD, message handling, analytics"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="4. Widget Integration"
                      secondary="Add AIChatbotWidget component to course, community, and membership layouts"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="5. Settings UI"
                      secondary="Add link to AIChatbotSettings in admin panel (near Automations tab)"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="6. Testing & Refinement"
                      secondary="Test with real users, refine prompts, adjust context awareness"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>
        )}
      </Container>

      {/* Chatbot Widget - Always visible */}
      {widgetEnabled && (
        <AIChatbotWidget
          isEnabled={widgetEnabled}
          position="bottom-right"
          context={demoContext}
          settings={{
            greeting: "👋 Hi! I'm your AI learning assistant. Ready to help you succeed today!",
            botName: 'Miestro Assistant',
            botAvatar: null,
            triggerDelay: 0, // Don't auto-open in demo
            primaryColor: '#4caf50',
          }}
          onTriggerAutomation={(automation) => {
            alert(`Would trigger automation: ${automation.type}`);
          }}
        />
      )}
    </div>
  );
};

export default AIChatbotDemo;
