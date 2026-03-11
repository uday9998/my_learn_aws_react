/**
 * AI Chatbot Selectors
 *
 * These selectors extract data from the Redux store for the AI Chatbot module
 */

// Settings Selectors
export const getAIChatbotSettings = (state) => state.aiChatbot.settings;
export const getAIChatbotEnabled = (state) => state.aiChatbot.settings.isEnabled;
export const getAIChatbotBotName = (state) => state.aiChatbot.settings.botName;
export const getAIChatbotGreeting = (state) => state.aiChatbot.settings.greeting;
export const getAIChatbotPrimaryColor = (state) => state.aiChatbot.settings.primaryColor;

// Widget Selectors
export const getAIChatbotWidget = (state) => state.aiChatbot.widget;
export const getAIChatbotWidgetOpen = (state) => state.aiChatbot.widget.isOpen;
export const getAIChatbotWidgetMinimized = (state) => state.aiChatbot.widget.isMinimized;
export const getAIChatbotContext = (state) => state.aiChatbot.widget.context;
export const getAIChatbotMessages = (state) => state.aiChatbot.widget.messages;
export const getAIChatbotTyping = (state) => state.aiChatbot.widget.isTyping;

// Conversations Selectors
export const getAIChatbotConversations = (state) => state.aiChatbot.conversations.data;
export const getAIChatbotConversationsLoading = (state) => state.aiChatbot.conversations.loading;
export const getAIChatbotConversationsError = (state) => state.aiChatbot.conversations.error;

// Analytics Selectors
export const getAIChatbotAnalytics = (state) => state.aiChatbot.analytics;
export const getAIChatbotTotalConversations = (state) => state.aiChatbot.analytics.totalConversations;
export const getAIChatbotAvgMessages = (state) => state.aiChatbot.analytics.avgMessagesPerConversation;
export const getAIChatbotSatisfactionScore = (state) => state.aiChatbot.analytics.userSatisfactionScore;
export const getAIChatbotAnalyticsLoading = (state) => state.aiChatbot.analytics.loading;

// Loading & Error Selectors
export const getAIChatbotLoading = (state) => state.aiChatbot.loading;
export const getAIChatbotError = (state) => state.aiChatbot.error;

// Computed Selectors
export const shouldShowAIChatbotOnPage = (state, pageType) => {
  const settings = state.aiChatbot.settings;
  return settings.isEnabled && settings.showOnPages.includes(pageType);
};

export const getAIChatbotAutomationTriggers = (state) => state.aiChatbot.settings.automationTriggers;
export const getAIChatbotKnowledgeBase = (state) => state.aiChatbot.settings.knowledgeBase;
