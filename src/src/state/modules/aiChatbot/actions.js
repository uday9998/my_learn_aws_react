import * as types from './types';

// Settings Actions
export const getAIChatbotSettingsStart = () => ({
  type: types.GET_AI_CHATBOT_SETTINGS_START,
});

export const getAIChatbotSettingsCompleted = (settings) => ({
  type: types.GET_AI_CHATBOT_SETTINGS_COMPLETED,
  payload: settings,
});

export const getAIChatbotSettingsFailed = (error) => ({
  type: types.GET_AI_CHATBOT_SETTINGS_FAILED,
  payload: error,
});

export const updateAIChatbotSettingsStart = () => ({
  type: types.UPDATE_AI_CHATBOT_SETTINGS_START,
});

export const updateAIChatbotSettingsCompleted = (settings) => ({
  type: types.UPDATE_AI_CHATBOT_SETTINGS_COMPLETED,
  payload: settings,
});

export const updateAIChatbotSettingsFailed = (error) => ({
  type: types.UPDATE_AI_CHATBOT_SETTINGS_FAILED,
  payload: error,
});

// Widget Actions
export const toggleAIChatbotWidget = (isOpen) => ({
  type: types.TOGGLE_AI_CHATBOT_WIDGET,
  payload: isOpen,
});

export const setAIChatbotContext = (context) => ({
  type: types.SET_AI_CHATBOT_CONTEXT,
  payload: context,
});

export const addAIChatbotMessage = (message) => ({
  type: types.ADD_AI_CHATBOT_MESSAGE,
  payload: message,
});

export const clearAIChatbotMessages = () => ({
  type: types.CLEAR_AI_CHATBOT_MESSAGES,
});

// Conversations Actions
export const getAIChatbotConversationsStart = () => ({
  type: types.GET_AI_CHATBOT_CONVERSATIONS_START,
});

export const getAIChatbotConversationsCompleted = (conversations) => ({
  type: types.GET_AI_CHATBOT_CONVERSATIONS_COMPLETED,
  payload: conversations,
});

export const getAIChatbotConversationsFailed = (error) => ({
  type: types.GET_AI_CHATBOT_CONVERSATIONS_FAILED,
  payload: error,
});

// Analytics Actions
export const getAIChatbotAnalyticsStart = () => ({
  type: types.GET_AI_CHATBOT_ANALYTICS_START,
});

export const getAIChatbotAnalyticsCompleted = (analytics) => ({
  type: types.GET_AI_CHATBOT_ANALYTICS_COMPLETED,
  payload: analytics,
});

export const getAIChatbotAnalyticsFailed = (error) => ({
  type: types.GET_AI_CHATBOT_ANALYTICS_FAILED,
  payload: error,
});
