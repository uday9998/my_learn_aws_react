import * as types from './types';
import initialState from './initial-state';

const aiChatbotReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get Settings
    case types.GET_AI_CHATBOT_SETTINGS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.GET_AI_CHATBOT_SETTINGS_COMPLETED:
      return {
        ...state,
        settings: action.payload,
        loading: false,
        error: null,
      };

    case types.GET_AI_CHATBOT_SETTINGS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Update Settings
    case types.UPDATE_AI_CHATBOT_SETTINGS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.UPDATE_AI_CHATBOT_SETTINGS_COMPLETED:
      return {
        ...state,
        settings: action.payload,
        loading: false,
        error: null,
      };

    case types.UPDATE_AI_CHATBOT_SETTINGS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Widget State
    case types.TOGGLE_AI_CHATBOT_WIDGET:
      return {
        ...state,
        widget: {
          ...state.widget,
          isOpen: action.payload,
        },
      };

    case types.SET_AI_CHATBOT_CONTEXT:
      return {
        ...state,
        widget: {
          ...state.widget,
          context: action.payload,
        },
      };

    case types.ADD_AI_CHATBOT_MESSAGE:
      return {
        ...state,
        widget: {
          ...state.widget,
          messages: [...state.widget.messages, action.payload],
        },
      };

    case types.CLEAR_AI_CHATBOT_MESSAGES:
      return {
        ...state,
        widget: {
          ...state.widget,
          messages: [],
        },
      };

    // Conversations
    case types.GET_AI_CHATBOT_CONVERSATIONS_START:
      return {
        ...state,
        conversations: {
          ...state.conversations,
          loading: true,
          error: null,
        },
      };

    case types.GET_AI_CHATBOT_CONVERSATIONS_COMPLETED:
      return {
        ...state,
        conversations: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };

    case types.GET_AI_CHATBOT_CONVERSATIONS_FAILED:
      return {
        ...state,
        conversations: {
          ...state.conversations,
          loading: false,
          error: action.payload,
        },
      };

    // Analytics
    case types.GET_AI_CHATBOT_ANALYTICS_START:
      return {
        ...state,
        analytics: {
          ...state.analytics,
          loading: true,
          error: null,
        },
      };

    case types.GET_AI_CHATBOT_ANALYTICS_COMPLETED:
      return {
        ...state,
        analytics: {
          ...action.payload,
          loading: false,
          error: null,
        },
      };

    case types.GET_AI_CHATBOT_ANALYTICS_FAILED:
      return {
        ...state,
        analytics: {
          ...state.analytics,
          loading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default aiChatbotReducer;
