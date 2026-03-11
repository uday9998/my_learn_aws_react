export default {
  // Settings
  settings: {
    isEnabled: false,
    botName: 'Miestro Assistant',
    botAvatar: null,
    primaryColor: '#4caf50',
    greeting: "👋 Hi! I'm your AI learning assistant. Ready to help you succeed today!",
    tone: 'friendly',
    language: 'en',
    triggerType: 'both',
    triggerDelay: 3000,
    triggerOnScroll: 50,
    triggerOnInactivity: 30,
    showOnPages: ['course', 'community', 'membership'],
    useUserProgress: true,
    useCommunityContext: true,
    accessUserProfile: true,
    trackConversations: true,
    canTriggerAutomations: true,
    automationTriggers: [],
    knowledgeBase: [],
    maxTokens: 150,
    temperature: 0.7,
    contextWindow: 10,
  },

  // Widget state
  widget: {
    isOpen: false,
    isMinimized: false,
    context: null, // { type, id, title, userProgress, etc. }
    messages: [],
    isTyping: false,
  },

  // Conversations history
  conversations: {
    data: [],
    loading: false,
    error: null,
  },

  // Analytics
  analytics: {
    totalConversations: 0,
    avgMessagesPerConversation: 0,
    mostCommonQuestions: [],
    automationsTriggered: 0,
    userSatisfactionScore: 0,
    loading: false,
    error: null,
  },

  // Loading states
  loading: false,
  error: null,
};
